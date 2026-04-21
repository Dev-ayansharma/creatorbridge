import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Video";
import { uploadToCloudinary } from "@/lib/uploadtocloudinary";
import { getUserFromToken } from "@/lib/gettoken";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const user = await getUserFromToken(req);

    const formData = await req.formData();

    const videoFile = formData.get("video") as File;
    const thumbnailFile = formData.get("thumbnail") as File;
   
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const workspace_id = formData.get("workspace_id") as string;
    const tags = JSON.parse(formData.get("tags") as string || "[]");

  
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    const videoUpload: any = await uploadToCloudinary(videoBuffer, "videos","video");
   
    const privacytype = formData.get("privacy") as string
    const categorytype = formData.get("category") as string
    let thumbnailUrl = "";
    if (thumbnailFile) {
      const thumbBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
    
      const thumbUpload: any = await uploadToCloudinary(thumbBuffer, "images","image");
      
      thumbnailUrl = thumbUpload.secure_url;
    }


    const video = await Video.create({
      workspace_id,
      uploaded_by: user?._id,
      title,
      description,
      tags,
      thumbnail_url: thumbnailUrl,
      video_url: videoUpload.secure_url,
      status: "PENDING",
      privacystatus:privacytype,
      category:categorytype

     
    });
    return NextResponse.json({ success: true, message:"the video is created",video },{status:201});

  } catch (err:any) {
    console.error(err);
    return NextResponse.json({ success: false,message:err.message }, { status: 500 });
  }
}