
CREATE TABLE public.you_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.you_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.you_categories TO authenticated;
GRANT ALL ON public.you_categories TO service_role;
ALTER TABLE public.you_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "you_categories public read" ON public.you_categories FOR SELECT USING (true);
CREATE POLICY "you_categories admin insert" ON public.you_categories FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "you_categories admin update" ON public.you_categories FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "you_categories admin delete" ON public.you_categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER you_categories_touch BEFORE UPDATE ON public.you_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.you_packages (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.you_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT '',
  internet TEXT NOT NULL DEFAULT '—',
  minutes TEXT NOT NULL DEFAULT '—',
  sms TEXT NOT NULL DEFAULT '—',
  validity TEXT NOT NULL DEFAULT '',
  network TEXT NOT NULL DEFAULT '4G',
  code TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.you_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.you_packages TO authenticated;
GRANT ALL ON public.you_packages TO service_role;
ALTER TABLE public.you_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "you_packages public read" ON public.you_packages FOR SELECT USING (true);
CREATE POLICY "you_packages admin insert" ON public.you_packages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "you_packages admin update" ON public.you_packages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "you_packages admin delete" ON public.you_packages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX you_packages_category_idx ON public.you_packages(category_id);
CREATE TRIGGER you_packages_touch BEFORE UPDATE ON public.you_packages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
