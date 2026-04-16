-- Ejecutar este comando en el SQL Editor de Supabase para corregir el error de la columna 'city'
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leads' AND column_name='city') THEN
        ALTER TABLE public.leads ADD COLUMN city TEXT;
    END IF;
END $$;

-- Asegurarse de que el cache de PostgREST se refresque (esto sucede automáticamente al alterar la tabla)
-- Pero por si acaso, puedes intentar hacer un cambio sutil o simplemente ejecutar esto.
COMMENT ON COLUMN public.leads.city IS 'Ciudad del prospecto';
