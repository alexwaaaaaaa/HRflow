"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Building, Users, CreditCard, Play } from "lucide-react";
import Button from "@/components/ui/Button";

// Confetti Component
function Confetti() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    const colors = ["#00E5A0", "#0066FF", "#FFB800", "#FF4444", "#FFFFFF"];
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
            {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} style={{
                    position: "absolute", left: `${Math.random() * 100}%`, top: -10,
                    width: 8, height: 8, borderRadius: Math.random() > 0.5 ? "50%" : 2,
                    background: colors[i % colors.length],
                    animation: `confetti-fall ${2 + Math.random() * 2}s ease-in ${Math.random() * 0.5}s forwards`,
                }} />
            ))}
        </div>
    );
}

export default function SetupCompletePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center animate-fade-in" style={{ background: "#060B14" }}>
            <Confetti />

            <div className="relative z-10 w-full max-w-3xl px-8">
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <CheckCircle2 size={40} color="#00E5A0" />
                </div>

                <h1 style={{ fontSize: 48, fontWeight: 700, color: "#FFFFFF", marginBottom: 16 }}>
                    You&apos;re All Set! 🎉
                </h1>
                <p style={{ fontSize: 18, color: "#8899AA", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.6 }}>
                    TechCorp Solutions Pvt. Ltd. is successfully configured on HRFlow. Your team is ready to use India&apos;s smartest HRMS.
                </p>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "24px 16px" }}>
                        <Building size={24} color="#0066FF" style={{ margin: "0 auto 12px" }} />
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>2</div>
                        <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Locations Setup</div>
                    </div>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "24px 16px" }}>
                        <Users size={24} color="#FFB800" style={{ margin: "0 auto 12px" }} />
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>12</div>
                        <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Departments Configured</div>
                    </div>
                    <div style={{ background: "#0D1928", border: "1px solid #00E5A0", borderRadius: 16, padding: "24px 16px" }}>
                        <CreditCard size={24} color="#00E5A0" style={{ margin: "0 auto 12px" }} />
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF" }}>Verified</div>
                        <div style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Primary Bank Account</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center gap-6">
                    <Button variant="secondary" size="lg" className="h-14 px-8 text-base">Explore Dashboard</Button>
                    <Button size="lg" className="h-14 px-8 text-base shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] transition-shadow">
                        <Play size={18} className="mr-2" fill="currentColor" /> Add Your First Employee
                    </Button>
                </div>

            </div>

            {/* Background decorations */}
            <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, background: "#00E5A0", filter: "blur(150px)", opacity: 0.1, zIndex: 0 }} />
            <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, background: "#0066FF", filter: "blur(150px)", opacity: 0.1, zIndex: 0 }} />
        </div>
    );
}
