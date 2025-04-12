import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the user agent
  const userAgent = request.headers.get('user-agent') || ''
  
  // Check if it's a mobile device using a simple regex pattern
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  
  // Check if viewport width can be determined from cookie (if set by client)
  const viewportWidth = request.cookies.get('viewport-width')?.value
  const hasMobileWidth = viewportWidth ? parseInt(viewportWidth) < 768 : false
  
  // Determine if the device is mobile based on user agent or viewport width
  const shouldUseMobileVersion = isMobile || hasMobileWidth
  
  // Current URL info
  const url = request.nextUrl.clone()
  const { pathname } = url
  
  // If it's a mobile device and not already on the mobile page
  if (shouldUseMobileVersion && !pathname.startsWith('/mobile')) {
    url.pathname = '/mobile'
    return NextResponse.redirect(url)
  }
  
  // If it's a desktop device but on the mobile page
  if (!shouldUseMobileVersion && pathname.startsWith('/mobile')) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$).*)',
  ],
} 