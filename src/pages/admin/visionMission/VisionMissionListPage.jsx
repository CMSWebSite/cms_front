import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import LoadingState from "../../../components/common/LoadingState";
import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/common/ErrorState";
import { visionMissionApi } from "../../../api/admin/visionMission";
import { ApiError } from "../../../api/client";

export default function VisionMissionListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true); setError(null);
    visionMissionApi.list()
      .then(setItems)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const handleDelete = async (id, title) => {
    if (!confirm(`"${title || "(제목 없음)"}" 섹션을 삭제하시겠습니까?`)) return;
    try { await visionMissionApi.remove(id); reload(); }
    catch (err) { alert(err instanceof ApiError ? err.message : "삭제 실패"); }
  };

  return (
    <div>
      <PageHeader
        title="Vision & Mission"
        description="비전·미션 페이지의 각 섹션을 관리합니다. sortOrder로 노출 순서를 조절하세요."
        actions={
          <button type="button" onClick={() => navigate("/admin/vision-mission/new")} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85">
            + 새 섹션
          </button>
        }
      />
      <div className="px-8 py-6">
        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && (
          <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
            <table className="w-full text-[13px]">
              <thead className="bg-black/[0.04] text-left text-[12px] font-semibold uppercase tracking-wide text-black/65">
                <tr>
                  <th className="w-[80px] px-4 py-3">순서</th>
                  <th className="w-[140px] px-4 py-3">키</th>
                  <th className="px-4 py-3">제목</th>
                  <th className="w-[70px] px-4 py-3">노출</th>
                  <th className="w-[70px] px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {items.length === 0 ? (
                  <tr><td colSpan={5}><EmptyState title="아직 등록된 섹션이 없습니다." description="intro / area1 / area2 / area3 / closing 등 키로 섹션을 만들어 보세요." /></td></tr>
                ) : items.map((it) => (
                  <tr key={it.id} className="hover:bg-black/[0.02]">
                    <td className="px-4 py-3 text-black/65">{it.sortOrder}</td>
                    <td className="px-4 py-3 text-black/70 font-mono text-[11px]">{it.sectionKey}</td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/vision-mission/${it.id}`} className="font-medium hover:underline">{it.title || "(제목 없음)"}</Link>
                      {it.subtitle && <div className="text-[12px] text-black/55">{it.subtitle}</div>}
                    </td>
                    <td className="px-4 py-3">
                      {it.visible
                        ? <span className="inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">노출</span>
                        : <span className="inline-flex h-5 items-center rounded-full bg-black/10 px-2 text-[11px] font-semibold text-black/55">숨김</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" onClick={() => handleDelete(it.id, it.title)} className="text-[12px] text-red-600 hover:underline">삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
