
-- 1) Categories table
CREATE TABLE public.ym_categories (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.ym_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ym_categories TO authenticated;
GRANT ALL ON public.ym_categories TO service_role;

ALTER TABLE public.ym_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read categories"
  ON public.ym_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.ym_categories FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories"
  ON public.ym_categories FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories"
  ON public.ym_categories FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2) Packages table
CREATE TABLE public.ym_packages (
  id text PRIMARY KEY,
  category_id text NOT NULL REFERENCES public.ym_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  price text NOT NULL,
  internet text NOT NULL DEFAULT '—',
  minutes text NOT NULL DEFAULT '—',
  sms text NOT NULL DEFAULT '—',
  validity text NOT NULL DEFAULT '',
  network text NOT NULL DEFAULT '4G',
  code text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ym_packages_category_idx ON public.ym_packages(category_id);

GRANT SELECT ON public.ym_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ym_packages TO authenticated;
GRANT ALL ON public.ym_packages TO service_role;

ALTER TABLE public.ym_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read packages"
  ON public.ym_packages FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert packages"
  ON public.ym_packages FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update packages"
  ON public.ym_packages FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete packages"
  ON public.ym_packages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3) Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER ym_categories_set_updated_at
  BEFORE UPDATE ON public.ym_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER ym_packages_set_updated_at
  BEFORE UPDATE ON public.ym_packages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4) Auto-assign admin role to the first user (existing function)
DROP TRIGGER IF EXISTS on_auth_user_created_assign_role ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- 5) Seed default data
INSERT INTO public.ym_categories (id, title, description, sort_order) VALUES
  ('mazaya-4g', 'باقات مزايا فورجي', 'باقات شاملة إنترنت ودقائق ورسائل بسرعة 4G.', 1),
  ('volte', 'باقات فولتي VoLTE', 'باقات مكالمات عالية الجودة عبر شبكة VoLTE.', 2),
  ('tawfeer-4g', 'باقات توفير فورجي', 'باقات اقتصادية بأسعار منخفضة وسرعة 4G.', 3),
  ('net-only-4g', 'باقات نت فقط فورجي', 'باقات إنترنت فقط بدون دقائق أو رسائل.', 4),
  ('sms-only', 'باقات رسائل فقط', 'باقات رسائل قصيرة بأسعار مناسبة.', 5),
  ('mazaya-3g', 'باقات مزايا ثري جي', 'باقات شاملة على شبكة 3G للمناطق غير المغطاة بـ 4G.', 6);

INSERT INTO public.ym_packages (id, category_id, name, price, internet, minutes, sms, validity, network, code, sort_order) VALUES
  ('mazaya-4g-daily-24h', 'mazaya-4g', 'مزايا فورجي اليومية 24 ساعة', '300 ريال', '512 ميجا', '20 دقيقة', '40 رسالة', '24 ساعة', '4G', '*500#', 1),
  ('mazaya-4g-daily-48h', 'mazaya-4g', 'مزايا فورجي اليومية 48 ساعة', '600 ريال', '1 جيجا', '50 دقيقة', '100 رسالة', '48 ساعة', '4G', '*500#', 2),
  ('mazaya-4g-weekly', 'mazaya-4g', 'مزايا فورجي الأسبوعية', '1500 ريال', '2 جيجا', '200 دقيقة', '300 رسالة', '7 أيام', '4G', '*500#', 3),
  ('tawasul-mix-monthly', 'mazaya-4g', 'تواصل مكس الشهرية', '2000 ريال', '—', '1000 دقيقة', '500 رسالة', '30 يوم', '4G', '*500#', 4),
  ('super-forge-monthly', 'mazaya-4g', 'سوبر فورجي الشهرية', '2000 ريال', '1 جيجا ثري جي + 2 جيجا فورجي', '250 دقيقة', '250 رسالة', '30 يوم', '4G / 3G', '*500#', 5),
  ('tawasul-monthly', 'mazaya-4g', 'تواصل الشهرية', '1500 ريال', '—', '600 دقيقة', '600 رسالة', '30 يوم', '4G', '*500#', 6),
  ('mazaya-4g-monthly', 'mazaya-4g', 'مزايا فورجي الشهرية', '2500 ريال', '4 جيجا', '300 دقيقة', '350 رسالة', '30 يوم', '4G', '*500#', 7),
  ('mazaya-max-forge', 'mazaya-4g', 'مزايا ماكس فورجي', '4000 ريال', '4 جيجا', '1100 دقيقة', '600 رسالة', '30 يوم', '4G', '*500#', 8),
  ('mazaya-business-forge', 'mazaya-4g', 'مزايا أعمال فورجي الشهرية', '5000 ريال', '6 جيجا', '1500 دقيقة', '1000 رسالة', '30 يوم', '4G', '*500#', 9),
  ('volte-300', 'volte', 'فولتي 300', '300 ريال', '—', '60 دقيقة VoLTE', '—', '7 أيام', 'VoLTE', '*505#', 1),
  ('volte-700', 'volte', 'فولتي 700', '700 ريال', '—', '200 دقيقة VoLTE', '—', '30 يوم', 'VoLTE', '*505#', 2),
  ('tawfeer-200', 'tawfeer-4g', 'توفير 200', '200 ريال', '300 ميجا', '15 دقيقة', '15 رسالة', '3 أيام', '4G', '*501#', 1),
  ('tawfeer-400', 'tawfeer-4g', 'توفير 400', '400 ريال', '700 ميجا', '30 دقيقة', '30 رسالة', '7 أيام', '4G', '*501#', 2),
  ('net-1gb', 'net-only-4g', 'نت 1 جيجا', '300 ريال', '1 جيجا', '—', '—', '7 أيام', '4G', '*502#', 1),
  ('net-5gb', 'net-only-4g', 'نت 5 جيجا', '1200 ريال', '5 جيجا', '—', '—', '30 يوم', '4G', '*502#', 2),
  ('net-10gb', 'net-only-4g', 'نت 10 جيجا', '2200 ريال', '10 جيجا', '—', '—', '30 يوم', '4G', '*502#', 3),
  ('sms-100', 'sms-only', 'رسائل 100', '100 ريال', '—', '—', '100 رسالة', '7 أيام', '3G', '*503#', 1),
  ('sms-500', 'sms-only', 'رسائل 500', '400 ريال', '—', '—', '500 رسالة', '30 يوم', '3G', '*503#', 2),
  ('mazaya-3g-500', 'mazaya-3g', 'مزايا 3G 500', '500 ريال', '500 ميجا', '30 دقيقة', '30 رسالة', '7 أيام', '3G', '*504#', 1),
  ('mazaya-3g-1000', 'mazaya-3g', 'مزايا 3G 1000', '1000 ريال', '1.5 جيجا', '60 دقيقة', '60 رسالة', '15 يوم', '3G', '*504#', 2);
