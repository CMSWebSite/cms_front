import { useEffect, useState } from "react";
import PageHeader from "../../../components/admin/PageHeader";
import FormField, { inputClass, textareaClass } from "../../../components/admin/FormField";
import LoadingState from "../../../components/common/LoadingState";
import { siteSettingsApi } from "../../../api/admin/siteSettings";
import { ApiError } from "../../../api/client";

/**
 * SiteSetting 키들을 그룹별로 정리한 폼.
 * 백엔드 SiteSettingSeedRunner와 키 목록을 일치시킨다.
 */
const GROUPS = [
  {
    title: "Contact Us",
    fields: [
      { key: "contact.email", label: "이메일", type: "text" },
      { key: "contact.phone", label: "전화번호", type: "text" },
      { key: "contact.address", label: "주소", type: "textarea" },
      { key: "contact.mapUrl", label: "지도 URL", type: "text", hint: "Google Maps embed URL" },
    ],
  },
  {
    title: "Homepage — Hero",
    fields: [
      { key: "homepage.hero.image", label: "Hero 이미지/GIF URL", type: "text" },
      { key: "homepage.hero.subtitle", label: "Hero 캡션", type: "textarea", hint: "줄바꿈으로 두 줄 분리" },
    ],
  },
  {
    title: "Homepage — Research Cards",
    fields: [
      { key: "homepage.research.card1.title", label: "카드 1 제목", type: "textarea", rows: 2 },
      { key: "homepage.research.card1.image", label: "카드 1 이미지 URL", type: "text" },
      { key: "homepage.research.card2.title", label: "카드 2 제목", type: "textarea", rows: 2 },
      { key: "homepage.research.card2.image", label: "카드 2 이미지 URL", type: "text" },
      { key: "homepage.research.card3.title", label: "카드 3 제목", type: "textarea", rows: 2 },
      { key: "homepage.research.card3.image", label: "카드 3 이미지 URL", type: "text" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { key: "footer.phone", label: "전화번호", type: "text" },
      { key: "footer.fax", label: "FAX", type: "text" },
      { key: "footer.address", label: "주소", type: "textarea" },
      { key: "footer.copyright", label: "Copyright", type: "text" },
    ],
  },
  {
    title: "Site / SEO",
    fields: [
      { key: "site.logoUrl", label: "사이트 로고 URL", type: "text" },
      { key: "site.title", label: "사이트 제목", type: "text" },
      { key: "seo.description", label: "SEO 설명", type: "textarea" },
      { key: "seo.ogImage", label: "OG 공유 이미지 URL", type: "text" },
    ],
  },
];

const ALL_KEYS = GROUPS.flatMap((g) => g.fields.map((f) => f.key));

export default function SiteSettingsPage() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedMessage, setSavedMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    siteSettingsApi.list()
      .then((items) => {
        const map = {};
        for (const it of items) map[it.key] = it.value ?? "";
        setValues(map);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  const setValue = (key, v) => setValues((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(null); setSavedMessage(null);
    try {
      const settings = ALL_KEYS.map((key) => ({
        key,
        value: values[key] ?? "",
        type: null,
        description: null,
      }));
      await siteSettingsApi.bulkUpsert(settings);
      setSavedMessage("저장되었습니다.");
      setTimeout(() => setSavedMessage(null), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "저장 실패");
    } finally { setSaving(false); }
  };

  return (
    <div>
      <PageHeader
        title="Site Settings"
        description="ContactUs / Homepage / Footer / SEO 등 사이트 전역 설정."
        actions={
          <button type="submit" form="settings-form" disabled={saving || loading} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85 disabled:opacity-60">
            {saving ? "저장 중…" : "저장"}
          </button>
        }
      />
      <div className="px-8 py-6">
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</div>}
        {savedMessage && <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-700">{savedMessage}</div>}

        {loading ? <LoadingState /> : (
          <form id="settings-form" onSubmit={handleSubmit} className="max-w-[860px] space-y-10">
            {GROUPS.map((group) => (
              <section key={group.title}>
                <div className="mb-4 border-b border-black/10 pb-2 text-[15px] font-bold text-black/85">
                  {group.title}
                </div>
                <div className="space-y-5">
                  {group.fields.map((f) => (
                    <FormField key={f.key} label={f.label} hint={f.hint ?? f.key}>
                      {f.type === "textarea" ? (
                        <textarea
                          value={values[f.key] ?? ""}
                          onChange={(e) => setValue(f.key, e.target.value)}
                          className={textareaClass}
                          rows={f.rows ?? 3}
                        />
                      ) : (
                        <input
                          type="text"
                          value={values[f.key] ?? ""}
                          onChange={(e) => setValue(f.key, e.target.value)}
                          className={inputClass}
                        />
                      )}
                    </FormField>
                  ))}
                </div>
              </section>
            ))}
          </form>
        )}
      </div>
    </div>
  );
}
