import { apiRequest } from "../client";

export const visionMissionApi = {
  list: () => apiRequest("/api/admin/vision-mission"),
  get: (id) => apiRequest(`/api/admin/vision-mission/${id}`),
  create: (body) => apiRequest("/api/admin/vision-mission", { method: "POST", body }),
  update: (id, body) =>
    apiRequest(`/api/admin/vision-mission/${id}`, { method: "PUT", body }),
  remove: (id) =>
    apiRequest(`/api/admin/vision-mission/${id}`, { method: "DELETE" }),
};
