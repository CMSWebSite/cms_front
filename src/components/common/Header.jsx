import { useEffect, useMemo, useState } from "react";
import logo from "../../assets/icons/logo.png";
import { Link } from "react-router-dom";

const IconButton = ({ label, children, onClick, ariaExpanded, active }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    aria-expanded={ariaExpanded}
    onClick={onClick}
    className={`grid place-items-center p-2 transition ${
      active ? "text-white" : "text-white/90 hover:text-white"
    }`}
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

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(100px)",
          WebkitBackdropFilter: "blur(100px)",
        }}
      />

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

      <div className="relative z-10 w-full px-6">
        <div className="w-full pt-[120px] pb-16">
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
                      Vision &amp; Mission
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

function HeaderSearchPanel({ query, setQuery, showResults }) {
  const mockResults = useMemo(
    () => ["검색결과", "연구실신청", "topic", "갤러리"],
    [],
  );

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="pt-2 pb-6">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-white"
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

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=""
              className="w-full bg-transparent text-white outline-none border-0"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "22px",
                lineHeight: "30px",
              }}
            />
          </div>

          <div className="mt-2 h-[2px] w-full bg-white/90" />

          {showResults && (
            <div className="pt-4">
              <div
                className="flex flex-col gap-1 text-white"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "1.5",
                }}
              >
                {mockResults.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="w-fit text-left text-white hover:text-white/80 transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeaderLanguagePanel() {
  return (
    <div className="w-full px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="pt-2 pb-4">
          <div className="flex items-center gap-5 text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
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

            <button
              type="button"
              className="text-white hover:text-white/80 transition"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              한국어
            </button>

            <button
              type="button"
              className="text-white hover:text-white/80 transition"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header({ theme = "dark" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [query, setQuery] = useState("");

  const showSearchResults = query.trim().length > 0;

  const headerExpanded = searchOpen || languageOpen;
  const headerHeight = headerExpanded ? "h-[170px]" : "h-[96px]";

  const closeUtilityPanels = () => {
    setSearchOpen(false);
    setLanguageOpen(false);
  };

  const handleToggleMenu = () => {
    closeUtilityPanels();
    setMenuOpen((prev) => !prev);
  };

  const handleToggleSearch = () => {
    setMenuOpen(false);
    setLanguageOpen(false);
    setSearchOpen((prev) => !prev);
  };

  const handleToggleLanguage = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setLanguageOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] w-full overflow-hidden text-white transition-all duration-300 ${headerHeight}`}
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(1,18,24,0.95) 60%, rgba(1,18,24,0.92) 100%)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(18,88,104,0.20) 0%, rgba(0,0,0,0) 65%)",
          }}
        />

        <div className="relative w-full px-6">
          <div className="w-full">
            <div className="h-[72px] flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 text-white">
                <img
                  src={logo}
                  alt="CMS LAB"
                  className="w-[40px] h-[44px] object-contain sm:w-[44px] sm:h-[48px]"
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

              <div className="flex items-center gap-1">
                <Link
                  to="/login"
                  className="mr-4 text-white/95 hover:text-white transition"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  Sign up / Login
                </Link>

                <IconButton
                  label="Language"
                  onClick={handleToggleLanguage}
                  ariaExpanded={languageOpen}
                  active={languageOpen}
                >
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
                    <path
                      d="M2 12H22"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 2C14.7614 4.66667 16 8 16 12C16 16 14.7614 19.3333 12 22C9.23858 19.3333 8 16 8 12C8 8 9.23858 4.66667 12 2Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </IconButton>

                <IconButton
                  label="Search"
                  onClick={handleToggleSearch}
                  ariaExpanded={searchOpen}
                  active={searchOpen}
                >
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
                  onClick={handleToggleMenu}
                  ariaExpanded={menuOpen}
                  active={menuOpen}
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

            {searchOpen && (
              <HeaderSearchPanel
                query={query}
                setQuery={setQuery}
                showResults={showSearchResults}
              />
            )}

            {languageOpen && <HeaderLanguagePanel />}
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
