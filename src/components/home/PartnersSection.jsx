import { useEffect, useState } from "react";
import { publicPartnersApi } from "../../api/public/partners";

export default function PartnersSection() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    publicPartnersApi.list()
      .then((d) => mounted && setPartners(Array.isArray(d) ? d : []))
      .catch(() => mounted && setPartners([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (!loading && partners.length === 0) return null;

  return (
    <section className="w-full bg-[#0D0D0D] pt-20 pb-32 mb-24">
      <div className="mx-auto max-w-[1200px] px-6">
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

        <div className="flex flex-wrap items-center gap-20">
          {partners.map((p) => {
            const logo = p.logoUrl ? (
              <img
                src={p.logoUrl}
                alt={p.name}
                draggable={false}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[14px] text-white/60">
                {p.name}
              </div>
            );
            const container = (
              <div
                style={{
                  width: 239,
                  height: 66,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {logo}
              </div>
            );
            return p.websiteUrl ? (
              <a key={p.id} href={p.websiteUrl} target="_blank" rel="noreferrer">
                {container}
              </a>
            ) : (
              <div key={p.id}>{container}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
