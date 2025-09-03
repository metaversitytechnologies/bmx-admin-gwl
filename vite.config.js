import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { isAntPro } from "./src/store/constant";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    outDir: isAntPro ? "bmx-build" : "admin",
    sourcemap: true,
  },
});
