import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

/** 정의되지 않은 경로(404)용 페이지. */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header theme="dark" />
      <main className="flex min-h-[calc(100vh-88px)] flex-col items-center justify-center bg-white px-6 pt-[88px] text-center">
        <div
          className="leading-none text-black"
          style={{ fontFamily: "Unna, serif", fontSize: 96, fontWeight: 700 }}
        >
          404
        </div>
        <p className="mt-6 text-[20px] font-semibold text-black/85">
          페이지를 찾을 수 없습니다.
        </p>
        <p className="mt-2 text-[14px] text-black/50">
          주소가 잘못 입력되었거나, 삭제되었거나, 이동된 페이지입니다.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex h-11 items-center rounded-full bg-black px-8 text-[15px] font-bold text-white transition hover:opacity-85"
        >
          홈으로 돌아가기
        </Link>
      </main>
      <Footer />
    </div>
  );
}
