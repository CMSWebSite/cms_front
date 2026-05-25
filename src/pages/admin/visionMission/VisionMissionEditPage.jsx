import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { visionMissionApi } from "../../../api/admin/visionMission";
import { ApiError } from "../../../api/client";

const EMPTY = {
  sectionKey: "intro", title: "", subtitle: "",
  content: "", itemsText: "", image: "",
  sortOrder: 0, visible: true,
};

const joinLines = (a) => (a ?? []).join("\n");
const splitLines = (t) => (t ?? "").split("\n").map((l) => l.trim()).filter(Boolean);

export default function VisionMissionEditPage() {
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
    visionMissionApi.get(id)
      .then((d) => setForm({
        sectionKey: d.sectionKey, title: d.title ?? "", subtitle: d.subtitle ?? "",
        content: d.content ?? "", itemsText: joinLines(d.items),
        image: d.image ?? "", sortOrder: d.sortOrder ?? 0, visible: d.visible ?? true,
      }))
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null); setFieldErrors({});
    const payload = {
      sectionKey: form.sectionKey.trim(),
      title: form.title || null, subtitle: form.subtitle || null,
      content: form.content || null,
      items: splitLines(form.itemsText),
      image: form.image || null,
      sortOrder: Number(form.sortOrder) || 0,
      visible: form.visible,
    };
    try {
      if (isNew) await visionMissionApi.create(payload);
      else await visionMissionApi.update(id, payload);
      navigate("/admin/vision-mission");
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
        title={isNew ? "새 Vision Section" : "Vision Section 수정"}
        description="비전·미션 페이지의 한 섹션입니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/vision-mission")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="vm-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="vm-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <FormField label="섹션 키" required hint="예: intro, area1, closing" error={fieldErrors.sectionKey}>
                <input type="text" value={form.sectionKey} onChange={(e) => update({ sectionKey: e.target.value })} className={inputClass} maxLength={100} required />
              </FormField>
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
            <FormField label="제목">
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} maxLength={300} />
            </FormField>
            <FormField label="부제목">
              <input type="text" value={form.subtitle} onChange={(e) => update({ subtitle: e.target.value })} className={inputClass} maxLength={300} />
            </FormField>
            <FormField label="본문 내용" hint="마크다운/일반 텍스트">
              <textarea value={form.content} onChange={(e) => update({ content: e.target.value })} className={`${textareaClass} min-h-[200px]`} />
            </FormField>
            <FormField label="번호 목록 (한 줄에 한 항목)" hint="비워두면 목록 미표시">
              <textarea value={form.itemsText} onChange={(e) => update({ itemsText: e.target.value })} className={textareaClass} rows={5} />
            </FormField>
            <FormField label="이미지" hint="선택 (5MB 이하)">
              <FileUploadField kind="image" accept="image/*" value={form.image} onChange={(r) => update({ image: r.url })} />
            </FormField>
          </form>
        )}
      </div>
    </div>
  );
}
