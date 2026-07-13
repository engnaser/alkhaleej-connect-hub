import { useEffect, useState } from "react";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { PhoneCall, XCircle, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

type Kind = "activate" | "cancel";

const LS_KEY = "you-service-codes-v1";

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
  window.dispatchEvent(new Event("you-service-codes-changed"));
}

export function useServiceCode(id: string, kind: Kind, defaultCode: string) {
  const [code, setCode] = useState(defaultCode);
  useEffect(() => {
    const load = () => {
      const s = readStore();
      setCode(s[id]?.[kind] ?? defaultCode);
    };
    load();
    window.addEventListener("you-service-codes-changed", load);
    return () => window.removeEventListener("you-service-codes-changed", load);
  }, [id, kind, defaultCode]);
  return code;
}

function toTelHref(code: string) {
  // encode * and # for tel: URIs
  return `tel:${code.replace(/#/g, "%23")}`;
}

function CodeButton({
  id,
  kind,
  defaultCode,
}: {
  id: string;
  kind: Kind;
  defaultCode: string;
}) {
  const { isAdmin } = useIsAdmin();
  const code = useServiceCode(id, kind, defaultCode);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(code);

  useEffect(() => setDraft(code), [code]);

  const isActivate = kind === "activate";
  const Icon = isActivate ? PhoneCall : XCircle;
  const label = isActivate ? "تفعيل" : "إلغاء التفعيل";
  const btnClass = isActivate
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "bg-destructive text-destructive-foreground hover:bg-destructive/90";

  const save = () => {
    const clean = draft.trim();
    if (!clean) {
      toast.error("الكود لا يمكن أن يكون فارغاً");
      return;
    }
    const s = readStore();
    s[id] = { ...s[id], [kind]: clean };
    writeStore(s);
    toast.success("تم حفظ الكود");
    setEditing(false);
  };

  const reset = () => {
    const s = readStore();
    if (s[id]) {
      delete s[id][kind];
      if (!s[id].activate && !s[id].cancel) delete s[id];
      writeStore(s);
    }
    setDraft(defaultCode);
    setEditing(false);
    toast.success("تمت الاستعادة إلى الافتراضي");
  };

  if (editing) {
    return (
      <div className="col-span-1 flex items-center gap-1 rounded-xl border border-primary/40 bg-background p-1">
        <input
          dir="ltr"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-1.5 text-sm font-mono font-bold text-foreground outline-none"
          placeholder="*123#"
        />
        <button
          onClick={save}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="حفظ"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => {
            setDraft(code);
            setEditing(false);
          }}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
          aria-label="إلغاء"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        {code !== defaultCode && (
          <button
            onClick={reset}
            className="shrink-0 rounded-lg px-1.5 text-[10px] font-bold text-muted-foreground hover:text-primary"
          >
            استعادة
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <a
        href={toTelHref(code)}
        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold ${btnClass}`}
      >
        <Icon className="h-4 w-4" />
        {label}
      </a>
      {isAdmin && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setEditing(true);
          }}
          className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-primary"
          aria-label="تعديل الكود"
          title={`تعديل الكود: ${code}`}
        >
          <Pencil className="h-3 w-3" />
        </button>
      )}
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
      <CodeButton id={id} kind="activate" defaultCode={activateCode} />
      {cancelCode && (
        <CodeButton id={id} kind="cancel" defaultCode={cancelCode} />
      )}
      {detailsSlot}
    </div>
  );
}
