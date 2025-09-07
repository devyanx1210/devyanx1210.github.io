// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/devyanx1210.github.io/",
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
