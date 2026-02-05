import etri from "../../assets/icons/partner-etri.png";
import kmou from "../../assets/icons/partner-kmou.png";
import sinacota from "../../assets/icons/partner-sinacota.png";

const partners = [
  { name: "ETRI", logo: etri },
  { name: "KMOU", logo: kmou },
  { name: "SINACOTA", logo: sinacota },
];

export default function PartnersSection() {
  return (
    <section className="w-full bg-[#0D0D0D] pt-20 pb-32 mb-24">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Title */}
        <h2
          className="mb-16 inline-block"
          style={{
            fontFamily: '"Tiro Devanagari Sanskrit", serif',
            fontSize: "64px",
            lineHeight: "1.1",
            letterSpacing: "-0.01em",
            backgroundImage: "linear-gradient(90deg, #FFF490 17%, #8FACEA 85%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Our partners
        </h2>
        {/* Logos row */}
        <div className="flex items-center gap-20">
          {partners.map((p) => (
            <div
              key={p.name}
              style={{
                width: 239,
                height: 66,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={p.logo}
                alt={p.name}
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  transform: p.name === "SINACOTA" ? "scale(1.4)" : "none",
                  filter:
                    p.name === "SINACOTA"
                      ? "brightness(0) invert(1)"
                      : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}