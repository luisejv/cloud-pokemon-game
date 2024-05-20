import { getUserFromLocalStorage } from "@/lib/localStorage";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = getUserFromLocalStorage();

  if (isAuthenticated) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/home/:path*",
};
