-- Script de reparación completa para la tabla 'public.leads'
-- Ejecuta esto en el SQL Editor de Supabase

DO $$ 
BEGIN 
    -- Crear tabla si no existe
    CREATE TABLE IF NOT EXISTS public.leads (
        id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL,
        phone TEXT,
        city TEXT,
        project_type TEXT NOT NULL,
        ecommerce_platform TEXT,
        design_level TEXT,
        timeline TEXT,
        budget_estimated NUMERIC,
        source TEXT DEFAULT 'Webunica Website',
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Agregar columnas faltantes si la tabla ya existía
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='city') THEN
        ALTER TABLE public.leads ADD COLUMN city TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='ecommerce_platform') THEN
        ALTER TABLE public.leads ADD COLUMN ecommerce_platform TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='design_level') THEN
        ALTER TABLE public.leads ADD COLUMN design_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='timeline') THEN
        ALTER TABLE public.leads ADD COLUMN timeline TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='budget_estimated') THEN
        ALTER TABLE public.leads ADD COLUMN budget_estimated NUMERIC;
    END IF;

END $$;

-- Refrescar permisos RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts" ON public.leads;
CREATE POLICY "Allow public inserts" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Deny public reads" ON public.leads;
CREATE POLICY "Deny public reads" ON public.leads FOR SELECT USING (false);
