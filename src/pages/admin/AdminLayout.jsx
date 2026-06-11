import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAuth } from "../../auth/authContext";

/**
 * 관리자 페이지 공통 레이아웃 — 좌측 사이드바 + 우측 콘텐츠 영역.
 * <Outlet />이 각 라우트 페이지를 렌더한다.
 */
export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#f5f6f8] text-black">
      <AdminSidebar onLogout={handleLogout} />
      <main className="min-w-0 flex-1 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
