"use client";
import React, { useState } from 'react';
import { Settings, ArrowLeft, Building2, Landmark, Receipt, FileText, Save } from 'lucide-react';
import Link from 'next/link';

export default function EntitySettingsScreen() {
    const [activeTab, setActiveTab] = useState('basic');

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/multi-entity/list" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> Back to Entities
            </Link>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Settings size={22} className="text-slate-400" /> Acme Retail Solutions
                        <span className="bg-[#131B2B] text-[#8899AA] text-xs px-2 py-1 rounded font-mono border border-[#2A3A4A] ml-2">ENT-002</span>
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage entity-specific configurations, compliance details, and override behaviors.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden p-2">
                    {[
                        { id: 'basic', icon: Building2, label: 'Basic Info' },
                        { id: 'compliance', icon: Landmark, label: 'Statutory & Tax' },
                        { id: 'payroll', icon: Receipt, label: 'Payroll Overrides' },
                        { id: 'branding', icon: FileText, label: 'Brand & Documents' },
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
                    {activeTab === 'basic' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-3">Company Details</h2>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Legal Entity Name</label>
                                    <input type="text" defaultValue="Acme Retail Solutions" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Entity Type</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white hover:border-[#3A4A5A] transition-colors appearance-none outline-none">
                                        <option>Parent</option><option selected>Subsidiary</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[#8899AA] font-bold mb-2">Registered Address</label>
                                    <textarea rows={3} defaultValue="12, High Street, Andheri West, Mumbai, Maharashtra 400053" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors resize-none"></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'compliance' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-3">Statutory Registrations</h2>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Corporate PAN</label>
                                    <input type="text" defaultValue="ABCDE1234F" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors uppercase" />
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Corporate TAN</label>
                                    <input type="text" defaultValue="MUMA12345B" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors uppercase" />
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">PF Establishment Code</label>
                                    <input type="text" defaultValue="MHBAN0001234000" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors uppercase" />
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">ESI Employer Code</label>
                                    <input type="text" defaultValue="31001234560000101" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors uppercase" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'payroll' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-3">Payroll System Overrides</h2>
                            <p className="text-[#8899AA] text-sm mb-6 max-w-xl">By default, this entity inherits payroll setup from the parent. Toggle switches below to break inheritance and create custom rules for this entity.</p>

                            <div className="space-y-4">
                                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <div className="text-white font-bold text-sm mb-1">Custom Pay Components (Salary Structure)</div>
                                        <div className="text-[#556677] text-xs">Entity uses same CTC architecture as parent.</div>
                                    </div>
                                    <button className="w-12 h-6 rounded-full bg-[#1A2A3A] relative transition-colors"><div className="w-4 h-4 bg-[#8899AA] rounded-full absolute top-1 left-1"></div></button>
                                </div>

                                <div className="bg-[#131B2B] border border-indigo-500/50 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                                    <div>
                                        <div className="text-white font-bold text-sm mb-1">Custom Payslip Template</div>
                                        <div className="text-indigo-400 text-xs">Overridden. This entity issues its own branded payslips.</div>
                                    </div>
                                    <button className="w-12 h-6 rounded-full bg-indigo-500 relative transition-colors"><div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'branding' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-3">Entity Branding</h2>
                            <div className="flex items-start gap-8">
                                <div>
                                    <div className="w-32 h-32 rounded-xl border-2 border-dashed border-[#2A3A4A] flex flex-col items-center justify-center text-[#556677] bg-[#131B2B] cursor-pointer hover:border-indigo-500 transition-colors">
                                        <span className="text-xs font-bold px-4 text-center">Upload Logo (PNG)</span>
                                    </div>
                                    <div className="text-center text-xs text-[#8899AA] mt-2">White background</div>
                                </div>
                                <div className="flex-1 space-y-4 text-sm">
                                    <div>
                                        <label className="block text-[#8899AA] font-bold mb-2">Primary Color Hex</label>
                                        <div className="flex gap-2">
                                            <div className="w-10 h-10 rounded bg-[#3B82F6] border border-[#2A3A4A]"></div>
                                            <input type="text" defaultValue="#3B82F6" className="w-32 bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2 text-white focus:border-indigo-500 outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
