-- Migración para hacer el campo email opcional en la tabla leads
-- Esto permite capturar leads rápidos vía WhatsApp sin obligar a dejar el correo.

ALTER TABLE public.leads ALTER COLUMN email DROP NOT NULL;
