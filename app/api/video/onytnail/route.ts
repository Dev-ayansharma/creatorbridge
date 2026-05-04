import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import dbConnect from "@/lib/dbConnect";
import YoutubeChannel from "@/models/YoutubeChannel";

import axios from "axios";
import { getUserFromToken } from "@/lib/gettoken";
import Video from "@/models/Video";
import User from "@/models/User";


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const user = await getUserFromToken(req);
    const {Id} = await req.json()
   
     if(!Id){
        return NextResponse.json(
        { success: false, message: "video id not found" },
        { status: 401 }
      );
     }
    if (!user || user.role !== "OWNER") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

  
    const video = await Video.findById(Id);
    
    if (!video) {
      return NextResponse.json(
        { success: false, message: "Video not found" },
        { status: 404 }
      );
    }
 
    if (video.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, message: "Already processed" },
        { status: 400 }
      );
    }

    const ytChannel = await YoutubeChannel.findOne({ owner_id: user._id });

    if (!ytChannel) {
      return NextResponse.json(
        { success: false, message: "YouTube not connected" },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: ytChannel.access_token,
      refresh_token: ytChannel.refresh_token,
    });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

   if(!video.thumbnail_url){
  return NextResponse.json(
        { success: false, message: "thumbnail is not there " },
        { status: 400 }
      );
   }
     const stream = await axios.get(video.thumbnail_url, {
  responseType: "arraybuffer",
});
await youtube.thumbnails.set({
  videoId:video.youtube_video_id,
  media: {
    mimeType: "image/jpeg",
    body: Buffer.from(stream.data),
  },
});

    return NextResponse.json({
      success: true,
      message: "Thumbnail uploaded successfully",
    });

  } catch (error: any) {
    console.error("Thumbnail Upload Error:", error);

    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}