import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  base: mode == "development" ? "" : "./",
  plugins: [react({ jsxImportSource: "@emotion/react" }), tsconfigPaths()],
}));
