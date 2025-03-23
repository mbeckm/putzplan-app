import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh the session if it exists
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  // If there's no session and the user is trying to access a protected route,
  // redirect them to the auth page
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('No session found, redirecting to auth page')
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth'
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If there is a session and the user is trying to access auth pages,
  // redirect them to the dashboard
  if (session && (req.nextUrl.pathname === '/auth' || req.nextUrl.pathname === '/')) {
    console.log('Session found, redirecting to dashboard')
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  // Update response headers to set cookie
  const response = res
  response.headers.set('x-middleware-cache', 'no-cache')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth/callback route (needed for Supabase auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|auth/callback).*)',
  ],
} 