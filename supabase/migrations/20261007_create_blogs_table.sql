-- Supabase PostgreSQL Migration: Create blogs table
-- Project: bcehjzwewfwoalrcuvba

CREATE TABLE IF NOT EXISTS public.blogs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'DEEP DIVE',
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  date TEXT NOT NULL,
  categories TEXT[] DEFAULT ARRAY['Backend']::TEXT[],
  read_time TEXT DEFAULT '5 min read',
  content TEXT DEFAULT '',
  sections JSONB DEFAULT '{}'::jsonb,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  author JSONB DEFAULT '{"name": "Santusht Kotai", "url": "https://santusht.online"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast queries and filtering
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON public.blogs (is_published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_categories ON public.blogs USING GIN (categories);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Public can read all published blogs
DROP POLICY IF EXISTS "Public can view published blogs" ON public.blogs;
CREATE POLICY "Public can view published blogs"
  ON public.blogs
  FOR SELECT
  USING (is_published = true);

-- Service role / authenticated can manage all blogs
DROP POLICY IF EXISTS "Service role full access on blogs" ON public.blogs;
CREATE POLICY "Service role full access on blogs"
  ON public.blogs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Atomic RPC function to increment views
CREATE OR REPLACE FUNCTION public.increment_blog_views(blog_slug TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_views INTEGER;
BEGIN
  UPDATE public.blogs
  SET views = COALESCE(views, 0) + 1,
      updated_at = NOW()
  WHERE id = blog_slug
  RETURNING views INTO new_views;
  
  RETURN new_views;
END;
$$;

-- Atomic RPC function to increment likes
CREATE OR REPLACE FUNCTION public.increment_blog_likes(blog_slug TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_likes INTEGER;
BEGIN
  UPDATE public.blogs
  SET likes = COALESCE(likes, 0) + 1,
      updated_at = NOW()
  WHERE id = blog_slug
  RETURNING likes INTO new_likes;
  
  RETURN new_likes;
END;
$$;
