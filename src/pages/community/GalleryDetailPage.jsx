import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link, useParams } from "react-router-dom";

import gallery1 from "../../assets/images/research-2.jpg";
import gallery2 from "../../assets/images/research-2.jpg";
import gallery3 from "../../assets/images/research-2.jpg";
import gallery4 from "../../assets/images/research-2.jpg";
import gallery5 from "../../assets/images/research-2.jpg";

export default function GalleryDetailPage() {
  const { id } = useParams();

  const galleryItems = [
    {
      id: 1,
      title: "2025. 11. 04 KG 기업박람회 대구 방문",
      date: "2025-06-11",
      image: gallery1,
      content: [
        "대구에서 개최된 기업 박람회에 산공과제 수행 중인 KS 기업이 참여한다고 하여 저희도 방문하였습니다! 너무 좋은 경험이었습니다. :)",
        "다음에 기회가 된다면 또 방문하고 싶습니다. ㅎㅎ",
      ],
    },
    {
      id: 2,
      title: "2025. 10. 17 연구실 다같이 회식하러 가는 길",
      date: "2025-06-11",
      image: gallery2,
      content: [
        "연구실 다 같이 회식 장소로 이동하는 길에 남긴 사진입니다.",
      ],
    },
    {
      id: 3,
      title: "2025. 10. 17 2차 맥주 집에서 한컷 ㅎㅎㅎ",
      date: "2025-06-11",
      image: gallery3,
      content: [
        "2차 장소에서 분위기 좋게 한 컷 찍었습니다. 즐거운 시간이었습니다.",
      ],
    },
    {
      id: 4,
      title: "2025. 09. 12 연구실 워크샵 in 거제 (1)",
      date: "2025-06-11",
      image: gallery4,
      content: [
        "거제에서 진행한 연구실 워크샵 사진입니다.",
      ],
    },
    {
      id: 5,
      title: "2025. 09. 12 연구실 워크샵 in 거제 (2)",
      date: "2025-06-11",
      image: gallery5,
      content: [
        "워크샵 중 두 번째로 남긴 사진입니다.",
      ],
    },
  ];

  const item = galleryItems.find((gallery) => gallery.id === Number(id));

  if (!item) {
    return (
      <div className="min-h-screen bg-[#f3f3f3]">
        <Header />
        <main className="pt-[96px]">
          <section className="mx-auto max-w-[1280px] px-12 py-[120px] text-center">
            <h1 className="mb-6 text-[40px] font-bold text-black">
              게시글이 없습니다.
            </h1>
            <Link
              to="/community/gallery"
              className="inline-flex h-[48px] items-center justify-center border border-black px-8 text-[16px] font-medium text-black"
            >
              목록으로
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />

      <main className="pt-[96px]">
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

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[120px]">
          {/* breadcrumb */}
          <div className="mb-[52px] flex items-center gap-1 text-[14px] text-black">
            <span>⌂</span>
            <span>Community</span>
            <span>{">"}</span>
            <span>Gallery</span>
          </div>

          {/* title */}
          <h1 className="mb-[52px] text-center text-[64px] font-bold text-black">
            Gallery
          </h1>

          <div className="mx-auto max-w-[1120px]">
            <h2 className="mb-3 text-[28px] font-bold leading-[1.4] text-black">
              {item.title}
            </h2>

            <p className="mb-10 text-[14px] text-[#666666]">
              작성 날짜 {item.date}
            </p>

            <div className="mb-10 flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[520px] w-auto max-w-full object-contain"
              />
            </div>

            <div className="space-y-4 text-[16px] leading-[1.9] text-black">
              {item.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Link
                to="/community/gallery"
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