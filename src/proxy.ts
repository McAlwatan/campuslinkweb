import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COMING_SOON = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if (COMING_SOON.some((p) => pathname.startsWith(p))) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};