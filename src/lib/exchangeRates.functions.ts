import { createServerFn } from "@tanstack/react-start";

type ParsedRate = {
  city: string;
  currency_code: string;
  currency_name: string;
  buy: number;
  sell: number;
};

const CITY_KEYWORDS = ["صنعاء", "عدن", "حضرموت", "مأرب", "تعز", "المكلا", "الحديدة", "إب"];

function parseRatesFromHtml(html: string): ParsedRate[] {
  const rates: ParsedRate[] = [];
  const cityAlt = CITY_KEYWORDS.join("|");
  const sectionRegex = new RegExp(
    `<h[1-6][^>]*>([^<]*?(?:${cityAlt})[^<]*?)</h[1-6]>([\\s\\S]*?)(?=<h[1-6]|$)`,
    "g",
  );
  let m: RegExpExecArray | null;
  while ((m = sectionRegex.exec(html)) !== null) {
    const heading = m[1];
    const body = m[2];
    const city = CITY_KEYWORDS.find((c) => heading.includes(c));
    if (!city) continue;
    const tableMatch = body.match(/<table[^>]*>([\s\S]*?)<\/table>/);
    if (!tableMatch) continue;
    const rowMatches = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)];
    for (const r of rowMatches) {
      const cells = [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) =>
        c[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      );
      if (cells.length < 3) continue;
      const codeMatch = cells[0].match(/\(([A-Z]{3})\)/);
      if (!codeMatch) continue;
      const code = codeMatch[1];
      const name = cells[0].replace(/\([A-Z]{3}\)/, "").replace(/\s+/g, " ").trim();
      const buy = parseFloat(cells[1].replace(/,/g, ""));
      const sell = parseFloat(cells[2].replace(/,/g, ""));
      if (!isFinite(buy) || !isFinite(sell)) continue;
      rates.push({ city, currency_code: code, currency_name: name, buy, sell });
    }
  }
  return rates;
}

export const syncExchangeRates = createServerFn({ method: "POST" }).handler(async () => {
  const res = await fetch("https://ye-rial.com/", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; KhalijTelecomBot/1.0; +https://alkhaleej-connect-hub.lovable.app)",
      Accept: "text/html",
    },
  });
  if (!res.ok) {
    throw new Error(`فشل جلب البيانات من ye-rial.com (HTTP ${res.status})`);
  }
  const html = await res.text();
  const rates = parseRatesFromHtml(html);
  if (rates.length === 0) {
    throw new Error("لم يتم العثور على أسعار في الصفحة المصدر");
  }
  const now = new Date().toISOString();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const rows = rates.map((r) => ({
    city: r.city,
    currency_code: r.currency_code,
    currency_name: r.currency_name,
    buy: r.buy,
    sell: r.sell,
    source: "ye-rial.com",
    fetched_at: now,
  }));
  const { error } = await supabaseAdmin
    .from("exchange_rates")
    .upsert(rows, { onConflict: "city,currency_code" });
  if (error) throw new Error(error.message);
  // Append a history snapshot for charting recent changes
  const historyRows = rates.map((r) => ({
    city: r.city,
    currency_code: r.currency_code,
    buy: r.buy,
    sell: r.sell,
    captured_at: now,
  }));
  await supabaseAdmin.from("exchange_rate_history").insert(historyRows);
  return { count: rows.length, fetched_at: now };
});
