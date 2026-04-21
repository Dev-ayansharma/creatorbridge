"use client";

import { signInSchema } from "@/schemas/signInSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod"
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function LogIn() {

  const [issubmitting,setIssubmitting]= useState(false)
    const router = useRouter()
    const {refreshUser} = useAuth()
    const form = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
        email: '',
        password: '',
      }
    })

    const onsubmit = async (data: z.infer<typeof signInSchema>) => {
        setIssubmitting(true)
    
        try {
          const response = await axios.post<ApiResponse>("/api/editor/sign-in", data)
        
          toast.success(response.data.message)
          await refreshUser()
          router.replace(`/edashboard`)
        } catch (error) {
          const axioserror = error as AxiosError<ApiResponse>
          toast.error(axioserror.response?.data.message ?? "Signin failed")
        } finally {
          setIssubmitting(false)
        }
      }

  return (
    // <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">

    //   {/* Top Bar */}
    //   <header className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6 text-sm text-white/80">
    //     <span className="tracking-wide font-medium">CREATOR BRIDGE</span>
    //     <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">
    //       ?
    //     </div>
    //   </header>

    //   {/* Subtle Background Glow */}
    //   <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.04),transparent_40%)]" />

    //   {/* Center Container */}
    //   <div className="flex items-center justify-center min-h-screen px-4">

    //     <div className="w-full max-w-md bg-black/80 border border-white/5 rounded-xl px-10 py-12 backdrop-blur-xl shadow-[0_0_80px_rgba(255,255,255,0.04)]">

    //       {/* Title */}
    //       <h1 className="text-4xl font-semibold mb-3 text-white/90">
    //         Sign In
    //       </h1>

    //       <p className="text-sm text-white/50 mb-10 leading-relaxed">
    //         Access your architectural dashboard to bridge your creative vision.
    //       </p>

    //       {/* Username */}
    //       <div className="mb-6">
    //         <label className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
    //          Email
    //         </label>

    //         <input
    //           type="text"
    //           placeholder="architect@bridge.io"
    //           className="w-full mt-3 bg-black border border-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
    //         />
    //       </div>

    //       {/* Password */}
    //       <div className="mb-10">
    //         <div className="flex justify-between items-center">
    //           <label className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
    //             Password
    //           </label>
    //           <span className="text-[10px] text-white/30 cursor-pointer hover:text-white/60">
    //             FORGOT?
    //           </span>
    //         </div>

    //         <input
    //           type="password"
    //           placeholder="••••••••••••"
    //           className="w-full mt-3 bg-black border border-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
    //         />
    //       </div>

    //       {/* Button */}
    //       <button className="w-full bg-white text-black py-4 text-sm tracking-widest font-medium hover:opacity-90 transition shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
    //         SIGN IN
    //       </button>

    //       {/* Divider */}
    //       <div className="my-10 flex items-center gap-4">
    //         <div className="flex-1 h-[1px] bg-white/5" />
    //         <span className="text-[10px] text-white/30 tracking-[0.3em]">
    //           OR CONTINUE WITH
    //         </span>
    //         <div className="flex-1 h-[1px] bg-white/5" />
    //       </div>

    //       {/* Social Buttons */}
    //       <div className="grid grid-cols-2 gap-4 mb-10">
    //         <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 text-sm text-white/80 hover:bg-white/10 transition">
    //           ● GOOGLE
    //         </button>

    //         <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/5 text-sm text-white/80 hover:bg-white/10 transition">
    //           ▣ GITHUB
    //         </button>
    //       </div>

    //       {/* Footer */}
    //       <p className="text-center text-xs text-white/40">
    //         New to the bridge?{" "}
    //         <span className="text-white/70 cursor-pointer hover:underline">
    //           Create an account
    //         </span>
    //       </p>
    //     </div>
    //   </div>

    //   {/* Bottom Meta */}
    //   <div className="absolute bottom-4 left-6 text-[10px] text-white/20 tracking-widest">
    //     SYSTEM_STATUS: STABLE
    //   </div>

    //   <div className="absolute bottom-4 right-6 text-[10px] text-white/20 tracking-widest">
    //     V2.4.0_SLATE
    //   </div>
    // </div>

        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
    
          {/* Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_40%)]" />
    
          <div className="relative z-10 grid md:grid-cols-2 gap-20 w-full max-w-6xl px-6">
    
            {/* Left */}
            <div className="flex flex-col justify-center">
              <a href="#" className="flex flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-zinc-950 font-bold text-lg">||</span>
                </div>
                <span className="font-semibold text-white text-lg ">CreatorBridge</span>
              </a>
    
              <div className="text-white/60 max-w-sm text-sm mt-5">
                Access Your Journey
              </div>
    
              <div className="w-10 h-[1px] bg-white/30 mt-6" />
            </div>
    
            {/* Form */}
            <div className="flex justify-center">
              <form
                onSubmit={form.handleSubmit(onsubmit)}
                className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] space-y-5"
              >
    
              
    
                {/* Email */}
                <div>
                  <label className="text-xs text-white/50">EMAIL</label>
                  <input
                    {...form.register("email")}
                    className="w-full mt-2 bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                    placeholder="name@domain.com"
                  />
                  <p className="text-red-400 text-xs mt-1">
                    {form.formState.errors.email?.message}
                  </p>
                </div>
    
                {/* Password */}
                <div>
                  <label className="text-xs text-white/50">PASSWORD</label>
                  <input
                    type="password"
                    {...form.register("password")}
                    className="w-full mt-2 bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                    placeholder="••••••••"
                  />
                  <p className="text-red-400 text-xs mt-1">
                    {form.formState.errors.password?.message}
                  </p>
                </div>
    
                {/* Button */}
                <button
                  type="submit"
                  disabled={issubmitting}
                  className="w-full bg-white text-black py-3 rounded-md text-sm font-medium tracking-wide hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  {issubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Please wait
                    </>
                  ) : (
                    "Verify →"
                  )}
                </button>
    <Link href={'/auth/editor/sign-up'}>
                <p className="text-center text-xs text-white/40">
                  ALREADY SIGNED-IN
                </p>
    </Link>
              </form>
            </div>
          </div>
        </div>
  );
}