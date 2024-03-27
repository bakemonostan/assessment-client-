export function middleware(request) {
  const currentUser = request.cookies.get("email")?.value;
  const token = request.cookies.get("token")?.value;
  // If both email and token are falsy (undefined, null, empty string, etc.)
  if (!currentUser && !token || currentUser === undefined && token === undefined) {
    // Redirect to login if not on the login or signup page
    if (!request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/signup")) {
      return Response.redirect(new URL("/login", request.url));
    }
  } else {
    // If either email or token is present, redirect to the home page
    if (!request.nextUrl.pathname.startsWith('/')) {
      return Response.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/signup"],
};