import { createServerFn } from "@tanstack/react-start";

type ParsedGold = {
  karat: string;
  label: string;
  price_yer: number;
  price_usd: number | null;
  sort_order: number;
};

// Order and labels for karats we care about
const KARAT_MAP: Record<string, { label: string; sort: number }> = {
  "24": { label: "عيار 24", sort: 1 },
  "22": { label: "عيار 22", sort: 2 },
  "21": { label: "عيار 21", sort: 3 },
  "18": { label: "عيار 18", sort: 4 },
  "14": { label: "عيار 14", sort: 5 },
  "9": { label: "عيار 9", sort: 6 },
  pound: { label: "الجنيه الذهب", sort: 7 },
  ounce: { label: "الأونصة", sort: 8 },
};

function parseGoldFromHtml(html: string): ParsedGold[] {
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/);
  if (!tableMatch) return [];
  const rows = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
  const out: ParsedGold[] = [];
  for (const r of rows) {
    const cells = [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map(
      (c) =>
        c[1]
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
    );
    if (cells.length < 2) continue;
    const first = cells[0];
    const priceYerText = cells[1];
    const priceUsdText = cells[2] ?? "";

    let key: string | null = null;
    const karatMatch = first.match(/عيار\s*(\d+)/);
    if (karatMatch) key = karatMatch[1];
    else if (first.includes("الجنيه")) key = "pound";
    else if (first.includes("الأونصة") && !first.includes("دولار")) key = "ounce";

    if (!key || !KARAT_MAP[key]) continue;
    const yer = parseFloat(priceYerText.replace(/[^\d.]/g, ""));
    const usd = parseFloat(priceUsdText.replace(/[^\d.]/g, ""));
    if (!isFinite(yer) || yer <= 0) continue;
    out.push({
      karat: key,
      label: KARAT_MAP[key].label,
      price_yer: yer,
      price_usd: isFinite(usd) && usd > 0 ? usd : null,
      sort_order: KARAT_MAP[key].sort,
    });
  }
  return out;
}

export const syncGoldPrices = createServerFn({ method: "POST" }).handler(
  async () => {
    const res = await fetch("https://gold-price-today.com/yemen", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; KhalijTelecomBot/1.0; +https://alkhaleej-connect-hub.lovable.app)",
        Accept: "text/html",
      },
    });
    if (!res.ok) {
      throw new Error(`فشل جلب أسعار الذهب (HTTP ${res.status})`);
    }
    const html = await res.text();
    const rows = parseGoldFromHtml(html);
    if (rows.length === 0) {
      throw new Error("لم يتم العثور على بيانات أسعار في الصفحة المصدر");
    }
    const now = new Date().toISOString();
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const upsertRows = rows.map((r) => ({
      karat: r.karat,
      label: r.label,
      price_yer: r.price_yer,
      price_usd: r.price_usd,
      source: "gold-price-today.com",
      fetched_at: now,
      sort_order: r.sort_order,
    }));
    const { error } = await supabaseAdmin
      .from("gold_prices")
      .upsert(upsertRows, { onConflict: "karat" });
    if (error) throw new Error(error.message);

    const historyRows = rows.map((r) => ({
      karat: r.karat,
      price_yer: r.price_yer,
      price_usd: r.price_usd,
      captured_at: now,
    }));
    await supabaseAdmin.from("gold_price_history").insert(historyRows);

    return { count: rows.length, fetched_at: now };
  },
);
