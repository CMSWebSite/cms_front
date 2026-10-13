import { useEffect, useState } from "react";
import Modal from "./Modal";
import { publicSiteSettingsApi } from "../../api/public/siteSettings";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "../../data/legalText";

// 사이트 설정(관리자 > Site Settings > Footer)이 비어 있거나 API 실패 시 쓰는 기본값.
// 전화/FAX/이메일처럼 빈 값인 항목은 표시하지 않는다.
const DEFAULTS = {
  "footer.affiliation": "Cybermarine System Lab, Korea Maritime & Ocean University",
  "footer.address": "(49112) 부산광역시 영도구 태종로 727(동삼동) 한국해양대학교 공과대학 2호관 638호",
  "footer.email": "",
  "footer.phone": "",
  "footer.fax": "",
  "footer.copyright": "© {year} Cybermarine System Lab. All rights reserved.",
};

const resolveCopyright = (text) =>
  (text || "").replace("{year}", String(new Date().getFullYear()));

const FONT = { fontFamily: "Inter, sans-serif" };
const TEXT = "rgba(255,255,255,0.6)";
const TEXT_DIM = "rgba(255,255,255,0.4)";

function Sep() {
  return <span aria-hidden="true" style={{ margin: "0 12px", opacity: 0.35 }}>|</span>;
}

export default function Footer() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [legal, setLegal] = useState(null); // "terms" | "privacy" | null

  useEffect(() => {
    let mounted = true;
    publicSiteSettingsApi
      .all()
      .then((d) => {
        if (!mounted || !d) return;
        const next = { ...DEFAULTS };
        for (const k of Object.keys(DEFAULTS)) {
          if (typeof d[k] === "string") next[k] = d[k];
        }
        setSettings(next);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const email = settings["footer.email"].trim();
  const phone = settings["footer.phone"].trim();
  const fax = settings["footer.fax"].trim();
  const address = settings["footer.address"].trim();
  const affiliation = settings["footer.affiliation"].trim();

  const contactItems = [
    address && <span key="addr">{address}</span>,
    phone && <span key="tel">Tel {phone}</span>,
    fax && <span key="fax">Fax {fax}</span>,
    email && (
      <a
        key="mail"
        href={`mailto:${email}`}
        style={{ color: TEXT, textDecoration: "none" }}
        className="hover:underline"
      >
        {email}
      </a>
    ),
  ].filter(Boolean);

  const linkStyle = {
    ...FONT,
    color: TEXT,
    background: "none",
    border: 0,
    padding: 0,
    cursor: "pointer",
    fontSize: 12,
    letterSpacing: "0.06em",
  };

  return (
    <>
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
            padding: "28px 32px",
            ...FONT,
            fontSize: 12,
            letterSpacing: "0.06em",
            lineHeight: 1.7,
            color: TEXT,
          }}
        >
          {/* 1행: 법적 고지 링크 */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" style={linkStyle} className="hover:underline" onClick={() => setLegal("terms")}>
              이용약관
            </button>
            <Sep />
            <button type="button" style={linkStyle} className="hover:underline" onClick={() => setLegal("privacy")}>
              개인정보 처리방침
            </button>
          </div>

          {/* 2행: 연구실/소속 + 주소 + 연락처 (빈 값은 생략) */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", marginTop: 10 }}>
            {affiliation && (
              <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 600 }}>{affiliation}</span>
            )}
            {contactItems.map((item, i) => (
              <span key={item.key} style={{ display: "inline-flex", alignItems: "center" }}>
                {(affiliation || i > 0) && <Sep />}
                {item}
              </span>
            ))}
          </div>

          {/* 3행: 저작권 */}
          <div style={{ marginTop: 10, color: TEXT_DIM }}>
            {resolveCopyright(settings["footer.copyright"])}
          </div>
        </div>
      </footer>

      <Modal open={legal === "terms"} title="이용약관" onClose={() => setLegal(null)}>
        {TERMS_OF_SERVICE}
      </Modal>
      <Modal open={legal === "privacy"} title="개인정보 처리방침" onClose={() => setLegal(null)}>
        {PRIVACY_POLICY}
      </Modal>
    </>
  );
}
