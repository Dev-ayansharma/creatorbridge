// models/Video.ts
import mongoose, { Document, Schema, Types } from "mongoose";
import { VideoStatus } from "@/types/enum";

export interface Video extends Document {
  workspace_id: Types.ObjectId;
  uploaded_by: Types.ObjectId;
  title: string;
  description?: string;
  tags: string[];
  thumbnail_url?: string;
  video_url: string;
  status: VideoStatus;
  youtube_video_id?: string;
  privacystatus:string;
  category:string;
  createdAt: Date;
}

const videoSchema = new Schema<Video>(
  {
    workspace_id: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    uploaded_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    thumbnail_url: { type: String },
    video_url: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(VideoStatus),
      default: VideoStatus.PENDING,
    },
    youtube_video_id: { type: String },
    privacystatus:{
      type:String
    },
    category:{
      type:String
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Video =  (mongoose.models.Video as mongoose.Model<Video>) || mongoose.model<Video>("Video", videoSchema);
  export default Video