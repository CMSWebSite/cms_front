import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import { publicVisionMissionApi } from "../../api/public/visionMission";
import { ApiError } from "../../api/client";

export default function VisionMissionPage() {
  const [sections, setSections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setError(null);
    publicVisionMissionApi.list()
      .then((d) => mounted && setSections(d))
      .catch((err) => mounted && setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // intro/closing 키는 별도 처리, 나머지는 본문 섹션
  const intro = (sections ?? []).find((s) => s.sectionKey === "intro");
  const closing = (sections ?? []).find((s) => s.sectionKey === "closing");
  const bodySections = (sections ?? []).filter((s) => s.sectionKey !== "intro" && s.sectionKey !== "closing");

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black">
      <Header />

      <main className="pt-[88px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[72px] items-center gap-[48px]">
              <Link to="/about/facilities" className="pb-1 text-[18px] font-semibold leading-none text-black">Facilities</Link>
              <Link to="/about/vision" className="border-b-2 border-black pb-1 text-[18px] font-semibold leading-none">Vision & Mission</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-4 pb-24">
          <div className="mb-8 flex items-center gap-2 text-[18px] text-black/85">
            <span className="text-[16px]">⌂</span>
            <span>About us &gt; Vision &amp; Mission</span>
          </div>

          <h1 className="mb-12 text-center text-[64px] font-extrabold leading-none tracking-tight">
            Vision &amp; Mission
          </h1>

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} />}

          {!loading && !error && (sections?.length === 0) && (
            <EmptyState
              title="아직 등록된 섹션이 없습니다."
              description="관리자 페이지에서 섹션을 등록해 보세요. (intro / area1 / area2 / area3 / closing)"
            />
          )}

          {!loading && !error && intro && (
            <div className="mx-auto max-w-[1120px]">
              {intro.content && (
                <p className="text-[22px] font-medium leading-[1.7] tracking-[-0.02em] whitespace-pre-line">
                  {intro.content}
                </p>
              )}
            </div>
          )}

          {!loading && !error && bodySections.map((section, index) => (
            <div key={section.id} className={`mx-auto max-w-[1120px] ${index === 0 ? "mt-24" : "mt-28"}`}>
              {section.image && (
                <div className="flex justify-center">
                  <img src={section.image} alt={section.title || ""} className="w-full max-w-[720px] rounded-xl" />
                </div>
              )}
              {section.title && (
                <h2 className="mt-10 text-center text-[30px] font-extrabold tracking-tight">
                  {section.title}
                </h2>
              )}
              {section.subtitle && (
                <div className="mt-3 text-center text-[16px] text-black/65">{section.subtitle}</div>
              )}
              {section.content && (
                <p className="mt-5 whitespace-pre-line text-center text-[20px] font-medium leading-[1.8] tracking-[-0.02em]">
                  {section.content}
                </p>
              )}
              {(section.items ?? []).length > 0 && (
                <ol className="mx-auto mt-7 max-w-[760px] list-decimal space-y-3 pl-8 text-[19px] font-medium leading-[1.8] tracking-[-0.02em]">
                  {section.items.map((it, i) => <li key={i}>{it}</li>)}
                </ol>
              )}
            </div>
          ))}

          {!loading && !error && closing && closing.content && (
            <div className="mx-auto mt-28 max-w-[1000px]">
              <p className="whitespace-pre-line text-center text-[20px] font-medium leading-[1.9] tracking-[-0.02em]">
                {closing.content}
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
