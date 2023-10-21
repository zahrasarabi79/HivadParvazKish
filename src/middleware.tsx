import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const response = NextResponse.next() ;
  const token = request.cookies.get("token");
  console.log(token);

  //   const x = response.cookies.set("MiddlewareToken" , token);
  const isAuthenticated = true;
  if (request.nextUrl.pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/Contracts/ContractList", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
