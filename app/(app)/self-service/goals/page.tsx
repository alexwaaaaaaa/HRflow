"use client";
import React from 'react';
import { Target, ArrowLeft, Plus, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';

export default function MyGoalsScreen() {
    const GOALS = [
        { title: 'Launch HRFlow ESS Module', status: 'In Progress', progress: 85, weightage: '40%', tags: ['Q1', 'Technical'] },
        { title: 'Improve Frontend Coverage', status: 'Not Started', progress: 0, weightage: '20%', tags: ['Q2', 'Quality'] },
        { title: 'Mentor 2 Junior Devs', status: 'On Track', progress: 50, weightage: '20%', tags: ['H1', 'Leadership'] },
        { title: 'Complete AWS Certification', status: 'Done', progress: 100, weightage: '20%', tags: ['H1', 'Personal Growth'] },
    ];

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Target size={22} className="text-emerald-400" /> My Performance Goals</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track your objectives, key results, and managerial feedback for FY 2026.</p>
                </div>
                <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Plus size={16} /> Draft New Goal
                </button>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex items-center gap-6">
                <div className="w-20 h-20 shrink-0 rounded-full border-4 border-[#1A2A3A] relative flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="36" cy="36" r="34" className="stroke-[#1A2A3A] fill-none" strokeWidth="4" />
                        <circle cx="36" cy="36" r="34" className="stroke-emerald-500 fill-none" strokeWidth="4" strokeDasharray="213" strokeDashoffset={213 * (1 - 0.64)} strokeLinecap="round" />
                    </svg>
                    <span className="text-white font-black text-lg">64%</span>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">Overall Completion</h3>
                    <p className="text-[#8899AA] text-sm">You are tracking well against your H1 targets. Remember to update your progress weekly.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {GOALS.map((g, i) => (
                    <div key={i} className="bg-[#0A1420] hover:bg-[#131B2B] border border-[#1A2A3A] rounded-2xl p-5 transition-colors group cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {g.progress === 100 ? <CheckCircle2 size={24} className="text-emerald-400" /> : <Circle size={24} className="text-[#556677]" />}
                                <h3 className="text-white font-bold text-lg">{g.title}</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-bold px-2 py-1 rounded">Weight: {g.weightage}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded 
                  ${g.status === 'Done' ? 'bg-emerald-500/10 text-emerald-400' :
                                        g.status === 'On Track' ? 'bg-blue-500/10 text-blue-400' :
                                            g.status === 'Not Started' ? 'bg-[#1A2A3A] text-[#8899AA]' : 'bg-amber-500/10 text-amber-400'}`}>
                                    {g.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-1000 ${g.progress === 100 ? 'bg-emerald-500' : g.progress > 0 ? 'bg-amber-500' : 'bg-transparent'}`} style={{ width: `${g.progress}%` }} />
                            </div>
                            <span className="text-white font-bold text-sm min-w-[40px] text-right">{g.progress}%</span>
                        </div>

                        <div className="flex mt-4 gap-2">
                            {g.tags.map(t => (
                                <span key={t} className="text-[10px] uppercase font-bold text-[#556677] bg-[#1A2A3A] px-2 py-0.5 rounded">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
