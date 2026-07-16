import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "get_exchange_rates",
  title: "أسعار الصرف",
  description: "قراءة أحدث أسعار صرف العملات المخزنة في التطبيق.",
  inputSchema: {
    currency: z
      .string()
      .optional()
      .describe("رمز العملة (اختياري) مثل USD أو SAR للتصفية."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ currency }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "غير مصادق" }], isError: true };
    }
    let q = supabaseForUser(ctx).from("exchange_rates").select("*");
    if (currency) q = q.eq("currency", currency.toUpperCase());
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { rates: data ?? [] },
    };
  },
});
