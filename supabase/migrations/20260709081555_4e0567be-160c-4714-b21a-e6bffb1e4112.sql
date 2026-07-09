
CREATE TABLE public.gold_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  karat text NOT NULL UNIQUE,
  label text NOT NULL,
  price_yer numeric NOT NULL,
  price_usd numeric,
  source text NOT NULL DEFAULT 'gold-price-today.com',
  fetched_at timestamptz NOT NULL DEFAULT now(),
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gold_prices TO anon, authenticated;
GRANT ALL ON public.gold_prices TO service_role;

ALTER TABLE public.gold_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gold prices"
  ON public.gold_prices FOR SELECT
  USING (true);

CREATE POLICY "Admins manage gold prices"
  ON public.gold_prices FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER gold_prices_touch_updated_at
  BEFORE UPDATE ON public.gold_prices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.gold_price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  karat text NOT NULL,
  price_yer numeric NOT NULL,
  price_usd numeric,
  captured_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX gold_price_history_karat_captured_idx
  ON public.gold_price_history (karat, captured_at DESC);

GRANT SELECT ON public.gold_price_history TO anon, authenticated;
GRANT ALL ON public.gold_price_history TO service_role;

ALTER TABLE public.gold_price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gold history"
  ON public.gold_price_history FOR SELECT
  USING (true);

CREATE POLICY "Admins manage gold history"
  ON public.gold_price_history FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
