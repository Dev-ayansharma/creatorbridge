import dbConnect from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/gettoken";
import YoutubeChannel from "@/models/YoutubeChannel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    await dbConnect()
    
   try {
     const user = await  getUserFromToken(req)
          if (!user){
                  return NextResponse.json({success:false,message:"No owner is found"},{
                  status:400
               })
              }
             
    const utubechannel = await YoutubeChannel.findOne({owner_id:user._id}).select("-access_token -refresh_token")
    if(!utubechannel){
        return NextResponse.json({success:false,message:"not have a youtube channel"},{status:404})    }

    return NextResponse.json({success:true,message:"youtube channel is fetched",data:utubechannel},{status:200})   
   } catch (error) {
      console.error("server failure",error)
      return NextResponse.json({success:false,message:"internal server failure error"},{status:500})
   }
}