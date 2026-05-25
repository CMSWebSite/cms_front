import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/authContext";

const items = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/news", label: "News" },
  { to: "/admin/journals", label: "Journals" },
  { to: "/admin/conferences", label: "Conferences" },
  { to: "/admin/patents", label: "Patents" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/others", label: "Other Achievements" },
  { to: "/admin/professor", label: "Professor" },
  { to: "/admin/students", label: "Students" },
  { to: "/admin/facilities", label: "Facilities" },
  { to: "/admin/vision-mission", label: "Vision & Mission" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/qna", label: "Q&A" },
  { to: "/admin/partners", label: "Partners" },
  { to: "/admin/site-settings", label: "Site Settings" },
  { to: "/admin/users", label: "Users" },
];

export default function AdminSidebar({ onLogout }) {
  const { user } = useAuth();

  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col border-r border-black/10 bg-[#0c1626] text-white">
      <div className="px-6 py-6">
        <div className="text-[15px] font-bold tracking-wide opacity-80">
          CMS Admin
        </div>
        <div className="mt-1 truncate text-[12px] text-white/60" title={user?.email}>
          {user?.name ?? "—"} · {user?.email ?? ""}
        </div>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  [
                    "block rounded-md px-3 py-2 text-[14px] font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-3 pb-6">
        <button
          type="button"
          onClick={onLogout}
          className="block w-full rounded-md px-3 py-2 text-left text-[13px] font-medium text-white/70 hover:bg-white/5 hover:text-white"
        >
          로그아웃
        </button>
        <div className="mt-3 px-3 text-[11px] text-white/40">
          홈으로 돌아가려면{" "}
          <NavLink to="/" className="underline hover:text-white/70">
            사이트
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
