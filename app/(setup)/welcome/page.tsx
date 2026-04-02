"use client";

import { useEffect, useState } from "react";
import { Rocket, Building2, Users, Shield, Landmark, UserPlus, Zap, Clock, ArrowRight } from "lucide-react";

// Confetti Component
function Confetti() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    const colors = ["#00E5A0", "#0066FF", "#FFB800"];
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: `${Math.random() * 100}%`,
                    top: -10,
                    width: 8,
                    height: 8,
                    borderRadius: Math.random() > 0.5 ? "50%" : 2,
                    background: colors[i % colors.length],
                    animation: `confetti-fall 3s ease-in ${Math.random() * 0.5}s forwards`,
                }} />
            ))}
        </div>
    );
}

const CARDS = [
    { icon: Building2, color: "#00E5A0", title: "Company Details", sub: "PAN, GST, address, branding" },
    { icon: Users, color: "#0066FF", title: "Team Structure", sub: "Departments, designations, grades" },
    { icon: Shield, color: "#FFB800", title: "Statutory Compliance", sub: "PF, ESI, PT setup" },
    { icon: Landmark, color: "#00E5A0", title: "Payroll Configuration", sub: "Salary structures, bank details" },
    { icon: UserPlus, color: "#0066FF", title: "Invite Your Team", sub: "Add HR admins and managers" },
    { icon: Zap, color: "#FFB800", title: "Go Live!", sub: "Start running payroll in minutes" },
];

export default function WelcomePage() {
    return (
        <div className="min-h-full" style={{ padding: "48px 64px" }}>
            <Confetti />
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }} className="animate-fade-in">

                <div style={{ background: "rgba(0,229,160,0.1)", display: "inline-flex", padding: 16, borderRadius: 20 }}>
                    <Rocket size={32} color="#00E5A0" />
                </div>

                <h1 style={{ fontSize: 40, fontWeight: 700, color: "#FFFFFF", marginTop: 24, marginBottom: 0 }}>
                    Welcome to HRFlow! 🎉
                </h1>
                <p style={{ fontSize: 16, color: "#8899AA", lineHeight: 1.6, marginTop: 12 }}>
                    You&apos;re 13 steps away from going live with India&apos;s most intelligent HRMS.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-3 gap-4" style={{ marginTop: 40, textAlign: "left" }}>
                    {CARDS.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <div key={i} className="group" style={{
                                background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24,
                                transition: "all 0.2s ease", cursor: "default"
                            }} onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.borderColor = "rgba(0,229,160,0.5)";
                            }} onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "#1A2A3A";
                            }}>
                                <Icon size={24} color={card.color} />
                                <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", marginTop: 12 }}>{card.title}</div>
                                <div style={{ fontSize: 13, color: "#8899AA", marginTop: 4 }}>{card.sub}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Time estimate banner */}
                <div style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 12, padding: "16px 24px", marginTop: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <Clock size={16} color="#00E5A0" />
                    <span style={{ fontSize: 14, color: "#FFFFFF" }}>Estimated time: 15-20 minutes to complete setup</span>
                </div>

                {/* Import option */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 12, padding: "16px 24px", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="flex items-center gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8899AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        <span style={{ fontSize: 14, color: "#FFFFFF" }}>Already using Keka, Darwinbox or GreytHR?</span>
                    </div>
                    <a href="/help/getting-started" className="flex items-center gap-1" style={{ fontSize: 14, color: "#0066FF" }}>
                        Import your data in 1 click <ArrowRight size={14} />
                    </a>
                </div>

            </div>
        </div>
    );
}
