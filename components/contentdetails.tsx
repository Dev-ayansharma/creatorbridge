"use client";

import axios from "axios";
import {

  Globe,
  CheckCircle,
  Film,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";


type Props = {
  role: "EDITOR" | "OWNER";
  data: {
    _id: string;
    title: string;
    description: string;
    video_url: string;
    thumbnail_url: string;
    category: string;
    privacystatus: "public" | "private";
    status: string;
    tags: string[];
    
  };
};

export default function VideoDetailsPage({ data, role }: Props) {
  
   const router =  useRouter()
   console.log(data)
  const container: React.CSSProperties = {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "clamp(16px, 4vw, 24px)",
    color: "#f0f0f0",
    fontFamily: "'Geist','Inter',sans-serif",
  };

  const card: React.CSSProperties = {
    background: "#18191b",
    border: "1px solid #262729",
    borderRadius: 14,
    padding: 18,
  };

  const statCard: React.CSSProperties = {
    ...card,
    flex: "1 1 200px",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #2a2b2d",
    background: "#1c1d1f",
    color: "#ddd",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
  };

  
  const handleDelete = async() =>{
    const res = await axios.delete(`/api/video/delete?video_id=${data._id}`)
    if(!res.data.success){
        toast.error("the video is not deleted")
    }else{
    toast.success("the video is deleted successfully")}
    router.push("/edashboard")
  };
  const handleReject = async() =>{
     const res = await axios.patch(`/api/video/reject?video_id=${data._id}`)
    if(!res.data.success){
        toast.error("the video is not rejected yet")
    }else{
    toast.success("the video is rejected ")}
   router.push("/odashboard")
  };
  const handleAppraisal = () => {
    router.push(`/video/appraisal/${data._id}`)
  }
  const handleReview = () =>{
    router.push(`/video/review/${data._id}`)
  }

  return (
    <div style={{ background: "#000000", minHeight: "100vh",}}>
      <div style={container}>

        {/* 🎬 Video Section (Responsive Fixed) */}
      <div
  style={{
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "780px",
      borderRadius: 14,
      overflow: "hidden", // ✅ clips edges cleanly
      background: "black", // ✅ fallback (no grey edges)
    }}
  >
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
      }}
    >
      <video
        src={data.video_url}
        controls
        poster={data.thumbnail_url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block", // ✅ removes tiny gaps
        }}
      />
    </div>
  </div>
</div>

        {/* 🔥 ACTION BUTTONS */}
      

        {/* Thumbnail */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
            CUSTOM THUMBNAIL
          </div>
          <img
            src={data.thumbnail_url}
            style={{
              width: 120,
              maxWidth: "100%",
              borderRadius: 10,
              border: "1px solid #2a2b2d",
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(22px,4vw,32px)",
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          {data.title}
        </h1>

        {/* Description */}
        <div style={{ ...card, marginBottom: 24 }}>
          <p style={{ color: "#bbb", lineHeight: 1.6 }}>
            {data.description}
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div style={statCard}>
            <Film size={18} />
            <div style={{ fontSize: 11, color: "#666" }}>CATEGORY</div>
            <div>{data.category}</div>
          </div>

          <div style={statCard}>
            <Globe size={18} />
            <div style={{ fontSize: 11, color: "#666" }}>PRIVACY</div>
            <div>{data.privacystatus}</div>
          </div>

          <div style={statCard}>
            <CheckCircle size={18} />
            <div style={{ fontSize: 11, color: "#666" }}>STATUS</div>
            <div>{data.status}</div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>
            TAGS
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {data.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  background: "#1c1d1f",
                  border: "1px solid #2a2b2d",
                  fontSize: 12,
                  color: "#bbb",
                }}
              >
                {tag}
              </span>
            ))}
          </div>


          {/* 🔥 BOTTOM ACTION BAR */}
<div
  style={{
    position: "sticky",
    bottom: 0,
    marginTop: 40,
    paddingTop: 16,
    background: "#000000",
    borderTop: "1px solid #1f2022",
  }}
>
  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      justifyContent: "flex-end",
    }}
  >
    {role === "EDITOR" && (
      <>
    { data.status === "PENDING" && <Link href={`/video/edit/${data._id}`}>
        <button style={buttonStyle} >
          ✏️ Edit
        </button></Link>}

        <button  style={{
          ...buttonStyle,
          background: "#ff0000",
          color: "#000000",
          border: "none",
        }} onClick={handleDelete}>
          Delete
        </button>
      <Link href={`/video/review/${data._id}`}>
        <button style={buttonStyle} >
          👁 See Review
        </button></Link>
      </>
    )}

    {role === "OWNER"  && data.status === "PENDING" && (
      <>

      <button
        style={{
          ...buttonStyle,
          background: "#f0f0f0",
          color: "#111",
          border: "none",
        }}
        onClick={handleAppraisal}
      >
        Give Appraisal
      </button>
            <button
        style={{
          ...buttonStyle,
          background: "#f0f0f0",
          color: "#111",
          border: "none",
        }}
        onClick={handleReview}
      >
          Give review
      </button>
            
            
           <button
        style={{
          ...buttonStyle,
          background: "#ff3737",
          color: "#1e1d1d",
          border: "none",
        }}
        onClick={handleReject}
      >
         Reject
      </button>
      
      
      </>
    )}
  </div>
</div>
        </div>



      </div>

      
    </div>
  );
}