-- =============================================
-- Blog System - Webunica.cl
-- EJECUTAR EN: Supabase → SQL Editor → New Query
-- =============================================

-- 1. Crear tabla de categorías
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Crear tabla de posts (con cover_image_alt)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    cover_image_alt TEXT,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE,
    seo_title TEXT,
    seo_description TEXT,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Activar RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de blog_categories
DROP POLICY IF EXISTS "Categories public read" ON public.blog_categories;
CREATE POLICY "Categories public read" 
ON public.blog_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Categories admin write" ON public.blog_categories;
CREATE POLICY "Categories admin write"
ON public.blog_categories FOR ALL USING (auth.role() = 'service_role');

-- 5. Políticas de blog_posts (LECTURA PÚBLICA de posts publicados)
DROP POLICY IF EXISTS "Posts public read" ON public.blog_posts;
CREATE POLICY "Posts public read"
ON public.blog_posts FOR SELECT USING (status = 'published' OR auth.role() = 'service_role');

-- *** POLÍTICA CLAVE: Permite insertar sin autenticación (para el generador de IA) ***
DROP POLICY IF EXISTS "Posts anon insert" ON public.blog_posts;
CREATE POLICY "Posts anon insert"
ON public.blog_posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Posts admin all" ON public.blog_posts;
CREATE POLICY "Posts admin all"
ON public.blog_posts FOR ALL USING (auth.role() = 'service_role');

-- 6. Trigger para updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 7. Categorías iniciales de Webunica
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Shopify Chile', 'shopify-chile', 'Guías para crear y optimizar tiendas Shopify en Chile'),
('Tiendas en Línea', 'tiendas-en-linea', 'Estrategias de ecommerce para vender por internet en Chile'),
('Desarrollo Web', 'desarrollo-web', 'Artículos técnicos sobre Next.js, SaaS y arquitectura web'),
('Diseño Web', 'diseno-web', 'Tendencias y buenas prácticas de diseño web profesional'),
('Páginas Web', 'paginas-web', 'Todo sobre sitios web para empresas chilenas'),
('Web con IA', 'web-ia', 'Inteligencia artificial aplicada al desarrollo y diseño web')
ON CONFLICT (slug) DO NOTHING;
