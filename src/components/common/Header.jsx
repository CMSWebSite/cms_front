import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import { useAuth } from "../../auth/authContext";

const TEXT = "rgba(255,255,255,0.98)";
const TEXT_NAV = "rgba(255,255,255,0.92)";
const TEXT_SUB = "rgba(255,255,255,0.66)";

const baseTextStyle = { color: TEXT };

const navLabelStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "28px",
};

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
      { label: "News", to: "/community/recent-news" },
      { label: "Gallery", to: "/community/gallery" },
      { label: "Contact us", to: "/community/contact-us" },
      { label: "Q&A", to: "/community/qna" },
    ],
  },
];

const IconButton = ({ label, children, onClick, ariaExpanded, active }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    aria-expanded={ariaExpanded}
    onClick={onClick}
    className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10"
    style={{ color: active ? TEXT : TEXT_NAV }}
  >
    {children}
  </button>
);

const AccountIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12.5C14.2091 12.5 16 10.7091 16 8.5C16 6.29086 14.2091 4.5 12 4.5C9.79086 4.5 8 6.29086 8 8.5C8 10.7091 9.79086 12.5 12 12.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

function HeaderSearchPanel({ query, setQuery, showResults }) {
  const inputRef = useRef(null);
  const mockResults = useMemo(
    () => ["검색결과", "연구실신청", "topic", "갤러리"],
    []
  );

  // preventScroll: overflow-hidden 헤더가 스크롤되어 위로 밀리는 것을 막는다.
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="w-full px-8 lg:px-12" style={baseTextStyle}>
      <div className="mx-auto max-w-[1480px]">
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
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요."
              className="w-full bg-transparent outline-none placeholder:text-white/45"
              style={{
                color: TEXT,
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
                  color: TEXT_SUB,
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
                    className="w-fit text-left transition-colors hover:text-white"
                    style={{ color: TEXT_SUB }}
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
    <div className="w-full px-8 lg:px-12" style={baseTextStyle}>
      <div className="mx-auto max-w-[1480px]">
        <div className="pb-5 pt-2">
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

            {["한국어", "English"].map((lang) => (
              <button
                key={lang}
                type="button"
                className="transition-opacity hover:opacity-100"
                style={{
                  ...baseTextStyle,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const showSearchResults = query.trim().length > 0;

  // ESC 키로 메가 메뉴 닫기
  useEffect(() => {
    if (!megaOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [megaOpen]);

  const closeMega = () => setMegaOpen(false);

  const handleNavClick = (key) => {
    setSearchOpen(false);
    setLanguageOpen(false);
    setMegaOpen((prevOpen) => !(prevOpen && activeKey === key));
    setActiveKey(key);
  };

  const handleToggleSearch = () => {
    setMegaOpen(false);
    setLanguageOpen(false);
    setSearchOpen((prev) => !prev);
  };

  const handleToggleLanguage = () => {
    setMegaOpen(false);
    setSearchOpen(false);
    setLanguageOpen((prev) => !prev);
  };

  const handleLogout = () => {
    closeMega();
    logout();
    navigate("/");
  };

  const headerHeight = megaOpen
    ? "h-[306px]"
    : searchOpen
      ? showSearchResults
        ? "h-[320px]"
        : "h-[180px]"
      : languageOpen
        ? "h-[156px]"
        : "h-[88px]";

  return (
    <>
      {/* 흐려지는 배경 — 열려 있을 때만 마운트해 blur 비용을 최소화한다.
          목록이 아닌 영역을 클릭하면 닫힌다. */}
      {megaOpen && (
        <div
          aria-hidden="true"
          onClick={closeMega}
          className="fixed inset-0 z-[990]"
          style={{
            background: "rgba(3,10,14,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
      )}

      <header
        className={`fixed left-0 right-0 top-0 z-[1000] w-full overflow-hidden transition-[height] duration-300 ease-out ${headerHeight}`}
        style={{
          color: TEXT,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.97) 0%, rgba(1,18,24,0.97) 55%, rgba(1,18,24,0.96) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-[306px] w-full opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(18,88,104,0.20) 0%, rgba(0,0,0,0) 65%)",
          }}
        />

        <div className="relative mx-auto h-full w-full max-w-[1480px] px-8 lg:px-12">
          {/* 상단 바 */}
          <div className="flex h-[88px] items-center justify-between">
            <Link
              to="/"
              onClick={closeMega}
              className="flex shrink-0 items-center gap-3"
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

            <nav className="mx-6 flex min-w-0 flex-1 items-center justify-center gap-12 whitespace-nowrap lg:mx-10 lg:gap-20">
              {NAV_ITEMS.map((item) => {
                const children = item.children ?? [];
                const navColor = megaOpen ? TEXT : TEXT_NAV;

                // Home 등 하위 목록이 없는 항목 — 바로 페이지로 이동한다.
                if (children.length === 0) {
                  return (
                    <div key={item.key} className="relative">
                      <Link
                        to={item.to}
                        onClick={closeMega}
                        className="flex items-center pb-1 transition-colors"
                        style={{ ...navLabelStyle, color: navColor }}
                      >
                        {item.label}
                      </Link>
                    </div>
                  );
                }

                const isActive = megaOpen && activeKey === item.key;
                return (
                  <div key={item.key} className="relative">
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onClick={() => handleNavClick(item.key)}
                      className="relative flex items-center pb-1 transition-colors"
                      style={{ ...navLabelStyle, color: navColor }}
                    >
                      <span>{item.label}</span>
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 mx-auto h-[2px] rounded-full transition-[width,opacity] duration-200"
                        style={{
                          background: TEXT,
                          width: isActive ? "100%" : "0%",
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                    </button>

                    {/* 하위 목록 — 각 항목 아래로 펼쳐진다. */}
                    <ul
                      className={`absolute left-1/2 top-full flex -translate-x-1/2 flex-col items-center gap-4 whitespace-nowrap pt-7 text-center transition-[opacity,transform] duration-300 ${
                        megaOpen
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0"
                      }`}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: "26px",
                      }}
                    >
                      {children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            onClick={closeMega}
                            tabIndex={megaOpen ? 0 : -1}
                            className="block transition-colors hover:text-white"
                            style={{ color: TEXT_SUB }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1">
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

              {isAuthenticated ? (
                <div className="flex items-center gap-2 pl-1">
                  <span
                    className="grid h-10 w-10 place-items-center"
                    style={{ color: TEXT_NAV }}
                  >
                    <AccountIcon />
                  </span>
                  <span
                    className="max-w-[120px] truncate"
                    style={{
                      ...baseTextStyle,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "15px",
                      lineHeight: "20px",
                    }}
                    title={user?.name}
                  >
                    {user?.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/10"
                    style={{
                      color: TEXT_NAV,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  state={{ from: location.pathname + location.search }}
                  aria-label="Account"
                  title="Account"
                  onClick={closeMega}
                  className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10"
                  style={{ color: TEXT_NAV }}
                >
                  <AccountIcon />
                </Link>
              )}
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
      </header>
    </>
  );
}
