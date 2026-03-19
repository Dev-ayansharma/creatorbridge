// models/Workspace.ts
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IWorkspace extends Document {
  name: string;
  owner_id: Types.ObjectId;
  editors: Types.ObjectId[];
  createdAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    editors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IWorkspace>("Workspace", workspaceSchema);