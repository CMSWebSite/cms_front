import { createContext, useContext } from "react";

/**
 * 전역 인증 컨텍스트.
 * value 형태: { user, isAuthenticated, login(auth, remember), logout() }
 * - user: 로그인한 사용자 정보 객체 또는 null
 */
export const AuthContext = createContext(null);

/** 인증 컨텍스트 접근 hook. AuthProvider 내부에서만 사용 가능. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}
