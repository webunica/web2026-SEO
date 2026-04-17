import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get('next') ?? '/mi-cuenta'

  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Fallback: If no code/token but we have an error in current URL, pass it along
  const error_description = searchParams.get('error_description')
  const redirectUrl = error_description 
    ? `${origin}/login?error=${encodeURIComponent(error_description)}`
    : `${origin}/login?error=Sesion expirada o invalida. Por favor solicita un nuevo enlace.`;

  return NextResponse.redirect(redirectUrl)
}
