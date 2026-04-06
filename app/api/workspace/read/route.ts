import dbConnect from "@/lib/dbConnect";
import Workspace from "@/models/Workspace";
import { NextResponse } from "next/server";
import { success } from "zod";


export async function GET(req:Request) {
     await dbConnect()
     try {
        const {searchParams} = new URL(req.url)
        const queryparam = {
            workspaceid:searchParams.get('workspaceid')
        }

        const workspace_id = queryparam.workspaceid
        if(!workspace_id){
            return NextResponse.json({success:false,message:"No workspace is provided"},{
                status:401
            })
        }

        const workspace = await Workspace.findById(workspace_id)
        if(!workspace){
            return NextResponse.json({success:false,message:"the db operation got failed during the fetching of the workspace"},{
                status:401
            })
        }

        return NextResponse.json({success:true,message:"the workspace is fetched successfully",data:workspace},{
            status:201
        })
     } catch (error) {
          console.error("the error while in the api of the reading workspace",error)
          return NextResponse.json({
            success:false,
            message:"the internal server error while api fetching of the reading workspace "
          },{
            status:500
          })
     }
}