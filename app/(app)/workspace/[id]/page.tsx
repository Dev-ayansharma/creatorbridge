"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UploadContent from "@/components/uploadcontent";
import ContentDetails from "@/components/contentdetails";
import { LoaderOne } from "@/components/ui/loader";

export default function CheckVideo() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<any>(null);

  const fetchVideo = async () => {
    setLoading(true)
    try {
      const res = await axios.get("/api/video/read", {
        params: { Id: params.id },
        
      });

    

      if (res.data.success) {
        setVideo(res.data.data);
      } else {
        setVideo(null);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setVideo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

if (loading || !user) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-6">
        <LoaderOne />
        <p className="text-sm text-white/40 tracking-wide">
          Loading workspace...
        </p>
      </div>
    </div>
  );
}

if (user?.role === "EDITOR") {
  return video ? (
    <ContentDetails data={video} role={user.role} />
  ) : (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
      

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
          <UploadContent workspaceId={params.id} />
        </div>
      </div>
    </div>
  );
}

if (user?.role === "OWNER") {
  return video ? (
    <ContentDetails data={video} role={user.role} />
  ) : (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-white/[0.03] rounded-2xl p-10 backdrop-blur-xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center text-2xl">
          🎬
        </div>

        <h2 className="text-xl font-semibold text-white mb-3">
          Awaiting Upload
        </h2>

        <p className="text-white/50 leading-relaxed">
          No video has been uploaded yet. Once your editor submits content,
          it will appear here for review and publishing.
        </p>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-black flex items-center justify-center px-6">
    <div className="text-center border border-red-500/20 bg-red-500/5 rounded-2xl px-10 py-8">
      <p className="text-red-400 font-medium text-lg mb-2">
        Access Denied
      </p>
      <p className="text-white/40 text-sm">
        Unauthorized or unknown role
      </p>
    </div>
  </div>
);
}







