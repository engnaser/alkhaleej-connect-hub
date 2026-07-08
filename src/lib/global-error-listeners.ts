import { reportLovableError } from "./lovable-error-reporting";

let installed = false;

export function installGlobalErrorListeners() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    const err = event.error ?? new Error(event.message || "window.onerror");
    console.error("[global.error]", err);
    reportLovableError(err, { boundary: "window_onerror", filename: event.filename });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    console.error("[global.unhandledrejection]", reason);
    reportLovableError(reason, { boundary: "unhandled_promise_rejection" });
  });
}
