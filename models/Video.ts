// models/Video.ts
import mongoose, { Document, Schema, Types } from "mongoose";
import { VideoStatus } from "@/types/enum";

export interface IVideo extends Document {
  workspace_id: Types.ObjectId;
  uploaded_by: Types.ObjectId;
  title: string;
  description?: string;
  tags: string[];
  thumbnail_url?: string;
  video_url: string;
  status: VideoStatus;
  youtube_video_id?: string;
  createdAt: Date;
}

const videoSchema = new Schema<IVideo>(
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
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IVideo>("Video", videoSchema);