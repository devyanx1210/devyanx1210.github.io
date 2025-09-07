import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // root for user page
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
