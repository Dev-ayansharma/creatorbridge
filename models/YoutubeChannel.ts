// models/YoutubeChannel.ts
import mongoose, { Document, Schema, Types } from "mongoose";

export interface YoutubeChannel extends Document {
  owner_id: Types.ObjectId;
  youtube_channel_id: string;
  access_token: string;
  refresh_token: string;
  uname:string;
  thumbnail:string,
  token_expiry: Date;
}

const youtubeChannelSchema = new Schema<YoutubeChannel>({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  youtube_channel_id: { type: String, required: true },
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  token_expiry: { type: Date, required: true },

  uname:{type:String},
  thumbnail:{type:String}
});

const YoutubeChannel = (mongoose.models.YoutubeChannel as mongoose.Model<YoutubeChannel>) || mongoose.model<YoutubeChannel>("YoutubeChannel", youtubeChannelSchema)
export default YoutubeChannel