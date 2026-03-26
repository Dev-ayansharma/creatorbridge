"use client";

export default function LogIn() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">

      {/* Top Bar */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6 text-sm text-white/80">
        <span className="tracking-wide font-medium">CREATOR BRIDGE</span>
        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">
          ?
        </div>
      </header>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.04),transparent_40%)]" />

      {/* Center Container */}
      <div className="flex items-center justify-center min-h-screen px-4">

        <div className="w-full max-w-md bg-black/80 border border-white/5 rounded-xl px-10 py-12 backdrop-blur-xl shadow-[0_0_80px_rgba(255,255,255,0.04)]">

          {/* Title */}
          <h1 className="text-4xl font-semibold mb-3 text-white/90">
            Sign In
          </h1>

          <p className="text-sm text-white/50 mb-10 leading-relaxed">
            Access your architectural dashboard to bridge your creative vision.
          </p>

          {/* Username */}
          <div className="mb-6">
            <label className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
              Username or Email
            </label>

            <input
              type="text"
              placeholder="architect@bridge.io"
              className="w-full mt-3 bg-black border border-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Password */}
          <div className="mb-10">
            <div className="flex justify-between items-center">
              <label className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Password
              </label>
              <span className="text-[10px] text-white/30 cursor-pointer hover:text-white/60">
                FORGOT?
              </span>
            </div>

            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full mt-3 bg-black border border-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-white text-black py-4 text-sm tracking-widest font-medium hover:opacity-90 transition shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
            SIGN IN
          </button>

          {/* Divider */}
          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-white/5" />
            <span className="text-[10px] text-white/30 tracking-[0.3em]">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 text-sm text-white/80 hover:bg-white/10 transition">
              ● GOOGLE
            </button>

            <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 text-sm text-white/80 hover:bg-white/10 transition">
              ▣ GITHUB
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-white/40">
            New to the bridge?{" "}
            <span className="text-white/70 cursor-pointer hover:underline">
              Create an account
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Meta */}
      <div className="absolute bottom-4 left-6 text-[10px] text-white/20 tracking-widest">
        SYSTEM_STATUS: STABLE
      </div>

      <div className="absolute bottom-4 right-6 text-[10px] text-white/20 tracking-widest">
        V2.4.0_SLATE
      </div>
    </div>
  );
}