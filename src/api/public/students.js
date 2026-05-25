import { apiRequest } from "../client";

function buildQuery(params = {}) {
  const q = new URLSearchParams();
  if (params.page) q.set("page", params.page);
  if (params.limit) q.set("limit", params.limit);
  if (params.keyword) q.set("keyword", params.keyword);
  if (params.sort) q.set("sort", params.sort);
  return q.toString();
}

export const publicStudentsApi = {
  /** 재학생 목록 (status=ACTIVE 자동 필터링). */
  list: (params = {}) => {
    const qs = buildQuery(params);
    return apiRequest(`/api/public/students${qs ? `?${qs}` : ""}`);
  },

  /** 졸업생 목록 (status=ALUMNI 자동 필터링). */
  listAlumni: (params = {}) => {
    const qs = buildQuery(params);
    return apiRequest(`/api/public/alumni${qs ? `?${qs}` : ""}`);
  },

  /** slug로 단건 조회. */
  getBySlug: (slug) => apiRequest(`/api/public/students/${slug}`),
};
