import { apiRequest } from "../client";

export const facilitiesApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.category) q.set("category", params.category);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/facilities${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/facilities/${id}`),
  create: (body) => apiRequest("/api/admin/facilities", { method: "POST", body }),
  update: (id, body) => apiRequest(`/api/admin/facilities/${id}`, { method: "PUT", body }),
  remove: (id) => apiRequest(`/api/admin/facilities/${id}`, { method: "DELETE" }),
};
