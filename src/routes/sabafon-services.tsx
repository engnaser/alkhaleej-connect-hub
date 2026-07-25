import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SaveAllCodesBar } from "@/components/editable-action-codes";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Sparkles,
  Package,
  Wrench,
  UserCog,
  Settings2,
  AlertTriangle,
  Clock,
  Phone,
  Settings,
  Copy,
  Check,
  Share2,
  PhoneCall,
} from "lucide-react";
import React, { useState } from "react";
import sabafonLogo from "@/assets/sabafon-logo.png.asset.json";
import { useSabafonItems, sabafonIconFor, type SabafonSection, type SabafonItem } from "@/lib/sabafonServicesStore";
import { useSabafonPackagesStore, type SabafonPackage } from "@/lib/sabafonPackagesStore";
import { supabase } from "@/integrations/supabase/client";
import { SabafonInternetCards } from "@/components/sabafon-internet-cards";
import { useIsAdmin } from "@/hooks/use-is-admin";
import {
  SabafonCallMeCard,
  SabafonCallOnMeCard,
  SabafonSalifniCard,
  SabafonBalanceTransferCard,
  SabafonBalanceInquiryCard,
  SabafonPackageBalanceInquiryCard,
  SabafonBillInquiryCard,
  SabafonForgiBalanceCard,
  SabafonKashefOffCard,
  SabafonKashefBusyCard,
  SabafonKashefNoAnswerCard,
  SabafonKashefAllCard,
  SabafonForwardOffCard,
  SabafonForwardBusyCard,
  SabafonForwardNoAnswerCard,
  SabafonForwardAllCard,
  SabafonCustomerCareCard,
  SabafonCallWaitingCard,
  SabafonKnowMyNumberCard,
  SabafonChangePinCard,
  SabafonRingtoneCard,
  SabafonMawjoodCard,
  SabafonPrivacyCard,
  SabafonForgiDetailsCard,
  SabafonNewSimNumberCard,
  SabafonVoiceMailCard,
  SabafonKashefCombinedCard,
  SabafonBlockAllIncomingCard,
  SabafonBlockAllOutgoingCard,
  SabafonBlockIntlOutgoingCard,
  SabafonBlockOutRoamingCard,
  SabafonBlockInRoamingCard,
  SabafonCancelAllBlocksCard,
  SabafonMultiPartyCard,
  SabafonSabaControlCard,
  SabafonPayBillCard,
  SabafonRadiophoneCard,
  SabafonRoamingPostpaidCard,
  SabafonSmartRoamingPostpaidCard,
  SabafonSmsRoamingPostpaidCard,
  SabafonRoamingPrepaidCard,
} from "@/components/sabafon-inquiry-cards";
import { SabafonTariffTables } from "@/components/sabafon-tariff-tables";

export const Route = createFileRoute("/sabafon-services")({
  head: () => ({
    meta: [
      { title: "خدمات شركة سبافون — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تصفّح باقات وخدمات شركة سبافون، إدارة الحساب والرصيد، وإعدادات ضبط الإنترنت في مكان واحد.",
      },
      { property: "og:title", content: "خدمات شركة سبافون — الخليج تيليكوم" },
      {
        property: "og:description",
        content:
          "كل ما تحتاجه من باقات وخدمات شركة سبافون وإعدادات الإنترنت بواجهة عربية حديثة.",
      },
    ],
  }),
  component: SabafonServicesPage,
});

