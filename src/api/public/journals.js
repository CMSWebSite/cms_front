import { apiRequest } from "../client";

/**
 * 공개(비인증) Journal API.
 * - list(): isVisible=true 데이터만, PageResponse 형식.
 */
export const publicJournalsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/public/journals${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/public/journals/${id}`),
};
