import crypto from 'crypto';

/**
 * Genera la firma para Flow.cl basada en los parámetros
 * @param params Objeto con los parámetros de la petición
 * @param secret Clave secreta de Flow
 * @returns String con la firma HMAC-SHA256
 */
export function generateFlowSignature(params: Record<string, any>, secret: string): string {
  // 1. Ordenar las llaves alfabéticamente
  const keys = Object.keys(params).sort();
  
  // 2. Concatenar llaves y valores (key=value)
  const stringToSign = keys
    .map(key => `${key}=${params[key]}`)
    .join('&');
    
  // 3. Crear HMAC SHA256
  return crypto
    .createHmac('sha256', secret)
    .update(stringToSign)
    .digest('hex');
}

/**
 * Envía una petición a la API de Flow
 */
export async function callFlowAPI(endpoint: string, params: Record<string, any>, apiKey: string, secret: string) {
  const signature = generateFlowSignature(params, secret);
  
  // Añadir API Key y Firma a los parámetros
  const body = new URLSearchParams({
    ...params,
    apiKey,
    s: signature
  });

  const response = await fetch(`https://www.flow.cl/api/${endpoint}`, {
    method: 'POST',
    body: body
  });

  return await response.json();
}
