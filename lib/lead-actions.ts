'use server';

import { supabase } from '@/lib/supabase/client';

export async function createLead(leadData: {
  name: string;
  email: string;
  phone: string;
  city: string;
  project_type: string;
  source?: string;
}) {
  if (!supabase) {
    return { success: false, error: 'DB no disponible' };
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        city: leadData.city,
        project_type: leadData.project_type,
        source: leadData.source || 'Modal de Contacto',
        status: 'new'
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('[createLead] Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, lead: data };
}
