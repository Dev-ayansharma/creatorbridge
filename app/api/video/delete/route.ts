import dbConnect from "@/lib/dbConnect";
import { deleteFromCloudinary } from "@/lib/deletefromcloudinary";
import Video from "@/models/Video";
import { NextResponse } from "next/server";


export async function DELETE(req:Request) {
    await dbConnect()
    try {
        const {searchParams} = new URL(req.url)

        const videoid = searchParams.get("video_id")
       
        const video = await Video.findById(videoid)

        if(!video){
            return NextResponse.json({success:false,message:"error while having the video"},{status:404})
        }
        
        if(video.video_publicid){
            await deleteFromCloudinary(video.video_publicid,"video")
        }
        if(video.thumbnail_publicid){
            await deleteFromCloudinary(video.thumbnail_publicid,"image")
        }

        await Video.findOneAndDelete({_id:videoid})
        return NextResponse.json({success:true,message:"successfully deleted the video"},{status:200})
        
    } catch (error) {
        console.error("the error is ",error)
        return NextResponse.json({success:false,message:"the server error in deleting the video"},{status:500})
    }
}