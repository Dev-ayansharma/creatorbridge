"use client";

import { Icons } from "./icons";

export default function Topbar() {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "14px 28px",
      borderBottom: "1px solid #202123",
      background: "#111213",
      gap: 10,
      position: "sticky",
      top: 0,
      zIndex: 40,
    }}>
      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#1c1d1f",
        border: "1px solid #2a2b2d",
        borderRadius: 8,
        padding: "7px 14px",
        width: 220,
        cursor: "text",
      }}>
        <span style={{ color: "#555", display: "flex" }}><Icons.Search /></span>
        <span style={{ fontSize: 13, color: "#444" }}>Search resources...</span>
      </div>

      {/* Bell */}
      <button style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "#1c1d1f", border: "1px solid #2a2b2d",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "#888",
      }}>
        <Icons.Bell />
      </button>

      {/* Account */}
      <button style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "#1c1d1f", border: "1px solid #2a2b2d",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: "#888",
      }}>
        <Icons.Account />
      </button>
    </header>
  );
}