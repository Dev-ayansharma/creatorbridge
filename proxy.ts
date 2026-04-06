import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import next from "next";


export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // 🔓 Public routes
  if (pathname.startsWith("/auth/editor") && token) {
    return NextResponse.redirect(new URL("/edashboard",req.url));
  }
  if (pathname.startsWith("/auth/owner") && token) {
    return NextResponse.redirect(new URL("/odashboard",req.url));
  }

  if (pathname.startsWith("/edashboard") || pathname.startsWith("/odashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    } 
  }

  try {
    if(token){
    const decoded:any = jwt.verify(token,process.env.JWT_SECRET!)
    
    if(pathname.startsWith("/edashboard") && decoded.role !== "EDITOR"){
           return NextResponse.redirect(new URL("/", req.url))
    }

     if(pathname.startsWith("/odashboard") && decoded.role !== "OWNER"){
           return NextResponse.redirect(new URL("/", req.url))
    }

  }

   
  } catch (error) {
      return NextResponse.redirect(new URL("/",req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}