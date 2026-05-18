"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Bell, ArrowLeft, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

const RELEASES = [
    {
        version: 'v4.12.0', date: 'Mar 10, 2026', badge: 'Latest', badgeColor: 'bg-emerald-500',
        highlights: [
            { type: 'New', text: 'AI-powered payroll anomaly detection — flags unusual changes before processing', icon: Sparkles },
            { type: 'New', text: 'WhatsApp payslip delivery — send payslips directly via WhatsApp Business API', icon: Zap },
            { type: 'Improved', text: 'PF ECR generation is now 3x faster with the updated challan engine', icon: Zap },
            { type: 'Fixed', text: 'Leave balance calculation error for half-day CL on month boundaries', icon: Shield },
        ],
    },
    {
        version: 'v4.11.0', date: 'Feb 24, 2026', badge: null, badgeColor: '',
        highlights: [
            { type: 'New', text: 'Flexible Benefit Plan (FBP) — complete employee-driven component selection', icon: Sparkles },
            { type: 'New', text: 'Multi-entity payroll — consolidated reports across group companies', icon: Sparkles },
            { type: 'Improved', text: 'Onboarding wizard redesigned — 60% faster for HR admins', icon: Zap },
            { type: 'Fixed', text: 'ESI contribution rounding error for employees at ₹21,000 threshold', icon: Shield },
        ],
    },
    {
        version: 'v4.10.0', date: 'Feb 10, 2026', badge: null, badgeColor: '',
        highlights: [
            { type: 'New', text: 'Succession planning module — 9-box grid and talent pool management', icon: Sparkles },
            { type: 'New', text: 'Pay equity dashboard — gender pay gap and compa-ratio analysis', icon: Sparkles },
            { type: 'Improved', text: 'Bulk salary upload supports 10,000+ employees without timeout', icon: Zap },
            { type: 'Fixed', text: 'Attendance regularization not sending email notification to manager', icon: Shield },
        ],
    },
];

const TYPE_CONFIG: Record<string, { bg: string; text: string }> = {
    New: { bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
    Improved: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
    Fixed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
};

export default function ChangelogScreen() {
    return (
        <Page
            title="Changelog"
            subtitle="Every update, fix, and new feature across all releases"
            breadcrumbs={[{ label: "Help", href: "/help" }, { label: "Changelog" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Bell size={22} className="text-purple-400" /> Changelog</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Every update, fix, and new feature across all releases</p>
                </div>
                <button className="bg-purple-600/20 border border-purple-500/30 text-purple-400 font-bold px-4 py-2 rounded-xl text-sm hover:bg-purple-600/30 transition-colors">Subscribe to Updates</button>
            </div>

            <div className="space-y-8">
                {RELEASES.map((release) => (
                    <div key={release.version} className="relative pl-8">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#1A2A3A] border-2 border-purple-500" />
                        <div className="absolute left-2 top-6 bottom-0 w-px bg-[#1A2A3A]" />

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-white font-black text-xl">{release.version}</span>
                                {release.badge && <span className={`${release.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase`}>{release.badge}</span>}
                                <span className="text-[#556677] text-sm ml-auto">{release.date}</span>
                            </div>
                            <div className="space-y-3">
                                {release.highlights.map((item, i) => {
                                    const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG['Fixed'];
                                    const Icon = item.icon;
                                    return (


                                        <div key={i} className="flex items-start gap-3">
                                            <span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded min-w-16 text-center mt-0.5 ${cfg.bg} ${cfg.text}`}>{item.type}</span>
                                            <p className="text-[#AABBCC] text-sm leading-relaxed">{item.text}</p>
                                            <Icon size={14} className={`${cfg.text} shrink-0 mt-0.5`} />
                                        </div>
                                    
        
);
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
        </Page>
    );
}
