// models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import { UserRole, AuthProvider } from "@/types/enum"

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  isVerified: boolean;
  profilePic?: string;
  provider: AuthProvider;
  createdAt: Date;

}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique:true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    role: { type: String, enum: Object.values(UserRole), required: true },
    isVerified: { type: Boolean, default: false },
    profilePic: { type: String },
    provider: {
      type: String,
      enum: Object.values(AuthProvider),
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IUser>("User", userSchema);