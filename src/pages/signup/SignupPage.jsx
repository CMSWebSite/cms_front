import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("signup submit:", form, { rememberMe });
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

          <form onSubmit={handleSubmit} className="w-full">
            {/* Username */}
            <div className="mb-6">
              <label
                htmlFor="username"
                className="flex items-center gap-3 mb-3 text-white"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "1.4",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                <span>Username</span>
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-white outline-none text-white placeholder-white/40 px-0 pb-3"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "1.5",
                  borderBottomWidth: "3px",
                }}
                autoComplete="username"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="flex items-center gap-3 mb-3 text-white"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "1.4",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                className="w-full bg-transparent border-0 border-b border-white outline-none text-white placeholder-white/40 px-0 pb-3"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "1.5",
                  borderBottomWidth: "3px",
                }}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="flex items-center justify-between mb-3 text-white"
              >
                <span
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "1.4",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
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
                  className="text-white/90 hover:text-white transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12C3.2 8.5 7 5 12 5C17 5 20.8 8.5 22 12C20.8 15.5 17 19 12 19C7 19 3.2 15.5 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
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
                className="w-full bg-transparent border-0 border-b border-white outline-none text-white placeholder-white/40 px-0 pb-3"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "1.5",
                  borderBottomWidth: "3px",
                }}
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="flex items-center justify-between mb-3 text-white"
              >
                <span
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "1.4",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M8 10V7.5C8 5.567 9.567 4 11.5 4H12.5C14.433 4 16 5.567 16 7.5V10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Confirm password</span>
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="text-white/90 hover:text-white transition"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12C3.2 8.5 7 5 12 5C17 5 20.8 8.5 22 12C20.8 15.5 17 19 12 19C7 19 3.2 15.5 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-white outline-none text-white placeholder-white/40 px-0 pb-3"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "18px",
                  lineHeight: "1.5",
                  borderBottomWidth: "3px",
                }}
                autoComplete="new-password"
              />
            </div>

            {/* Remember me */}
            <div className="mb-14">
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
                  className="w-[18px] h-[18px] rounded-[2px] bg-white inline-block"
                  style={{
                    boxShadow: rememberMe
                      ? "inset 0 0 0 4px black"
                      : "none",
                  }}
                />

                <span>Remember me</span>
              </label>
            </div>

            {/* Sign up button */}
            <div className="flex justify-center mb-10">
              <button
                type="submit"
                className="w-full max-w-[170px] h-[44px] rounded-full bg-[#E9E9E9] text-black hover:opacity-90 transition"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "1",
                }}
              >
                SIGN UP
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
              <Link
                to="/login"
                className="text-[#8EA2FF] underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}