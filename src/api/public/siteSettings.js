import { apiRequest } from "../client";

export const publicSiteSettingsApi = {
  all: () => apiRequest("/api/public/site-settings"),
};
