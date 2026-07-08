import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  vite: {
    plugins: [netlify(), imagetools()],
  },
});
