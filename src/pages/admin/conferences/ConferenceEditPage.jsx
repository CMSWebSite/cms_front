import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { conferencesApi } from "../../../api/admin/conferences";
import { ApiError } from "../../../api/client";

const todayIso = () => new Date().toISOString().slice(0, 10);

const EMPTY = {
  title: "", authors: "", conferenceName: "", location: "",
  presentedDate: todayIso(), abstractText: "",
  attachmentName: "", attachmentUrl: "", attachmentSize: 0,
  visible: true,
};

export default function ConferenceEditPage() {
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
    conferencesApi.get(id)
      .then((d) => setForm({
        title: d.title, authors: d.authors,
        conferenceName: d.conferenceName, location: d.location ?? "",
        presentedDate: d.presentedDate, abstractText: d.abstractText ?? "",
        attachmentName: d.attachmentName ?? "", attachmentUrl: d.attachmentUrl ?? "",
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
      title: form.title, authors: form.authors,
      conferenceName: form.conferenceName, location: form.location || null,
      presentedDate: form.presentedDate, abstractText: form.abstractText || null,
      attachmentName: form.attachmentName || null,
      attachmentUrl: form.attachmentUrl || null,
      attachmentSize: form.attachmentSize || null,
      visible: form.visible,
    };
    try {
      if (isNew) await conferencesApi.create(payload);
      else await conferencesApi.update(id, payload);
      navigate("/admin/conferences");
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
        title={isNew ? "새 Conference" : "Conference 수정"}
        description="학회 발표 정보를 입력합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/conferences")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="conf-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="conf-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <FormField label="제목" required error={fieldErrors.title}>
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} maxLength={300} required />
            </FormField>
            <FormField label="저자" required hint="콤마(,)로 구분" error={fieldErrors.authors}>
              <input type="text" value={form.authors} onChange={(e) => update({ authors: e.target.value })} className={inputClass} required />
            </FormField>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="학회명" required error={fieldErrors.conferenceName}>
                <input type="text" value={form.conferenceName} onChange={(e) => update({ conferenceName: e.target.value })} className={inputClass} maxLength={300} required />
              </FormField>
              <FormField label="장소" error={fieldErrors.location}>
                <input type="text" value={form.location} onChange={(e) => update({ location: e.target.value })} className={inputClass} maxLength={200} />
              </FormField>
            </div>
            <FormField label="발표일" required error={fieldErrors.presentedDate}>
              <input type="date" value={form.presentedDate} onChange={(e) => update({ presentedDate: e.target.value })} className={inputClass} required />
            </FormField>
            <FormField label="Abstract">
              <textarea value={form.abstractText} onChange={(e) => update({ abstractText: e.target.value })} className={`${textareaClass} min-h-[160px]`} />
            </FormField>
            <FormField label="첨부 PDF" hint="선택 (30MB 이하)">
              <FileUploadField kind="pdf" accept="application/pdf" value={form.attachmentUrl}
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
