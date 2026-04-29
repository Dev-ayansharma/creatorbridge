"use client";

import { LoaderOne } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import UploadContent from "@/components/uploadcontent";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<any>(null);

  const fetchVideo = async () => {
    setLoading(true);
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

  // ✅ LOADING UI
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <LoaderOne />
      </div>
    );
  }

  // ✅ VIDEO FOUND
  if (video) {
    return (
      <UploadContent
        workspaceId={video?.workspace_id}
        mode="edit"
        initialData={video}
        videoId={video?._id}
      />
    );
  }

  // ❌ FALLBACK
  return (
    <div className="text-center text-white mt-10">
      Video not found
    </div>
  );
}