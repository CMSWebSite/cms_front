import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";
import AchievementsView from "../components/research/AchievementsView";
import ProjectsView from "../components/research/ProjectsView";
import { publicSiteSettingsApi } from "../api/public/siteSettings";
import research1 from "../assets/images/research-1.jpg";
import research2 from "../assets/images/research-2.jpg";

// Research topics 본문은 관리자 > Site Settings 에서 관리한다.
// - research.intro                      : 상단 소개 문단 (빈 줄로 문단 구분)
// - homepage.research.cardN.title/image : 홈 Research 카드와 공유
// - homepage.research.cardN.description : 각 연구 주제 설명 (빈 값이면 제목·이미지만 표시)
const DEFAULT_INTRO = "사이버마린 시스템 연구실의 주요 연구 분야를 소개합니다.";
const DEFAULT_TOPICS = [
  { title: "Innovative Battlefield Solutions\nEnabled by Artificial Intelligence", image: research1, description: "" },
  { title: "Development of Standardized\nDocumentation", image: research2, description: "" },
  { title: "Smart Ship and\nMarine Cybersecurity", image: "", description: "" },
];

function TopicSection({ topic, index }) {
  const imageFirst = index % 2 === 1;
  const image = topic.image ? (
    <img
      src={topic.image}
      alt=""
      className="w-full h-[280px] object-cover"
      draggable="false"
    />
  ) : (
    <div className="w-full h-[280px] bg-gradient-to-br from-[#1a2030] to-[#0a0e16]" />
  );

  return (
    <section className="mt-16 grid grid-cols-12 gap-10 items-center">
      <div className={imageFirst ? "col-span-7 order-1" : "col-span-5"}>
        {imageFirst ? image : (
          <h2 className="whitespace-pre-line text-[26px] font-extrabold leading-[34px] text-black">
            {topic.title}
          </h2>
        )}
      </div>
      <div className={imageFirst ? "col-span-5 order-2" : "col-span-7"}>
        {imageFirst ? (
          <h2 className="whitespace-pre-line text-[26px] font-extrabold leading-[34px] text-black">
            {topic.title}
          </h2>
        ) : image}
      </div>
      {topic.description && (
        <div className="col-span-12 order-3 whitespace-pre-line text-[16px] leading-[28px] text-black/80 max-w-[900px]">
          {topic.description}
        </div>
      )}
    </section>
  );
}

export default function ResearchPage() {
  const { pathname } = useLocation();
  const [intro, setIntro] = useState(DEFAULT_INTRO);
  const [topics, setTopics] = useState(DEFAULT_TOPICS);

  useEffect(() => {
    if (pathname !== "/research") return undefined;
    let mounted = true;
    publicSiteSettingsApi
      .all()
      .then((s) => {
        if (!mounted || !s) return;
        if (s["research.intro"]?.trim()) setIntro(s["research.intro"]);
        setTopics(
          [1, 2, 3].map((i) => ({
            title: s[`homepage.research.card${i}.title`] || DEFAULT_TOPICS[i - 1].title,
            image: s[`homepage.research.card${i}.image`] || DEFAULT_TOPICS[i - 1].image,
            description: s[`homepage.research.card${i}.description`] || "",
          }))
        );
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [pathname]);

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

      <main
        className="relative z-0 bg-white"
        style={{
          backgroundColor: "#fff",
          color: "rgba(0,0,0,0.88)",
        }}
      >
        <div className="research-scope"></div>
        <div className="h-[88px]" />

        <div data-theme="light">
          <ResearchTabs />

          <section className="w-full bg-white">
            <div className="mx-auto max-w-container px-6 pb-24">
              <div className="pt-6 text-[14px] text-black/70 font-medium">
                {breadcrumb}
              </div>

              <h1 className="mt-12 text-center text-[64px] font-extrabold tracking-[-0.02em] text-black">
                {pageTitle}
              </h1>

              {pathname === "/research" && (
                <>
                  <div className="mt-12 max-w-[900px] space-y-6">
                    {intro
                      .split(/\n\s*\n/)
                      .filter((p) => p.trim())
                      .map((p, i) => (
                        <p
                          key={i}
                          className={
                            i === 0
                              ? "whitespace-pre-line text-[18px] leading-[32px] text-black/90 font-semibold"
                              : "whitespace-pre-line text-[18px] leading-[32px] text-black/80"
                          }
                        >
                          {p.trim()}
                        </p>
                      ))}
                  </div>

                  <hr className="mt-16 border-black/20" />

                  {topics.map((t, i) => (
                    <TopicSection key={i} topic={t} index={i} />
                  ))}
                </>
              )}

              {pathname === "/research/achievements" && <AchievementsView />}

              {pathname === "/research/projects" && <ProjectsView />}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
