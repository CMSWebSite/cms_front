import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import FileUploadField from "../../../components/admin/FileUploadField";
import LoadingState from "../../../components/common/LoadingState";
import { galleryApi } from "../../../api/admin/gallery";
import { uploadFile } from "../../../api/admin/uploads";
import { ApiError } from "../../../api/client";

const todayIso = () => new Date().toISOString().slice(0, 10);

const EMPTY = {
  title: "", description: "", thumbnailImage: "",
  eventDate: todayIso(), visible: true,
  images: [], // [{ imageUrl, caption }]
};

export default function GalleryEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    galleryApi.get(id)
      .then((d) => setForm({
        title: d.title, description: d.description ?? "",
        thumbnailImage: d.thumbnailImage ?? "",
        eventDate: d.eventDate ?? todayIso(),
        visible: d.visible ?? true,
        images: (d.images ?? []).map((img) => ({ imageUrl: img.imageUrl, caption: img.caption ?? "" })),
      }))
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));
  const updateImage = (idx, patch) =>
    setForm((f) => ({ ...f, images: f.images.map((img, i) => i === idx ? { ...img, ...patch } : img) }));
  const removeImage = (idx) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  const moveImage = (idx, dir) =>
    setForm((f) => {
      const next = [...f.images];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return f;
      [next[idx], next[j]] = [next[j], next[idx]];
      return { ...f, images: next };
    });

  // 다중 이미지 한번에 업로드
  const handleBulkUpload = async (e) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;
    setUploadingImages(true);
    try {
      const uploads = [];
      for (const file of files) {
        const r = await uploadFile(file);
        uploads.push({ imageUrl: r.url, caption: "" });
      }
      setForm((f) => ({ ...f, images: [...f.images, ...uploads] }));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "이미지 업로드 실패");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null); setFieldErrors({});
    const payload = {
      title: form.title, description: form.description || null,
      thumbnailImage: form.thumbnailImage || null,
      eventDate: form.eventDate, visible: form.visible,
      images: form.images.map((img) => ({
        imageUrl: img.imageUrl,
        caption: img.caption || null,
      })),
    };
    try {
      if (isNew) await galleryApi.create(payload);
      else await galleryApi.update(id, payload);
      navigate("/admin/gallery");
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
        title={isNew ? "새 Album" : "Album 수정"}
        description="갤러리 앨범과 포함 이미지를 함께 관리합니다."
        actions={
          <>
            <button type="button" onClick={() => navigate("/admin/gallery")} className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-4 text-[13px] font-medium hover:bg-black/5">취소</button>
            <button type="submit" form="album-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">{saving ? "저장 중…" : "저장"}</button>
          </>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {loading ? <LoadingState /> : (
          <form id="album-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-5">
            <FormField label="앨범 제목" required error={fieldErrors.title}>
              <input type="text" value={form.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} maxLength={300} required />
            </FormField>
            <FormField label="설명">
              <textarea value={form.description} onChange={(e) => update({ description: e.target.value })} className={textareaClass} rows={3} />
            </FormField>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField label="이벤트일" required error={fieldErrors.eventDate}>
                <input type="date" value={form.eventDate} onChange={(e) => update({ eventDate: e.target.value })} className={inputClass} required />
              </FormField>
              <FormField label="노출 여부">
                <label className="inline-flex items-center gap-2 text-[14px] pt-2">
                  <input type="checkbox" checked={form.visible} onChange={(e) => update({ visible: e.target.checked })} className="h-4 w-4" />
                  사이트에 노출
                </label>
              </FormField>
            </div>
            <FormField label="대표 이미지(썸네일)" hint="선택">
              <FileUploadField kind="image" accept="image/*" value={form.thumbnailImage} onChange={(r) => update({ thumbnailImage: r.url })} />
            </FormField>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-black/85">앨범 이미지 ({form.images.length})</span>
                <label className="inline-flex h-9 items-center rounded-md border border-black/20 bg-white px-3 text-[13px] font-medium cursor-pointer hover:bg-black/5">
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleBulkUpload} disabled={uploadingImages} />
                  {uploadingImages ? "업로드 중…" : "+ 이미지 여러 장 업로드"}
                </label>
              </div>

              {form.images.length === 0 ? (
                <div className="rounded-md border border-dashed border-black/15 p-8 text-center text-[12px] text-black/45">
                  아직 이미지가 없습니다.
                </div>
              ) : (
                <ul className="space-y-2">
                  {form.images.map((img, idx) => (
                    <li key={idx} className="flex items-center gap-3 rounded-md border border-black/10 bg-white p-3">
                      <img src={img.imageUrl} alt="" className="h-16 w-16 rounded object-cover" />
                      <input type="text" value={img.caption} onChange={(e) => updateImage(idx, { caption: e.target.value })}
                        placeholder="캡션 (선택)"
                        className="h-9 flex-1 rounded-md border border-black/15 bg-white px-3 text-[13px] outline-none focus:border-black/40" />
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="rounded border border-black/15 px-2 py-1 text-[12px] disabled:opacity-30">↑</button>
                        <button type="button" onClick={() => moveImage(idx, 1)} disabled={idx === form.images.length - 1} className="rounded border border-black/15 px-2 py-1 text-[12px] disabled:opacity-30">↓</button>
                        <button type="button" onClick={() => removeImage(idx)} className="rounded border border-red-200 bg-red-50 px-2 py-1 text-[12px] text-red-600">삭제</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
