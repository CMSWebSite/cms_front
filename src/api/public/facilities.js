import { apiRequest } from "../client";

export const publicFacilitiesApi = {
  list: () => apiRequest("/api/public/facilities"),
};
