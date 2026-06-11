import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import LoadingState from "../../../components/common/LoadingState";
import { adminQnaApi } from "../../../api/admin/qna";
import { ApiError } from "../../../api/client";

export default function QnaEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "", answer: "", answered: false, visible: true });
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    adminQnaApi.get(id)
      .then((d) => {
        setForm({
          title: d.title, content: d.content,
          answer: d.answer ?? "", answered: d.answered, visible: d.visible,
        });
        setMeta({
          writerName: d.writerName, writerEmail: d.writerEmail,
          createdAt: d.createdAt, answeredAt: d.answeredAt, answeredBy: d.answeredBy,
        });
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      await adminQnaApi.update(id, {
        title: form.title, content: form.content,
        answer: form.answer || null, answered: form.answered, visible: form.visible,
      });
      navigate("/admin/qna");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "저장 실패");
    } finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader
        title="Q&A 답변"
        description="사용자 문의를 답변하거나 노출 여부를 조정합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/qna")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">목록</button>
            <button type="submit" form="qna-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="qna-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            {meta && (
              <div className="rounded-md border border-black/10 bg-black/[0.02] p-3 text-[12px] text-black/70 space-y-1">
                <div>작성자: <span className="font-medium">{meta.writerName}</span>{meta.writerEmail && <> · {meta.writerEmail}</>}</div>
                <div>작성일: {new Date(meta.createdAt).toLocaleString()}</div>
                {meta.answeredAt && <div>답변일: {new Date(meta.answeredAt).toLocaleString()} ({meta.answeredBy})</div>}
              </div>
            )}
            <FormField label="제목" required>
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} maxLength={300} required />
            </FormField>
            <FormField label="내용" required>
              <textarea value={form.content} onChange={(e) => update({ content: e.target.value })} className={`${textareaClass} min-h-[180px]`} required />
            </FormField>
            <FormField label="답변" hint="입력하면 자동으로 답변완료로 처리됩니다.">
              <textarea value={form.answer} onChange={(e) => update({ answer: e.target.value, answered: !!e.target.value.trim() })} className={`${textareaClass} min-h-[180px]`} />
            </FormField>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 text-[14px]">
                <input type="checkbox" checked={form.answered} onChange={(e) => update({ answered: e.target.checked })} className="h-4 w-4" />
                답변 완료로 표시
              </label>
              <label className="inline-flex items-center gap-2 text-[14px]">
                <input type="checkbox" checked={form.visible} onChange={(e) => update({ visible: e.target.checked })} className="h-4 w-4" />
                사이트에 노출
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
