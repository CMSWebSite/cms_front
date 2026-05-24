import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";

// 예시 이미지 import
// 실제 경로에 맞게 수정하세요.
import gallery1 from "../../assets/images/research-2.jpg";
import gallery2 from "../../assets/images/research-2.jpg";
import gallery3 from "../../assets/images/research-2.jpg";
import gallery4 from "../../assets/images/research-2.jpg";
import gallery5 from "../../assets/images/research-2.jpg";

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "2025. 11. 04 KG 기업박람회 대구 방문",
      date: "2025-06-11",
      image: gallery1,
      description: "대구에서 개최된 기업 박람회에 산공과제 수행 중인 KS 기업이 참여한다고 하여 저희도 방문하였습니다!",
    },
    {
      id: 2,
      title: "2025. 10. 17 연구실 다같이 회식하러 가는 길",
      date: "2025-06-11",
      image: gallery2,
      description: "연구실 회식 가는 길에 찍은 사진입니다.",
    },
    {
      id: 3,
      title: "2025. 10. 17 2차 맥주 집에서 한컷 ㅎㅎㅎ",
      date: "2025-06-11",
      image: gallery3,
      description: "2차 장소에서 즐겁게 한 컷 남겼습니다.",
    },
    {
      id: 4,
      title: "2025. 09. 12 연구실 워크샵 in 거제 (1)",
      date: "2025-06-11",
      image: gallery4,
      description: "거제 워크샵 첫 번째 사진입니다.",
    },
    {
      id: 5,
      title: "2025. 09. 12 연구실 워크샵 in 거제 (2)",
      date: "2025-06-11",
      image: gallery5,
      description: "거제 워크샵 두 번째 사진입니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />

      <main className="pt-[88px]">
        {/* Community tab */}
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
                className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black"
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

        {/* 본문 */}
        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[90px]">
          {/* breadcrumb */}
          <div className="mb-[52px] flex items-center gap-1 text-[14px] text-black">
            <span>⌂</span>
            <span>Community</span>
            <span>{">"}</span>
            <span>Gallery</span>
          </div>

          {/* 제목 */}
          <h1 className="mb-[52px] text-center text-[64px] font-bold text-black">
            Gallery
          </h1>

          {/* 상단 라인 */}
          <div className="mb-[30px] border-t border-[#6b6b6b]" />

          {/* 갤러리 grid */}
          <div className="grid grid-cols-3 gap-x-[24px] gap-y-[32px]">
            {galleryItems.map((item) => (
              <div key={item.id}>
                {/* 이미지 클릭 */}
                <Link to={`/community/gallery/${item.id}`} className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[200px] w-full rounded-[16px] object-cover"
                  />
                </Link>

                {/* 제목 클릭 */}
                <Link
                  to={`/community/gallery/${item.id}`}
                  className="mt-[10px] block text-[14px] text-black hover:underline"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>

          {/* pagination */}
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

          {/* search */}
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