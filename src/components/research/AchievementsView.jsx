import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const CATS = ["Journals", "Conferences", "Patents", "Others"];
const REGIONS = ["전체", "국내", "국외"];
const FIELDS = ["제목", "분류", "날짜"];
const OTHERS_FILTERS = ["전체", "저작권", "기술이전", "기타"];

const DATA = {
  Journals: [
    {
      id: 1,
      type: "국내",
      title:
        "전장 상황 인지를 위한 데이터셋 구축 및 품질 인지 다중 할당을 적용한 장면 그래프...",
      date: "2025-06-11",
      href: "#",
      linkLabel: "PDF",
    },
  ],
  Conferences: [
    {
      id: 1,
      type: "국내",
      title:
        "[KICS2025추계] 지능형 영상 관제를 위한 스켈레톤 기반 인간 행동 인식 모델...",
      date: "2025-06-11",
      href: "#",
      linkLabel: "PDF",
    },
  ],
  Patents: [
    {
      id: 1,
      title:
        "한국어 문서 계층구조 인식 기반 적응형 RAG 시스템 및 방법 (10-2025-0160722)",
      date: "2025-06-11",
    },
  ],
  Others: [
    {
      id: 1,
      type: "저작권",
      title: "인공지능망 기반 집중도 분석 및 학습 집중도 모니터링 시스템",
      date: "2025-06-11",
      href: "#",
      linkLabel: "PDF",
    },
  ],
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
        active
          ? "border-black text-black"
          : "border-black/40 text-black hover:border-black",
      ].join(" ")}
      style={{ background: "transparent" }}
    >
      {children}
    </button>
  );
}

export default function AchievementsView() {
  // ✅ 스샷은 Conferences가 선택된 예시
  const [cat, setCat] = useState("Conferences");
  const [region, setRegion] = useState("전체");
  const [field, setField] = useState("제목");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const base = DATA[cat] ?? [];
    const byRegion =
      region === "전체" ? base : base.filter((r) => r.type === region);

    // 간단 검색(제목/분류/날짜)
    const keyword = q.trim();
    if (!keyword) return byRegion;

    return byRegion.filter((r) => {
      if (field === "제목") return r.title.includes(keyword);
      if (field === "분류") return r.type.includes(keyword);
      if (field === "날짜") return r.date.includes(keyword);
      return true;
    });
  }, [cat, region, field, q]);

  return (
    <div className="w-full">
      {/* ✅ 상단 pill 탭 row */}
      <div className="mt-10 flex justify-center gap-10">
        {CATS.map((c) => (
          <Pill
            key={c}
            active={cat === c}
            onClick={() => {
              setCat(c);
              setRegion("전체"); // ✅ 카테고리 바뀌면 필터 초기화
              setQ(""); // (선택) 검색도 초기화
            }}
          >
            {c}
          </Pill>
        ))}
      </div>

      {/* ✅ 섹션 타이틀 + 우측 필터(전체/국내/국외) */}
      <div className="mt-14 flex items-end justify-between">
        <div>
          <h2 className="text-[60px] leading-[1] font-extrabold tracking-[-0.02em] text-black">
            {cat}
          </h2>
          <div className="mt-4 h-[2px] w-[120px] bg-black/80" />
        </div>

        {cat !== "Patents" && (
          <div className="flex items-center gap-3 text-[13px] font-semibold text-black">
            {(cat === "Others" ? OTHERS_FILTERS : REGIONS).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={[
                  "px-1",
                  region === r
                    ? "text-black"
                    : "text-black/60 hover:text-black",
                ].join(" ")}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ✅ 테이블 */}
      <div className="mt-6">
        <div className="border-t border-b border-black/40">
          {/* 헤더 */}
          {cat === "Patents" ? (
            <div
              className="grid items-center text-[13px] font-semibold text-black/80"
              style={{
                gridTemplateColumns: "80px 1fr 160px",
                height: 44,
              }}
            >
              <div className="px-3">순서</div>
              <div className="px-3 text-center">제목</div>
              <div className="px-3 text-center">날짜</div>
            </div>
          ) : (
            <div
              className="grid items-center text-[13px] font-semibold text-black/80"
              style={{
                gridTemplateColumns: "80px 120px 1fr 140px 120px",
                height: 44,
              }}
            >
              <div className="px-3">순서</div>
              <div className="px-3">분류</div>
              <div className="px-3">제목</div>
              <div className="px-3 text-center">날짜</div>
              <div className="px-3 text-center">링크</div>
            </div>
          )}

          <div className="h-px bg-black/30" />

          {/* 바디 */}
          {rows.length === 0 ? (
            <div className="py-12 text-center text-[14px] text-black/50">
              데이터가 없습니다.
            </div>
          ) : (
            rows.map((r, idx) =>
              cat === "Patents" ? (
                <div
                  key={r.id}
                  className="grid items-center text-[13px] text-black"
                  style={{
                    gridTemplateColumns: "80px 1fr 160px",
                    minHeight: 56,
                  }}
                >
                  <div className="px-3 text-center">{idx + 1}</div>

                  <div className="px-3 text-center">
                    <Link
                      to={`/research/achievements/patents/${r.id}`}
                      className="block truncate hover:underline hover:underline-offset-2"
                    >
                      {r.title}
                    </Link>
                  </div>

                  <div className="px-3 text-center">{r.date}</div>
                </div>
              ) : (
                <div
                  key={r.id}
                  className="grid items-center text-[13px] text-black"
                  style={{
                    gridTemplateColumns: "80px 120px 1fr 140px 120px",
                    minHeight: 56,
                  }}
                >
                  <div className="px-3 text-center">{idx + 1}</div>
                  <div className="px-3 text-center">{r.type}</div>

                  {/* ✅ 제목 링크 (Journals/Conferences만 상세 이동) */}
                  <div className="px-3">
                    <Link
                      to={
                        cat === "Journals"
                          ? `/research/achievements/journals/${r.id}`
                          : cat === "Conferences"
                            ? `/research/achievements/conferences/${r.id}`
                            : cat === "Others"
                              ? `/research/achievements/others/${r.id}`
                              : "#"
                      }
                      className="block truncate hover:underline hover:underline-offset-2"
                      onClick={(e) => {
                        // Patents는 별도 분기에서 링크 처리하니까 여기선 막아도 됨
                        if (
                          cat !== "Journals" &&
                          cat !== "Conferences" &&
                          cat !== "Others"
                        )
                          e.preventDefault();
                      }}
                    >
                      {r.title}
                    </Link>
                  </div>

                  <div className="px-3 text-center">{r.date}</div>

                  <div className="px-3 flex items-center justify-center gap-2">
                    <span aria-hidden className="text-black/60">
                      🔗
                    </span>
                    <a
                      href={r.href}
                      className="italic font-semibold underline underline-offset-2"
                    >
                      {r.linkLabel}
                    </a>
                  </div>
                </div>
              ),
            )
          )}
        </div>
      </div>

      {/* ✅ 하단 검색 (드롭다운 + 라인 입력 + 돋보기) */}
      <div className="mt-14 flex justify-center">
        <div className="w-full max-w-[520px] flex items-center gap-6">
          {/* 드롭다운 */}
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

          {/* 입력 라인 */}
          <div className="flex-1 border-b border-black/40 flex items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder=""
              className="h-[42px] w-full bg-transparent outline-none text-[14px] text-black"
            />
            <button
              type="button"
              aria-label="Search"
              className="px-2 text-black/70"
              onClick={() => {}}
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
