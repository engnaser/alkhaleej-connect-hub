import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { tanstackStartNetlify } from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  vite: {
    plugins: [tanstackStartNetlify()],
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
