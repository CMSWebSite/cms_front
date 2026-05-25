import { apiRequest } from "../client";

/**
 * 파일을 백엔드로 업로드한다.
 * @param {File} file
 * @returns {Promise<{ url, originalName, size, mimeType }>}
 */
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return apiRequest("/api/admin/uploads", {
    method: "POST",
    body: formData,
  });
}
