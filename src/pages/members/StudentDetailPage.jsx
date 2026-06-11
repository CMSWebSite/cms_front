import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { publicStudentsApi } from "../../api/public/students";
import { ApiError } from "../../api/client";

function MembersTab({ active }) {
  const tab = (label, to) => {
    const isActive = label === active;
    return (
      <Link
        to={to}
        className={
          isActive
            ? "relative inline-flex h-[54px] items-center font-bold"
            : "inline-flex h-[54px] items-center text-black hover:text-black/70 transition"
        }
      >
        {label}
        {isActive && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />}
      </Link>
    );
  };
  return (
    <section className="h-[54px] w-full bg-[#dcdcdc]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center px-[34px]">
        <div className="flex items-center gap-[34px] text-[18px] font-semibold text-black">
          {tab("Professor", "/members/professor")}
          {tab("Students", "/members/students")}
          {tab("Alumni", "/members/alumni")}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="mb-[14px] text-[18px] font-bold tracking-[-0.02em] text-black">
      {children}
    </h3>
  );
}

export default function StudentDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setNotFound(false); setError(null);
    publicStudentsApi.getBySlug(slug)
      .then((d) => mounted && setData(d))
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setError(err instanceof ApiError ? err.message : "불러오지 못했습니다.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [slug]);

  const backHref = data?.status === "ALUMNI" ? "/members/alumni" : "/members/students";

  return (
    <div className="min-h-screen bg-white text-black">
      <Header theme="dark" />
      <main className="bg-white pt-[88px]">
        <MembersTab active={data?.status === "ALUMNI" ? "Alumni" : "Students"} />

        <section className="mx-auto w-full max-w-[1280px] bg-white px-[42px] pb-[60px] pt-[10px]">
          <div className="mb-[24px] text-[13px] leading-none text-black">
            ⌂ Members &gt;{" "}
            <Link to={backHref} className="hover:underline">
              {data?.status === "ALUMNI" ? "Alumni" : "Students"}
            </Link>
            {data && <> &gt; {data.koreanName}</>}
          </div>

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && notFound && (
            <div className="py-16 text-center">
              <h1 className="text-[40px] font-bold mb-6">학생을 찾을 수 없습니다.</h1>
              <Link to={backHref} className="inline-block border border-black px-6 py-3 text-[16px]">
                목록으로
              </Link>
            </div>
          )}

          {!loading && !error && data && (
            <>
              <div className="flex items-start gap-[54px]">
                <div className="shrink-0">
                  <div className="flex h-[174px] w-[174px] items-center justify-center overflow-hidden rounded-full border-[4px] border-[#e5e5e5] bg-white">
                    {data.photoUrl ? (
                      <img
                        src={data.photoUrl}
                        alt={data.koreanName}
                        className="h-[160px] w-[160px] rounded-full object-cover"
                        draggable="false"
                      />
                    ) : (
                      <div className="h-[160px] w-[160px] rounded-full bg-black/10" />
                    )}
                  </div>
                </div>

                <div className="pt-[16px] flex-1 min-w-0">
                  <div className="mb-[10px] flex items-baseline gap-[12px]">
                    <h2 className="text-[34px] font-extrabold leading-none tracking-[-0.02em] text-black">
                      {data.koreanName}
                    </h2>
                    <span className="text-[14px] text-[#8c8c8c]">{data.englishName}</span>
                  </div>

                  <div className="mb-[14px] text-[14px] text-black/75">{data.role}</div>

                  <div className="text-[13px] text-black/70 space-y-[4px]">
                    <div>입학: {data.enrolledAt}</div>
                    {data.email && (
                      <div>Email: <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="my-[42px] h-px w-full bg-black/20" />

              {(data.majors ?? []).length > 0 && (
                <section className="mb-[42px]">
                  <SectionTitle>Major</SectionTitle>
                  <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                    {data.majors.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </section>
              )}

              {(data.researchInterests ?? []).length > 0 && (
                <section className="mb-[42px]">
                  <SectionTitle>Research Interests</SectionTitle>
                  <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                    {data.researchInterests.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </section>
              )}

              {(data.career ?? []).length > 0 && (
                <section className="mb-[42px]">
                  <SectionTitle>Career</SectionTitle>
                  <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                    {data.career.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </section>
              )}

              {(data.publications ?? []).length > 0 && (
                <section className="mb-[42px]">
                  <SectionTitle>Publications</SectionTitle>
                  <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                    {data.publications.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </section>
              )}

              <div className="mt-12 flex justify-center">
                <Link
                  to={backHref}
                  className="inline-flex h-[48px] items-center justify-center border border-black px-8 text-[16px] font-medium text-black"
                >
                  목록으로
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
