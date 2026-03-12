import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";

// ✅ 더미 데이터 (나중에 실제 데이터로 교체)
const PROJECTS = [
  {
    id: "1",
    title:
      "[KMOU BRIDGE 3.0 융복합 공동기술사업화] 소형 선박용 영상분석 기반 이상행동 탐지 기술 개발",
    date: "2025-06-11",
    sponsor: "ETRI",
    image: "/src/assets/images/research-1.jpg", // ✅ 임시 이미지(원하는 걸로 교체)
    body: [
      "Deep learning techniques have led to remarkable breakthroughs in the field of object detection and have spawned a lot of scene-understanding tasks in recent years. Scene graph has been the focus of research because of its powerful semantic representation and applications to scene understanding.",
      "Scene Graph Generation (SGG) refers to the task of automatically mapping an image or a video into a semantic structural scene graph, which requires the correct labeling of detected objects and their relationships.",
      "In this paper, a comprehensive survey of recent achievements is provided. This survey attempts to connect and systematize the existing visual relationship detection methods, to summarize, and interpret the mechanisms and the strategies of SGG in a comprehensive way. Deep discussions about current existing problems and future research directions are given at last. This survey will help readers to develop a better understanding of the current research.",
    ],
  },
  {
    id: "2",
    title:
      "[재난안전 공동연구 기술개발사업] 생성형 AI 기반 안전제도 진단 지원시스템 개발",
    date: "2025-07-18",
    sponsor: "—",
    image: "/src/assets/images/research-2.jpg",
    body: ["(내용은 추후 입력)"],
  },
];

function Divider() {
  return <div className="h-px w-full bg-black/20" />;
}

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const project = useMemo(
    () => PROJECTS.find((p) => p.id === projectId),
    [projectId]
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
          {/* 상단 Research 탭 유지(스샷처럼) */}
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
                <Link to="/research/projects" className="hover:underline">
                  Projects
                </Link>
              </div>

              {/* center title */}
              <h1 className="mt-10 text-center text-[56px] font-extrabold tracking-[-0.02em] text-black">
                Projects
              </h1>

              {!project ? (
                <div className="mt-16 text-center text-black/60">
                  내용을 찾을 수 없습니다.
                </div>
              ) : (
                <div className="mx-auto mt-12 max-w-[860px]">
                  {/* title */}
                  <h2 className="text-[22px] font-extrabold leading-[36px] text-black">
                    {project.title}
                  </h2>

                  {/* date */}
                  <div className="mt-2 text-[12px] text-black/50">
                    {project.date}
                  </div>

                  {/* sponsor */}
                  <div className="mt-2 text-[12px] text-black/70">
                    지원 기관: {project.sponsor}
                  </div>

                  {/* image */}
                  <div className="mt-8 flex justify-center">
                    <div className="w-[520px]">
                      <img
                        src={project.image}
                        alt=""
                        draggable={false}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* body text */}
                  <div className="mt-10 space-y-4 text-[13px] leading-[22px] text-black/80">
                    {project.body.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* bottom divider (스샷처럼) */}
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
