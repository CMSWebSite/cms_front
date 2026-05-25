import { apiRequest } from "../client";

export const galleryApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/gallery${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/gallery/${id}`),
  create: (body) => apiRequest("/api/admin/gallery", { method: "POST", body }),
  update: (id, body) => apiRequest(`/api/admin/gallery/${id}`, { method: "PUT", body }),
  remove: (id) => apiRequest(`/api/admin/gallery/${id}`, { method: "DELETE" }),
};
