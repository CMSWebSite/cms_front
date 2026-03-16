import { useEffect, useState } from "react";
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router-dom";

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
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // ✅ 열려있는 동안 뒤 스크롤 막기
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // ✅ 열릴 때만 렌더 (이게 핵심: 꼬임/덮어쓰기 제거)
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* ✅ 1) 전체 덮는 어두운 막 + 블러 */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.72)", // ✅ 뒤 화면 어둡게 (피그마 느낌)
          backdropFilter: "blur(100px)",
          WebkitBackdropFilter: "blur(100px)",
        }}
      />

      {/* ✅ 2) 가장자리 비네트(오른쪽 스샷처럼 가장자리 더 어둡게) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 70% at 50% 20%,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.35) 55%,
              rgba(0,0,0,0.85) 100%
            )
          `,
        }}
      />

      {/* ✅ 3) 메뉴 컨텐츠 */}
      <div className="relative z-10 w-full px-6">
        <div className="mx-auto max-w-[1200px] pt-[120px] pb-16">
          <nav className="flex justify-center">
            <div className="grid grid-cols-5 gap-24">
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
                    <Link
                      to="/research"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Research topics
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/research/achievements"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Achievements
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/research/projects"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>

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
                    <Link
                      to="/members/professor"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Professor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/members/students"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Students
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/members/alumni"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Alumni
                    </Link>
                  </li>
                </ul>
              </div>

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
                    <Link
                      to="/about/facilities"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Facilities
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about/vision"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Vision & Mission
                    </Link>
                  </li>
                </ul>
              </div>

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
                    <Link
                      to="/community/recent-news"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Recent news
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community/gallery"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community/contact-us"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community/qna"
                      onClick={onClose}
                      className="hover:text-white transition"
                    >
                      Q&amp;A
                    </Link>
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

export default function Header({ theme = "dark" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ✅ 핵심: 헤더 높이를 96으로 고정 + overflow-hidden으로 그라데이션 삐져나오는 현상 차단 */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] w-full h-[96px] !bg-black overflow-hidden text-white"
        style={{ backgroundColor: "#000" }} // ✅ 2중 안전장치(혹시 모를 덮어쓰기 방지)
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

        <div className="relative w-full px-6">
          <div className="h-[72px] flex items-center justify-between">
            {/* Left */}
            <Link to="/" className="flex items-center gap-3 text-white">
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
            </Link>

            {/* Right */}
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

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        theme={theme}
      />
    </>
  );
}
