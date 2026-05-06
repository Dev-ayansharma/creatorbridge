"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    number: "1",
    title: "Information We Collect",
    content: (
      <>
        <p style={{ fontWeight: 600, color: "#aaa", fontSize: 13, margin: "0 0 8px" }}>
          a. Account Information
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Profile picture</li>
        </ul>

        <p style={{ fontWeight: 600, color: "#aaa", fontSize: 13, margin: "16px 0 8px" }}>
          b. Authentication Data
        </p>
        <ul>
          <li>Google OAuth tokens (for Owners)</li>
          <li>JWT session tokens</li>
        </ul>

        <p style={{ fontWeight: 600, color: "#aaa", fontSize: 13, margin: "16px 0 8px" }}>
          c. Content Data
        </p>
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
          , including the <strong>Limited Use requirements</strong>.
        </p>

        <p>We only use Google user data to provide user-facing features such as:</p>
        <ul>
          <li>Uploading videos to your YouTube channel</li>
          <li>Fetching channel information</li>
        </ul>

        <p>We do <strong>NOT</strong>:</p>
        <ul>
          <li>Sell or rent your data</li>
          <li>Use it for advertising</li>
          <li>Share it with unauthorized third parties</li>
        </ul>

        <p>
          We do not store or retain Google user data beyond what is necessary to provide these features.
        </p>
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
        <p>We only share data with third parties strictly necessary for core functionality.</p>
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
          <li>Disconnect Google access at any time</li>
          <li>Update your data</li>
        </ul>

        <p>
          You can revoke access directly from your Google account here:
          <br />
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#888", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            https://myaccount.google.com/permissions
          </a>
        </p>
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
      <p>
        We may update this policy. Continued use of the platform constitutes acceptance of the revised policy.
      </p>
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
      <main
        style={{
          flex: 1,
          maxWidth: 760,
          width: "100%",
          margin: "0 auto",
          padding: "72px 32px 80px",
        }}
      >
        <div style={{ marginBottom: 52 }}>
          <h1 style={{ fontSize: "40px", fontWeight: 800 }}>Privacy Policy</h1>
          <p style={{ color: "#777", marginTop: 10 }}>Last Updated: 6 May 2026</p>
        </div>

        {sections.map((section, idx) => (
          <div key={section.number} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>
              {section.number}. {section.title}
            </h2>
            <div style={{ marginTop: 10 }}>{section.content}</div>
            {idx < sections.length - 1 && (
              <div style={{ height: 1, background: "#222", marginTop: 20 }} />
            )}
          </div>
        ))}
      </main>

      <div style={{ padding: 20 }}>
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "#888",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={14} /> Back
        </button>
      </div>
    </div>
  );
}