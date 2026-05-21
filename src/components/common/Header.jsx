import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";

const HEADER_TEXT = "rgba(255,255,255,0.96)";
const HEADER_TEXT_DIM = "rgba(255,255,255,0.88)";

const baseTextStyle = { color: HEADER_TEXT };
const dimTextStyle = { color: HEADER_TEXT_DIM };

const IconButton = ({ label, children, onClick, ariaExpanded, active }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    aria-expanded={ariaExpanded}
    onClick={onClick}
    className="grid place-items-center p-2 transition-opacity hover:opacity-100"
    style={{
      color: active ? HEADER_TEXT : HEADER_TEXT_DIM,
      opacity: active ? 1 : 0.95,
    }}
  >
    {children}
  </button>
);

const NAV_ITEMS = [
  { key: "home", label: "Home", to: "/" },
  {
    key: "research",
    label: "Research",
    children: [
      { label: "Research topics", to: "/research" },
      { label: "Achievements", to: "/research/achievements" },
      { label: "Projects", to: "/research/projects" },
    ],
  },
  {
    key: "members",
    label: "Members",
    children: [
      { label: "Professor", to: "/members/professor" },
      { label: "Students", to: "/members/students" },
      { label: "Alumni", to: "/members/alumni" },
    ],
  },
  {
    key: "about",
    label: "About us",
    children: [
      { label: "Facilities", to: "/about/facilities" },
      { label: "Vision & Mission", to: "/about/vision" },
    ],
  },
  {
    key: "community",
    label: "Community",
    children: [
      { label: "Recent news", to: "/community/recent-news" },
      { label: "Gallery", to: "/community/gallery" },
      { label: "Contact us", to: "/community/contact-us" },
      { label: "Q&A", to: "/community/qna" },
    ],
  },
];

function NavDropdown({ openKey, anchorsRef, onClose }) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!openKey) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openKey, onClose]);

  useEffect(() => {
    if (!openKey) return;

    const update = () => {
      const el = anchorsRef.current?.[openKey];
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPos({
        left: Math.round(r.left + r.width / 2),
        top: Math.round(r.bottom),
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [openKey, anchorsRef]);

  if (!openKey) return null;

  const active = NAV_ITEMS.find((x) => x.key === openKey);
  const items = active?.children ?? null;
  if (!items?.length) return null;

  return (
    <div className="fixed inset-0 z-[1101]">
      <button
        type="button"
        aria-label="Close dropdown"
        onClick={onClose}
        className="absolute inset-0 z-0 cursor-default"
        style={{ background: "transparent" }}
      />

      <div
        className="absolute z-10"
        style={{
          left: pos?.left ?? 0,
          top: pos?.top ?? 0,
          transform: "translateX(-50%)",
          paddingTop: "18px",
        }}
      >
        <ul
          className="space-y-4 text-center"
          style={{
            ...dimTextStyle,
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "26px",
          }}
        >
          {items.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                onClick={onClose}
                className="block transition hover:opacity-100"
                style={dimTextStyle}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="pointer-events-none absolute left-0 right-0 top-[96px] z-[1] h-[220px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
      </div>
    </div>
  );
}

function HeaderSearchPanel({ query, setQuery, showResults }) {
  const mockResults = useMemo(
    () => ["검색결과", "연구실신청", "topic", "갤러리"],
    []
  );

  return (
    <div className="w-full px-6 lg:px-8" style={baseTextStyle}>
      <div className="mx-auto max-w-[1320px]">
        <div className="pb-6 pt-2">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요."
              className="w-full bg-transparent outline-none placeholder:text-white/45"
              style={{
                color: HEADER_TEXT,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "28px",
              }}
            />
          </div>

          <div className="mt-3 h-px w-full bg-white/18" />

          {showResults && (
            <div className="pt-4">
              <div
                className="flex flex-col gap-3"
                style={{
                  color: HEADER_TEXT_DIM,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: "24px",
                }}
              >
                {mockResults.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="w-fit text-left transition hover:opacity-85"
                    style={dimTextStyle}
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
    <div className="w-full px-6 lg:px-8" style={baseTextStyle}>
      <div className="mx-auto max-w-[1320px]">
        <div className="pb-4 pt-2">
          <div className="flex items-center gap-5">
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
              className="transition hover:opacity-85"
              style={{
                ...baseTextStyle,
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
              className="transition hover:opacity-85"
              style={{
                ...baseTextStyle,
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

export default function Header() {
  const [openNav, setOpenNav] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navAnchorsRef = useRef({});

  const showSearchResults = query.trim().length > 0;
  const headerExpanded = !!openNav || searchOpen || languageOpen;
  const headerHeight = openNav
    ? "h-[260px]"
    : headerExpanded
      ? "h-[170px]"
      : "h-[96px]";

  const closeUtilityPanels = () => {
    setSearchOpen(false);
    setLanguageOpen(false);
  };

  const handleToggleSearch = () => {
    setOpenNav(null);
    setLanguageOpen(false);
    setSearchOpen((prev) => !prev);
  };

  const handleToggleLanguage = () => {
    setOpenNav(null);
    setSearchOpen(false);
    setLanguageOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[1000] w-full overflow-hidden transition-all duration-300 ${headerHeight}`}
        style={{
          color: HEADER_TEXT,
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

        <div className="relative mx-auto h-full w-full max-w-[1480px] px-8 lg:px-12">
          <div className="w-full">
            <div className="flex h-[72px] items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-3"
                style={baseTextStyle}
              >
                <img
                  src={logo}
                  alt="CMS LAB"
                  className="h-[44px] w-[40px] object-contain sm:h-[48px] sm:w-[44px]"
                  draggable="false"
                />
                <div
                  className="select-none"
                  style={{
                    ...baseTextStyle,
                    fontFamily: "Unna, serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "13px",
                    letterSpacing: "0.01em",
                  }}
                >
                  <div>CYBER MARINE</div>
                  <div>SYSTEM LAB</div>
                </div>
              </Link>

              <nav className="mx-6 flex min-w-0 flex-1 items-center justify-center gap-28 overflow-x-auto whitespace-nowrap lg:mx-10 lg:gap-28 lg:overflow-visible">
                {NAV_ITEMS.map((item) => {
                  const hasChildren = !!item.children?.length;
                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.key}
                        to={item.to}
                        className="transition hover:opacity-100"
                        style={{
                          ...dimTextStyle,
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "20px",
                          lineHeight: "28px",
                        }}
                        onClick={() => setOpenNav(null)}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  const isOpen = openNav === item.key;
                  return (
                    <button
                      key={item.key}
                      ref={(el) => {
                        if (!el) return;
                        navAnchorsRef.current[item.key] = el;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => {
                        closeUtilityPanels();
                        setOpenNav((prev) => (prev === item.key ? null : item.key));
                      }}
                      className="flex items-center transition hover:opacity-100"
                      style={{
                        color: isOpen ? HEADER_TEXT : HEADER_TEXT_DIM,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: "20px",
                        lineHeight: "28px",
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="flex items-center gap-1 text-white">
                <div className="mr-5 flex items-center gap-4">
                  <Link
                    to="/login"
                    className="transition hover:opacity-100"
                    style={{
                      ...dimTextStyle,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "26px",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="transition hover:opacity-100"
                    style={{
                      ...dimTextStyle,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "26px",
                    }}
                  >
                    Sign up
                  </Link>
                </div>

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

      <NavDropdown
        openKey={openNav}
        anchorsRef={navAnchorsRef}
        onClose={() => setOpenNav(null)}
      />
    </>
  );
}