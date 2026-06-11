import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import Pagination from "../../../components/common/Pagination";
import LoadingState from "../../../components/common/LoadingState";
import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/common/ErrorState";
import { journalsApi } from "../../../api/admin/journals";
import { ApiError } from "../../../api/client";

const PAGE_SIZE = 20;

export default function JournalsListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const keyword = searchParams.get("keyword") ?? "";
  const [keywordInput, setKeywordInput] = useState(keyword);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    journalsApi
      .list({ page, limit: PAGE_SIZE, keyword: keyword || undefined })
      .then(setData)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  }, [page, keyword]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    setKeywordInput(keyword);
  }, [keyword]);

  const goPage = (next) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(next));
    setSearchParams(params);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (keywordInput) params.set("keyword", keywordInput);
    else params.delete("keyword");
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`"${title}" 논문을 삭제하시겠습니까?`)) return;
    try {
      await journalsApi.remove(id);
      reload();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "삭제에 실패했습니다.");
    }
  };

  const items = data?.items ?? [];

  return (
    <div>
      <PageHeader
        title="Journals"
        description="저널 논문 실적을 관리합니다."
        actions={
          <button
            type="button"
            onClick={() => navigate("/admin/journals/new")}
            className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85"
          >
            + 새 논문
          </button>
        }
      />

      <div className="px-8 py-6">
        <form
          onSubmit={submitSearch}
          className="mb-4 flex items-center gap-2"
        >
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="제목·저자·저널명 검색"
            className="h-9 w-[280px] rounded-md border border-black/15 bg-white px-3 text-[13px] outline-none focus:border-black/40"
          />
          <button
            type="submit"
            className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-3 text-[13px] font-medium hover:bg-black/5"
          >
            검색
          </button>
          {keyword && (
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="text-[12px] text-black/55 hover:underline"
            >
              초기화
            </button>
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
                    <th className="px-4 py-3">제목</th>
                    <th className="w-[220px] px-4 py-3">저자</th>
                    <th className="w-[160px] px-4 py-3">저널명</th>
                    <th className="w-[120px] px-4 py-3">게재일</th>
                    <th className="w-[70px] px-4 py-3">노출</th>
                    <th className="w-[70px] px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <EmptyState
                          title={
                            keyword
                              ? "검색 결과가 없습니다."
                              : "아직 등록된 논문이 없습니다."
                          }
                        />
                      </td>
                    </tr>
                  ) : (
                    items.map((it) => (
                      <tr key={it.id} className="hover:bg-black/[0.02]">
                        <td className="px-4 py-3">
                          <Link
                            to={`/admin/journals/${it.id}`}
                            className="font-medium hover:underline"
                          >
                            {it.title1}
                            {it.title2 && (
                              <span className="block text-[12px] font-normal text-black/55">
                                {it.title2}
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-black/70">{it.authors}</td>
                        <td className="px-4 py-3 text-black/65">
                          {it.journalName || "—"}
                        </td>
                        <td className="px-4 py-3 text-black/65">
                          {it.publishedDate}
                        </td>
                        <td className="px-4 py-3">
                          {it.visible ? (
                            <span className="inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">
                              노출
                            </span>
                          ) : (
                            <span className="inline-flex h-5 items-center rounded-full bg-black/10 px-2 text-[11px] font-semibold text-black/55">
                              숨김
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(it.id, it.title1)}
                            className="text-[12px] text-red-600 hover:underline"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {data && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-[12px] text-black/55">
                  총 {data.totalItems}건 · {data.page}/{Math.max(1, data.totalPages)}{" "}
                  페이지
                </div>
                <Pagination
                  page={data.page}
                  totalPages={data.totalPages}
                  onChange={goPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