function SabafonServicesPage() {
  const { isAdmin } = useIsAdmin();
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <Link
                  to="/admin/sabafon-packages"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20"
                >
                  <Package className="h-3.5 w-3.5" />
                  إدارة الباقات
                </Link>
                <Link
                  to="/admin/sabafon-services"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20"
                >
                  <Settings className="h-3.5 w-3.5" />
                  إدارة الخدمات
                </Link>
              </>
            )}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.03] sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              كل الخدمات
            </Link>
          </div>
        }
      />

      <main>
        {/* HERO — Sabafon brand identity (deep blue + light blue) */}
        <section
          className="relative overflow-hidden border-b-4"
          style={{ borderColor: "#053a75" }}
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, #053a75 0%, #0a5ba8 55%, #1478c9 100%)",
            }}
          />
          {/* signature swoosh dots pattern */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1.5px, transparent 2px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            className="absolute -top-16 -left-16 -z-10 h-56 w-56 rotate-12 rounded-[2.5rem]"
            style={{ background: "#ffffff", opacity: 0.08 }}
          />
          <div
            className="absolute -bottom-20 -right-24 -z-10 h-64 w-64 -rotate-12 rounded-[2.5rem]"
            style={{ background: "#1478c9", opacity: 0.35 }}
          />

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-center md:gap-10 md:text-right">
              {/* Logo card */}
              <div className="relative">
                <div
                  className="absolute -inset-3 -z-10 rounded-3xl"
                  style={{ background: "#ffffff", opacity: 0.15 }}
                />
                <div className="rounded-2xl bg-white p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/40">
                  <img
                    src={sabafonLogo.url}
                    alt="شعار سبافون"
                    className="h-28 w-28 rounded-xl object-contain sm:h-32 sm:w-32"
                    loading="eager"
                  />
                </div>
              </div>

              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold shadow"
                  style={{ color: "#053a75" }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  مركز سبافون الرسمي
                </div>
                <h1 className="text-balance text-3xl font-black leading-tight text-white sm:text-5xl">
                  خدمات <span style={{ color: "#a8d6f5" }}>سبافون</span>
                </h1>
                <p className="mt-3 text-base font-bold italic sm:text-lg" style={{ color: "#dbecf9" }}>
                  أصالة وتواصل
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:mx-0 sm:text-base">
                  تصفّح الباقات والخدمات وأكواد الاستعلام وإعدادات الإنترنت بسهولة
                  من مكان واحد.
                </p>
              </div>
            </div>
          </div>

          {/* dual stripe echoing the sabafon palette */}
          <div className="flex h-1.5 w-full">
            <div className="flex-1" style={{ background: "#053a75" }} />
            <div className="flex-1" style={{ background: "#1478c9" }} />
          </div>
        </section>

        {/* TABS */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Tabs defaultValue="packages_3g" className="w-full">
            <TabsList
              className="flex h-auto w-full flex-wrap justify-center gap-2 rounded-2xl border-2 p-2 shadow-[0_10px_30px_-15px_rgba(10,91,168,0.35)]"
              style={{
                borderColor: "#053a7533",
                background: "linear-gradient(135deg, #d5e6f4 0%, #b8d4ea 100%)",
              }}
            >
              <TabsTrigger
                value="packages_3g"
                data-brand="sf"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#053a75] transition data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <Package className="h-4 w-4" />
                أكواد باقات 3G
              </TabsTrigger>
              <TabsTrigger
                value="packages_4g"
                data-brand="sf"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#053a75] transition data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <Package className="h-4 w-4" />
                أكواد باقات 4G
              </TabsTrigger>
              <TabsTrigger
                value="services"
                data-brand="sf"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#053a75] transition data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <Wrench className="h-4 w-4" />
                الخدمات
              </TabsTrigger>
              <TabsTrigger
                value="account"
                data-brand="sf"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#053a75] transition data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <UserCog className="h-4 w-4" />
                أسعار ومعلومات
              </TabsTrigger>
              <TabsTrigger
                value="internet"
                data-brand="sf"
                className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#053a75] transition data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                <Settings2 className="h-4 w-4" />
                ضبط الإنترنت
              </TabsTrigger>
            </TabsList>

            <style>{`
              [data-brand="sf"][data-state="active"] {
                background: linear-gradient(135deg, #053a75 0%, #1478c9 100%) !important;
              }
            `}</style>

            <div
              className="mt-6 flex items-start gap-3 rounded-2xl border-2 p-4"
              style={{
                borderColor: "#053a7540",
                background: "linear-gradient(135deg, #d5e6f4 0%, #c6dbef 100%)",
              }}
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "#053a75" }} />
              <p className="text-sm font-semibold" style={{ color: "#053a75" }}>
                قد تتغير الأكواد والأسعار من الشركة، يرجى التأكد قبل الاشتراك.
              </p>
            </div>

            <TabsContent value="packages_3g" className="mt-6">
              <PackagesPanel generation="3g" />
            </TabsContent>
            <TabsContent value="packages_4g" className="mt-6">
              <PackagesPanel generation="4g" />
            </TabsContent>
            <TabsContent value="services" className="mt-6">
              <SectionList section="services" />
            </TabsContent>
            <TabsContent value="account" className="mt-6 space-y-6">
              <SabafonTariffTables />
              <SectionList section="account" />
            </TabsContent>
            <TabsContent value="internet" className="mt-6 space-y-6">
              <SabafonInternetCards />
              <SectionList section="internet" />
            </TabsContent>
          </Tabs>

        </section>
      </main>

      <SiteFooter />
      <SaveAllCodesBar />
    </div>
  );
}

