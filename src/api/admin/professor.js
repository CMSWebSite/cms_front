import { apiRequest } from "../client";

/**
 * 관리자 Professor API — 단일 레코드 패턴이므로 id 없이 GET/PUT만 사용한다.
 */
export const professorApi = {
  get: () => apiRequest("/api/admin/professor"),
  update: (body) =>
    apiRequest("/api/admin/professor", { method: "PUT", body }),
};
