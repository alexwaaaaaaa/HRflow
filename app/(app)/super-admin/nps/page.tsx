"use client";
import React from 'react';
import { Smile, Frown, Filter, Search, MessageSquareQuote } from 'lucide-react';
import Link from 'next/link';

export default function NPSScoreScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Net Promoter Score (NPS) Data</h1>
                    <p className="text-[#8899AA] text-sm">Aggregated end-user satisfaction metrics across the Kaarya HRFlow ecosystem.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 mb-6">
                {/* Main NPS gauge mockup */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[200px] border-b-4 border-b-emerald-500">
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Platform Global NPS</div>
                    <div className="text-6xl font-black text-white">+64</div>
                    <div className="text-xs text-emerald-400 mt-2 font-bold flex items-center gap-1"><Smile size={14} /> Excellent Benchmark</div>
                </div>

                <div className="md:col-span-2 grid grid-cols-3 gap-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center">
                        <div className="text-3xl font-black text-emerald-400 mb-1">72%</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Promoters (9-10)</div>
                    </div>
                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center">
                        <div className="text-3xl font-black text-white mb-1">20%</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Passives (7-8)</div>
                    </div>
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-center">
                        <div className="text-3xl font-black text-rose-400 mb-1">8%</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Detractors (0-6)</div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#060D1A]">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2"><MessageSquareQuote size={18} className="text-[#556677]" /> Recent Qualitative Feedback</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#556677] uppercase">Filter:</span>
                        <select className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs font-bold rounded-lg px-3 py-2 outline-none appearance-none cursor-pointer">
                            <option>Detractors Only</option>
                            <option>Promoters Only</option>
                            <option>All Feedback</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-[#1A2A3A]">
                    {[
                        { org: 'TechCorp India', role: 'Employee', score: 10, quote: "The instant payroll withdrawal (EWA) is a lifesaver. UI is so smooth compared to our old system.", type: 'Promoter' },
                        { org: 'Zenith Logistics', role: 'HR Admin', score: 9, quote: "Payroll engine ran 400 employees in 2 seconds. Incredible.", type: 'Promoter' },
                        { org: 'Sunset Technologies', role: 'Line Manager', score: 4, quote: "I can't figure out how to approve leaves in bulk from the mobile view. Buttons overlap.", type: 'Detractor' },
                        { org: 'Global Finance', role: 'Ops Lead', score: 6, quote: "System is fine but reporting could be better when exporting to CSV.", type: 'Detractor' },
                    ].map((item, i) => (
                        <div key={i} className={`p-5 hover:bg-[#131B2B] transition-colors flex flex-col md:flex-row gap-6 ${item.type === 'Detractor' ? 'bg-rose-500/5' : ''}`}>
                            <div className="shrink-0 flex flex-col items-center justify-center bg-[#131B2B] border border-[#2A3A4A] w-16 h-16 rounded-xl">
                                <span className={`text-2xl font-black ${item.score > 8 ? 'text-emerald-400' : item.score < 7 ? 'text-rose-400' : 'text-white'}`}>{item.score}</span>
                                <span className="text-[8px] text-[#556677] uppercase font-bold tracking-wider">/ 10</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white font-medium italic mb-2">"{item.quote}"</p>
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="text-[#8899AA] font-bold">{item.org}</span>
                                    <span className="text-[#3A4A5A]">|</span>
                                    <span className="text-[#556677]">{item.role}</span>
                                </div>
                            </div>
                            {item.type === 'Detractor' && (
                                <div className="shrink-0 pt-2 md:pt-0">
                                    <button className="text-[10px] font-bold bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-3 py-1.5 rounded transition-colors">
                                        Create Jira Issue
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
