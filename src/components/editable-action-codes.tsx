import { useEffect, useState, type ReactNode } from "react";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { PhoneCall, XCircle, Save, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import {
  useOverride,
  setOverride,
  clearOverride,
} from "@/lib/serviceCodeOverridesStore";

type Kind = "activate" | "cancel";

// ============ Hook (cloud-backed) ============
export function useServiceCode(id: string, kind: Kind, defaultCode: string) {
  return useOverride(id, kind, "code", defaultCode);
}

function toTelHref(code: string) {
  return `tel:${code.replace(/#/g, "%23")}`;
}

// ============ Per-code editable row ============
export function CodeRow({
  id,
  kind,
  defaultCode,
  transformCode,
  onActivateClick,
}: {
  id: string;
  kind: Kind;
  defaultCode: string;
  transformCode?: (code: string) => string;
  onActivateClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { isAdmin } = useIsAdmin();
  const savedCode = useServiceCode(id, kind, defaultCode);
  const [draft, setDraft] = useState(savedCode);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(savedCode);
  }, [savedCode]);

  const isActivate = kind === "activate";
  const Icon = isActivate ? PhoneCall : XCircle;
  const label = isActivate ? "تفعيل" : "إلغاء";
  const btnClass = isActivate
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "bg-destructive text-destructive-foreground hover:bg-destructive/90";

  const activeCode = draft || savedCode;
  const isDirty = draft.trim() !== savedCode;
  const savedHref = toTelHref(transformCode ? transformCode(savedCode) : savedCode);
  const activeHref = toTelHref(transformCode ? transformCode(activeCode) : activeCode);

  const doSave = async () => {
    const trimmed = draft.trim();
    setSaving(true);
    try {
      if (!trimmed || trimmed === defaultCode) {
        await clearOverride(id, kind, "code");
        toast.success("تم استعادة الكود الافتراضي");
      } else {
        await setOverride(id, kind, "code", trimmed.slice(0, 32));
        toast.success("تم حفظ الكود سحابياً");
      }
      setEditing(false);
    } catch (e) {
      toast.error(
        "تعذّر حفظ الكود: " + (e instanceof Error ? e.message : String(e)),
      );
    } finally {
      setSaving(false);
    }
  };

  if (!isAdmin) {
    return (
      <a
        href={savedHref}
        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold ${btnClass}`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
    );
  }

  if (!editing && !isDirty) {
    return (
      <div className="relative">
        <a
          href={savedHref}
          className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold ${btnClass}`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
        <button
          onClick={(e) => {
            e.preventDefault();
            setEditing(true);
          }}
          className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-primary"
          aria-label="تعديل الكود"
          title={`تعديل الكود: ${savedCode}`}
        >
          <Pencil className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-1.5 rounded-xl border p-1.5 ${
        isDirty ? "border-amber-500/60 bg-amber-500/5" : "border-primary/40 bg-background"
      }`}
    >
      <div className="flex items-center gap-1">
        <input
          dir="ltr"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-1 text-center text-sm font-mono font-bold text-foreground outline-none"
          placeholder="*123#"
        />
        <button
          onClick={() => {
            setDraft(savedCode);
            setEditing(false);
          }}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
          aria-label="إغلاق"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <button
        onClick={doSave}
        disabled={saving}
        className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        <Save className="h-3.5 w-3.5" />
        {saving ? "جارٍ الحفظ..." : "حفظ الكود"}
      </button>
      <a
        href={activeHref}
        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold ${btnClass}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {label}
      </a>
    </div>
  );
}

export function EditableActionCodes({
  id,
  activateCode,
  cancelCode,
  detailsSlot,
  transformActivate,
}: {
  id: string;
  activateCode: string;
  cancelCode?: string;
  detailsSlot: React.ReactNode;
  transformActivate?: (code: string) => string;
}) {
  const cols = cancelCode ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className={`mt-auto grid ${cols} gap-2`}>
      <CodeRow id={id} kind="activate" defaultCode={activateCode} transformCode={transformActivate} />
      {cancelCode && <CodeRow id={id} kind="cancel" defaultCode={cancelCode} />}
      {detailsSlot}
    </div>
  );
}

// Kept for backwards compat (no longer needed — saves are immediate + cloud)
export function SaveAllCodesBar() {
  return null;
}

/* =========================================================
 * TemplateRow — editable code template with {placeholders}
 * Cloud-backed via service_code_overrides (code_type='template')
 * ========================================================= */

export function useTemplate(id: string, kind: Kind, defaultTpl: string) {
  return useOverride(id, kind, "template", defaultTpl);
}

function resolveTpl(tpl: string, values: Record<string, string>) {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");
}
function hasAllPlaceholders(tpl: string, values: Record<string, string>) {
  const keys = Array.from(tpl.matchAll(/\{(\w+)\}/g)).map((m) => m[1]);
  return keys.every((k) => (values[k] ?? "").length > 0);
}

export function TemplateRow({
  id,
  kind = "activate",
  defaultTemplate,
  values,
  label,
  icon,
  onBeforeCall,
}: {
  id: string;
  kind?: Kind;
  defaultTemplate: string;
  values: Record<string, string>;
  label?: string;
  icon?: ReactNode;
  onBeforeCall?: () => boolean | void;
}) {
  const { isAdmin } = useIsAdmin();
  const savedTpl = useTemplate(id, kind, defaultTemplate);
  const [draft, setDraft] = useState(savedTpl);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(savedTpl);
  }, [savedTpl]);

  const isActivate = kind === "activate";
  const Icon = icon ?? (isActivate ? <PhoneCall className="h-4 w-4" /> : <XCircle className="h-4 w-4" />);
  const lbl = label ?? (isActivate ? "تفعيل" : "إلغاء");
  const btnClass = isActivate
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "bg-destructive text-destructive-foreground hover:bg-destructive/90";

  const ready = hasAllPlaceholders(savedTpl, values);
  const resolved = resolveTpl(savedTpl, values);
  const href = ready ? toTelHref(resolved) : undefined;
  const isDirty = draft.trim() !== savedTpl;

  const handleClick = (e: React.MouseEvent) => {
    if (!ready) {
      e.preventDefault();
      toast.error("يرجى إدخال البيانات المطلوبة");
      return;
    }
    if (onBeforeCall && onBeforeCall() === false) {
      e.preventDefault();
    }
  };

  const doSave = async () => {
    const trimmed = draft.trim();
    setSaving(true);
    try {
      if (!trimmed || trimmed === defaultTemplate) {
        await clearOverride(id, kind, "template");
        toast.success("تم استعادة القالب الافتراضي");
      } else {
        await setOverride(id, kind, "template", trimmed);
        toast.success("تم حفظ القالب سحابياً");
      }
      setEditing(false);
    } catch (e) {
      toast.error(
        "تعذّر حفظ القالب: " + (e instanceof Error ? e.message : String(e)),
      );
    } finally {
      setSaving(false);
    }
  };

  const btn = (
    <a
      href={href}
      onClick={handleClick}
      aria-disabled={!ready}
      className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold ${
        ready ? btnClass : "cursor-not-allowed bg-muted text-muted-foreground"
      }`}
    >
      {Icon}
      {lbl}
    </a>
  );

  if (!isAdmin) return btn;

  if (!editing && !isDirty) {
    return (
      <div className="relative">
        {btn}
        <button
          onClick={(e) => {
            e.preventDefault();
            setEditing(true);
          }}
          className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-primary"
          aria-label="تعديل قالب الكود"
          title={`تعديل القالب: ${savedTpl}`}
        >
          <Pencil className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-1.5 rounded-xl border p-1.5 ${
        isDirty ? "border-amber-500/60 bg-amber-500/5" : "border-primary/40 bg-background"
      }`}
    >
      <div className="flex items-center gap-1">
        <input
          dir="ltr"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-1 text-center text-xs font-mono font-bold text-foreground outline-none"
          placeholder="*123*{n}#"
        />
        <button
          onClick={() => {
            setDraft(savedTpl);
            setEditing(false);
          }}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
          aria-label="إغلاق"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <p className="px-1 text-[10px] leading-tight text-muted-foreground">
        استخدم {"{n}"} أو {"{amt}"} كموضع للإدخال — مثال: *201*{"{n}"}*{"{amt}"}#
      </p>
      <button
        onClick={doSave}
        disabled={saving}
        className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        <Save className="h-3.5 w-3.5" />
        {saving ? "جارٍ الحفظ..." : "حفظ القالب"}
      </button>
      <a
        href={href}
        onClick={handleClick}
        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold ${
          ready ? btnClass : "cursor-not-allowed bg-muted text-muted-foreground"
        }`}
      >
        {Icon}
        {lbl}
      </a>
    </div>
  );
}
