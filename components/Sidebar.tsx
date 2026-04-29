"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icons } from "./icons";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", href: "/edashboard", icon: Icons.Dashboard },
  { label: "Profile", href: "/eprofile", icon: Icons.Profile },
  { label: "My Workspace", href: "/workspace", icon: Icons.Workspace },

];
const navItems2 = [
  { label: "Dashboard", href: "/odashboard", icon: Icons.Dashboard },
  { label: "Profile", href: "/oprofile", icon: Icons.Profile },
  { label: "My Workspace", href: "/workspace", icon: Icons.Workspace },
  
];

 
export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
 const {user,refreshUser} = useAuth()
 
const router = useRouter();

const handleLogout = async () => {
  try {
    await fetch("/api/sign-out", {
      method: "POST",
    });
    await refreshUser()
    router.push("/"); // or homepage
  } catch (error) { 
    toast.error("Logout successfully")
    console.error("Logout failed", error);
  }
};
  const COLLAPSED_W = 64;
  const EXPANDED_W = 228;

  return (
    <>
      {/* Invisible hover zone to trigger open */}
      <div
        style={{ position: "fixed", left: 0, top: 0, width: COLLAPSED_W, height: "100vh", zIndex: 50 }}
        onMouseEnter={() => setExpanded(true)}
      />

      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{
          position: "fixed",
          left: 0, top: 0, bottom: 0,
          width: expanded ? EXPANDED_W : COLLAPSED_W,
          background: "#000000",
          borderRight: "1px solid #262729",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          overflow: "hidden",
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "width",
        }}
      >
        {/* Logo */}
        <div style={{
          padding: expanded ? "28px 20px 32px 20px" : "28px 0 32px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "flex-start" : "center",
          transition: "padding 0.25s, justify-content 0.25s",
          minHeight: 88,
          flexShrink: 0,
        }}>
          <div style={{
            width: 32, height: 32,
            background: "#e8e8e8",
            borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            color: "#111213",
          }}>
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-zinc-950 font-bold text-sm">||</span>
          </div>
          </div>
          <div style={{
            marginLeft: 10,
            opacity: expanded ? 1 : 0,
            width: expanded ? "auto" : 0,
            overflow: "hidden",
            transition: "opacity 0.2s 0.05s, width 0.25s",
            whiteSpace: "nowrap",
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f0", letterSpacing: "-0.3px", lineHeight: 1 }}>
              Creator Bridge
            </div>
         
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: expanded ? "0 10px" : "0 8px" }}>
          { user?.role === "EDITOR"  ?
             navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={label} href={href} style={{ textDecoration: "none" }}>
                <div
                  title={!expanded ? label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: expanded ? "10px 14px" : "10px 0",
                    justifyContent: expanded ? "flex-start" : "center",
                    borderRadius: 8,
                    background: isActive ? "#242527" : "transparent",
                    color: isActive ? "#f0f0f0" : "#777",
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    marginBottom: 2,
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s, padding 0.25s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ flexShrink: 0, display: "flex" }}>
                    <Icon />
                  </span>
                  <span style={{
                    opacity: expanded ? 1 : 0,
                    width: expanded ? "auto" : 0,
                    overflow: "hidden",
                    transition: "opacity 0.15s 0.08s, width 0.25s",
                  }}>
                    {label}
                  </span>
                </div>


              </Link>
            );
          }) : navItems2.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={label} href={href} style={{ textDecoration: "none" }}>
                <div
                  title={!expanded ? label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: expanded ? "10px 14px" : "10px 0",
                    justifyContent: expanded ? "flex-start" : "center",
                    borderRadius: 8,
                    background: isActive ? "#242527" : "transparent",
                    color: isActive ? "#f0f0f0" : "#777",
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    marginBottom: 2,
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s, padding 0.25s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ flexShrink: 0, display: "flex" }}>
                    <Icon />
                  </span>
                  <span style={{
                    opacity: expanded ? 1 : 0,
                    width: expanded ? "auto" : 0,
                    overflow: "hidden",
                    transition: "opacity 0.15s 0.08s, width 0.25s",
                  }}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          }) }


        </nav>

        <button
  onClick={handleLogout}
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: expanded ? "10px 14px" : "10px 0",
    justifyContent: expanded ? "flex-start" : "center",
    borderRadius: 8,
    background: "transparent",
    color: "#777",
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    width: "100%",
    transition: "all 0.2s",
  }}
>
  <span style={{ display: "flex" }}>
    <Icons.Logout />
  </span>

  <span
    style={{
      opacity: expanded ? 1 : 0,
      width: expanded ? "auto" : 0,
      overflow: "hidden",
      transition: "opacity 0.15s 0.08s, width 0.25s",
    }}
  >
    Logout
  </span>
</button>

        {/* User + bottom */}
        <div style={{
          borderTop: "1px solid #262729",
          padding: expanded ? "16px 16px 20px" : "16px 8px 20px",
          flexShrink: 0,
        }}>
          {/* Avatar row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
            justifyContent: expanded ? "flex-start" : "center",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #4a5568, #2d3748)",
              border: "2px solid #333",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <img src={user?.profilePic  } alt="profile" />
            </div>
            <div style={{
              opacity: expanded ? 1 : 0,
              width: expanded ? "auto" : 0,
              overflow: "hidden",
              transition: "opacity 0.15s 0.08s, width 0.25s",
              whiteSpace: "nowrap",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#e8e8e8", letterSpacing: "0.03em" }}>{user?.username}</div>
            
            </div>
          </div>

          {/* Bottom nav */}
       
        </div>
      </aside>
    </>
  );
}

