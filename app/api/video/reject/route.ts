import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Video";
import { VideoStatus } from "@/types/enum";
import { NextResponse } from "next/server";


export async function PATCH(req:Request) {
    await dbConnect()
    try {
        const {searchParams} = new URL(req.url)

        const videoid = searchParams.get("video_id")
   
        const video = await Video.findById(videoid)

        if(!video){
            return NextResponse.json({success:false,message:"error while having the video"},{status:404})
        }

        if(video.status === "PENDING"){
            video.status = VideoStatus["REJECTED"]
            await video.save()
        }
        return NextResponse.json({success:true,message:"successfully rejected the video"},{status:200})

    } catch (error) {
        console.error("the error is ",error)
        return NextResponse.json({success:false,message:"the server error in rejecting the video"},{status:500})
    }
}