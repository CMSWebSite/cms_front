import { useRef, useState } from "react";
import { ApiError } from "../../api/client";
import { uploadFile } from "../../api/admin/uploads";

/**
 * 파일 업로드 + URL 표시 필드.
 * - accept: input[type=file]의 accept 속성 (예: "image/*", "application/pdf")
 * - value: 현재 URL (없으면 빈 문자열)
 * - onChange: ({ url, originalName, size, mimeType }) => void — 업로드 성공 시 호출
 * - kind: "image" | "pdf" — 미리보기 모드
 */
export default function FileUploadField({
  accept,
  value,
  onChange,
  kind = "image",
  meta,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const pick = () => inputRef.current?.click();

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const result = await uploadFile(file);
      onChange?.(result);
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "업로드에 실패했습니다.";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={pick}
          disabled={uploading}
          className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-3 text-[13px] font-medium hover:bg-black/5 disabled:opacity-60"
        >
          {uploading ? "업로드 중…" : value ? "교체" : "파일 선택"}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange?.({ url: "", originalName: "", size: 0, mimeType: "" })}
            className="text-[12px] text-black/55 underline-offset-2 hover:underline"
          >
            제거
          </button>
        )}

        {meta && <span className="text-[12px] text-black/55">{meta}</span>}
      </div>

      {error && (
        <div className="mt-2 text-[12px] font-medium text-red-600">{error}</div>
      )}

      {value && kind === "image" && (
        <img
          src={value}
          alt="preview"
          className="mt-3 max-h-[160px] rounded-md border border-black/10 object-contain"
        />
      )}

      {value && kind === "pdf" && (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex h-9 items-center rounded-md border border-black/15 bg-white px-3 text-[13px] text-black/70 hover:bg-black/5"
        >
          PDF 보기 ↗
        </a>
      )}
    </div>
  );
}
