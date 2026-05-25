import { apiRequest } from "../client";

export const dashboardApi = {
  summary: () => apiRequest("/api/admin/dashboard"),
};
