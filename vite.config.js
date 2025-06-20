import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ganti dengan host Replit-mu (copas dari pesan error)
const allowedReplitHost =
  "62ca7113-b9c3-48f5-b471-4fd1ed647898-00-3nn4ixcjium7y.sisko.replit.dev";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: [allowedReplitHost],
  },
});
