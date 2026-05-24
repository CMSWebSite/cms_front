import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";

const JOURNALS = [
  {
    id: "1",
    title1: "전장 상황 인지를 위한 데이터셋 구축 및",
    title2: "품질 인지 다중 할당을 적용한 장면 그래프 생성 기법",
    date: "2025-06-11",
    authors: "Gyuri Kim, Seunggyun Jang, Yewon Kim, Kwangil Lee",
    meta: [
      "저자: IEEE Access (SCIE, JCR Q2)",
      "ISSN: 2169-3536",
      "DOI: http://dx.doi.org/10.1109/ACCESS.2025.3581981",
    ],
    highlights: [
      "Transformer 기반 VRD 모델의 1:1 헝가리안 매칭이 야기하는 관계(손실) 통계적 불균형 문제를 분석하였다.",
      "EGTR에 품질 인지 다중 할당(QAMA) 학습 전략을 도입하여 GT 관계 누락을 1:M 학습으로 실단계에서 구현하였다.",
      "드문 관계 클래스에 대한 양성 샘플 수를 효과적으로 확장하여 관계 예측의 안정성과 일반화를 개선하였다.",
      "다양한 VRD 벤치마크 실험을 통해 제안 기법이 기존 DETR/EGTR 기반 방법 대비 성능 향상을 보임을 검증하였다.",
    ],
    abstract:
      "전장 상황의 영상작용은 복잡하고 특수한 양상을 보이며, 이러한 복합적인 전장 상황을 인지하는 것은 매우 중요하다. 따라서 이를 포함적으로 반영해 전장 상황 특화 데이터셋을 구축하고 전장 객체들의 구조화된 관계를 인식하여 장면 그래프를 생성하고자 한다. 한편, 장면 그래프 생성 모델의 학습 과정에서는 손실 분포의 불균형 문제가 빈번히 발생한다. 이러한 문제를 해결하기 위해 본 연구에서는 학습 단계에서 품질 인지 다중 할당을 도입하는 방법을 제안한다. 학습 시 주체-객체 쌍의 1:1 헝가리안 매칭이 초래하는 손실 분포의 문제를 분석하고, 마커망으로 본 논문에서 구축한 전장 상황 데이터셋을 사용한 실험을 통해 제안하는 방식의 타당성과 우수성을 검증한다.",
    attachment: {
      name: "전장_상황_인지를_위한_데이터셋_구축_및_품질_인지_다중_할당을_적용한_장면_그래프_생성_기법.pdf",
      size: "12.5MB",
      href: "#",
    },
  },
];

const MEMBER_PROFILES = {
  "Gyuri Kim": {
    name: "Gyuri Kim",
    period: "2003.01.01",
    role: "석사 연구생 (2026학년도 입학)",
    photo: "/src/assets/images/member-sample.jpg", // ✅ 너 프로젝트에 있는 이미지로 교체
    major: ["Artificial Intelligence", "Visual Relationship Detection"],
    otherJournals: ["AI 기반 제조 결함 진단 시스템 데이터 편집 및 구현"],
  },
  "Seunggyun Jang": {
    name: "Seunggyun Jang",
    period: "2003.01.01",
    role: "석사 연구생",
    photo: "/src/assets/images/member-sample.jpg",
    major: ["Artificial Intelligence"],
    otherJournals: ["(예시) 논문 제목 1", "(예시) 논문 제목 2"],
  },
  "Yewon Kim": {
    name: "Yewon Kim",
    period: "2003.01.01",
    role: "석사 연구생",
    photo: "/src/assets/images/member-sample.jpg",
    major: ["Marine Cybersecurity"],
    otherJournals: ["(예시) 논문 제목"],
  },
  "Kwangil Lee": {
    name: "Kwangil Lee",
    period: "2003.01.01",
    role: "Professor",
    photo: "/src/assets/images/member-sample.jpg",
    major: ["Autonomous Navigation", "AI"],
    otherJournals: ["(예시) 논문 제목"],
  },
};

