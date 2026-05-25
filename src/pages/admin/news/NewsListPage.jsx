import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/admin/PageHeader";
import { newsApi } from "../../../api/admin/news";
import { ApiError } from "../../../api/client";

export default function NewsListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = () => {
    setLoading(true);
    newsApi
      .list()
      .then(setItems)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "불러오지 못했습니다."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`"${title}" 게시글을 삭제하시겠습니까?`)) return;
    try {
      await newsApi.remove(id);
      reload();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      <PageHeader
        title="News"
        description="공지·소식 게시글을 관리합니다."
        actions={
          <button
            type="button"
            onClick={() => navigate("/admin/news/new")}
            className="inline-flex h-9 items-center rounded-md bg-black px-4 text-[13px] font-semibold text-white hover:bg-black/85"
          >
            + 새 글
          </button>
        }
      />

      <div className="px-8 py-6">
        {loading && <div className="text-[14px] text-black/55">불러오는 중…</div>}
        {error && <div className="text-[14px] text-red-600">{error}</div>}

        {!loading && !error && (
          <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
            <table className="w-full text-[13px]">
              <thead className="bg-black/[0.04] text-left text-[12px] font-semibold uppercase tracking-wide text-black/65">
                <tr>
                  <th className="px-4 py-3">제목</th>
                  <th className="w-[160px] px-4 py-3">게시일</th>
                  <th className="w-[80px] px-4 py-3">노출</th>
                  <th className="w-[160px] px-4 py-3">수정일</th>
                  <th className="w-[120px] px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-black/45"
                    >
                      아직 등록된 게시글이 없습니다.
                    </td>
                  </tr>
                ) : (
                  items.map((it) => (
                    <tr key={it.id} className="hover:bg-black/[0.02]">
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/news/${it.id}`}
                          className="font-medium hover:underline"
                        >
                          {it.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-black/65">
                        {new Date(it.publishedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {it.visible ? (
                          <span className="inline-flex h-5 items-center rounded-full bg-emerald-100 px-2 text-[11px] font-semibold text-emerald-700">
                            노출
                          </span>
                        ) : (
                          <span className="inline-flex h-5 items-center rounded-full bg-black/10 px-2 text-[11px] font-semibold text-black/55">
                            숨김
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-black/55">
                        {new Date(it.updatedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(it.id, it.title)}
                          className="text-[12px] text-red-600 hover:underline"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
