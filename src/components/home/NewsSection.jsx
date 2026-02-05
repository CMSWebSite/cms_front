import n1 from "../../assets/images/news-1.jpg";
import n2 from "../../assets/images/news-2.jpg";

const news = [
  {
    date: "2025.10.28",
    title: "한국해양대 이광일 교수,\n자율운항선박 국제의장 선임",
    image: n1,
  },
  {
    date: "2017.11.27",
    title: "한국해양대 이광일 교수,\n항로정보교환 신규 국제표준안 개발",
    image: n2,
  },
];

function NewsCard({ title, date, image }) {
  return (
    <a
      href="#"
      className="group relative"
      style={{
        width: 420, // 스샷 느낌으로 적당히 크게 (필요하면 조절)
      }}
    >
      {/* 텍스트 영역 (이미지 위) */}
      <div className="mb-4">
        <div
          className="whitespace-pre-line"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            lineHeight: "28px",
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 10,
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {date}
        </div>
      </div>

      {/* 이미지 */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: 165, // 스샷 비율 맞춤 (필요하면 160~180 사이 조절)
          borderRadius: 0,
        }}
      >
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {/* 살짝 어둡게 */}
        <div className="absolute inset-0 bg-black/15" />
      </div>
    </a>
  );
}

export default function NewsSection() {
  return (
    <section className="w-full bg-[#0D0D0D] py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* 상단 헤더 라인 */}
        <div className="flex items-baseline justify-between">
          <a
            href="#"
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15, // ✅ 15px
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            view more
            <span className="inline-block translate-y-[1px]">→</span>
          </a>

          {/* News 타이틀 */}
          <h2
            style={{
              fontFamily: '"Tiro Devanagari Sanskrit", serif',
              fontSize: 60,
              lineHeight: "60px",
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #8FACEA 24%, #FFF490 73%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            News
          </h2>
        </div>

        {/* 카드 2개 한 줄 */}
        <div className="relative mt-10" style={{ height: 260 }}>
          <div style={{ position: "absolute", left: 0 }}>
            <NewsCard {...news[0]} />
          </div>

          <div style={{ position: "absolute", left: 420 + 96 }}>
            <NewsCard {...news[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
