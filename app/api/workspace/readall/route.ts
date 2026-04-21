import dbConnect from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/gettoken";
import Workspace from "@/models/Workspace";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    await dbConnect()
   try {
     const user = await getUserFromToken(req)
     if (!user){
             return NextResponse.json({success:false,message:"No owner is found"},{
             status:400
          })
         }
 
  const workspaces = await Workspace.find({
  $or: [
    { owner: user?._id },
    { editor: user?._id }
  ]
})
.populate("owner", "username")
.populate("editor", "username");
    
     if(workspaces == undefined || null){
          return NextResponse.json({success:false,message:"db error is found"},{
             status:404
          })
     }
 
     if(workspaces.length == 0 ){
         return NextResponse.json({
             success:true,
             message:"no workspace is yet created",
             data:{workspaces}
         },
     {
         status:200
     })
     }
 
     return NextResponse.json({
         success:true,
         message:"all workspaces are fetched",
         data:{workspaces}
     },{
         status:200
     })
   } catch (error) {
         console.error("error while creating workspace",error)
       return NextResponse.json({success:false,message:"server error while creating workspace"},{status:500})
   }
}