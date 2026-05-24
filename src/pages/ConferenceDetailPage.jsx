import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";

const CONFS = [
  {
    id: "1",
    pageTitle: "Conferences",
    title: "[KICS2025추계] 지능형 영상 관제를 위한 스켈레톤 기반 인간 행동 인식 모델 성능 비교 연구",
    date: "2025-06-11",
    authors: "Gyuri Kim, Seunggyun Jang, Yewon Kim, Kwangil Lee",
    bullets: [
      "학회명: 2025년 한국정보통신학회 추계종합학술대회 (2025 KICS Fall Conference)",
      "주최: 사단법인 한국정보통신학회 (KICS, Korea Institute of Communication Sciences)",
      "일시: 2025년 10월 23일(목) ~ 25일(토)",
    ],
    keywords: ["#딥러닝", "#VisualRelationshipDetection(VRD)", "#인공지능"],
    attachment: {
      name: "전장_상황_인지를_위한_데이터셋_구축_및_품질_인지_다중_할당을_적용한_장면_그래프_생성_기법.pdf",
      size: "12.5MB",
      href: "#",
    },
  },
];

function Divider() {
  return <div className="h-px w-full bg-black/20" />;
}

export default function ConferenceDetailPage() {
  const { paperId } = useParams();

  const paper = useMemo(
    () => CONFS.find((p) => p.id === paperId),
    [paperId]
  );

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main
        className="relative z-0 bg-white"
        style={{ backgroundColor: "#fff", color: "rgba(0,0,0,0.88)" }}
      >
        {/* fixed header space */}
        <div className="h-[88px]" />

        <div data-theme="light" className="text-black">
          {/* 상단 Research 탭 유지 */}
          <ResearchTabs />

          <section className="w-full bg-white">
            <div className="mx-auto max-w-container px-6 pb-24">
              {/* breadcrumb (스샷처럼 텍스트만, 아이콘은 생략/가능) */}
              <div className="pt-6 text-[13px] text-black/70 font-medium">
                <Link to="/research" className="hover:underline">Research</Link>
                <span className="mx-2">&gt;</span>
                <Link to="/research/achievements" className="hover:underline">Achievements</Link>
                <span className="mx-2">&gt;</span>
                <span>Conferences</span>
              </div>

              {/* Center title */}
              <h1 className="mt-10 text-center text-[56px] font-extrabold tracking-[-0.02em] text-black">
                Conferences
              </h1>

              {!paper ? (
                <div className="mt-16 text-center text-black/60">
                  내용을 찾을 수 없습니다.
                </div>
              ) : (
                <>
                  {/* 본문 너비/여백: 스샷처럼 중앙에 넉넉한 마진 */}
                  <div className="mx-auto mt-12 max-w-[860px]">
                    {/* 논문 제목 */}
                    <h2 className="text-[22px] font-extrabold leading-[36px] text-black">
                      {paper.title}
                    </h2>

                    {/* 날짜 */}
                    <div className="mt-2 text-[12px] text-black/50">
                      {paper.date}
                    </div>

                    {/* 저자 (이탤릭+밑줄 느낌) */}
                    <div className="mt-2 text-[13px] italic text-black underline underline-offset-4">
                      {paper.authors}
                    </div>

                    {/* 메타 bullet */}
                    <ul className="mt-6 space-y-2 text-[13px] leading-[22px] text-black/80">
                      {paper.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-[9px] h-[4px] w-[4px] rounded-full bg-black/70" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Keyword */}
                    <div className="mt-10">
                      <div className="text-[18px] font-extrabold italic text-black">
                        Keyword
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-[13px] text-black/80">
                        {paper.keywords.map((k) => (
                          <span key={k} className="font-semibold">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* divider */}
                    <div className="mt-14">
                      <Divider />
                    </div>

                    {/* attachment row */}
                    <div className="mt-4 flex items-center gap-3 text-[12px] text-black/70">
                      <span className="font-semibold">첨부파일</span>
                      <span className="text-black/30">|</span>
                      <span aria-hidden className="text-black/60">📎</span>
                      <a href={paper.attachment.href} className="hover:underline">
                        {paper.attachment.name} ({paper.attachment.size})
                      </a>
                    </div>

                    {/* footer 위 구분선 (스샷처럼 더 아래에 얇게 한번 더) */}
                    <div className="mt-12">
                      <Divider />
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
