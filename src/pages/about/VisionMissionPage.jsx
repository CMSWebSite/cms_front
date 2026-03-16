import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function VisionMissionPage() {
  const researchTopics = [
    "자연어처리(NLP) 중심의 인공지능 기반 기술 개발",
    "초거대 언어모델(Large Language Models, LLMs) 개발 및 최적화",
    "멀티모달(Multimodal) AI 시스템 연구",
    "AI 모델의 성능 향상 및 효율성 개선을 위한 혁신적 방법론 개발",
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black">
      <Header />

      <main className="pt-[96px]">
        {/* 상단 탭 */}
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[72px] items-center gap-[48px]">
              <Link
                to="/about/facilities"
                className="pb-1 text-[18px] font-semibold leading-none text-black"
              >
                Facilities
              </Link>

              <Link
                to="/about/vision"
                className="border-b-2 border-black pb-1 text-[18px] font-semibold leading-none"
              >
                Vision & Mission
              </Link>
            </div>
          </div>
        </section>

        {/* 본문 */}
        <section className="mx-auto max-w-[1280px] px-12 pt-4 pb-24">
          {/* breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-[18px] text-black/85">
            <span className="text-[16px]">⌂</span>
            <span>About us &gt; Vision &amp; Mission</span>
          </div>

          {/* 제목 */}
          <h1 className="mb-12 text-center text-[64px] font-extrabold leading-none tracking-tight">
            Vision &amp; Mission
          </h1>

          {/* 소개 문단 */}
          <div className="mx-auto max-w-[1120px]">
            <p className="mb-4 text-[22px] font-medium leading-[1.7] tracking-[-0.02em]">
              Cybermarine system 연구실은 최첨단 AI 기술을 연구하고 개발하여 다양한
              분야의 실제 문제를 해결하는 데 중점을 두고 있습니다. 우리의 연구는
              다음과 같은 세 가지 주요 영역으로 나눌 수 있습니다.
            </p>

            <p className="mb-14 text-[22px] font-medium leading-[1.7] tracking-[-0.02em]">
              The Cybermarine system lab focuses on researching and developing
              cutting-edge AI technologies to solve real-world problems in
              various fields. Our research can be divided into three main
              areas.
            </p>

            {/* 이미지 자리 */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-[320px] w-[520px] items-center justify-center rounded-md border-2 border-dashed border-black/15 bg-white/30">
                <span className="text-[18px] font-medium text-black/30">
                  image placeholder
                </span>
              </div>
            </div>

            {/* 소제목 */}
            <h2 className="mb-4 text-center text-[30px] font-extrabold tracking-tight">
              AI 원천기술 연구
            </h2>

            {/* 설명 */}
            <p className="mb-8 text-center text-[20px] font-medium leading-[1.8] tracking-[-0.02em]">
              우리 연구실은 인공지능의 기반이 되는 핵심 기술을 연구하고 개발합니다.
              <br />
              주요 연구 방향은 다음과 같습니다.
            </p>

            {/* 리스트 */}
            <ol className="mx-auto max-w-[760px] list-decimal space-y-3 pl-8 text-[19px] font-medium leading-[1.8] tracking-[-0.02em]">
              {researchTopics.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}