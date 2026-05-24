import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import aiCoreTech from "../../assets/images/about/vision/ai-core-tech.svg";
import aiApplication from "../../assets/images/about/vision/ai-application.svg";
import marineAi from "../../assets/images/about/vision/marine-ai.svg";

export default function VisionMissionPage() {
  const sections = [
    {
      image: aiCoreTech,
      title: "AI 원천기술 연구",
      description:
        "우리 연구실은 인공지능의 기반이 되는 핵심 기술을 연구하고 개발합니다.\n주요 연구 방향은 다음과 같습니다.",
      items: [
        "자연어처리(NLP) 중심의 인공지능 기반 기술 개발",
        "초거대 언어모델(Large Language Models, LLMs) 개발 및 최적화",
        "멀티모달(Multimodal) AI 시스템 연구",
        "AI 모델의 성능 향상 및 효율성 개선을 위한 혁신적 방법론 개발",
      ],
    },
    {
      image: aiApplication,
      title: "AI 응용 기술 개발",
      description:
        "우리 연구실은 개발된 AI 원천 기술을 다양한 실제 문제에 적용하여 혁신적인 솔루션을 제공합니다.\n주요 응용 방향은 다음과 같습니다.",
      items: [
        "교육, 제조, 헬스케어 등 다양한 분야의 문제 해결을 위한 AI 시스템 개발",
        "산업 현장의 효율성 향상을 위한 AI 기반 솔루션 개발",
        "데이터 기반 의사결정 지원 시스템 구축",
        "개인정보 보호와 데이터 보안을 위한 AI 기술 응용",
      ],
    },
    {
      image: marineAi,
      title: "해양 AI 특화 연구",
      description:
        "국립한국해양대학교의 특성을 살려, 우리 연구실은 해양 분야에 특화된 AI 기술 연구와 개발에 주력하고 있습니다.\n주요 연구 방향은 다음과 같습니다.",
      items: [
        "해양 산업의 디지털 트랜스포메이션(DX) 촉진을 위한 AI 솔루션 개발",
        "해양 빅데이터 분석 및 AI 기반 예측 모델 개발",
        "해양 환경 모니터링 및 보존을 위한 AI 기술 응용",
        "수산업 및 해양 자원 관리를 위한 지능형 시스템 개발",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black">
      <Header />

      <main className="pt-[88px]">
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

            <p className="text-[22px] font-medium leading-[1.7] tracking-[-0.02em]">
              The Cybermarine system lab focuses on researching and developing
              cutting-edge AI technologies to solve real-world problems in
              various fields. Our research can be divided into three main
              areas.
            </p>
          </div>

          {/* 세 가지 연구 영역 */}
          {sections.map((section, index) => (
            <div
              key={index}
              className={`mx-auto max-w-[1120px] ${
                index === 0 ? "mt-24" : "mt-28"
              }`}
            >
              {/* 이미지 */}
              <div className="flex justify-center">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full max-w-[720px] rounded-xl"
                />
              </div>

              {/* 소제목 */}
              <h2 className="mt-10 text-center text-[30px] font-extrabold tracking-tight">
                {section.title}
              </h2>

              {/* 설명 */}
              <p className="mt-5 whitespace-pre-line text-center text-[20px] font-medium leading-[1.8] tracking-[-0.02em]">
                {section.description}
              </p>

              {/* 리스트 */}
              <ol className="mx-auto mt-7 max-w-[760px] list-decimal space-y-3 pl-8 text-[19px] font-medium leading-[1.8] tracking-[-0.02em]">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          ))}

          {/* 마무리 문단 */}
          <div className="mx-auto mt-28 max-w-[1000px]">
            <p className="text-center text-[20px] font-medium leading-[1.9] tracking-[-0.02em]">
              인공지능응용연구실은 이러한 세 가지 핵심 연구 영역을 통해 AI 기술의
              이론적 발전과 실제 응용, 그리고 해양 분야의 특화된 솔루션 개발을
              동시에 추구합니다.
            </p>
            <p className="mt-4 text-center text-[20px] font-medium leading-[1.9] tracking-[-0.02em]">
              우리는 학술적 탁월성과 산업 적용성, 그리고 해양 분야의 전문성을
              바탕으로 혁신적인 AI 솔루션을 통해 다양한 분야의 현안을 해결하고
              사회적 가치를 창출하고자 노력하고 있습니다.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
