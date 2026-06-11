import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import Pagination from "../../components/common/Pagination";
import { publicQnaApi } from "../../api/public/qna";
import { ApiError } from "../../api/client";

const PAGE_SIZE = 15;

function formatDate(s) {
  if (!s) return "";
  const d = new Date(s);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function QnAPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], totalPages: 0, totalItems: 0, page: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true); setError(null);
    publicQnaApi.list({ page, limit: PAGE_SIZE })
      .then(setData)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => { reload(); }, [reload]);

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />
      <main className="pt-[88px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[56px] items-center gap-8">
              <Link to="/community/recent-news" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Recent news</Link>
              <Link to="/community/gallery" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Gallery</Link>
              <Link to="/community/contact-us" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Contact us</Link>
              <Link to="/community/qna" className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black">Q&amp;A</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[140px]">
          <div className="mb-[40px] text-[14px] text-black">⌂ Community &gt; Q&amp;A</div>
          <h1 className="mb-[20px] text-center text-[64px] font-bold leading-none text-black">Q&amp;A</h1>
          <p className="mb-[40px] text-center text-[15px] text-black/65">연구실 관련 문의를 남겨주세요.</p>

          <div className="mb-6 flex justify-end">
            <button type="button" onClick={() => navigate("/community/qna/write")}
              className="inline-flex h-[42px] items-center rounded-md bg-black px-5 text-[14px] font-semibold text-white hover:bg-black/85">
              + 문의 작성
            </button>
          </div>

          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={reload} />}

          {!loading && !error && (
            <>
              <table className="w-full border-collapse border-t border-[#6a6a6a]">
                <thead>
                  <tr className="border-b border-[#9d9d9d]">
                    <th className="w-[80px] py-[16px] text-center text-[14px] font-medium text-black">순서</th>
                    <th className="py-[16px] text-left pl-4 text-[14px] font-medium text-black">제목</th>
                    <th className="w-[140px] py-[16px] text-center text-[14px] font-medium text-black">작성자</th>
                    <th className="w-[120px] py-[16px] text-center text-[14px] font-medium text-black">상태</th>
                    <th className="w-[140px] py-[16px] text-center text-[14px] font-medium text-black">날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.length === 0 ? (
                    <tr><td colSpan={5}><EmptyState title="아직 등록된 문의가 없습니다." /></td></tr>
                  ) : data.items.map((it, idx) => (
                    <tr key={it.id} className="border-b border-[#d7d7d7]">
                      <td className="py-[16px] text-center text-[14px] text-black">{(data.page - 1) * PAGE_SIZE + idx + 1}</td>
                      <td className="py-[16px] pl-4 text-[14px] text-black">
                        <Link to={`/community/qna/${it.id}`} className="hover:underline">{it.title}</Link>
                      </td>
                      <td className="py-[16px] text-center text-[14px] text-black/70">{it.writerName}</td>
                      <td className="py-[16px] text-center">
                        {it.answered
                          ? <span className="inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">답변완료</span>
                          : <span className="inline-flex h-5 items-center rounded-full bg-amber-100 px-2 text-[11px] font-semibold text-amber-700">대기중</span>}
                      </td>
                      <td className="py-[16px] text-center text-[14px] text-black/65">{formatDate(it.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.totalPages > 1 && (
                <div className="mt-10">
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
