import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/admin/PageHeader";
import { dashboardApi } from "../../api/admin/dashboard";
import { ApiError } from "../../api/client";

function StatCard({ label, value, to, highlight }) {
  return (
    <Link
      to={to}
      className={[
        "block rounded-lg border bg-white p-5 transition-colors",
        highlight
          ? "border-amber-300 hover:border-amber-500"
          : "border-black/10 hover:border-black/30",
      ].join(" ")}
    >
      <div className="text-[12px] font-semibold uppercase tracking-wide text-black/55">
        {label}
      </div>
      <div className={[
        "mt-2 text-[28px] font-bold tracking-[-0.02em]",
        highlight && value > 0 ? "text-amber-600" : "",
      ].join(" ")}>
        {value}
      </div>
    </Link>
  );
}

const resourceMeta = {
  news: { label: "News", to: (id) => `/admin/news/${id}` },
  journal: { label: "Journal", to: (id) => `/admin/journals/${id}` },
  student: { label: "Student", to: (id) => `/admin/students/${id}` },
};

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    dashboardApi
      .summary()
      .then((res) => mounted && setData(res))
      .catch((err) => {
        if (!mounted) return;
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다.");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="콘텐츠와 사용자 현황을 한 눈에 확인합니다."
      />

      <div className="px-8 py-6">
        {loading && <div className="text-[14px] text-black/55">불러오는 중…</div>}
        {error && <div className="text-[14px] text-red-600">{error}</div>}

        {data && (
          <>
            {/* Achievements */}
            <section>
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-black/55">
                Research / Achievements
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <StatCard label="News" value={data.newsCount} to="/admin/news" />
                <StatCard label="Journals" value={data.journalsCount} to="/admin/journals" />
                <StatCard label="Conferences" value={data.conferencesCount} to="/admin/conferences" />
                <StatCard label="Patents" value={data.patentsCount} to="/admin/patents" />
                <StatCard label="Projects" value={data.projectsCount} to="/admin/projects" />
                <StatCard label="Others" value={data.othersCount} to="/admin/others" />
              </div>
            </section>

            {/* Members & Facility */}
            <section className="mt-8">
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-black/55">
                Members / About
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard label="활성 학생" value={data.activeStudentsCount} to="/admin/students" />
                <StatCard label="Alumni" value={data.alumniCount} to="/admin/students?status=ALUMNI" />
                <StatCard label="Facilities" value={data.facilitiesCount} to="/admin/facilities" />
                <StatCard label="Partners" value={data.partnersCount} to="/admin/partners" />
                <StatCard label="Users" value={data.usersCount} to="/admin/users" />
              </div>
            </section>

            {/* Community */}
            <section className="mt-8">
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-black/55">
                Community
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <StatCard label="Gallery Albums" value={data.albumsCount} to="/admin/gallery" />
                <StatCard
                  label="미답변 Q&A"
                  value={data.qnaUnansweredCount}
                  to="/admin/qna?answered=false"
                  highlight
                />
              </div>
            </section>

            <section className="mt-10">
              <div className="mb-3 text-[14px] font-semibold">최근 활동</div>
              <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
                {data.recentActivity.length === 0 ? (
                  <div className="p-5 text-center text-[13px] text-black/55">
                    아직 활동 내역이 없습니다.
                  </div>
                ) : (
                  <ul className="divide-y divide-black/5">
                    {data.recentActivity.map((a, i) => {
                      const meta = resourceMeta[a.resource];
                      return (
                        <li
                          key={`${a.resource}-${a.id}-${i}`}
                          className="flex items-center gap-4 px-5 py-3 text-[13px]"
                        >
                          <span className="inline-flex h-6 min-w-[60px] items-center justify-center rounded-full bg-black/5 text-[11px] font-semibold text-black/65">
                            {meta?.label ?? a.resource}
                          </span>
                          <Link
                            to={meta ? meta.to(a.id) : "#"}
                            className="min-w-0 flex-1 truncate hover:underline"
                          >
                            {a.label}
                          </Link>
                          <span className="shrink-0 text-[12px] text-black/45">
                            {new Date(a.at).toLocaleString()}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
