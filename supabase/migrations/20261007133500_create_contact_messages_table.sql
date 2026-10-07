-- Supabase PostgreSQL Migration: Create contact_messages table
-- Project: bcehjzwewfwoalrcuvba

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public submission via contact form
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert on contact_messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Allow service role full access
DROP POLICY IF EXISTS "Allow service role full access on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow service role full access on contact_messages"
  ON public.contact_messages
  FOR ALL
  USING (true)
  WITH CHECK (true);
