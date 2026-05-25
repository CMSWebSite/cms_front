import { apiRequest } from "../client";

export const publicPartnersApi = {
  list: () => apiRequest("/api/public/partners"),
};
