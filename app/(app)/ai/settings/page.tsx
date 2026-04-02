"use client";

import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Sliders, Database, Key, Bell, Power, AlertTriangle, Workflow } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AISettingsPage() {
    const [activeTab, setActiveTab] = useState('General AI');
    const tabs = ['General AI', 'Data & Privacy', 'Autonomy Levels', 'Model Connectors'];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <SettingsIcon size={28} className="text-orange-400" /> AI Settings & Configuration
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Global administrative controls for Kaarya's AI suite. Manage guardrails, auto-execution permissions, and external LLM API endpoints.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-orange-600 hover:bg-orange-500 text-white border-none py-2 px-6">
                        Save Configuration
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">

                {/* Navigation Sidebar bg-[#0D1928] border border-[#1A2A3A] */}
                <div className="lg:col-span-1 flex flex-col gap-2 shrink-0">
                    <button
                        onClick={() => setActiveTab('General AI')}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'General AI' ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]' : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'}`}
                    >
                        <SettingsIcon size={18} className={activeTab === 'General AI' ? 'text-orange-400' : ''} /> General Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('Autonomy Levels')}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'Autonomy Levels' ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]' : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'}`}
                    >
                        <Workflow size={18} className={activeTab === 'Autonomy Levels' ? 'text-orange-400' : ''} /> Autonomy Levels
                    </button>
                    <button
                        onClick={() => setActiveTab('Data & Privacy')}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'Data & Privacy' ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]' : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'}`}
                    >
                        <Shield size={18} className={activeTab === 'Data & Privacy' ? 'text-orange-400' : ''} /> Privacy & Compliance
                    </button>
                    <button
                        onClick={() => setActiveTab('Model Connectors')}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'Model Connectors' ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]' : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'}`}
                    >
                        <Database size={18} className={activeTab === 'Model Connectors' ? 'text-orange-400' : ''} /> LLM Connectors
                    </button>
                </div>

                {/* Main Settings Area */}
                <div className="lg:col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-y-auto">
                    <div className="p-6 md:p-8 space-y-8">

                        {activeTab === 'Autonomy Levels' && (
                            <div className="animate-fade-in">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-white mb-2">AI Execution Guardrails</h2>
                                    <p className="text-sm text-[#8899AA]">Configure which actions the AI can execute autonomously versus requiring human approval.</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Setting Group */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-5 rounded-xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-white font-medium mb-1">Recruitment Workflows</h3>
                                                <p className="text-xs text-[#8899AA]">Applies to sourcing triggers, ATS stage progression, and interview scheduling.</p>
                                            </div>
                                            <div className="flex bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-1">
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#8899AA] hover:text-white transition-colors">Off</button>
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#8899AA] hover:text-white transition-colors">Copilot (Suggest)</button>
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#2A3A4A] text-emerald-400 shadow shadow-black/20">Full Autonomy</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Setting Group */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-5 rounded-xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-white font-medium mb-1 flex items-center gap-2">Payroll & Compensation <AlertTriangle size={14} className="text-amber-500" /></h3>
                                                <p className="text-xs text-[#8899AA] max-w-md">Applies to mid-cycle hikes, bonus pool restructuring, and RSUs. High financial impact.</p>
                                            </div>
                                            <div className="flex bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-1">
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#8899AA] hover:text-white transition-colors">Off</button>
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#2A3A4A] text-amber-500 shadow shadow-black/20">Copilot (Suggest)</button>
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#8899AA] cursor-not-allowed opacity-50" disabled>Full Autonomy</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Setting Group */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-5 rounded-xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-white font-medium mb-1">Document Intelligence & OCR</h3>
                                                <p className="text-xs text-[#8899AA]">Auto-approve employee submitted documents (Pan, Aadhar, Payslips) exceeding confidence threshold.</p>
                                            </div>
                                            <div className="flex bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-1">
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md text-[#8899AA] hover:text-white transition-colors">Off</button>
                                                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-[#2A3A4A] text-emerald-400 shadow shadow-black/20">Full Autonomy {'>'} 95%</button>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-[#1A2A3A]">
                                            <label className="text-xs text-[#8899AA] mb-2 block">Confidence Threshold (%)</label>
                                            <input type="range" min="80" max="99" defaultValue="95" className="w-full md:w-64 accent-orange-500" />
                                            <div className="flex justify-between w-full md:w-64 text-[10px] text-[#445566] mt-1 font-mono">
                                                <span>80%</span><span>90%</span><span>99%</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === 'Model Connectors' && (
                            <div className="animate-fade-in">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-white mb-2">External LLM Integrations</h2>
                                    <p className="text-sm text-[#8899AA]">Kaarya uses small proprietary models for core tasks, but relies on external foundational models for NLP generation tasks (Chatbot, Policy Drafting).</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Anthropic */}
                                    <div className="bg-[#131B2B] border border-orange-500/30 p-5 rounded-xl shadow-[0_4px_20px_rgba(249,115,22,0.05)]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-orange-400 font-bold">An</div>
                                                <div>
                                                    <h3 className="text-white font-medium mb-1">Anthropic Claude 3.5 Sonnet</h3>
                                                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 w-fit">Primary Routing Model</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-emerald-400 font-medium">Connected</span>
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                            </div>
                                        </div>
                                        <label className="text-xs font-semibold text-[#8899AA] block mb-1">API Key</label>
                                        <div className="flex gap-2">
                                            <input type="password" value="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx" readOnly className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-[#8899AA] focus:outline-none" />
                                            <Button variant="secondary" className="border-[#2A3A4A] px-3">Update</Button>
                                        </div>
                                    </div>

                                    {/* OpenAI */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-5 rounded-xl opacity-60">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-emerald-400 font-bold">OAI</div>
                                                <div>
                                                    <h3 className="text-white font-medium mb-1">OpenAI GPT-4o</h3>
                                                    <p className="text-[10px] text-[#8899AA] uppercase tracking-wider">Fallback Model</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-[#8899AA] font-medium">Disconnected</span>
                                                <div className="w-2 h-2 rounded-full bg-[#445566]" />
                                            </div>
                                        </div>
                                        <label className="text-xs font-semibold text-[#8899AA] block mb-1">API Key</label>
                                        <div className="flex gap-2">
                                            <input type="password" placeholder="sk-proj-..." className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none transition-colors placeholder:text-[#445566]" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {activeTab === 'General AI' && (
                            <div className="animate-fade-in flex flex-col items-center justify-center p-12 text-center h-full">
                                <Sliders size={48} className="text-[#2A3A4A] mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">Module Configurations</h2>
                                <p className="text-sm text-[#8899AA] max-w-sm">Use the sidebar to navigate specific AI subsystem settings including guardrails and data privacy policies.</p>
                            </div>
                        )}
                        {activeTab === 'Data & Privacy' && (
                            <div className="animate-fade-in flex flex-col items-center justify-center p-12 text-center h-full">
                                <Shield size={48} className="text-[#2A3A4A] mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">Privacy Vault</h2>
                                <p className="text-sm text-[#8899AA] max-w-sm">Configure PII extraction mapping and data retention limits for model training pools here.</p>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
