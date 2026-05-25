import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";
import { publicNewsApi } from "../../api/public/news";
import { ApiError } from "../../api/client";

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function RecentNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    publicNewsApi
      .list()
      .then((res) => {
        if (mounted) setNews(res);
      })
      .catch((err) => {
        if (mounted) {
          setError(
            err instanceof ApiError ? err.message : "뉴스를 불러오지 못했습니다.",
          );
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

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

          <div className="mb-[72px]">
            <table className="w-full border-collapse border-t border-[#6a6a6a]">
              <thead>
                <tr className="border-b border-[#9d9d9d]">
                  <th className="w-[120px] py-[16px] text-center text-[15px] font-medium text-black">
                    순서
                  </th>
                  <th className="py-[16px] text-center text-[15px] font-medium text-black">
                    제목
                  </th>
                  <th className="w-[180px] py-[16px] text-center text-[15px] font-medium text-black">
                    날짜
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-[80px] text-center text-[15px] text-black/60"
                    >
                      불러오는 중…
                    </td>
                  </tr>
                )}

                {!loading && error && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-[80px] text-center text-[15px] text-red-600"
                    >
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && news.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-[80px] text-center text-[15px] text-black/60"
                    >
                      아직 등록된 뉴스가 없습니다.
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  news.map((item, index) => (
                    <tr key={item.id} className="border-b border-[#d7d7d7]">
                      <td className="py-[18px] text-center text-[15px] text-black">
                        {news.length - index}
                      </td>
                      <td className="py-[18px] text-center text-[15px] text-black">
                        <Link
                          to={`/community/recent-news/${item.id}`}
                          className="hover:underline"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td className="py-[18px] text-center text-[15px] text-black">
                        {formatDate(item.publishedAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-[46px] flex items-center justify-center gap-[14px] text-[15px] text-black">
            <button
              type="button"
              className="border-b border-black pb-[1px] leading-none"
            >
              1
            </button>
            <button type="button" className="leading-none">
              2
            </button>
            <button type="button" className="leading-none">
              3
            </button>
            <button type="button" className="leading-none">
              4
            </button>
            <button type="button" className="leading-none">
              5
            </button>
            <button type="button" className="leading-none">
              ▶
            </button>
          </div>

          <div className="mt-[38px] mb-[84px] flex items-center justify-center gap-[14px]">
            <div className="relative h-[30px] w-[70px]">
              <select className="h-full w-full appearance-none rounded-full border border-[#6e6e6e] bg-transparent px-[14px] pr-[24px] text-[13px] text-black outline-none">
                <option>제목</option>
              </select>
              <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[10px] text-black">
                ▼
              </span>
            </div>

            <div className="relative flex h-[30px] w-[290px] items-center border-b border-[#6e6e6e]">
              <input
                type="text"
                className="h-full w-full bg-transparent pr-8 text-[13px] text-black outline-none"
              />
              <button
                type="button"
                aria-label="search"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-black"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
