/**
 * 데이터 로딩 중 상태를 표시한다.
 * 콜아웃이 필요한 경우 message prop을 넘긴다.
 */
export default function LoadingState({ message = "불러오는 중…", className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`py-12 text-center text-[14px] text-black/55 ${className}`}
    >
      {message}
    </div>
  );
}
