import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export const metadata = {
    title: "HR Dashboard — HRFlow",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen" style={{ background: "#04080f" }}>
            <Sidebar />
            <div style={{ marginLeft: 240, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Header />
                <main style={{ flex: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
