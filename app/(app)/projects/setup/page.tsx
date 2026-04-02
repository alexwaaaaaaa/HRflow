"use client";
import React, { useState } from 'react';
import { Settings, Users, Building, Terminal, ChevronRight, Calculator, CheckSquare } from 'lucide-react';

export default function ProjectSetupScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Settings size={24} className="text-indigo-400" /> Project Configuration</h1>
                <p className="text-[#8899AA] text-sm mt-1">Initialize a new project, assign resources, and define billing structures.</p>
            </div>

            <div className="flex gap-2 mb-8">
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-[#1A2A3A]'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-[#1A2A3A]'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-[#1A2A3A]'}`}></div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white mb-6">Core Details</h2>
                        <div className="space-y-5 max-w-2xl">
                            <div>
                                <label className="block text-[#8899AA] text-sm font-bold mb-2">Project Name</label>
                                <input type="text" placeholder="e.g. Cloud Migration Phase 2" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[#8899AA] text-sm font-bold mb-2">Client / Account</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors">
                                        <option>Select client...</option>
                                        <option>Acme Corp</option>
                                        <option>Stark Industries</option>
                                        <option>Internal (Non-billable)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] text-sm font-bold mb-2">Project Manager</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors">
                                        <option>Select manager...</option>
                                        <option>Sarah Jenkins</option>
                                        <option>David Palmer</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[#8899AA] text-sm font-bold mb-2">Start Date</label>
                                    <input type="date" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-indigo-500 outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] text-sm font-bold mb-2">Target End Date</label>
                                    <input type="date" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-indigo-500 outline-none transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end">
                            <button onClick={() => setStep(2)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow flex items-center gap-2">
                                Next: Billing & Budget <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white mb-6">Billing & Budgeting</h2>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-[#131B2B] border border-indigo-500/50 rounded-xl p-4 cursor-pointer relative overflow-hidden text-center">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500"></div>
                                <div className="text-white font-bold text-sm mb-1">Time & Materials</div>
                                <div className="text-[#8899AA] text-xs">Billed by the hour based on role rates.</div>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 cursor-pointer text-center opacity-70 hover:opacity-100 transition-opacity">
                                <div className="text-white font-bold text-sm mb-1">Fixed Fee / Milestone</div>
                                <div className="text-[#8899AA] text-xs">Lump sum invoiced at specific dates.</div>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 cursor-pointer text-center opacity-70 hover:opacity-100 transition-opacity">
                                <div className="text-white font-bold text-sm mb-1">Non-Billable</div>
                                <div className="text-[#8899AA] text-xs">Internal R&D or overhead tracking.</div>
                            </div>
                        </div>

                        <div className="space-y-5 max-w-2xl">
                            <div className="bg-[#060D1A] border border-[#1A2A3A] p-5 rounded-xl">
                                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2"><Calculator size={16} className="text-[#556677]" /> Rate Card Setup</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="text-white text-sm w-1/3">Senior Architect</div>
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]">$</span>
                                            <input type="number" defaultValue={250} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-8 pr-3 py-2 text-white font-mono text-sm focus:border-indigo-500 outline-none" />
                                        </div>
                                        <div className="text-[#556677] text-xs">/ hr</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-white text-sm w-1/3">Software Engineer</div>
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]">$</span>
                                            <input type="number" defaultValue={150} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-8 pr-3 py-2 text-white font-mono text-sm focus:border-indigo-500 outline-none" />
                                        </div>
                                        <div className="text-[#556677] text-xs">/ hr</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#8899AA] text-sm font-bold mb-2">Total Estimated Budget (Optional tracking)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]">$</span>
                                    <input type="number" placeholder="50000" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 pl-8 text-white font-mono text-sm focus:border-indigo-500 outline-none transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-between items-center">
                            <button onClick={() => setStep(1)} className="text-[#8899AA] font-bold hover:text-white px-4 py-2 transition-colors">Go Back</button>
                            <button onClick={() => setStep(3)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow flex items-center gap-2">
                                Next: Resource Allocation <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 text-center py-8">
                        <div className="w-20 h-20 bg-indigo-500/10 border-2 border-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckSquare size={40} className="text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Project Workspace Ready</h2>
                        <p className="text-[#8899AA] mb-8 max-w-md mx-auto text-sm leading-relaxed">
                            The foundation is set. You can now invite team members to this project workspace, set up Jira integrations, and they can immediately begin logging time against the allocated rate cards.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
                                Save & Go to Project Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
