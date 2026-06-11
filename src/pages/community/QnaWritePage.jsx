import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { publicQnaApi } from "../../api/public/qna";
import { ApiError } from "../../api/client";

export default function QnaWritePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", writerName: "", writerEmail: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null); setFieldErrors({});
    try {
      const created = await publicQnaApi.create({
        title: form.title,
        content: form.content,
        writerName: form.writerName,
        writerEmail: form.writerEmail || null,
      });
      navigate(`/community/qna/${created.id}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.fields) setFieldErrors(err.fields);
      } else setError("저장에 실패했습니다.");
    } finally { setSaving(false); }
  };

  const fieldClass = "w-full rounded-md border border-black/15 bg-white px-3 py-2 text-[14px] outline-none focus:border-black/40";

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
            ⌂ Community &gt; <Link to="/community/qna" className="hover:underline">Q&amp;A</Link> &gt; 문의 작성
          </div>
          <h1 className="mb-[40px] text-center text-[48px] font-bold leading-none text-black">문의 작성</h1>

          {error && <div className="mx-auto mb-6 max-w-[760px] rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}

          <form onSubmit={handleSubmit} className="mx-auto max-w-[760px] space-y-5">
            <div>
              <label className="mb-2 block text-[13px] font-semibold text-black/85">제목 <span className="text-red-500">*</span></label>
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })}
                className={fieldClass} maxLength={300} required />
              {fieldErrors.title && <div className="mt-1 text-[12px] text-red-600">{fieldErrors.title}</div>}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[13px] font-semibold text-black/85">이름 <span className="text-red-500">*</span></label>
                <input type="text" value={form.writerName} onChange={(e) => update({ writerName: e.target.value })}
                  className={fieldClass} maxLength={100} required />
                {fieldErrors.writerName && <div className="mt-1 text-[12px] text-red-600">{fieldErrors.writerName}</div>}
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold text-black/85">이메일 <span className="text-[11px] text-black/45">(선택)</span></label>
                <input type="email" value={form.writerEmail} onChange={(e) => update({ writerEmail: e.target.value })}
                  className={fieldClass} maxLength={200} placeholder="답변 알림을 받을 이메일" />
                {fieldErrors.writerEmail && <div className="mt-1 text-[12px] text-red-600">{fieldErrors.writerEmail}</div>}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-semibold text-black/85">내용 <span className="text-red-500">*</span></label>
              <textarea value={form.content} onChange={(e) => update({ content: e.target.value })}
                className={`${fieldClass} min-h-[260px] leading-[1.7]`} required />
              {fieldErrors.content && <div className="mt-1 text-[12px] text-red-600">{fieldErrors.content}</div>}
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button type="button" onClick={() => navigate("/community/qna")}
                className="inline-flex h-[48px] items-center justify-center border border-black px-8 text-[16px] font-medium text-black">
                취소
              </button>
              <button type="submit" disabled={saving}
                className="inline-flex h-[48px] items-center justify-center bg-black px-8 text-[16px] font-medium text-white disabled:opacity-60">
                {saving ? "저장 중…" : "등록"}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
