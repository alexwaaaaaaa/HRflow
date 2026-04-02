"use client";
import React from 'react';
import { Pin, Calendar, Bell, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PinnedScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">High Priority</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Pin size={24} className="text-amber-400" fill="currentColor" /> Pinned & Important</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Must-read policies, central documentation, and long-lived corporate notices.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Compliance Pins */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-5 flex items-center gap-2">
                        <Shield size={18} className="text-[#556677]" />
                        Compliance & Legal
                    </h3>

                    <div className="space-y-4 text-sm">
                        <div className="p-4 bg-[#131B2B] border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-500/60 transition-colors flex gap-4 items-start group">
                            <div className="text-amber-400 mt-0.5"><Pin size={16} fill="currentColor" /></div>
                            <div>
                                <h4 className="text-white font-bold mb-1 group-hover:text-amber-400 transition-colors">Information Security Policy (v4.2)</h4>
                                <p className="text-[#8899AA] text-xs mb-3">Updated guidelines on remote access, VPN usage, and acceptable software. Mandatory read for all FTEs.</p>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-[#556677]">
                                    <span>Pinned by CISO</span>
                                    <span>Last Updated: Mar 2025</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-[#131B2B] border border-amber-500/30 rounded-xl cursor-pointer hover:border-amber-500/60 transition-colors flex gap-4 items-start group">
                            <div className="text-amber-400 mt-0.5"><Pin size={16} fill="currentColor" /></div>
                            <div>
                                <h4 className="text-white font-bold mb-1 group-hover:text-amber-400 transition-colors">Code of Conduct & Ethics</h4>
                                <p className="text-[#8899AA] text-xs mb-3">Core behavioral guidelines, anti-harassment policies, and whistle-blower mechanisms.</p>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-[#556677]">
                                    <span>Pinned by HR Legal</span>
                                    <span>Last Updated: Jan 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Org level Pins */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-5 flex items-center gap-2">
                        <Bell size={18} className="text-[#556677]" />
                        Company Updates
                    </h3>

                    <div className="space-y-4 text-sm">
                        <div className="p-4 bg-[#131B2B] border border-sky-500/30 rounded-xl cursor-pointer hover:border-sky-500/60 transition-colors flex gap-4 items-start group">
                            <div className="text-sky-400 mt-0.5"><Pin size={16} fill="currentColor" /></div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold mb-1 group-hover:text-sky-400 transition-colors">Holiday Calendar 2026 (Global Locations)</h4>
                                <p className="text-[#8899AA] text-xs mb-3">Regional holiday breakdowns and shutdown periods for US, UK, and India entities.</p>
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-[#556677]">
                                    <div>Pinned by Admin</div>
                                    <span className="text-sky-400 flex items-center gap-1">Download PDF <ArrowRight size={10} /></span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl cursor-pointer hover:border-white/20 transition-colors flex gap-4 items-start group">
                            <div className="text-[#556677] mt-0.5"><Pin size={16} fill="currentColor" /></div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold mb-1 group-hover:text-gray-300 transition-colors">Benefits Overview & Q&A</h4>
                                <p className="text-[#8899AA] text-xs mb-2">Central hub for health, dental, and wellness stipends.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
