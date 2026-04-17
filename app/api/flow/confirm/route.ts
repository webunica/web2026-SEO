import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { callFlowAPI } from '@/lib/flow';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = formData.get('token');

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    const apiKey = process.env.FLOW_API_KEY;
    const secret = process.env.FLOW_SECRET_KEY;

    if (!apiKey || !secret) {
      return NextResponse.json({ error: "Missing keys" }, { status: 500 });
    }

    // 1. Consultar el estado real del pago en Flow
    const status = await callFlowAPI('payment/getStatus', { apiKey, token }, apiKey, secret);

    // 2. Si el pago es exitoso (status 2 = Pagado)
    if (status.status === 2) {
      // Recuperar metadatos (userId y resourceId) que pasamos en el checkout
      const { userId, resourceId } = JSON.parse(status.optional);

      if (userId && resourceId) {
        // 3. Otorgar el permiso permanente en la Base de Datos
        const supabase = getSupabaseAdmin();
        const { error } = await supabase
          .from('user_access')
          .insert({
            user_id: userId,
            resource_id: resourceId
          });

        if (error && error.code !== '23505') { // Ignorar si ya existe (duplicado)
          console.error("Error al otorgar acceso:", error);
          return NextResponse.json({ error: "DB Error" }, { status: 500 });
        }
        
        console.log(`Acceso otorgado exitosamente a ${userId} para ${resourceId}`);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
