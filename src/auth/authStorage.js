// 로그인 인증 정보(JWT 토큰 + 사용자 정보)의 영속 저장 helper.
// - "Remember me" 체크 시 localStorage (브라우저 재시작 후에도 유지)
// - 미체크 시 sessionStorage (탭/창 종료 시 소멸)

const STORAGE_KEY = "cms_auth";

/**
 * 인증 정보를 저장한다.
 * @param {object} auth - signin API 응답 (accessToken, tokenType, expiresAt, userId, name, email, role)
 * @param {boolean} remember - true면 localStorage, false면 sessionStorage
 */
export function saveAuth(auth, remember) {
  const target = remember ? window.localStorage : window.sessionStorage;
  const other = remember ? window.sessionStorage : window.localStorage;
  target.setItem(STORAGE_KEY, JSON.stringify(auth));
  other.removeItem(STORAGE_KEY); // 다른 저장소에 남은 이전 값 제거
}

/**
 * 저장된 인증 정보를 읽는다. 없거나 토큰이 만료되었으면 null.
 * @returns {object | null}
 */
export function loadAuth() {
  const raw =
    window.localStorage.getItem(STORAGE_KEY) ??
    window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  let auth;
  try {
    auth = JSON.parse(raw);
  } catch {
    clearAuth();
    return null;
  }

  // 토큰 만료 검사 (expiresAt 파싱 실패 시에는 만료로 단정하지 않음)
  if (auth?.expiresAt) {
    const expMs = Date.parse(auth.expiresAt);
    if (!Number.isNaN(expMs) && expMs <= Date.now()) {
      clearAuth();
      return null;
    }
  }

  return auth;
}

/** 모든 저장소에서 인증 정보를 제거한다. */
export function clearAuth() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

/** 현재 액세스 토큰을 반환한다. 없으면 null. */
export function getToken() {
  return loadAuth()?.accessToken ?? null;
}
