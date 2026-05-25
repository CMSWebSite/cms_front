import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicJournalsApi } from "../../api/public/journals";
import { publicConferencesApi } from "../../api/public/conferences";
import { publicPatentsApi } from "../../api/public/patents";
import { publicOthersApi } from "../../api/public/others";
import { ApiError } from "../../api/client";
import LoadingState from "../common/LoadingState";
import EmptyState from "../common/EmptyState";
import ErrorState from "../common/ErrorState";
import Pagination from "../common/Pagination";

const CATS = ["Journals", "Conferences", "Patents", "Others"];
const FIELDS = ["제목"];
const OTHERS_FILTERS = ["전체", "저작권", "기술이전", "기타"];

const PAGE_SIZE = 10;

const apiByCat = {
  Journals: publicJournalsApi,
  Conferences: publicConferencesApi,
  Patents: publicPatentsApi,
  Others: publicOthersApi,
};

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-[40px] px-[34px] rounded-full border",
        "text-[13px] font-semibold",
        "transition",
        active ? "border-black text-black" : "border-black/40 text-black hover:border-black",
      ].join(" ")}
      style={{ background: "transparent" }}
    >
      {children}
    </button>
  );
}

function formatDate(isoDate) {
  if (!isoDate) return "";
  return typeof isoDate === "string" ? isoDate.slice(0, 10) : "";
}

const PATENT_STATUS = {
  APPLIED: "출원",
  REGISTERED: "등록",
  REJECTED: "거절",
  EXPIRED: "만료",
};

