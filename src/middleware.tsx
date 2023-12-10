import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  const isPublicPath = path === "/login";
  const isBasePath = path === "/";
  // select all routh
  const PUBLIC_FILE = /\.(.*)$/;
  if (
    path.startsWith("/_next") || // exclude Next.js internals
    path.startsWith("/api") || //  exclude all API routes
    path.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(path) // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  if ((isPublicPath && !!token) || (isBasePath && !!token)) {
    return NextResponse.redirect(new URL("/Contracts/ContractList", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/", "/Contracts/:path*"],
// };
