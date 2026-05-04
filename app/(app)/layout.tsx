"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const COLLAPSED_W = 64;

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          marginLeft: COLLAPSED_W,  
          width: `calc(100% - ${COLLAPSED_W}px)`, 
          minHeight: "100vh",
          overflowX: "hidden",
          
           // 👈 kill horizontal scroll
        }}
      >
        <main
          style={{
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "16px 24px",
            background: "#000000"
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}