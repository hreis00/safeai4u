import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the theme from cookie, default to 'system' if not set
  const theme = request.cookies.get("theme")?.value || "system";
  
  // Clone the response
  const response = NextResponse.next();
  
  // If theme cookie doesn't exist, set it
  if (!request.cookies.get("theme")) {
    response.cookies.set("theme", theme, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

