import { NavLink } from "react-router-dom";

const tabs = [
  { label: "Research topics", to: "/research" },
  { label: "Achievements", to: "/research/achievements" },
  { label: "Projects", to: "/research/projects" },
];

export default function ResearchTabs() {
  return (
    <section className="research-tabs w-full bg-[#EAEAEA] border-b border-black/10">
      <div className="mx-auto max-w-container px-6">
        <nav className="flex h-[56px] items-end gap-[44px]">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === "/research"}
              className="relative pb-[12px] text-[18px] font-semibold"
            >
              {({ isActive }) => (
                <>
                  {t.label}
                  <span
                    className={[
                      "absolute left-0 right-0 -bottom-[1px] h-[2px]",
                      isActive ? "bg-black/60" : "bg-transparent",
                    ].join(" ")}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </section>
  );
}
