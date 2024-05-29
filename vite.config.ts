import MillionLint from '@million/lint';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const plugins = [react()];
plugins.unshift(MillionLint.vite())
export default defineConfig({
  build: {
    outDir: "build"
  },
  plugins: plugins
});