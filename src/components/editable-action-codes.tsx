import { useEffect, useState, type ReactNode } from "react";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { PhoneCall, XCircle, Save, RotateCcw, Pencil, X } from "lucide-react";
import { toast } from "sonner";

type Kind = "activate" | "cancel";

const LS_KEY = "you-service-codes-v1";
const PENDING_EVENT = "you-service-codes-pending";
const SAVED_EVENT = "you-service-codes-changed";

// ============ Saved store ============
function readStore(): Record<string, { activate?: string; cancel?: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeStore(v: Record<string, { activate?: string; cancel?: string }>) {
  localStorage.setItem(LS_KEY, JSON.stringify(v));
  window.dispatchEvent(new Event(SAVED_EVENT));
}

// ============ Pending (draft) store — in memory ============
const pending: Record<string, { activate?: string; cancel?: string }> = {};

function setPending(id: string, kind: Kind, value: string) {
  if (!pending[id]) pending[id] = {};
  pending[id][kind] = value;
  window.dispatchEvent(new Event(PENDING_EVENT));
}
function clearPending() {
  for (const k of Object.keys(pending)) delete pending[k];
  window.dispatchEvent(new Event(PENDING_EVENT));
}
function pendingCount() {
  let n = 0;
  for (const id of Object.keys(pending)) {
    if (pending[id].activate !== undefined) n++;
    if (pending[id].cancel !== undefined) n++;
  }
  return n;
}
function commitPending() {
  const s = readStore();
  for (const id of Object.keys(pending)) {
    s[id] = { ...s[id], ...pending[id] };
  }
  writeStore(s);
  clearPending();
}

// ============ Hooks ============
export function useServiceCode(id: string, kind: Kind, defaultCode: string) {
  const [code, setCode] = useState(defaultCode);
  useEffect(() => {
    const load = () => {
      const s = readStore();
      setCode(s[id]?.[kind] ?? defaultCode);
    };
    load();
    window.addEventListener(SAVED_EVENT, load);
    return () => window.removeEventListener(SAVED_EVENT, load);
  }, [id, kind, defaultCode]);
  return code;
}

function toTelHref(code: string) {
  return `tel:${code.replace(/#/g, "%23")}`;
}

// ============ Per-code editable row ============
export function CodeRow({
  id,
  kind,
  defaultCode,
}: {
  id: string;
  kind: Kind;
  defaultCode: string;
}) {

  const { isAdmin } = useIsAdmin();
  const savedCode = useServiceCode(id, kind, defaultCode);
  const [draft, setDraft] = useState(savedCode);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setDraft(savedCode);
  }, [savedCode]);

  useEffect(() => {
    const onPending = () => {
      if (!pending[id] || pending[id][kind] === undefined) setDraft(savedCode);
    };
    window.addEventListener(PENDING_EVENT, onPending);
    return () => window.removeEventListener(PENDING_EVENT, onPending);
  }, [id, kind, savedCode]);

  const isActivate = kind === "activate";
  const Icon = isActivate ? PhoneCall : XCircle;
  const label = isActivate ? "تفعيل" : "إلغاء";
  const btnClass = isActivate
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "bg-destructive text-destructive-foreground hover:bg-destructive/90";

  const activeCode = draft || savedCode;
  const isDirty = draft.trim() !== savedCode;

  if (!isAdmin) {
    return (
      <a
        href={toTelHref(savedCode)}
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
          href={toTelHref(savedCode)}
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
          onChange={(e) => {
            setDraft(e.target.value);
            setPending(id, kind, e.target.value);
          }}
          className="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-1 text-center text-sm font-mono font-bold text-foreground outline-none"
          placeholder="*123#"
        />
        <button
          onClick={() => {
            setDraft(savedCode);
            if (pending[id]) {
              delete pending[id][kind];
              if (!pending[id].activate && !pending[id].cancel) delete pending[id];
              window.dispatchEvent(new Event(PENDING_EVENT));
            }
            setEditing(false);
          }}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
          aria-label="إغلاق"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      {(isDirty || editing) && (
        <button
          onClick={() => {
            const trimmed = draft.trim();
            const s = readStore();
            if (!trimmed) {
              // حذف التخصيص — يعود الكود إلى القيمة الافتراضية
              if (s[id]) {
                delete s[id][kind];
                if (!s[id].activate && !s[id].cancel) delete s[id];
                writeStore(s);
              }
            } else {
              s[id] = { ...s[id], [kind]: trimmed };
              writeStore(s);
            }
            if (pending[id]) {
              delete pending[id][kind];
              if (!pending[id].activate && !pending[id].cancel) delete pending[id];
              window.dispatchEvent(new Event(PENDING_EVENT));
            }
            setEditing(false);
            toast.success(trimmed ? "تم حفظ الكود" : "تم حذف الكود");
          }}
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
        >
          <Save className="h-3.5 w-3.5" />
          حفظ الكود
        </button>
      )}
      <a
        href={toTelHref(activeCode)}
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
}: {
  id: string;
  activateCode: string;
  cancelCode?: string;
  detailsSlot: React.ReactNode;
}) {
  const cols = cancelCode ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className={`mt-auto grid ${cols} gap-2`}>
      <CodeRow id={id} kind="activate" defaultCode={activateCode} />
      {cancelCode && <CodeRow id={id} kind="cancel" defaultCode={cancelCode} />}
      {detailsSlot}
    </div>
  );
}

