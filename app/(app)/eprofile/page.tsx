"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Pencil, Loader2, X, Mail, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user, refreshUser } = useAuth();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setProfile(user);
    setLoading(false);
  }, [user]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return alert("Only images allowed");
    if (file.size > 2 * 1024 * 1024) return alert("Max 2MB");

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "profile-pics");

    try {
      const res = await axios.post("/api/upload", formData, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setProgress(percent);
        },
      });

      const imageUrl = res.data.url;

      await axios.post("/api/update-profile", {
        profilePic: imageUrl,
      });

      setProfile((prev: any) => ({
        ...prev,
        profilePic: imageUrl,
      }));

      setPreview(null);
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
      await refreshUser();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.12),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_40%)]" />

      <div className="max-w-xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Your Profile
          </h1>
          <p className="text-white/40 text-sm mt-2">
            Manage your account details and identity
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_60px_rgba(255,255,255,0.05)]">

          {/* AVATAR (UNCHANGED LOGIC) */}
          <div className="flex flex-col items-center gap-3 mb-8">

            <div className="relative w-24 h-24">

              <img
                src={preview || profile?.profilePic || "/avatar.png"}
                className="w-full h-full rounded-full object-cover border-4 border-white/10"
              />

              {uploading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-full">
                  <Loader2 className="animate-spin mb-1" size={16} />
                  <p className="text-xs">{progress}%</p>
                </div>
              )}

              <div
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white text-black p-1.5 rounded-full cursor-pointer hover:scale-110 transition"
              >
                <Pencil size={12} />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>

            {preview && (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPreview(null);
                    setFile(null);
                  }}
                  className="text-xs text-red-400 flex items-center gap-1"
                >
                  <X size={12} /> Cancel
                </button>

                <button
                  onClick={uploadImage}
                  className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-medium hover:bg-zinc-200"
                >
                  Save
                </button>
              </div>
            )}

            <p className="text-xs text-white/30">
              Upload image (max 2MB)
            </p>
          </div>

          {/* INFO */}
          <div className="space-y-4">

            {/* USERNAME */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-red-500/30 transition">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
                <User size={14} />
                USERNAME
              </div>
              <p className="text-lg font-semibold">
                {loading ? "Loading..." : profile?.username || "Not set"}
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-red-500/30 transition">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
                <Mail size={14} />
                EMAIL
              </div>
              <p className="text-sm sm:text-base font-medium truncate">
                {profile?.email}
              </p>
            </div>

            {/* ROLE */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 hover:border-red-500/30 transition">
              <div className="text-white/40 text-xs mb-1">ROLE</div>
              <p className="text-sm font-semibold text-white tracking-wide">
                {profile?.role || "EDITOR"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}