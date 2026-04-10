import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    await dbConnect()
    try {
        const editors = await User.find({role:"EDITOR"})
        
        if(!editors){
            return NextResponse.json({success:false,message:"no db functioning"},{status:400})
        }
        if(editors.length == 0){
             return  NextResponse.json({success:true,message:"No one is available is at this moment",data:{editors}},{status:200})
        }

        return NextResponse.json({success:true,message:"list fetched of editor",data:{editors}},{status:200})
    } catch (error) {
         console.error("error while fetching all the editors",error)
          return NextResponse.json({success:false,message:"list fetched of editor server failed "},{status:500})
    }
}