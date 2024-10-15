import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/reservasi(.*)',
  '/rekamMedis(.*)',
  '/poliklinik(.*)',
  '/layanan(.*)',
  '/admin(.*)',
]);

type UserMetadata = {
  isBetaUser?: boolean
  isAdmin?: boolean
}

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth()

  if (isProtectedRoute(req)) {
    auth().protect()

    const { isAdmin, isBetaUser } = sessionClaims?.metadata as UserMetadata
    if(isAdmin) {
      return
    }
    if(!isAdmin && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/waitlist', req.url))
    }
    if(!isBetaUser) {
      return NextResponse.redirect(new URL('/waitlist', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
