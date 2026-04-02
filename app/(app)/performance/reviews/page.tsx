"use client";
import React from 'react';
import { Star, Users, UserCheck, GitBranch, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const REVIEW_TYPES = [
    {
        href: '/performance/reviews/self',
        title: 'Self Review',
        desc: 'Complete your own appraisal — goals, competencies, and reflections',
        icon: UserCheck,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'hover:border-indigo-500/40',
        status: 'Open',
        statusColor: 'bg-emerald-500/10 text-emerald-400',
    },
    {
        href: '/performance/reviews/manager',
        title: 'Manager Review',
        desc: 'Review your team members — 4 pending reviews this cycle',
        icon: Users,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'hover:border-amber-500/40',
        status: '4 Pending',
        statusColor: 'bg-amber-500/10 text-amber-400',
    },
    {
        href: '/performance/reviews/mid-year',
        title: 'Mid-Year Review',
        desc: 'H1 check-in conversations and goal progress updates',
        icon: GitBranch,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'hover:border-purple-500/40',
        status: 'Upcoming',
        statusColor: 'bg-purple-500/10 text-purple-400',
    },
    {
        href: '/performance/reviews/skip-level',
        title: 'Skip-Level Review',
        desc: 'Grandir level review — L+2 manager inputs for senior employees',
        icon: Star,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        border: 'hover:border-pink-500/40',
        status: 'Closed',
        statusColor: 'bg-red-500/10 text-red-400',
    },
];

export default function ReviewsIndexPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Star size={24} className="text-amber-400" /> Performance Reviews
                </h1>
                <p className="text-[#8899AA] text-sm mt-1">FY 2025-26 Annual Review Cycle — Deadline: Apr 30, 2026</p>
            </div>

            {/* Cycle progress */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold text-sm">Overall Completion</span>
                    <span className="text-[#556677] text-xs">68 / 248 employees</span>
                </div>
                <div className="h-3 bg-[#1A2A3A] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '27%' }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-amber-400 text-xs font-bold">27% complete</span>
                    <span className="text-[#556677] text-xs">51 days remaining</span>
                </div>
            </div>

            {/* Review type cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REVIEW_TYPES.map(r => {
                    const Icon = r.icon;
                    return (
                        <Link
                            key={r.href}
                            href={r.href}
                            className={`group bg-[#0A1420] border border-[#1A2A3A] ${r.border} rounded-2xl p-6 transition-all hover:bg-[#0D1928]`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-11 h-11 rounded-xl ${r.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon size={20} className={r.color} />
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${r.statusColor}`}>{r.status}</span>
                            </div>
                            <h3 className="text-white font-bold mb-1">{r.title}</h3>
                            <p className="text-[#8899AA] text-sm mb-4">{r.desc}</p>
                            <div className={`flex items-center gap-1 text-xs font-bold ${r.color}`}>
                                Open <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
