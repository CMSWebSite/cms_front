import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import Pagination from "../../../components/common/Pagination";
import LoadingState from "../../../components/common/LoadingState";
import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/common/ErrorState";
import { studentsApi } from "../../../api/admin/students";
import { ApiError } from "../../../api/client";

const PAGE_SIZE = 20;

const STATUS_LABEL = {
  ACTIVE: { text: "재학", className: "bg-emerald-100 text-emerald-700" },
  ALUMNI: { text: "졸업", className: "bg-black/10 text-black/55" },
  INACTIVE: { text: "비활성", className: "bg-amber-100 text-amber-700" },
};

export default function StudentsListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const keyword = searchParams.get("keyword") ?? "";
  const status = searchParams.get("status") ?? "";
  const [keywordInput, setKeywordInput] = useState(keyword);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    studentsApi
      .list({
        page,
        limit: PAGE_SIZE,
        keyword: keyword || undefined,
        status: status || undefined,
      })
      .then(setData)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  }, [page, keyword, status]);

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

  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" 학생 정보를 삭제하시겠습니까?`)) return;
    try { await studentsApi.remove(id); reload(); }
    catch (err) { alert(err instanceof ApiError ? err.message : "삭제 실패"); }
  };

  const items = data?.items ?? [];

  return (
    <div>
      <PageHeader
        title="Students"
        description="학생 회원을 관리합니다. 졸업 시 상태를 ALUMNI로 변경하세요."
        actions={
          <button
            type="button"
            onClick={() => navigate("/admin/students/new")}
            className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85"
          >
            + 새 학생
          </button>
        }
      />
      <div className="px-8 py-6">
        <form onSubmit={submitSearch} className="mb-4 flex items-center gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="이름·역할 검색"
            className="h-9 w-[280px] rounded-md border border-black/15 bg-white px-3 text-[13px] outline-none focus:border-black/40"
          />
          <select
            value={status}
            onChange={(e) => setParam("status", e.target.value)}
            className="h-9 rounded-md border border-black/15 bg-white px-2 text-[13px]"
          >
            <option value="">전체 상태</option>
            <option value="ACTIVE">재학</option>
            <option value="ALUMNI">졸업</option>
            <option value="INACTIVE">비활성</option>
          </select>
          <button type="submit" className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-3 text-[13px] font-medium hover:bg-black/5">검색</button>
          {(keyword || status) && (
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
                    <th className="w-[80px] px-4 py-3"></th>
                    <th className="px-4 py-3">이름</th>
                    <th className="px-4 py-3">역할/직책</th>
                    <th className="w-[120px] px-4 py-3">입학</th>
                    <th className="w-[90px] px-4 py-3">상태</th>
                    <th className="w-[70px] px-4 py-3">노출</th>
                    <th className="w-[70px] px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {items.length === 0 ? (
                    <tr><td colSpan={7}><EmptyState title={keyword ? "검색 결과가 없습니다." : "아직 등록된 학생이 없습니다."} /></td></tr>
                  ) : items.map((s) => {
                    const lbl = STATUS_LABEL[s.status] ?? { text: s.status, className: "bg-black/10 text-black/55" };
                    return (
                      <tr key={s.id} className="hover:bg-black/[0.02]">
                        <td className="px-4 py-3">
                          {s.photoUrl ? (
                            <img src={s.photoUrl} alt={s.koreanName} className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-black/10" />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Link to={`/admin/students/${s.id}`} className="font-medium hover:underline">{s.koreanName}</Link>
                          <span className="block text-[12px] text-black/55">{s.englishName}</span>
                        </td>
                        <td className="px-4 py-3 text-black/70">{s.role}</td>
                        <td className="px-4 py-3 text-black/65">{s.enrolledAt}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex h-5 items-center rounded-full px-2 text-[11px] font-semibold ${lbl.className}`}>{lbl.text}</span>
                        </td>
                        <td className="px-4 py-3">
                          {s.visible ? (
                            <span className="inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">노출</span>
                          ) : (
                            <span className="inline-flex h-5 items-center rounded-full bg-black/10 px-2 text-[11px] font-semibold text-black/55">숨김</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button type="button" onClick={() => handleDelete(s.id, s.koreanName)} className="text-[12px] text-red-600 hover:underline">삭제</button>
                        </td>
                      </tr>
                    );
                  })}
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
