import { createClient } from '@supabase/supabase-js';

/**
 * Cliente de Supabase con privilegios de Administrador (Bypasea RLS)
 * SOLO usar en rutas de servidor/APIs protegidas (como Webhooks)
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
