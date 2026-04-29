// models/Approval.ts
import mongoose, { Document, Schema, Types } from "mongoose";


export interface Notify extends Document {
  video_id: Types.ObjectId;
  comment?: string[];
  commentedby: Types.ObjectId;
  createdAt: Date;
}

const notifySchema = new Schema<Notify>(
  {
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    commentedby:{      
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,},
    comment:[ { type: String }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Notify = (mongoose.models.Notify as mongoose.Model<Notify>) || mongoose.model<Notify>("Notify",notifySchema)

export default Notify