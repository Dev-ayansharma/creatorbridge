"use client";

import { useParams, useRouter } from "next/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import axios from "axios";

export default function TriggerAPIPage() {
  const router = useRouter();
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [loadingThumb, setLoadingThumb] = useState(false);
  const [isvuploaded,setisvuploaded] = useState(false)
  const [istuploaded,settuploaded] = useState(false)

  const params = useParams<{ id: string }>();
  const handleTriggerVideo = async () => {
    setLoadingVideo(true);
    try {
      const res = await axios.post("/api/video/onyt",{
         Id:params.id
      });
      ;
      if (res.data.success) {
        toast.success("Video API triggered successfully");
        setisvuploaded(true)
      }
      else {toast.error(res.data.message || "Failed to trigger Video API");}
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoadingVideo(false);
    }
  };

  const handleTriggerThumbnail = async () => {
    setLoadingThumb(true);
  
    try {
        const res = await axios.post("/api/video/onytnail",  {  Id:params.id});
      
           if (res.data.success){ 
            toast.success("Thumbnail API triggered successfully");
            settuploaded(true)
          }
      else toast.error(res.data.message || "Failed to trigger Thumbnail API");
    } catch (error) {
         toast.error("Something went wrong");
    }finally{
 setLoadingThumb(false);
    }
    
    
     
  
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#f0f0f0",
        fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .trigger-btn:hover:not(:disabled) { background: #222325 !important; border-color: #3a3b3d !important; }
      `}</style>

      {/* Center content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Trigger Video API */}
          <button
            className="trigger-btn"
            onClick={handleTriggerVideo}
            disabled={loadingVideo || loadingThumb || isvuploaded}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "20px 32px",
              background: "#18191b",
              border: "1px solid #2a2b2d",
              borderRadius: 12,
              color: "#f0f0f0",
              fontSize: 16,
              fontWeight: 600,
              cursor: loadingVideo ? "not-allowed" : "pointer",
              opacity: loadingThumb ? 0.4 : 1,
              transition: "all 0.18s",
              minWidth: 220,
              letterSpacing: "-0.1px",
            }}
          >
            <Sparkles
              size={18}
              color="#888"
              style={loadingVideo ? { animation: "spin 1s linear infinite" } : {}}
            />
            {loadingVideo ? "Triggering..." : "Trigger Video API"}
          </button>

          {/* Trigger Thumbnail API */}
          <button
            className="trigger-btn"
            onClick={handleTriggerThumbnail}
            disabled={loadingVideo || loadingThumb || istuploaded}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "20px 32px",
              background: "#18191b",
              border: "1px solid #2a2b2d",
              borderRadius: 12,
              color: "#f0f0f0",
              fontSize: 16,
              fontWeight: 600,
              cursor: loadingThumb ? "not-allowed" : "pointer",
              opacity: loadingVideo ? 0.4 : 1,
              transition: "all 0.18s",
              minWidth: 220,
              letterSpacing: "-0.1px",
            }}
          >
            <Sparkles
              size={18}
              color="#888"
              style={loadingThumb ? { animation: "spin 1s linear infinite" } : {}}
            />
            {loadingThumb ? "Triggering..." : "Trigger Thumbnail API"}
          </button>
          {isvuploaded && istuploaded && (
  <p
    style={{
      width: "100%",
      textAlign: "center",
      marginTop: 20,
      fontSize: 20,
      color: "#ffffff",
      letterSpacing: "0.01em",
    }}
  >
    Video and Thumbnail uploaded successfully
  </p>
)}

        </div>

        
      </div>

      {/* Back button footer */}
      <div
        style={{
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            color: "#444",
            fontSize: 13,
            cursor: "pointer",
            padding: 0,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
        >
          <ArrowLeft size={15} />
          Back
        </button>
      </div>
    </div>
  );
}