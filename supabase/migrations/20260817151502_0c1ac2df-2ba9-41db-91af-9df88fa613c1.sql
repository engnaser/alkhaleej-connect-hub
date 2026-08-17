CREATE TABLE public.site_service_order (
  service_key TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL DEFAULT 1000,
  hidden BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_service_order TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_service_order TO authenticated;
GRANT ALL ON public.site_service_order TO service_role;
ALTER TABLE public.site_service_order ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service order readable by everyone" ON public.site_service_order FOR SELECT USING (true);
CREATE POLICY "admins manage service order" ON public.site_service_order FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));