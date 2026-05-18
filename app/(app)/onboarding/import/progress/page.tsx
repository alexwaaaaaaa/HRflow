"use client";
import React, { useState, useEffect } from "react";
import { Database, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { seededFloats } from "@/lib/random";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

export default function MigrationProgressScreen() {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Initializing migration engine...");
    const [seed, setSeed] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeed((s) => s + 1);
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(timer);
                    setStatusText("Migration Complete!");
                    return 100;
                }
                const [rand] = seededFloats(seed, 1);
                const newP = p + rand * 8;

                if (newP > 10 && p <= 10) setStatusText("Building organization structure...");
                if (newP > 30 && p <= 30) setStatusText("Importing 1,210 employee records...");
                if (newP > 60 && p <= 60) setStatusText("Mapping payroll histories...");
                if (newP > 85 && p <= 85) setStatusText("Calculating accrued leave balances...");

                return Math.min(100, newP);
            });
        }, 500);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logTime = new Date().toLocaleTimeString();

    return (
        <Page
            title="Migrating your workspace"
            subtitle="Please keep this window open while we securely transfer your data."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Migration Progress", href: "/onboarding/import/progress" },
            ]}
        >
            <div className="max-w-xl mx-auto text-center space-y-8">
                {/* Immersive Background blobs */}
                <div className="relative">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-50" />
                    <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-30" />

                    {/* Central Animation */}
                    <div className="relative w-40 h-40 mx-auto mb-10">
                        <div className="absolute inset-0 border-2 border-[#1A2A3A] rounded-full" />
                        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
                            <circle
                                className="text-indigo-500 transition-all duration-300 ease-out"
                                strokeWidth="4"
                                strokeDasharray="490"
                                strokeDashoffset={490 - (490 * progress) / 100}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="78"
                                cx="80"
                                cy="80"
                            />
                        </svg>

                        <div
                            className="absolute inset-2 bg-[#0A1420] border border-[#1A2A3A] rounded-full flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/20"
                            role="progressbar"
                            aria-valuenow={Math.round(progress)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`Migration progress: ${Math.round(progress)}%`}
                        >
                            {progress < 100 ? (
                                <>
                                    <Database size={32} className="text-indigo-400 mb-2 animate-bounce" aria-hidden="true" />
                                    <span className="text-2xl font-black text-white">{Math.round(progress)}%</span>
                                </>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse" />
                                    <CheckCircle2 size={48} className="text-emerald-400 relative z-10" aria-hidden="true" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status text */}
                <div className="h-6 flex items-center justify-center gap-2">
                    {progress < 100 && <Loader2 size={14} className="text-indigo-400 animate-spin" aria-hidden="true" />}
                    <p className={`text-[#8899AA] text-sm font-mono ${progress === 100 ? "text-emerald-400 font-bold" : ""}`}>
                        {statusText}
                    </p>
                </div>

                {/* Detailed Logs Box */}
                <div className="bg-[#0A1420]/80 backdrop-blur-xl border border-[#1A2A3A] rounded-2xl p-6 text-left max-h-48 overflow-y-auto font-mono text-xs text-[#556677] space-y-2 shadow-inner">
                    <p className="text-[#8899AA]">[{logTime}] Connection established to Kaarya Secure Vault...</p>
                    {progress > 10 && <p className="text-[#8899AA]">[{logTime}] Generating 15 Department structures...</p>}
                    {progress > 30 && <p className="text-indigo-300">[{logTime}] Successfully written 500/1210 employee profiles to DB</p>}
                    {progress > 45 && <p className="text-indigo-300">[{logTime}] Successfully written 1000/1210 employee profiles to DB</p>}
                    {progress > 60 && <p className="text-[#8899AA]">[{logTime}] Associating 3,450 historical payslips...</p>}
                    {progress > 85 && <p className="text-emerald-400/70">[{logTime}] Running final integrity checks...</p>}
                    {progress === 100 && <p className="text-emerald-400 font-bold">[{logTime}] MIGRATION SUCCESSFUL. Closing connections.</p>}
                </div>

                {progress === 100 && (
                    <Button href="/onboarding/checklist" className="w-full justify-center">
                        <Sparkles size={18} aria-hidden="true" /> Continue Setup
                    </Button>
                )}
            </div>
        </Page>
    );
}
