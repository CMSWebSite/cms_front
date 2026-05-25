import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, {
  inputClass,
  textareaClass,
} from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { journalsApi } from "../../../api/admin/journals";
import { ApiError } from "../../../api/client";

const todayIso = () => new Date().toISOString().slice(0, 10);

const EMPTY_FORM = {
  title1: "",
  title2: "",
  publishedDate: todayIso(),
  authors: "",
  journalName: "",
  volume: "",
  issue: "",
  pages: "",
  doi: "",
  metaLinesText: "",
  highlightsText: "",
  abstractText: "",
  attachmentName: "",
  attachmentUrl: "",
  attachmentSize: 0,
  visible: true,
};

export default function JournalEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    journalsApi
      .get(id)
      .then((d) =>
        setForm({
          title1: d.title1,
          title2: d.title2 ?? "",
          publishedDate: d.publishedDate,
          authors: d.authors,
          journalName: d.journalName ?? "",
          volume: d.volume ?? "",
          issue: d.issue ?? "",
          pages: d.pages ?? "",
          doi: d.doi ?? "",
          metaLinesText: (d.metaLines ?? []).join("\n"),
          highlightsText: (d.highlights ?? []).join("\n"),
          abstractText: d.abstractText ?? "",
          attachmentName: d.attachmentName ?? "",
          attachmentUrl: d.attachmentUrl ?? "",
          attachmentSize: d.attachmentSize ?? 0,
          visible: d.visible ?? true,
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
      title1: form.title1,
      title2: form.title2 || null,
      publishedDate: form.publishedDate,
      authors: form.authors,
      journalName: form.journalName || null,
      volume: form.volume || null,
      issue: form.issue || null,
      pages: form.pages || null,
      doi: form.doi || null,
      metaLines: form.metaLinesText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      highlights: form.highlightsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      abstractText: form.abstractText || null,
      attachmentName: form.attachmentName || null,
      attachmentUrl: form.attachmentUrl || null,
      attachmentSize: form.attachmentSize || null,
      visible: form.visible,
    };
    try {
      if (isNew) await journalsApi.create(payload);
      else await journalsApi.update(id, payload);
      navigate("/admin/journals");
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
        title={isNew ? "새 Journal" : "Journal 수정"}
        description="저널 논문 상세 정보를 입력합니다."
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate("/admin/journals")}
              className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5"
            >
              취소
            </button>
            <button
              type="submit"
              form="journal-form"
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
          <LoadingState />
        ) : (
          <form
            id="journal-form"
            onSubmit={handleSubmit}
            className="max-w-[860px] space-y-5"
          >
            <FormField label="제목 (1행)" required error={fieldErrors.title1}>
              <input
                type="text"
                value={form.title1}
                onChange={(e) => update({ title1: e.target.value })}
                className={inputClass}
                maxLength={300}
                required
              />
            </FormField>

            <FormField label="제목 (2행)" hint="선택" error={fieldErrors.title2}>
              <input
                type="text"
                value={form.title2}
                onChange={(e) => update({ title2: e.target.value })}
                className={inputClass}
                maxLength={300}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label="게재일"
                required
                error={fieldErrors.publishedDate}
              >
                <input
                  type="date"
                  value={form.publishedDate}
                  onChange={(e) => update({ publishedDate: e.target.value })}
                  className={inputClass}
                  required
                />
              </FormField>

              <FormField
                label="저자"
                required
                hint="콤마(,)로 구분"
                error={fieldErrors.authors}
              >
                <input
                  type="text"
                  value={form.authors}
                  onChange={(e) => update({ authors: e.target.value })}
                  className={inputClass}
                  required
                />
              </FormField>
            </div>

            <FormField label="저널명">
              <input
                type="text"
                value={form.journalName}
                onChange={(e) => update({ journalName: e.target.value })}
                className={inputClass}
                maxLength={300}
                placeholder="예: IEEE Access"
              />
            </FormField>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
              <FormField label="Volume">
                <input
                  type="text"
                  value={form.volume}
                  onChange={(e) => update({ volume: e.target.value })}
                  className={inputClass}
                  maxLength={50}
                />
              </FormField>
              <FormField label="Issue">
                <input
                  type="text"
                  value={form.issue}
                  onChange={(e) => update({ issue: e.target.value })}
                  className={inputClass}
                  maxLength={50}
                />
              </FormField>
              <FormField label="Pages">
                <input
                  type="text"
                  value={form.pages}
                  onChange={(e) => update({ pages: e.target.value })}
                  className={inputClass}
                  maxLength={50}
                  placeholder="123-145"
                />
              </FormField>
              <FormField label="DOI">
                <input
                  type="text"
                  value={form.doi}
                  onChange={(e) => update({ doi: e.target.value })}
                  className={inputClass}
                  maxLength={200}
                  placeholder="10.1109/ACCESS..."
                />
              </FormField>
            </div>

            <FormField
              label="Meta (한 줄에 한 항목)"
              hint="레거시: ISSN/추가 메타. 신규 항목은 위 정형 필드 사용 권장"
            >
              <textarea
                value={form.metaLinesText}
                onChange={(e) => update({ metaLinesText: e.target.value })}
                className={textareaClass}
                rows={3}
              />
            </FormField>

            <FormField label="Highlights (한 줄에 한 항목)">
              <textarea
                value={form.highlightsText}
                onChange={(e) => update({ highlightsText: e.target.value })}
                className={`${textareaClass} min-h-[160px]`}
              />
            </FormField>

            <FormField label="Abstract">
              <textarea
                value={form.abstractText}
                onChange={(e) => update({ abstractText: e.target.value })}
                className={`${textareaClass} min-h-[180px]`}
              />
            </FormField>

            <FormField label="첨부 PDF" hint="선택 (30MB 이하)">
              <FileUploadField
                kind="pdf"
                accept="application/pdf"
                value={form.attachmentUrl}
                onChange={(r) =>
                  update({
                    attachmentUrl: r.url,
                    attachmentName: r.originalName,
                    attachmentSize: r.size,
                  })
                }
                meta={form.attachmentName || "첨부 없음"}
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
          </form>
        )}
      </div>
    </div>
  );
}
