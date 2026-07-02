import { Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Send,
  Twitter,
  Apple,
  Smartphone,
} from "lucide-react";
import logoKhalij from "@/assets/logo-khalij.png";

const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=alkhalijtele.comapp&hl=ar";
const IOS_URL = "https://alkhalijtw.yemoney.net/";
const WHATSAPP_URL = "https://wa.me/967781635755";

const SOCIALS = [
  { label: "واتساب", href: WHATSAPP_URL, Icon: MessageCircle },
  { label: "فيسبوك", href: "#", Icon: Facebook },
  { label: "تيليجرام", href: "#", Icon: Send },
  { label: "إنستجرام", href: "#", Icon: Instagram },
  { label: "تويتر", href: "#", Icon: Twitter },
];

const QUICK_LINKS: { label: string; to: string }[] = [
  { label: "الرئيسية", to: "/" },
  { label: "التصاميم", to: "/designs" },
  { label: "صوري", to: "/designs" },
  { label: "سياسة الخصوصية", to: "/" },
  { label: "الشروط والأحكام", to: "/" },
  { label: "سياسة الأمان", to: "/" },
  { label: "اتصل بنا", to: "/" },
];

export function SiteFooter() {
  return (
    <footer
      dir="rtl"
      className="relative border-t border-primary/20 bg-[oklch(0.18_0.03_220)] text-foreground"
    >
      {/* top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-primary/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logoKhalij}
                alt="الخليج تيليكوم"
                className="h-12 w-12 rounded-full ring-2 ring-primary/50"
              />
              <h3 className="text-xl font-black text-primary">
                الخليج تيليكوم
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              منصة احترافية لتخصيص الصور وإدخال البيانات عليها بأسلوب عصري
              ومنظم.
            </p>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h4 className="relative mb-5 inline-block text-base font-extrabold text-primary">
              روابط مهمة
              <span className="absolute -bottom-2 right-0 h-0.5 w-10 rounded-full bg-primary" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 text-foreground/75 transition-colors hover:text-primary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50 transition-all group-hover:w-3 group-hover:bg-primary" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="relative mb-5 inline-block text-base font-extrabold text-primary">
              بيانات التواصل
              <span className="absolute -bottom-2 right-0 h-0.5 w-10 rounded-full bg-primary" />
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:781635755"
                  className="flex items-center gap-3 text-foreground/80 transition-colors hover:text-primary"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span dir="ltr">واتساب أو اتصال: 781635755</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:775608601"
                  className="flex items-center gap-3 text-foreground/80 transition-colors hover:text-primary"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span dir="ltr">واتساب أو اتصال: 775608601</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:alkhalijtelecom2021@gmail.com"
                  className="flex items-center gap-3 text-foreground/80 transition-colors hover:text-primary"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="truncate" dir="ltr">
                    alkhalijtelecom2021@gmail.com
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/5 text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_8px_20px_-8px_var(--primary)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 — App downloads */}
          <div>
            <h4 className="relative mb-5 inline-block text-base font-extrabold text-primary">
              تحميل التطبيق
              <span className="absolute -bottom-2 right-0 h-0.5 w-10 rounded-full bg-primary" />
            </h4>

            <div className="space-y-3">
              <a
                href={IOS_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-primary/20 bg-gradient-to-l from-primary/10 to-transparent p-3 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_10px_30px_-12px_var(--primary)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Apple className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] text-muted-foreground">
                    حمّل من
                  </span>
                  <span className="text-sm font-extrabold text-foreground">
                    App Store
                  </span>
                </span>
              </a>

              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-primary/20 bg-gradient-to-l from-primary/10 to-transparent p-3 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_10px_30px_-12px_var(--primary)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Smartphone className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] text-muted-foreground">
                    حمّل من
                  </span>
                  <span className="text-sm font-extrabold text-foreground">
                    Google Play
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 border-t border-primary/15 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} جميع الحقوق محفوظة - الخليج تيليكوم
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
