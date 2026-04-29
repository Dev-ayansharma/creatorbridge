import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Video";
import { uploadToCloudinary } from "@/lib/uploadtocloudinary";
import { deleteFromCloudinary } from "@/lib/deletefromcloudinary";


export async function PATCH(req: NextRequest, { params }: { params:Promise<{ id: string }> }) {
  await dbConnect();

  try {
    
        const { id: videoId } = await params;

    if (!videoId) {
      return NextResponse.json(
        { success: false, message: "Video ID required" },
        { status: 400 }
      );
    }

    const existingVideo = await Video.findById(videoId);
    console.log(existingVideo)
    if (!existingVideo) {
      return NextResponse.json(
        { success: false, message: "Video not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const videoFile = formData.get("video") as File | null;
    const thumbnailFile = formData.get("thumbnail") as File | null;

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const workspace_id = formData.get("workspace_id") as string | null;
    const privacy = formData.get("privacy") as string | null;
    const category = formData.get("category") as string | null;

    const tagsRaw = formData.get("tags") as string | null;
    const tags = tagsRaw ? JSON.parse(tagsRaw) : null;

    const updateData: any = {};


    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (workspace_id) updateData.workspace_id = workspace_id;
    if (privacy) updateData.privacystatus = privacy;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;


    if (videoFile) {
      const videoBuffer = Buffer.from(await videoFile.arrayBuffer());

      const videoUpload: any = await uploadToCloudinary(
        videoBuffer,
        "videos",
        "video"
      );

      // delete old video
      if (existingVideo.video_publicid) {
        await deleteFromCloudinary(existingVideo.video_publicid, "video");
      }

      updateData.video_url = videoUpload.secure_url;
      updateData.video_publicid = videoUpload.public_id;
    }

    // 🔥 THUMBNAIL UPDATE (only if new one provided)
    if (thumbnailFile) {
      const thumbBuffer = Buffer.from(await thumbnailFile.arrayBuffer());

      const thumbUpload: any = await uploadToCloudinary(
        thumbBuffer,
        "images",
        "image"
      );

      // delete old thumbnail
      if (existingVideo.thumbnail_publicid) {
        await deleteFromCloudinary(existingVideo.thumbnail_publicid, "image");
      }

      updateData.thumbnail_url = thumbUpload.secure_url;
      updateData.thumbnail_publicid = thumbUpload.public_id;
    }

   
    updateData.status = "PENDING";

    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Video updated successfully",
        video: updatedVideo,
      },
      { status: 200 }
    );

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}