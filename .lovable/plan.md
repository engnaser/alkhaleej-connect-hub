
## خطة تحسين محركات البحث (SEO) الكاملة

الموقع: **الخليج تيليكوم** — https://alkhaleej-connect-hub.lovable.app

الفحص الحالي يُظهر 9 مشاكل SEO فعلية: لا يوجد `robots.txt`، لا `sitemap.xml`، لا `llms.txt`، ميتاداتا مكررة/إنجليزية في `__root.tsx`، لا روابط canonical، لا Structured Data، وأداء LCP بطيء. الخطة تعالجها كلها بترتيب الأولوية.

---

### المرحلة 1 — أساسيات الفهرسة (Indexing Foundations)

**1. `public/robots.txt`** — السماح للزواحف والإشارة إلى الـ sitemap، مع حظر المسارات الإدارية والداخلية:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /auth
Disallow: /mawloud/settings

Sitemap: https://alkhaleej-connect-hub.lovable.app/sitemap.xml
```

**2. `src/routes/sitemap[.]xml.ts`** — sitemap ديناميكي عبر Server Route، يشمل كل الصفحات العامة فقط:
`/`, `/designs`, `/services`, `/contact`, `/currency-converter`, `/exchange-rates`, `/dial-codes`, `/yemen-mobile`, `/speed-test`, `/whatsapp-bot`, `/whatsapp-unblock`, `/adsl-inquiry`, `/yemen4g-inquiry`, `/bandar-aden-inquiry`, `/phone-bill-inquiry`, `/secondary-certificate`, `/mawloud`, `/my-photos`, `/safety`, `/privacy`, `/terms`.
يُستبعد: `/admin/*`, `/auth`, `/mawloud/settings`.

**3. `public/llms.txt`** — تعريف مختصر بالموقع + قائمة الروابط العامة للمساعدين الذكيين (نفس قائمة sitemap، بالعربية).

---

### المرحلة 2 — تنظيف الميتاداتا الجذرية (`src/routes/__root.tsx`)

- حذف الأسطر الإنجليزية المكررة:
  - `<meta name="description" content="Al-Khaleej Telecom Hub is a professional...">`
  - `<meta property="og:description" content="Al-Khaleej Telecom Hub...">`
  - `<meta name="twitter:description" content="Al-Khaleej Telecom Hub...">`
- الإبقاء فقط على: `charset`, `viewport`, `og:type=website`, `twitter:card`, وأيقونات favicon.
- إضافة `og:site_name = "الخليج تيليكوم"`.
- إبقاء `og:image` **فقط** في المسارات الورقية (كما توصي قواعد TanStack)، لذا سيُنقل من `__root` إلى `/` و`/designs`.

---

### المرحلة 3 — ميتاداتا فريدة لكل صفحة

لكل مسار عام يُضاف داخل `head()`:
- `title` عربي مميّز < 60 حرف
- `description` عربية 120–160 حرف
- `og:title` و`og:description` مطابقان
- `<link rel="canonical" href="https://alkhaleej-connect-hub.lovable.app/<route>">` (على الصفحة الورقية فقط)
- `og:url` بنفس القيمة

جدول العناوين المقترحة:

| المسار | العنوان |
|---|---|
| `/` | الخليج تيليكوم — تصاميم تهاني ومناسبات باسمك |
| `/designs` | قوالب تهاني جاهزة باسمك — الخليج تيليكوم |
| `/services` | خدمات الاتصالات والشحن الإلكتروني — الخليج تيليكوم |
| `/currency-converter` | محوّل العملات اليمنية — أسعار حيّة |
| `/exchange-rates` | أسعار صرف الريال اليمني اليوم |
| `/dial-codes` | مفاتيح الاتصال الدولية لكل دول العالم |
| `/yemen-mobile` | باقات يمن موبايل والأسعار المحدّثة |
| `/speed-test` | فحص سرعة الإنترنت في اليمن |
| `/whatsapp-bot` | بوت واتساب الخليج تيليكوم للطلبات |
| `/whatsapp-unblock` | فك حظر واتساب — دليل خطوة بخطوة |
| `/adsl-inquiry` | استعلام فاتورة ورصيد ADSL يمن نت |
| `/yemen4g-inquiry` | استعلام رصيد يمن 4G |
| `/bandar-aden-inquiry` | استعلام فاتورة بندر عدن |
| `/phone-bill-inquiry` | استعلام فاتورة الهاتف الأرضي |
| `/secondary-certificate` | نتائج الثانوية العامة في اليمن |
| `/mawloud` | تهنئة المولود بتصميم مخصّص |
| `/contact` | تواصل مع الخليج تيليكوم |

---

### المرحلة 4 — البيانات المنظمة (JSON-LD)

في `__root.tsx` تُضاف `Organization` schema مرة واحدة:
- `name`, `url`, `logo`, `sameAs` (روابط التواصل)، `contactPoint` (واتساب 967775608601).

في كل صفحة خدمة (`services`, `adsl-inquiry`, `yemen-mobile`, `speed-test`…) تُضاف `Service` schema.
في `/` تُضاف `WebSite` مع `SearchAction` (SiteLinks Search Box).
في `/contact` تُضاف `LocalBusiness` (إن كان هناك عنوان فعلي).

---

### المرحلة 5 — أداء LCP (Lighthouse)

الفحص أشار إلى بطء ظهور الصورة الأكبر في الصفحة الأولى. التعديلات:
- على صورة البوستر `posterEid` في الـ hero: `fetchpriority="high"`، إزالة `loading="lazy"` (موجود بالفعل — نتحقق)، إضافة `width` و`height` صريحين لمنع CLS.
- في `head()` للصفحة `/` فقط: preload لصورة الـ hero:
  `<link rel="preload" as="image" href="<posterEid>" fetchpriority="high" />`
- إضافة `&display=swap` إلى رابط Google Fonts (موجود بالفعل ✓).
- الاستمرار في WebP الذي فعّلناه سابقاً.

ملاحظة: هذه القياسات مأخوذة من النسخة **المنشورة** — الإصلاح يظهر بعد إعادة النشر.

---

### المرحلة 6 — محتوى جديد يستهدف كلمات ذات حجم بحث

اقتراح Semrush: صفحة `/adsl-guide` — دليل «معرفة رصيد الإنترنت ADSL» (1,300 بحث/شهر). خطوات + لقطات شاشة + روابط resolveInquiry.
هذا يُضاف كاختياري بعد اعتماد الأساسيات.

---

### المرحلة 7 — Google Search Console

بعد نشر التعديلات:
1. ربط موصّل Google Search Console من إعدادات Lovable.
2. توليد رمز التحقق (META)، إضافته إلى `head` في `__root.tsx`.
3. النشر ثم تشغيل verify.
4. إضافة الموقع وتقديم `/sitemap.xml`.

---

### تفاصيل تقنية (للمرجع)

- Sitemap = Server Route TanStack (`createFileRoute("/sitemap.xml")` مع `server.handlers.GET`) يُرجع XML صحيح.
- Canonical في `links` فقط في المسارات الورقية (لا في `__root`) لأن TanStack لا يزيل التكرار في `links`.
- Structured Data تُحقن عبر `head().scripts` من نوع `application/ld+json`.
- كل قيم canonical/og:url مطلقة على النطاق `https://alkhaleej-connect-hub.lovable.app`.

---

### ملخص المخرجات (ملفات ستُنشأ/تُعدّل)

- ➕ `public/robots.txt`
- ➕ `public/llms.txt`
- ➕ `src/routes/sitemap[.]xml.ts`
- ✏️ `src/routes/__root.tsx` — تنظيف + Organization + WebSite JSON-LD + site_name
- ✏️ 17 ملف مسار — `head()` مخصّص + canonical + og:url + JSON-LD لكل خدمة
- ✏️ `src/routes/index.tsx` — preload للـ LCP + أبعاد صريحة على صورة الـ hero

بعد الاعتماد سأنفّذ المراحل 1→5 دفعة واحدة، ثم أعرض عليك المرحلة 6 (المحتوى الجديد) والمرحلة 7 (ربط GSC) بشكل منفصل.
