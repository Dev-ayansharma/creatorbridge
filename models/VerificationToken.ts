// models/VerificationToken.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IVerificationToken extends Document {
  email: string;
  otp: string;
  expires_at: Date;
}

const verificationTokenSchema = new Schema<IVerificationToken>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

export default mongoose.model<IVerificationToken>(
  "VerificationToken",
  verificationTokenSchema
);