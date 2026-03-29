"use client";

import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function VerifyAccount() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // update form value
    const otpValue = newCode.join("");
    form.setValue("otp", otpValue);
  };

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      await axios.post<ApiResponse>(`/api/editor/verifycode`, {
        username: params.username,
        code: data.otp,
      });

      toast.success("Verified successfully");

      router.replace(`/auth/${params.username}/login`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ?? "Verification failed"
      );
    } finally {
      setIsSubmitting(false);
    }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative z-10 w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] text-center"
      >

        {/* Icon */}
        <div className="w-12 h-12 mx-auto mb-6 bg-black/60 rounded-md flex items-center justify-center">
          📩
        </div>

        <h2 className="text-xl font-semibold mb-2">Verify Account</h2>

        <p className="text-white/60 text-sm mb-6">
          We sent a unique 6-digit verification code to your registered email address.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 mb-4">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {inputsRef.current[i] = el}}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              maxLength={1}
              className="w-10 h-12 text-center bg-black/60 border border-white/10 rounded-md text-lg focus:outline-none focus:border-white/30"
            />
          ))}
        </div>

        {/* Error */}
        {form.formState.errors.otp && (
          <p className="text-red-400 text-xs mb-4">
            {form.formState.errors.otp.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black py-3 rounded-md text-sm font-medium tracking-wide hover:opacity-90 transition mb-4 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Verifying...
            </>
          ) : (
            "SUBMIT VERIFICATION"
          )}
        </button>
      </form>
    </div>
  );
}