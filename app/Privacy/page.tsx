"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    number: "1",
    title: "Information We Collect",
    content: (
      <>
        <p style={{ fontWeight: 600, color: "#aaa", fontSize: 13, margin: "0 0 8px" }}>a. Account Information</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Profile picture</li>
        </ul>
        <p style={{ fontWeight: 600, color: "#aaa", fontSize: 13, margin: "16px 0 8px" }}>b. Authentication Data</p>
        <ul>
          <li>Google OAuth tokens (for Owners)</li>
          <li>JWT session tokens</li>
        </ul>
        <p style={{ fontWeight: 600, color: "#aaa", fontSize: 13, margin: "16px 0 8px" }}>c. Content Data</p>
        <ul>
          <li>Video files</li>
          <li>Thumbnails</li>
          <li>Metadata (title, description, tags)</li>
        </ul>
      </>
    ),
  },
  {
    number: "2",
    title: "How We Use Your Data",
    content: (
      <>
        <p>We use your data to:</p>
        <ul>
          <li>Authenticate users</li>
          <li>Enable collaboration between owners and editors</li>
          <li>Upload videos to YouTube on your behalf</li>
          <li>Improve platform performance</li>
        </ul>
      </>
    ),
  },
  {
    number: "3",
    title: "Google API Data Usage",
    content: (
      <>
        <p>
          Our use of Google data complies with the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#888", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Google API Services User Data Policy
          </a>
          .
        </p>
        <p>We only use data to:</p>
        <ul>
          <li>Upload videos</li>
          <li>Fetch channel info</li>
        </ul>
        <p>We do <strong>NOT</strong>:</p>
        <ul>
          <li>Sell your data</li>
          <li>Use it for advertising</li>
        </ul>
      </>
    ),
  },
  {
    number: "4",
    title: "Data Sharing",
    content: (
      <>
        <p>We do <strong>NOT</strong> sell or rent your data.</p>
        <p>We may share data with:</p>
        <ul>
          <li>Cloudinary (file storage)</li>
          <li>Google (YouTube API)</li>
        </ul>
      </>
    ),
  },
  {
    number: "5",
    title: "Data Security",
    content: (
      <>
        <p>We implement:</p>
        <ul>
          <li>Encrypted tokens (JWT)</li>
          <li>Secure cookies</li>
          <li>Server-side validation</li>
        </ul>
        <p>However, no system is 100% secure.</p>
      </>
    ),
  },
  {
    number: "6",
    title: "Data Retention",
    content: (
      <>
        <p>We retain data:</p>
        <ul>
          <li>As long as your account is active</li>
          <li>Until deletion is requested</li>
        </ul>
      </>
    ),
  },
  {
    number: "7",
    title: "Your Rights",
    content: (
      <>
        <p>You can:</p>
        <ul>
          <li>Request account deletion</li>
          <li>Disconnect Google access</li>
          <li>Update your data</li>
        </ul>
      </>
    ),
  },
  {
    number: "8",
    title: "Cookies",
    content: (
      <>
        <p>We use cookies to:</p>
        <ul>
          <li>Maintain login sessions</li>
          <li>Improve user experience</li>
        </ul>
      </>
    ),
  },
  {
    number: "9",
    title: "Third-Party Services",
    content: (
      <>
        <p>We rely on:</p>
        <ul>
          <li>Google OAuth (authentication)</li>
          <li>YouTube API (video upload)</li>
          <li>Cloudinary (media storage)</li>
        </ul>
        <p>Their policies apply separately.</p>
      </>
    ),
  },
  {
    number: "10",
    title: "Updates",
    content: (
      <p>We may update this policy. Continued use of the platform constitutes acceptance of the revised policy.</p>
    ),
  },
  {
    number: "11",
    title: "Contact",
    content: (
      <p>
        For privacy concerns, reach us at:{" "}
        <a
          href="mailto:ayansharma132006@gmail.com"
          style={{ color: "#888", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          ayansharma132006@gmail.com
        </a>
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
        .pp-section ul {
          margin: 10px 0 0;
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pp-section ul li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #777;
          line-height: 1.65;
        }
        .pp-section ul li::before {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #333;
          flex-shrink: 0;
          margin-top: 8px;
        }
        .pp-section p {
          font-size: 14px;
          color: #777;
          line-height: 1.7;
          margin: 8px 0 0;
        }
        .pp-section p:first-child { margin-top: 0; }
        .pp-section strong { color: #aaa; font-weight: 600; }
        .back-btn:hover { color: #888 !important; }
        @media (max-width: 600px) {
          .page-inner { padding: 40px 20px 60px !important; }
          .section-row { flex-direction: column !important; gap: 6px !important; }
          .section-number { min-width: unset !important; }
        }
      `}</style>

      {/* Main content */}
      <main
        className="page-inner"
        style={{
          flex: 1,
          maxWidth: 760,
          width: "100%",
          margin: "0 auto",
          padding: "72px 32px 80px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#333",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Legal
          </div>
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
            Privacy Policy
          </h1>
          <p style={{ color: "#444", marginTop: 12, fontSize: 13, lineHeight: 1.6 }}>
            Last Updated: 6 May 2026
          </p>
          <p style={{ color: "#555", marginTop: 10, fontSize: 14, lineHeight: 1.7 }}>
            Your privacy is important to us. This policy explains how we collect and use your data.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1a1b1d", marginBottom: 48 }} />

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {sections.map((section, idx) => (
            <div key={section.number}>
              <div
                className="pp-section section-row"
                style={{
                  display: "flex",
                  gap: 28,
                  padding: "32px 0",
                }}
              >
                {/* Number */}
                <div
                  className="section-number"
                  style={{
                    minWidth: 32,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#2a2b2d",
                    letterSpacing: "0.05em",
                    paddingTop: 2,
                    flexShrink: 0,
                  }}
                >
                  {section.number.padStart(2, "0")}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#e0e0e0",
                      margin: "0 0 10px",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {section.title}
                  </h2>
                  {section.content}
                </div>
              </div>

              {idx < sections.length - 1 && (
                <div style={{ height: 1, background: "#141516" }} />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer with back button */}
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