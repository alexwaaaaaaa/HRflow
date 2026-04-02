import { Edit2 } from "lucide-react";

export const PROFILE = {
    name: "Rahul Kumar Sharma", initials: "RK", id: "EMP001",
    designation: "Senior Software Engineer", dept: "Engineering", status: "Active",
    doj: "01/06/2021", manager: "Karan Mehta", location: "Bengaluru",
    email: "rahul.sharma@techcorp.com", personal: "rahul@gmail.com",
    mobile: "+91 98765 43210", pan: "AAACT****C", aadhaar: "--5678",
    dob: "15/08/1996", age: 28, gender: "Male", blood: "B+",
    empType: "Full-Time", workMode: "Hybrid", grade: "L3",
    ctc: "₹18,00,000", joinConfirm: "01/12/2021", notice: "60 days",
};

export function DataGrid({ items }: { items: [string, string][] }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 32px" }}>
            {items.map(([label, value]) => (
                <div key={label}>
                    <div style={{ fontSize: 11, color: "#445566", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#FFFFFF" }}>{value || "—"}</div>
                </div>
            ))}
        </div>
    );
}

export function Card({ title, editAction, children, warning }: { title?: string; editAction?: () => void; children: React.ReactNode; warning?: boolean }) {
    return (
        <div style={{ background: "#0D1928", border: `1px solid ${warning ? "rgba(255,184,0,0.2)" : "#1A2A3A"}`, borderRadius: 16, padding: 24, marginBottom: 16 }}>
            {title && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>{title}</h3>
                    {editAction && (
                        <button onClick={editAction} style={{ fontSize: 12, color: "#0066FF", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                            <Edit2 size={12} /> Edit
                        </button>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
