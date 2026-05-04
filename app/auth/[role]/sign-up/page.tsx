


"use client"

import { signupSchema } from '@/schemas/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useDebounceCallback } from 'usehooks-ts'
import axios, { AxiosError } from "axios"
import { ApiResponse } from '@/types/ApiResponse';
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link';
export default function SignUp() {
  const [username, setUsername] = useState('')
  const [usernamemssg, setUsernamemssg] = useState('')
  const [ischeckingusername, setIscheckingusername] = useState(false)
  const [issubmitting, setIssubmitting] = useState(false)
  
  const debounced = useDebounceCallback(setUsername, 300)
  const router = useRouter()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    const checkusername = async () => {
      if (username) {
        setIscheckingusername(true)
        setUsernamemssg('')
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernamemssg(response.data.message)
        } catch (error) {
          const axioserror = error as AxiosError<ApiResponse>
          setUsernamemssg(
            axioserror.response?.data.message ?? "something went wrong"
          )
        } finally {
          setIscheckingusername(false)
        }
      }
    }
    checkusername()
  }, [username])

  const onsubmit = async (data: z.infer<typeof signupSchema>) => {
    setIssubmitting(true)

    try {
      const response = await axios.post<ApiResponse>("/api/editor/register", data)
      setUsernamemssg(response.data.message)
      toast.success(response.data.message)

      router.replace(`/auth/editor/sign-up/verify/${data.username}`)
    } catch (error) {
      const axioserror = error as AxiosError<ApiResponse>
      toast.error(axioserror.response?.data.message ?? "Signup failed")
    } finally {
      setIssubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgb(0, 0, 0),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_40%)]" />

      <div className="relative z-10 grid md:grid-cols-2 gap-20 w-full max-w-6xl px-6">

        {/* Left */}
        <div className="flex flex-col justify-center">
          <a href="#" className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">||</span>
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
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] space-y-5"
          >

            {/* Username */}
            <div>
              <label className="text-xs text-white/50">USERNAME</label>
              <input
                {...form.register("username")}
                onChange={(e) => {
                  form.setValue("username", e.target.value)
                  debounced(e.target.value)
                }}
                className="w-full mt-2 bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                placeholder="Enter a unique one"
              />

              {ischeckingusername && (
                <Loader2 className="animate-spin mt-2" size={16} />
              )}

              {usernamemssg && (
                <p className={`text-xs mt-1 ${usernamemssg === "username is unique" ? "text-green-500" : "text-red-500"}`}>
                  {usernamemssg}
                </p>
              )}

              <p className="text-red-400 text-xs mt-1">
                {form.formState.errors.username?.message}
              </p>
            </div>

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
 <Link href= "/auth/editor/login">
            <p className="text-center text-xs text-white/40">
              ALREADY REGISTERED
            </p></Link>

          </form>
        </div>
      </div>
    </div>
  );
}