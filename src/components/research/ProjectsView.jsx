import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicProjectsApi } from "../../api/public/projects";
import { ApiError } from "../../api/client";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";
import ErrorState from "../common/ErrorState";
import Pagination from "../common/Pagination";

const FILTERS = [
  { label: "전체", value: "" },
  { label: "수행 중", value: "ONGOING" },
  { label: "수행 완료", value: "COMPLETED" },
];
const FIELDS = ["제목"];

const STATUS_LABEL = {
  PLANNED: "계획",
  ONGOING: "수행 중",
  COMPLETED: "수행 완료",
  SUSPENDED: "보류",
};

const PAGE_SIZE = 10;

function formatDate(isoDate) {
  if (!isoDate) return "";
  return typeof isoDate === "string" ? isoDate.slice(0, 10) : "";
}

export default function ProjectsView() {
  const [filter, setFilter] = useState("");
  const [field, setField] = useState("제목");
  const [qInput, setQInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const [data, setData] = useState({ items: [], totalPages: 0, totalItems: 0, page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    publicProjectsApi
      .list({
        page,
        limit: PAGE_SIZE,
        keyword: keyword || undefined,
        status: filter || undefined,
      })
      .then(setData)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  }, [page, keyword, filter]);

  useEffect(() => { reload(); }, [reload]);

  useEffect(() => { setPage(1); }, [filter]);

  const submitSearch = (e) => {
    e.preventDefault();
    setKeyword(qInput.trim());
    setPage(1);
  };

  const items = data.items;

  return (
    <div className="w-full">
      <div className="mt-14 flex items-end justify-between">
        <div>
          <h2 className="text-[60px] leading-[1] font-extrabold tracking-[-0.02em] text-black">Projects</h2>
          <div className="mt-4 h-[2px] w-[120px] bg-black/80" />
        </div>

        <div className="flex items-center gap-3 text-[13px] font-semibold text-black">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => setFilter(f.value)}
              className={["px-1", filter === f.value ? "text-black" : "text-black/60 hover:text-black"].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="border-t border-b border-black/40">
          <div className="grid items-center text-[13px] font-semibold text-black/80" style={{ gridTemplateColumns: "80px 140px 1fr 220px", height: 44 }}>
            <div className="px-3">순서</div>
            <div className="px-3">분류</div>
            <div className="px-3 text-center">제목</div>
            <div className="px-3 text-center">수행 기간</div>
          </div>
          <div className="h-px bg-black/30" />

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={reload} />}

          {!loading && !error && items.length === 0 ? (
            <EmptyState title={keyword ? "검색 결과가 없습니다." : "아직 등록된 프로젝트가 없습니다."} />
          ) : (
            !loading && !error && items.map((r, idx) => (
              <div key={r.id} className="grid items-center text-[13px] text-black" style={{ gridTemplateColumns: "80px 140px 1fr 220px", minHeight: 56 }}>
                <div className="px-3 text-center">{(data.page - 1) * PAGE_SIZE + idx + 1}</div>
                <div className="px-3 text-center">{STATUS_LABEL[r.status] ?? r.status}</div>
                <div className="px-3">
                  <Link to={`/research/projects/${r.id}`} className="block truncate text-center hover:underline hover:underline-offset-2">
                    {r.title}
                  </Link>
                </div>
                <div className="px-3 text-center text-[12px] text-black/70">
                  {formatDate(r.startDate)} ~ {r.endDate ? formatDate(r.endDate) : "진행중"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {!loading && !error && data.totalPages > 1 && (
        <div className="mt-10"><Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} /></div>
      )}

      <form onSubmit={submitSearch} className="mt-14 flex justify-center">
        <div className="w-full max-w-[520px] flex items-center gap-6">
          <div className="relative">
            <select value={field} onChange={(e) => setField(e.target.value)} className="h-[38px] rounded-full border border-black/40 bg-white px-4 pr-10 text-[13px] font-semibold text-black">
              {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex-1 border-b border-black/40 flex items-center">
            <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="검색어를 입력하세요" className="h-[42px] w-full bg-transparent outline-none text-[14px] text-black" />
            <button type="submit" aria-label="Search" className="px-2 text-black/70">🔍</button>
          </div>
        </div>
      </form>
    </div>
  );
}
