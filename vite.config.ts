import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const plugins = [react()];
export default defineConfig({
  build: {
    outDir: "build"
  },
  plugins: plugins
});