"use client";

import { CheckCircle2, AlertTriangle, TrendingUp, HelpCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ScoreFactor {
    label: string;
    detail?: string;
    impact: string;
    pct: number;
    variant: "success" | "warning" | "danger";
}

const SCORE_FACTORS: ScoreFactor[] = [
    { label: "Tenure (3.5 yrs)", impact: "+ High Impact", pct: 90, variant: "success" },
    { label: "Utilization Limit", detail: "You regularly withdraw < 20% of your max limit, showing strong financial control.", impact: "+ Positive", pct: 85, variant: "success" },
    { label: "Recovery History", impact: "+ Perfect History", pct: 100, variant: "success" },
];

const PERKS = [
    { title: "Higher EWA Limit", desc: "You can withdraw up to 70% of earned wages (Base is 50%)", locked: false },
    { title: "Zero-Fee Disbursal", desc: "Your first 2 EWA transactions per month have 0% fee.", locked: false },
    { title: "Personal Loan Pre-approval", desc: "Unlock at Score 900+ (Requires 12mo tenure)", locked: true },
];

export default function EWACreditScorePage() {
    return (
        <Page
            title="Health & Trust Score"
            subtitle="HRFlow creates an internal trust score to evaluate your financial wellness and unlock perks."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Internal Credit Health" },
            ]}
            maxWidth="900px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Score Gauge */}
                <Card padding="lg" className="md:col-span-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-5 rounded-full blur-2xl" aria-hidden="true" />
                    <p className="text-[#8899AA] text-sm font-medium mb-6">Current Trust Score</p>
                    <div className="relative mb-6">
                        <svg className="w-48 h-48 transform -rotate-90" aria-hidden="true">
                            <circle cx="96" cy="96" r="84" stroke="#1A2A3A" strokeWidth="16" fill="none" />
                            <circle cx="96" cy="96" r="84" stroke="#10B981" strokeWidth="16" fill="none" strokeDasharray="528" strokeDashoffset="105" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-white tracking-tight mb-1" aria-label="Trust score: 850 out of 1000">850</span>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Excellent</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1.5 rounded-full">
                        <TrendingUp size={16} aria-hidden="true" />
                        Top 10% in company
                    </div>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    {/* Unlocked Perks */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Unlocked Perks</h2>
                        <div className="space-y-4">
                            {PERKS.map((perk) => (
                                <div
                                    key={perk.title}
                                    className={`flex items-center justify-between p-4 rounded-xl border ${perk.locked ? "bg-[#0B1221] border-[#1A2A3A] opacity-60" : "bg-[#1A2A3A]/40 border-[#2A3A4A]"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${perk.locked ? "bg-[#1A2A3A]" : "bg-emerald-500/10"}`}>
                                            {perk.locked
                                                ? <AlertTriangle size={16} className="text-[#8899AA]" aria-hidden="true" />
                                                : <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                                            }
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">{perk.title}</h3>
                                            <p className="text-xs text-[#8899AA]">{perk.desc}</p>
                                        </div>
                                    </div>
                                    <Badge variant={perk.locked ? "neutral" : "success"}>{perk.locked ? "Locked" : "Active"}</Badge>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Score Factors */}
                    <Card padding="lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-white">Score Factors</h2>
                            <HelpCircle size={16} className="text-[#8899AA]" aria-hidden="true" />
                        </div>
                        <div className="space-y-4">
                            {SCORE_FACTORS.map((factor) => (
                                <div key={factor.label}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">{factor.label}</span>
                                        <span className="text-emerald-400">{factor.impact}</span>
                                    </div>
                                    {factor.detail && <p className="text-xs text-[#8899AA] mb-2">{factor.detail}</p>}
                                    <div className="w-full bg-[#1A2A3A] rounded-full h-1.5" role="progressbar" aria-valuenow={factor.pct} aria-valuemin={0} aria-valuemax={100} aria-label={factor.label}>
                                        <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${factor.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
