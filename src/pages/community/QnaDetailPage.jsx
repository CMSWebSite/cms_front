import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { publicQnaApi } from "../../api/public/qna";
import { ApiError } from "../../api/client";

export default function QnaDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true); setNotFound(false); setError(null);
    publicQnaApi.get(id)
      .then((d) => mounted && setPost(d))
      .catch((err) => {
        if (!mounted) return;
        if (err instanceof ApiError && err.status === 404) setNotFound(true);
        else setError(err instanceof ApiError ? err.message : "불러오지 못했습니다.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

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
          <div className="mb-[40px] text-[14px] text-black">
            ⌂ Community &gt; <Link to="/community/qna" className="hover:underline">Q&amp;A</Link> {post && <>&gt; {post.title}</>}
          </div>

          {loading && <LoadingState />}
          {error && <ErrorState message={error} />}
          {notFound && (
            <div className="py-16 text-center">
              <h1 className="mb-6 text-[40px] font-bold">문의를 찾을 수 없습니다.</h1>
              <Link to="/community/qna" className="inline-block border border-black px-6 py-3 text-[16px]">목록으로</Link>
            </div>
          )}

          {!loading && !error && post && (
            <div className="mx-auto max-w-[860px]">
              <h1 className="mb-4 text-[32px] font-bold leading-[1.35] text-black">{post.title}</h1>
              <div className="mb-10 flex items-center gap-4 text-[13px] text-black/60">
                <span>{post.writerName}</span>
                <span>·</span>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
                {post.answered
                  ? <span className="ml-auto inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">답변완료</span>
                  : <span className="ml-auto inline-flex h-5 items-center rounded-full bg-amber-100 px-2 text-[11px] font-semibold text-amber-700">답변 대기중</span>}
              </div>

              <div className="rounded-lg border border-black/10 bg-white p-6 text-[15px] leading-[1.8] text-black whitespace-pre-line">
                {post.content}
              </div>

              {post.answered && post.answer && (
                <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50/40 p-6">
                  <div className="mb-3 flex items-center gap-3 text-[13px] font-semibold text-emerald-700">
                    <span>관리자 답변</span>
                    {post.answeredAt && <span className="text-[11px] font-normal text-emerald-700/70">{new Date(post.answeredAt).toLocaleString()}</span>}
                  </div>
                  <div className="text-[15px] leading-[1.8] text-black whitespace-pre-line">{post.answer}</div>
                </div>
              )}

              <div className="mt-12 flex justify-center">
                <Link to="/community/qna" className="inline-flex h-[48px] items-center justify-center border border-black px-8 text-[16px] font-medium text-black">
                  목록으로
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
