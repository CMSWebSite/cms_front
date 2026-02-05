import r1 from "../../assets/images/research-1.jpg";
import r2 from "../../assets/images/research-2.jpg";
import r3 from "../../assets/images/research-3.jpg";

const items = [
  {
    title: "Innovative Battlefield Solutions\nEnabled by Artificial Intelligence",
    image: r1,
  },
  {
    title: "Development of Standardized\nDocumentation",
    image: r2,
  },
  {
    title: "Smart Ship and\nMarine Cybersecurity",
    image: r3,
  },
];

function ResearchCard({ title, image }) {
  return (
    <a
      href="#"
      className="group relative overflow-hidden"
      style={{
        width: 336,
        height: 503,
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      {/* 이미지 */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />

      {/* 가장자리 비네트(두번째 스샷 느낌) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 45%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* 하단 텍스트 가독성용 그라데이션 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* 카드 텍스트 + 화살표 */}
      <div className="relative z-10 h-full">
        {/* 문구: position 42 / layout 322x82 / Inter / #FFF */}
        <div
          className="whitespace-pre-line"
          style={{
            position: "absolute",
            left: 42,
            bottom: 82,
            width: 322,
            height: 82,
            fontFamily: "Inter, sans-serif",
            fontSize: 20,
            lineHeight: "28px",
            fontWeight: 500,
            color: "#FFFFFF",
          }}
        >
          {title}
        </div>

        {/* 화살표 */}
        <div
          style={{
            position: "absolute",
            right: 42,
            bottom: 42,
          }}
        >
          <span className="inline-block text-white text-2xl transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function ResearchSection() {
  return (
    <section className="w-full bg-[#0D0D0D] py-20">
      {/* 3개 카드가 한 줄에 들어가게: 336*3 + gap(24*2)=1056 -> 1200 안에 충분 */}
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Research 타이틀: Tiro + 그라데이션(스샷) */}
        <h2
          style={{
            marginLeft: 0, // x=28 느낌 (컨테이너 기준)
            fontFamily: '"Tiro Devanagari Sanskrit", serif',
            fontSize: 60,
            lineHeight: "60px",
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #FFF490 17%, #8FACEA 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            width: 280, // layout 234 (요청값 반영)
          }}
          className="mb-12"
        >
          Research
        </h2>

        {/* 카드 3개 한 줄 */}
        <div className="flex justify-between">
          {items.map((it) => (
            <ResearchCard key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
