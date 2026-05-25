import { apiRequest } from "../client";

export const publicVisionMissionApi = {
  list: () => apiRequest("/api/public/vision-mission"),
};
