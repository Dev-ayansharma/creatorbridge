"use client"

export default function SignUp() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_40%)]" />

      {/* Layout */}
      <div className="relative z-10 grid md:grid-cols-2 gap-20 w-full max-w-6xl px-6">

        {/* Left Text */}
        <div className="flex flex-col justify-center">
         <a href="#" className="flex flex-row items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex  items-center justify-center">
            <span className="text-zinc-950 font-bold text-lg">||</span>
          </div>
          <span className="font-semibold text-white text-lg ">CreatorBridge</span>
           
        </a>

         <div className="text-white/60 max-w-sm text-sm mt-5">
            Get started your Journey
          </div>

          <div className="w-10 h-[1px] bg-white/30 mt-6" />
        </div>

        {/* Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">

            <div className="space-y-5">

              <div>
                <label className="text-xs text-white/50">USERNAME</label>
                <input
                  className="w-full mt-2 bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                  placeholder="Enter a unique one"
                />
              </div>

              <div>
                <label className="text-xs text-white/50">EMAIL</label>
                <input
                  className="w-full mt-2 bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="text-xs text-white/50">PASSWORD</label>
                <input
                  type="password"
                  className="w-full mt-2 bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                  placeholder="••••••••"
                />
              </div>

              <button className="w-full bg-white text-black py-3 rounded-md text-sm font-medium tracking-wide hover:opacity-90 transition">
                Verify →
              </button>

              <p className="text-center text-xs text-white/40">
                ALREADY SIGNED-IN
              </p>

            </div>
          </div>
        </div>
      </div>

 
    
    </div>
  );
}