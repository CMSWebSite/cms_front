import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import { publicProjectsApi } from "../api/public/projects";
import { ApiError } from "../api/client";

const STATUS_LABEL = {
  PLANNED: "계획",
  ONGOING: "수행 중",
  COMPLETED: "수행 완료",
  SUSPENDED: "보류",
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setNotFound(false); setError(null);
    publicProjectsApi.get(projectId)
      .then((d) => mounted && setProject(d))
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setError(err instanceof ApiError ? err.message : "불러오지 못했습니다.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [projectId]);

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
                <Link to="/research/projects" className="hover:underline">Projects</Link>
              </div>
              <h1 className="mt-10 text-center text-[56px] font-extrabold tracking-[-0.02em] text-black">Projects</h1>

              {loading && <LoadingState className="mt-16" />}
              {!loading && error && <ErrorState className="mt-16" message={error} />}
              {!loading && notFound && <div className="mt-16 text-center text-black/60">프로젝트를 찾을 수 없습니다.</div>}

              {!loading && !error && project && (
                <>
                  <div className="mt-12 max-w-[860px]">
                    <div className="mb-3 inline-flex h-6 items-center rounded-full bg-black/[0.06] px-3 text-[12px] font-semibold text-black/70">
                      {STATUS_LABEL[project.status] ?? project.status}
                    </div>
                    <h2 className="text-[22px] font-extrabold leading-[34px] text-black">{project.title}</h2>
                    <div className="mt-2 text-[12px] text-black/50">
                      {project.startDate} ~ {project.endDate || "진행중"}
                    </div>

                    <ul className="mt-6 space-y-2 text-[13px] text-black/80">
                      {project.fundingAgency && <li className="flex gap-2"><span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-black/70" /><span>발주기관: {project.fundingAgency}</span></li>}
                      {project.role && <li className="flex gap-2"><span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-black/70" /><span>역할: {project.role}</span></li>}
                    </ul>
                  </div>

                  {project.thumbnailImage && (
                    <div className="mt-10 max-w-[860px]">
                      <img src={project.thumbnailImage} alt={project.title} className="w-full rounded-md border border-black/10 object-cover" />
                    </div>
                  )}

                  {project.description && (
                    <div className="mt-10 max-w-[860px]">
                      <div className="text-[14px] font-extrabold italic text-black">요약</div>
                      <p className="mt-3 text-[13px] leading-[22px] text-black/80 whitespace-pre-line">{project.description}</p>
                    </div>
                  )}

                  {project.detailContent && (
                    <div className="mt-10 max-w-[860px]">
                      <div className="text-[14px] font-extrabold italic text-black">상세 내용</div>
                      <p className="mt-3 text-[13px] leading-[22px] text-black/80 whitespace-pre-line">{project.detailContent}</p>
                    </div>
                  )}

                  <div className="mt-10 h-px w-full bg-black/20" />
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
