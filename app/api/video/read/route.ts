import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    await dbConnect()
    
        const {searchParams} =new URL(req.url)
        const workspaceid= searchParams.get('workspaceid')
        const existvideo = await Video.findOne({workspace_id:workspaceid})
        if (!existvideo){
            return NextResponse.json({success:false,message:"no video existed"},{status:200})
        }
        
        return NextResponse.json({success:true,message:"video existed",data:existvideo},{status:200})
        
    
}