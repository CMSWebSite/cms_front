import { useEffect, useState } from "react";
import logo from "../../assets/icons/logo.png";

const IconButton = ({ label, children, onClick, ariaExpanded }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    aria-expanded={ariaExpanded}
    onClick={onClick}
    className="grid place-items-center p-2 text-white/90 hover:text-white transition"
  >
    {children}
  </button>
);

function MenuOverlay({ open, onClose }) {
  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={[
        // ✅ Header(1000)보다 위로 올려야 페이지 전체를 덮고 blur가 "뒤"에 걸림
        "fixed inset-0 z-[5000]",
        "transition-opacity duration-300",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* ✅ 배경: 메인페이지 요소들을 blur+dim (메뉴는 제외) */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        style={{
          background: "rgba(0,0,0,0.50)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />

      {/* inner shadow(비네트) - 배경 위에만 */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 70% at 50% 50%,
              rgba(0,0,0,0) 40%,
              rgba(0,0,0,0.45) 75%,
              rgba(0,0,0,0.85) 100%
            )
          `,
        }}
      />

      {/* ✅ 메뉴 컨텐츠: blur 영향 X (배경보다 위) */}
      <div className="relative z-10 w-full px-6">
        <div className="mx-auto max-w-[1200px] pt-[160px] pb-16">
          <nav className="flex justify-center">
            <div className="grid grid-cols-5 gap-24">
              {/* Home */}
              <div className="flex flex-col items-center">
                <div
                  className="mb-6 text-white text-center"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    lineHeight: "34px",
                  }}
                >
                  Home
                </div>
              </div>

              {/* Research */}
              <div className="flex flex-col items-center">
                <div
                  className="mb-6 text-white text-center"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    lineHeight: "34px",
                  }}
                >
                  Research
                </div>

                <ul
                  className="space-y-3 text-white/85 text-left"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "30px",
                  }}
                >
                  <li>
                    <a className="hover:text-white" href="#">
                      Research topics
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Achievements
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Projects
                    </a>
                  </li>
                </ul>
              </div>

              {/* Members */}
              <div className="flex flex-col items-center">
                <div
                  className="mb-6 text-white text-center"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    lineHeight: "34px",
                  }}
                >
                  Members
                </div>

                <ul
                  className="space-y-3 text-white/85 text-left"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "30px",
                  }}
                >
                  <li>
                    <a className="hover:text-white" href="#">
                      Professor
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Students
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Alumni
                    </a>
                  </li>
                </ul>
              </div>

              {/* About us */}
              <div className="flex flex-col items-center">
                <div
                  className="mb-6 text-white text-center"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    lineHeight: "34px",
                  }}
                >
                  About us
                </div>

                <ul
                  className="space-y-3 text-white/85 text-left"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "30px",
                  }}
                >
                  <li>
                    <a className="hover:text-white" href="#">
                      Facilities
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Vision &amp; Mission
                    </a>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div className="flex flex-col items-center">
                <div
                  className="mb-6 text-white text-center"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    lineHeight: "34px",
                  }}
                >
                  Community
                </div>

                <ul
                  className="space-y-3 text-white/85 text-left"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "30px",
                  }}
                >
                  <li>
                    <a className="hover:text-white" href="#">
                      News
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Q&amp;A
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-[1000] w-full">
        {/* 상단 어두운 그라데이션(사진처럼) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[96px] bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

        {/* ✅ 화면 좌우 꽉 차는 래퍼 */}
        <div className="relative w-full px-6">
          <div className="h-[72px] flex items-center justify-between">
            {/* Left: 로고 + 텍스트 */}
            <a href="/" className="flex items-center gap-3 text-white">
              <img
                src={logo}
                alt="CMS LAB"
                className="w-[44px] h-[48px] object-contain"
                draggable="false"
              />

              <div
                style={{
                  fontFamily: "Unna, serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "13px",
                  letterSpacing: "0.01em",
                }}
                className="select-none"
              >
                <div>CYBER MARINE</div>
                <div>SYSTEM LAB</div>
              </div>
            </a>

            {/* Right: 아이콘 3개 */}
            <div className="flex items-center gap-3">
              <IconButton label="Language">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-95"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M12 2C14.7614 4.66667 16 8 16 12C16 16 14.7614 19.3333 12 22C9.23858 19.3333 8 16 8 12C8 8 9.23858 4.66667 12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </IconButton>

              <IconButton label="Search">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-95"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </IconButton>

              {/* Menu 버튼: open 시 X 아이콘 */}
              <IconButton
                label={menuOpen ? "Close menu" : "Menu"}
                onClick={() => setMenuOpen((v) => !v)}
                ariaExpanded={menuOpen}
              >
                {menuOpen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-95"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-95"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7H20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 12H20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 17H20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
