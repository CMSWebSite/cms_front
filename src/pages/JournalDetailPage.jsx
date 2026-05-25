import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ResearchTabs from "../components/research/ResearchTabs";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import { publicJournalsApi } from "../api/public/journals";
import { ApiError } from "../api/client";

/**
 * Phase B에서 Student/Professor DB와 매핑 예정.
 * 현재는 저자 이름 텍스트 기반 단순 표시만 한다.
 */
function MemberPanel({ open, member, onClose }) {
  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        pointerEvents: "auto",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="mx-auto max-w-container px-6"
          style={{ height: "100%", pointerEvents: "none", position: "relative" }}
        >
          <aside
            style={{
              pointerEvents: "auto",
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: 360,
              background: "#fff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              borderLeft: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ padding: 24 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 800, color: "#000" }}>
                  Member
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    fontSize: 18,
                    lineHeight: 1,
                    color: "rgba(0,0,0,0.6)",
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div style={{ marginTop: 16, fontSize: 14, color: "#000" }}>
                <div style={{ fontWeight: 700 }}>{member?.name ?? "—"}</div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  연구실 회원 DB와 매핑되면 상세 정보가 표시됩니다 (Phase B 예정).
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function JournalDetailPage() {
  const { paperId } = useParams();
  const [openMember, setOpenMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setNotFound(false);
    setError(null);
    publicJournalsApi
      .get(paperId)
      .then((d) => mounted && setPaper(d))
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setError(
            err instanceof ApiError ? err.message : "불러오지 못했습니다.",
          );
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [paperId]);

  // 정형 필드(저널명/Volume/Issue/Pages/DOI)를 메타 라인으로 합성한다.
  const metaLines = paper
    ? [
        paper.journalName
          ? `저널: ${paper.journalName}${
              paper.volume ? `, Vol. ${paper.volume}` : ""
            }${paper.issue ? `, Issue ${paper.issue}` : ""}${
              paper.pages ? `, pp. ${paper.pages}` : ""
            }`
          : null,
        paper.doi ? `DOI: ${paper.doi}` : null,
        ...(paper.metaLines ?? []),
      ].filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main
        className="relative z-0 bg-white"
        style={{ backgroundColor: "#fff", color: "rgba(0,0,0,0.88)" }}
      >
        <div className="h-[88px]" />

        <div data-theme="light" className="text-black">
          <ResearchTabs />

          <section className="w-full bg-white">
            <div className="mx-auto max-w-container px-6 pb-24">
              <div className="pt-6 text-[14px] text-black/70 font-medium">
                <span className="mr-2">⌂</span>
                <Link to="/research" className="hover:underline">
                  Research
                </Link>
                <span className="mx-2">&gt;</span>
                <Link to="/research/achievements" className="hover:underline">
                  Achievements
                </Link>
                <span className="mx-2">&gt;</span>
                <span>Journals</span>
              </div>

              <h1 className="mt-10 text-center text-[56px] font-extrabold tracking-[-0.02em] text-black">
                Journals
              </h1>

              {loading && <LoadingState className="mt-16" />}
              {!loading && error && (
                <ErrorState
                  className="mt-16"
                  message={error}
                  onRetry={() => publicJournalsApi.get(paperId).then(setPaper)}
                />
              )}
              {!loading && notFound && (
                <div className="mt-16 text-center text-black/60">
                  논문을 찾을 수 없습니다.
                </div>
              )}

              {!loading && !error && paper && (
                <>
                  <div className="mt-12 max-w-[860px]">
                    <h2 className="text-[22px] font-extrabold leading-[34px] text-black">
                      {paper.title1}
                      {paper.title2 && (
                        <>
                          <br />
                          {paper.title2}
                        </>
                      )}
                    </h2>

                    <div className="mt-2 text-[12px] text-black/50">
                      {paper.publishedDate}
                    </div>

                    <div className="mt-2 text-[13px] italic text-black">
                      {(paper.authors ?? "")
                        .split(",")
                        .map((raw) => raw.trim())
                        .filter(Boolean)
                        .map((name, idx, arr) => (
                          <span key={`${name}-${idx}`}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMember({ name });
                                setOpenMember(true);
                              }}
                              className="underline underline-offset-2 hover:text-black/80"
                            >
                              {name}
                            </button>
                            {idx < arr.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>

                    {metaLines.length > 0 && (
                      <ul className="mt-6 space-y-2 text-[13px] text-black/80">
                        {metaLines.map((m, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-black/70" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {(paper.highlights ?? []).length > 0 && (
                    <div
                      className="mt-8 max-w-[860px] rounded-[2px] p-8"
                      style={{ background: "#F0F0F0" }}
                    >
                      <div className="text-[16px] font-extrabold italic text-black">
                        Highlights
                      </div>
                      <ul className="mt-4 space-y-3 text-[13px] leading-[22px] text-black/80">
                        {paper.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[8px] h-[4px] w-[4px] rounded-full bg-black/60" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {paper.abstractText && (
                    <div className="mt-10 max-w-[860px]">
                      <div className="text-[18px] font-extrabold italic text-black">
                        Abstract
                      </div>
                      <p className="mt-4 text-[13px] leading-[22px] text-black/80 whitespace-pre-line">
                        {paper.abstractText}
                      </p>
                    </div>
                  )}

                  <div className="mt-10 h-px w-full bg-black/20" />

                  {paper.attachmentUrl && (
                    <div className="mt-4 flex items-center gap-3 text-[12px] text-black/70">
                      <span className="font-semibold">첨부파일</span>
                      <span className="text-black/40">|</span>
                      <a
                        href={paper.attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {paper.attachmentName ?? "PDF"}
                        {paper.attachmentSize
                          ? ` (${Math.round(paper.attachmentSize / 1024)}KB)`
                          : ""}
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <MemberPanel
        open={openMember}
        member={selectedMember}
        onClose={() => setOpenMember(false)}
      />

      <Footer />
    </div>
  );
}
