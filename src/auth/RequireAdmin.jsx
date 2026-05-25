import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

/**
 * 관리자 페이지(/admin/*) 진입 가드.
 * - 비로그인: /login 으로 리다이렉트 (원위치 from 저장)
 * - 로그인했지만 ADMIN 아님: 홈으로 리다이렉트
 */
export default function RequireAdmin({ children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
