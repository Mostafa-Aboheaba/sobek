import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Middleware for Internationalization and Route Protection
 * 
 * Handles:
 * - Locale detection and routing (next-intl)
 * - Dashboard authentication protection
 * - CMS API route protection
 */

// Create next-intl middleware for locale routing
const intlMiddleware = createMiddleware(routing);

// Combined middleware function
export default auth(async (req) => {
  try {
    const path = req.nextUrl.pathname;
    
    // Skip middleware for static assets
    if (
      path.includes("/_next") ||
      path.includes("/favicon") ||
      path.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)
    ) {
      return NextResponse.next();
    }

    const session = req.auth;

    // Handle dashboard and CMS API authentication
    // Allow access to login page
    if (path.startsWith("/dashboard/login")) {
      // Let intl middleware handle locale routing for login
      return intlMiddleware(req);
    }

    // Allow public CMS API routes
    if (path.startsWith("/api/cms/public")) {
      return intlMiddleware(req);
    }

    // Require authentication for dashboard routes
    if (path.startsWith("/dashboard")) {
      if (!session) {
        // Preserve locale in redirect URL
        const locale = path.split('/')[1] || 'en';
        return NextResponse.redirect(new URL(`/${locale}/dashboard/login`, req.url));
      }
    }

    // Require authentication for protected CMS API routes
    if (path.startsWith("/api/cms") && !path.startsWith("/api/cms/public")) {
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Let next-intl middleware handle locale routing for all other routes
    return intlMiddleware(req);
  } catch (error: any) {
    // If middleware fails, allow request to continue (don't block site)
    if (process.env.NODE_ENV === "development") {
      console.error("Middleware error:", error?.message || error);
    }
    // Fallback to intl middleware
    try {
      return intlMiddleware(req);
    } catch {
      return NextResponse.next();
    }
  }
});

export const config = {
  // Match all pathnames except:
  // - API routes (handled separately)
  // - _next (Next.js internals)
  // - Files with extensions (static files)
  matcher: [
    // Match all pathnames except static files and API routes
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Also match dashboard and CMS API routes for auth
    '/dashboard/:path*',
    '/api/cms/:path*',
  ],
};
