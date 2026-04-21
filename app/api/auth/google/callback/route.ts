import axios from "axios";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

import { NextResponse } from "next/server";
import { URL } from "url";
import YoutubeChannel from "@/models/YoutubeChannel";
export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
   
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token, refresh_token,expires_in} = tokenRes.data;
  
    // 2. Get user info
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { email, name, id, picture } = userInfo.data;
    
    // 🔥 STEP 2: Get YouTube channel
    const ytRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          part: "snippet",
          mine: true,
        },
      }
    );
    
       const channel = ytRes.data.items[0];
    
    let user = await User.findOne({ email });
  
   

    if (user && user.provider === "CREDENTIALS") {
  return NextResponse.json({success:false,message:"this email already registered"},{status:400});

}
    if (!user) {
      user = await User.create({
        email,
        username: name,
        role: "OWNER",
        provider: "GOOGLE",
        googleid: id,
        profilePic: picture,
      });

  
    }
await user.save();
      const ownerid = user?._id
 let utubechannel  = await YoutubeChannel.findOne({owner_id:ownerid})
    if(!utubechannel){
    utubechannel = await YoutubeChannel.create({
         access_token,
         refresh_token,
         token_expiry:new Date(Date.now() + expires_in * 1000),
         youtube_channel_id:channel.id,
         owner_id:ownerid,
        uname:channel.snippet.title,
        thumbnail: channel.snippet.thumbnails.default.url


      })
    }

  
     utubechannel.access_token = access_token;
    utubechannel.refresh_token = refresh_token;
    utubechannel.token_expiry = new Date(Date.now() + expires_in * 1000);
     
     await utubechannel.save()
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    
    const response = NextResponse.redirect(new URL('/odashboard',req.url))
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });;
     return response
    
  } catch (error:any) {
    console.error("error is ",error?.response?.data)
    return NextResponse.json({ message: "Google login failed" }, { status: 500 });
  }
}