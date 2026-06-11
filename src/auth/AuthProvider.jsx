import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { clearAuth, loadAuth, saveAuth } from "./authStorage";

/**
 * 앱 전역 인증 상태 제공자.
 * 마운트 시 저장소(localStorage/sessionStorage)에서 기존 로그인 상태를 복원한다.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadAuth());

  // 로그인: signin 응답을 저장하고 상태를 갱신한다.
  const login = useCallback((auth, remember) => {
    saveAuth(auth, remember);
    setUser(auth);
  }, []);

  // 로그아웃: 저장소를 비우고 상태를 초기화한다.
  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
