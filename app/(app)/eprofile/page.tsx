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
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white px-4 py-10">
      <div className="max-w-xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="text-white/50 text-sm">
            Manage your account
          </p>
        </div>

        {/* AVATAR */}
        <div className="flex flex-col items-center gap-3 mb-8">

          <div className="relative w-24 h-24">

            <img
              src={preview || profile?.profilePic || "/avatar.png"}
              className="w-full h-full rounded-full object-cover border-4 border-white/10"
            />

            {/* Upload overlay */}
            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-full">
                <Loader2 className="animate-spin mb-1" size={16} />
                <p className="text-xs">{progress}%</p>
              </div>
            )}

            {/* Edit button */}
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

          {/* ACTIONS */}
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
                className="bg-white text-black px-3 py-1 rounded-md text-xs font-medium"
              >
                Save
              </button>
            </div>
          )}

          <p className="text-xs text-white/40">
            Upload image (max 2MB)
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="space-y-4">

          {/* USERNAME */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
              <User size={14} />
              USERNAME
            </div>
            <p className="text-base font-medium">
              {loading ? "Loading..." : profile?.username || "Not set"}
            </p>
          </div>

          {/* EMAIL */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
              <Mail size={14} />
              EMAIL
            </div>
         <p className="text-sm sm:text-base font-medium truncate">
  {profile?.email}
</p>
          </div>

          {/* ROLE */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-white/50 text-xs mb-1">ROLE</div>
            <p className="text-sm text-green-400 font-medium">
              {profile?.role || "EDITOR"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}