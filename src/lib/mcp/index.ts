import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import listPackagesTool from "./tools/list-packages";
import exchangeRatesTool from "./tools/exchange-rates";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "alkhaleej-connect-hub-mcp",
  title: "الخليج تيليكوم — MCP",
  version: "0.1.0",
  instructions:
    "أدوات للوصول إلى بيانات تطبيق الخليج تيليكوم: باقات وخدمات يمن موبايل وشركة يو، وأسعار صرف العملات.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServicesTool, listPackagesTool, exchangeRatesTool],
});
