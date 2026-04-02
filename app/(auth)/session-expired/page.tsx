import { Clock, FileText, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SessionExpiredPage() {
    return (
        <div className="min-h-screen flex items-center justify-center animate-fade-in" style={{ background: "#060B14" }}>
            <div style={{ width: 440, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 24, padding: 48 }}>
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#00E5A0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                </div>

                <div className="flex justify-center mb-6">
                    <div style={{ background: "rgba(255,184,0,0.1)", borderRadius: 16, padding: 20 }}>
                        <Clock size={44} color="#FFB800" />
                    </div>
                </div>

                <h1 style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", textAlign: "center", margin: 0 }}>Session Expired</h1>
                <p style={{ fontSize: 14, color: "#8899AA", textAlign: "center", marginTop: 8, marginBottom: 24 }}>
                    Your session has timed out after 30 minutes of inactivity. Please sign in again to continue.
                </p>

                {/* Last activity */}
                <div className="rounded-xl p-4 flex flex-col gap-2 mb-6" style={{ background: "#060B14", border: "1px solid #1A2A3A" }}>
                    <div className="flex items-center gap-2" style={{ fontSize: 12, color: "#8899AA" }}>
                        <Clock size={12} /> Last active on: 12/11/2024 at 10:30 AM
                    </div>
                    <div className="flex items-center gap-2" style={{ fontSize: 14, color: "#FFFFFF" }}>
                        <FileText size={14} /> You were working on: Payroll - November 2024
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                    <a href="/login">
                        <Button size="lg" className="w-full">Sign In Again</Button>
                    </a>
                    <Button variant="ghost" size="lg" className="w-full">Continue as Different User</Button>
                </div>

                <div className="flex items-center justify-center gap-1.5" style={{ color: "#445566", fontSize: 12 }}>
                    <ShieldCheck size={12} /> For security, all unsaved changes may be lost.
                </div>
            </div>
        </div>
    );
}
