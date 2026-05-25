import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import LoadingState from "../../../components/common/LoadingState";
import { patentsApi } from "../../../api/admin/patents";
import { ApiError } from "../../../api/client";

const STATUS_OPTIONS = [
  { value: "APPLIED", label: "출원" },
  { value: "REGISTERED", label: "등록" },
  { value: "REJECTED", label: "거절" },
  { value: "EXPIRED", label: "만료" },
];

const EMPTY = {
  title: "", inventors: "",
  applicationNumber: "", registrationNumber: "",
  applicationDate: "", registrationDate: "",
  status: "APPLIED", abstractText: "",
  visible: true,
};

export default function PatentEditPage() {
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
    patentsApi.get(id)
      .then((d) => setForm({
        title: d.title, inventors: d.inventors,
        applicationNumber: d.applicationNumber ?? "",
        registrationNumber: d.registrationNumber ?? "",
        applicationDate: d.applicationDate ?? "",
        registrationDate: d.registrationDate ?? "",
        status: d.status, abstractText: d.abstractText ?? "",
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
      title: form.title, inventors: form.inventors,
      applicationNumber: form.applicationNumber || null,
      registrationNumber: form.registrationNumber || null,
      applicationDate: form.applicationDate || null,
      registrationDate: form.registrationDate || null,
      status: form.status,
      abstractText: form.abstractText || null,
      visible: form.visible,
    };
    try {
      if (isNew) await patentsApi.create(payload);
      else await patentsApi.update(id, payload);
      navigate("/admin/patents");
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
        title={isNew ? "새 Patent" : "Patent 수정"}
        description="특허 정보를 입력합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/patents")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="patent-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="patent-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <FormField label="제목" required error={fieldErrors.title}>
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} maxLength={500} required />
            </FormField>
            <FormField label="발명자" required hint="콤마(,)로 구분" error={fieldErrors.inventors}>
              <input type="text" value={form.inventors} onChange={(e) => update({ inventors: e.target.value })} className={inputClass} required />
            </FormField>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="출원번호" error={fieldErrors.applicationNumber}>
                <input type="text" value={form.applicationNumber} onChange={(e) => update({ applicationNumber: e.target.value })} className={inputClass} maxLength={100} placeholder="10-2025-0160722" />
              </FormField>
              <FormField label="등록번호" error={fieldErrors.registrationNumber}>
                <input type="text" value={form.registrationNumber} onChange={(e) => update({ registrationNumber: e.target.value })} className={inputClass} maxLength={100} />
              </FormField>
              <FormField label="출원일">
                <input type="date" value={form.applicationDate} onChange={(e) => update({ applicationDate: e.target.value })} className={inputClass} />
              </FormField>
              <FormField label="등록일">
                <input type="date" value={form.registrationDate} onChange={(e) => update({ registrationDate: e.target.value })} className={inputClass} />
              </FormField>
            </div>
            <FormField label="상태" required>
              <select value={form.status} onChange={(e) => update({ status: e.target.value })} className={inputClass}>
                {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </FormField>
            <FormField label="Abstract">
              <textarea value={form.abstractText} onChange={(e) => update({ abstractText: e.target.value })} className={`${textareaClass} min-h-[160px]`} />
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
