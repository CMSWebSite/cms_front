import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import { students } from "../../data/students";
import Footer from "../../components/common/Footer";

const phdStudents = students.filter((student) => student.category === "phd");
const masterStudents = students.filter(
  (student) => student.category === "master",
);
const undergraduateStudents = students.filter(
  (student) => student.category === "undergraduate",
);

function StudentAvatar() {
  return (
    <div className="relative h-[90px] w-[90px] overflow-hidden rounded-full bg-[#d9d9dd] ring-4 ring-[#ececec]">
      <div className="absolute left-1/2 top-[23px] h-[28px] w-[28px] -translate-x-1/2 rounded-full bg-[#f2f2f4]" />
      <div className="absolute left-1/2 bottom-[-10px] h-[44px] w-[60px] -translate-x-1/2 rounded-t-[999px] bg-[#f2f2f4]" />
    </div>
  );
}

function StudentCard({ student }) {
  return (
    <Link
      to={`/members/students/${student.slug}`}
      className="block w-[112px] cursor-pointer"
    >
      <div className="mb-[10px] flex justify-center">
        <StudentAvatar />
      </div>

      <div className="text-center leading-tight text-black">
        <div className="mb-[4px] text-[11px] font-medium">{student.ko}</div>
        <div className="text-[12px]">{student.en}</div>
        {student.sub ? (
          <div className="mt-[2px] text-[11px] text-black/45">
            {student.sub}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="mb-[22px] text-[28px] font-extrabold leading-none text-black">
      {children}
    </h2>
  );
}

export default function StudentsPage() {
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

        <section className="mx-auto w-full max-w-[1280px] bg-white px-[42px] pb-[60px] pt-[10px]">
          <div className="mb-[24px] text-[13px] leading-none text-black">
            ⌂ Members &gt; Students
          </div>

          <h1 className="mb-[42px] text-center text-[60px] font-extrabold leading-none tracking-[-0.03em] text-black">
            Students
          </h1>

          <section className="mb-[46px]">
            <SectionTitle>Ph.D Students</SectionTitle>
            <div className="flex flex-wrap gap-x-[26px] gap-y-[22px]">
              {phdStudents.map((student) => (
                <StudentCard key={student.slug} student={student} />
              ))}
            </div>
          </section>

          <section className="mb-[46px]">
            <SectionTitle>Master Students</SectionTitle>
            <div className="flex flex-wrap gap-x-[26px] gap-y-[26px]">
              {masterStudents.map((student) => (
                <StudentCard key={student.slug} student={student} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Undergraduate Students</SectionTitle>
            <div className="flex flex-wrap gap-x-[26px] gap-y-[26px]">
              {undergraduateStudents.map((student) => (
                <StudentCard key={student.slug} student={student} />
              ))}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
