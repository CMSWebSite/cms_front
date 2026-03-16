import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";

export default function QnaWritePage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />

      <main className="pt-[96px]">
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[56px] items-center gap-8">
              <Link
                to="/community/recent-news"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Recent news
              </Link>
              <Link
                to="/community/gallery"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Gallery
              </Link>
              <Link
                to="/community/contact-us"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Contact us
              </Link>
              <Link
                to="/community/qna"
                className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Q&amp;A
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[120px]">
          <div className="mb-[48px] flex items-center gap-1 text-[14px] text-black">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M3 10.5L12 3L21 10.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 9.5V20H19V9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 20V14H15V20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Community</span>
            <span>{">"}</span>
            <span>Q&amp;A</span>
          </div>

          <h1 className="mb-[46px] text-center text-[64px] font-bold leading-none text-black">
            Q&amp;A
          </h1>

          <div className="mx-auto max-w-[1120px]">
            <form className="flex flex-col items-center">
              <div className="w-full space-y-[16px]">
                <input
                  type="password"
                  placeholder="* Password"
                  className="h-[56px] w-full rounded-[16px] border border-[#575757] bg-transparent px-[22px] text-[16px] text-black outline-none placeholder:text-[#6c6c6c]"
                />

                <textarea
                  placeholder="Introduce"
                  className="h-[240px] w-full resize-none rounded-[16px] border border-[#575757] bg-transparent px-[22px] py-[18px] text-[16px] text-black outline-none placeholder:text-[#6c6c6c]"
                />
              </div>

              <button
                type="submit"
                className="mt-[54px] inline-flex h-[54px] min-w-[184px] items-center justify-center rounded-full bg-black px-[36px] text-[18px] font-semibold text-white"
              >
                post
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}