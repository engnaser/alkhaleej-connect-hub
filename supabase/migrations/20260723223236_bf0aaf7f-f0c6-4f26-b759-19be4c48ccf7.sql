
CREATE TABLE public.service_code_overrides (
  service_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('activate','cancel')),
  code_type TEXT NOT NULL CHECK (code_type IN ('code','template')),
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  PRIMARY KEY (service_id, kind, code_type)
);

GRANT SELECT ON public.service_code_overrides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.service_code_overrides TO authenticated;
GRANT ALL ON public.service_code_overrides TO service_role;

ALTER TABLE public.service_code_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view service code overrides"
  ON public.service_code_overrides FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert service code overrides"
  ON public.service_code_overrides FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update service code overrides"
  ON public.service_code_overrides FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete service code overrides"
  ON public.service_code_overrides FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.service_code_overrides;
