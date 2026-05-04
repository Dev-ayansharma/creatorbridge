import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Video";
import YoutubeChannel from "@/models/YoutubeChannel";


import { google } from "googleapis";
import axios from "axios";
import { getUserFromToken } from "@/lib/gettoken";
import { VideoStatus } from "@/types/enum";
import { ideahub } from "googleapis/build/src/apis/ideahub";

export async function POST(
  req: NextRequest,
  
) {
  await dbConnect();

  try {
    // 🔐 1. Get owner
    const user = await getUserFromToken(req);
    const {Id} = await req.json()
   
    if (!user || user.role !== "OWNER") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🎬 2. Get video
    const video = await Video.findById(Id);

    if (!video) {
      return NextResponse.json(
        { success: false, message: "Video not found" },
        { status: 404 }
      );
    }

    if (video.status !== "PENDING") {
      return NextResponse.json(
        { success: false, message: "Already processed" },
        { status: 400 }
      );
    }

    // 🔑 3. Get YouTube tokens
    const yt = await YoutubeChannel.findOne({ owner_id: user._id });

    if (!yt) {
      return NextResponse.json(
        { success: false, message: "YouTube not connected" },
        { status: 400 }
      );
    }
    let accessToken = yt.access_token;

    if (new Date() > yt.token_expiry) {
      const refreshRes = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          refresh_token: yt.refresh_token,
          grant_type: "refresh_token",
        }
      );

      accessToken = refreshRes.data.access_token;

      yt.access_token = accessToken;
      yt.token_expiry = new Date(Date.now() + refreshRes.data.expires_in * 1000);

      await yt.save();
    }

    // ⚙️ 5. Setup OAuth client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    // 📥 6. Stream video from Cloudinary
    const videoStream = await axios.get(video.video_url, {
      responseType: "stream",
    });

    // 🚀 7. Upload to YouTube
    const ytRes = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: video.title,
          description: video.description,
          tags: video.tags,
          categoryId: video.category || "22",
        },
        status: {
          privacyStatus: video.privacystatus || "private",
        },
      },
      media: {
        body: videoStream.data,
      },
    });

   video.status = VideoStatus["APPROVED"];
    video.youtube_video_id = ytRes.data.id ?? undefined;

    await video.save();

    return NextResponse.json({
      success: true,
      youtubeVideoId: ytRes.data.id,
    });

  } catch (error: any) {
    console.error("YouTube Upload Error:", error?.response?.data || error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
        error: error?.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}