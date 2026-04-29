import dbConnect from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/gettoken";
import Notify from "@/models/Notify";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

        await dbConnect()
        try {
            const user = await getUserFromToken(req)
            const {text,videoid} =await  req.json()
            const newapproval =  new Notify({
                    video_id:videoid,
                    comment:text,
                    commentedby:user?._id
            })

            if(!newapproval){
                return NextResponse.json({success:false,message:"not created a comment"},{
                    status:404
                })
            }

            await newapproval.save()

            return NextResponse.json({success:true,message:"the comment successfully done",data:newapproval},{status:201})
        } catch (error) {
            console.error("the error is error",error)
            return NextResponse.json({success:false,message:"the server error is there"},{status:500})
        }
}