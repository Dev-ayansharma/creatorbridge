"use client";

import axios from "axios";
import { Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const { user } = useAuth();

  const fetchworkspaces = async () => {
    try {
      const response = await axios.get("/api/workspace/readall");

      if (!response.data.success) {
        setWorkspaces([]);
        return;
      }

      setWorkspaces(response.data.data.workspaces);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchworkspaces();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white px-4 sm:px-6 lg:px-10 py-6 sm:py-8">

      {/* HEADER */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
          {user?.role === "EDITOR"
            ? "Your Workspace assigned"
            : "My Workspace"}
        </h1>

        <p className="text-white/50 max-w-xl text-sm sm:text-base">
          Manage your creative environments, collaborate with your team, and organize your work.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-10 sm:mb-14">

        {/* WORKSPACE CARDS */}
        {workspaces.map((workspace) => (
          <Link key={workspace._id} href={`/workspace/${workspace._id}`}>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 relative hover:bg-white/10 transition overflow-hidden cursor-pointer">

              {/* MENU ICON */}
              <div className="absolute top-4 right-4 text-white/40">
                <MoreHorizontal size={18} />
              </div>

              {/* ICON */}
              <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center mb-4 text-lg">
                📁
              </div>

              {/* NAME */}
              <h2 className="text-sm sm:text-base font-medium mb-1 line-clamp-2 leading-snug">
                {workspace?.name}
              </h2>

              {/* EDITOR */}
              <p className="text-xs text-white/50 mb-4 line-clamp-1">
                Editor -{" "}
                {workspace.editor?.username && user?.role === "EDITOR"
                  ? "You"
                  : workspace.editor?.username || "Unknown"}
              </p>

              {/* AVATARS */}
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

        {/* ADD WORKSPACE */}
        {user?.role === "OWNER" && (
          <Link href="/workspace/create">
            <div className="border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition">

              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Plus />
              </div>

              <p className="font-medium text-sm sm:text-base">Add workspace</p>
              <p className="text-xs text-white/50">
                Create a new creative hub
              </p>
            </div>
          </Link>
        )}

        {/* QUOTE CARD */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="text-white/30 text-xl">✨</div>

          <p className="text-sm text-white/50 italic mt-6 leading-relaxed">
            "Systematizing your workflow is the first step toward exponential creative output."
          </p>

          <p className="text-xs text-white/30 mt-4">
            — CREATOR BRIDGE INSIGHTS
          </p>
        </div>
      </div>

      {/* RECENT UPDATES */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold">
            Recent updates
          </h2>

          <span className="text-sm text-white/40 cursor-pointer hover:text-white/70 transition">
            View all activity
          </span>
        </div>

        <div className="space-y-4 sm:space-y-6 text-sm text-white/60">

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <p className="break-words">
              <span className="text-white">Alex Rivera</span> updated the branding assets
            </p>
            <span className="text-white/30 text-xs sm:text-sm">
              12m ago
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <p className="break-words">
              <span className="text-white">Sarah Chen</span> was added to the workspace
            </p>
            <span className="text-white/30 text-xs sm:text-sm">
              4h ago
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}