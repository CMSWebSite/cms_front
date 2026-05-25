import { apiRequest } from "../client";

export const siteSettingsApi = {
  list: () => apiRequest("/api/admin/site-settings"),
  upsert: (body) =>
    apiRequest("/api/admin/site-settings", { method: "PUT", body }),
  bulkUpsert: (settings) =>
    apiRequest("/api/admin/site-settings/bulk", {
      method: "PUT",
      body: { settings },
    }),
};
