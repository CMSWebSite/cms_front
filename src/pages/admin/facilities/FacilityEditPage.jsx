import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { facilitiesApi } from "../../../api/admin/facilities";
import { ApiError } from "../../../api/client";

const EMPTY = {
  name: "", category: "GPU", description: "", specification: "",
  image: "", quantity: 1, sortOrder: 0, visible: true,
};

export default function FacilityEditPage() {
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
    facilitiesApi.get(id)
      .then((d) => setForm({
        name: d.name, category: d.category ?? "",
        description: d.description ?? "", specification: d.specification ?? "",
        image: d.image ?? "", quantity: d.quantity ?? 1, sortOrder: d.sortOrder ?? 0,
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
      name: form.name, category: form.category || null,
      description: form.description || null, specification: form.specification || null,
      image: form.image || null,
      quantity: Number(form.quantity) || 0, sortOrder: Number(form.sortOrder) || 0,
      visible: form.visible,
    };
    try {
      if (isNew) await facilitiesApi.create(payload);
      else await facilitiesApi.update(id, payload);
      navigate("/admin/facilities");
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
        title={isNew ? "새 Facility" : "Facility 수정"}
        description="장비 정보를 입력합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/facilities")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="facility-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="facility-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <FormField label="장비명" required error={fieldErrors.name}>
              <input type="text" value={form.name} onChange={(e) => update({ name: e.target.value })} className={inputClass} maxLength={200} required />
            </FormField>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <FormField label="카테고리" hint="예: GPU, Server">
                <input type="text" value={form.category} onChange={(e) => update({ category: e.target.value })} className={inputClass} maxLength={100} />
              </FormField>
              <FormField label="수량">
                <input type="number" min={0} value={form.quantity} onChange={(e) => update({ quantity: e.target.value })} className={inputClass} />
              </FormField>
              <FormField label="정렬 순서" hint="작을수록 앞에">
                <input type="number" min={0} value={form.sortOrder} onChange={(e) => update({ sortOrder: e.target.value })} className={inputClass} />
              </FormField>
            </div>
            <FormField label="이미지" hint="선택 (5MB 이하)">
              <FileUploadField kind="image" accept="image/*" value={form.image} onChange={(r) => update({ image: r.url })} />
            </FormField>
            <FormField label="설명">
              <textarea value={form.description} onChange={(e) => update({ description: e.target.value })} className={textareaClass} rows={3} />
            </FormField>
            <FormField label="사양 (Specification)" hint="모델/스펙 정보">
              <textarea value={form.specification} onChange={(e) => update({ specification: e.target.value })} className={textareaClass} rows={4} />
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
