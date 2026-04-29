"use client";

import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const fetchprofile = async () => {
    try {
      const res = await axios.get("/api/oprofile");
      
      if (res.data.success) {
        setProfile(res.data.data);
        console.log(res.data.data)
      } else {
        setProfile({});
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchprofile();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-10">
      <div className="max-w-xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Your Profile
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Manage your personal information
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center sm:text-left sm:items-start gap-5">

          {/* AVATAR */}
          <div className="relative">
            {loading ? (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-800 animate-pulse" />
            ) : (
              <img
                src={profile?.thumbnail || "/avatar.png"}
                alt="profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/10"
              />
            )}

          </div>  

          {/* USER INFO */}
          <div className="w-full">

            <div className="mb-4">
              <p className="text-xs text-white/40 mb-1">DISPLAY NAME</p>
              <h2 className="text-lg sm:text-2xl font-semibold break-words">
                {loading ? "Loading..." : profile?.uname || "No Name"}
              </h2>
            </div>

            {/* OPTIONAL EXTRA FIELD (you can remove if not needed) */}
            <div className="bg-black/30 border border-white/5 rounded-lg p-3">
              <p className="text-xs text-white/40 mb-1">USER ID</p>
              <p className="text-sm text-white/80 break-all">
                {profile?._id || "N/A"}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}