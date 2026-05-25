import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicSiteSettingsApi } from "../../api/public/siteSettings";

const DEFAULT_CARDS = [
  { title: "Innovative Battlefield Solutions\nEnabled by Artificial Intelligence", image: "" },
  { title: "Development of Standardized\nDocumentation", image: "" },
  { title: "Smart Ship and\nMarine Cybersecurity", image: "" },
];

function ResearchCard({ title, image }) {
  return (
    <Link
      to="/research"
      className="group relative overflow-hidden"
      style={{ width: 336, height: 503, backgroundColor: "rgba(0,0,0,0.2)" }}
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2030] to-[#0a0e16]" />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 45%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative z-10 h-full">
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
        <div style={{ position: "absolute", right: 42, bottom: 42 }}>
          <span className="inline-block text-white text-2xl transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function ResearchSection() {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  useEffect(() => {
    let mounted = true;
    publicSiteSettingsApi.all()
      .then((s) => {
        if (!mounted || !s) return;
        const next = [1, 2, 3].map((i) => ({
          title: s[`homepage.research.card${i}.title`] || DEFAULT_CARDS[i - 1].title,
          image: s[`homepage.research.card${i}.image`] || "",
        }));
        setCards(next);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <section className="w-full bg-[#0D0D0D] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2
          style={{
            marginLeft: 0,
            fontFamily: '"Tiro Devanagari Sanskrit", serif',
            fontSize: 60,
            lineHeight: "60px",
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #FFF490 17%, #8FACEA 85%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            width: 280,
          }}
          className="mb-12"
        >
          Research
        </h2>

        <div className="flex justify-between">
          {cards.map((it, i) => (
            <ResearchCard key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}
