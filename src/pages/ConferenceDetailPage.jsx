import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import { publicConferencesApi } from "../api/public/conferences";
import { ApiError } from "../api/client";

export default function ConferenceDetailPage() {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setNotFound(false); setError(null);
    publicConferencesApi.get(paperId)
      .then((d) => mounted && setPaper(d))
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setError(err instanceof ApiError ? err.message : "불러오지 못했습니다.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [paperId]);

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="relative z-0 bg-white" style={{ backgroundColor: "#fff", color: "rgba(0,0,0,0.88)" }}>
        <div className="h-[88px]" />
        <div data-theme="light" className="text-black">
          <ResearchTabs />
          <section className="w-full bg-white">
            <div className="mx-auto max-w-container px-6 pb-24">
              <div className="pt-6 text-[14px] text-black/70 font-medium">
                <span className="mr-2">⌂</span>
                <Link to="/research" className="hover:underline">Research</Link>
                <span className="mx-2">&gt;</span>
                <Link to="/research/achievements" className="hover:underline">Achievements</Link>
                <span className="mx-2">&gt;</span>
                <span>Conferences</span>
              </div>
              <h1 className="mt-10 text-center text-[56px] font-extrabold tracking-[-0.02em] text-black">Conferences</h1>

              {loading && <LoadingState className="mt-16" />}
              {!loading && error && <ErrorState className="mt-16" message={error} />}
              {!loading && notFound && <div className="mt-16 text-center text-black/60">발표 자료를 찾을 수 없습니다.</div>}

              {!loading && !error && paper && (
                <>
                  <div className="mt-12 max-w-[860px]">
                    <h2 className="text-[22px] font-extrabold leading-[34px] text-black">{paper.title}</h2>
                    <div className="mt-2 text-[12px] text-black/50">{paper.presentedDate}</div>
                    <div className="mt-2 text-[13px] italic text-black">{paper.authors}</div>

                    <ul className="mt-6 space-y-2 text-[13px] text-black/80">
                      <li className="flex gap-2"><span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-black/70" /><span>학회명: {paper.conferenceName}</span></li>
                      {paper.location && <li className="flex gap-2"><span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-black/70" /><span>장소: {paper.location}</span></li>}
                      <li className="flex gap-2"><span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-black/70" /><span>발표일: {paper.presentedDate}</span></li>
                    </ul>
                  </div>

                  {paper.abstractText && (
                    <div className="mt-10 max-w-[860px]">
                      <div className="text-[18px] font-extrabold italic text-black">Abstract</div>
                      <p className="mt-4 text-[13px] leading-[22px] text-black/80 whitespace-pre-line">{paper.abstractText}</p>
                    </div>
                  )}

                  <div className="mt-10 h-px w-full bg-black/20" />

                  {paper.attachmentUrl && (
                    <div className="mt-4 flex items-center gap-3 text-[12px] text-black/70">
                      <span className="font-semibold">첨부파일</span>
                      <span className="text-black/40">|</span>
                      <a href={paper.attachmentUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        {paper.attachmentName ?? "PDF"}{paper.attachmentSize ? ` (${Math.round(paper.attachmentSize / 1024)}KB)` : ""}
                      </a>
                    </div>
                  )}
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
