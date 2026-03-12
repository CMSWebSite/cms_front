import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import professorImg from "../../assets/images/members/news-1.jpg";
import Footer from "../../components/common/Footer";

const professorData = {
  kor: {
    pageTitle: "Professor",
    name: "이광일",
    birth: "1970. 06. 03",
    interestsLeft: [
      "스마트 선박",
      "선박 디지털 인터페이스",
      "e-navigation",
      "해사클라우드",
    ],
    interestsRight: [
      "해양 사이버 보안",
      "공통 해사정보 모델",
    ],
    educationTitle: "학력",
    education: [
      "1993. 2: 충남대학교 컴퓨터과학과(이학사, 전산학)",
      "1996. 8: 충남대학교 컴퓨터과학과(이학석사, 전산학)",
      "2001. 2: 충남대학교 컴퓨터과학과(이학박사, 전산학)",
    ],
    workTitle: "경력",
    work: [
      "Aug. 1998 – Feb. 1999: Visiting Student, Michigan State University",
      "Feb. 2000 – Jan. 2002: Researcher, National Institute of Standards and Technology (NIST)",
      "Apr. 2002 – Aug. 2004: Researcher, University of Maryland",
      "Sep. 2004 – Jan. 2006: Researcher, University of Texas",
      "2006. 5 ~ 2017. 2: 한국전자통신연구원 책임연구원/표준전문위원",
      "2017. 3 ~ 현재: 한국해양대학교 인공지능공학부 부교수",
    ],
    contactTitle: "연락처",
    room: "국립한국해양대학교 공학관(B1) 639호",
  },
  eng: {
    pageTitle: "Professor",
    name: "Kwangil Lee",
    birth: "1970. 06. 03",
    interestsLeft: [
      "Smart ship",
      "Digital Interface International Standards",
      "e-navigation",
      "Maritime cloud",
    ],
    interestsRight: [
      "Maritime cyber security",
      "Common maritime Data Model",
    ],
    educationTitle: "Education",
    education: [
      "Feb. 1993: B.S. in Computer Science, Chungnam National University",
      "Aug. 1996: M.S. in Computer Science, Chungnam National University",
      "Feb. 2001: Ph.D. in Computer Science, Chungnam National University",
    ],
    workTitle: "Work experience",
    work: [
      "Aug. 1998 – Feb. 1999: Visiting Student, Michigan State University",
      "Feb. 2000 – Jan. 2002: Researcher, National Institute of Standards and Technology (NIST)",
      "Apr. 2002 – Aug. 2004: Researcher, University of Maryland",
      "Sep. 2004 – Jan. 2006: Researcher, University of Texas",
      "May 2006 – Feb. 2017: Principal Researcher / Standards Specialist, Electronics and Telecommunications Research Institute (ETRI)",
      "Mar. 2017 – Present: Associate Professor, Department of Artificial Intelligence Engineering, Korea Maritime and Ocean University",
    ],
    contactTitle: "Contact",
    room: "Engineering Building (B1) Room 639, Korea Maritime and Ocean University",
  },
};

function SectionTitle({ children }) {
  return (
    <h2 className="mb-5 text-[28px] font-extrabold leading-none text-black">
      {children}
    </h2>
  );
}

export default function ProfessorPage() {
  const [lang, setLang] = useState("eng");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  const content = professorData[lang];

  return (
    <div className="min-h-screen bg-white text-black">
      <Header theme="dark" />

      <main className="bg-white pt-[96px]">
        {/* members tab */}
        <section className="h-[54px] w-full bg-[#dcdcdc]">
          <div className="mx-auto flex h-full w-full max-w-[1280px] items-center px-[34px]">
            <div className="flex items-center gap-[34px] text-[18px] font-semibold text-black">
              <Link
                to="/members/professor"
                className="relative inline-flex h-[54px] items-center font-bold"
              >
                Professor
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />
              </Link>

              <Link
                to="/members/students"
                className="inline-flex h-[54px] items-center text-black hover:text-black/70 transition"
              >
                Students
              </Link>

              <Link
                to="/members/alumni"
                className="inline-flex h-[54px] items-center text-black hover:text-black/70 transition"
              >
                Alumni
              </Link>
            </div>
          </div>
        </section>

        {/* content */}
        <section className="mx-auto w-full max-w-[1280px] bg-white px-[42px] pb-[40px] pt-[10px]">
          {/* breadcrumb */}
          <div className="mb-[26px] text-[13px] leading-none text-black">
            ⌂ Members &gt; Professor
          </div>

          {/* title */}
          <h1 className="mb-[44px] text-center text-[62px] font-extrabold leading-none tracking-[-0.03em] text-black">
            {content.pageTitle}
          </h1>

          {/* profile area */}
          <div className="flex items-start gap-[54px]">
            {/* photo */}
            <div className="shrink-0">
              <div className="flex h-[174px] w-[174px] items-center justify-center overflow-hidden rounded-full border-[4px] border-[#e5e5e5] bg-white">
                <img
                  src={professorImg}
                  alt={content.name}
                  className="h-[160px] w-[160px] rounded-full object-cover"
                  draggable="false"
                />
              </div>
            </div>

            {/* info */}
            <div className="pt-[16px]">
              {/* language */}
              <div className="mb-[10px] flex items-center gap-[10px] text-[13px] leading-none">
                <button
                  type="button"
                  onClick={() => setLang("kor")}
                  className={lang === "kor" ? "text-black" : "text-black/45"}
                >
                  KOR
                </button>
                <button
                  type="button"
                  onClick={() => setLang("eng")}
                  className={lang === "eng" ? "text-black" : "text-black/45"}
                >
                  ENG
                </button>
              </div>

              {/* name */}
              <div className="mb-[14px] flex items-center gap-[12px]">
                <h2 className="text-[34px] font-extrabold leading-none tracking-[-0.02em] text-black">
                  {content.name}
                </h2>
                <span className="pt-[4px] text-[14px] text-[#8c8c8c]">
                  {content.birth}
                </span>
              </div>

              {/* keywords */}
              <div className="grid grid-cols-2 gap-x-[60px] text-[14px] leading-[1.4] text-black">
                <ul className="list-disc space-y-[4px] pl-[14px]">
                  {content.interestsLeft.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <ul className="list-disc space-y-[4px] pl-[14px]">
                  {content.interestsRight.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="my-[42px] h-px w-full bg-black/20" />

          {/* Education */}
          <section className="mb-[42px]">
            <SectionTitle>{content.educationTitle}</SectionTitle>
            <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
              {content.education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Work experience */}
          <section className="mb-[42px]">
            <SectionTitle>{content.workTitle}</SectionTitle>
            <ul className="list-disc space-y-[5px] pl-[18px] text-[14px] leading-[1.45] text-black">
              {content.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section>
            <SectionTitle>{content.contactTitle}</SectionTitle>
            <div className="text-[14px] leading-[1.5] text-black">
              <div className="mb-[4px] flex flex-wrap items-center gap-x-[24px] gap-y-[4px]">
                <span>leeki@kmou.ac.kr</span>
                <span>Tel: 051-410-4345</span>
                <span>Fax: 051-404-3986</span>
              </div>
              <div>{content.room}</div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}