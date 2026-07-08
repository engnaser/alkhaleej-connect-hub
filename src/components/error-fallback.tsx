import { Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

type Props = {
  error: Error;
  reset: () => void;
  title?: string;
  description?: string;
  boundary?: string;
};

export function ErrorFallback({
  error,
  reset,
  title = "تعذر تحميل هذا القسم",
  description = "حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى أو العودة للرئيسية.",
  boundary = "route_error_component",
}: Props) {
  const router = useRouter();

  useEffect(() => {
    console.error(`[${boundary}]`, error);
    reportLovableError(error, { boundary });
  }, [error, boundary]);

  return (
    <div
      dir="rtl"
      className="flex min-h-[50vh] items-center justify-center px-4 py-12"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md text-center">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {import.meta.env.DEV && error?.message ? (
          <pre className="mt-4 max-h-40 overflow-auto rounded bg-muted p-3 text-left text-xs text-muted-foreground">
            {error.message}
          </pre>
        ) : null}
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
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NotFoundFallback({
  title = "الصفحة غير موجودة",
  description = "الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.",
}: {
  title?: string;
  description?: string;
} = {}) {
  return (
    <div dir="rtl" className="flex min-h-[50vh] items-center justify-center px-4 py-12">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
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
