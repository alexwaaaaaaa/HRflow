import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export const metadata = {
    title: "HRFlow — Employee Management",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen" style={{ background: "#04080f" }}>
            <Sidebar />
            <div style={{ marginLeft: 240, display: "flex", flexDirection: "column", minHeight: "100vh", background: "#04080f" }}>
                <Header />
                <main style={{ flex: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
