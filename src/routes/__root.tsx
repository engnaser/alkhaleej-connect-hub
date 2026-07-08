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
      { title: "الخليج تيليكوم لخدمات الشحن الإلكتروني" },
      {
        name: "description",
        content:
          "المنصة الرسمية للخليج تيليكوم لخدمات الشحن الإلكتروني وعمليات الاتصالات الموثوقة في الجمهورية اليمنية.",
      },
      { name: "author", content: "الخليج تيليكوم" },
      { property: "og:title", content: "الخليج تيليكوم لخدمات الشحن الإلكتروني" },
      {
        property: "og:description",
        content:
          "المنصة الرسمية للخليج تيليكوم لخدمات الشحن الإلكتروني وعمليات الاتصالات الموثوقة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "الخليج تيليكوم لخدمات الشحن الإلكتروني" },
      { name: "description", content: "Al-Khaleej Telecom Hub is a professional, modern, and responsive business landing page." },
      { property: "og:description", content: "Al-Khaleej Telecom Hub is a professional, modern, and responsive business landing page." },
      { name: "twitter:description", content: "Al-Khaleej Telecom Hub is a professional, modern, and responsive business landing page." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e8cf0f29-1e01-43ff-8118-40316c1121fd/id-preview-be3ec84b--b2c0f853-1534-4d24-83b5-35ff96482c70.lovable.app-1782051720010.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e8cf0f29-1e01-43ff-8118-40316c1121fd/id-preview-be3ec84b--b2c0f853-1534-4d24-83b5-35ff96482c70.lovable.app-1782051720010.png" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;700&display=swap",
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
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('khalij:theme');var c=document.documentElement.classList;c.remove('light','dark');c.add(t==='light'?'light':'dark');}catch(e){}})();`,
          }}
        />
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

  useEffect(() => {
    const saved = window.localStorage.getItem("khalij:theme");
    const theme = saved === "light" ? "light" : "dark";
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
