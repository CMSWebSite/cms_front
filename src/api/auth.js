import { apiRequest } from "./client";

/**
 * 회원가입 API 호출.
 * @param {{
 *   name: string,
 *   email: string,
 *   password: string,
 *   passwordConfirm: string,
 *   agreeTerms: boolean,
 *   agreePrivacy: boolean,
 * }} payload
 * @returns {Promise<{id:number,name:string,email:string,role:string,createdAt:string}>}
 */
export function signup(payload) {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: payload,
  });
}

/**
 * 로그인 API 호출.
 * @param {{ email: string, password: string }} payload
 * @returns {Promise<{tokenType:string,accessToken:string,expiresAt:string,
 *                     userId:number,name:string,email:string,role:string}>}
 */
export function signin(payload) {
  return apiRequest("/api/auth/signin", {
    method: "POST",
    body: payload,
  });
}
