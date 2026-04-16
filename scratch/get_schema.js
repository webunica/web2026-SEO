
const SUPABASE_URL = 'https://pereskyvymsyiqbihydj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DlGqRTtFRbRidTplcMbMmw_6XgeFuuI';

async function getSchema() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        if (!response.ok) {
            console.error('Error:', response.status);
            return;
        }

        const schema = await response.json();
        const leadsTable = schema.definitions.leads;
        if (leadsTable) {
            console.log('--- Estructura de la tabla leads según Supabase ---');
            console.log('Columnas:', Object.keys(leadsTable.properties));
        } else {
            console.log('La tabla leads no se encuentra en el esquema público.');
        }
    } catch (e) {
        console.error('Error de red:', e);
    }
}

getSchema();
