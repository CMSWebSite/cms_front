import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { publicProfessorApi } from "../../api/public/professor";
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

export default function ProfessorPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setNotFound(false); setError(null);
    publicProfessorApi.get()
      .then((d) => mounted && setData(d))
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setError(err instanceof ApiError ? err.message : "불러오지 못했습니다.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header theme="dark" />

      <main className="bg-white pt-[88px]">
        <MembersTab active="Professor" />

        <section className="mx-auto w-full max-w-[1280px] bg-white px-[42px] pb-[60px] pt-[10px]">
          <div className="mb-[26px] text-[13px] leading-none text-black">
            ⌂ Members &gt; Professor
          </div>

          <h1 className="mb-[44px] text-center text-[62px] font-extrabold leading-none tracking-[-0.03em] text-black">
            Professor
          </h1>

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && notFound && (
            <EmptyState
              title="교수 정보가 아직 등록되지 않았습니다."
              description="관리자 페이지에서 등록 후 표시됩니다."
            />
          )}

          {!loading && !error && data && (
            <>
              <div className="flex items-start gap-[54px]">
                <div className="shrink-0">
                  <div className="flex h-[174px] w-[174px] items-center justify-center overflow-hidden rounded-full border-[4px] border-[#e5e5e5] bg-white">
                    {data.profileImage ? (
                      <img
                        src={data.profileImage}
                        alt={data.name}
                        className="h-[160px] w-[160px] rounded-full object-cover"
                        draggable="false"
                      />
                    ) : (
                      <div className="h-[160px] w-[160px] rounded-full bg-black/10" />
                    )}
                  </div>
                </div>

                <div className="pt-[16px] flex-1 min-w-0">
                  <div className="mb-[14px] flex items-baseline gap-[12px]">
                    <h2 className="text-[34px] font-extrabold leading-none tracking-[-0.02em] text-black">
                      {data.name}
                    </h2>
                    {data.position && (
                      <span className="text-[14px] text-[#8c8c8c]">
                        {data.position}
                      </span>
                    )}
                  </div>

                  {(data.researchFields ?? []).length > 0 && (
                    <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                      {data.researchFields.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}

                  <div className="mt-[18px] space-y-[4px] text-[13px] text-black/75">
                    {data.email && <div>Email: <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></div>}
                    {data.phone && <div>Phone: {data.phone}</div>}
                    {data.office && <div>Office: {data.office}</div>}
                  </div>
                </div>
              </div>

              <div className="my-[42px] h-px w-full bg-black/20" />

              {data.biography && (
                <section className="mb-[42px]">
                  <SectionTitle>Biography</SectionTitle>
                  <p className="whitespace-pre-line text-[14px] leading-[1.7] text-black/85">
                    {data.biography}
                  </p>
                </section>
              )}

              {(data.education ?? []).length > 0 && (
                <section className="mb-[42px]">
                  <SectionTitle>Education</SectionTitle>
                  <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                    {data.education.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}

              {(data.career ?? []).length > 0 && (
                <section className="mb-[42px]">
                  <SectionTitle>Career</SectionTitle>
                  <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                    {data.career.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}

              {(data.publications ?? []).length > 0 && (
                <section className="mb-[42px]">
                  <SectionTitle>Publications</SectionTitle>
                  <ul className="list-disc space-y-[4px] pl-[18px] text-[14px] leading-[1.45] text-black">
                    {data.publications.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
