import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Link, useParams } from "react-router-dom";

export default function QnaDetailPage() {
  const { id } = useParams();

  const qnaData = [
    {
      id: 1,
      status: "답변 전",
      title: "구리언니 하루에 똥 몇 번 싸나요?",
      author: "비회원",
      date: "2025-06-11",
      question:
        "구리언니는 하루에 똥 몇 번 싸나요? 궁금합니다.",
      answer: null,
      answerDate: null,
    },
    {
      id: 2,
      status: "답변 완료",
      title: "왕재님은 하루에 담배 몇 번 피우나요? 궁금해요 내용 100",
      author: "qaiscz****",
      date: "2025-06-11",
      question: `안녕하세요 사이버마린시스템연구실에 다니고 있는 이윤서라고 합니다!

제 친구 왕재가 매일 담배를 피우는데 저랑 안 갈 때도 많아서 하루에 담배 몇 번 피우는지가 되게 되게 궁금해서 밤에 잠이 안 왔읍니다 흑흑

답변 주시면 내공 100 드릴게요! 안농 ><`,
      answer: `안녕하세요 이왕재입니다

윤서야 담배 피자 혜초관 흡연부스로 나오나`,
      answerDate: "2025-06-15 17:01:00",
    },
  ];

  const post = qnaData.find((item) => item.id === Number(id));

  if (!post) return null;

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
                className="pb-[4px] text-[18px] font-semibold text-black"
              >
                Recent news
              </Link>
              <Link
                to="/community/gallery"
                className="pb-[4px] text-[18px] font-semibold text-black"
              >
                Gallery
              </Link>
              <Link
                to="/community/contact-us"
                className="pb-[4px] text-[18px] font-semibold text-black"
              >
                Contact us
              </Link>
              <Link
                to="/community/qna"
                className="border-b border-black pb-[4px] text-[18px] font-semibold text-black"
              >
                Q&A
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-12 pt-[42px] pb-[120px]">
          {/* breadcrumb */}
          <div className="mb-[48px] text-[14px]">
            ⌂ Community &gt; Q&A
          </div>

          {/* title */}
          <h1 className="mb-[54px] text-center text-[64px] font-bold">
            Q&A
          </h1>

          <div className="mx-auto max-w-[1100px]">

            {/* status */}
            <div className="mb-[6px] text-[16px] font-semibold text-blue-600">
              {post.status}
            </div>

            {/* question title */}
            <h2 className="mb-[12px] text-[28px] font-bold">
              {post.title}
            </h2>

            {/* info */}
            <div className="mb-[40px] flex gap-[24px] text-[14px] text-gray-600">
              <span>작성자 {post.author}</span>
              <span>작성 날짜 {post.date}</span>
              {post.answerDate && (
                <span>답변 완료 {post.answerDate}</span>
              )}
            </div>

            {/* question */}
            <div className="mb-[30px]">
              <div className="mb-[14px] text-[32px] font-bold">Q.</div>

              <div className="whitespace-pre-line text-[18px] leading-[1.8]">
                {post.question}
              </div>
            </div>

            <div className="my-[30px] border-t border-gray-300"></div>

            {/* answer */}
            {post.answer && (
              <div>
                <div className="mb-[14px] text-[32px] font-bold text-blue-600">
                  A.
                </div>

                <div className="whitespace-pre-line text-[18px] leading-[1.8]">
                  {post.answer}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}