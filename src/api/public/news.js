import { apiRequest } from "../client";

/**
 * 공개(비인증) News API. 백엔드 /api/public/news 에 매핑된다.
 * 토큰이 있어도 무관 — permitAll 라우트.
 */
export const publicNewsApi = {
  list: () => apiRequest("/api/public/news"),
  get: (id) => apiRequest(`/api/public/news/${id}`),
};
