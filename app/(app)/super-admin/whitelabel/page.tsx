"use client";
import React from 'react';
import { Palette, Globe, Mail, UploadCloud, Save, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function WhiteLabelSetupScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Partner White-label Configuration</h1>
                    <p className="text-[#8899AA] text-sm">Customize the SaaS platform branding for Enterprise Resellers or multi-brand conglomerates.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                        <Save size={16} /> Deploy Active Theme
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">

                {/* Configuration Panes */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Brand Assets */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><Palette size={16} className="text-[#556677]" /> Brand Identity Assets</h2>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 bg-[#131B2B] border border-[#2A3A4A] border-dashed rounded-2xl flex flex-col items-center justify-center text-[#556677] hover:text-white hover:border-indigo-500 cursor-pointer transition-colors relative group">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-2xl transition-opacity">
                                        <UploadCloud size={20} />
                                    </div>
                                    {/* Mock uploaded logo */}
                                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-1">A</div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Primary App Logo (Light/Dark Docs)</h4>
                                    <p className="text-xs text-[#8899AA] mb-2">Used in the top navigation bar and login screens. SVG or transparent PNG.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-[#1A2A3A] pt-6">
                                <div>
                                    <label className="text-[10px] text-[#8899AA] uppercase font-bold tracking-wider block mb-2">Primary Brand Color</label>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-600 border border-indigo-400" />
                                        <input type="text" defaultValue="#4F46E5" className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-24 font-mono" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-[#8899AA] uppercase font-bold tracking-wider block mb-2">Accent / Success Color</label>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500 border border-emerald-400" />
                                        <input type="text" defaultValue="#10B981" className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-1.5 text-sm text-white focus:border-indigo-500 outline-none w-24 font-mono" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Domains & Sender Identities */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><Globe size={16} className="text-[#556677]" /> Domains & Connectivity</h2>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider ml-1">Custom Login Portal Subdomain</label>
                                <div className="relative">
                                    <input type="text" defaultValue="people.apexmedia.com" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors" />
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-emerald-400 text-[10px] font-bold">
                                    <CheckCircle2 size={12} /> CNAME Verified & SSL Active
                                </div>
                            </div>

                            <div className="space-y-1 pt-4 border-t border-[#1A2A3A]">
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider ml-1 flex items-center gap-2"><Mail size={14} /> SMTP Sender Address</label>
                                <div className="relative">
                                    <input type="text" defaultValue="noreply@updates.apexmedia.com" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors" />
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-[#8899AA] text-[10px] font-bold">
                                    Requires DKIM & SPF records in DNS.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Preview Window */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 bg-[#131B2B] border border-[#2A3A4A] rounded-2xl overflow-hidden shadow-2xl">
                        <div className="bg-[#060D1A] p-3 border-b border-[#2A3A4A] flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                            </div>
                            <div className="mx-auto bg-[#131B2B] border border-[#2A3A4A] rounded text-[10px] text-[#556677] px-8 py-0.5">people.apexmedia.com</div>
                        </div>
                        <div className="p-6 bg-[#0A1420] min-h-[400px]">

                            {/* Mock UI using the injected CSS vars essentially */}
                            <div className="flex items-center gap-2 mb-8 border-b border-[#1A2A3A] pb-4">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">A</div>
                                <span className="text-white font-bold tracking-tight">Apex Media HR</span>
                            </div>

                            <div className="space-y-4">
                                <div className="h-4 w-3/4 bg-[#1A2A3A] rounded" />
                                <div className="h-4 w-1/2 bg-[#1A2A3A] rounded mb-6 gap-2" />

                                <button className="w-full bg-indigo-600 text-white font-bold rounded-lg py-2.5 text-xs">
                                    Login via Primary SSO
                                </button>
                                <div className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white font-bold rounded-lg py-2.5 text-xs text-center border-dashed">
                                    Secondary Action
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
