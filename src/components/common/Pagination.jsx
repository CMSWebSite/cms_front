/**
 * 공통 페이지네이션 컴포넌트.
 * - page: 현재 페이지(1-기반)
 * - totalPages: 총 페이지 수
 * - onChange(nextPage): 페이지 변경 콜백
 *
 * 7개 이하면 모두 보여주고, 그보다 많으면 현재 페이지 주변만 ellipsis로 보여준다.
 */
export default function Pagination({ page, totalPages, onChange, className = "" }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange?.(p);
  };

  const pageList = buildPages(page, totalPages);

  return (
    <nav
      className={`flex items-center justify-center gap-2 text-[14px] ${className}`}
      aria-label="페이지 이동"
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-black/15 bg-white px-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹
      </button>

      {pageList.map((it, idx) =>
        it === "…" ? (
          <span
            key={`gap-${idx}`}
            className="inline-flex h-8 min-w-8 items-center justify-center text-black/40"
          >
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            onClick={() => go(it)}
            aria-current={it === page ? "page" : undefined}
            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 ${
              it === page
                ? "bg-black text-white"
                : "border border-black/15 bg-white hover:bg-black/5"
            }`}
          >
            {it}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-black/15 bg-white px-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ›
      </button>
    </nav>
  );
}

function buildPages(page, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const result = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) result.push("…");
  for (let i = start; i <= end; i++) result.push(i);
  if (end < totalPages - 1) result.push("…");
  result.push(totalPages);
  return result;
}
