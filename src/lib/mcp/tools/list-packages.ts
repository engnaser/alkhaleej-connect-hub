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
  name: "list_packages",
  title: "قائمة الباقات",
  description: "قراءة باقات يمن موبايل أو يو. اختر provider = 'ym' أو 'you'.",
  inputSchema: {
    provider: z.enum(["ym", "you"]).describe("مزود الخدمة."),
    limit: z.number().int().min(1).max(100).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ provider, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "غير مصادق" }], isError: true };
    }
    const table = provider === "ym" ? "ym_packages" : "you_packages";
    const { data, error } = await supabaseForUser(ctx)
      .from(table)
      .select("*")
      .limit(limit ?? 50);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { items: data ?? [] },
    };
  },
});
