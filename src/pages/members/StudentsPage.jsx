import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";
import { publicStudentsApi } from "../../api/public/students";
import { ApiError } from "../../api/client";

const PAGE_SIZE = 12;

function MembersTab({ active }) {
  const tab = (label, to) => {
    const isActive = label === active;
    return (
      <Link
        to={to}
        className={
          isActive
            ? "relative inline-flex h-[54px] items-center font-bold"
            : "inline-flex h-[54px] items-center text-black hover:text-black/70 transition"
        }
      >
        {label}
        {isActive && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" />}
      </Link>
    );
  };
  return (
    <section className="h-[54px] w-full bg-[#dcdcdc]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center px-[34px]">
        <div className="flex items-center gap-[34px] text-[18px] font-semibold text-black">
          {tab("Professor", "/members/professor")}
          {tab("Students", "/members/students")}
          {tab("Alumni", "/members/alumni")}
        </div>
      </div>
    </section>
  );
}

function StudentCard({ student }) {
  return (
    <Link
      to={`/members/students/${student.slug}`}
      className="group flex w-[180px] flex-col items-center text-center"
    >
      <div className="flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#e5e5e5] bg-white group-hover:border-black/40 transition-colors">
        {student.photoUrl ? (
          <img
            src={student.photoUrl}
            alt={student.koreanName}
            className="h-[150px] w-[150px] rounded-full object-cover"
            draggable="false"
          />
        ) : (
          <div className="h-[150px] w-[150px] rounded-full bg-black/10" />
        )}
      </div>
      <div className="mt-[14px] text-[16px] font-bold leading-none text-black">
        {student.koreanName}
      </div>
      <div className="mt-[4px] text-[12px] text-black/55">{student.englishName}</div>
      <div className="mt-[8px] text-[12px] text-black/70 truncate w-full">
        {student.role}
      </div>
    </Link>
  );
}

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], totalPages: 0, totalItems: 0, page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true); setError(null);
    publicStudentsApi.list({ page, limit: PAGE_SIZE })
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => { reload(); }, [reload]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Header theme="dark" />
      <main className="bg-white pt-[88px]">
        <MembersTab active="Students" />

        <section className="mx-auto w-full max-w-[1280px] bg-white px-[42px] pb-[60px] pt-[10px]">
          <div className="mb-[24px] text-[13px] leading-none text-black">
            ⌂ Members &gt; Students
          </div>

          <h1 className="mb-[42px] text-center text-[60px] font-extrabold leading-none tracking-[-0.03em] text-black">
            Students
          </h1>

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={reload} />}

          {!loading && !error && (
            <>
              {data.items.length === 0 ? (
                <EmptyState
                  title="아직 등록된 학생이 없습니다."
                  description="관리자 페이지에서 등록 후 표시됩니다."
                />
              ) : (
                <div className="flex flex-wrap gap-x-[26px] gap-y-[36px] justify-center">
                  {data.items.map((s) => <StudentCard key={s.slug} student={s} />)}
                </div>
              )}

              {data.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
