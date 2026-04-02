"use client";
import React, { useState } from 'react';
import { ShieldCheck, Download, Star, ExternalLink, Play, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MarketplaceDetailScreen() {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-sm text-[#556677] mb-4">
                <Link href="/settings/integrations" className="hover:text-white">Marketplace</Link> /
                <span className="text-white">Greenhouse ATS</span>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full" />

                <div className="flex items-start gap-6 relative z-10">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-emerald-500/20 shrink-0">
                        Gh
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white mb-2">Greenhouse ATS</h1>
                        <p className="text-[#8899AA] text-base mb-3 max-w-xl">
                            Seamlessly transition hired candidates from Greenhouse into Kaarya employee records. Automatically trigger onboarding workflows precisely when an offer is signed.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-bold">
                            <span className="text-white flex items-center gap-1"><Star size={16} className="text-amber-400 fill-amber-400" /> 4.8</span>
                            <span className="text-[#556677]">By Greenhouse Inc.</span>
                            <span className="bg-[#1A2A3A] text-[#CCDDEE] px-2 py-0.5 rounded text-xs">Recruiting</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto relative z-10">
                    <Link href="/settings/integrations/install" className="bg-white text-[#060D1A] px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20">
                        Install App <ArrowRight size={16} />
                    </Link>
                    <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                        Documentation <ExternalLink size={16} />
                    </button>
                    <p className="text-xs text-center text-[#556677] font-bold mt-1 tracking-wide flex items-center justify-center gap-1">
                        <Shield size={12} /> Verified App
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-6">
                    {/* Tabs */}
                    <div className="flex border-b border-[#1A2A3A]">
                        {['Overview', 'Permissions', 'Reviews (142)'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab ? 'border-emerald-500 text-white' : 'border-transparent text-[#556677] hover:text-[#8899AA]'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'Overview' && (
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 space-y-8 animate-fade-in line-height-relaxed">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">About this integration</h3>
                                <p className="text-[#8899AA] mb-4">
                                    The Kaarya + Greenhouse integration eliminates manual data entry and reduces the risk of errors during candidate handover. When a candidate reaches the "Hired" stage in Greenhouse, their profile, resume, and offer details are automatically synced to Kaarya.
                                </p>
                                <p className="text-[#8899AA]">
                                    Once synced, Kaarya's auto-provisioning engine takes over to assign assets, create email accounts, and notify IT—reducing onboarding time from days to minutes.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
                                <ul className="space-y-3 text-[#8899AA]">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-emerald-500/20 p-1 rounded-full"><CheckCircle2 className="text-emerald-400" size={12} /></div>
                                        <span><strong>Instant Employee Creation:</strong> Hired candidates become pending employees automatically.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-emerald-500/20 p-1 rounded-full"><CheckCircle2 className="text-emerald-400" size={12} /></div>
                                        <span><strong>Document Push:</strong> Copies signed offer letters, resumes, and NDAs to the employee's document vault.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-emerald-500/20 p-1 rounded-full"><CheckCircle2 className="text-emerald-400" size={12} /></div>
                                        <span><strong>Department Mapping:</strong> Maps Greenhouse departments and locations directly to your Kaarya org structure.</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Media Preview</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-video bg-[#131B2B] rounded-xl border border-[#2A3A4A] flex items-center justify-center group cursor-pointer relative overflow-hidden">
                                        <Play className="text-white/50 group-hover:text-white transition-all z-10" size={48} />
                                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="aspect-video bg-[#131B2B] rounded-xl border border-[#2A3A4A] flex items-center justify-center relative overflow-hidden">
                                        <span className="text-[#556677] font-bold text-sm">Screenshot 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Permissions' && (
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 space-y-6 animate-fade-in">
                            <h3 className="text-lg font-bold text-white mb-2">Requested Scopes</h3>
                            <p className="text-[#8899AA] text-sm mb-6">This application requires the following access to your Kaarya workspace.</p>

                            <div className="space-y-4 font-mono text-sm max-w-xl">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-[#131B2B] border border-[#2A3A4A]">
                                    <span className="text-[#CCDDEE]">employees:write</span>
                                    <span className="text-orange-400 font-bold bg-orange-500/10 px-2 rounded">Write</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-[#131B2B] border border-[#2A3A4A]">
                                    <span className="text-[#CCDDEE]">documents:write</span>
                                    <span className="text-orange-400 font-bold bg-orange-500/10 px-2 rounded">Write</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-[#131B2B] border border-[#2A3A4A]">
                                    <span className="text-[#CCDDEE]">organization:read</span>
                                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 rounded">Read</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Sidebar */}
                <div className="w-full md:w-72 shrink-0 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-6">
                        <div>
                            <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Developer</h4>
                            <a href="#" className="text-sm font-bold text-emerald-400 flex items-center gap-1 hover:underline">Greenhouse Software <ExternalLink size={12} /></a>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#131B2B] border border-[#2A3A4A] text-[#CCDDEE] px-2 py-1 rounded text-xs">ATS</span>
                                <span className="bg-[#131B2B] border border-[#2A3A4A] text-[#CCDDEE] px-2 py-1 rounded text-xs">Recruiting</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Support Resources</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-sm text-[#8899AA] hover:text-white flex items-center gap-2"><ExternalLink size={14} /> Setup Guide</a></li>
                                <li><a href="#" className="text-sm text-[#8899AA] hover:text-white flex items-center gap-2"><ShieldCheck size={14} /> Privacy Policy</a></li>
                                <li><a href="#" className="text-sm text-[#8899AA] hover:text-white flex items-center gap-2"><ExternalLink size={14} /> Contact Support</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
