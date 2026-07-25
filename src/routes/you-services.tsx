import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SaveAllCodesBar } from "@/components/editable-action-codes";
import { SawaTariffTable } from "@/components/sawa-tariff-table";
import youLogo from "@/assets/you-logo.jpg.asset.json";

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
import { useState } from "react";
import { useYouItems, youIconFor, type YouSection, type YouItem } from "@/lib/youServicesStore";
import { useYouPackagesStore, type YouPackage } from "@/lib/youPackagesStore";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { CallMeCard } from "@/components/call-me-card";
import { YouCallOnMeCard } from "@/components/you-call-on-me-card";
import { YouSalifniCard } from "@/components/you-salifni-card";
import { YouBalanceTransferCard } from "@/components/you-balance-transfer-card";
import {
  YouBalanceInquiryCard,
  YouBillInquiryCard,
  YouBrowse4GCard,
  YouSuperKashefOffCard,
  YouSuperKashefBusyCard,
  YouSuperKashefNoAnswerCard,
  YouSuperKashefAllCard,
  YouForwardOffCard,
  YouForwardBusyCard,
  YouForwardNoAnswerCard,
  YouForwardAllCard,
  YouCustomerCareCard,
  YouCallWaitingCard,
  YouKnowMyNumberCard,
  YouCallerIdCard,
  YouRingtoneCard,
  YouThimarCard,
  YouKhabirhumCard,
  YouEAnsweringCard,
  YouNewSimNumberCard,
  YouVoiceMailCard,
  YouNewPrepaidLineCard,
  YouFamilyFriendsCard,
  YouFamilyFriendsManageCard,
  YouFamilyFriendsEditCard,
  YouFamilyFriendsInquiryCard,
  YouInternationalRoamingCard,
  YouRoamingPostpaidCard,
  YouRoamingPrepaidCard,
} from "@/components/you-inquiry-cards";

export const Route = createFileRoute("/you-services")({
  head: () => ({
    meta: [
      { title: "خدمات شركة يو — الخليج تيليكوم" },
      {
        name: "description",
        content:
          "تصفّح باقات وخدمات شركة يو، إدارة الحساب والرصيد، وإعدادات ضبط الإنترنت في مكان واحد.",
      },
      { property: "og:title", content: "خدمات شركة يو — الخليج تيليكوم" },
      {
        property: "og:description",
        content:
          "كل ما تحتاجه من باقات وخدمات شركة يو وإعدادات الإنترنت بواجهة عربية حديثة.",
      },
    ],
  }),
  component: YouServicesPage,
});

