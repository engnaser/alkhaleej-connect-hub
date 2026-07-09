import { createServerFn } from "@tanstack/react-start";

type ParsedGold = {
  karat: string;
  label: string;
  price_usd: number;
  sort_order: number;
};

const KARAT_MAP: Record<string, { label: string; sort: number }> = {
  "24": { label: "عيار 24", sort: 1 },
  "22": { label: "عيار 22", sort: 2 },
  "21": { label: "عيار 21", sort: 3 },
  "18": { label: "عيار 18", sort: 4 },
  "14": { label: "عيار 14", sort: 5 },
  pound: { label: "الجنيه الذهب (8 جرام)", sort: 6 },
  ounce: { label: "الأونصة", sort: 7 },
};

const CITIES: { name: string; currency: string }[] = [
  { name: "صنعاء", currency: "USD" },
  { name: "عدن", currency: "USD" },
];

// Parse the divTable structure from gold-price-yemen.com
function parseGoldFromHtml(html: string): ParsedGold[] {
  // Extract all rows (divTableRow) → cells
  const rowRegex = /<div[^>]*class="[^"]*divTableRow[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
  // Fallback: match by extracting cells globally per row split
  const cellsPerRow: string[][] = [];
  const rowSplit = html.split(/<div[^>]*class="[^"]*divTableRow[^"]*"[^>]*>/);
  for (let i = 1; i < rowSplit.length; i++) {
    const chunk = rowSplit[i];
    const cells = [...chunk.matchAll(/<div[^>]*class="[^"]*divTableCell[^"]*"[^>]*>([\s\S]*?)<\/div>/g)]
      .map((m) =>
        m[1]
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      );
    if (cells.length) cellsPerRow.push(cells);
  }

  const map = new Map<string, ParsedGold>();
  const put = (key: string, usd: number) => {
    if (!KARAT_MAP[key] || !isFinite(usd) || usd <= 0) return;
    if (map.has(key)) return;
    map.set(key, {
      karat: key,
      label: KARAT_MAP[key].label,
      price_usd: usd,
      sort_order: KARAT_MAP[key].sort,
    });
  };

  for (const cells of cellsPerRow) {
    if (cells.length < 3) continue;
    const first = cells[0];
    const usdRaw = cells[2];
    const usd = parseFloat(usdRaw.replace(/[^\d.]/g, ""));
    if (!isFinite(usd) || usd <= 0) continue;

    const km = first.match(/عيار\s*(\d+)/);
    if (km && KARAT_MAP[km[1]]) {
      put(km[1], usd);
      continue;
    }
    if (first.includes("جنية الذهب") || first.includes("جنيه الذهب")) {
      if (first.includes("عيار 21")) put("pound", usd);
      continue;
    }
    if (first.includes("أونصة") && first.includes("بيع")) {
      put("ounce", usd);
      continue;
    }
  }

  return [...map.values()].sort((a, b) => a.sort_order - b.sort_order);
}

export const syncGoldPrices = createServerFn({ method: "POST" }).handler(
  async () => {
    const res = await fetch("https://gold-price-yemen.com/", {
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

    // Load USD rates per city from exchange_rates
    const { data: fx, error: fxErr } = await supabaseAdmin
      .from("exchange_rates")
      .select("city, currency_code, sell")
      .eq("currency_code", "USD");
    if (fxErr) throw new Error(fxErr.message);

    const usdRateByCity = new Map<string, number>();
    for (const r of fx ?? []) {
      const sell = typeof r.sell === "string" ? parseFloat(r.sell) : Number(r.sell);
      if (isFinite(sell) && sell > 0) usdRateByCity.set(r.city as string, sell);
    }

    const upsertRows: Array<{
      karat: string;
      label: string;
      city: string;
      price_yer: number;
      price_usd: number;
      source: string;
      fetched_at: string;
      sort_order: number;
    }> = [];
    const historyRows: Array<{
      karat: string;
      city: string;
      price_yer: number;
      price_usd: number;
      captured_at: string;
    }> = [];

    for (const c of CITIES) {
      const rate = usdRateByCity.get(c.name);
      if (!rate) continue;
      for (const r of rows) {
        const yer = Math.round(r.price_usd * rate);
        upsertRows.push({
          karat: r.karat,
          label: r.label,
          city: c.name,
          price_yer: yer,
          price_usd: r.price_usd,
          source: "gold-price-yemen.com",
          fetched_at: now,
          sort_order: r.sort_order,
        });
        historyRows.push({
          karat: r.karat,
          city: c.name,
          price_yer: yer,
          price_usd: r.price_usd,
          captured_at: now,
        });
      }
    }

    if (upsertRows.length === 0) {
      throw new Error(
        "لا توجد أسعار صرف للدولار في قاعدة البيانات — يرجى تزامن أسعار الصرف أولاً.",
      );
    }

    const { error } = await supabaseAdmin
      .from("gold_prices")
      .upsert(upsertRows, { onConflict: "karat,city" });
    if (error) throw new Error(error.message);

    await supabaseAdmin.from("gold_price_history").insert(historyRows);

    return { count: upsertRows.length, fetched_at: now, cities: CITIES.map((c) => c.name) };
  },
);
