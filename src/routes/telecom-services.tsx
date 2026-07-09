import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TelecomServicesSection } from "@/components/telecom-services-section";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/telecom-services")({
  head: () => ({
    meta: [
      { title: "خدمات الاتصالات — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "فعّل أو ألغِ خدمات شبكتك (عدم الإزعاج، اتصل بي، البريد الصوتي، تحويل المكالمات) بضغطة زر واحدة.",
      },
      { property: "og:title", content: "خدمات الاتصالات — الخليج تيليكوم" },
      {
        property: "og:description",
        content:
          "أكواد خدمات شبكات الاتصال جاهزة للتفعيل والإلغاء مباشرة من هاتفك.",
      },
      {
        property: "og:url",
        content: "https://alkhaleej-connect-hub.lovable.app/telecom-services",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://alkhaleej-connect-hub.lovable.app/telecom-services",
      },
    ],
  }),
  component: TelecomServicesPage,
});

function TelecomServicesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة إلى جميع الخدمات
          </Link>
        </div>
        <TelecomServicesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
