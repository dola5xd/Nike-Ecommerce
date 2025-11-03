import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { nextUrl, nextauth } = req;
    const token = nextauth?.token;

    // User is logged in
    if (token) {
      // 🚫 Block access to /login and /register
      if (
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register")
      ) {
        return NextResponse.redirect(new URL("/", req.url)); // redirect home
      }

      // 🚫 Block access to /verify if already verified
      if (nextUrl.pathname.startsWith("/verify") && token.emailVerified) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      // auto redirect to defualt page of account
      if (nextUrl.pathname.startsWith("/account")) {
        return NextResponse.redirect(new URL("/account/orders", req.url));
      }
    } else {
      // if user not logged in
      // 🚫 Block access to /cart and /account
      if (
        nextUrl.pathname.startsWith("/cart") ||
        nextUrl.pathname.startsWith("/account")
      ) {
        return NextResponse.redirect(new URL("/", req.url)); // redirect home
      }
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/login", "/register", "/verify", "/cart", "/account"],
};