export default function AchievementsView() {
  const [cat, setCat] = useState("Journals");
  const [field, setField] = useState("제목");
  const [qInput, setQInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [othersType, setOthersType] = useState("전체");

  const [data, setData] = useState({ items: [], totalPages: 0, totalItems: 0, page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    const params = { page, limit: PAGE_SIZE, keyword: keyword || undefined };
    if (cat === "Others" && othersType !== "전체") {
      params.type = othersType;
    }
    apiByCat[cat]
      .list(params)
      .then(setData)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  }, [cat, page, keyword, othersType]);

  useEffect(() => { reload(); }, [reload]);

  useEffect(() => {
    setPage(1);
    setKeyword("");
    setQInput("");
    setOthersType("전체");
  }, [cat]);

  const submitSearch = (e) => {
    e.preventDefault();
    setKeyword(qInput.trim());
    setPage(1);
  };

  const items = data.items;

  return (
    <div className="w-full">
      {/* pill 탭 */}
      <div className="mt-10 flex justify-center gap-10">
        {CATS.map((c) => (
          <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>
        ))}
      </div>

      {/* 섹션 타이틀 + 필터 */}
      <div className="mt-14 flex items-end justify-between">
        <div>
          <h2 className="text-[60px] leading-[1] font-extrabold tracking-[-0.02em] text-black">{cat}</h2>
          <div className="mt-4 h-[2px] w-[120px] bg-black/80" />
        </div>

        {cat === "Others" && (
          <div className="flex items-center gap-3 text-[13px] font-semibold text-black">
            {OTHERS_FILTERS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setOthersType(r); setPage(1); }}
                className={["px-1", othersType === r ? "text-black" : "text-black/60 hover:text-black"].join(" ")}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 테이블 */}
      <div className="mt-6">
        <div className="border-t border-b border-black/40">
          {/* 헤더 */}
          {cat === "Patents" ? (
            <div className="grid items-center text-[13px] font-semibold text-black/80" style={{ gridTemplateColumns: "60px 1fr 160px 100px", height: 44 }}>
              <div className="px-3">순서</div>
              <div className="px-3">제목</div>
              <div className="px-3 text-center">번호 / 날짜</div>
              <div className="px-3 text-center">상태</div>
            </div>
          ) : cat === "Journals" ? (
            <div className="grid items-center text-[13px] font-semibold text-black/80" style={{ gridTemplateColumns: "60px 200px 1fr 140px 100px", height: 44 }}>
              <div className="px-3">순서</div>
              <div className="px-3">저널명</div>
              <div className="px-3">제목</div>
              <div className="px-3 text-center">날짜</div>
              <div className="px-3 text-center">링크</div>
            </div>
          ) : cat === "Conferences" ? (
            <div className="grid items-center text-[13px] font-semibold text-black/80" style={{ gridTemplateColumns: "60px 200px 1fr 140px 100px", height: 44 }}>
              <div className="px-3">순서</div>
              <div className="px-3">학회명</div>
              <div className="px-3">제목</div>
              <div className="px-3 text-center">발표일</div>
              <div className="px-3 text-center">링크</div>
            </div>
          ) : (
            // Others
            <div className="grid items-center text-[13px] font-semibold text-black/80" style={{ gridTemplateColumns: "60px 100px 1fr 140px 100px", height: 44 }}>
              <div className="px-3">순서</div>
              <div className="px-3">분류</div>
              <div className="px-3">제목</div>
              <div className="px-3 text-center">날짜</div>
              <div className="px-3 text-center">파일</div>
            </div>
          )}

          <div className="h-px bg-black/30" />

          {/* 바디 */}
          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={reload} />}

          {!loading && !error && items.length === 0 && (
            <EmptyState title={keyword ? "검색 결과가 없습니다." : "아직 등록된 항목이 없습니다."} />
          )}

          {!loading && !error && items.map((r, idx) => {
            const seq = (data.page - 1) * PAGE_SIZE + idx + 1;

            if (cat === "Journals") {
              return (
                <div key={r.id} className="grid items-center text-[13px] text-black" style={{ gridTemplateColumns: "60px 200px 1fr 140px 100px", minHeight: 56 }}>
                  <div className="px-3 text-center">{seq}</div>
                  <div className="px-3 text-black/70 truncate">{r.journalName || "—"}</div>
                  <div className="px-3">
                    <Link to={`/research/achievements/journals/${r.id}`} className="block truncate hover:underline hover:underline-offset-2">
                      {r.title1}
                      {r.title2 && <span className="block text-[11px] text-black/55 truncate">{r.title2}</span>}
                    </Link>
                  </div>
                  <div className="px-3 text-center">{formatDate(r.publishedDate)}</div>
                  <div className="px-3 flex items-center justify-center">
                    {r.attachmentUrl ? <a href={r.attachmentUrl} target="_blank" rel="noreferrer" className="italic font-semibold underline underline-offset-2">PDF</a> : <span className="text-black/30">—</span>}
                  </div>
                </div>
              );
            }
            if (cat === "Conferences") {
              return (
                <div key={r.id} className="grid items-center text-[13px] text-black" style={{ gridTemplateColumns: "60px 200px 1fr 140px 100px", minHeight: 56 }}>
                  <div className="px-3 text-center">{seq}</div>
                  <div className="px-3 text-black/70 truncate">{r.conferenceName}</div>
                  <div className="px-3">
                    <Link to={`/research/achievements/conferences/${r.id}`} className="block truncate hover:underline hover:underline-offset-2">{r.title}</Link>
                    {r.location && <div className="text-[11px] text-black/45 truncate">{r.location}</div>}
                  </div>
                  <div className="px-3 text-center">{formatDate(r.presentedDate)}</div>
                  <div className="px-3 flex items-center justify-center">
                    {r.attachmentUrl ? <a href={r.attachmentUrl} target="_blank" rel="noreferrer" className="italic font-semibold underline underline-offset-2">PDF</a> : <span className="text-black/30">—</span>}
                  </div>
                </div>
              );
            }
            if (cat === "Patents") {
              const dateText = r.registrationDate ? `등록: ${formatDate(r.registrationDate)}` : r.applicationDate ? `출원: ${formatDate(r.applicationDate)}` : "—";
              const numberText = r.registrationNumber || r.applicationNumber;
              return (
                <div key={r.id} className="grid items-center text-[13px] text-black" style={{ gridTemplateColumns: "60px 1fr 160px 100px", minHeight: 56 }}>
                  <div className="px-3 text-center">{seq}</div>
                  <div className="px-3">
                    <Link to={`/research/achievements/patents/${r.id}`} className="block truncate hover:underline hover:underline-offset-2">{r.title}</Link>
                    <div className="text-[11px] text-black/55 truncate">{r.inventors}</div>
                  </div>
                  <div className="px-3 text-center text-[11px] text-black/65 leading-tight">
                    {numberText && <div>{numberText}</div>}
                    <div>{dateText}</div>
                  </div>
                  <div className="px-3 text-center">{PATENT_STATUS[r.status] ?? r.status}</div>
                </div>
              );
            }
            // Others
            return (
              <div key={r.id} className="grid items-center text-[13px] text-black" style={{ gridTemplateColumns: "60px 100px 1fr 140px 100px", minHeight: 56 }}>
                <div className="px-3 text-center">{seq}</div>
                <div className="px-3 text-center">{r.type}</div>
                <div className="px-3">
                  <Link to={`/research/achievements/others/${r.id}`} className="block truncate hover:underline hover:underline-offset-2">{r.title}</Link>
                </div>
                <div className="px-3 text-center">{formatDate(r.achievedOn)}</div>
                <div className="px-3 flex items-center justify-center">
                  {r.attachmentUrl ? <a href={r.attachmentUrl} target="_blank" rel="noreferrer" className="italic font-semibold underline underline-offset-2">파일</a> : <span className="text-black/30">—</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 페이지네이션 */}
      {!loading && !error && data.totalPages > 1 && (
        <div className="mt-10">
          <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
        </div>
      )}

      {/* 하단 검색 */}
      <form onSubmit={submitSearch} className="mt-14 flex justify-center">
        <div className="w-full max-w-[520px] flex items-center gap-6">
          <div className="relative">
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="h-[38px] rounded-full border border-black/40 bg-white px-4 pr-10 text-[13px] font-semibold text-black"
            >
              {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex-1 border-b border-black/40 flex items-center">
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="h-[42px] w-full bg-transparent outline-none text-[14px] text-black"
            />
            <button type="submit" aria-label="Search" className="px-2 text-black/70">🔍</button>
          </div>
        </div>
      </form>
    </div>
  );
}
