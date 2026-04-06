'use client'
import { Icons } from "@/components/icons";

export default function DashboardPage() {
  return (
    <div style={{ padding: "40px 36px 48px" }}>

      {/* Page heading */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 700,
          color: "#eee",
          letterSpacing: "-1.5px",
          margin: 0,
          lineHeight: 1,
          fontFamily: "'DM Serif Display', Georgia, serif",
        }}>
          Your Summary
        </h1>
        <div style={{ width: 56, height: 2, background: "#000000", marginTop: 14 }} />
      </div>

      {/* Row 1: Metrics + Quick Status */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 16,
        marginBottom: 16,
      }}>
        {/* Performance Metrics */}
        <div style={{
          background: "#1a1b1d",
          border: "1px solid #252628",
          borderRadius: 14,
          padding: "28px 32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.16em", fontWeight: 600, margin: "0 0 28px" }}>
            PERFORMANCE METRICS
          </p>
          <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 11, color: "#4a4a4a", letterSpacing: "0.1em", margin: "0 0 8px" }}>TOTAL VIDEOS -</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: "#f0f0f0", letterSpacing: "-2px", lineHeight: 1 }}>124</span>
                <span style={{ fontSize: 13, color: "#5c8a5c", fontWeight: 500 }}>+12%</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#4a4a4a", letterSpacing: "0.1em", margin: "0 0 8px" }}>TOTAL WORKSPACES -</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: "#f0f0f0", letterSpacing: "-2px", lineHeight: 1 }}>08</span>
                <span style={{ fontSize: 13, color: "#666" }}>Enterprise</span>
              </div>
            </div>
          </div>
          <button style={{
            marginTop: 32, background: "none", border: "none", cursor: "pointer",
            color: "#777", fontSize: 11, letterSpacing: "0.12em", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8, padding: 0,
          }}>
            VIEW DETAILED ANALYTICS <Icons.ArrowRight />
          </button>
          {/* Decorative */}
          <div style={{ position: "absolute", right: 24, top: 24, opacity: 0.12, color: "#fff" }}>
            <Icons.BarChart />
          </div>
        </div>

        {/* Quick Status */}
        <div style={{
          background: "#1a1b1d",
          border: "1px solid #252628",
          borderRadius: 14,
          padding: "28px 26px",
        }}>
          <p style={{ fontSize: 11, color: "#555", letterSpacing: "0.16em", fontWeight: 600, margin: "0 0 24px" }}>
            QUICK STATUS
          </p>
          {[
            { label: "Pending -", count: "12", bg: "transparent", color: "#666" },
            { label: "Accept -",  count: "48", bg: "#3a3b3d", color: "#e8e8e8" },
            { label: "Reject -",  count: "03", bg: "#5c2323", color: "#e8e8e8" },
          ].map(({ label, count, bg, color }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "13px 0", borderBottom: "1px solid #222",
            }}>
              <span style={{ fontSize: 14, color: "#999" }}>{label}</span>
              <span style={{
                fontSize: 13, fontWeight: 600, color,
                background: bg, padding: bg !== "transparent" ? "3px 10px" : 0,
                borderRadius: 20, minWidth: 36, textAlign: "center",
              }}>
                {count}
              </span>
            </div>
          ))}
          <p style={{ fontSize: 11, color: "#3d3d3d", margin: "14px 0 0", fontStyle: "italic" }}>
            Last synced: Today at 09:42 AM
          </p>
        </div>
      </div>

      {/* Row 2: Project + Actions */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 16,
      }}>
        {/* Latest Project card */}
        <div style={{
          borderRadius: 14,
          overflow: "hidden",
          position: "relative",
          minHeight: 230,
          background: "#1a1b1d",
          border: "1px solid #252628",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80')",
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.3,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,10,11,0.97) 40%, rgba(10,10,11,0.25) 100%)",
          }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
            <span style={{
              fontSize: 9, letterSpacing: "0.15em", fontWeight: 600, color: "#ccc",
              border: "1px solid #444", borderRadius: 4, padding: "3px 8px",
              marginBottom: 12, display: "inline-block",
            }}>
              LATEST PROJECT
            </span>
            <div style={{ fontSize: 21, fontWeight: 700, color: "#f0f0f0", lineHeight: 1.2, marginBottom: 6, letterSpacing: "-0.4px" }}>
              Neon Pulse Campaign
            </div>
            <div style={{ fontSize: 13, color: "#777", lineHeight: 1.5 }}>
              Creative direction and post-production for the 2024 tech launch...
            </div>
          </div>
        </div>

        {/* Middle: New Video + Cloud Storage */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button style={{
            flex: 1,
            background: "#1a1b1d", border: "1px solid #252628", borderRadius: 14,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 10, cursor: "pointer", color: "#aaa", padding: "28px 0",
          }}>
            <div style={{
              width: 50, height: 50, borderRadius: "50%",
              background: "#222325",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icons.AddVideo />
            </div>
            <span style={{ fontSize: 14, color: "#bbb", fontWeight: 500 }}>New Video</span>
          </button>

          <div style={{
            background: "#1a1b1d", border: "1px solid #252628", borderRadius: 14,
            padding: "14px 18px",
            display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#222325",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: "#aaa",
            }}>
              <Icons.Cloud />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: "#ddd", fontWeight: 600, marginBottom: 3 }}>Cloud Storage</div>
              <div style={{ fontSize: 11, color: "#4a4a4a", letterSpacing: "0.04em" }}>74% USED • 12.4 GB REMAINING</div>
              <div style={{ marginTop: 7, height: 3, background: "#252628", borderRadius: 2 }}>
                <div style={{ width: "74%", height: "100%", background: "#555", borderRadius: 2 }} />
              </div>
            </div>
            <span style={{ color: "#444" }}><Icons.ChevronRight /></span>
          </div>
        </div>

        {/* Invite Team */}
        <button style={{
          background: "#1a1b1d", border: "1px solid #252628", borderRadius: 14,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 10, cursor: "pointer",
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: "50%",
            background: "#222325",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#aaa",
          }}>
            <Icons.Team />
          </div>
          <span style={{ fontSize: 14, color: "#bbb", fontWeight: 500 }}>Invite Team</span>
        </button>
      </div>

      {/* FAB */}
      <button style={{
        position: "fixed", bottom: 28, right: 28,
        width: 52, height: 52, borderRadius: "50%",
        background: "#f0f0f0", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)", color: "#111",
        zIndex: 200,    
      }}>
        <Icons.Plus />
      </button>
    </div>
  );
}