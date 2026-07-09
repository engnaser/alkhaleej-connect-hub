ALTER TABLE public.gold_prices ADD COLUMN IF NOT EXISTS city text NOT NULL DEFAULT 'صنعاء';
ALTER TABLE public.gold_prices ALTER COLUMN city DROP DEFAULT;
ALTER TABLE public.gold_prices DROP CONSTRAINT IF EXISTS gold_prices_karat_key;
ALTER TABLE public.gold_prices ADD CONSTRAINT gold_prices_karat_city_key UNIQUE (karat, city);

ALTER TABLE public.gold_price_history ADD COLUMN IF NOT EXISTS city text NOT NULL DEFAULT 'صنعاء';
ALTER TABLE public.gold_price_history ALTER COLUMN city DROP DEFAULT;
CREATE INDEX IF NOT EXISTS gold_price_history_karat_city_captured_idx
  ON public.gold_price_history (karat, city, captured_at DESC);