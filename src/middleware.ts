import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    console.log("Middleware - Token:", token);
    console.log("Middleware - isAdmin:", token?.isAdmin);

    // Protéger les routes /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!token?.isAdmin) {
        console.log("Middleware - Redirection car non admin");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
