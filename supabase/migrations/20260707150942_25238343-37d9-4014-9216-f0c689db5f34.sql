
DROP POLICY IF EXISTS "Authenticated can insert exchange rates" ON public.exchange_rates;
DROP POLICY IF EXISTS "Authenticated can update exchange rates" ON public.exchange_rates;
DROP POLICY IF EXISTS "Authenticated can delete exchange rates" ON public.exchange_rates;
DROP POLICY IF EXISTS "Authenticated can insert exchange rate history" ON public.exchange_rate_history;

CREATE POLICY "Admins can insert exchange rates" ON public.exchange_rates
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update exchange rates" ON public.exchange_rates
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete exchange rates" ON public.exchange_rates
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert exchange rate history" ON public.exchange_rate_history
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