// ============ Floating global Save bar ============
export function SaveAllCodesBar() {
  const { isAdmin } = useIsAdmin();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const upd = () => setCount(pendingCount());
    upd();
    window.addEventListener(PENDING_EVENT, upd);
    return () => window.removeEventListener(PENDING_EVENT, upd);
  }, []);

  if (!isAdmin || count === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl border border-primary/40 bg-background/95 px-3 py-2 shadow-lg backdrop-blur">
        <span className="text-xs font-bold text-foreground">
          {count} تعديل غير محفوظ
        </span>
        <button
          onClick={() => {
            clearPending();
            toast.info("تم التراجع");
          }}
          className="inline-flex items-center gap-1 rounded-xl border border-border px-2.5 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          تراجع
        </button>
        <button
          onClick={() => {
            commitPending();
            toast.success("تم حفظ جميع الأكواد");
          }}
          className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Save className="h-3.5 w-3.5" />
          حفظ الكل
        </button>
      </div>
    </div>
  );
}

/* =========================================================
 * TemplateRow — editable code template with {placeholders}
 * Used for dynamic-input activate buttons (e.g. *555*{n}#)
 * ========================================================= */

const TPL_LS_KEY = "you-service-templates-v1";

function readTplStore(): Record<string, { activate?: string; cancel?: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(TPL_LS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeTplStore(v: Record<string, { activate?: string; cancel?: string }>) {
  localStorage.setItem(TPL_LS_KEY, JSON.stringify(v));
  window.dispatchEvent(new Event("you-service-templates-changed"));
}

export function useTemplate(id: string, kind: Kind, defaultTpl: string) {
  const [tpl, setTpl] = useState(defaultTpl);
  useEffect(() => {
    const load = () => {
      const s = readTplStore();
      setTpl(s[id]?.[kind] ?? defaultTpl);
    };
    load();
    window.addEventListener("you-service-templates-changed", load);
    return () => window.removeEventListener("you-service-templates-changed", load);
  }, [id, kind, defaultTpl]);
  return tpl;
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
      {(isDirty || editing) && (
        <button
          onClick={() => {
            const trimmed = draft.trim();
            if (!trimmed) {
              toast.error("لا يمكن حفظ قالب فارغ");
              return;
            }
            const s = readTplStore();
            s[id] = { ...s[id], [kind]: trimmed };
            writeTplStore(s);
            setEditing(false);
            toast.success("تم حفظ القالب");
          }}
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-emerald-600 px-2 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
        >
          <Save className="h-3.5 w-3.5" />
          حفظ القالب
        </button>
      )}
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
