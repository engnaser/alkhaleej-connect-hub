
CREATE TABLE public.ym_services (
  id TEXT PRIMARY KEY,
  group_key TEXT NOT NULL CHECK (group_key IN ('general','account')),
  icon TEXT NOT NULL DEFAULT 'HelpCircle',
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  code TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.ym_services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ym_services TO authenticated;
GRANT ALL ON public.ym_services TO service_role;

ALTER TABLE public.ym_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read services" ON public.ym_services FOR SELECT USING (true);
CREATE POLICY "Admins can insert services" ON public.ym_services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update services" ON public.ym_services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete services" ON public.ym_services FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.ym_services_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER ym_services_updated_at BEFORE UPDATE ON public.ym_services
FOR EACH ROW EXECUTE FUNCTION public.ym_services_touch_updated_at();

INSERT INTO public.ym_services (id, group_key, icon, title, description, code, sort_order) VALUES
  ('know-number','general','Hash','معرفة الرقم','اعرف رقمك الخاص بشريحة يمن موبايل بسهولة.','*555#',1),
  ('know-balance','general','Wallet','معرفة الرصيد','استعلم عن رصيدك الحالي مباشرة.','*111#',2),
  ('transfer','general','Send','تحويل رصيد','حوّل رصيد إلى رقم آخر بسهولة.','*121#',3),
  ('internet-services','general','Globe2','خدمات الإنترنت','تفعيل وإدارة باقات الإنترنت.','*502#',4),
  ('sms-services','general','MessageSquare','خدمات الرسائل','تفعيل باقات الرسائل القصيرة.','*503#',5),
  ('sim-services','general','CreditCard','خدمات الشرائح','إدارة الشرائح والخدمات المضافة.','*900#',6),
  ('balance-inquiry','account','Wallet','الاستعلام عن الرصيد','اعرف رصيدك الحالي في أي وقت.','*111#',1),
  ('recharge','account','CreditCard','شحن رصيد','اشحن رصيد عبر بطاقة الشحن.','*100*رقم_البطاقة#',2),
  ('transfer-balance','account','RefreshCw','تحويل رصيد','حوّل رصيد إلى رقم آخر.','*121#',3),
  ('usage','account','Gauge','معرفة الاستهلاك','اطلع على استهلاكك من الباقة الحالية.','*112#',4),
  ('support','account','HelpCircle','طلب مساعدة','تواصل معنا عبر واتساب لأي استفسار.',NULL,5),
  ('customer-care','account','PhoneCall','خدمة العملاء','اتصل بخدمة عملاء يمن موبايل.','118',6);
