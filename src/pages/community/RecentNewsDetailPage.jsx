import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link, useParams } from "react-router-dom";
import { publicNewsApi } from "../../api/public/news";
import { ApiError } from "../../api/client";

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function RecentNewsDetailPage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setNotFound(false);
    setError(null);
    publicNewsApi
      .get(id)
      .then((res) => mounted && setArticle(res))
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
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f3]">
        <Header />
        <main className="pt-[88px]">
          <section className="mx-auto max-w-[1280px] px-12 py-[120px] text-center">
            <p className="text-[18px] text-black/70">불러오는 중…</p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || (!article && !error)) {
    return (
      <div className="min-h-screen bg-[#f3f3f3]">
        <Header />
        <main className="pt-[88px]">
          <section className="mx-auto max-w-[1280px] px-12 py-[120px] text-center">
            <h1 className="mb-6 text-[40px] font-bold">게시글이 없습니다.</h1>
            <Link
              to="/community/recent-news"
              className="inline-block border border-black px-6 py-3 text-[16px]"
            >
              목록으로 돌아가기
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3f3f3]">
        <Header />
        <main className="pt-[88px]">
          <section className="mx-auto max-w-[1280px] px-12 py-[120px] text-center">
            <p className="text-[18px] text-red-600">{error}</p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // 본문은 줄 단위로 paragraph 분리 — 빈 줄은 제외.
  const paragraphs = (article.content ?? "")
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />

      <main className="pt-[88px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[56px] items-center gap-8">
              <Link
                to="/community/recent-news"
                className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Recent news
              </Link>
              <Link
                to="/community/gallery"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Gallery
              </Link>
              <Link
                to="/community/contact-us"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Contact us
              </Link>
              <Link
                to="/community/qna"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Q&amp;A
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[140px]">
          <div className="mb-[56px] flex items-center gap-1 text-[14px] text-black">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M3 10.5L12 3L21 10.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 9.5V20H19V9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 20V14H15V20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Community</span>
            <span>{">"}</span>
            <span>Recent news</span>
          </div>

          <h1 className="mb-[70px] text-center text-[64px] font-bold leading-none text-black">
            Recent news
          </h1>

          <div className="mx-auto max-w-[1120px]">
            <h2 className="mb-4 text-[40px] font-bold leading-[1.35] text-black">
              {article.title}
            </h2>

            <p className="mb-12 text-[14px] text-[#6b6b6b]">
              작성 날짜 {formatDate(article.publishedAt)}
            </p>

            {article.coverImageUrl && (
              <div className="mb-14 flex justify-center">
                <img
                  src={article.coverImageUrl}
                  alt={article.title}
                  className="w-[320px] max-w-full border border-[#999]"
                />
              </div>
            )}

            <div className="space-y-8 text-[24px] leading-[1.9] text-black">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                to="/community/recent-news"
                className="inline-flex h-[48px] items-center justify-center border border-black px-8 text-[16px] font-medium text-black"
              >
                목록으로
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
