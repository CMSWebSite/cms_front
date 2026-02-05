export default function Footer() {
  const sepStyle = {
    margin: "0 20px", // ← span 사이 좌우 여백 증가
    opacity: 0.35,
  };

  const itemStyle = {
    paddingTop: 8, // ← 각 항목 상하 여백 증가
    paddingBottom: 8,
  };

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
          paddingTop: 28, // ← footer 상하 여백 증가
          paddingBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start", // ← 좌측 정렬
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

          <span style={itemStyle}>Tel +82 010-XXXX-XXXX</span>

          <span style={{ ...sepStyle, ...itemStyle }}>|</span>

          <span style={itemStyle}>FAX +82 010-XXXX-XXXX</span>

          <span style={{ ...sepStyle, ...itemStyle }}>|</span>

          <span style={itemStyle}>
            (49112) 부산광역시 영도구 태종로 727(동삼동) 한국해양대학교 공과대학 2호관 638호
          </span>

          <span style={{ ...sepStyle, ...itemStyle }}>|</span>

          <span style={{ ...itemStyle, color: "rgba(255,255,255,0.45)" }}>
            Copyright © 2026 Cybermarine System Lab. All Rights Reserved.
          </span>
        </div>
      </div>

      <div style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.2)" }} />
    </footer>
  );
}
