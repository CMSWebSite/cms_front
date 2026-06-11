import { apiRequest } from "../client";

export const publicQnaApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/public/qna${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/public/qna/${id}`),
  create: (body) => apiRequest("/api/public/qna", { method: "POST", body }),
};
