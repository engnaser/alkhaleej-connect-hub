ALTER TABLE public.you_services_items
  ADD COLUMN IF NOT EXISTS icon text NOT NULL DEFAULT 'HelpCircle',
  ADD COLUMN IF NOT EXISTS deactivation_code text;