function SectionList({ section }: { section: SabafonSection }) {
  const { items, loading } = useSabafonItems(section);
  const extras: React.ReactNode[] = section === "services" ? [
    <SabafonCallMeCard key="__sf-call-me" />,
    <SabafonCallOnMeCard key="__sf-call-on-me" />,
    <SabafonSalifniCard key="__sf-salifni" />,
    <SabafonBalanceTransferCard key="__sf-balance-transfer" />,
    <SabafonBalanceInquiryCard key="__sf-balance-inquiry" />,
    <SabafonPackageBalanceInquiryCard key="__sf-package-balance" />,
    <SabafonBillInquiryCard key="__sf-bill-inquiry" />,
    <SabafonForgiBalanceCard key="__sf-forgi-balance" />,
    <SabafonKashefOffCard key="__sf-kashef-off" />,
    <SabafonKashefBusyCard key="__sf-kashef-busy" />,
    <SabafonKashefNoAnswerCard key="__sf-kashef-noanswer" />,
    <SabafonKashefAllCard key="__sf-kashef-all" />,
    <SabafonForwardOffCard key="__sf-forward-off" />,
    <SabafonForwardBusyCard key="__sf-forward-busy" />,
    <SabafonForwardNoAnswerCard key="__sf-forward-noanswer" />,
    <SabafonForwardAllCard key="__sf-forward-all" />,
    <SabafonCustomerCareCard key="__sf-customer-care" />,
    <SabafonCallWaitingCard key="__sf-call-waiting" />,
    <SabafonKnowMyNumberCard key="__sf-know-number" />,
    <SabafonChangePinCard key="__sf-change-pin" />,
    <SabafonRingtoneCard key="__sf-ringtone" />,
    <SabafonMawjoodCard key="__sf-mawjood" />,
    <SabafonPrivacyCard key="__sf-privacy" />,
    <SabafonForgiDetailsCard key="__sf-forgi-details" />,
    <SabafonNewSimNumberCard key="__sf-new-sim" />,
    <SabafonVoiceMailCard key="__sf-voicemail" />,
    <SabafonKashefCombinedCard key="__sf-kashef-combined" />,
    <SabafonBlockAllIncomingCard key="__sf-block-in" />,
    <SabafonBlockAllOutgoingCard key="__sf-block-out" />,
    <SabafonBlockIntlOutgoingCard key="__sf-block-intl" />,
    <SabafonBlockOutRoamingCard key="__sf-block-out-roam" />,
    <SabafonBlockInRoamingCard key="__sf-block-in-roam" />,
    <SabafonCancelAllBlocksCard key="__sf-cancel-blocks" />,
    <SabafonMultiPartyCard key="__sf-multi-party" />,
    <SabafonSabaControlCard key="__sf-saba-control" />,
    <SabafonPayBillCard key="__sf-pay-bill" />,
    <SabafonRadiophoneCard key="__sf-radiophone" />,
    <SabafonRoamingPostpaidCard key="__sf-roaming-post" />,
    <SabafonSmartRoamingPostpaidCard key="__sf-smart-roam-post" />,
    <SabafonSmsRoamingPostpaidCard key="__sf-sms-roam-post" />,
    <SabafonRoamingPrepaidCard key="__sf-roaming-pre" />,
  ] : [];

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (items.length === 0 && extras.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Clock className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-black text-foreground">قريباً</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          سيتم إضافة المحتوى قريباً بإذن الله.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {extras}
      {items.map((item) => (
        <SabafonItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function SabafonItemCard({ item }: { item: SabafonItem }) {
  const dialCode = item.code?.trim();
  const deactivateCode = item.deactivation_code?.trim();
  const Icon = sabafonIconFor(item.icon);
  return (
    <div
      className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border-2 bg-white p-5 pt-6 shadow-[0_10px_30px_-15px_rgba(10,91,168,0.25)]"
      style={{ borderColor: "#053a7530" }}
    >
      <div className="absolute inset-x-0 top-0 flex h-1.5">
        <div className="flex-1" style={{ background: "#053a75" }} />
        <div className="flex-1" style={{ background: "#1478c9" }} />
      </div>
      <div
        className="pointer-events-none absolute -left-8 -top-8 h-20 w-20 rotate-12 rounded-2xl"
        style={{ background: "#d5e6f4", opacity: 0.9 }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow"
            style={{ background: "linear-gradient(135deg, #053a75 0%, #1478c9 100%)" }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black" style={{ color: "#053a75" }}>{item.title}</h3>
        </div>
        {item.price && (
          <span
            className="shrink-0 rounded-full border px-3 py-1 text-xs font-bold"
            style={{ borderColor: "#1478c9", background: "#dbecf9", color: "#053a75" }}
          >
            {item.price}
          </span>
        )}
      </div>
      {item.description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      )}
      {dialCode && (
        <div className="mt-auto flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-3">
          <bdi className="font-mono text-sm font-bold text-foreground" dir="ltr" style={{ unicodeBidi: "isolate" }}>
            {dialCode}
          </bdi>
          <a
            href={`tel:${encodeURIComponent(dialCode)}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:scale-[1.02]"
          >
            <Phone className="h-3.5 w-3.5" />
            تفعيل
          </a>
        </div>
      )}
      {deactivateCode && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3">
          <bdi className="font-mono text-sm font-bold text-destructive" dir="ltr" style={{ unicodeBidi: "isolate" }}>
            {deactivateCode}
          </bdi>
          <a
            href={`tel:${encodeURIComponent(deactivateCode)}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-background px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10"
          >
            <Phone className="h-3.5 w-3.5" />
            إلغاء
          </a>
        </div>
      )}
    </div>
  );
}

const SABAFON_4G_CATEGORY_IDS = new Set<string>([
  "sabafon-cat-anter-4g",
  "sabafon-cat-yabalash-4g",
  "sabafon-cat-yabalash-4g-mixed",
  "sabafon-cat-inter-4g",
  "sabafon-cat-safari-4g",
  "sabafon-cat-hybrid-4g",
  "sabafon-cat-wahed-4g",
  "sabafon-cat-social-4g",

  "sabafon-cat-supernet-2g",
]);

const SABAFON_SHARED_CATEGORY_IDS = new Set<string>([
  "sabafon-cat-supernet-2g",
  "sabafon-cat-safari-4g",
  "sabafon-cat-social-4g",
]);

function PackagesPanel({ generation }: { generation: "3g" | "4g" }) {
  const { categories, loading } = useSabafonPackagesStore();
  const filtered = categories.filter((c) =>
    generation === "4g"
      ? SABAFON_4G_CATEGORY_IDS.has(c.id)
      : !SABAFON_4G_CATEGORY_IDS.has(c.id) || SABAFON_SHARED_CATEGORY_IDS.has(c.id),
  );





  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Package className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-black text-foreground">لا توجد باقات بعد</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          سيتم إضافة باقات {generation === "3g" ? "3G" : "4G"} قريباً بإذن الله.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        {/* placeholder to preserve layout parity */}
      </div>
      <Accordion
        type="multiple"
        defaultValue={[filtered[0].id]}
        className="space-y-3"
      >
        {filtered.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <AccordionTrigger className="px-5 py-4 text-right hover:no-underline">
              <div className="flex flex-1 items-center justify-between gap-3">
                <div className="text-right">
                  <div className="text-base font-extrabold text-foreground">
                    {cat.title}
                  </div>
                  {cat.description && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      {cat.description}
                    </div>
                  )}
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {cat.packages.length} باقات
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5">
              {cat.packages.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  لا توجد باقات في هذا القسم.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.packages.map((pkg) => (
                    <SabafonPackageCard
                      key={pkg.id}
                      pkg={pkg}
                      showPostpaid={SABAFON_4G_CATEGORY_IDS.has(cat.id)}
                    />
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

type CodeKind = "prepaid" | "postpaid";

function buildDialCode(rawCode: string, phone: string): string {
  const code = rawCode.trim().replace(/\s+/g, "");
  const num = phone.replace(/\D+/g, "").slice(0, 9);
  // Placeholders the admin can type inside the code to mark where the number goes
  const PLACEHOLDER_RE = /\{\s*(?:n|رقم|الرقم)\s*\}|\[\s*(?:n|رقم|الرقم)\s*\]|#(?:رقم|الرقم)#|<\s*(?:رقم|الرقم)\s*>|الرقم|رقم/gi;
  if (PLACEHOLDER_RE.test(code)) {
    PLACEHOLDER_RE.lastIndex = 0;
    return num ? code.replace(PLACEHOLDER_RE, num) : code;
  }
  if (!num) return code;
  // e.g. *250# → *250*7XXXXXXXX#
  if (/^\*[\d*]+#$/.test(code)) return code.replace(/#$/, `*${num}#`);
  return code;
}


function PackageCodeRow({
  pkg,
  kind,
  label,
  accent,
  phone,
}: {
  pkg: SabafonPackage;
  kind: CodeKind;
  label: string;
  accent: "primary" | "amber";
  phone?: string;
}) {

  const { isAdmin } = useIsAdmin();
  const current = (kind === "prepaid" ? pkg.code : pkg.codePostpaid) ?? "";
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(current);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setDraft(current);
  }, [current]);

  const dialCode = current.trim();
  const smsMatch = dialCode.match(/^SMS:([^:]+):(.+)$/i);
  const smsInfo = smsMatch ? { number: smsMatch[1].trim(), body: smsMatch[2].trim() } : null;
  const normalizedPhone = (phone ?? "").replace(/\D+/g, "").slice(0, 9);
  const dialWithPhone = smsInfo ? "" : buildDialCode(dialCode, normalizedPhone);
  const needsValidPhone = Boolean(phone) && normalizedPhone.length !== 9;
  const displayCode = smsInfo
    ? `أرسل ${smsInfo.body} إلى ${smsInfo.number}`
    : dialWithPhone;
  const href = smsInfo
    ? `sms:${smsInfo.number}?body=${encodeURIComponent(smsInfo.body)}`
    : dialWithPhone && !needsValidPhone
    ? `tel:${dialWithPhone.replace(/#/g, "%23")}`
    : "";


  const save = async () => {
    const value = draft.trim().slice(0, 32);
    setSaving(true);
    const patch =
      kind === "prepaid"
        ? { code: value || null }
        : { code_postpaid: value || null };
    const { error } = await supabase
      .from("sabafon_packages")
      .update(patch)
      .eq("id", pkg.id);
    setSaving(false);
    if (!error) {
      setEditing(false);
      window.dispatchEvent(new CustomEvent("sabafon_packages_changed"));
    } else {
      alert("تعذّر حفظ الكود: " + error.message);
    }
  };

  const badgeColor =
    accent === "primary"
      ? "border-primary/30 bg-primary/10 text-primary"
      : "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400";
  const btnColor =
    accent === "primary"
      ? "border-primary bg-primary/10 text-primary"
      : "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400";
  const codeColor = accent === "primary" ? "text-primary" : "text-amber-700 dark:text-amber-400";

  return (
    <div className={`rounded-xl border p-3 ${badgeColor}`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] font-black uppercase tracking-wide">{label}</span>
        {isAdmin && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="rounded-md border border-current/40 bg-background/70 px-2 py-0.5 text-[10px] font-bold hover:bg-background"
            title={`تعديل كود ${label}`}
          >
            تعديل
          </button>
        )}
      </div>

      {isAdmin && editing ? (
        <div className="flex flex-wrap items-center gap-1">
          <input
            dir="ltr"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={32}
            placeholder="*250#"
            className="w-32 flex-1 rounded-md border border-current/40 bg-background px-2 py-1 font-mono text-sm outline-none"
          />
          <button
            onClick={save}
            disabled={saving}
            className="rounded-md bg-primary px-2 py-1 text-[11px] font-bold text-primary-foreground disabled:opacity-50"
          >
            {saving ? "..." : "حفظ"}
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setDraft(current);
            }}
            className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-bold text-muted-foreground"
          >
            إلغاء
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <bdi dir="ltr" className={`font-mono text-sm font-bold ${codeColor}`} style={{ unicodeBidi: "isolate" }}>
            {displayCode || "غير محدد"}
          </bdi>
        </div>
      )}

      {href ? (
        <a
          href={href}
          className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 px-3 py-2 text-xs font-extrabold transition-transform hover:scale-[1.02] ${btnColor}`}
        >
          <PhoneCall className="h-3.5 w-3.5" />
          {smsInfo ? `أرسل للتفعيل` : `تفعيل ${label}`}
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-2 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-dashed border-border bg-muted/40 px-3 py-2 text-xs font-extrabold text-muted-foreground"
        >
          {needsValidPhone ? "أدخل رقمًا صحيحًا من 9 أرقام" : `كود ${label} غير متوفر`}
        </button>
      )}
    </div>
  );
}

function SabafonPackageCard({ pkg, showPostpaid = false }: { pkg: SabafonPackage; showPostpaid?: boolean }) {
  const [phone, setPhone] = useState("");

  const [copied, setCopied] = useState(false);
  const { isAdmin } = useIsAdmin();

  const details = [
    `📦 ${pkg.name}`,
    `💰 السعر: ${pkg.price}`,
    `🌐 الإنترنت: ${pkg.internet}`,
    `📞 الدقائق: ${pkg.minutes}`,
    `✉️ الرسائل: ${pkg.sms}`,
    `⏳ الصلاحية: ${pkg.validity}`,
    `📶 الشبكة: ${pkg.network}`,
    pkg.code ? `🔢 كود الدفع المسبق: ${pkg.code}` : "",
    showPostpaid && pkg.codePostpaid ? `🧾 كود الفوترة: ${pkg.codePostpaid}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const shareUrl = `https://wa.me/?text=${encodeURIComponent(details)}`;

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white p-5 pt-6 shadow-[0_10px_30px_-15px_rgba(10,91,168,0.35)] transition-all hover:-translate-y-0.5"
      style={{ borderColor: "#053a7530" }}
    >
      {/* brand top strip */}
      <div className="absolute inset-x-0 top-0 flex h-1.5">
        <div className="flex-1" style={{ background: "#053a75" }} />
        <div className="flex-1" style={{ background: "#1478c9" }} />
      </div>
      {/* cream corner */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rotate-12 rounded-2xl"
        style={{ background: "#d5e6f4", opacity: 0.9 }}
      />
      <div className="relative mb-3 flex items-start justify-between gap-2">
        <h4 className="min-w-0 flex-1 text-base font-extrabold leading-tight break-words" style={{ color: "#053a75" }}>
          {pkg.name}
        </h4>
        <div className="flex shrink-0 items-center gap-2">
          {isAdmin && (
            <Link
              to="/admin/sabafon-packages"
              hash={pkg.id}
              className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 hover:bg-amber-100"
              title="تعديل الباقة"
            >
              <Settings className="h-3 w-3" />
              تعديل
            </Link>
          )}
          <span
            className="rounded-full border px-3 py-1 text-[11px] font-bold"
            style={{ borderColor: "#1478c9", background: "#dbecf9", color: "#053a75" }}
          >
            {pkg.network}
          </span>
        </div>
      </div>
      <div className="mb-4 text-3xl font-black" dir="rtl" style={{ color: "#053a75" }}>
        ريال {pkg.price}
      </div>
      <ul className="space-y-2 text-sm text-foreground/85">
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الإنترنت</span>
          <span className="font-bold">{pkg.internet}</span>
        </li>
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الدقائق</span>
          <span className="font-bold">{pkg.minutes}</span>
        </li>
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الرسائل</span>
          <span className="font-bold">{pkg.sms}</span>
        </li>
        <li className="flex items-center justify-between pb-1.5">
          <span className="text-muted-foreground">الصلاحية</span>
          <span className="font-bold">{pkg.validity}</span>
        </li>
      </ul>

      {showPostpaid && (
      <div className="mt-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3">
        <label className="mb-1 block text-[11px] font-bold text-muted-foreground">
          رقمك (اختياري) — لبرمجة الكود مع رقمك مباشرة
        </label>
        <input
          dir="ltr"
          inputMode="numeric"
          pattern="[0-9]*"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D+/g, "").slice(0, 9))}
          placeholder="7XXXXXXXX"
          maxLength={9}
          className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-center font-mono text-sm outline-none focus:border-primary"
        />

        {phone.replace(/\D+/g, "") && (
          <p className="mt-1 text-[10px] text-muted-foreground">
            سيتم إدراج رقمك تلقائياً في كود التفعيل قبل الاتصال
          </p>
        )}
      </div>
      )}

      <div className={`mt-4 grid gap-2 ${showPostpaid ? "grid-cols-1" : "grid-cols-1"}`}>
        <PackageCodeRow
          pkg={pkg}
          kind="prepaid"
          label={showPostpaid ? "دفع مسبق" : "كود التفعيل"}
          accent="primary"
          phone={phone}
        />
        {showPostpaid && (
          <PackageCodeRow pkg={pkg} kind="postpaid" label="فوترة" accent="amber" phone={phone} />
        )}
      </div>


      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ" : "نسخ التفاصيل"}
        </button>
        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary"
        >
          <Share2 className="h-3.5 w-3.5" />
          مشاركة
        </a>
      </div>
    </div>
  );
}


