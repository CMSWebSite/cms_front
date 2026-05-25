import { apiRequest } from "../client";

export const partnersApi = {
  list: () => apiRequest("/api/admin/partners"),
  get: (id) => apiRequest(`/api/admin/partners/${id}`),
  create: (body) => apiRequest("/api/admin/partners", { method: "POST", body }),
  update: (id, body) =>
    apiRequest(`/api/admin/partners/${id}`, { method: "PUT", body }),
  remove: (id) =>
    apiRequest(`/api/admin/partners/${id}`, { method: "DELETE" }),
};
