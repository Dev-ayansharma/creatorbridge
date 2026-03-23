"use client";

import { useState } from "react";

export default function VerifyAccount() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05),transparent_40%)]" />

      {/* Header */}
      <div className="absolute top-6 left-6 text-xs text-white/70 tracking-wide">
        CREATOR BRIDGE
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] text-center">

        {/* Icon */}
        <div className="w-12 h-12 mx-auto mb-6 bg-black/60 rounded-md flex items-center justify-center">
          📩
        </div>

        <h2 className="text-xl font-semibold mb-2">Verify Account</h2>

        <p className="text-white/60 text-sm mb-6">
          We sent a unique 6-digit verification code to your registered email address.
        </p>

        {/* OTP */}
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, i) => (
            <input
              key={i}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              maxLength={1}
              className="w-10 h-12 text-center bg-black/60 border border-white/10 rounded-md text-lg focus:outline-none focus:border-white/30"
            />
          ))}
        </div>

        <button className="w-full bg-white text-black py-3 rounded-md text-sm font-medium tracking-wide hover:opacity-90 transition mb-4">
          SUBMIT VERIFICATION
        </button>

        <p className="text-xs text-white/40 mb-2">
          Didn’t receive the code?
        </p>

        <button className="text-xs text-white/70 hover:text-white transition">
          RESEND MESSAGE
        </button>

        <div className="mt-6 text-[10px] text-white/30 tracking-widest">
          SECURE VERIFICATION INTERFACE — 2.0.4
        </div>
      </div>
    </div>
  );
}