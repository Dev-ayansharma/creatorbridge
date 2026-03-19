// models/YoutubeChannel.ts
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IYoutubeChannel extends Document {
  owner_id: Types.ObjectId;
  youtube_channel_id: string;
  access_token: string;
  refresh_token: string;
  token_expiry: Date;
}

const youtubeChannelSchema = new Schema<IYoutubeChannel>({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  youtube_channel_id: { type: String, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  token_expiry: { type: Date, required: true },
});

export default mongoose.model<IYoutubeChannel>(
  "YoutubeChannel",
  youtubeChannelSchema
);