"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function DocumentationPage() {
  const router = useRouter();

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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
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
        <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>

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
              fontSize: 22,
            }}
          >
            📄
          </div>

          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              borderRadius: 20,
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.18)",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#f59e0b",
                display: "inline-block",
                animation: "pulse 1.8s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#f59e0b",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Coming Soon
            </span>
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
            Documentation
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.7,
              margin: "0 auto",
              maxWidth: 420,
            }}
          >
            We're working on comprehensive documentation for Creator Bridge.
            Guides, API references, and integration walkthroughs will be
            available here in a future release.
          </p>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "#1a1b1d",
              margin: "36px auto",
              maxWidth: 320,
            }}
          />

          {/* What to expect */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              textAlign: "left",
              maxWidth: 360,
              margin: "0 auto",
            }}
          >
            {[
              "Getting started guide",
              "Workspace & collaboration docs",
              "YouTube API integration reference",
              "Role-based access walkthrough",
              "Upload flow documentation",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: "#3a3b3d",
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: "1px solid #1e1f21",
                    background: "#141516",
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
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