import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { projectsApi } from "../../../api/admin/projects";
import { ApiError } from "../../../api/client";

const STATUS_OPTIONS = [
  { value: "PLANNED", label: "계획" },
  { value: "ONGOING", label: "진행중" },
  { value: "COMPLETED", label: "완료" },
  { value: "SUSPENDED", label: "보류" },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

const EMPTY = {
  title: "", description: "",
  startDate: todayIso(), endDate: "",
  fundingAgency: "", role: "",
  status: "ONGOING",
  thumbnailImage: "", detailContent: "",
  visible: true,
};

export default function ProjectEditPage() {
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
    projectsApi.get(id)
      .then((d) => setForm({
        title: d.title, description: d.description ?? "",
        startDate: d.startDate, endDate: d.endDate ?? "",
        fundingAgency: d.fundingAgency ?? "", role: d.role ?? "",
        status: d.status,
        thumbnailImage: d.thumbnailImage ?? "",
        detailContent: d.detailContent ?? "",
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
      title: form.title, description: form.description || null,
      startDate: form.startDate, endDate: form.endDate || null,
      fundingAgency: form.fundingAgency || null,
      role: form.role || null,
      status: form.status,
      thumbnailImage: form.thumbnailImage || null,
      detailContent: form.detailContent || null,
      visible: form.visible,
    };
    try {
      if (isNew) await projectsApi.create(payload);
      else await projectsApi.update(id, payload);
      navigate("/admin/projects");
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
        title={isNew ? "새 Project" : "Project 수정"}
        description="연구 과제(프로젝트) 정보를 입력합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/projects")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="proj-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="proj-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <FormField label="과제명" required error={fieldErrors.title}>
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} maxLength={300} required />
            </FormField>
            <FormField label="요약 설명" hint="목록에 표시되는 짧은 설명">
              <textarea value={form.description} onChange={(e) => update({ description: e.target.value })} className={textareaClass} rows={3} />
            </FormField>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="시작일" required error={fieldErrors.startDate}>
                <input type="date" value={form.startDate} onChange={(e) => update({ startDate: e.target.value })} className={inputClass} required />
              </FormField>
              <FormField label="종료일" hint="진행중이면 비워두기">
                <input type="date" value={form.endDate} onChange={(e) => update({ endDate: e.target.value })} className={inputClass} />
              </FormField>
              <FormField label="발주기관">
                <input type="text" value={form.fundingAgency} onChange={(e) => update({ fundingAgency: e.target.value })} className={inputClass} maxLength={200} placeholder="예: 정보통신기획평가원" />
              </FormField>
              <FormField label="역할" hint="주관/참여/책임 등">
                <input type="text" value={form.role} onChange={(e) => update({ role: e.target.value })} className={inputClass} maxLength={100} />
              </FormField>
            </div>
            <FormField label="상태" required>
              <select value={form.status} onChange={(e) => update({ status: e.target.value })} className={inputClass}>
                {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </FormField>
            <FormField label="썸네일 이미지" hint="선택 (5MB 이하)">
              <FileUploadField kind="image" accept="image/*" value={form.thumbnailImage}
                onChange={(r) => update({ thumbnailImage: r.url })} />
            </FormField>
            <FormField label="상세 본문" hint="마크다운/일반 텍스트">
              <textarea value={form.detailContent} onChange={(e) => update({ detailContent: e.target.value })} className={`${textareaClass} min-h-[260px]`} />
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
