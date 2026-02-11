import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const FILTERS = ["전체", "수행 중", "수행 완료"];
const FIELDS = ["제목", "분류", "기간"];

const DATA = [
  {
    id: 1,
    status: "수행 중",
    title:
      "[KMOU BRIDGE 3.0 융복합 공동기술사업화] 소형 선박용 영상분석 기반 이상행동 탐지 기술 개발",
    period: "2025-06-11",
  },
  {
    id: 2,
    status: "수행 완료",
    title:
      "[재난안전 공동연구 기술개발사업] 생성형 AI 기반 안전제도 진단 지원시스템 개발",
    period: "2025-07-18 ~ 2026-01-03",
  },
];

export default function ProjectsView() {
  const [filter, setFilter] = useState("전체");
  const [field, setField] = useState("제목");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const base =
      filter === "전체" ? DATA : DATA.filter((r) => r.status === filter);

    const keyword = q.trim();
    if (!keyword) return base;

    return base.filter((r) => {
      if (field === "제목") return r.title.includes(keyword);
      if (field === "분류") return r.status.includes(keyword);
      if (field === "기간") return r.period.includes(keyword);
      return true;
    });
  }, [filter, field, q]);

  return (
    <div className="w-full">
      {/* ✅ 섹션 타이틀 + 우측 필터 */}
      <div className="mt-14 flex items-end justify-between">
        <div>
          <h2 className="text-[60px] leading-[1] font-extrabold tracking-[-0.02em] text-black">
            Projects
          </h2>
          <div className="mt-4 h-[2px] w-[120px] bg-black/80" />
        </div>

        <div className="flex items-center gap-3 text-[13px] font-semibold text-black">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={[
                "px-1",
                filter === f ? "text-black" : "text-black/60 hover:text-black",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ 테이블 */}
      <div className="mt-6">
        <div className="border-t border-b border-black/40">
          {/* 헤더 */}
          <div
            className="grid items-center text-[13px] font-semibold text-black/80"
            style={{
              gridTemplateColumns: "80px 140px 1fr 200px",
              height: 44,
            }}
          >
            <div className="px-3">순서</div>
            <div className="px-3">분류</div>
            <div className="px-3 text-center">제목</div>
            <div className="px-3 text-center">수행 기간</div>
          </div>

          <div className="h-px bg-black/30" />

          {/* 바디 */}
          {rows.length === 0 ? (
            <div className="py-12 text-center text-[14px] text-black/50">
              데이터가 없습니다.
            </div>
          ) : (
            rows.map((r, idx) => (
              <div
                key={r.id}
                className="grid items-center text-[13px] text-black"
                style={{
                  gridTemplateColumns: "80px 140px 1fr 200px",
                  minHeight: 56,
                }}
              >
                <div className="px-3 text-center">{idx + 1}</div>
                <div className="px-3 text-center">{r.status}</div>

                {/* 제목: 스샷처럼 가운데 정렬 + 말줄임 */}
                <div className="px-3">
                  <Link
                    to={`/research/projects/${r.id}`}
                    className="block truncate text-center hover:underline hover:underline-offset-2"
                  >
                    {r.title}
                  </Link>
                </div>

                <div className="px-3 text-center whitespace-pre-line">
                  {r.period}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ 하단 검색 */}
      <div className="mt-14 flex justify-center">
        <div className="w-full max-w-[520px] flex items-center gap-6">
          <div className="relative">
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="h-[38px] rounded-full border border-black/40 bg-white px-4 pr-10 text-[13px] font-semibold text-black"
            >
              {FIELDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 border-b border-black/40 flex items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-[42px] w-full bg-transparent outline-none text-[14px] text-black"
            />
            <button
              type="button"
              aria-label="Search"
              className="px-2 text-black/70"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
