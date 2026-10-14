import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import Pagination from "../../../components/common/Pagination";
import LoadingState from "../../../components/common/LoadingState";
import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/common/ErrorState";
import Modal from "../../../components/common/Modal";
import { adminContactApi } from "../../../api/admin/contact";
import { ApiError } from "../../../api/client";

const PAGE_SIZE = 20;

export default function ContactListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const keyword = searchParams.get("keyword") ?? "";
  const [keywordInput, setKeywordInput] = useState(keyword);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [detail, setDetail] = useState(null); // 선택한 지원 상세
  const [detailLoading, setDetailLoading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true); setError(null);
    adminContactApi.list({ page, limit: PAGE_SIZE, keyword: keyword || undefined })
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [page, keyword]);

  useEffect(() => { reload(); }, [reload]);
  useEffect(() => { setKeywordInput(keyword); }, [keyword]);

  const setParam = (k, v) => {
    const p = new URLSearchParams(searchParams);
    if (v) p.set(k, v); else p.delete(k);
    p.set("page", "1"); setSearchParams(p);
  };
  const goPage = (n) => {
    const p = new URLSearchParams(searchParams);
    p.set("page", String(n)); setSearchParams(p);
  };

  const openDetail = async (id) => {
    setDetailLoading(true);
    try {
      setDetail(await adminContactApi.get(id));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "상세를 불러오지 못했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" 님의 지원 정보를 삭제하시겠습니까?`)) return;
    try { await adminContactApi.remove(id); reload(); }
    catch (err) { alert(err instanceof ApiError ? err.message : "삭제 실패"); }
  };

  const items = data?.items ?? [];

  return (
    <div>
      <PageHeader title="Contact us" description="사용자가 Contact us 에서 제출한 지원 정보를 확인합니다." />
      <div className="px-8 py-6">
        <form onSubmit={(e) => { e.preventDefault(); setParam("keyword", keywordInput); }} className="mb-4 flex items-center gap-2">
          <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="이름·연락처·전공 검색"
            className="h-9 w-[280px] rounded-md border border-black/15 bg-white px-3 text-[13px] outline-none focus:border-black/40" />
          <button type="submit" className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-3 text-[13px] font-medium hover:bg-black/5">검색</button>
          {keyword && (
            <button type="button" onClick={() => setSearchParams({})} className="text-[12px] text-black/55 hover:underline">초기화</button>
          )}
        </form>

        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && (
          <>
            <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
              <table className="w-full text-[13px]">
                <thead className="bg-black/[0.04] text-left text-[12px] font-semibold uppercase tracking-wide text-black/65">
                  <tr>
                    <th className="w-[160px] px-4 py-3">이름</th>
                    <th className="px-4 py-3">연락처</th>
                    <th className="w-[200px] px-4 py-3">전공</th>
                    <th className="w-[170px] px-4 py-3">제출일</th>
                    <th className="w-[120px] px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {items.length === 0 ? (
                    <tr><td colSpan={5}><EmptyState title={keyword ? "검색 결과가 없습니다." : "아직 접수된 지원이 없습니다."} /></td></tr>
                  ) : items.map((it) => (
                    <tr key={it.id} className="hover:bg-black/[0.02]">
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => openDetail(it.id)} className="font-medium hover:underline">{it.name}</button>
                      </td>
                      <td className="px-4 py-3 text-black/70 break-all">{it.contact}</td>
                      <td className="px-4 py-3 text-black/70">{it.major}</td>
                      <td className="px-4 py-3 text-black/65">{new Date(it.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" onClick={() => openDetail(it.id)} className="mr-3 text-[12px] text-black/70 hover:underline">상세</button>
                        <button type="button" onClick={() => handleDelete(it.id, it.name)} className="text-[12px] text-red-600 hover:underline">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-[12px] text-black/55">총 {data.totalItems}건 · {data.page}/{Math.max(1, data.totalPages)} 페이지</div>
                <Pagination page={data.page} totalPages={data.totalPages} onChange={goPage} />
              </div>
            )}
          </>
        )}
      </div>

      <Modal open={!!detail} title="지원 상세" onClose={() => setDetail(null)}>
        {detailLoading && <div className="text-white/60">불러오는 중…</div>}
        {detail && (
          <div className="space-y-4">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-white/45">이름</div>
              <div className="mt-1">{detail.name}</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-white/45">연락처</div>
              <div className="mt-1 break-all">{detail.contact}</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-white/45">전공</div>
              <div className="mt-1">{detail.major}</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-white/45">자기소개</div>
              <div className="mt-1">{detail.introduce || <span className="text-white/40">(작성 안 함)</span>}</div>
            </div>
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wide text-white/45">제출일</div>
              <div className="mt-1">{new Date(detail.createdAt).toLocaleString()}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
