  // models/Workspace.ts
  import mongoose, { Document, Schema, Types } from "mongoose";

  export interface Workspace extends Document {
    name: string;
    owner: Types.ObjectId;
    editor: Types.ObjectId;
    createdAt: Date;
  }

  const workspaceSchema = new Schema<Workspace>(
    {
      name: { type: String, required: true },
      owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
      editor: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
  );

  const Workspace =  (mongoose.models.Workspace as mongoose.Model<Workspace>) || mongoose.model<Workspace>("Workspace", workspaceSchema);
  export default Workspace