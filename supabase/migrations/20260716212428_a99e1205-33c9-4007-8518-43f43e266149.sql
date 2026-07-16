
CREATE TABLE public.sabafon_categories (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sabafon_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sabafon_categories TO authenticated;
GRANT ALL ON public.sabafon_categories TO service_role;
ALTER TABLE public.sabafon_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sabafon_categories public read" ON public.sabafon_categories FOR SELECT USING (true);
CREATE POLICY "sabafon_categories admin insert" ON public.sabafon_categories FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "sabafon_categories admin update" ON public.sabafon_categories FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "sabafon_categories admin delete" ON public.sabafon_categories FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));

CREATE TABLE public.sabafon_packages (
  id text PRIMARY KEY,
  category_id text NOT NULL REFERENCES public.sabafon_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  price text NOT NULL DEFAULT '',
  internet text NOT NULL DEFAULT '—',
  minutes text NOT NULL DEFAULT '—',
  sms text NOT NULL DEFAULT '—',
  validity text NOT NULL DEFAULT '',
  network text NOT NULL DEFAULT '4G',
  code text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sabafon_packages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sabafon_packages TO authenticated;
GRANT ALL ON public.sabafon_packages TO service_role;
ALTER TABLE public.sabafon_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sabafon_packages public read" ON public.sabafon_packages FOR SELECT USING (true);
CREATE POLICY "sabafon_packages admin insert" ON public.sabafon_packages FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "sabafon_packages admin update" ON public.sabafon_packages FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "sabafon_packages admin delete" ON public.sabafon_packages FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));

CREATE TABLE public.sabafon_services_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  title text NOT NULL,
  description text,
  code text,
  price text,
  icon text NOT NULL DEFAULT 'HelpCircle',
  deactivation_code text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sabafon_services_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sabafon_services_items TO authenticated;
GRANT ALL ON public.sabafon_services_items TO service_role;
ALTER TABLE public.sabafon_services_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sabafon_services_items readable by everyone" ON public.sabafon_services_items FOR SELECT USING (true);
CREATE POLICY "admins manage sabafon_services_items" ON public.sabafon_services_items FOR ALL TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
