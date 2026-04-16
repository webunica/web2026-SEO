
const SUPABASE_URL = 'https://pereskyvymsyiqbihydj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DlGqRTtFRbRidTplcMbMmw_6XgeFuuI';

async function checkSupabase() {
    console.log('--- Verificando Tabla leads ---');
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*&limit=1`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('Error al consultar tabla:', err);
            return;
        }

        const data = await response.json();
        console.log('Registro encontrado (si aplica):', data);
        
        if (data.length > 0) {
            console.log('Columnas disponibles:', Object.keys(data[0]));
        } else {
            console.log('La tabla está vacía. No se pueden determinar columnas automáticamente mediante SELECT *.');
            // Intentar una inserción vacía o ver el esquema via OPTIONS si PostgREST lo permite
            const optionsResp = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
                method: 'OPTIONS',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            console.log('Respuesta OPTIONS (Esquema):', optionsResp.status);
        }
    } catch (e) {
        console.error('Error de red:', e);
    }
}

checkSupabase();
