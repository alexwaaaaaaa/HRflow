"use client";

import React, { useState } from 'react';
import { Settings2, Cpu, Database, Network, Key, Plus, Save, Activity, Trash2, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AIConfigurationPage() {
    const [activeTab, setActiveTab] = useState('Models');
    const tabs = ['Models', 'Features', 'API Keys', 'Advanced'];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Settings2 size={28} className="text-indigo-400" /> AI Configuration
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Deep technical configuration for Kaarya's embedded AI services. Manage model versions, feature flags, and custom integrations.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        Discard Changes
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                        <Save size={16} className="mr-2" /> Apply Configuration
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">

                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-2 shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors text-sm font-medium ${activeTab === tab
                                    ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]'
                                    : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                {tab === 'Models' && <Cpu size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab === 'Features' && <Activity size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab === 'API Keys' && <Key size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab === 'Advanced' && <Network size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab}
                            </span>
                            {tab === 'Advanced' && <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">Danger</span>}
                        </button>
                    ))}
                </div>

                {/* Main Settings Area */}
                <div className="lg:col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-y-auto">
                    <div className="p-6 md:p-8 space-y-8">

                        {activeTab === 'Models' && (
                            <div className="animate-fade-in">
                                <div className="mb-6 flex justify-between items-end">
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2">Deployed Models</h2>
                                        <p className="text-sm text-[#8899AA]">Manage versioning for internally hosted predictive models.</p>
                                    </div>
                                    <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-[#2A3A4A] text-xs h-auto py-1.5">
                                        <Plus size={14} className="mr-1" /> Add Custom Model
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {/* Attrition Model */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-5 rounded-xl flex flex-col md:flex-row justify-between gap-4 group hover:border-indigo-500/30 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-white font-medium">Attrition Risk Predictor</h3>
                                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
                                            </div>
                                            <p className="text-xs text-[#8899AA] mb-4">Internal XGBoost ensemble trained on HRFlow core tables.</p>

                                            <div className="flex gap-4">
                                                <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-2.5">
                                                    <label className="text-[10px] text-[#8899AA] uppercase tracking-wider block mb-1 font-semibold">Current Version</label>
                                                    <select className="bg-transparent text-white text-sm w-full outline-none appearance-none cursor-pointer">
                                                        <option>v4.2.1 (Production)</option>
                                                        <option>v4.2.0 (Stable)</option>
                                                        <option>v4.1.5 (Legacy)</option>
                                                    </select>
                                                </div>
                                                <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-2.5">
                                                    <label className="text-[10px] text-[#8899AA] uppercase tracking-wider block mb-1 font-semibold">Threshold</label>
                                                    <div className="flex items-center text-sm text-white">
                                                        0.85
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-col justify-end gap-2 border-t border-[#1A2A3A] md:border-t-0 md:border-l md:pl-4 pt-4 md:pt-0 shrink-0">
                                            <Button variant="secondary" className="border-[#2A3A4A] text-xs w-full py-1.5 h-auto hover:bg-[#2A3A4A] hover:text-white">View Metrics</Button>
                                        </div>
                                    </div>

                                    {/* OCR Model */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-5 rounded-xl flex flex-col md:flex-row justify-between gap-4 group hover:border-indigo-500/30 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-white font-medium">Document Intelligence (OCR)</h3>
                                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
                                            </div>
                                            <p className="text-xs text-[#8899AA] mb-4">Vision transformer for extracting text from KYC documents.</p>

                                            <div className="flex gap-4">
                                                <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-2.5">
                                                    <label className="text-[10px] text-[#8899AA] uppercase tracking-wider block mb-1 font-semibold">Current Version</label>
                                                    <select className="bg-transparent text-white text-sm w-full outline-none appearance-none cursor-pointer">
                                                        <option>v2.0.4 (Production)</option>
                                                        <option>v1.5.0 (Legacy)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-col justify-end gap-2 border-t border-[#1A2A3A] md:border-t-0 md:border-l md:pl-4 pt-4 md:pt-0 shrink-0">
                                            <Button variant="secondary" className="border-[#2A3A4A] text-xs w-full py-1.5 h-auto hover:bg-[#2A3A4A] hover:text-white">View Metrics</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Features' && (
                            <div className="animate-fade-in flex flex-col items-center justify-center p-12 text-center h-full">
                                <Activity size={48} className="text-[#2A3A4A] mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">Feature Toggles</h2>
                                <p className="text-sm text-[#8899AA] max-w-sm">Enable or disable experimental AI capabilities before rolling them out globally to your tenant.</p>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
