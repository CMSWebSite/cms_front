import { apiRequest } from "../client";

export const patentsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.status) q.set("status", params.status);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/patents${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/patents/${id}`),
  create: (body) => apiRequest("/api/admin/patents", { method: "POST", body }),
  update: (id, body) => apiRequest(`/api/admin/patents/${id}`, { method: "PUT", body }),
  remove: (id) => apiRequest(`/api/admin/patents/${id}`, { method: "DELETE" }),
};
