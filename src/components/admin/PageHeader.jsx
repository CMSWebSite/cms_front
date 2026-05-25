/**
 * 관리자 페이지의 상단 헤더 — 제목 + 액션 버튼 영역.
 */
export default function PageHeader({ title, description, actions }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-black/10 bg-white px-8 py-6">
      <div className="min-w-0">
        <h1 className="truncate text-[22px] font-bold tracking-[-0.01em]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-[13px] text-black/55">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
}
