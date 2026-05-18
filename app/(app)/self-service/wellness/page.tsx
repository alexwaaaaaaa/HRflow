"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { HeartPulse, ArrowLeft, Flame, Zap, Moon, Activity } from 'lucide-react';
import Link from 'next/link';

export default function WellnessScoreScreen() {
    return (
        <Page
            title="Organizational Wellness Score"
            subtitle="Your anonymized pulse score vs org averages, powered by weekly check-ins."
            breadcrumbs={[{ label: "Self Service", href: "/self-service" }, { label: "Wellness" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><HeartPulse size={22} className="text-emerald-400" /> Organizational Wellness Score</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Your anonymized pulse score vs org averages, powered by weekly check-ins.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <h3 className="text-[#8899AA] text-sm font-bold uppercase tracking-wider mb-8 z-10">Your Overall Wellness Index</h3>

                    <div className="relative w-64 h-32 overflow-hidden z-10">
                        <div className="w-64 h-64 rounded-full border-[24px] border-[#1A2A3A] absolute top-0 left-0"></div>
                        <div className="w-64 h-64 rounded-full border-[24px] border-transparent border-t-emerald-500 border-r-emerald-500 absolute top-0 left-0 -rotate-45"></div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <span className="text-6xl font-black text-white">84</span>
                            <span className="text-emerald-400 text-sm font-bold">/ 100</span>
                        </div>
                    </div>

                    <div className="mt-8 text-sm text-[#AABBCC] max-w-md z-10 leading-relaxed">
                        You are thriving! Your score is placed in the top 15% of your department. Keep up your excellent work-life boundaries.
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'Work-Life Balance', val: 88, icon: Flame, color: 'text-rose-400', bg: 'bg-rose-500' },
                        { label: 'Energy & Focus', val: 76, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500' },
                        { label: 'Stress Management', val: 82, icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500' },
                        { label: 'Physical Activity', val: 65, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500' },
                    ].map((m, i) => {
                        const Icon = m.icon;
                        return (


                            <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-2">
                                        <Icon size={16} className={m.color} />
                                        <span className="text-white text-sm font-semibold">{m.label}</span>
                                    </div>
                                    <span className={`${m.color} font-bold`}>{m.val}</span>
                                </div>
                                <div className="h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className={`h-full ${m.bg} rounded-full`} style={{ width: `${m.val}%` }} />
                                </div>
                            </div>
                        
        
);
                    })}
                </div>
            </div>
        </div>
    
        </Page>
    );
}
