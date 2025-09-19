import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("TOKEN:", token)
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      verifyToken(token); // throws if invalid
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // applies to all /admin routes
};
