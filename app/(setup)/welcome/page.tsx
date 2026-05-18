"use client";

import { useEffect, useState } from "react";
import { Rocket, Building2, Users, Shield, Landmark, UserPlus, Zap, Clock, ArrowRight } from "lucide-react";
import { seededFloats } from "@/lib/random";
import Card from "@/components/ui/Card";

const CONFETTI_COLORS = ["#00E5A0", "#0066FF", "#FFB800"];
const CONFETTI_PIECES = (() => {
    const left = seededFloats(801, 20);
    const delay = seededFloats(802, 20);
    const shape = seededFloats(803, 20);
    return left.map((l, i) => ({
        left: `${l * 100}%`,
        delay: `${delay[i]! * 0.5}s`,
        rounded: shape[i]! > 0.5 ? "50%" : 2,
    }));
})();

// Confetti Component — defined at module scope
function Confetti() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // SSR mount-gate — confetti is decorative and must only render client-side.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]" aria-hidden="true">
            {CONFETTI_PIECES.map((p, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: p.left,
                    top: -10,
                    width: 8,
                    height: 8,
                    borderRadius: p.rounded,
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                    animation: `confetti-fall 3s ease-in ${p.delay} forwards`,
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
] as const;

export default function WelcomePage() {
    return (
        <div className="min-h-full px-16 py-12">
            <Confetti />
            <div className="max-w-[640px] mx-auto text-center animate-fade-in">

                <div className="bg-[rgba(0,229,160,0.1)] inline-flex p-4 rounded-[20px]">
                    <Rocket size={32} color="#00E5A0" aria-hidden="true" />
                </div>

                <h1 className="text-[40px] font-bold text-white mt-6 mb-0">
                    Welcome to HRFlow!
                </h1>
                <p className="text-base text-[#8899AA] leading-relaxed mt-3">
                    You&apos;re 13 steps away from going live with India&apos;s most intelligent HRMS.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 text-left">
                    {CARDS.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card key={card.title} variant="default" padding="md" className="transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(0,229,160,0.5)]">
                                <Icon size={24} color={card.color} aria-hidden="true" />
                                <div className="text-base font-semibold text-white mt-3">{card.title}</div>
                                <div className="text-[13px] text-[#8899AA] mt-1">{card.sub}</div>
                            </Card>
                        );
                    })}
                </div>

                {/* Time estimate banner */}
                <div className="bg-[rgba(0,229,160,0.05)] border border-[rgba(0,229,160,0.3)] rounded-xl px-6 py-4 mt-8 flex items-center justify-center gap-2">
                    <Clock size={16} color="#00E5A0" aria-hidden="true" />
                    <span className="text-sm text-white">Estimated time: 15-20 minutes to complete setup</span>
                </div>

                {/* Import option */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-6 py-4 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8899AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span className="text-sm text-white">Already using Keka, Darwinbox or GreytHR?</span>
                    </div>
                    <a href="/help/getting-started" className="flex items-center gap-1 text-sm text-[#0066FF] hover:underline">
                        Import your data in 1 click <ArrowRight size={14} aria-hidden="true" />
                    </a>
                </div>

            </div>
        </div>
    );
}
