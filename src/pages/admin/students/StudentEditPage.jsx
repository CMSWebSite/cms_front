import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { studentsApi } from "../../../api/admin/students";
import { ApiError } from "../../../api/client";

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "재학" },
  { value: "ALUMNI", label: "졸업 (Alumni)" },
  { value: "INACTIVE", label: "비활성/휴학" },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

const EMPTY = {
  slug: "",
  koreanName: "",
  englishName: "",
  enrolledAt: todayIso(),
  role: "석사 연구생",
  majorsText: "",
  researchInterestsText: "",
  careerText: "",
  publicationsText: "",
  email: "",
  photoUrl: "",
  status: "ACTIVE",
  visible: true,
};

function joinLines(arr) { return (arr ?? []).join("\n"); }
function splitLines(text) {
  return (text ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
}

export default function StudentEditPage() {
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
    studentsApi.get(id)
      .then((d) => setForm({
        slug: d.slug,
        koreanName: d.koreanName,
        englishName: d.englishName,
        enrolledAt: d.enrolledAt,
        role: d.role,
        majorsText: joinLines(d.majors),
        researchInterestsText: joinLines(d.researchInterests),
        careerText: joinLines(d.career),
        publicationsText: joinLines(d.publications),
        email: d.email ?? "",
        photoUrl: d.photoUrl ?? "",
        status: d.status,
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
      slug: form.slug.trim(),
      koreanName: form.koreanName.trim(),
      englishName: form.englishName.trim(),
      enrolledAt: form.enrolledAt,
      role: form.role.trim(),
      majors: splitLines(form.majorsText),
      researchInterests: splitLines(form.researchInterestsText),
      career: splitLines(form.careerText),
      publications: splitLines(form.publicationsText),
      email: form.email || null,
      photoUrl: form.photoUrl || null,
      status: form.status,
      visible: form.visible,
    };
    try {
      if (isNew) await studentsApi.create(payload);
      else await studentsApi.update(id, payload);
      navigate("/admin/students");
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
        title={isNew ? "새 Student" : "Student 수정"}
        description="학생 회원 정보를 관리합니다. 슬러그는 URL에 사용됩니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/students")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="student-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="student-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="한글이름" required error={fieldErrors.koreanName}>
                <input type="text" value={form.koreanName} onChange={(e) => update({ koreanName: e.target.value })} className={inputClass} maxLength={50} required />
              </FormField>
              <FormField label="영문이름" required error={fieldErrors.englishName}>
                <input type="text" value={form.englishName} onChange={(e) => update({ englishName: e.target.value })} className={inputClass} maxLength={100} required />
              </FormField>
            </div>

            <FormField label="슬러그 (URL 식별자)" required hint="예: gyuri-kim" error={fieldErrors.slug}>
              <input type="text" value={form.slug} onChange={(e) => update({ slug: e.target.value })} className={inputClass} maxLength={100} pattern="^[a-z0-9][a-z0-9-]*$" required />
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="입학연월" required error={fieldErrors.enrolledAt}>
                <input type="date" value={form.enrolledAt} onChange={(e) => update({ enrolledAt: e.target.value })} className={inputClass} required />
              </FormField>
              <FormField label="역할/직책" required error={fieldErrors.role}>
                <input type="text" value={form.role} onChange={(e) => update({ role: e.target.value })} className={inputClass} maxLength={100} required />
              </FormField>
            </div>

            <FormField label="이메일">
              <input type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className={inputClass} maxLength={200} />
            </FormField>

            <FormField label="사진" hint="선택 (5MB 이하)">
              <FileUploadField kind="image" accept="image/*" value={form.photoUrl}
                onChange={(r) => update({ photoUrl: r.url })} />
            </FormField>

            <FormField label="전공 (Major)" hint="한 줄에 한 항목">
              <textarea value={form.majorsText} onChange={(e) => update({ majorsText: e.target.value })} className={textareaClass} rows={3} />
            </FormField>

            <FormField label="연구 관심사 (Research Interests)" hint="한 줄에 한 항목">
              <textarea value={form.researchInterestsText} onChange={(e) => update({ researchInterestsText: e.target.value })} className={textareaClass} rows={3} />
            </FormField>

            <FormField label="경력 (Career)" hint="한 줄에 한 항목">
              <textarea value={form.careerText} onChange={(e) => update({ careerText: e.target.value })} className={textareaClass} rows={3} />
            </FormField>

            <FormField label="대표 논문 (Publications)" hint="한 줄에 한 항목">
              <textarea value={form.publicationsText} onChange={(e) => update({ publicationsText: e.target.value })} className={`${textareaClass} min-h-[140px]`} />
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="상태" required>
                <select value={form.status} onChange={(e) => update({ status: e.target.value })} className={inputClass}>
                  {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </FormField>
              <FormField label="노출 여부">
                <label className="inline-flex items-center gap-2 text-[14px]">
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
