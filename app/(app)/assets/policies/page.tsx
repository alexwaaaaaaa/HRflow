"use client";
import React, { useState } from 'react';
import { Settings, Shield, HardDrive, Edit, Plus, FileSignature } from 'lucide-react';
import Link from 'next/link';

export default function DevicePoliciesScreen() {
    const [activeTab, setActiveTab] = useState('mdm');

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Shield size={24} className="text-slate-300" /> Security & Device Policies</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Configure compliance rules, MDM integration, and remote wipe policies.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden p-2">
                    {[
                        { id: 'mdm', icon: HardDrive, label: 'MDM Config (Jamf/Intune)' },
                        { id: 'password', icon: Settings, label: 'Password & Auth Policy' },
                        { id: 'agreements', icon: FileSignature, label: 'Employee Agreements' },
                    ].map(t => {
                        const Icon = t.icon;
                        return (
                            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === t.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A]' : 'text-[#8899AA] hover:text-white hover:bg-[#131B2B]/50 border border-transparent'}`}>
                                <Icon size={18} className={activeTab === t.id ? 'text-indigo-400' : 'text-[#556677]'} />
                                {t.label}
                            </button>
                        )
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-1 w-full bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 min-h-[500px]">

                    {activeTab === 'mdm' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white mb-1">Mobile Device Management Integration</h2>
                                    <p className="text-[#8899AA] text-sm text-xs">Sync devices directly from your MDM provider (e.g. Jamf Pro, Microsoft Intune).</p>
                                </div>
                                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
                                    Connect Provider
                                </button>
                            </div>

                            <div className="p-6 bg-[#131B2B] border border-emerald-500/30 rounded-xl flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-slate-900 border-2 border-slate-200 shrink-0">Jamf</div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-bold">Jamf Pro (macOS/iOS)</h3>
                                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-500/30">Connected & Synced</span>
                                    </div>
                                    <p className="text-[#8899AA] text-sm mb-4">Last successful sync: 10 mins ago. Tracking 472 Apple devices.</p>

                                    <div className="flex gap-3">
                                        <button className="text-indigo-400 hover:text-white text-xs font-bold transition-colors">Force Sync</button>
                                        <button className="text-[#556677] hover:text-white text-xs font-bold transition-colors">Configure API Keys</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                                <h3 className="text-white font-bold mb-4">Automated Actions</h3>

                                <label className="flex items-start gap-4 p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A] cursor-pointer hover:border-[#3A4A5A]">
                                    <input type="checkbox" className="mt-1 accent-indigo-500 w-4 h-4" defaultChecked />
                                    <div>
                                        <div className="text-white text-sm font-bold">Auto-enroll new devices based on HRFlow creation</div>
                                    </div>
                                </label>

                                <label className="flex items-start gap-4 p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A] cursor-pointer hover:border-[#3A4A5A]">
                                    <input type="checkbox" className="mt-1 accent-indigo-500 w-4 h-4" defaultChecked />
                                    <div>
                                        <div className="text-white text-sm font-bold">Issue Remote Lock if device is marked "Stolen/Lost" in HRFlow</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'agreements' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white mb-1">Asset Acceptance Policies</h2>
                                    <p className="text-[#8899AA] text-sm text-xs">Standard agreements employees must sign when receiving hardware.</p>
                                </div>
                                <button className="bg-[#131B2B] border border-[#2A3A4A] hover:bg-[#1A2A3A] text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2">
                                    <Plus size={16} /> New Template
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'Standard IT Acceptable Use Policy v2.1', def: true, updated: 'Aug 2024' },
                                    { name: 'BYOD (Bring Your Own Device) Agreement', def: false, updated: 'Jan 2024' },
                                ].map((doc, i) => (
                                    <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 hover:border-indigo-500/50 transition-colors group cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <FileSignature size={24} className="text-[#556677] group-hover:text-indigo-400 transition-colors" />
                                            <button className="text-[#556677] hover:text-white"><Edit size={16} /></button>
                                        </div>
                                        <h3 className="text-white font-bold text-sm mb-1">{doc.name}</h3>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-[#8899AA] text-[10px]">Updated: {doc.updated}</span>
                                            {doc.def && <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded border border-indigo-500/30 uppercase">Default</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="flex items-center justify-center py-20 animate-in fade-in">
                            <p className="text-[#556677]">Settings visible to Global Admin only.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
