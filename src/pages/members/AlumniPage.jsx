import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const alumniList = [
  {
    ko: "김예동",
    en: "Yeddong Kim",
    degree: "Master (2023)",
    company: "Hyundai Motor Group 현대모비스 (MOBIS, 자율주차팀)",
    email: "qaisczlw1021@g.kmou.ac.kr",
  },
  {
    ko: "김동길",
    en: "Ddonggil Kim",
    degree: "Ph.D (2025)",
    company: "Hyundai Motor Group 현대오토에버 (Autoever, 기능안전직무)",
    email: "ddonggilkim@g.kmou.ac.kr",
  },
];

function AlumniAvatar() {
  return (
    <div className="relative h-[132px] w-[132px] overflow-hidden rounded-full bg-[#d9d9dd] ring-4 ring-[#ececec]">
      <div className="absolute left-1/2 top-[34px] h-[40px] w-[40px] -translate-x-1/2 rounded-full bg-[#f2f2f4]" />
      <div className="absolute left-1/2 bottom-[-12px] h-[64px] w-[86px] -translate-x-1/2 rounded-t-[999px] bg-[#f2f2f4]" />
    </div>
  );
}

function AlumniItem({ alumnus }) {
  return (
    <div className="flex items-start gap-[34px]">
      <div className="shrink-0">
        <AlumniAvatar />
      </div>

      <div className="pt-[28px] text-black">
        <div className="mb-[8px] flex flex-wrap items-center gap-x-[12px] gap-y-[4px]">
          <span className="text-[18px] font-bold leading-none">
            {alumnus.ko}
          </span>
          <span className="text-[18px] font-bold leading-none">
            {alumnus.en}
          </span>
        </div>

        <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.35]">
          <li>{alumnus.degree}</li>
          <li>{alumnus.company}</li>
          <li>{alumnus.email}</li>
        </ul>
      </div>
    </div>
  );
}

export default function AlumniPage() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header theme="dark" />

      <main className="bg-white pt-[88px]">
        {/* members tab */}
        <section className="h-[54px] w-full bg-[#dcdcdc]">
          <div className="mx-auto flex h-full w-full max-w-[1280px] items-center px-[34px]">
            <div className="flex items-center gap-[34px] text-[18px] font-semibold text-black">
              <Link
                to="/members/professor"
                className="inline-flex h-[54px] items-center text-black hover:text-black/70 transition"
              >
                Professor
              </Link>

              <Link
                to="/members/students"
                className="inline-flex h-[54px] items-center text-black hover:text-black/70 transition"
              >
                Students
              </Link>

              <Link
                to="/members/alumni"
                className="relative inline-flex h-[54px] items-center font-bold"
              >
                Alumni
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />
              </Link>
            </div>
          </div>
        </section>

        {/* content */}
        <section className="mx-auto w-full max-w-[1280px] bg-white px-[56px] pb-[80px] pt-[14px]">
          {/* breadcrumb */}
          <div className="mb-[28px] text-[13px] leading-none text-black">
            ⌂ Members &gt; Alumni
          </div>

          {/* title */}
          <h1 className="mb-[54px] text-center text-[62px] font-extrabold leading-none tracking-[-0.03em] text-black">
            Alumni
          </h1>

          {/* alumni list */}
          <div className="flex flex-col gap-[46px]">
            {alumniList.map((alumnus) => (
              <AlumniItem key={alumnus.en} alumnus={alumnus} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
