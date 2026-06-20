import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  base: '/alkhaleej-connect-hub/', // 👈 1. أضف هذا السطر ليعرف جيت هوب مسار رابط الموقع
  vite: {
    plugins: [netlify()], 
  },
  tanstackStart: {
    server: { 
      entry: "server",
      preset: "github-pages" // 👈 2. أضف هذا السطر إذا كان مدعوماً في حزمتك لتوليد صفحات ثابتة
    },
  },
});
