import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Modal from "../../components/common/Modal";
import { signup } from "../../api/auth";
import { ApiError } from "../../api/client";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "../../data/legalText";

/* ----------------------------- 아이콘 ----------------------------- */

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 19C5.8 16.6 8.3 15 12 15C15.7 15 18.2 16.6 19 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
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
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 10V7.5C8 5.567 9.567 4 11.5 4H12.5C14.433 4 16 5.567 16 7.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeOpenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12C3.2 8.5 7 5 12 5C17 5 20.8 8.5 22 12C20.8 15.5 17 19 12 19C7 19 3.2 15.5 2 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
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
  );
}

/* ----------------------------- 유효성 검사 ----------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 20;
const PASSWORD_MIN = 8;

/** 단일 필드를 검증해 오류 메시지를 반환한다. 정상이면 빈 문자열. */
function validateField(name, value, form) {
  switch (name) {
    case "username": {
      if (!value.trim()) return "이름을 입력해주세요.";
      if (value.length > NAME_MAX) return `이름은 ${NAME_MAX}자 이하여야 합니다.`;
      return "";
    }
    case "email": {
      if (!value.trim()) return "이메일을 입력해주세요.";
      if (!EMAIL_RE.test(value.trim())) return "올바른 이메일 형식이 아닙니다.";
      return "";
    }
    case "password": {
      if (!value) return "비밀번호를 입력해주세요.";
      if (value.length < PASSWORD_MIN) return `비밀번호는 ${PASSWORD_MIN}자 이상이어야 합니다.`;
      return "";
    }
    case "confirmPassword": {
      if (!value) return "비밀번호 확인을 입력해주세요.";
      if (value !== form.password) return "비밀번호가 일치하지 않습니다.";
      return "";
    }
    default:
      return "";
  }
}

/* ----------------------------- 스타일 상수 ----------------------------- */

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

