"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/icons";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.12),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_40%)]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-3xl"
      >
     

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Welcome to your <span className="text-red-500">Dashboard</span>
        </h1>

        {/* Subtext */}
        <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Manage your videos, collaborate with editors, and publish content —
          all in one secure place.
        </p>

        {/* Actions */}
      
      </motion.div>

     
    </div>
  );
}