CREATE TABLE public.exchange_rate_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  currency_code TEXT NOT NULL,
  buy NUMERIC(12,2) NOT NULL,
  sell NUMERIC(12,2) NOT NULL,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX exchange_rate_history_lookup_idx
  ON public.exchange_rate_history (city, currency_code, captured_at DESC);

GRANT SELECT ON public.exchange_rate_history TO anon;
GRANT SELECT, INSERT ON public.exchange_rate_history TO authenticated;
GRANT ALL ON public.exchange_rate_history TO service_role;

ALTER TABLE public.exchange_rate_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read exchange rate history"
  ON public.exchange_rate_history FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert exchange rate history"
  ON public.exchange_rate_history FOR INSERT
  TO authenticated WITH CHECK (true);