// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // Get the session from cookies
//   const sessionCookie = request.cookies.get("session");
//   const session = sessionCookie ? JSON.parse(sessionCookie.value) : null;

//   // Check if the user is authenticated
//   const isAuthenticated = session?.user?.email || session?.user?.phone;

//   // Redirect unauthenticated users trying to access `/guest-details`
//   if (!isAuthenticated && request.nextUrl.pathname === "/guest-details") {
//     return NextResponse.redirect(new URL("/", request.url)); // Redirect to the homepage
//   }

//   // Allow authenticated users
//   return NextResponse.next();
// }

// // Apply middleware only to `/guest-details`
// export const config = {
//   matcher: ["/guest-details"],
// };
