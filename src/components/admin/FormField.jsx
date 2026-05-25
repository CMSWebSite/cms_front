/**
 * 관리자 폼에서 사용하는 라벨 + 입력 래퍼.
 * children에 <input>/<select>/<textarea> 등을 넣어 사용한다.
 */
export default function FormField({ label, hint, error, required, children }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[13px] font-semibold text-black/85">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
        {hint && <span className="text-[11px] text-black/45">{hint}</span>}
      </div>
      {children}
      {error && (
        <div className="mt-1 text-[12px] font-medium text-red-600">{error}</div>
      )}
    </label>
  );
}

export const inputClass =
  "block w-full rounded-md border border-black/15 bg-white px-3 py-2 text-[14px] outline-none transition-colors focus:border-black/40 focus:ring-2 focus:ring-black/10";

export const textareaClass = `${inputClass} min-h-[120px] leading-[1.6]`;
