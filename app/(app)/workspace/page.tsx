"use client";


import axios from "axios";
import { Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";


export default function WorkspacePage() {
  const [workspaces,setWorkspaces] = useState<Workspace[]>([])
  const [id,setId]= useState("")
  const fetchworkspaces = async() =>{
    const response = await axios.get("/api/workspace/readall")
    if(!response.data.success){
        setWorkspaces([])
  }  

   const id  = nanoid()
  setId(id)
  setWorkspaces(response.data.data.workspaces) 
  }

   
  useEffect(()=>{
      fetchworkspaces() 
  },[])
  return (
    <div className="min-h-screen w-full bg-black text-white px-10 py-8">

   

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold mb-2">My workspace</h1>
        <p className="text-white/50 max-w-xl">
          Manage your creative environments, collaborate with your team, and organize your network assets.
        </p>
      </div>

      {/* Workspace Cards */}
      <div className="grid grid-cols-3 gap-6 mb-14">

        {/* Workspace Card */}
        
       {workspaces.map((workspace) => { return <Link href={`workspace/${id}`}> <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative">
          <div className="absolute top-4 right-4 text-white/40 cursor-pointer">
            <MoreHorizontal size={18} />
          </div>

          <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center mb-4">
            📁
          </div>

          <h2 className="text-lg font-medium mb-1">{workspace?.name}</h2>
          <p className="text-xs text-white/50 mb-4">Editor - {workspace.editor.username || "" }</p>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-white/20" />
              <div className="w-6 h-6 rounded-full bg-white/30" />
              <div className="w-6 h-6 rounded-full bg-white/40" />
            </div>

            {/* <span className="text-xs text-green-400">ACTIVE</span> */}
          </div>
        </div> </Link>})}

        {/* Add Workspace */}
        <div className="border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Plus />
          </div>
          <p className="font-medium">Add one</p>
          <p className="text-xs text-white/50">
            Create a new creative hub
          </p>
        </div>

        {/* Quote Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="text-white/30 text-xl">✨</div>
          <p className="text-sm text-white/50 italic mt-6">
            "Systematizing your workflow is the first step toward exponential creative output."
          </p>
          <p className="text-xs text-white/30 mt-4">
            — CREATOR BRIDGE INSIGHTS
          </p>
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent updates</h2>
          <span className="text-sm text-white/40 cursor-pointer">
            View all activity
          </span>
        </div>

        <div className="space-y-6 text-sm text-white/60">
          <div className="flex justify-between">
            <p>
              <span className="text-white">Alex Rivera</span> updated the branding assets in Workspace 1
            </p>
            <span className="text-white/30">12m ago</span>
          </div>

          <div className="flex justify-between">
            <p>
              <span className="text-white">Sarah Chen</span> was added to the workspace
            </p>
            <span className="text-white/30">4h ago</span>
          </div>
        </div>
      </div>

    </div>
  );
}