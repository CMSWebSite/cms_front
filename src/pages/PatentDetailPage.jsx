import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";

const PATENTS = [
  {
    id: "1",
    title:
      "한국어 문서 계층구조 인식 기반 적응형 RAG 시스템 및 방법 (10-2025-0160722)",
    date: "2025-06-11",
    authors: "Yewon Kim, Kwangil Lee",
    bullets: ["출원번호:", "출원일:", "출원인:", "참조번호:"],
    attachment: {
      name:
        "전장_상황_인지를_위한_데이터셋_구축_및_품질_인지_다중_할당을_적용한_장면_그래프_생성_기법.pdf",
      size: "12.5MB",
      href: "#",
    },
  },
];

function Divider() {
  return <div className="h-px w-full bg-black/20" />;
}

export default function PatentDetailPage() {
  const { paperId } = useParams();

  const paper = useMemo(
    () => PATENTS.find((p) => p.id === paperId),
    [paperId]
  );

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main
        className="relative z-0 bg-white"
        style={{ backgroundColor: "#fff", color: "rgba(0,0,0,0.88)" }}
      >
        <div className="h-[96px]" />

        <div data-theme="light" className="text-black">
          <ResearchTabs />

          <section className="w-full bg-white">
            <div className="mx-auto max-w-container px-6 pb-24">
              {/* breadcrumb */}
              <div className="pt-6 text-[13px] text-black/70 font-medium">
                <span className="mr-2">⌂</span>
                <Link to="/research" className="hover:underline">
                  Research
                </Link>
                <span className="mx-2">&gt;</span>
                <Link to="/research/achievements" className="hover:underline">
                  Achievements
                </Link>
                <span className="mx-2">&gt;</span>
                <span>Patents</span>
              </div>

              {/* center title */}
              <h1 className="mt-10 text-center text-[56px] font-extrabold tracking-[-0.02em] text-black">
                Patents
              </h1>

              {!paper ? (
                <div className="mt-16 text-center text-black/60">
                  내용을 찾을 수 없습니다.
                </div>
              ) : (
                <div className="mx-auto mt-12 max-w-[860px]">
                  {/* title */}
                  <h2 className="text-[22px] font-extrabold leading-[36px] text-black">
                    {paper.title}
                  </h2>

                  {/* date */}
                  <div className="mt-2 text-[12px] text-black/50">
                    {paper.date}
                  </div>

                  {/* authors */}
                  <div className="mt-2 text-[13px] italic text-black underline underline-offset-4">
                    {paper.authors}
                  </div>

                  {/* bullets */}
                  <ul className="mt-6 space-y-2 text-[13px] leading-[22px] text-black/80">
                    {paper.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[9px] h-[4px] w-[4px] rounded-full bg-black/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* divider */}
                  <div className="mt-12">
                    <Divider />
                  </div>

                  {/* attachment */}
                  <div className="mt-4 flex items-center gap-3 text-[12px] text-black/70">
                    <span className="font-semibold">첨부파일</span>
                    <span className="text-black/30">|</span>
                    <span aria-hidden className="text-black/60">
                      📎
                    </span>
                    <a href={paper.attachment.href} className="hover:underline">
                      {paper.attachment.name} ({paper.attachment.size})
                    </a>
                  </div>

                  <div className="mt-12">
                    <Divider />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
