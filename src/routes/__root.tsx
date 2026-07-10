import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { installGlobalErrorListeners } from "../lib/global-error-listeners";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" dir="rtl">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" dir="rtl">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          تعذر تحميل الصفحة
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            إعادة المحاولة
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "الخليج تيليكوم — خدمات الاتصالات والشحن الإلكتروني" },
      {
        name: "description",
        content:
          "منصة الخليج تيليكوم اليمنية: تصاميم تهاني باسمك، استعلامات فواتير ADSL و4G، أسعار عملات، ومفاتيح اتصال دولية.",
      },
      { name: "author", content: "الخليج تيليكوم" },
      { property: "og:site_name", content: "الخليج تيليكوم" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_YE" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "الخليج تيليكوم",
          alternateName: "Al-Khaleej Telecom",
          url: "https://alkhaleej-connect-hub.lovable.app",
          logo: "https://alkhaleej-connect-hub.lovable.app/favicon.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+967-775-608-601",
            contactType: "customer service",
            areaServed: "YE",
            availableLanguage: ["Arabic"],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "الخليج تيليكوم",
          url: "https://alkhaleej-connect-hub.lovable.app",
          inLanguage: "ar",
        }),
      },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&family=Space+Grotesk:wght@600;700&family=DM+Sans:wght@400;700&display=swap",
      },

      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="light">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>

  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    installGlobalErrorListeners();
    try { window.localStorage.removeItem("khalij:theme"); } catch {}
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");

    // Google Translate: hidden widget that reads the `googtrans` cookie
    // Trigger from LanguageSwitcher by setting cookie + reloading.
    if (!document.getElementById("google-translate-script")) {
      const host = document.createElement("div");
      host.id = "google_translate_element";
      host.style.display = "none";
      document.body.appendChild(host);

      (window as unknown as { googleTranslateElementInit: () => void }).googleTranslateElementInit = () => {
        const g = (window as unknown as { google?: { translate?: { TranslateElement: new (o: object, el: string) => void; TranslateElement: { InlineLayout: { SIMPLE: number } } } } }).google;
        if (g?.translate?.TranslateElement) {
          new g.translate.TranslateElement(
            {
              pageLanguage: "ar",
              includedLanguages: "ar,en",
              autoDisplay: false,
            },
            "google_translate_element",
          );
        }
      };

      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);


  useEffect(() => {
    // Log initial view + subsequent client-side navigations.
    let last = "";
    const log = (path: string) => {
      if (!path || path === last) return;
      if (path.startsWith("/admin")) return; // skip admin surfaces
      last = path;
      void import("../lib/analytics").then((m) => m.trackPageView(path));
    };
    log(window.location.pathname);
    const unsub = router.subscribe("onResolved", ({ toLocation }) => {
      log(toLocation.pathname);
    });
    return () => {
      unsub();
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
