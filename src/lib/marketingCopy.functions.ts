import { createServerFn } from "@tanstack/react-start";

export type MarketingInput = {
  product: string;
  audience?: string;
  tone?: string;
  platform?: string;
  offer?: string;
  language?: string;
};

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

function buildPrompt(d: MarketingInput) {
  const platform = d.platform || "واتساب وسوشيال ميديا";
  const tone = d.tone || "جذاب واحترافي";
  const audience = d.audience || "الجمهور العام";
  const language = d.language || "العربية";
  const offer = d.offer ? `\nالعرض/الميزة الخاصة: ${d.offer}` : "";
  return `اكتب 3 نصوص إعلانية تسويقية جذابة باللغة ${language} للمنتج/الخدمة التالية، جاهزة للنشر على ${platform}.

المنتج/الخدمة: ${d.product}
الجمهور المستهدف: ${audience}
النبرة المطلوبة: ${tone}${offer}

المتطلبات:
- كل نص مختصر (3-6 أسطر) وقابل للنسخ مباشرة.
- ابدأ بجملة صادمة أو سؤال يجذب الانتباه.
- استخدم إيموجي مناسبة بشكل معتدل.
- اختم بدعوة واضحة لاتخاذ إجراء (CTA).
- أضف 5-8 هاشتاقات مناسبة في نهاية كل نص.

اعرض النتيجة بهذا التنسيق بالضبط:

### النص 1 (نبرة قصيرة ومباشرة)
<النص>

### النص 2 (نبرة عاطفية)
<النص>

### النص 3 (نبرة عرض/تخفيض)
<النص>`;
}

export const generateMarketingCopy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const d = input as MarketingInput;
    if (!d || typeof d.product !== "string" || !d.product.trim()) {
      throw new Error("الرجاء إدخال اسم المنتج أو الخدمة");
    }
    return d;
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("مفتاح الذكاء الاصطناعي غير مهيأ");

    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "أنت خبير كتابة محتوى تسويقي عربي متمكن، تكتب نصوصًا إعلانية قصيرة، مقنعة، وجاهزة للنشر مباشرة.",
          },
          { role: "user", content: buildPrompt(data) },
        ],
      }),
    });

    if (res.status === 429) {
      throw new Error("تم تجاوز الحد المسموح مؤقتًا. حاول بعد قليل.");
    }
    if (res.status === 402) {
      throw new Error("انتهت رصيدة الذكاء الاصطناعي. يرجى التواصل مع الدعم.");
    }
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`فشل توليد المحتوى: ${res.status} ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!content) throw new Error("لم يتم استلام محتوى من النموذج");
    return { content };
  });
