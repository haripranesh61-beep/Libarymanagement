import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === "true" ? "/LibraryManagement/" : "/",
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js"
  }
});
