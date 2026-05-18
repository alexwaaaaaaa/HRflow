"use client";
import React, { useEffect, useState } from "react";
import { PartyPopper, CheckCircle2, ArrowRight } from "lucide-react";
import { seededFloats } from "@/lib/random";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static confetti data (module scope — no Math.random in render) ───────────

const CONFETTI_COLORS = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"] as const;

const CONFETTI_PIECES = (() => {
    const left = seededFloats(101, 20);
    const top = seededFloats(202, 20);
    const dur = seededFloats(303, 20);
    const colorIdx = seededFloats(404, 20);
    const delay = seededFloats(505, 20);
    return left.map((l, i) => ({
        left: `${l * 100}%`,
        top: `${(top[i] ?? 0) * -20}%`,
        duration: `${(dur[i] ?? 0) * 3 + 2}s`,
        delay: `${(delay[i] ?? 0) * 2}s`,
        colorClass: CONFETTI_COLORS[Math.floor((colorIdx[i] ?? 0) * CONFETTI_COLORS.length)] ?? "bg-white",
    }));
})();

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SetupCompleteCelebrationScreen() {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Page
            title="You're All Set!"
            subtitle="Welcome to the future of HR. Your workspace is fully configured."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Complete", href: "/onboarding/complete" },
            ]}
            maxWidth="600px"
        >
            <style dangerouslySetInnerHTML={{
                __html: `@keyframes fall { to { transform: translateY(100vh) rotate(720deg); } }`,
            }} />

            {/* Celebration Background Effects */}
            <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${showConfetti ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/20 blur-[120px] rounded-full" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {CONFETTI_PIECES.map((p, i) => (
                        <div
                            key={i}
                            className={`absolute w-3 h-3 rounded-sm ${p.colorClass}`}
                            style={{
                                left: p.left,
                                top: p.top,
                                animation: `fall ${p.duration} linear forwards`,
                                animationDelay: p.delay,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="text-center relative z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/30 border-4 border-[#060D1A] ring-4 ring-emerald-500/20 relative">
                    <PartyPopper className="text-white relative z-10 animate-bounce" size={48} aria-hidden="true" />
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" aria-hidden="true" />
                </div>

                <h2 className="text-5xl font-black text-white mb-4 tracking-tight">You&apos;re All Set!</h2>
                <p className="text-xl text-[#8899AA] mb-12">
                    Welcome to the future of HR. Your workspace is fully configured, data is imported, and payroll is ready to roll.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-12 max-w-sm mx-auto">
                    <Card className="flex flex-col items-center justify-center">
                        <div className="text-3xl font-black text-white mb-1">1,210</div>
                        <div className="text-xs text-[#556677] font-bold uppercase tracking-wider">Employees</div>
                    </Card>
                    <Card className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 text-emerald-400 mb-1">
                            <CheckCircle2 size={24} aria-hidden="true" />
                            <span className="text-3xl font-black">100%</span>
                        </div>
                        <div className="text-xs text-[#556677] font-bold uppercase tracking-wider">Compliant</div>
                    </Card>
                </div>

                <Button
                    href="/dashboard"
                    size="lg"
                    iconRight={<ArrowRight size={20} aria-hidden="true" />}
                    className="mx-auto"
                >
                    Go to Your Dashboard
                </Button>
            </div>
        </Page>
    );
}
