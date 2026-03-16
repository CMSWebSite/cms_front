import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function QnAPage() {
  const navigate = useNavigate();

  const qnaItems = [
    {
      id: 1,
      status: "답변 전",
      title: "구리언니 하루에 똥 몇 번 싸나요?",
      author: "비회원",
      date: "2025-06-11",
      secret: true,
    },
    {
      id: 2,
      status: "답변 완료",
      title: "왕재님은 하루에 담배 몇 번 피우나요? 궁금해요 내용 100",
      author: "qaiscz****",
      date: "2025-06-11",
      secret: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />

      <main className="pt-[96px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[56px] items-center gap-8">
              <Link
                to="/community/recent-news"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
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
                className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Q&amp;A
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[120px]">
          <div className="mb-[48px] flex items-center gap-1 text-[14px] text-black">
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
            <span>Q&amp;A</span>
          </div>

          <h1 className="mb-[54px] text-center text-[64px] font-bold leading-none text-black">
            Q&amp;A
          </h1>

          <div className="mx-auto max-w-[1180px]">
            <table className="w-full border-collapse border-t border-[#6f6f6f]">
              <thead>
                <tr className="border-b border-[#9b9b9b]">
                  <th className="w-[170px] py-[16px] text-center text-[16px] font-medium text-black">
                    답변 상태
                  </th>
                  <th className="py-[16px] text-center text-[16px] font-medium text-black">
                    제목
                  </th>
                  <th className="w-[170px] py-[16px] text-center text-[16px] font-medium text-black">
                    작성자
                  </th>
                  <th className="w-[170px] py-[16px] text-center text-[16px] font-medium text-black">
                    날짜
                  </th>
                </tr>
              </thead>

              <tbody>
                {qnaItems.map((item) => (
                  <tr key={item.id} className="border-b border-[#d1d1d1]">
                    <td className="py-[22px] text-center text-[16px] font-medium">
                      <span
                        className={
                          item.status === "답변 전"
                            ? "text-[#ff2b2b]"
                            : "text-[#1967ff]"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-[22px] text-center text-[16px] text-black">
                      <Link
                        to={`/community/qna/${item.id}`}
                        className="flex items-center justify-center gap-2 hover:underline"
                      >
                        {item.secret && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 11V8.5C7 5.73858 9.23858 3.5 12 3.5C14.7614 3.5 17 5.73858 17 8.5V11"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <rect
                              x="5"
                              y="11"
                              width="14"
                              height="10"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                          </svg>
                        )}
                        {item.title}
                      </Link>
                    </td>

                    <td className="py-[22px] text-center text-[16px] text-black">
                      {item.author}
                    </td>

                    <td className="py-[22px] text-center text-[16px] text-black">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-[18px] flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/community/qna/write")}
                className="inline-flex h-[42px] items-center justify-center rounded-full border border-black px-[22px] text-[15px] font-medium text-black transition hover:bg-black hover:text-white"
              >
                게시글 작성하기
              </button>
            </div>
          </div>

          <div className="mt-[68px] flex items-center justify-center gap-[18px]">
            <div className="relative h-[46px] w-[108px]">
              <select className="h-full w-full appearance-none rounded-full border border-[#6f6f6f] bg-transparent px-[20px] pr-[34px] text-[18px] text-black outline-none">
                <option>제목</option>
              </select>

              <span className="pointer-events-none absolute right-[16px] top-1/2 -translate-y-1/2 text-[12px] text-black">
                ▼
              </span>
            </div>

            <div className="relative flex h-[46px] w-[380px] items-center border-b border-[#6f6f6f]">
              <input
                type="text"
                className="h-full w-full bg-transparent pr-10 text-[16px] text-black outline-none"
              />

              <button
                type="button"
                aria-label="search"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-black"
              >
                <svg
                  width="24"
                  height="24"
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