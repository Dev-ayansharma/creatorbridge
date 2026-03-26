// models/VerificationToken.ts
import mongoose, { Document, Schema } from "mongoose";

export interface VerificationToken extends Document {
  email: string;
  otp: string;
  expires_at: Date;
  createdAt:Date
}

const verificationTokenSchema = new Schema<VerificationToken>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expires_at: { type: Date, required: true },
  
},{timestamps:{createdAt:true,updatedAt:false

}});

const VerifyToken =
  (mongoose.models.VerifyToken as mongoose.Model<VerificationToken>) ||
  mongoose.model<VerificationToken>("VerifyToken", verificationTokenSchema);

export default VerifyToken;