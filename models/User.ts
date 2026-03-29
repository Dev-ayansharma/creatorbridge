// models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import { UserRole, AuthProvider } from "@/types/enum"

export interface User extends Document {
  username?: string;
  email: string;
  password?: string;
  role: UserRole;
  isVerified?: boolean;
  profilePic?: string;
  provider: AuthProvider;
  googleid?:string;
  accesstoken:string;
  refreshtoken:string;
  createdAt: Date;

}

const userSchema = new Schema<User>(
  {
    username: { type: String, unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: Object.values(UserRole), required: true },
    isVerified: { type: Boolean, default: false },
    profilePic: { type: String },
    provider: {
      type: String,
      enum: Object.values(AuthProvider),
      required: true,
    },
    googleid:{type:String},
    accesstoken:{type:String},
    refreshtoken:{type:String},
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
const User=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default User; 