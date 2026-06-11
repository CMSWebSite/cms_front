import { apiRequest } from "../client";

/**
 * 관리자 Journal API.
 * - list(): PageResponse<JournalSummary> 반환.
 *   params: { page, limit, keyword, sort } (모두 선택)
 */
export const journalsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/journals${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/journals/${id}`),
  create: (body) =>
    apiRequest("/api/admin/journals", { method: "POST", body }),
  update: (id, body) =>
    apiRequest(`/api/admin/journals/${id}`, { method: "PUT", body }),
  remove: (id) =>
    apiRequest(`/api/admin/journals/${id}`, { method: "DELETE" }),
};
