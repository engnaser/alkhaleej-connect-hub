DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;

CREATE POLICY "Anyone can insert valid analytics events"
ON public.analytics_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  event_type IS NOT NULL
  AND length(event_type) BETWEEN 1 AND 100
  AND session_id IS NOT NULL
  AND length(session_id) BETWEEN 1 AND 200
  AND (path IS NULL OR length(path) <= 500)
  AND (referrer IS NULL OR length(referrer) <= 1000)
  AND (user_agent IS NULL OR length(user_agent) <= 1000)
);