import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { othersApi } from "../../../api/admin/others";
import { ApiError } from "../../../api/client";

const TYPE_OPTIONS = ["저작권", "기술이전", "기타"];

const todayIso = () => new Date().toISOString().slice(0, 10);

const EMPTY = {
  title: "", type: "저작권", description: "",
  achievedOn: todayIso(),
  attachmentName: "", attachmentUrl: "", attachmentSize: 0,
  visible: true,
};

export default function OtherEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    othersApi.get(id)
      .then((d) => setForm({
        title: d.title, type: d.type, description: d.description ?? "",
        achievedOn: d.achievedOn,
        attachmentName: d.attachmentName ?? "",
        attachmentUrl: d.attachmentUrl ?? "",
        attachmentSize: d.attachmentSize ?? 0,
        visible: d.visible ?? true,
      }))
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null); setFieldErrors({});
    const payload = {
      title: form.title, type: form.type,
      description: form.description || null,
      achievedOn: form.achievedOn,
      attachmentName: form.attachmentName || null,
      attachmentUrl: form.attachmentUrl || null,
      attachmentSize: form.attachmentSize || null,
      visible: form.visible,
    };
    try {
      if (isNew) await othersApi.create(payload);
      else await othersApi.update(id, payload);
      navigate("/admin/others");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.fields) setFieldErrors(err.fields);
      } else setError("저장에 실패했습니다.");
    } finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader
        title={isNew ? "새 Other Achievement" : "Other Achievement 수정"}
        description="저작권/기술이전/기타 실적을 입력합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/others")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="other-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="other-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <FormField label="제목" required error={fieldErrors.title}>
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} maxLength={500} required />
            </FormField>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="분류" required>
                <select value={form.type} onChange={(e) => update({ type: e.target.value })} className={inputClass}>
                  {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </FormField>
              <FormField label="날짜" required error={fieldErrors.achievedOn}>
                <input type="date" value={form.achievedOn} onChange={(e) => update({ achievedOn: e.target.value })} className={inputClass} required />
              </FormField>
            </div>
            <FormField label="설명">
              <textarea value={form.description} onChange={(e) => update({ description: e.target.value })} className={`${textareaClass} min-h-[180px]`} />
            </FormField>
            <FormField label="첨부 파일" hint="선택 (이미지 5MB / PDF 30MB)">
              <FileUploadField kind="pdf" accept="application/pdf,image/*" value={form.attachmentUrl}
                onChange={(r) => update({ attachmentUrl: r.url, attachmentName: r.originalName, attachmentSize: r.size })}
                meta={form.attachmentName || "첨부 없음"} />
            </FormField>
            <FormField label="노출 여부">
              <label className="inline-flex items-center gap-2 text-[14px]">
                <input type="checkbox" checked={form.visible} onChange={(e) => update({ visible: e.target.checked })} className="h-4 w-4" />
                사이트에 노출
              </label>
            </FormField>
          </form>
        )}
      </div>
    </div>
  );
}
