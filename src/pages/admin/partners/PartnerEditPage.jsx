import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { partnersApi } from "../../../api/admin/partners";
import { ApiError } from "../../../api/client";

const EMPTY = { name: "", logoUrl: "", websiteUrl: "", sortOrder: 0, visible: true };

export default function PartnerEditPage() {
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
    partnersApi.get(id)
      .then((d) => setForm({
        name: d.name, logoUrl: d.logoUrl ?? "", websiteUrl: d.websiteUrl ?? "",
        sortOrder: d.sortOrder ?? 0, visible: d.visible ?? true,
      }))
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null); setFieldErrors({});
    const payload = {
      name: form.name,
      logoUrl: form.logoUrl || null,
      websiteUrl: form.websiteUrl || null,
      sortOrder: Number(form.sortOrder) || 0,
      visible: form.visible,
    };
    try {
      if (isNew) await partnersApi.create(payload);
      else await partnersApi.update(id, payload);
      navigate("/admin/partners");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        if (err.fields) setFieldErrors(err.fields);
      } else setError("저장 실패");
    } finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader
        title={isNew ? "새 Partner" : "Partner 수정"}
        description="파트너 로고와 웹사이트를 입력합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/partners")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="partner-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="partner-form" onSubmit={handleSubmit} className="max-w-[720px] space-y-5">
            <FormField label="이름" required error={fieldErrors.name}>
              <input type="text" value={form.name} onChange={(e) => update({ name: e.target.value })} className={inputClass} maxLength={200} required />
            </FormField>
            <FormField label="로고 이미지" hint="배경이 짙은 곳에서 보이는 흰색/투명 PNG 권장">
              <FileUploadField kind="image" accept="image/*" value={form.logoUrl} onChange={(r) => update({ logoUrl: r.url })} />
            </FormField>
            <FormField label="웹사이트 URL" hint="선택">
              <input type="url" value={form.websiteUrl} onChange={(e) => update({ websiteUrl: e.target.value })} className={inputClass} maxLength={500} placeholder="https://" />
            </FormField>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="정렬 순서" hint="작을수록 앞에">
                <input type="number" min={0} value={form.sortOrder} onChange={(e) => update({ sortOrder: e.target.value })} className={inputClass} />
              </FormField>
              <FormField label="노출 여부">
                <label className="inline-flex items-center gap-2 text-[14px] pt-2">
                  <input type="checkbox" checked={form.visible} onChange={(e) => update({ visible: e.target.checked })} className="h-4 w-4" />
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
