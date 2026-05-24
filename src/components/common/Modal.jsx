import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * 공용 모달 (전문보기 등에 사용).
 * - 제목, 스크롤 가능한 본문, 우측 상단 닫기(X) 버튼, 하단 닫기 버튼 제공
 * - 배경 클릭 / ESC 키로 닫기 가능
 *
 * @param {{
 *   open: boolean,
 *   title: string,
 *   onClose: () => void,
 *   children: React.ReactNode,
 * }} props
 */
export default function Modal({ open, title, onClose, children }) {
  // ESC 키로 닫기 + 모달 열림 동안 body 스크롤 잠금
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4 py-10"
      onMouseDown={(e) => {
        // 배경(오버레이) 영역을 직접 클릭한 경우에만 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex w-full max-w-[640px] max-h-[80vh] flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] text-white shadow-2xl ring-1 ring-white/10"
      >
        {/* 헤더: 제목 + 우측 상단 닫기(X) */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <h2
            className="text-white"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "1.4",
            }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 본문: 세로 스크롤 영역 */}
        <div
          className="overflow-y-auto whitespace-pre-line px-6 py-5 text-white/80"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          {children}
        </div>

        {/* 푸터: 하단 닫기 버튼 */}
        <div className="border-t border-white/10 px-6 py-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full bg-[#E9E9E9] px-8 text-black transition hover:opacity-90"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              lineHeight: "1",
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
