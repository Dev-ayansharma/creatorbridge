import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Page shell */}
      <div
        style={{
          marginLeft: 64,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
       

        <main style={{ flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </>
  );
}