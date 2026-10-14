import { apiRequest } from "../client";

/** 관리자 Contact us 지원 정보 조회/삭제 API. */
export const adminContactApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/contact-applications${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/contact-applications/${id}`),
  remove: (id) =>
    apiRequest(`/api/admin/contact-applications/${id}`, { method: "DELETE" }),
};
