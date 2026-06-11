import { apiRequest } from "../client";

export const newsApi = {
  list: () => apiRequest("/api/admin/news"),
  get: (id) => apiRequest(`/api/admin/news/${id}`),
  create: (body) => apiRequest("/api/admin/news", { method: "POST", body }),
  update: (id, body) =>
    apiRequest(`/api/admin/news/${id}`, { method: "PUT", body }),
  remove: (id) =>
    apiRequest(`/api/admin/news/${id}`, { method: "DELETE" }),
};
