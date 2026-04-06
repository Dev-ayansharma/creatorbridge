import dbConnect from "@/lib/dbConnect"
import { getUserFromToken } from "@/lib/gettoken"
import Workspace from "@/models/Workspace"
import { NextRequest, NextResponse } from "next/server"

export  async function POST(req:NextRequest) {
    await dbConnect()

   try {
     const user = await getUserFromToken(req)
     if (!user){
         return NextResponse.json({success:false,message:"No owner is found"},{
         status:400
      })
     }
      const {name,editorid} = await req.json()
      if(!name || !editorid ) {
         return NextResponse.json({success:false,message:"name or editor is not choosen"},{
         status:400
      })
      }
 
      const newworkspace = new  Workspace({
          name,
          editor:editorid,
          owner:user?._id
      })
 
      if(!newworkspace){
         return NextResponse.json({success:false,message:"some db failure "},{
         status:404
      })
      }
      
      await newworkspace.save()
       
      return NextResponse.json({success:true,message:"Workspace is created "},{
         status:201
      })
   } catch (error) {
       console.error("error while creating workspace",error)
       return NextResponse.json({success:false,message:"server error while creating workspace"},{status:500})
   }
     
}