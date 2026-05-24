import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { signin } from "../../api/auth";
import { ApiError } from "../../api/client";
import { useAuth } from "../../auth/authContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 로그인 폼 단일 필드 검증. 정상이면 빈 문자열. */
function validateField(name, value) {
  switch (name) {
    case "email":
      if (!value.trim()) return "이메일을 입력해주세요.";
      if (!EMAIL_RE.test(value.trim())) return "올바른 이메일 형식이 아닙니다.";
      return "";
    case "password":
      if (!value) return "비밀번호를 입력해주세요.";
      return "";
    default:
      return "";
  }
}

const labelStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "1.4",
};

const inputStyle = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "1.5",
  borderBottomWidth: "3px",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // 로그인 성공 후 돌아갈 경로 (직전 페이지). 없거나 인증 페이지면 홈으로.
  const redirectTo = useMemo(() => {
    const from = location.state?.from;
    if (typeof from === "string" && from && from !== "/login" && from !== "/signup") {
      return from;
    }
    return "/";
  }, [location.state]);

  const fieldErrors = useMemo(
    () => ({
      email: validateField("email", form.email),
      password: validateField("password", form.password),
    }),
    [form]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setApiError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const showError = (name) => (touched[name] ? fieldErrors[name] : "");

  /** API 오류를 사용자 메시지로 변환한다. */
  const handleApiError = (err) => {
    if (err instanceof ApiError) {
      switch (err.code) {
        case "NETWORK_ERROR":
          setApiError("네트워크 연결을 확인한 후 다시 시도해주세요.");
          return;
        case "INVALID_CREDENTIALS":
          setApiError("이메일 또는 비밀번호가 올바르지 않습니다.");
          return;
        case "VALIDATION_ERROR": {
          const firstFieldMsg = err.fields ? Object.values(err.fields)[0] : null;
          setApiError(firstFieldMsg ?? "입력값을 다시 확인해주세요.");
          return;
        }
        default:
          setApiError("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
          return;
      }
    }
    setApiError("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    // 클라이언트 검증 — 오류가 있으면 중단
    if (fieldErrors.email || fieldErrors.password) return;

    setApiError("");
    setSubmitting(true);
    try {
      const auth = await signin({
        email: form.email.trim(),
        password: form.password,
      });
      login(auth, rememberMe); // 토큰/사용자 정보 저장 + 전역 상태 갱신
      navigate(redirectTo, { replace: true });
    } catch (err) {
      handleApiError(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-[140px] pb-24 px-6">
        <div className="mx-auto w-full max-w-[604px]">
          <h1
            className="text-center mb-20"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "64px",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
            }}
          >
            Sign up / Login
          </h1>

          <form onSubmit={handleSubmit} className="w-full" noValidate>
            {/* Email */}
            <div className="mb-8">
              <label htmlFor="email" className="flex items-center gap-3 mb-3 text-white" style={labelStyle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17V7C3 6.44772 3.44772 6 4 6Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M4 8L12 13L20 8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Email</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-0 border-b outline-none text-white placeholder-white/40 px-0 pb-3 ${
                  showError("email") ? "border-red-400" : "border-white"
                }`}
                style={inputStyle}
                autoComplete="email"
              />
              {showError("email") && (
                <p className="mt-2 text-sm text-red-400">{showError("email")}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <label htmlFor="password" className="flex items-center justify-between mb-3 text-white">
                <span className="flex items-center gap-3" style={labelStyle}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path
                      d="M8 10V7.5C8 5.567 9.567 4 11.5 4H12.5C14.433 4 16 5.567 16 7.5V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Password</span>
                </span>

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 bottom-[14px] text-white/90 hover:text-white transition"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path
                        d="M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.88 5.09C10.56 4.86 11.27 4.75 12 4.75C16.5 4.75 20.11 8.78 21 12C20.67 13.19 20.01 14.48 19.05 15.58"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6.51 6.52C4.54 7.87 3.32 9.94 3 12C3.89 15.22 7.5 19.25 12 19.25C13.73 19.25 15.31 18.66 16.66 17.68"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2 12C3.2 8.5 7 5 12 5C17 5 20.8 8.5 22 12C20.8 15.5 17 19 12 19C7 19 3.2 15.5 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                </button>
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-0 border-b outline-none text-white placeholder-white/40 pl-0 pr-10 pb-3 ${
                  showError("password") ? "border-red-400" : "border-white"
                }`}
                style={inputStyle}
                autoComplete="current-password"
              />
              {showError("password") && (
                <p className="mt-2 text-sm text-red-400">{showError("password")}</p>
              )}
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between mb-10 mt-6">
              <label
                className="flex items-center gap-3 cursor-pointer select-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "1.4",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                  className="sr-only"
                />

                <span
                  className={`flex h-[20px] w-[20px] items-center justify-center rounded-[2px] border transition ${
                    rememberMe ? "border-white bg-white" : "border-white/60 bg-transparent"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12.5L10 17L19 6.5"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                <span>Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-white hover:text-white/80 transition"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "1.4",
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* API 오류 메시지 */}
            {apiError && (
              <p className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
                {apiError}
              </p>
            )}

            {/* Login button */}
            <div className="flex justify-center mb-10">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full max-w-[224px] h-[58px] rounded-full bg-[#E9E9E9] text-black transition ${
                  submitting ? "cursor-not-allowed opacity-50" : "hover:opacity-90"
                }`}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  lineHeight: "1",
                }}
              >
                {submitting ? "로그인 중..." : "LOGIN"}
              </button>
            </div>

            {/* Signup link */}
            <div
              className="text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "1.5",
              }}
            >
              <span className="text-white">Don't have an account ? </span>
              <Link to="/signup" className="text-[#8EA2FF] underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
