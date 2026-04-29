import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    await dbConnect()
    
        const {searchParams} =new URL(req.url)
        const Id= searchParams.get('Id')
        const existvideo = await Video.findOne({$or:[{workspace_id:Id},{_id:Id}]})
        if (!existvideo){
            return NextResponse.json({success:false,message:"no video existed"},{status:200})
        }
        
        return NextResponse.json({success:true,message:"video existed",data:existvideo},{status:200})
        
    
}