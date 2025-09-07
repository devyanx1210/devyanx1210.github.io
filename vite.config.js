// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // or "0.0.0.0" if you want access from other devices
    port: 5173, // default port
    strictPort: true, // if true, it won’t pick a random port
    open: true, // auto-open browser
    hmr: {
      protocol: "ws", // WebSocket protocol
      host: "localhost", // match your dev host
      port: 5173, // same as server.port
    },
    watch: {
      usePolling: true, // useful for WSL, Docker, or network drives
    },
  },
});
