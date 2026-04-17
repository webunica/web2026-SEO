import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callFlowAPI } from '@/lib/flow';

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    const baseUrl = new URL(request.url).origin;
    return NextResponse.redirect(`${baseUrl}/login?next=/listas-de-verificacion-shopify-cro-pro`);
  }

  // Credenciales de Flow
  const apiKey = process.env.FLOW_API_KEY;
  const secret = process.env.FLOW_SECRET_KEY;
  const baseUrl = new URL(request.url).origin;

  if (!apiKey || !secret) {
    console.error("Faltan credenciales de Flow en las variables de entorno");
    // Fallback simulación si no hay llaves para no romper la web
    return NextResponse.redirect(`${baseUrl}/listas-de-verificacion-shopify-cro-pro?token=acceso-pro-simulado`);
  }

  // Parámetros del pago
  const commerceOrder = `${user.id.slice(0, 8)}_${Date.now()}`;
  const params = {
    apiKey,
    subject: 'Checklist Shopify CRO PRO - Acceso Permanente',
    currency: 'CLP',
    amount: 10000,
    email: user.email,
    commerceOrder: commerceOrder,
    urlConfirmation: `${baseUrl}/api/flow/confirm`,
    urlReturn: `${baseUrl}/mi-cuenta`,
    // Pasar metadatos para recuperarlos en la confirmación
    optional: JSON.stringify({ userId: user.id, resourceId: 'cro-pro' })
  };

  try {
    const result = await callFlowAPI('payment/create', params, apiKey, secret);
    
    if (result.url && result.token) {
      // Redirigir al usuario a la pasarela de Flow
      return NextResponse.redirect(`${result.url}?token=${result.token}`);
    } else {
      throw new Error(result.message || "Error al crear pago en Flow");
    }
  } catch (error: any) {
    console.error("Error Flow:", error);
    return NextResponse.redirect(`${baseUrl}/mi-cuenta?error=No se pudo iniciar el pago`);
  }
}
