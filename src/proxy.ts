import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const hasCookie = req.cookies.has(AUTH_COOKIE);

  if (!isLoginPage && !hasCookie) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && hasCookie) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
