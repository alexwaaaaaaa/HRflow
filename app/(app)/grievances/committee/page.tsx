"use client";
import React, { useState } from 'react';
import { Users, Plus, ShieldCheck, AlertTriangle, MoreVertical, Calendar, Award, ExternalLink } from 'lucide-react';

export default function ICCommitteeManagementScreen() {
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Internal Complaints Committee (IC)</h1>
                    <p className="text-[#8899AA] text-sm">Manage committee members, track tenure limits, and ensure statutory compliance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Award size={16} /> Assign Training
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Plus size={16} /> Add Member
                    </button>
                </div>
            </div>

            {/* Compliance Status Banner */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full" />

                <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
                    <div className="w-14 h-14 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg mb-1">Committee Structure is Compliant</h2>
                        <p className="text-xs text-[#8899AA]">Meets POSH Act 2013 requirements for composition and gender ratio.</p>
                    </div>
                </div>

                <div className="flex gap-4 relative z-10 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="bg-[#131B2B] border border-[#2A3A4A] px-4 py-3 rounded-xl text-center min-w-[120px]">
                        <div className="text-2xl font-black text-white mb-0.5">5</div>
                        <div className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider">Total Members</div>
                    </div>
                    <div className="bg-[#131B2B] border border-[#2A3A4A] px-4 py-3 rounded-xl text-center min-w-[120px]">
                        <div className="text-2xl font-black text-emerald-400 mb-0.5">3<span className="text-sm text-[#556677] ml-1">/ 5</span></div>
                        <div className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider">Female Ratio</div>
                    </div>
                    <div className="bg-[#131B2B] border border-[#2A3A4A] px-4 py-3 rounded-xl text-center min-w-[120px]">
                        <div className="text-2xl font-black text-white mb-0.5">1</div>
                        <div className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider">NGO Affiliate</div>
                    </div>
                </div>
            </div>

            {/* Committee Roster */}
            <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 mt-8 flex items-center gap-2">
                    <Users size={16} className="text-[#556677]" /> Active Roster
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Presiding Officer */}
                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6 relative group hover:bg-indigo-500/20 transition-colors">
                        <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                            Presiding Officer
                        </div>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-400/50 flex items-center justify-center text-indigo-300 font-bold text-xl shrink-0">
                                MV
                            </div>
                            <div className="pt-2">
                                <h4 className="text-white font-bold text-lg leading-tight mb-1">Meera Venkatesh</h4>
                                <p className="text-xs text-[#8899AA]">Head of HR Strategy</p>
                            </div>
                        </div>
                        <div className="space-y-3 border-t border-indigo-500/20 pt-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-indigo-200">Tenure Limit (3 yrs)</span>
                                <span className="text-white font-bold flex items-center gap-1"><Calendar size={12} /> Ends Dec 2026</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-indigo-200">IC Certification</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1"><ShieldCheck size={12} /> Valid</span>
                            </div>
                        </div>
                    </div>

                    {/* External Member */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative group hover:border-[#2A3A4A] transition-colors">
                        <div className="absolute top-4 right-4 bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider group-hover:text-white transition-colors">
                            External Member
                        </div>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-[#131B2B] flex items-center justify-center text-[#556677] font-bold text-xl shrink-0">
                                PS
                            </div>
                            <div className="pt-2">
                                <h4 className="text-white font-bold text-lg leading-tight mb-1 flex items-center gap-2">
                                    Adv. Priya Sharma <ExternalLink size={14} className="text-[#556677]" />
                                </h4>
                                <p className="text-xs text-[#8899AA]">Sahaayata NGO</p>
                            </div>
                        </div>
                        <div className="space-y-3 border-t border-[#1A2A3A] pt-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8899AA]">Contract Status</span>
                                <span className="text-white font-bold flex items-center gap-1"><Calendar size={12} /> Renews Mar 2027</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8899AA]">Background Check</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1"><ShieldCheck size={12} /> Cleared</span>
                            </div>
                        </div>
                    </div>

                    {/* Internal Member 1 */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative group hover:border-[#2A3A4A] transition-colors">
                        <div className="absolute top-4 right-4 bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider group-hover:text-white transition-colors">
                            Internal Member
                        </div>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-[#131B2B] flex items-center justify-center text-[#556677] font-bold text-xl shrink-0">
                                SD
                            </div>
                            <div className="pt-2">
                                <h4 className="text-white font-bold text-lg leading-tight mb-1">Sanjay Dutt</h4>
                                <p className="text-xs text-[#8899AA]">Legal Counsel</p>
                            </div>
                        </div>
                        <div className="space-y-3 border-t border-[#1A2A3A] pt-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8899AA]">Tenure Limit (3 yrs)</span>
                                <span className="text-white font-bold flex items-center gap-1"><Calendar size={12} /> Ends Jun 2028</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8899AA]">IC Certification</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1"><ShieldCheck size={12} /> Valid</span>
                            </div>
                        </div>
                    </div>

                    {/* Internal Member 2 (Warning state) */}
                    <div className="bg-[#0A1420] border border-amber-500/30 rounded-2xl p-6 relative group">
                        <div className="absolute top-4 right-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                            <AlertTriangle size={12} /> Action Req
                        </div>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-[#131B2B] flex items-center justify-center text-[#556677] font-bold text-xl shrink-0">
                                AK
                            </div>
                            <div className="pt-2">
                                <h4 className="text-white font-bold text-lg leading-tight mb-1">Aditi Krishnan</h4>
                                <p className="text-xs text-[#8899AA]">VP Engineering</p>
                            </div>
                        </div>
                        <div className="space-y-3 border-t border-[#1A2A3A] pt-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8899AA]">Tenure Limit (3 yrs)</span>
                                <span className="text-amber-400 font-bold flex items-center gap-1"><AlertTriangle size={12} /> Expires in 14 days</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-[#8899AA]">IC Certification</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-1"><ShieldCheck size={12} /> Valid</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
