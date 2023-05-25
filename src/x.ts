//import { NextRequest, NextResponse } from "next/server"

//const protectedRoutes = ["/protected"]
//const authRoute: string = "/login"
//export default function middleware(request: NextRequest) {
  //const authenticated = !!request.cookies.get("token")

  //if (!authenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
    //return NextResponse.redirect(new URL(authRoute, request.url))
  //}
  //if (authenticated && request.nextUrl.pathname === authRoute) {
    //return NextResponse.redirect(new URL(protectedRoutes[0], request.url))
  //}
  //return NextResponse.next()
//}
