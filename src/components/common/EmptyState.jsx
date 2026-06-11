/**
 * 목록·결과가 비었을 때 표시하는 공통 컴포넌트.
 */
export default function EmptyState({
  title = "등록된 데이터가 없습니다.",
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      <div className="text-[15px] font-semibold text-black/75">{title}</div>
      {description && (
        <div className="mt-2 max-w-[420px] text-[13px] text-black/50">
          {description}
        </div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