/* ----------------------------- 페이지 ----------------------------- */

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agree, setAgree] = useState({ terms: false, privacy: false });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modal, setModal] = useState(null); // "terms" | "privacy" | null
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [emailServerError, setEmailServerError] = useState("");
  const [success, setSuccess] = useState(false);

  // 클라이언트 유효성 검사 결과 (매 렌더 계산)
  const fieldErrors = useMemo(
    () => ({
      username: validateField("username", form.username, form),
      email: validateField("email", form.email, form),
      password: validateField("password", form.password, form),
      confirmPassword: validateField("confirmPassword", form.confirmPassword, form),
    }),
    [form]
  );

  const allFieldsValid = Object.values(fieldErrors).every((e) => e === "");
  const canSubmit =
    allFieldsValid && agree.terms && agree.privacy && !emailServerError && !submitting;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setApiError("");
    if (name === "email") setEmailServerError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const toggleAgree = (key) => {
    setAgree((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /** API 오류를 사용자 메시지로 변환해 표시한다. */
  const handleApiError = (err) => {
    if (err instanceof ApiError) {
      switch (err.code) {
        case "NETWORK_ERROR":
          setApiError("네트워크 연결을 확인한 후 다시 시도해주세요.");
          return;
        case "EMAIL_ALREADY_EXISTS":
          setEmailServerError("이미 존재하는 이메일입니다.");
          return;
        case "PASSWORD_MISMATCH":
          setApiError("비밀번호가 일치하지 않습니다.");
          return;
        case "VALIDATION_ERROR": {
          const firstFieldMsg = err.fields ? Object.values(err.fields)[0] : null;
          setApiError(firstFieldMsg ?? "입력값을 다시 확인해주세요.");
          return;
        }
        default:
          setApiError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
          return;
      }
    }
    setApiError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 모든 필드를 touched 처리하여 누락 항목 메시지를 노출
    setTouched({ username: true, email: true, password: true, confirmPassword: true });
    if (!canSubmit) return;

    setApiError("");
    setSubmitting(true);
    try {
      await signup({
        name: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        passwordConfirm: form.confirmPassword,
        agreeTerms: agree.terms,
        agreePrivacy: agree.privacy,
      });
      setSuccess(true);
      // 완료 메시지를 잠시 보여준 뒤 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/login", { state: { signupSuccess: true } });
      }, 1600);
    } catch (err) {
      handleApiError(err);
      setSubmitting(false);
    }
  };

  // 필드에 노출할 오류 (touched 된 경우에만)
  const showError = (name) => (touched[name] ? fieldErrors[name] : "");
  const emailError = emailServerError || showError("email");

  /* --------------------------- 성공 화면 --------------------------- */
  if (success) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="flex items-center justify-center px-6 pt-[140px] pb-24">
          <div className="mx-auto w-full max-w-[604px] text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#8EA2FF]/20">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12.5L10 17L19 6.5"
                  stroke="#8EA2FF"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1
              className="mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "32px" }}
            >
              회원가입이 완료되었습니다.
            </h1>
            <p className="text-white/60" style={{ fontFamily: "Inter, sans-serif", fontSize: "18px" }}>
              잠시 후 로그인 페이지로 이동합니다.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* --------------------------- 회원가입 폼 --------------------------- */
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
            {/* Username */}
            <div className="mb-6">
              <label htmlFor="username" className="flex items-center gap-3 mb-3 text-white" style={labelStyle}>
                <UserIcon />
                <span>Username</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={NAME_MAX}
                className={`w-full bg-transparent border-0 border-b outline-none text-white placeholder-white/40 px-0 pb-3 ${
                  showError("username") ? "border-red-400" : "border-white"
                }`}
                style={inputStyle}
                autoComplete="username"
              />
              {showError("username") && (
                <p className="mt-2 text-sm text-red-400">{showError("username")}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="flex items-center gap-3 mb-3 text-white" style={labelStyle}>
                <MailIcon />
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
                  emailError ? "border-red-400" : "border-white"
                }`}
                style={inputStyle}
                autoComplete="email"
              />
              {emailError && <p className="mt-2 text-sm text-red-400">{emailError}</p>}
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <label htmlFor="password" className="flex items-center justify-between mb-3 text-white">
                <span className="flex items-center gap-3" style={labelStyle}>
                  <LockIcon />
                  <span>Password</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 bottom-[14px] text-white/90 hover:text-white transition"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
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
                autoComplete="new-password"
              />
              {showError("password") && (
                <p className="mt-2 text-sm text-red-400">{showError("password")}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative mb-6">
              <label htmlFor="confirmPassword" className="flex items-center justify-between mb-3 text-white">
                <span className="flex items-center gap-3" style={labelStyle}>
                  <LockIcon />
                  <span>Confirm password</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-0 bottom-[14px] text-white/90 hover:text-white transition"
                  aria-label={showConfirmPassword ? "비밀번호 확인 숨기기" : "비밀번호 확인 표시"}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeOpenIcon />}
                </button>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-0 border-b outline-none text-white placeholder-white/40 pl-0 pr-10 pb-3 ${
                  showError("confirmPassword") ? "border-red-400" : "border-white"
                }`}
                style={inputStyle}
                autoComplete="new-password"
              />
              {showError("confirmPassword") && (
                <p className="mt-2 text-sm text-red-400">{showError("confirmPassword")}</p>
              )}
            </div>

            {/* 약관 동의 */}
            <div className="mb-8 mt-10 space-y-4">
              <AgreementRow
                checked={agree.terms}
                onToggle={() => toggleAgree("terms")}
                label="[필수] 이용약관 동의"
                onView={() => setModal("terms")}
              />
              <AgreementRow
                checked={agree.privacy}
                onToggle={() => toggleAgree("privacy")}
                label="[필수] 개인정보 수집·이용 동의"
                onView={() => setModal("privacy")}
              />
            </div>

            {/* 약관 미동의 안내 (필수 입력값이 모두 유효할 때 노출) */}
            {allFieldsValid && !agree.terms && (
              <p className="mb-2 text-sm text-red-400">이용약관에 동의해야 회원가입이 가능합니다.</p>
            )}
            {allFieldsValid && !agree.privacy && (
              <p className="mb-2 text-sm text-red-400">
                개인정보 수집·이용에 동의해야 회원가입이 가능합니다.
              </p>
            )}

            {/* API / 서버 오류 메시지 */}
            {apiError && (
              <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
                {apiError}
              </p>
            )}

            {/* Sign up button */}
            <div className="flex justify-center mb-10 mt-8">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full max-w-[224px] h-[58px] rounded-full bg-[#E9E9E9] text-black transition ${
                  canSubmit ? "hover:opacity-90" : "cursor-not-allowed opacity-40"
                }`}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  lineHeight: "1",
                }}
              >
                {submitting ? "처리 중..." : "SIGN UP"}
              </button>
            </div>

            {/* Login link */}
            <div
              className="text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "1.5",
              }}
            >
              <span className="text-white">Already have an account? </span>
              <Link to="/login" className="text-[#8EA2FF] underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      {/* 전문보기 모달 */}
      <Modal open={modal === "terms"} title="이용약관" onClose={() => setModal(null)}>
        {TERMS_OF_SERVICE}
      </Modal>
      <Modal open={modal === "privacy"} title="개인정보 수집·이용 안내" onClose={() => setModal(null)}>
        {PRIVACY_POLICY}
      </Modal>
    </div>
  );
}

/* ----------------------------- 약관 동의 행 ----------------------------- */

function AgreementRow({ checked, onToggle, label, onView }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label
        className="flex items-center gap-3 cursor-pointer select-none"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: "17px",
          lineHeight: "1.4",
        }}
      >
        <input type="checkbox" checked={checked} onChange={onToggle} className="sr-only" />
        <span
          className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[3px] border transition ${
            checked ? "border-white bg-white" : "border-white/60 bg-transparent"
          }`}
        >
          {checked && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
        <span className="text-white">{label}</span>
      </label>

      <button
        type="button"
        onClick={onView}
        className="shrink-0 text-[#8EA2FF] underline underline-offset-4 transition hover:text-[#aab8ff]"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px" }}
      >
        전문보기
      </button>
    </div>
  );
}
