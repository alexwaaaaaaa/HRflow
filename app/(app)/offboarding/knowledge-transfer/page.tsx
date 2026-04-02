"use client";
import React from 'react';
import { Share2, FileCode2, Users, CheckCircle2, ChevronRight, Video } from 'lucide-react';

export default function KnowledgeTransferScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">Continuity</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Share2 size={24} className="text-indigo-400" /> Knowledge Transfer Hub</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track handover documentation, recorded walkthroughs, and transition meetings before employee departure.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left col: Employee Transition List */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 flex flex-col h-[calc(100vh-140px)]">
                    <h3 className="text-white font-bold px-2 mb-4">Active Handovers</h3>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {/* Active Item */}
                        <div className="bg-[#131B2B] border border-indigo-500/30 rounded-xl p-3 cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-white text-sm">Sarah Jenkins</div>
                                <span className="text-indigo-400 text-[10px] uppercase font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">60% Done</span>
                            </div>
                            <div className="text-[#556677] text-xs mb-3">Eng. Manager &rarr; Handing over to David P.</div>
                            <div className="w-full h-1.5 rounded-full bg-[#0A1420] overflow-hidden">
                                <div className="bg-indigo-500 h-full w-[60%]"></div>
                            </div>
                        </div>

                        {/* Pending Item */}
                        <div className="hover:bg-[#131B2B] border border-transparent hover:border-[#2A3A4A] rounded-xl p-3 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <div className="font-bold text-white text-sm">Michael Chang</div>
                                <span className="text-[#556677] text-[10px] uppercase font-bold">10% Done</span>
                            </div>
                            <div className="text-[#556677] text-xs">Acct Exec &rarr; Handing over to Sarah T.</div>
                        </div>
                    </div>
                </div>

                {/* Main View */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#131B2B] flex items-center justify-center text-white font-bold shadow-inner">SJ</div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Sarah Jenkins Transition Plan</h2>
                                <p className="text-[#8899AA] text-xs font-mono">LWD: Oct 24 • Assignee: David Palmer</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-2 text-sm">Required Deliverables</h3>

                            {/* Task 1 */}
                            <div className="flex items-start gap-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl transition-colors">
                                <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                                <div className="flex-1">
                                    <h4 className="text-white text-sm font-bold mb-1">System Architecture Documentation</h4>
                                    <p className="text-[#8899AA] text-xs mb-2">Update Confluence pages identifying legacy dependencies for the API gateway.</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-[#131B2B] px-2 py-1 rounded text-[#8899AA] border border-[#2A3A4A] flex items-center gap-1"><FileCode2 size={12} /> Link attached</span>
                                        <span className="text-[#556677] text-xs">Approved by David P. on Oct 18</span>
                                    </div>
                                </div>
                            </div>

                            {/* Task 2 */}
                            <div className="flex items-start gap-4 p-3 bg-[#131B2B] border border-indigo-500/30 rounded-xl transition-colors shadow-sm relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                                <div className="w-5 h-5 rounded-full border-2 border-[#556677] shrink-0 mt-0.5 ml-2"></div>
                                <div className="flex-1">
                                    <h4 className="text-white text-sm font-bold mb-1">Direct Report 1:1 Handovers</h4>
                                    <p className="text-[#8899AA] text-xs mb-3">Conduct transition meetings with all 6 direct reports. Document flight risks if any.</p>
                                    <div className="flex gap-2">
                                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">Mark Complete</button>
                                        <button className="bg-[#0A1420] text-[#AABBCC] border border-[#2A3A4A] hover:bg-[#1A2A3A] px-3 py-1.5 rounded text-xs font-bold transition-colors">Add Note</button>
                                    </div>
                                </div>
                            </div>

                            {/* Task 3 */}
                            <div className="flex items-start gap-4 p-3 hover:bg-[#131B2B] border border-transparent hover:border-[#2A3A4A] rounded-xl transition-colors opacity-70">
                                <div className="w-5 h-5 rounded-full border-2 border-[#556677] shrink-0 mt-0.5"></div>
                                <div className="flex-1">
                                    <h4 className="text-white text-sm font-bold mb-1">Project Walkthrough Recordings</h4>
                                    <p className="text-[#8899AA] text-xs mb-2">Record loom overviews for the 3 active CI/CD migration repositories.</p>
                                    <button className="text-xs text-indigo-400 font-bold flex items-center gap-1"><Video size={12} /> Attach Recording</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-[#1A2A3A] flex justify-between items-center bg-[#060D1A] -mx-6 -mb-6 p-6">
                            <div className="text-[#8899AA] text-xs">Completion required for final clearance sign-off.</div>
                            <button className="text-[#556677] font-bold text-sm bg-transparent border border-[#556677] px-4 py-2 rounded-xl" disabled>Sign Off Transition</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
