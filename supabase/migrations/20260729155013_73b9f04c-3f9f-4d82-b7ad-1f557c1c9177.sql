DROP POLICY IF EXISTS "Allow anonymous inquiries" ON public.inquiries;

CREATE POLICY "Allow anonymous inquiries" ON public.inquiries
  FOR INSERT TO anon
  WITH CHECK (
    length(name) > 0
    AND length(phone) > 0
    AND length(message) > 0
  );