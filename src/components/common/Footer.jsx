import { useEffect, useState } from "react";
import { publicSiteSettingsApi } from "../../api/public/siteSettings";

const DEFAULTS = {
  "footer.phone": "+82 010-XXXX-XXXX",
  "footer.fax": "+82 010-XXXX-XXXX",
  "footer.address": "(49112) 부산광역시 영도구 태종로 727(동삼동) 한국해양대학교 공과대학 2호관 638호",
  "footer.copyright": "Copyright © 2026 Cybermarine System Lab. All Rights Reserved.",
};

export default function Footer() {
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    let mounted = true;
    publicSiteSettingsApi.all()
      .then((d) => {
        if (!mounted || !d) return;
        const next = { ...DEFAULTS };
        for (const k of Object.keys(DEFAULTS)) {
          if (d[k]) next[k] = d[k];
        }
        setSettings(next);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const sepStyle = { margin: "0 20px", opacity: 0.35 };
  const itemStyle = { paddingTop: 8, paddingBottom: 8 };

  return (
    <footer
      style={{
        width: "100%",
        background: "#050F13",
        borderTop: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 28,
          paddingBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          <a href="#" style={{ ...itemStyle, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
            개인정보 처리방침
          </a>

          <span style={{ ...sepStyle, ...itemStyle }}>|</span>
          <span style={itemStyle}>Tel {settings["footer.phone"]}</span>

          <span style={{ ...sepStyle, ...itemStyle }}>|</span>
          <span style={itemStyle}>FAX {settings["footer.fax"]}</span>

          <span style={{ ...sepStyle, ...itemStyle }}>|</span>
          <span style={itemStyle}>{settings["footer.address"]}</span>

          <span style={{ ...sepStyle, ...itemStyle }}>|</span>
          <span style={{ ...itemStyle, color: "rgba(255,255,255,0.45)" }}>
            {settings["footer.copyright"]}
          </span>
        </div>
      </div>

      <div style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.2)" }} />
    </footer>
  );
}
