export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14161A",
        paper: "#F7F8FA",
        line: "#E4E7EC",
        fresh: "#0F7B5C",
        freshdark: "#0B5E45"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};