function YouServicesPage() {
  const { isAdmin } = useIsAdmin();
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <SiteHeader
        cta={
          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <Link
                  to="/admin/you-packages"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20"
                >
                  <Package className="h-3.5 w-3.5" />
                  إدارة الباقات
                </Link>
                <Link
                  to="/admin/you-services"
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
        {/* HERO — You brand identity (yellow #FFC72C + black) */}
        <section className="relative overflow-hidden border-b-4" style={{ borderColor: "#0a0a0a" }}>
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(135deg, #FFE48A 0%, #FFC72C 55%, #FFB800 100%)",
            }}
          />
          {/* Diagonal stripe pattern */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #0a0a0a 0 2px, transparent 2px 22px)",
            }}
          />
          {/* Black corner ribbon */}
          <div className="absolute right-0 top-0 h-2 w-full" style={{ background: "#0a0a0a" }} />

          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-right lg:px-8">
            <div className="flex-1">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-black"
                style={{ borderColor: "#0a0a0a", background: "#0a0a0a", color: "#FFC72C" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                مركز خدمات شركة يو
              </div>
              <h1 className="text-balance text-4xl font-black sm:text-6xl" style={{ color: "#0a0a0a", letterSpacing: "-0.02em" }}>
                خدمات <span className="inline-block rounded-lg px-3 py-1" style={{ background: "#0a0a0a", color: "#FFC72C" }}>YOU</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed sm:text-lg lg:mx-0" style={{ color: "#1a1a1a" }}>
                باقات، خدمات، أكواد استعلام وإعدادات إنترنت شركة يو — كل ما تحتاجه في مكان واحد.
              </p>
            </div>

            {/* Logo card */}
            <div className="shrink-0">
              <div
                className="relative grid h-32 w-32 place-items-center rounded-3xl border-4 bg-white p-3 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] sm:h-40 sm:w-40"
                style={{ borderColor: "#0a0a0a" }}
              >
                <img src={youLogo.url} alt="شعار شركة يو" className="h-full w-full rounded-2xl object-contain" />
              </div>
            </div>
          </div>

          {/* Bottom dual band */}
          <div className="flex h-2 w-full">
            <div className="flex-1" style={{ background: "#0a0a0a" }} />
            <div className="flex-1" style={{ background: "#FFC72C" }} />
          </div>
        </section>

        {/* TABS */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Tabs defaultValue="packages" className="w-full">
            <TabsList
              className="flex h-auto w-full flex-wrap justify-center gap-2 rounded-2xl border-2 p-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]"
              style={{ background: "linear-gradient(135deg, #FFF8DC 0%, #FFE48A 100%)", borderColor: "#0a0a0a" }}
            >
              {[
                { v: "packages", i: Package, l: "تفعيل الباقات" },
                { v: "services", i: Wrench, l: "الخدمات" },
                { v: "account", i: UserCog, l: "أسعار ومعلومات" },
                { v: "internet", i: Settings2, l: "ضبط الإنترنت" },
              ].map(({ v, i: I, l }) => (
                <TabsTrigger
                  key={v}
                  value={v}
                  className="flex-1 min-w-[140px] gap-2 rounded-xl px-4 py-3 text-sm font-black text-[#0a0a0a] data-[state=active]:!bg-[#0a0a0a] data-[state=active]:!text-[#FFC72C] data-[state=active]:shadow-lg"
                >
                  <I className="h-4 w-4" />
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>

            <div
              className="mt-6 flex items-start gap-3 rounded-2xl border-2 p-4"
              style={{ borderColor: "#0a0a0a", background: "#FFF8DC" }}
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "#0a0a0a" }} />
              <p className="text-sm font-bold" style={{ color: "#0a0a0a" }}>
                قد تتغير الأكواد والأسعار من الشركة، يرجى التأكد قبل الاشتراك.
              </p>
            </div>

            <TabsContent value="packages" className="mt-6">
              <YouBrandSection title="تفعيل الباقات" icon={Package}>
                <PackagesPanel />
              </YouBrandSection>
            </TabsContent>
            <TabsContent value="services" className="mt-6">
              <YouBrandSection title="الخدمات" icon={Wrench}>
                <SectionList section="services" />
              </YouBrandSection>
            </TabsContent>
            <TabsContent value="account" className="mt-6">
              <YouBrandSection title="أسعار ومعلومات" icon={UserCog}>
                <div className="space-y-6">
                  <SawaTariffTable />
                  <SectionList section="account" />
                </div>
              </YouBrandSection>
            </TabsContent>
            <TabsContent value="internet" className="mt-6">
              <YouBrandSection title="ضبط الإنترنت" icon={Settings2}>
                <SectionList section="internet" />
              </YouBrandSection>
            </TabsContent>
          </Tabs>
        </section>
      </main>


      <SiteFooter />
      <SaveAllCodesBar />
    </div>
  );
}

function SectionList({ section }: { section: YouSection }) {
  const { items, loading } = useYouItems(section);
  const extras = section === "services" ? [<YouBalanceInquiryCard key="__you-balance-inquiry" />, <YouBillInquiryCard key="__you-bill-inquiry" />, <YouBrowse4GCard key="__you-browse-4g" />, <YouSuperKashefOffCard key="__you-kashef-off" />, <YouSuperKashefBusyCard key="__you-kashef-busy" />, <YouSuperKashefNoAnswerCard key="__you-kashef-noanswer" />, <YouSuperKashefAllCard key="__you-kashef-all" />, <YouForwardOffCard key="__you-forward-off" />, <YouForwardBusyCard key="__you-forward-busy" />, <YouForwardNoAnswerCard key="__you-forward-noanswer" />, <YouForwardAllCard key="__you-forward-all" />, <YouCustomerCareCard key="__you-customer-care" />, <YouCallWaitingCard key="__you-call-waiting" />, <YouKnowMyNumberCard key="__you-know-number" />, <YouCallerIdCard key="__you-caller-id" />, <YouRingtoneCard key="__you-ringtone" />, <YouThimarCard key="__you-thimar" />, <YouKhabirhumCard key="__you-khabirhum" />, <YouEAnsweringCard key="__you-e-answering" />, <YouNewSimNumberCard key="__you-new-sim-number" />, <YouVoiceMailCard key="__you-voicemail" />, <YouNewPrepaidLineCard key="__you-new-prepaid" />, <YouFamilyFriendsCard key="__you-family-friends" />, <YouFamilyFriendsManageCard key="__you-family-manage" />, <YouFamilyFriendsEditCard key="__you-family-edit" />, <YouFamilyFriendsInquiryCard key="__you-family-inquiry" />, <YouInternationalRoamingCard key="__you-roaming" />, <YouRoamingPostpaidCard key="__you-roaming-postpaid" />, <YouRoamingPrepaidCard key="__you-roaming-prepaid" />, <YouBalanceTransferCard key="__you-balance-transfer" />, <YouSalifniCard key="__you-salifni" />, <YouCallOnMeCard key="__you-call-on-me" />, <CallMeCard key="__call-me" />] : [];

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
        <YouItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function YouItemCard({ item }: { item: YouItem }) {
  const dialCode = item.code?.trim();
  const deactivateCode = item.deactivation_code?.trim();
  const Icon = youIconFor(item.icon);
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black text-foreground">{item.title}</h3>
        </div>
        {item.price && (
          <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
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

function PackagesPanel() {
  const { categories, loading } = useYouPackagesStore();

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Package className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-black text-foreground">لا توجد باقات بعد</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          سيتم إضافة باقات شركة يو قريباً بإذن الله.
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
        defaultValue={[categories[0].id]}
        className="space-y-3"
      >
        {categories.map((cat) => (
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
                    <YouPackageCard key={pkg.id} pkg={pkg} />
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

function YouPackageCard({ pkg }: { pkg: YouPackage }) {
  const [copied, setCopied] = useState(false);
  const { isAdmin } = useIsAdmin();
  const [editing, setEditing] = useState(false);
  const [codeDraft, setCodeDraft] = useState(pkg.code ?? "");
  const [saving, setSaving] = useState(false);
  const dialCode = (pkg.code ?? "").trim();
  const smsMatch = dialCode.match(/^SMS:([^:]+):(.+)$/i);
  const smsInfo = smsMatch ? { number: smsMatch[1].trim(), body: smsMatch[2].trim() } : null;
  const displayCode = smsInfo ? `أرسل ${smsInfo.body} إلى ${smsInfo.number}` : dialCode;
  const activationHref = smsInfo
    ? `sms:${encodeURIComponent(smsInfo.number)}?body=${encodeURIComponent(smsInfo.body)}`
    : dialCode
    ? `tel:${encodeURIComponent(dialCode)}`
    : "";

  const saveCode = async () => {
    const value = codeDraft.trim().slice(0, 32);
    setSaving(true);
    const { error } = await supabase
      .from("you_packages")
      .update({ code: value || null })
      .eq("id", pkg.id);
    setSaving(false);
    if (!error) {
      setEditing(false);
      window.dispatchEvent(new CustomEvent("you_packages_changed"));
    } else {
      alert("تعذّر حفظ الكود: " + error.message);
    }
  };

  const details = [
    `📦 ${pkg.name}`,
    `💰 السعر: ${pkg.price}`,
    `🌐 الإنترنت: ${pkg.internet}`,
    `📞 الدقائق: ${pkg.minutes}`,
    `✉️ الرسائل: ${pkg.sms}`,
    `⏳ الصلاحية: ${pkg.validity}`,
    `📶 الشبكة: ${pkg.network}`,
    dialCode ? `🔢 كود التفعيل: ${dialCode}` : "",
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
    <div className="relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h4 className="min-w-0 flex-1 text-base font-extrabold leading-tight text-foreground break-words">
          {pkg.name}
        </h4>
        <div className="flex shrink-0 items-center gap-2">
          {isAdmin && (
            <Link
              to="/admin/you-packages"
              hash={pkg.id}
              className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 hover:bg-amber-100"
              title="تعديل الباقة"
            >
              <Settings className="h-3 w-3" />
              تعديل
            </Link>
          )}
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
            {pkg.network}
          </span>
        </div>
      </div>
      <div className="mb-4 text-3xl font-black text-primary" dir="rtl">
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
        <li className="flex items-center justify-between border-b border-border/50 pb-1.5">
          <span className="text-muted-foreground">الصلاحية</span>
          <span className="font-bold">{pkg.validity}</span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground shrink-0">كود التفعيل</span>
          {isAdmin && editing ? (
            <div className="flex items-center gap-1">
              <input
                dir="ltr"
                value={codeDraft}
                onChange={(e) => setCodeDraft(e.target.value)}
                maxLength={32}
                placeholder="*250#"
                className="w-28 rounded-md border border-primary/40 bg-background px-2 py-1 font-mono text-sm text-primary outline-none focus:border-primary"
              />
              <button
                onClick={saveCode}
                disabled={saving}
                className="rounded-md bg-primary px-2 py-1 text-[11px] font-bold text-primary-foreground disabled:opacity-50"
              >
                {saving ? "..." : "حفظ"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setCodeDraft(pkg.code ?? "");
                }}
                className="rounded-md border border-border px-2 py-1 text-[11px] font-bold text-muted-foreground"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <span className="flex items-center gap-2">
              {isAdmin && (
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-md border border-amber-400/60 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 hover:bg-amber-100"
                  title="تعديل كود التفعيل"
                >
                  تعديل
                </button>
              )}
              <bdi dir="ltr" className="font-mono font-bold text-primary" style={{ unicodeBidi: "isolate" }}>
                {displayCode || "غير محدد"}
              </bdi>
            </span>
          )}
        </li>
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-2">
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
      {activationHref ? (
        <a
          href={activationHref}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary/10 px-3 py-2.5 text-sm font-extrabold text-primary transition-transform hover:scale-[1.02]"
        >
          <PhoneCall className="h-4 w-4" />
          {smsInfo ? `أرسل ${smsInfo.body} إلى ${smsInfo.number} للتفعيل` : "اضغط لتفعيل الباقة"}
        </a>
      ) : (
        <button
          type="button"
          disabled
          title="لم يتم تحديد كود تفعيل لهذه الباقة"
          className="mt-2 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-dashed border-border bg-muted/40 px-3 py-2.5 text-sm font-extrabold text-muted-foreground"
        >
          <PhoneCall className="h-4 w-4" />
          كود التفعيل غير متوفر
        </button>
      )}
    </div>
  );
}

