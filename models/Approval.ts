// models/Approval.ts
import mongoose, { Document, Schema, Types } from "mongoose";
import { ApprovalDecision } from "@/types/enum";

export interface IApproval extends Document {
  video_id: Types.ObjectId;
  decision: ApprovalDecision;
  comment?: string;
  createdAt: Date;
}

const approvalSchema = new Schema<IApproval>(
  {
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    decision: {
      type: String,
      enum: Object.values(ApprovalDecision),
      default: ApprovalDecision.PENDING,
    },
    comment: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IApproval>("Approval", approvalSchema);