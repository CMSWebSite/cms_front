import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { publicContactApi } from "../../api/public/contact";
import { ApiError } from "../../api/client";
import heroImage from "../../assets/images/research-1.jpg";

// 상단 4개 바로가기 — 라벨과 이동 경로.
const SHORTCUTS = [
  { label: "What do we?", to: "/research" },
  { label: "Future family", to: "/members/professor" },
  { label: "Our goals", to: "/about/vision" },
  { label: "Feeling mood", to: "/community/gallery" },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const EMPTY_FORM = { name: "", contact: "", major: "", introduce: "" };

export default function ContactUsPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok: boolean, message: string }

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    if (!form.name.trim() || !form.contact.trim() || !form.major.trim()) {
      setResult({ ok: false, message: "이름, 연락처, 전공은 필수 입력 항목입니다." });
      return;
    }

    setSubmitting(true);
    try {
      await publicContactApi.apply({
        name: form.name.trim(),
        contact: form.contact.trim(),
        major: form.major.trim(),
        introduce: form.introduce.trim() || null,
      });
      setForm(EMPTY_FORM);
      setResult({ ok: true, message: "지원이 정상적으로 접수되었습니다. 감사합니다!" });
    } catch (err) {
      setResult({
        ok: false,
        message: err instanceof ApiError ? err.message : "제출 중 오류가 발생했습니다.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-[10px] border border-black/25 bg-white px-5 py-4 text-[15px] text-black outline-none transition-colors placeholder:text-black/40 focus:border-black/60";

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />
      <main className="pt-[88px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[56px] items-center gap-8">
              <Link to="/community/recent-news" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Recent news</Link>
              <Link to="/community/gallery" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Gallery</Link>
              <Link to="/community/contact-us" className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black">Contact us</Link>
              <Link to="/community/qna" className="pb-[4px] text-[18px] font-semibold leading-none text-black">Q&amp;A</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[140px]">
          <div className="mb-[40px] text-[14px] text-black">⌂ Community &gt; Contact us</div>

          {/* 히어로 — 이미지 + 소개 + 바로가기 */}
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-[6px]">
              <img
                src={heroImage}
                alt="Laboratory"
                className="h-[280px] w-full object-cover"
                draggable="false"
              />
            </div>

            <div>
              <h1 className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.02em] text-black">
                Laboratory that
                <br />
                shaped who we are
              </h1>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {SHORTCUTS.map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    className="flex items-center gap-3 rounded-[10px] bg-[#e6e6e6] px-5 py-4 text-[15px] font-medium text-black transition-colors hover:bg-[#d8d8d8]"
                  >
                    <ArrowIcon />
                    <span>{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Apply now — 지원 폼 (비로그인 가능) */}
          <div className="mt-[80px]">
            <h2 className="mb-[36px] text-center text-[32px] font-bold leading-none text-black">
              Apply now
            </h2>

            <form onSubmit={handleSubmit} className="mx-auto max-w-[640px] space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={setField("name")}
                placeholder="* Name"
                className={inputClass}
              />
              <input
                type="text"
                value={form.contact}
                onChange={setField("contact")}
                placeholder="* Email or phone number"
                className={inputClass}
              />
              <input
                type="text"
                value={form.major}
                onChange={setField("major")}
                placeholder="* Major"
                className={inputClass}
              />
              <textarea
                value={form.introduce}
                onChange={setField("introduce")}
                placeholder="Introduce"
                rows={6}
                className={`${inputClass} resize-y`}
              />

              {result && (
                <div
                  className={`text-center text-[14px] ${
                    result.ok ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {result.message}
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="min-w-[160px] rounded-full bg-black px-10 py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "제출 중…" : "apply"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
