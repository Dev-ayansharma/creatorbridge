"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const email = "ayansharma132006@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        * { box-sizing: border-box; }
        .back-btn:hover { color: #888 !important; }
        .email-card:hover { border-color: #2a2b2d !important; background: #161718 !important; }
        .copy-btn:hover { color: #ccc !important; }
        .mailto-btn:hover { background: #f5f5f5 !important; }
      `}</style>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>

          {/* Icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#141516",
              border: "1px solid #1e1f21",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <Mail size={22} color="#555" />
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 800,
              color: "#f0f0f0",
              margin: "0 0 14px",
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.7,
              margin: "0 auto 36px",
              maxWidth: 380,
            }}
          >
            Have a question, issue, or just want to say hello? Reach out directly —
            we read every message.
          </p>

          {/* Email card */}
          <div
            className="email-card"
            style={{
              background: "#141516",
              border: "1px solid #1e1f21",
              borderRadius: 14,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 14,
              transition: "all 0.15s",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "#1a1b1d",
                  border: "1px solid #252627",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={15} color="#555" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#333",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Email
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#ccc",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {email}
                </div>
              </div>
            </div>

            {/* Copy button */}
            <button
              className="copy-btn"
              onClick={handleCopy}
              style={{
                background: "transparent",
                border: "none",
                color: copied ? "#4ade80" : "#333",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                transition: "color 0.15s",
                fontFamily: "inherit",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Open in mail */}
          <a
            href={`mailto:${email}`}
            className="mailto-btn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "13px 24px",
              borderRadius: 10,
              background: "#f0f0f0",
              color: "#111",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.15s",
            }}
          >
            <Mail size={15} />
            Open in Mail
          </a>

          {/* Divider */}
          <div style={{ height: 1, background: "#1a1b1d", margin: "32px auto" }} />

          {/* Response note */}
          <p style={{ fontSize: 12, color: "#2e2f31", lineHeight: 1.6 }}>
            We typically respond within 24–48 hours. For urgent matters, please include
            "URGENT" in your subject line.
          </p>
        </div>
      </main>

      {/* Footer */}
      <div
        style={{
          padding: "20px 32px",
          borderTop: "1px solid #1a1b1d",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          className="back-btn"
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            color: "#333",
            fontSize: 13,
            cursor: "pointer",
            padding: 0,
            transition: "color 0.15s",
            fontFamily: "inherit",
          }}
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>
    </div>
  );
}