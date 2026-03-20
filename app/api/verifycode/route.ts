import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
    await dbConnect()
    try {
         const {username,code}=await request.json()
        const decodedusername=decodeURIComponent(username)
        const user=await User.findOne({username:decodedusername})
        const token = await VerificationToken.findOne({email:user?.email})
        if (!user){
            return Response.json({
                success:false,
                message:"Could not find the user",

            },{status:400})

        }

        const iscodevalid=token?.otp===code
        const isexpiryvalid=new Date(token?.expires_at ||"") > new Date()
        if (iscodevalid && isexpiryvalid){
            user.isVerified=true
            await user.save()
            return NextResponse.json({
                success:true,
                message:"account verified successed",

            },{status:200})
        }else if (!isexpiryvalid){
            return NextResponse.json({
                success:false,
                message:"The Verification date expired please signup again ",

            },{status:400})
        }else{
            return NextResponse.json({
                success:false,
                message:"Wrong code",

            },{status:400})
        }
    } catch (error) {
            console.error("Error in  verifying user",error)
        return Response.json({
            success:false,
            message:"Error verifying user"
        },
        {
            status:500
        }
     )
    }
}