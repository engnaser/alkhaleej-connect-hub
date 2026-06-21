import { Link, useRouter } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import logoKhalij from "@/assets/logo-khalij.png";

const NAV_ITEMS = [
  { label: "الرئيسية", to: "/" },
  { label: "التصاميم", to: "/designs" },
  { label: "الخدمات", to: "/services" },
  { label: "تواصل معنا", href: "https://wa.me/967775608601" },
];

export function SiteHeader({ cta }: { cta?: ReactNode }) {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={logoKhalij}
            alt="الخليج تيليكوم"
            className="h-10 w-10 shrink-0 rounded-full ring-2 ring-primary/40"
          />
          <span className="truncate text-sm font-extrabold text-primary sm:text-base">
            الخليج تيليكوم
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.to ? pathname === item.to : false;
            const className = isActive
              ? "rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-secondary"
              : "rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary";
            return item.to ? (
              <Link key={item.label} to={item.to} className={className}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {cta}

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-primary transition-colors hover:bg-primary/10 md:hidden"
                aria-label="فتح القائمة"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] border-l border-border sm:w-[320px]"
            >
              <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
              <SheetDescription className="sr-only">
                روابط التنقل الرئيسية
              </SheetDescription>
              <div className="flex flex-col gap-6 pt-10">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <img
                    src={logoKhalij}
                    alt="الخليج تيليكوم"
                    className="h-10 w-10 rounded-full ring-2 ring-primary/40"
                  />
                  <span className="text-base font-extrabold text-primary">
                    الخليج تيليكوم
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = item.to ? pathname === item.to : false;
                    const className = isActive
                      ? "rounded-lg px-3 py-3 text-base font-semibold text-primary bg-secondary"
                      : "rounded-lg px-3 py-3 text-base font-semibold text-foreground/80 hover:bg-secondary hover:text-primary";
                    return item.to ? (
                      <SheetClose key={item.label} asChild>
                        <Link to={item.to} className={className}>
                          {item.label}
                        </Link>
                      </SheetClose>
                    ) : (
                      <SheetClose key={item.label} asChild>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={className}
                        >
                          {item.label}
                        </a>
                      </SheetClose>
                    );
                  })}
                </nav>
                {cta && (
                  <div className="mt-auto border-t border-border pt-4">
                    {cta}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
