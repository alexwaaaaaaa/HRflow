"use client";
import React from 'react';
import { Users, ArrowLeft, BarChart2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function PeerComparisonScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Users size={22} className="text-teal-400" /> Peer Comparison & Analytics</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Anonymized percentile rankings compared to colleagues in the same level/role.</p>
                </div>
            </div>

            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 flex gap-3 text-sm">
                <ShieldAlert size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-[#AABBCC]">
                    Data privacy is maintained. All graphs reflect aggregated, anonymized metrics comparing you to the cohort of 18 Senior Engineers at Acme Corp.
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2"><BarChart2 size={16} className="text-[#556677]" /> Compensation Percentile</h3>
                    <div className="relative h-40 flex items-end justify-between px-4 pb-0 opacity-80 mb-4">
                        {/* Bell curve approx */}
                        <div className="w-1/5 h-12 bg-[#1A2A3A] rounded-t-lg"></div>
                        <div className="w-1/5 h-24 bg-[#1A2A3A] rounded-t-lg"></div>
                        <div className="w-1/5 h-40 bg-[#1A2A3A] rounded-t-lg relative">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-white font-bold whitespace-nowrap bg-[#131B2B] px-3 py-1 rounded shadow-lg border border-[#2A3A4A] z-10">You (78th Pct)</div>
                            <div className="absolute inset-0 border-2 border-teal-500 rounded-t-lg bg-teal-500/10"></div>
                        </div>
                        <div className="w-1/5 h-20 bg-[#1A2A3A] rounded-t-lg"></div>
                        <div className="w-1/5 h-8 bg-[#1A2A3A] rounded-t-lg"></div>
                    </div>
                    <p className="text-center text-sm text-[#8899AA] mt-4">Your CTC is higher than 78% of your peers in identical roles.</p>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2"><BarChart2 size={16} className="text-[#556677]" /> PTO Utilization</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs mb-1 text-[#8899AA]"><span>Your Usage (18 Days)</span> <span className="text-white">60%</span></div>
                            <div className="h-3 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full w-[60%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1 text-[#8899AA]"><span>Peer Average (12 Days)</span> <span className="text-white">40%</span></div>
                            <div className="h-3 bg-[#1A2A3A] rounded-full overflow-hidden">
                                <div className="h-full bg-[#556677] rounded-full w-[40%]"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-[#8899AA] mt-6 pt-6 border-t border-[#1A2A3A]">You take more time off than the average peer. Great for preventing burnout!</p>
                </div>
            </div>
        </div>
    );
}
