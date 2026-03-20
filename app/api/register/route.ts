import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import VerificationToken from "@/models/VerificationToken";

import { sendOTPEmail } from "@/lib/emailService";
export async function POST(request:Request) {
    await dbConnect()
    try {
        const {email,password,username} = await request.json()
        const existinguserverfiedbyusername=await User.findOne({username,isVerified:true})
        if (existinguserverfiedbyusername){
            return NextResponse.json(   { success: false, message: "username already exist verified" },
        { status: 400 })
        }

        const existinguserbyemail=await User.findOne({email})
         const verificationtoken = await VerificationToken.findOne({email})
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

     if (existinguserbyemail && verificationtoken){
       if (existinguserbyemail.isVerified){
        return NextResponse.json({success:false,message:"email already exists"},
            {
                status:400
            }
        )
       } else{
          
           const hashedpassword=await bcrypt.hash(password,10)
           existinguserbyemail.passwordHash=hashedpassword
           verificationtoken.otp= otp
           verificationtoken.expires_at=new Date(Date.now()+24*60*60*1000)
           existinguserbyemail.isVerified=false
           await existinguserbyemail.save()
       }
      }else{
        const hashedpassword=await bcrypt.hash(password,10)
        const expirydate=new Date()
        expirydate.setDate(expirydate.getDate()+1)

      const newuser =  new User({
            username,
            email,
            password:hashedpassword,
            isVerified:false,
            })
            await newuser.save()
        const token =  new VerificationToken({
        otp,
        expires_at:expirydate,
        email

      })
        await token.save()

      }





    const emailresponse = await sendOTPEmail(email,otp)
if (!emailresponse.success){
    return Response.json({success:false,message:emailresponse.message},
        {
            status:500
        }
    )
   }

   return Response.json({success:true,message:emailresponse.message},
    {
        status:201
    }
)
    } catch (error) {
           return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
    }
}