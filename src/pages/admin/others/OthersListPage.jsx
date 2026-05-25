import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import Pagination from "../../../components/common/Pagination";
import LoadingState from "../../../components/common/LoadingState";
import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/common/ErrorState";
import { othersApi } from "../../../api/admin/others";
import { ApiError } from "../../../api/client";

const PAGE_SIZE = 20;

export default function OthersListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const keyword = searchParams.get("keyword") ?? "";
  const type = searchParams.get("type") ?? "";
  const [keywordInput, setKeywordInput] = useState(keyword);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    othersApi
      .list({ page, limit: PAGE_SIZE, keyword: keyword || undefined, type: type || undefined })
      .then(setData)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  }, [page, keyword, type]);

  useEffect(() => { reload(); }, [reload]);
  useEffect(() => { setKeywordInput(keyword); }, [keyword]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value);
    else p.delete(key);
    p.set("page", "1");
    setSearchParams(p);
  };

  const goPage = (n) => {
    const p = new URLSearchParams(searchParams);
    p.set("page", String(n));
    setSearchParams(p);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setParam("keyword", keywordInput);
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`"${title}" 항목을 삭제하시겠습니까?`)) return;
    try { await othersApi.remove(id); reload(); }
    catch (err) { alert(err instanceof ApiError ? err.message : "삭제 실패"); }
  };

  const items = data?.items ?? [];

  return (
    <div>
      <PageHeader
        title="Other Achievements"
        description="저작권/기술이전/기타 실적을 관리합니다."
        actions={
          <button
            type="button"
            onClick={() => navigate("/admin/others/new")}
            className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85"
          >
            + 새 실적
          </button>
        }
      />
      <div className="px-8 py-6">
        <form onSubmit={submitSearch} className="mb-4 flex items-center gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="제목·설명 검색"
            className="h-9 w-[280px] rounded-md border border-black/15 bg-white px-3 text-[13px] outline-none focus:border-black/40"
          />
          <select
            value={type}
            onChange={(e) => setParam("type", e.target.value)}
            className="h-9 rounded-md border border-black/15 bg-white px-2 text-[13px]"
          >
            <option value="">전체 분류</option>
            <option value="저작권">저작권</option>
            <option value="기술이전">기술이전</option>
            <option value="기타">기타</option>
          </select>
          <button type="submit" className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-3 text-[13px] font-medium hover:bg-black/5">검색</button>
          {(keyword || type) && (
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
                    <th className="w-[100px] px-4 py-3">분류</th>
                    <th className="px-4 py-3">제목</th>
                    <th className="w-[120px] px-4 py-3">날짜</th>
                    <th className="w-[70px] px-4 py-3">노출</th>
                    <th className="w-[70px] px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {items.length === 0 ? (
                    <tr><td colSpan={5}><EmptyState title={keyword ? "검색 결과가 없습니다." : "아직 등록된 실적이 없습니다."} /></td></tr>
                  ) : items.map((it) => (
                    <tr key={it.id} className="hover:bg-black/[0.02]">
                      <td className="px-4 py-3">
                        <span className="inline-flex h-5 items-center rounded-full bg-black/[0.06] px-2 text-[11px] font-semibold text-black/70">{it.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/others/${it.id}`} className="font-medium hover:underline">{it.title}</Link>
                      </td>
                      <td className="px-4 py-3 text-black/65">{it.achievedOn}</td>
                      <td className="px-4 py-3">
                        {it.visible ? (
                          <span className="inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">노출</span>
                        ) : (
                          <span className="inline-flex h-5 items-center rounded-full bg-black/10 px-2 text-[11px] font-semibold text-black/55">숨김</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button type="button" onClick={() => handleDelete(it.id, it.title)} className="text-[12px] text-red-600 hover:underline">삭제</button>
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
    </div>
  );
}
