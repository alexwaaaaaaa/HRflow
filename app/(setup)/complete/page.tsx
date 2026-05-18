"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Building, Users, CreditCard, Play, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { seededFloats } from "@/lib/random";

const CONFETTI_COLORS = ["#00E5A0", "#0066FF", "#FFB800", "#FF4444", "#FFFFFF"];
// Stable confetti positions / shapes / durations.
const CONFETTI_PIECES = (() => {
    const left = seededFloats(701, 40);
    const dur = seededFloats(702, 40);
    const delay = seededFloats(703, 40);
    const shape = seededFloats(704, 40);
    return left.map((l, i) => ({
        left: `${l * 100}%`,
        duration: `${2 + dur[i]! * 2}s`,
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
                    position: "absolute", left: p.left, top: -10,
                    width: 8, height: 8, borderRadius: p.rounded,
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                    animation: `confetti-fall ${p.duration} ease-in ${p.delay} forwards`,
                }} />
            ))}
        </div>
    );
}

interface SummaryItem {
    icon: LucideIcon;
    color: string;
    value: string;
    label: string;
    highlight?: boolean;
}

const SUMMARY_ITEMS: SummaryItem[] = [
    { icon: Building, color: "#0066FF", value: "2", label: "Locations Setup" },
    { icon: Users, color: "#FFB800", value: "12", label: "Departments Configured" },
    { icon: CreditCard, color: "#00E5A0", value: "Verified", label: "Primary Bank Account", highlight: true },
];

export default function SetupCompletePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-center animate-fade-in bg-[#060B14]">
            <Confetti />

            <div className="relative z-10 w-full max-w-3xl px-8">
                <div className="w-20 h-20 rounded-full bg-[rgba(0,229,160,0.1)] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} color="#00E5A0" aria-hidden="true" />
                </div>

                <h1 className="text-5xl font-bold text-white mb-4">
                    You&apos;re All Set!
                </h1>
                <p className="text-lg text-[#8899AA] max-w-[600px] mx-auto mb-12 leading-relaxed">
                    TechCorp Solutions Pvt. Ltd. is successfully configured on HRFlow. Your team is ready to use India&apos;s smartest HRMS.
                </p>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                    {SUMMARY_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card
                                key={item.label}
                                variant={item.highlight ? "elevated" : "default"}
                                padding="md"
                                className={item.highlight ? "border-[#00E5A0]" : ""}
                            >
                                <Icon size={24} color={item.color} className="mx-auto mb-3" aria-hidden="true" />
                                <div className="text-2xl font-bold text-white">{item.value}</div>
                                <div className="text-sm text-[#8899AA] mt-1">{item.label}</div>
                            </Card>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="flex justify-center gap-6">
                    <Button variant="secondary" size="lg" className="h-14 px-8 text-base">
                        Explore Dashboard
                    </Button>
                    <Button size="lg" className="h-14 px-8 text-base shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] transition-shadow">
                        <Play size={18} className="mr-2" fill="currentColor" aria-hidden="true" /> Add Your First Employee
                    </Button>
                </div>
            </div>

            {/* Background decorations */}
            {/* inline-style: blur decorations require dynamic pixel values not expressible as static Tailwind */}
            <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, background: "#00E5A0", filter: "blur(150px)", opacity: 0.1, zIndex: 0 }} aria-hidden="true" />
            <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 300, height: 300, background: "#0066FF", filter: "blur(150px)", opacity: 0.1, zIndex: 0 }} aria-hidden="true" />
        </div>
    );
}
