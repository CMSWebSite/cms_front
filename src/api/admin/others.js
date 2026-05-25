import { apiRequest } from "../client";

export const othersApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.type) q.set("type", params.type);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/others${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/others/${id}`),
  create: (body) => apiRequest("/api/admin/others", { method: "POST", body }),
  update: (id, body) => apiRequest(`/api/admin/others/${id}`, { method: "PUT", body }),
  remove: (id) => apiRequest(`/api/admin/others/${id}`, { method: "DELETE" }),
};
