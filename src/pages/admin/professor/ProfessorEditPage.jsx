import { useEffect, useState } from "react";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { professorApi } from "../../../api/admin/professor";
import { ApiError } from "../../../api/client";

const EMPTY = {
  name: "",
  position: "",
  profileImage: "",
  email: "",
  phone: "",
  office: "",
  biography: "",
  researchFieldsText: "",
  educationText: "",
  careerText: "",
  publicationsText: "",
  visible: true,
};

function joinLines(arr) { return (arr ?? []).join("\n"); }
function splitLines(text) {
  return (text ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export default function ProfessorEditPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedMessage, setSavedMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const load = () => {
    setLoading(true);
    setError(null);
    professorApi
      .get()
      .then((d) =>
        setForm({
          name: d.name ?? "",
          position: d.position ?? "",
          profileImage: d.profileImage ?? "",
          email: d.email ?? "",
          phone: d.phone ?? "",
          office: d.office ?? "",
          biography: d.biography ?? "",
          researchFieldsText: joinLines(d.researchFields),
          educationText: joinLines(d.education),
          careerText: joinLines(d.career),
          publicationsText: joinLines(d.publications),
          visible: d.visible ?? true,
        }),
      )
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null); setFieldErrors({}); setSavedMessage(null);
    const payload = {
      name: form.name,
      position: form.position || null,
      profileImage: form.profileImage || null,
      email: form.email || null,
      phone: form.phone || null,
      office: form.office || null,
      biography: form.biography || null,
      researchFields: splitLines(form.researchFieldsText),
      education: splitLines(form.educationText),
      career: splitLines(form.careerText),
      publications: splitLines(form.publicationsText),
      visible: form.visible,
    };
    try {
      await professorApi.update(payload);
      setSavedMessage("저장되었습니다.");
      setTimeout(() => setSavedMessage(null), 2500);
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
        title="Professor"
        description="연구실 교수 프로필을 관리합니다. 단일 레코드입니다."
        actions={
          <button
            type="submit"
            form="professor-form"
            disabled={saving || loading}
            className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60"
          >
            {saving ? "저장 중…" : "저장"}
          </button>
        }
      />

      <div className="px-8 py-6">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {error}
          </div>
        )}
        {savedMessage && (
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-700">
            {savedMessage}
          </div>
        )}

        {loading ? <LoadingState /> : (
          <form id="professor-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="이름" required error={fieldErrors.name}>
                <input type="text" value={form.name} onChange={(e) => update({ name: e.target.value })} className={inputClass} maxLength={100} required />
              </FormField>
              <FormField label="직위/직책" error={fieldErrors.position}>
                <input type="text" value={form.position} onChange={(e) => update({ position: e.target.value })} className={inputClass} maxLength={200} placeholder="Professor" />
              </FormField>
            </div>

            <FormField label="프로필 이미지" hint="선택 (5MB 이하)">
              <FileUploadField kind="image" accept="image/*" value={form.profileImage}
                onChange={(r) => update({ profileImage: r.url })} />
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <FormField label="이메일">
                <input type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className={inputClass} maxLength={200} />
              </FormField>
              <FormField label="전화번호">
                <input type="text" value={form.phone} onChange={(e) => update({ phone: e.target.value })} className={inputClass} maxLength={50} />
              </FormField>
              <FormField label="연구실">
                <input type="text" value={form.office} onChange={(e) => update({ office: e.target.value })} className={inputClass} maxLength={200} />
              </FormField>
            </div>

            <FormField label="약력 / Biography">
              <textarea value={form.biography} onChange={(e) => update({ biography: e.target.value })} className={`${textareaClass} min-h-[160px]`} />
            </FormField>

            <FormField label="연구 분야" hint="한 줄에 한 항목">
              <textarea value={form.researchFieldsText} onChange={(e) => update({ researchFieldsText: e.target.value })} className={textareaClass} rows={4} />
            </FormField>

            <FormField label="학력 (Education)" hint="한 줄에 한 항목">
              <textarea value={form.educationText} onChange={(e) => update({ educationText: e.target.value })} className={textareaClass} rows={4} />
            </FormField>

            <FormField label="경력 (Career)" hint="한 줄에 한 항목">
              <textarea value={form.careerText} onChange={(e) => update({ careerText: e.target.value })} className={textareaClass} rows={4} />
            </FormField>

            <FormField label="대표 논문 (Publications)" hint="한 줄에 한 항목">
              <textarea value={form.publicationsText} onChange={(e) => update({ publicationsText: e.target.value })} className={`${textareaClass} min-h-[160px]`} />
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
