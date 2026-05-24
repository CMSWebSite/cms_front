import { getToken } from "../auth/authStorage";

// 백엔드 API 호출용 공통 클라이언트.
// 개발 환경에서는 Vite 프록시(/api -> http://localhost:8080)를 통해 호출되며,
// 배포 환경에서는 VITE_API_BASE_URL 로 베이스 URL 을 지정할 수 있다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * API 호출 실패를 표현하는 에러.
 * - code: 백엔드 오류 코드 또는 클라이언트 측 코드("NETWORK_ERROR" 등)
 * - status: HTTP 상태 코드 (네트워크 오류 시 0)
 * - fields: 필드 단위 검증 오류 메시지 맵 (있을 경우)
 */
export class ApiError extends Error {
  constructor(code, message, status = 0, fields = null) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

/**
 * JSON 기반 API 요청을 수행한다.
 * @param {string} path - "/api/..." 형태의 경로
 * @param {{ method?: string, body?: any, headers?: object }} options
 * @returns {Promise<any>} 파싱된 응답 본문
 */
export async function apiRequest(path, { method = "GET", body, headers } = {}) {
  // 로그인 상태면 JWT 토큰을 Authorization 헤더로 첨부한다.
  const token = getToken();

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // fetch 자체가 실패 = 네트워크 연결 문제
    throw new ApiError(
      "NETWORK_ERROR",
      "네트워크 연결을 확인한 후 다시 시도해주세요.",
      0,
      null
    );
  }

  // 응답 본문 파싱 (본문이 없을 수도 있음)
  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      data?.code ?? "HTTP_ERROR",
      data?.message ?? "요청 처리 중 오류가 발생했습니다.",
      response.status,
      data?.fields ?? null
    );
  }

  return data;
}
