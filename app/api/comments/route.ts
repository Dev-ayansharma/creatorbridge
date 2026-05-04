import dbConnect from "@/lib/dbConnect";
import Notify from "@/models/Notify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
      await dbConnect()
    
        const {searchParams} =new URL(req.url)
        const Id = searchParams.get('video_id')
        console.log(Id)
        const comments = await Notify.find({video_id:Id}).populate('commentedby', 'username')
        if (!comments){
            return NextResponse.json({success:false,message:"no comments "},{status:200})
        }

        
        
        return NextResponse.json({success:true,message:"comments existed",data:comments},{status:200})
}