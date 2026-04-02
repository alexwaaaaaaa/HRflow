import ComplianceSidebar from "@/components/compliance/ComplianceSidebar";

export const metadata = {
    title: "Compliance & Statutory — HRFlow",
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", alignItems: "flex-start" }}>
            <ComplianceSidebar />
            <div style={{ flex: 1, minWidth: 0 }}>
                {children}
            </div>
        </div>
    );
}
