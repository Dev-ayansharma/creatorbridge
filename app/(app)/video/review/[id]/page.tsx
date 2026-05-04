"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import {formatDistanceToNow} from 'date-fns'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";



type Review = {
  _id:string;
  commentedby:{username:string};
  comment:string;
  createdAt:string;

};





export default function ReviewPage() {
 const params = useParams<{ id: string }>();
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const MAX = 2000;
  const {user} = useAuth()
  
  const handleSubmit = async () => {
    setSubmitting(true)
     const res = await axios.post("/api/comment",{
        text:reviewText,
        videoid:params.id
     }
     )  

     if(res.data.success){
      toast.success("the review is submitted succesfully")
    
     }else{
       toast.error("the review is not submitted yet")
 
     }

     setSubmitting(false)
     setReviewText("")
     fetchcomments()
    
  };
  const fetchcomments = async() =>{
   
      const res = await axios.get("/api/comments",{
        params: { video_id: params.id },
      })
      console.log(res.data)

      if(res.data.success){
        setReviews(res.data.data)
       
      }else{
        setReviews([])
       
      }


  }

  useEffect(()=>{
    fetchcomments()
  },[])


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
        * { box-sizing: border-box; }
        ::placeholder { color: #3a3b3d; }
        textarea:focus { outline: none; }
        .rating-btn:hover { border-color: #3a3b3d !important; }
        .nav-link:hover { color: #f0f0f0 !important; }
        .load-more:hover { background: #1e1f21 !important; }
        @media (max-width: 600px) {
          .page-content { padding: 32px 16px !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

     

      {/* Main */}
      <main
        className="page-content"
        style={{
          flex: 1,
          maxWidth: 720,
          width: "100%",
          margin: "0 auto",
          padding: "64px 24px 80px",
        }}
      >
        {/* Page heading */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              color: "#f0f0f0",
              margin: 0,
              letterSpacing: "-1.2px",
              lineHeight: 1.1,
            }}
          >
            Review Submission
          </h1>
          <p style={{ color: "#555", marginTop: 10, fontSize: 14 }}>
            Share your collaboration experience with the architectural community.
          </p>
        </div>

        {/* Submission card */}
        <div
          style={{
            background: "#141516",
            border: "1px solid #1e1f21",
            borderRadius: 16,
            padding: "28px",
            marginBottom: 52,
          }}
        >
        

          {/* Detailed Review */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#444",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Your Detailed Review
            </div>
            <div
              style={{
                position: "relative",
                background: "#0e0f10",
                border: "1px solid #1e1f21",
                borderRadius: 10,
              }}
            >
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value.slice(0, MAX))}
                placeholder="What was the process like? Describe the visual fidelity and turnaround time...."
                rows={7}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "transparent",
                  border: "none",
                  color: "#d0d0d0",
                  fontSize: 14,
                  lineHeight: 1.6,
                  resize: "vertical",
                  fontFamily: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <div
                style={{
                  textAlign: "right",
                  padding: "6px 12px 10px",
                  fontSize: 11,
                  color: "#333",
                }}
              >
                {reviewText.length} / {MAX}
              </div>
            </div>
          </div>

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "transparent",
                border: "none",
                color: "#444",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
              }}
            >
             
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting || !reviewText.trim()}
              style={{
                padding: "11px 28px",
                borderRadius: 8,
                border: "none",
                background: "#f0f0f0",
                color: "#111",
                fontSize: 14,
                fontWeight: 600,
                cursor: submitting || !reviewText.trim() ? "not-allowed" : "pointer",
                opacity: submitting || !reviewText.trim() ? 0.5 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>

        {/* Community Reviews */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 28,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 800,
                color: "#f0f0f0",
                margin: 0,
                letterSpacing: "-0.8px",
              }}
            >
            Reviews
            </h2>
        
          </div>

          {/* Review list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {reviews.map((review, idx) => (
              <div
                key={review._id}
                style={{
                  padding: "28px 0",
                  borderBottom: idx < reviews.length - 1 ? "1px solid #1a1b1d" : "none",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                   
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e8e8", marginBottom: 3 }}>
                        { user?.username === review.commentedby.username  ? "You" : review.commentedby.username}
                      </div>

<div style={{ fontSize: 12, color: "#555" }}>
  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
</div>
                    
                    </div>

                    
                  </div>
                 
                </div>

                {/* Review text */}
                <p
                  style={{
                    fontSize: 14,
                    color: "#888",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

      
        </div>
      </main>

 
    </div>
  );
}
