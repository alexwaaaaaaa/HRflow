"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Globe2, Plus, Settings, ArrowRight, ShieldCheck } from 'lucide-react';

export default function GlobalCountrySetupScreen() {
    const [activeTab, setActiveTab] = useState('active');

    const COUNTRIES = [
        { id: 'IN', name: 'India', code: 'IND', currency: 'INR (₹)', tz: 'IST (UTC+5:30)', status: 'Active', emps: 450, region: 'APAC' },
        { id: 'AE', name: 'United Arab Emirates', code: 'UAE', currency: 'AED (د.إ)', tz: 'GST (UTC+4)', status: 'Active', emps: 85, region: 'MENA' },
        { id: 'SG', name: 'Singapore', code: 'SGP', currency: 'SGD (S$)', tz: 'SGT (UTC+8)', status: 'Active', emps: 32, region: 'APAC' },
        { id: 'US', name: 'United States', code: 'USA', currency: 'USD ($)', tz: 'EST, CST, PST', status: 'Implementing', emps: 0, region: 'NAMER' },
    ];

    return (
        <Page
            title="Global Country Configuration"
            subtitle="Manage active jurisdictions, local compliance frameworks, and geographical expansion."
            breadcrumbs={[{ label: "Global", href: "/global" }, { label: "Country Setup" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Globe2 size={24} className="text-sky-400" /> Global Country Configuration</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage active jurisdictions, local compliance frameworks, and geographical expansion.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                        <Plus size={16} /> Add New Country
                    </button>
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-[#060D1A] border border-[#1A2A3A] rounded-xl w-fit mb-6">
                {[
                    { id: 'active', label: 'Active Operational Countries' },
                    { id: 'implementing', label: 'Implementation Pipeline' },
                    { id: 'compliance', label: 'Global Compliance Dashboard' },
                ].map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === t.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A] shadow-sm' : 'text-[#8899AA] hover:text-white'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {activeTab === 'active' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
                    {COUNTRIES.filter(c => c.status === 'Active').map((c, i) => (
                        <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] hover:border-sky-500/50 rounded-2xl p-6 transition-all group flex flex-col h-full cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center overflow-hidden shrink-0 text-lg shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                                        {c.id === 'IN' ? '🇮🇳' : c.id === 'AE' ? '🇦🇪' : c.id === 'SG' ? '🇸🇬' : '🇺🇸'}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-sky-400 transition-colors">{c.name}</h3>
                                        <div className="text-[#8899AA] text-xs font-mono">{c.code} • {c.region}</div>
                                    </div>
                                </div>
                                <button className="text-[#556677] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><Settings size={18} /></button>
                            </div>

                            <div className="space-y-3 mb-6 flex-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#556677] font-bold">Base Currency</span>
                                    <span className="text-white font-mono">{c.currency}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#556677] font-bold">Timezone(s)</span>
                                    <span className="text-[#AABBCC] text-xs">{c.tz}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#556677] font-bold">Active Headcount</span>
                                    <span className="text-white font-bold">{c.emps}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#1A2A3A] flex gap-2">
                                <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white text-xs font-bold py-2 rounded-lg transition-colors">
                                    View Policies
                                </button>
                                <button className="flex-1 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                                    Run Payroll <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="bg-[#0A1420]/50 border-2 border-dashed border-[#2A3A4A] hover:border-sky-500/50 rounded-2xl p-6 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]">
                        <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-white font-bold mb-2">Initialize New Country</h3>
                        <p className="text-[#556677] text-sm max-w-xs">Set up a new legal entity jurisdiction with localized compliance rules and HR policies.</p>
                    </div>
                </div>
            )}

            {activeTab === 'implementing' && (
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 text-center animate-in fade-in">
                    <div className="w-16 h-16 mx-auto bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl">🇺🇸</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">United States Implementation</h3>
                    <p className="text-[#8899AA] mb-6 max-w-md mx-auto">Working through multi-state tax setup, 401(k) compliance mapping, and healthcare integrations.</p>

                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-between text-xs font-bold mb-2">
                            <span className="text-amber-400">Implementation Progress</span>
                            <span className="text-white">65%</span>
                        </div>
                        <div className="w-full h-2.5 bg-[#131B2B] border border-[#2A3A4A] rounded-full overflow-hidden mb-8">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl flex items-center gap-3 text-emerald-400 opacity-70">
                                <ShieldCheck size={20} />
                                <span className="text-sm font-bold text-white">Federal Tax ID setup</span>
                            </div>
                            <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl flex items-center gap-3 text-emerald-400 opacity-70">
                                <ShieldCheck size={20} />
                                <span className="text-sm font-bold text-white">Bank Integrations</span>
                            </div>
                            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3 text-amber-400">
                                <div className="w-5 h-5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div>
                                <span className="text-sm font-bold text-white">State-level Withholding config</span>
                            </div>
                            <div className="p-4 bg-[#131B2B] border border-[#2A3A4A] rounded-xl flex items-center gap-3 text-[#556677]">
                                <div className="w-5 h-5 rounded-full border-2 border-[#556677]"></div>
                                <span className="text-sm font-bold text-white">Benefit Provider Sync</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    
        </Page>
    );
}
