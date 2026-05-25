import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, {
  inputClass,
  textareaClass,
} from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import { newsApi } from "../../../api/admin/news";
import { ApiError } from "../../../api/client";

/**
 * 새 글 작성과 기존 글 수정을 함께 처리한다 (id === "new"이면 신규).
 */
function toLocalInputValue(isoString) {
  // datetime-local 입력에 넣을 "YYYY-MM-DDTHH:mm" 형식
  const d = isoString ? new Date(isoString) : new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function NewsEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [form, setForm] = useState({
    title: "",
    content: "",
    coverImageUrl: "",
    publishedAt: toLocalInputValue(),
    visible: true,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    newsApi
      .get(id)
      .then((d) =>
        setForm({
          title: d.title,
          content: d.content,
          coverImageUrl: d.coverImageUrl ?? "",
          publishedAt: toLocalInputValue(d.publishedAt),
          visible: d.visible,
        }),
      )
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFieldErrors({});
    const payload = {
      ...form,
      coverImageUrl: form.coverImageUrl || null,
      publishedAt: new Date(form.publishedAt).toISOString(),
    };
    try {
      if (isNew) await newsApi.create(payload);
      else await newsApi.update(id, payload);
      navigate("/admin/news");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.fields) setFieldErrors(err.fields);
      } else {
        setError("저장에 실패했습니다.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        title={isNew ? "새 News" : "News 수정"}
        description="게시글의 제목·본문·노출 여부를 관리합니다."
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate("/admin/news")}
              className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5"
            >
              취소
            </button>
            <button
              type="submit"
              form="news-form"
              disabled={saving || loading}
              className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60"
            >
              {saving ? "저장 중…" : "저장"}
            </button>
          </>
        }
      />

      <div className="px-8 py-6">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-[14px] text-black/55">불러오는 중…</div>
        ) : (
          <form
            id="news-form"
            onSubmit={handleSubmit}
            className="max-w-[860px] space-y-5"
          >
            <FormField label="제목" required error={fieldErrors.title}>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
                className={inputClass}
                maxLength={200}
                required
              />
            </FormField>

            <FormField
              label="본문"
              required
              hint="마크다운/일반 텍스트"
              error={fieldErrors.content}
            >
              <textarea
                value={form.content}
                onChange={(e) => update({ content: e.target.value })}
                className={`${textareaClass} min-h-[260px]`}
                required
              />
            </FormField>

            <FormField label="대표 이미지" hint="선택 (5MB 이하)">
              <FileUploadField
                kind="image"
                accept="image/*"
                value={form.coverImageUrl}
                onChange={(r) => update({ coverImageUrl: r.url })}
                meta={form.coverImageUrl || "이미지 없음"}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label="게시일"
                required
                error={fieldErrors.publishedAt}
              >
                <input
                  type="datetime-local"
                  value={form.publishedAt}
                  onChange={(e) => update({ publishedAt: e.target.value })}
                  className={inputClass}
                  required
                />
              </FormField>

              <FormField label="노출 여부">
                <label className="inline-flex items-center gap-2 text-[14px]">
                  <input
                    type="checkbox"
                    checked={form.visible}
                    onChange={(e) => update({ visible: e.target.checked })}
                    className="h-4 w-4"
                  />
                  사이트에 노출
                </label>
              </FormField>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
