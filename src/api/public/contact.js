import { apiRequest } from "../client";

/**
 * 공개(비인증) Contact us 지원 API.
 * 로그인 없이 apply 가 가능하다 — 백엔드 /api/public/contact-applications (permitAll).
 */
export const publicContactApi = {
  apply: (body) =>
    apiRequest("/api/public/contact-applications", { method: "POST", body }),
};
