import { apiRequest } from "../client";

export const conferencesApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/conferences${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/conferences/${id}`),
  create: (body) => apiRequest("/api/admin/conferences", { method: "POST", body }),
  update: (id, body) => apiRequest(`/api/admin/conferences/${id}`, { method: "PUT", body }),
  remove: (id) => apiRequest(`/api/admin/conferences/${id}`, { method: "DELETE" }),
};
