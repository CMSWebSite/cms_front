export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#060b10",
        "bg-2": "#07131a",
        border: "rgba(255,255,255,0.12)",
        accent: "#d7bf73",
        "text-dim": "rgba(255,255,255,0.68)",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Noto Sans KR",
          "Arial",
          "sans-serif",
        ],
        serif: ["ui-serif", "Georgia", "Times New Roman", "serif"],
      },
      maxWidth: {
        container: "1120px",
      },
      borderRadius: {
        xl2: "16px",
      },
    },
  },
  plugins: [],
};
