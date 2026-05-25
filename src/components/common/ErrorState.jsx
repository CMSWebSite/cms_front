/**
 * API/네트워크 오류 상태를 표시한다.
 * onRetry가 있으면 "다시 시도" 버튼을 렌더한다.
 */
export default function ErrorState({
  message = "데이터를 불러오는 중 오류가 발생했습니다.",
  onRetry,
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      <div className="text-[14px] font-medium text-red-600">{message}</div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
