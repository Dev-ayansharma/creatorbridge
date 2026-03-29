import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    
    const token = req.cookies.get("token")?.value

    if(!token){
        return NextResponse.json({success:false,message:"you are not in session"});
    }

     const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.set("token", "", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  expires: new Date(0),
});
return response
  
}