
CREATE TABLE public.template_layouts (
  template_id TEXT PRIMARY KEY,
  layout JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.template_layouts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.template_layouts TO authenticated;
GRANT ALL ON public.template_layouts TO service_role;

ALTER TABLE public.template_layouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read template layouts" ON public.template_layouts FOR SELECT USING (true);
CREATE POLICY "Admins can insert template layouts" ON public.template_layouts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update template layouts" ON public.template_layouts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete template layouts" ON public.template_layouts FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TRIGGER template_layouts_updated_at BEFORE UPDATE ON public.template_layouts
FOR EACH ROW EXECUTE FUNCTION public.ym_services_touch_updated_at();
