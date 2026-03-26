"use client";

export default function GoogleAuth() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background subtle gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.04),transparent_40%)]" />

      {/* Title Section */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-2xl font-semibold tracking-wide mb-2">
          CREATOR BRIDGE
        </h1>
        <p className="text-xs t`ext-white/40 tracking-widest">
          THE ARCHITECTURAL VOID FOR CREATORS
        </p>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-black/70 border border-white/5 rounded-2xl px-10 py-12 backdrop-blur-xl shadow-[0_0_80px_rgba(255,255,255,0.04)] text-center">

        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-white/5 flex items-center justify-center text-xl text-white/70">
          →
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-3 text-white/90">
          Welcome Back
        </h2>

        {/* Description */}
        <p className="text-sm text-white/50 mb-8 leading-relaxed max-w-xs mx-auto">
          Connect your Google account to access your creative dashboard and analytics.
        </p>

        {/* Google Button */}
        <button className="w-full bg-white text-black py-4 rounded-md flex items-center justify-center gap-3 text-sm font-medium hover:opacity-90 transition shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
          
          {/* Google Icon */}
          <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs">
            G
          </span>

          Sign in with Google
        </button>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-[10px] text-white/30 tracking-[0.25em] leading-relaxed">
            BY SIGNING IN, YOU AGREE TO OUR <br />
            TERMS OF SERVICE & PRIVACY POLICY
          </p>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <div className="w-full max-w-md bg-black/80 border border-white/5 rounded-lg px-6 py-3 flex justify-between text-[10px] text-white/30 tracking-widest">
          <span>SERVER STATUS: ONLINE</span>
          <span>V2.4.0-OBSIDIAN</span>
        </div>
      </div>
    </div>
  );
}