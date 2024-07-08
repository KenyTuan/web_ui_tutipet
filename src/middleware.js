import { NextResponse } from "next/server";

export function middleware(request) {
  const jwt = require("jsonwebtoken");
  const currentUser = request.cookies.get("accessToken")?.value;

  if (!currentUser && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decodedToken = jwt.decode(currentUser);
  console.log("skakaa", decodedToken?.roles[0]?.authority);
  if (
    decodedToken?.roles[0]?.authority === "ROLE_USER" &&
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/dashboard/:path*",
    "/user/:path*",
  ],
};
