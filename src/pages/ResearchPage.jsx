import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";
import AchievementsView from "../components/research/AchievementsView";
import ProjectsView from "../components/research/ProjectsView";

export default function ResearchPage() {
  const { pathname } = useLocation();

  const pageTitle =
    pathname === "/research/achievements"
      ? "Achievements"
      : pathname === "/research/projects"
        ? "Projects"
        : "Research topics";

  const breadcrumb =
    pathname === "/research/achievements"
      ? "⌂ Research > Achievements"
      : pathname === "/research/projects"
        ? "⌂ Research > Projects"
        : "⌂ Research > Research topics";

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      {/* ✅ main부터 라이트 */}
      <main
        className="relative z-0 bg-white"
        style={{
          backgroundColor: "#fff",
          color: "rgba(0,0,0,0.88)", // 기본 텍스트 색 강제
        }}
      >
        <div className="research-scope"></div>
        <div className="h-[88px]" />

        <div data-theme="light">
          {/* ✅ 탭(라우팅됨) */}
          <ResearchTabs />

          {/* ✅ 본문 */}
          <section className="w-full bg-white">
            <div className="mx-auto max-w-container px-6 pb-24">
              {/* breadcrumb */}
              <div className="pt-6 text-[14px] text-black/70 font-medium">
                {breadcrumb}
              </div>

              {/* title */}
              <h1 className="mt-12 text-center text-[64px] font-extrabold tracking-[-0.02em] text-black">
                {pageTitle}
              </h1>

              {/* intro: topics에서만 보여주고, 나머지는 placeholder */}
              {pathname === "/research" && (
                <div className="mt-12 max-w-[900px]">
                  <p className="text-[18px] leading-[32px] text-black/90 font-semibold">
                    우리는 지구를 보호하고 인류의 삶의 질을 향상시키며, 미래의
                    지속가능한 성장을 위한 핵심 기술 개발에 집중합니다.
                  </p>
                  <p className="mt-6 text-[18px] leading-[32px] text-black/80">
                    We focus on protecting the planet, improving the quality of
                    life for mankind, and developing core technologies for
                    sustainable growth in the future.
                  </p>
                </div>
              )}

              {pathname === "/research/achievements" && <AchievementsView />}

              {pathname === "/research/projects" && <ProjectsView />}

              {pathname === "/research/projects" && (
                <div className="mt-12 max-w-[900px] text-[18px] leading-[32px] text-black/80">
                  Content for <b>{pageTitle}</b> will be placed here.
                </div>
              )}

              <hr className="mt-16 border-black/20" />

              {/* ✅ topics일 때만 기존 섹션 유지 */}
              {pathname === "/research" && (
                <>
                  {/* section 1 */}
                  <section className="mt-16 grid grid-cols-12 gap-10 items-center">
                    <div className="col-span-5">
                      <h2 className="text-[26px] font-extrabold leading-[34px] text-black">
                        Innovative Battlefield
                        <br />
                        Solutions Enabled by
                        <br />
                        Artificial Intelligence
                      </h2>
                    </div>

                    <div className="col-span-7">
                      <img
                        src="/src/assets/images/research-1.jpg"
                        alt=""
                        className="w-full h-[280px] object-cover"
                        draggable="false"
                      />
                    </div>
                  </section>

                  {/* section 2 */}
                  <section className="mt-14 grid grid-cols-12 gap-10 items-start">
                    <div className="col-span-7">
                      <img
                        src="/src/assets/images/research-2.jpg"
                        alt=""
                        className="w-full h-[280px] object-cover"
                        draggable="false"
                      />
                    </div>

                    <div className="col-span-5 text-[16px] leading-[28px] text-black/80 space-y-6">
                      <p>
                        인구과잉, 자원고갈, 에너지문제
                        <br />
                        인류와 지구가 당면한 문제 해결을 위해 민간이 우주 자원
                        개발에 나서는 뉴스페이스 시대가 다가오고 있습니다.
                      </p>
                      <p>
                        우주에 있는 무한한 에너지와 광물자원, 우리는 인류, 지구,
                        미래를 위해 활용할 수 있는 방법을 찾아가고 있습니다.
                      </p>
                    </div>
                  </section>
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
