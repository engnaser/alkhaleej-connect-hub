import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Bot, ExternalLink, Sparkles } from "lucide-react";

const BOT_URL = "https://respuestas-rapidas.lovable.app/";

export const Route = createFileRoute("/whatsapp-bot")({
  head: () => ({
    meta: [
      { title: "بوت الواتساب — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "بوت واتساب ذكي للرد التلقائي على الاستفسارات وتقديم ردود سريعة للعملاء.",
      },
      { property: "og:title", content: "بوت الواتساب — الخليج تيليكوم" },
      {
        property: "og:description",
        content: "بوت واتساب ذكي للرد التلقائي على الاستفسارات.",
      },,
      { property: "og:url", content: "https://alkhaleej-connect-hub.lovable.app/whatsapp-bot" },
    ],
      links: [{ rel: "canonical", href: "https://alkhaleej-connect-hub.lovable.app/whatsapp-bot" }],
  }),
  component: WhatsAppBotPage,
});

function WhatsAppBotPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            كل الخدمات
          </Link>
        }
      />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 500px at 80% -10%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
              <Bot className="h-3.5 w-3.5" />
              بوت ذكي
            </div>
            <h1 className="text-balance text-3xl font-black text-primary sm:text-5xl">
              بوت الواتساب — الردود السريعة
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              بوت متكامل للرد التلقائي على استفسارات العملاء عبر الواتساب مع
              قوالب ردود جاهزة قابلة للتخصيص.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={BOT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
              >
                <ExternalLink className="h-4 w-4" />
                فتح البوت في نافذة جديدة
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <Bot className="h-4 w-4 text-primary" />
                معاينة البوت
              </div>
              <a
                href={BOT_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                فتح مباشر
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <iframe
              src={BOT_URL}
              title="بوت الواتساب"
              className="h-[80vh] min-h-[600px] w-full bg-white"
              loading="lazy"
              referrerPolicy="no-referrer"
              allow="clipboard-write; clipboard-read"
            />
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            إذا لم تظهر المعاينة بشكل صحيح، اضغط على "فتح البوت في نافذة جديدة"
            بالأعلى.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
