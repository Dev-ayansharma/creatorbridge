"use client";

import { useState } from "react";

export default function GoogleAuth() {

const [loading, setLoading] = useState(false);

const handleGoogleLogin = () => {
  setLoading(true);
  window.location.href = "/api/auth/google";
};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0, 0, 0, 0.11),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.04),transparent_40%)]" />

<a href="/" className="flex items-center gap-3 mb-12 group">
  {/* Logo */}
  <div className="w-9 h-9 rounded-xl bg-black  flex items-center justify-center shadow-md">
    <span className="text-white font-bold text-sm tracking-wider">||</span>
  </div>

  {/* Brand */}
  <div className="flex flex-col leading-tight">
    <span className="text-white font-semibold text-lg tracking-tight group-hover:text-white/80 transition">
      CreatorBridge
    </span>
    <span className="text-[10px] text-white/40 tracking-widest uppercase">
      Creator Workflow Platform
    </span>
  </div>
</a>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-black/70 border border-white/5 rounded-2xl px-10 py-12 backdrop-blur-xl shadow-[0_0_80px_rgba(255,255,255,0.04)] text-center">

        <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-white/5 flex items-center justify-center text-xl text-white/70">
          →
        </div>

        <h2 className="text-xl font-semibold mb-3 text-white/90">
          Welcome Back
        </h2>

        <p className="text-sm text-white/50 mb-8 leading-relaxed max-w-xs mx-auto">
          Connect your Google account to access your creative dashboard and analytics.
        </p>

        {/* ✅ FIXED BUTTON */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-4 rounded-md flex items-center justify-center gap-3 text-sm font-medium hover:opacity-90 transition shadow-[0_10px_30px_rgba(255,255,255,0.1)] cursor-pointer"
        >
          <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs">
            G
          </span>
       {loading ? "Redirecting..." : "Sign in with Google"}
        </button>

        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-[10px] text-white/30 tracking-[0.25em] leading-relaxed">
            BY SIGNING IN, YOU AGREE TO OUR <br />
            TERMS OF SERVICE & PRIVACY POLICY
          </p>
        </div>
      </div>
    </div>
  );
}