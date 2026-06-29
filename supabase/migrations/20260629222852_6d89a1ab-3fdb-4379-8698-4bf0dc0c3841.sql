CREATE TABLE public.exchange_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  currency_code TEXT NOT NULL,
  currency_name TEXT NOT NULL,
  buy NUMERIC(12,2) NOT NULL,
  sell NUMERIC(12,2) NOT NULL,
  source TEXT NOT NULL DEFAULT 'ye-rial.com',
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (city, currency_code)
);

GRANT SELECT ON public.exchange_rates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.exchange_rates TO authenticated;
GRANT ALL ON public.exchange_rates TO service_role;

ALTER TABLE public.exchange_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read exchange rates"
  ON public.exchange_rates FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert exchange rates"
  ON public.exchange_rates FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can update exchange rates"
  ON public.exchange_rates FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete exchange rates"
  ON public.exchange_rates FOR DELETE
  TO authenticated USING (true);

CREATE TRIGGER set_exchange_rates_updated_at
  BEFORE UPDATE ON public.exchange_rates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();