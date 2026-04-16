-- Archivo SQL para ejecutar en el Editor SQL de Supabase (Webunica Leads)

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
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configurar reglas de seguridad de nivel de fila (RLS)
-- Permitimos a invitados (anon) INSERTAR leads, pero no LEERLOS.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.leads
    FOR INSERT 
    WITH CHECK (true);

-- Solo los administradores (o nadie desde el cliente anonimo) pueden leer
CREATE POLICY "Deny public reads" ON public.leads
    FOR SELECT 
    USING (false);
