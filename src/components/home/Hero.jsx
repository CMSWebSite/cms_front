import heroImg from "../../assets/images/hero.gif";

export default function Hero() {
  return (
    <section className="w-full bg-[#0D0D0D]">
      {/* Header 높이 */}
      <div className="h-[82px]" />

      {/* GIF 영역 */}
      <div className="flex justify-center">
        <div className="relative w-[1119px] h-[746px]">
          {/* GIF */}
          <img
            src={heroImg}
            alt=""
            draggable="false"
            className="w-full h-full object-cover"
          />

          {/* ✅ 가장자리 어두운 효과 (더 강하게) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  ellipse 70% 70% at 50% 50%,
                  transparent 0%,
                  rgba(5, 15, 19, 0.5) 50%,
                  rgba(5, 15, 19, 0.95) 100%
                )
              `,
            }}
          />
        </div>
      </div>

      {/* 텍스트는 GIF 아래 */}
      <div className="w-full flex justify-center px-6 py-10">
        <p
          className="text-center"
          style={{
            fontFamily: '"Tiro Devanagari Sanskrit", serif',
            fontSize: "20px",
            lineHeight: "28px",
            letterSpacing: "0.05em",
            color: "#D0D0D0",
          }}
        >
          Our lab focuses on engineering intelligence,
          <br />
          moving beyond isolated models toward real-world systems.
        </p>
      </div>
    </section>
  );
}