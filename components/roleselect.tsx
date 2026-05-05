"use client"
import Link from "next/link";
import { useState } from "react";

export default function Roleselect() {
    const [role, setRole] = useState<"editor" | "owner">("editor");

  return (
    <>

      {/* Background Gradient */}
      <div className="absolute inset-0  bg-[radial-gradient(circle_at_20%_30%,rgb(0, 0, 0),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_40%)]" />

      {/* Main */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 ">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Choose Your Role
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Define your workspace permissions and access level within the Project.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-3xl">

          {/* Editor */}
          <div
            onClick={() => setRole("editor")}
            className={`relative cursor-pointer rounded-xl p-8 transition-all duration-300 
            ${
              role === "editor"
                ? "bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            {/* Radio */}
            <div className="absolute top-5 right-5 w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
              {role === "editor" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center mb-6 text-xl">
              ✍️
            </div>

            <h3 className="text-lg font-semibold mb-2">Editor</h3>

            <p className="text-white/60 text-xs mb-6">
              start your effortless submitting the work.
            </p>

            <div className="flex gap-2 text-[10px] uppercase">
              <span className="px-2 py-1 border border-white/10 rounded-full text-white/60">
                Upload
              </span>
              <span className="px-2 py-1 border border-white/10 rounded-full text-white/60">
                Publishing
              </span>
            </div>
          </div>

          {/* Owner */}
          <div
            onClick={() => setRole("owner")}
            className={`relative cursor-pointer rounded-xl p-8 transition-all duration-300 
            ${
              role === "owner"
                ? "bg-white/10 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            {/* Radio */}
            <div className="absolute top-5 right-5 w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
              {role === "owner" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center mb-6 text-xl">
              🛡️
            </div>

            <h3 className="text-lg font-semibold mb-2">Owner</h3>

            <p className="text-white/60 text-xs mb-6">
              Full access and no overhead of security.
            </p>

            <div className="flex gap-2 text-[10px] uppercase">
              <span className="px-2 py-1 border border-white/10 rounded-full text-white/60">
                Full Access
              </span>
              <span className="px-2 py-1 border border-white/10 rounded-full text-white/60">
                Security
              </span>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <Link onClick={()=>setRole(role)} href={`/${role === "owner" ? `auth/${role}/sign-in` : `auth/${role}/sign-up`}`}>
          <button className="bg-white text-black px-8 py-3 rounded-md text-xs tracking-widest font-semibold hover:opacity-90 active:scale-95 transition cursor-pointer">
            CONTINUE TO DASHBOARD
          </button></Link>
       <Link href={'/'}>
          <button className="text-white/50 text-xs tracking-widest hover:text-white transition cursor-pointer">
            BACK TO HOME PAGE
          </button></Link>
        </div>
      </main>
    </>
  );

}