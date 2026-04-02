"use client";
import React, { useState } from 'react';
import { UserCheck, SplitSquareHorizontal, History, Crown, ThumbsUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessorSelectionScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><UserCheck size={24} className="text-emerald-400" /> Successor Nomination & Review</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Calibrate potential successors relative to critical role requirements.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Crown size={14} /> Target Role Profile</div>
                    <h2 className="text-2xl font-black text-white">VP, Enterprise Sales</h2>
                    <p className="text-[#556677] text-sm mt-1">Requires $50M+ quota management and enterprise GTM strategy experience.</p>
                </div>
                <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2 shrink-0">
                    <SplitSquareHorizontal size={16} /> Compare Candidates
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Candidate 1 */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-colors">
                    <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                                JW
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-0.5">James Wilson</h3>
                                <div className="text-[#8899AA] text-sm">Dir, Mid-Market Sales</div>
                            </div>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20 w-fit shrink-0">Ready Now</span>
                    </div>

                    <div className="p-6 space-y-6 bg-[#060D1A]">
                        <div>
                            <div className="text-[#556677] text-xs font-bold uppercase tracking-wider mb-3">Skill Match (Role Requirements)</div>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between items-center"><span className="text-[#AABBCC]">Enterprise Quota &gt; $50M</span> <span className="text-emerald-400">Achieved ($62M)</span></div>
                                <div className="flex justify-between items-center"><span className="text-[#AABBCC]">Cross-Functional Leadership</span> <span className="text-emerald-400">9-Box: High Pot.</span></div>
                                <div className="flex justify-between items-center"><span className="text-[#AABBCC]">Global Expansion GTM</span> <span className="text-amber-400">Partial Experience</span></div>
                            </div>
                        </div>

                        <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                            <div className="text-[#AABBCC] text-sm italic mb-2">"James has continuously exceeded targets and built a scalable machine in the Mid-Market segment. He needs international enterprise exposure to fully cap out."</div>
                            <div className="text-xs text-[#556677] font-bold">— CRO (Current Manager)</div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 border-t border-[#1A2A3A]">
                            <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition-colors text-sm shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                Approve Nomination
                            </button>
                            <button className="px-4 py-2.5 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] hover:text-white rounded-xl font-bold text-sm transition-colors">
                                Review IDP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Candidate 2 */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden hover:border-[#2A3A4A] transition-colors opacity-90">
                    <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-[#AABBCC] font-bold shrink-0">
                                SK
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-0.5">Samantha Kim</h3>
                                <div className="text-[#8899AA] text-sm">Key Account Director, EMEA</div>
                            </div>
                        </div>
                        <span className="bg-[#131B2B] text-[#AABBCC] text-xs font-bold px-2 py-1 rounded border border-[#2A3A4A] w-fit shrink-0">1-2 Years</span>
                    </div>

                    <div className="p-6 space-y-6 bg-[#060D1A]">
                        <div>
                            <div className="text-[#556677] text-xs font-bold uppercase tracking-wider mb-3">Skill Match (Role Requirements)</div>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between items-center"><span className="text-[#AABBCC]">Enterprise Quota &gt; $50M</span> <span className="text-emerald-400">Achieved ($85M)</span></div>
                                <div className="flex justify-between items-center"><span className="text-[#AABBCC]">Cross-Functional Leadership</span> <span className="text-rose-400">Gap Identified</span></div>
                                <div className="flex justify-between items-center"><span className="text-[#AABBCC]">Global Expansion GTM</span> <span className="text-emerald-400">Strong Match</span></div>
                            </div>
                        </div>

                        <div className="bg-[#131B2B] p-4 rounded-xl border border-[#2A3A4A]">
                            <div className="text-[#AABBCC] text-sm italic mb-2">"Samantha is exceptional with enterprise logos in EMEA, but she operates mostly independently. Needs to demonstrate managing managers."</div>
                            <div className="text-xs text-[#556677] font-bold">— VP Sales (Current Manager)</div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 border-t border-[#1A2A3A]">
                            <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white py-2.5 rounded-xl transition-colors text-sm font-bold">
                                Endorse as Backup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
