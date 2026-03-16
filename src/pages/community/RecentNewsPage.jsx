import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";

export default function RecentNewsPage() {
  const news = [
    {
      id: 1,
      title: "한국해양대학교 이광일 교수, 세계 자율운항선박 표준화 사령탑된다",
      date: "2025-06-11",
      image: "/images/news/news1.jpg",
      content: [
        "국립한국해양대학교는 지난 21~22일 일본 나가사키에서 열린 국제전기위원회(IEC) 해상 항해통신 장비와 시스템위원회(TC80) 총회에 자율운항선박을 위한 신규 특별작업반 의장에 인공지능공학부 이광일 교수가 선임됐다고 28일 밝혔다.",
        "국제전기연합 산하의 항해와 통신 관련 주요 표준을 개발하는 국제표준화기구로 자율운항선박의 핵심 요소기술인 자율항해시스템(ANS), 정보관리 및 원격운영센터(ROC) 등에 대한 국제표준을 담당할 예정이다. 이를 위해 이번 IEC TC80 총회에서는 자율운항선박 관련 특별작업반을 설치하고 신임 의장으로 이 교수를 선임했다.",
        "신규작업반은 자율운항선박의 핵심기술인 인공지능을 이용한 상황인지기술, 자율항해시스템(ANS), 정보관리, 원격운영센터(ROC) 등 항해·통신 등에 대한 표준 개발을 담당한다.",
        "이 교수는 앞으로 선박 장비 사이버보안 표준에 대한 개정을 제안하고 선박에 탑재되는 개별 선박 장비에 대한 사이버보안 표준 개발을 주도하기로 했다. 특히 항해통신장비의 특성을 반영하면서 국제선급 규정을 충족하는 사이버보안 표준을 개발할 예정이다.",
      ],
    },
    {
      id: 2,
      title: '한국해양대학교 이광일 교수 "단기 성과위주 정책, 예산 낭비 될수도"',
      date: "2025-06-11",
      image: "/images/news/news2.jpg",
      content: [
        "두 번째 기사 본문 예시입니다.",
        "실제 기사 내용으로 바꿔 넣으면 됩니다.",
      ],
    },
    {
      id: 3,
      title: "이광일 한국해양대 교수, 세계 자율운항선박 표준화 사령탑된다",
      date: "2025-06-11",
      image: "/images/news/news1.jpg",
      content: ["기사 본문 예시입니다."],
    },
    {
      id: 4,
      title: '한국해양대학교 이광일 교수 "단기 성과위주 정책, 예산 낭비 될수도"',
      date: "2025-06-11",
      image: "/images/news/news2.jpg",
      content: ["기사 본문 예시입니다."],
    },
    {
      id: 5,
      title: "이광일 한국해양대 교수, 세계 자율운항선박 표준화 사령탑된다",
      date: "2025-06-11",
      image: "/images/news/news1.jpg",
      content: ["기사 본문 예시입니다."],
    },
    {
      id: 6,
      title: '한국해양대학교 이광일 교수 "단기 성과위주 정책, 예산 낭비 될수도"',
      date: "2025-06-11",
      image: "/images/news/news2.jpg",
      content: ["기사 본문 예시입니다."],
    },
    {
      id: 7,
      title: "이광일 한국해양대 교수, 세계 자율운항선박 표준화 사령탑된다",
      date: "2025-06-11",
      image: "/images/news/news1.jpg",
      content: ["기사 본문 예시입니다."],
    },
    {
      id: 8,
      title: '한국해양대학교 이광일 교수 "단기 성과위주 정책, 예산 낭비 될수도"',
      date: "2025-06-11",
      image: "/images/news/news2.jpg",
      content: ["기사 본문 예시입니다."],
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
                {news.map((item) => (
                  <tr key={item.id} className="border-b border-[#d7d7d7]">
                    <td className="py-[18px] text-center text-[15px] text-black">
                      {item.id}
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
                      {item.date}
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