import { apiRequest } from "../client";

export const adminQnaApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.answered !== undefined && params.answered !== "")
      q.set("answered", params.answered);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/admin/qna${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/admin/qna/${id}`),
  update: (id, body) => apiRequest(`/api/admin/qna/${id}`, { method: "PUT", body }),
  remove: (id) => apiRequest(`/api/admin/qna/${id}`, { method: "DELETE" }),
};
