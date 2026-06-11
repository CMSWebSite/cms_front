import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import LoadingState from "../../../components/common/LoadingState";
import EmptyState from "../../../components/common/EmptyState";
import ErrorState from "../../../components/common/ErrorState";
import { partnersApi } from "../../../api/admin/partners";
import { ApiError } from "../../../api/client";

export default function PartnersListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true); setError(null);
    partnersApi.list()
      .then(setItems)
      .catch((err) => setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" 파트너를 삭제하시겠습니까?`)) return;
    try { await partnersApi.remove(id); reload(); }
    catch (err) { alert(err instanceof ApiError ? err.message : "삭제 실패"); }
  };

  return (
    <div>
      <PageHeader
        title="Partners"
        description="홈페이지 하단 Partners 섹션에 노출되는 협력 기관을 관리합니다."
        actions={
          <button type="button" onClick={() => navigate("/admin/partners/new")} className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85">
            + 새 파트너
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
                  <th className="w-[120px] px-4 py-3">로고</th>
                  <th className="px-4 py-3">이름</th>
                  <th className="px-4 py-3">웹사이트</th>
                  <th className="w-[80px] px-4 py-3">순서</th>
                  <th className="w-[70px] px-4 py-3">노출</th>
                  <th className="w-[70px] px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {items.length === 0 ? (
                  <tr><td colSpan={6}><EmptyState title="아직 등록된 파트너가 없습니다." /></td></tr>
                ) : items.map((it) => (
                  <tr key={it.id} className="hover:bg-black/[0.02]">
                    <td className="px-4 py-3">
                      {it.logoUrl ? <img src={it.logoUrl} alt={it.name} className="h-12 max-w-[100px] object-contain" /> : <div className="h-12 w-20 rounded bg-black/5" />}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/partners/${it.id}`} className="font-medium hover:underline">{it.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-black/60 text-[12px]">
                      {it.websiteUrl ? <a href={it.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline truncate inline-block max-w-[300px]">{it.websiteUrl}</a> : "—"}
                    </td>
                    <td className="px-4 py-3 text-black/65">{it.sortOrder}</td>
                    <td className="px-4 py-3">
                      {it.visible
                        ? <span className="inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">노출</span>
                        : <span className="inline-flex h-5 items-center rounded-full bg-black/10 px-2 text-[11px] font-semibold text-black/55">숨김</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" onClick={() => handleDelete(it.id, it.name)} className="text-[12px] text-red-600 hover:underline">삭제</button>
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
