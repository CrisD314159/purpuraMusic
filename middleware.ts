import { NextRequest, NextResponse } from 'next/server'
import { checkIsloggedIn } from './app/lib/authChecks';

 
// 1. Specify protected and public routes
const protectedRoutesRegex = [
  /^\/user\/account$/
];

const publicRoutes = ['/', '/signup', '/verifyAccount']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  //const isProtectedRoute = protectedRoutes.includes(path)
  const isProtectedRoute = protectedRoutesRegex.some((regex) => regex.test(path));
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !await checkIsloggedIn()) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    await checkIsloggedIn() &&
    req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/dashboard/home', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}