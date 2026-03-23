import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function FacilitiesPage() {
  const facilities = [
    {
      title: "GeForce RTX 4090 (x2)",
    },
    {
      title: "NVIDIA A100",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black">
      <Header />

      {/* Header가 fixed 이므로 아래로 내려줌 */}
      <main className="pt-[96px]">
        {/* 상단 탭 영역 */}
        <section className="w-full bg-[#dddddd]">
          <div className="mx-auto max-w-[1280px] px-12">
            <div className="flex h-[72px] items-center gap-[48px]">
              <Link
                to="/about/facilities"
                className="border-b-2 border-black pb-1 text-[18px] font-semibold leading-none"
              >
                Facilities
              </Link>

              <Link
                to="/about/vision"
                className="pb-1 text-[18px] font-semibold leading-none text-black"
              >
                Vision & Mission
              </Link>
            </div>
          </div>
        </section>

        {/* 본문 */}
        <section className="mx-auto min-h-[calc(100vh-96px-72px)] max-w-[1280px] px-12 pt-4 pb-24">
          {/* breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-[18px] text-black/85">
            <span className="text-[16px]">⌂</span>
            <span>About us &gt; Facilities</span>
          </div>

          {/* 타이틀 */}
          <div className="flex flex-col items-center">
            <h1 className="text-center text-[64px] font-extrabold leading-none tracking-tight">
              Facilities
            </h1>

            <div className="mt-8 flex h-[68px] w-[340px] items-center justify-center rounded-full bg-black text-[28px] font-bold text-white">
              GPU
            </div>
          </div>

          {/* 장비 영역 */}
          <div className="mx-auto mt-20 grid max-w-[1100px] grid-cols-1 gap-y-16 md:grid-cols-2">
            {facilities.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* 이미지 자리 - 나중에 img 넣으면 됨 */}
                <div className="flex h-[260px] w-[360px] items-center justify-center">
                  <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-black/15 bg-transparent">
                    <span className="text-center text-[18px] font-medium text-black/30">
                      image placeholder
                    </span>
                  </div>
                </div>

                <h2 className="mt-10 text-center text-[32px] font-extrabold leading-tight tracking-tight">
                  {item.title}
                </h2>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}