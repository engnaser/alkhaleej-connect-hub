
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.you_services_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('packages','services','account','internet')),
  title TEXT NOT NULL,
  description TEXT,
  code TEXT,
  price TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.you_services_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.you_services_items TO authenticated;
GRANT ALL ON public.you_services_items TO service_role;

ALTER TABLE public.you_services_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "you_services_items readable by everyone"
ON public.you_services_items FOR SELECT USING (true);

CREATE POLICY "admins manage you_services_items"
ON public.you_services_items FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_you_services_items_updated_at
BEFORE UPDATE ON public.you_services_items
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX you_services_items_section_sort_idx
ON public.you_services_items (section, sort_order);
