"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { FolderOpen, Plus, FileText, ChevronDown, Clock, MessageSquare, Paperclip } from 'lucide-react';
import Link from 'next/link';

export default function GrievanceInvestigationScreen({ params: _params }: { params: { id: string } }) {
    const defaultId = "GRV-2026-142";
    const [activeTab, setActiveTab] = useState('evidence');

    return (
        <Page
            title="Investigation Workspace:"
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Id" }, { label: "Investigation" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4">
                <div>
                    <Link href="/grievances/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-2">← Back to Dashboard</Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-white">Investigation Workspace: {defaultId}</h1>
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <Clock size={12} className="animate-pulse" /> In Progress
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                        Generate Interim Report
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
                        Draft Resolution <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Sidebar - Quick Info */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2">Committee Members</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30 text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)]">MV</div>
                                <div>
                                    <div className="text-white text-sm font-bold">Meera Venkatesh</div>
                                    <div className="text-[10px] text-emerald-400 font-bold">Presiding Officer</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold border border-sky-500/30 text-xs">SD</div>
                                <div>
                                    <div className="text-white text-sm font-bold">Sanjay Dutt</div>
                                    <div className="text-[10px] text-[#556677]">Internal Member</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30 text-xs">PS</div>
                                <div>
                                    <div className="text-white text-sm font-bold">Priya Sharma</div>
                                    <div className="text-[10px] text-[#556677]">External Member (NGO)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2">Involved Parties</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] text-emerald-400 font-bold uppercase mb-1 block">Complainant</span>
                                <div className="text-sm text-white font-medium flex items-center justify-between">
                                    Anonymized User
                                    <button className="text-[#556677] hover:text-white transition-colors"><MessageSquare size={14} /></button>
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] text-rose-400 font-bold uppercase mb-1 block">Respondent</span>
                                <div className="text-sm text-white font-medium flex items-center justify-between">
                                    Rajesh Kumar (PM)
                                    <button className="text-[#556677] hover:text-white transition-colors"><MessageSquare size={14} /></button>
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] text-indigo-400 font-bold uppercase mb-1 block">Witnesses</span>
                                <div className="text-sm text-[#CCDDEE]">None Added</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Investigation Area */}
                <div className="lg:col-span-3 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-[700px] overflow-hidden">

                    {/* Tabs */}
                    <div className="flex border-b border-[#1A2A3A] bg-[#060D1A]">
                        {[
                            { id: 'evidence', label: 'Evidence locker', icon: <FolderOpen size={16} /> },
                            { id: 'statements', label: 'Statements', icon: <FileText size={16} /> },
                            { id: 'timeline', label: 'Fact Timeline', icon: <Clock size={16} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-bold text-sm border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-400 bg-[#131B2B]'
                                        : 'border-transparent text-[#8899AA] hover:text-white hover:bg-[#131B2B]/50'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-6 relative">
                        {/* Watermark for confidentiality */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-30deg]">
                            <span className="text-6xl font-black text-white whitespace-nowrap">STRICTLY CONFIDENTIAL • IC EYES ONLY</span>
                        </div>

                        {activeTab === 'evidence' && (
                            <div className="space-y-6 relative z-10 animate-fade-in">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white">Submitted Evidence</h3>
                                    <button className="bg-[#131B2B] border border-[#2A3A4A] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 hover:bg-[#1A2A3A]">
                                        <Plus size={14} /> Add File
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl group hover:border-indigo-500/50 transition-all cursor-pointer">
                                        <div className="bg-[#0A1420] w-12 h-12 rounded-lg flex items-center justify-center text-rose-400 mb-3 group-hover:bg-indigo-500/10 transition-colors">
                                            <Paperclip size={24} />
                                        </div>
                                        <div className="text-sm font-bold text-white mb-1 truncate">slack_logs_oct23.png</div>
                                        <div className="text-xs text-[#556677] flex justify-between">
                                            <span>Uploaded by Complainant</span>
                                            <span>1.2 MB</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl group hover:border-indigo-500/50 transition-all cursor-pointer">
                                        <div className="bg-[#0A1420] w-12 h-12 rounded-lg flex items-center justify-center text-indigo-400 mb-3 group-hover:bg-indigo-500/10 transition-colors">
                                            <FileText size={24} />
                                        </div>
                                        <div className="text-sm font-bold text-white mb-1 truncate">meeting_notes_q3.pdf</div>
                                        <div className="text-xs text-[#556677] flex justify-between">
                                            <span>Uploaded by Complainant</span>
                                            <span>450 KB</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#1A2A3A]">
                                    <h3 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-4">Investigator Notes</h3>
                                    <textarea
                                        className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl p-4 text-sm resize-none outline-none focus:border-indigo-500 h-[150px] leading-relaxed"
                                        placeholder="Add private observations regarding the evidence. This is visible only to the committee."
                                    />
                                    <div className="flex justify-end mt-3">
                                        <button className="bg-[#2A3A4A] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#3A4A5A]">Save Notes</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'statements' && (
                            <div className="flex flex-col h-full items-center justify-center text-[#556677] animate-fade-in">
                                <FileText size={48} className="mb-4 opacity-50" />
                                <p className="font-bold text-white mb-1">No Statements Recorded Yet</p>
                                <p className="text-sm mb-4">Schedule a hearing to record official statements from the parties.</p>
                                <Link href={`/grievances/${defaultId}/hearing`} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                                    Schedule Hearing
                                </Link>
                            </div>
                        )}

                        {activeTab === 'timeline' && (
                            <div className="flex flex-col h-full items-center justify-center text-[#556677] animate-fade-in">
                                <Clock size={48} className="mb-4 opacity-50" />
                                <p className="font-bold text-white mb-1">Fact Timeline</p>
                                <p className="text-sm mb-4">Map out the sequence of events as established by evidence.</p>
                                <button className="border border-[#2A3A4A] hover:bg-[#131B2B] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                                    Add Timeline Event
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
