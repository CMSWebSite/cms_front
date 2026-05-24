import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
// import contactImg from "../../assets/images/community/contact/contact-main.jpg";
import contactImg from "../../assets/images/research-2.jpg";

export default function ContactUsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />

      <main className="pt-[88px]">
        {/* Community tab */}
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
                className="border-b border-black pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Contact us
              </Link>
              <Link
                to="/community/qna"
                className="pb-[4px] text-[18px] font-semibold leading-none text-black"
              >
                Q&amp;A
              </Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[120px]">
          {/* breadcrumb */}
          <div className="mb-[54px] flex items-center gap-1 text-[14px] text-black">
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
            <span>Contact us</span>
          </div>

          {/* top section */}
          <div className="mx-auto mb-[72px] grid max-w-[1180px] grid-cols-[1.05fr_1fr] items-center gap-[42px]">
            <div>
              <img
                src={contactImg}
                alt="Contact us"
                className="h-[360px] w-full object-cover"
              />
            </div>

            <div className="pt-[8px]">
              <h1 className="mb-[34px] text-[62px] font-bold leading-[1.03] text-black">
                Laboratory that
                <br />
                shaped who we are
              </h1>

              <div className="grid grid-cols-2 gap-x-[18px] gap-y-[16px] max-w-[520px]">
                <button
                  type="button"
                  onClick={() => navigate("/research")}
                  className="flex h-[56px] items-center gap-3 rounded-[14px] bg-[#d9d9d9] px-[18px] text-left text-[16px] font-medium text-black transition hover:bg-[#cfcfcf]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14L19 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 14V19H5V5H10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>What do we?</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/members/professor")}
                  className="flex h-[56px] items-center gap-3 rounded-[14px] bg-[#d9d9d9] px-[18px] text-left text-[16px] font-medium text-black transition hover:bg-[#cfcfcf]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14L19 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 14V19H5V5H10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Future family</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/about/vision")}
                  className="flex h-[56px] items-center gap-3 rounded-[14px] bg-[#d9d9d9] px-[18px] text-left text-[16px] font-medium text-black transition hover:bg-[#cfcfcf]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14L19 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 14V19H5V5H10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Our goals</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/community/gallery")}
                  className="flex h-[56px] items-center gap-3 rounded-[14px] bg-[#d9d9d9] px-[18px] text-left text-[16px] font-medium text-black transition hover:bg-[#cfcfcf]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M14 5H19V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14L19 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 14V19H5V5H10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Feeling mood</span>
                </button>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="mx-auto max-w-[760px]">
            <h2 className="mb-[28px] text-center text-[54px] font-bold leading-none text-black">
              Apply now
            </h2>

            <form className="flex flex-col items-center">
              <div className="w-full space-y-[16px]">
                <input
                  type="text"
                  placeholder="* Name"
                  className="h-[56px] w-full rounded-[14px] border border-[#6f6f6f] bg-transparent px-[18px] text-[16px] text-black outline-none placeholder:text-[#666]"
                />

                <input
                  type="text"
                  placeholder="* Email or phone number"
                  className="h-[56px] w-full rounded-[14px] border border-[#6f6f6f] bg-transparent px-[18px] text-[16px] text-black outline-none placeholder:text-[#666]"
                />

                <input
                  type="text"
                  placeholder="* Major"
                  className="h-[56px] w-full rounded-[14px] border border-[#6f6f6f] bg-transparent px-[18px] text-[16px] text-black outline-none placeholder:text-[#666]"
                />

                <textarea
                  placeholder="Introduce"
                  className="h-[170px] w-full resize-none rounded-[14px] border border-[#6f6f6f] bg-transparent px-[18px] py-[16px] text-[16px] text-black outline-none placeholder:text-[#666]"
                />
              </div>

              <button
                type="submit"
                className="mt-[28px] inline-flex h-[56px] min-w-[180px] items-center justify-center rounded-full bg-black px-[36px] text-[30px] font-semibold text-white"
              >
                apply
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}