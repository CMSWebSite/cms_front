import { useEffect, useState } from "react";
import PageHeader from "../../../components/admin/PageHeader";
import { usersApi } from "../../../api/admin/users";
import { useAuth } from "../../../auth/authContext";
import { ApiError } from "../../../api/client";

const ROLE_OPTIONS = ["NORMAL", "ADMIN"];

export default function UsersListPage() {
  const { user: me } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = () => {
    setLoading(true);
    usersApi
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

  const handleChange = async (id, nextRole, label) => {
    if (!confirm(`"${label}" 사용자의 권한을 ${nextRole}로 변경하시겠습니까?`)) {
      return;
    }
    try {
      await usersApi.changeRole(id, nextRole);
      reload();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "권한 변경에 실패했습니다.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Users"
        description="가입한 사용자 계정과 권한을 관리합니다."
      />

      <div className="px-8 py-6">
        {loading && <div className="text-[14px] text-black/55">불러오는 중…</div>}
        {error && <div className="text-[14px] text-red-600">{error}</div>}

        {!loading && !error && (
          <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
            <table className="w-full text-[13px]">
              <thead className="bg-black/[0.04] text-left text-[12px] font-semibold uppercase tracking-wide text-black/65">
                <tr>
                  <th className="px-4 py-3">이름 · 이메일</th>
                  <th className="w-[160px] px-4 py-3">가입일</th>
                  <th className="w-[160px] px-4 py-3">권한</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-12 text-center text-black/45"
                    >
                      등록된 사용자가 없습니다.
                    </td>
                  </tr>
                ) : (
                  items.map((u) => {
                    const isSelf = u.email?.toLowerCase() === me?.email?.toLowerCase();
                    return (
                      <tr key={u.id} className="hover:bg-black/[0.02]">
                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {u.name}
                            {isSelf && (
                              <span className="ml-2 inline-flex h-4 items-center rounded-full bg-black/10 px-1.5 text-[10px] font-semibold text-black/55">
                                나
                              </span>
                            )}
                          </div>
                          <div className="text-[12px] text-black/55">
                            {u.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-black/65">
                          {new Date(u.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={u.role}
                            onChange={(e) =>
                              handleChange(u.id, e.target.value, u.email)
                            }
                            disabled={isSelf && u.role === "ADMIN"}
                            className="block w-[140px] rounded-md border border-black/15 bg-white px-2 py-1 text-[13px] disabled:cursor-not-allowed disabled:opacity-60"
                            title={
                              isSelf && u.role === "ADMIN"
                                ? "본인 ADMIN 권한은 해제할 수 없습니다."
                                : undefined
                            }
                          >
                            {ROLE_OPTIONS.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
