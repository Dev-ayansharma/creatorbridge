"use client";


import axios from "axios";
import { Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function WorkspacePage() {
  const [workspaces,setWorkspaces] = useState<Workspace[]>([])
 
  const fetchworkspaces = async() =>{
    const response = await axios.get("/api/workspace/readall")
    if(!response.data.success){
        setWorkspaces([])
  }  

 console.log(response.data.data)
  setWorkspaces(response.data.data.workspaces) 
  }

   
  useEffect(()=>{
      fetchworkspaces() 
  },[])
  return (
  <div className="min-h-screen w-full bg-black text-white px-4 sm:px-6 lg:px-10 py-6 sm:py-8">

  {/* Heading */}
  <div className="mb-8 sm:mb-10">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
      My workspace
    </h1>
    <p className="text-white/50 max-w-xl text-sm sm:text-base">
      Manage your creative environments, collaborate with your team, and organize your network assets.
    </p>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">

    {/* Workspace Cards */}
    {workspaces.map((workspace) => (
      <Link key={workspace._id} href={`/workspace/${workspace._id}`}>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 relative hover:bg-white/10 transition">

          <div className="absolute top-4 right-4 text-white/40">
            <MoreHorizontal size={18} />
          </div>

          <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center mb-4">
            📁
          </div>

          <h2 className="text-base sm:text-lg font-medium mb-1 truncate">
            {workspace?.name}
          </h2>

          <p className="text-xs text-white/50 mb-4 truncate">
            Editor - {workspace.editor?.username || ""}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-white/20" />
              <div className="w-6 h-6 rounded-full bg-white/30" />
              <div className="w-6 h-6 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </Link>
    ))}

    {/* Add Workspace */}
    <Link href="/workspace/create">
      <div className="border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <Plus />
        </div>
        <p className="font-medium">Add one</p>
        <p className="text-xs text-white/50">
          Create a new creative hub
        </p>
      </div>
    </Link>

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
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
      <h2 className="text-lg sm:text-xl font-semibold">Recent updates</h2>
      <span className="text-sm text-white/40 cursor-pointer">
        View all activity
      </span>
    </div>

    <div className="space-y-4 sm:space-y-6 text-sm text-white/60">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
        <p>
          <span className="text-white">Alex Rivera</span> updated the branding assets in Workspace 1
        </p>
        <span className="text-white/30 text-xs sm:text-sm">12m ago</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
        <p>
          <span className="text-white">Sarah Chen</span> was added to the workspace
        </p>
        <span className="text-white/30 text-xs sm:text-sm">4h ago</span>
      </div>
    </div>
  </div>
</div>
  );
}