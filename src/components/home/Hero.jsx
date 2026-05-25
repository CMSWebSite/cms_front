import { useEffect, useState } from "react";
import heroImgFallback from "../../assets/images/hero.gif";
import { publicSiteSettingsApi } from "../../api/public/siteSettings";

const DEFAULT_SUBTITLE =
  "Our lab focuses on engineering intelligence,\nmoving beyond isolated models toward real-world systems.";

export default function Hero() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let mounted = true;
    publicSiteSettingsApi.all()
      .then((d) => mounted && setSettings(d ?? {}))
      .catch(() => mounted && setSettings({}));
    return () => { mounted = false; };
  }, []);

  const heroImg = settings?.["homepage.hero.image"] || heroImgFallback;
  const subtitle = settings?.["homepage.hero.subtitle"] || DEFAULT_SUBTITLE;

  return (
    <section className="w-full bg-[#0D0D0D]">
      <div className="h-[82px]" />

      <div className="flex justify-center">
        <div className="relative w-[1119px] h-[746px]">
          <img
            src={heroImg}
            alt=""
            draggable="false"
            className="w-full h-full object-cover"
          />
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

      <div className="w-full flex justify-center px-6 py-10">
        <p
          className="whitespace-pre-line text-center"
          style={{
            fontFamily: '"Tiro Devanagari Sanskrit", serif',
            fontSize: "20px",
            lineHeight: "28px",
            letterSpacing: "0.05em",
            color: "#D0D0D0",
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
