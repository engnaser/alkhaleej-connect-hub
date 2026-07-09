import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://alkhaleej-connect-hub.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/designs", changefreq: "weekly", priority: "0.9" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/currency-converter", changefreq: "daily", priority: "0.8" },
  { path: "/exchange-rates", changefreq: "daily", priority: "0.8" },
  { path: "/gold-prices", changefreq: "daily", priority: "0.8" },
  { path: "/dial-codes", changefreq: "monthly", priority: "0.7" },
  { path: "/yemen-mobile", changefreq: "weekly", priority: "0.8" },
  { path: "/speed-test", changefreq: "monthly", priority: "0.7" },
  { path: "/whatsapp-bot", changefreq: "monthly", priority: "0.6" },
  { path: "/ai-prompt-tools", changefreq: "monthly", priority: "0.7" },
  { path: "/whatsapp-unblock", changefreq: "monthly", priority: "0.6" },
  { path: "/adsl-inquiry", changefreq: "weekly", priority: "0.8" },
  { path: "/yemen4g-inquiry", changefreq: "weekly", priority: "0.8" },
  { path: "/bandar-aden-inquiry", changefreq: "weekly", priority: "0.7" },
  { path: "/phone-bill-inquiry", changefreq: "weekly", priority: "0.7" },
  { path: "/secondary-certificate", changefreq: "monthly", priority: "0.7" },
  { path: "/mawloud", changefreq: "monthly", priority: "0.6" },
  { path: "/my-photos", changefreq: "monthly", priority: "0.5" },
  { path: "/safety", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ENTRIES.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
