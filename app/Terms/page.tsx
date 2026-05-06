"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    number: "1",
    title: "Eligibility",
    content: (
      <p>You must be at least 18 years old and capable of entering into a legally binding agreement.</p>
    ),
  },
  {
    number: "2",
    title: "Accounts & Roles",
    content: (
      <>
        <p>Our platform supports two roles:</p>
        <ul>
          <li><strong>Owner:</strong> Connects their YouTube channel and manages publishing</li>
          <li><strong>Editor:</strong> Uploads and manages content within assigned workspaces</li>
        </ul>
        <p>You are responsible for:</p>
        <ul>
          <li>Maintaining account security</li>
          <li>All activity under your account</li>
        </ul>
      </>
    ),
  },
  {
    number: "3",
    title: "Workspace & Collaboration",
    content: (
      <>
        <ul>
          <li>Owners can create workspaces and assign one editor</li>
          <li>Editors can upload content (video, thumbnail, metadata)</li>
          <li>Owners have final authority to approve or reject uploads</li>
        </ul>
        <p>We do not guarantee that uploaded content will be published.</p>
      </>
    ),
  },
  {
    number: "4",
    title: "YouTube Integration",
    content: (
      <>
        <p>By connecting your Google account, you authorize us to:</p>
        <ul>
          <li>Upload videos on your behalf</li>
          <li>Set thumbnails, metadata, and privacy settings</li>
        </ul>
        <p>We use permissions such as:</p>
        <ul>
          <li><code>youtube.upload</code></li>
          <li><code>youtube</code></li>
        </ul>
        <p>We do not:</p>
        <ul>
          <li>Delete your content without permission</li>
          <li>Modify your channel outside your actions</li>
        </ul>
      </>
    ),
  },
  {
    number: "5",
    title: "Content Responsibility",
    content: (
      <>
        <p>You are solely responsible for content you upload.</p>
        <p>You agree <strong>NOT</strong> to upload:</p>
        <ul>
          <li>Copyrighted material without rights</li>
          <li>Illegal, harmful, or misleading content</li>
        </ul>
        <p>We reserve the right to remove content violating policies.</p>
      </>
    ),
  },
  {
    number: "6",
    title: "Data & Storage",
    content: (
      <>
        <ul>
          <li>Videos and thumbnails may be temporarily stored (e.g., Cloudinary)</li>
          <li>Metadata is stored in our database</li>
        </ul>
        <p>We are not liable for:</p>
        <ul>
          <li>Data loss</li>
          <li>Third-party service failures</li>
        </ul>
      </>
    ),
  },
  {
    number: "7",
    title: "Termination",
    content: (
      <>
        <p>We may suspend or terminate accounts if:</p>
        <ul>
          <li>Terms are violated</li>
          <li>Abuse or misuse is detected</li>
        </ul>
      </>
    ),
  },
  {
    number: "8",
    title: "Limitation of Liability",
    content: (
      <>
        <p>We provide the platform "as is".</p>
        <p>We are not liable for:</p>
        <ul>
          <li>YouTube API failures</li>
          <li>Upload errors</li>
          <li>Loss of revenue or audience</li>
        </ul>
      </>
    ),
  },
  {
    number: "9",
    title: "Changes to Terms",
    content: (
      <p>We may update these terms. Continued use of the platform means acceptance of the revised terms.</p>
    ),
  },
  {
    number: "10",
    title: "Contact",
    content: (
      <p>
        For support, reach us at:{" "}
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

export default function TermsOfServicePage() {
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
        .tos-section ul {
          margin: 10px 0;
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .tos-section ul li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #777;
          line-height: 1.65;
        }
        .tos-section ul li::before {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #333;
          flex-shrink: 0;
          margin-top: 8px;
        }
        .tos-section p {
          font-size: 14px;
          color: #777;
          line-height: 1.7;
          margin: 8px 0 0;
        }
        .tos-section strong {
          color: #aaa;
          font-weight: 600;
        }
        .tos-section code {
          background: #1a1b1d;
          border: 1px solid #252627;
          border-radius: 5px;
          padding: 2px 8px;
          font-size: 12px;
          color: #bbb;
          font-family: 'Geist Mono', 'Fira Code', monospace;
        }
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
            Terms of Service
          </h1>
          <p style={{ color: "#444", marginTop: 12, fontSize: 13, lineHeight: 1.6 }}>
            Last Updated: 06 May 2026
          </p>
          <p style={{ color: "#555", marginTop: 10, fontSize: 14, lineHeight: 1.7 }}>
            Welcome to Creator Bridge ("Platform", "we", "our", "us"). By accessing or using
            our platform, you agree to the following terms.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1a1b1d", marginBottom: 48 }} />

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {sections.map((section, idx) => (
            <div key={section.number}>
              <div
                className="tos-section section-row"
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

              {/* Divider between sections */}
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