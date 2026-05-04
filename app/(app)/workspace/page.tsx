"use client";

import axios from "axios";
import { Plus} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";


export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
const [loading, setLoading] = useState(true);
  const { user } = useAuth();

 const fetchworkspaces = async () => {
  try {
    setLoading(true);

    const response = await axios.get("/api/workspace/readall");

    if (!response.data.success) {
      setWorkspaces([]);
      return;
    }

    setWorkspaces(response.data.data.workspaces);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
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
            ? "Your assigned Workspaces"
            : "My Workspace"}
        </h1>

        <p className="text-white/50 max-w-xl text-sm sm:text-base">
          Manage your creative environments, collaborate with your team, and organize your work.
        </p>
      </div>

      {/* GRID */}
  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-10 sm:mb-14">

  {/* 🔄 LOADING SKELETON */}
  {loading &&
    [...Array(6)].map((_, i) => (
      <div
        key={i}
        className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 animate-pulse"
      >
        <div className="w-10 h-10 rounded-md bg-white/10 mb-4" />
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    ))}

  {/* ✅ ACTUAL DATA */}
  {!loading &&
    workspaces.map((workspace) => (
      <Link key={workspace._id} href={`/workspace/${workspace._id}`}>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 relative hover:bg-white/10 transition overflow-hidden cursor-pointer">

          <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center mb-4 text-lg">
            📁
          </div>

          <h2 className="text-sm sm:text-base font-medium mb-1 line-clamp-2 leading-snug">
            {workspace?.name}
          </h2>

          <p className="text-xs text-white/50 mb-4 line-clamp-1">
            Editor -{" "}
            {workspace.editor?.username && user?.role === "EDITOR"
              ? "You"
              : workspace.editor?.username || "Unknown"}
          </p>
        </div>
      </Link>
    ))}

  {/* ➕ ADD WORKSPACE */}
  {!loading && user?.role === "OWNER" && (
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
  {!loading && (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
      <div className="text-white/30 text-xl">✨</div>

      <p className="text-sm text-white/50 italic mt-6 leading-relaxed">
        "Systematizing your workflow is the first step toward exponential creative output."
      </p>

      <p className="text-xs text-white/30 mt-4">
        — CREATOR BRIDGE INSIGHTS
      </p>
    </div>
  )}
</div>

    
    </div>
  );
}