function MemberPanel({ open, member, onClose }) {
  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,          // ✅ 무조건 최상단
        pointerEvents: "auto",
      }}
    >
      {/* 배경 딤 */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* ✅ 페이지 컨테이너 오른쪽에 붙는 패널 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none", // 바깥 클릭은 딤이 처리
        }}
      >
        <div
          className="mx-auto max-w-container px-6"
          style={{
            height: "100%",
            pointerEvents: "none",
            position: "relative",
          }}
        >
          <aside
            style={{
              pointerEvents: "auto",
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: 360,
              background: "#fff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              borderLeft: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#000" }}>Member</div>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    fontSize: 18,
                    lineHeight: 1,
                    color: "rgba(0,0,0,0.6)",
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div style={{ marginTop: 8, fontSize: 13, color: "#000", display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ fontWeight: 600 }}>{member?.name ?? "—"}</div>
                <span style={{ color: "rgba(0,0,0,0.3)" }}>·</span>
                <div style={{ color: "rgba(0,0,0,0.7)" }}>{member?.period ?? "—"}</div>
              </div>

              <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
                <img
                  src={member?.photo ?? "/src/assets/images/research-1.jpg"}
                  alt={member?.name ?? ""}
                  draggable={false}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ marginTop: 12, fontSize: 12, color: "rgba(0,0,0,0.7)" }}>
                {member?.role ?? "—"}
              </div>

              <div style={{ marginTop: 20, fontSize: 13, fontWeight: 800, color: "#000" }}>Major</div>
              <ul style={{ marginTop: 8, paddingLeft: 16, color: "rgba(0,0,0,0.8)", fontSize: 12 }}>
                {(member?.major ?? []).map((m) => (
                  <li key={m} style={{ marginBottom: 6 }}>{m}</li>
                ))}
              </ul>

              <div style={{ marginTop: 20, fontSize: 13, fontWeight: 800, color: "#000" }}>Other journals</div>
              <ul style={{ marginTop: 8, paddingLeft: 16, color: "rgba(0,0,0,0.8)", fontSize: 12 }}>
                {(member?.otherJournals ?? []).map((t) => (
                  <li key={t} style={{ marginBottom: 8, lineHeight: "18px" }}>{t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function JournalDetailPage() {
  const { paperId } = useParams();
  const [openMember, setOpenMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const paper = useMemo(
    () => JOURNALS.find((p) => p.id === paperId),
    [paperId],
  );

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main
        className="relative z-0 bg-white"
        style={{ backgroundColor: "#fff", color: "rgba(0,0,0,0.88)" }}
      >
        <div className="h-[88px]" />

        <div data-theme="light" className="text-black">
          {/* 상단 Research 탭 유지 */}
          <ResearchTabs />

          <section className="w-full bg-white">
            <div className="mx-auto max-w-container px-6 pb-24">
              {/* breadcrumb */}
              <div className="pt-6 text-[14px] text-black/70 font-medium">
                <span className="mr-2">⌂</span>
                <Link to="/research" className="hover:underline">
                  Research
                </Link>
                <span className="mx-2">&gt;</span>
                <Link to="/research/achievements" className="hover:underline">
                  Achievements
                </Link>
                <span className="mx-2">&gt;</span>
                <span>Journals</span>
              </div>

              {/* page title */}
              <h1 className="mt-10 text-center text-[56px] font-extrabold tracking-[-0.02em] text-black">
                Journals
              </h1>

              {!paper ? (
                <div className="mt-16 text-center text-black/60">
                  논문을 찾을 수 없습니다.
                </div>
              ) : (
                <>
                  {/* paper header */}
                  <div className="mt-12 max-w-[860px]">
                    <h2 className="text-[22px] font-extrabold leading-[34px] text-black">
                      {paper.title1}
                      <br />
                      {paper.title2}
                    </h2>

                    <div className="mt-2 text-[12px] text-black/50">
                      {paper.date}
                    </div>

                    <div className="mt-2 text-[13px] italic text-black">
                      {paper.authors.split(",").map((raw, idx, arr) => {
                        const name = raw.trim();
                        return (
                          <span key={name}>
                            <button
                              type="button"
                              onClick={() => {
                                console.log("author click:", name);
                                setOpenMember(true);

                                const m = MEMBER_PROFILES[name];
                                setSelectedMember(
                                  m ?? {
                                    name,
                                    period: "—",
                                    role: "—",
                                    photo: "/src/assets/images/research-1.jpg",
                                    major: [],
                                    otherJournals: [],
                                  },
                                );
                              }}
                              className="underline underline-offset-2 hover:text-black/80"
                            >
                              {name}
                            </button>
                            {idx < arr.length - 1 ? ", " : ""}
                          </span>
                        );
                      })}
                    </div>

                    <ul className="mt-6 space-y-2 text-[13px] text-black/80">
                      {paper.meta.map((m) => (
                        <li key={m} className="flex gap-2">
                          <span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-black/70" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* highlights box */}
                  <div
                    className="mt-8 max-w-[860px] rounded-[2px] p-8"
                    style={{ background: "#F0F0F0" }}
                  >
                    <div className="text-[16px] font-extrabold italic text-black">
                      Highlights
                    </div>

                    <ul className="mt-4 space-y-3 text-[13px] leading-[22px] text-black/80">
                      {paper.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-[8px] h-[4px] w-[4px] rounded-full bg-black/60" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* abstract */}
                  <div className="mt-10 max-w-[860px]">
                    <div className="text-[18px] font-extrabold italic text-black">
                      Abstract
                    </div>

                    <p className="mt-4 text-[13px] leading-[22px] text-black/80">
                      {paper.abstract}
                    </p>
                  </div>

                  {/* divider */}
                  <div className="mt-10 h-px w-full bg-black/20" />

                  {/* attachment */}
                  <div className="mt-4 flex items-center gap-3 text-[12px] text-black/70">
                    <span className="font-semibold">첨부파일</span>
                    <span className="text-black/40">|</span>
                    <a href={paper.attachment.href} className="hover:underline">
                      {paper.attachment.name} ({paper.attachment.size})
                    </a>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <MemberPanel
        open={openMember}
        member={selectedMember}
        onClose={() => setOpenMember(false)}
      />

      <Footer />
    </div>
  );
}
