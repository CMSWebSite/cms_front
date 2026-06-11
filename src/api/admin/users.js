import { apiRequest } from "../client";

export const usersApi = {
  list: () => apiRequest("/api/admin/users"),
  changeRole: (id, role) =>
    apiRequest(`/api/admin/users/${id}/role`, {
      method: "PATCH",
      body: { role },
    }),
};
