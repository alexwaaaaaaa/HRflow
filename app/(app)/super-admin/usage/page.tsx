"use client";
import React from 'react';
import { MousePointerClick, Activity, Users, Globe2, Layers } from 'lucide-react';
import Link from 'next/link';

export default function UsageAnalyticsScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Product Usage Analytics</h1>
                    <p className="text-[#8899AA] text-sm">Track Monthly Active Users (MAU), session times, and feature adoption across tenants.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                {/* Real-time */}
                <div className="bg-[#0A1420] border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-4 right-4 flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Live Now
                    </div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2 mt-4">Concurrent Active Sessions</div>
                    <div className="text-5xl font-black text-white">42,891</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Monthly Active Employees (MAU)</div>
                    <div className="text-4xl font-black text-white flex items-end gap-2">980K <span className="text-sm font-bold text-emerald-400 pb-1.5">+12%</span></div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Avg Daily Session Time</div>
                    <div className="text-4xl font-black text-white">12m 45s</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Module Adoption */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><Layers size={18} className="text-[#556677]" /> Module Utilization (Active Workspaces)</h3>

                    <div className="space-y-6">
                        {[
                            { name: 'Core HR & Employee DB', usage: 100 },
                            { name: 'Leave & Attendance', usage: 94 },
                            { name: 'Payroll Engine', usage: 82 },
                            { name: 'Performance Management', usage: 45 },
                            { name: 'Expense Management', usage: 38 },
                            { name: 'Onboarding & BGV', usage: 22 },
                        ].map((mod, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm font-bold text-white mb-2">
                                    <span>{mod.name}</span>
                                    <span>{mod.usage}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#131B2B] rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${mod.usage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Geographic Traffic */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col items-center justify-center relative">
                    <div className="absolute top-6 left-6 font-bold text-white flex items-center gap-2"><Globe2 size={18} className="text-[#556677]" /> Regional Traffic Map</div>

                    <div className="text-center">
                        <Globe2 size={64} className="text-[#2A3A4A] mx-auto mb-4" />
                        <span className="text-[#556677] text-sm font-bold uppercase tracking-widest">Geographical Visualization Area</span>
                        <div className="mt-8 space-y-2 text-sm text-[#8899AA] text-left">
                            <div className="flex justify-between w-48 mx-auto"><span className="text-white font-bold">India</span> 85%</div>
                            <div className="flex justify-between w-48 mx-auto"><span className="text-white font-bold">UAE</span> 8%</div>
                            <div className="flex justify-between w-48 mx-auto"><span className="text-white font-bold">USA</span> 5%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
