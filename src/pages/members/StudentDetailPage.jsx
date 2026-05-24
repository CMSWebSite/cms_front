import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import { students } from "../../data/students";
import Footer from "../../components/common/Footer";

function DefaultProfileImage() {
  return (
    <div className="relative flex h-[210px] w-[210px] items-center justify-center overflow-hidden rounded-full border-[4px] border-[#e7e7e7] bg-[#d9d9dd]">
      <div className="absolute top-[52px] h-[56px] w-[56px] rounded-full bg-[#f2f2f4]" />
      <div className="absolute bottom-[-12px] h-[92px] w-[130px] rounded-t-[999px] bg-[#f2f2f4]" />
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="mb-5 text-[28px] font-extrabold leading-none text-black">
      {children}
    </h2>
  );
}

function getCategoryTitle(category) {
  if (category === "phd") return "Ph.D Students";
  if (category === "master") return "Master Students";
  if (category === "undergraduate") return "Undergraduate Students";
  return "Students";
}

export default function StudentDetailPage() {
  const { slug } = useParams();
  const student = students.find((item) => item.slug === slug);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  if (!student) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header theme="dark" />
        <main className="pt-[120px]">
          <div className="mx-auto max-w-[1280px] px-[42px]">
            <h1 className="text-[40px] font-extrabold">Student not found</h1>
            <Link
              to="/members/students"
              className="mt-4 inline-block text-[16px] underline"
            >
              Back to Students
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
                className="relative inline-flex h-[54px] items-center font-bold"
              >
                Students
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />
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
        <section className="mx-auto w-full max-w-[1280px] bg-white px-[48px] pb-[60px] pt-[12px]">
          <div className="mb-[28px] text-[13px] leading-none text-black">
            ⌂ Members &gt; Students
          </div>

          <h1 className="mb-[42px] text-center text-[58px] font-extrabold leading-none tracking-[-0.03em] text-black">
            {getCategoryTitle(student.category)}
          </h1>

          <div className="flex items-start gap-[42px]">
            <div className="shrink-0">
              <DefaultProfileImage />
            </div>

            <div className="pt-[24px]">
              <div className="mb-[14px] flex items-center gap-[10px] text-[13px] leading-none text-black/60">
                <button type="button">KOR</button>
                <button type="button" className="text-black">
                  ENG
                </button>
              </div>

              <div className="mb-[18px] flex items-center gap-[14px]">
                <h2 className="text-[34px] font-extrabold leading-none tracking-[-0.02em] text-black">
                  {student.en}
                </h2>
                {student.birth ? (
                  <span className="pt-[4px] text-[14px] text-[#8c8c8c]">
                    {student.birth}
                  </span>
                ) : null}
              </div>

              {student.interests.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-[60px] text-[14px] leading-[1.45] text-black">
                  <ul className="list-disc space-y-[6px] pl-[16px]">
                    {student.interests.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-[14px] text-black/50">No details yet.</div>
              )}
            </div>
          </div>

          <div className="my-[52px] h-px w-full bg-black/20" />

          <section className="mb-[46px]">
            <SectionTitle>Education</SectionTitle>
            {student.education.length > 0 ? (
              <ul className="list-disc space-y-[8px] pl-[18px] text-[14px] leading-[1.45] text-black">
                {student.education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="text-[14px] text-black/50">
                No education information yet.
              </div>
            )}
          </section>

          <section>
            <SectionTitle>Contact</SectionTitle>
            {student.email ? (
              <div className="text-[14px] leading-[1.5] text-black">
                {student.email}
              </div>
            ) : (
              <div className="text-[14px] text-black/50">
                No contact information yet.
              </div>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
