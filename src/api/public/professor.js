import { apiRequest } from "../client";

export const publicProfessorApi = {
  get: () => apiRequest("/api/public/professor"),
};
