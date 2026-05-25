import { apiRequest } from "../client";

export const publicConferencesApi = {
  list: (params = {}) => {
    const q = new URLSearchParams();
    if (params.page) q.set("page", params.page);
    if (params.limit) q.set("limit", params.limit);
    if (params.keyword) q.set("keyword", params.keyword);
    if (params.sort) q.set("sort", params.sort);
    const qs = q.toString();
    return apiRequest(`/api/public/conferences${qs ? `?${qs}` : ""}`);
  },
  get: (id) => apiRequest(`/api/public/conferences/${id}`),
};
