"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { AlertTriangle, ArrowRight, UserPlus, FileText, X } from 'lucide-react';
import Link from 'next/link';

export default function GrievanceAssignmentScreen({ params: _params }: { params: { id: string } }) {
    const defaultId = "GRV-2026-142";

    return (
        <Page
            title="Assign Investigator"
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Id" }, { label: "Assign" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="mb-6">
                <Link href="/grievances/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">← Back to Queue</Link>
                <div className="flex items-center gap-3 mt-4">
                    <h1 className="text-2xl font-bold text-white">Assign Investigator</h1>
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Severity: High</span>
                </div>
                <p className="text-[#8899AA] text-sm mt-1">Review the newly filed {defaultId} and assemble an investigation panel.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Case Synopsis (Left) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500" />
                        <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4 flex items-center gap-2"><FileText size={16} /> Case Synopsis</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-[#556677] font-bold mb-1">Category</div>
                                <div className="text-sm text-white font-medium">Workplace Harassment (POSH)</div>
                            </div>
                            <div>
                                <div className="text-xs text-[#556677] font-bold mb-1">Reporter</div>
                                <div className="text-sm text-white font-medium flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-400 border border-indigo-500/30">AN</div>
                                    Anonymized Staff Member
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-[#556677] font-bold mb-1">Against</div>
                                <div className="text-sm text-white font-medium">Rajesh Kumar (Project Manager)</div>
                            </div>
                            <div>
                                <div className="text-xs text-[#556677] font-bold mb-1">Location / Dept</div>
                                <div className="text-sm text-white font-medium">Bangalore / Engineering</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex items-start gap-4">
                        <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-amber-400 font-bold text-sm mb-1">Statutory Warning</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed">As this is categorized under POSH, the Investigating Committee must be headed by a woman, and not less than half of its members should be women, as per the 2013 POSH Act.</p>
                        </div>
                    </div>
                </div>

                {/* Assignment Area (Right) */}
                <div className="lg:col-span-2">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-2xl h-full flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center justify-between">
                            <span>Assemble Committee</span>
                            <span className="text-xs text-[#8899AA] bg-[#131B2B] px-3 py-1 rounded border border-[#2A3A4A]">Draft Mode</span>
                        </h3>

                        <div className="space-y-6 flex-1">
                            {/* Lead Investigator */}
                            <div>
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">1. Lead Investigator (Presiding Officer)</label>
                                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">MV</div>
                                        <div>
                                            <div className="text-white text-sm font-bold">Meera Venkatesh</div>
                                            <div className="text-xs text-[#556677]">Head of HR</div>
                                        </div>
                                    </div>
                                    <button className="text-[#556677] hover:text-white p-2 transition-colors"><X size={16} /></button>
                                </div>
                            </div>

                            {/* Internal Members */}
                            <div>
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">2. Internal Committee Members</label>
                                <div className="space-y-2 mb-3">
                                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-xs border border-sky-500/30">SD</div>
                                            <div>
                                                <div className="text-white text-sm font-bold">Sanjay Dutt</div>
                                                <div className="text-xs text-[#556677]">Legal Counsel</div>
                                            </div>
                                        </div>
                                        <button className="text-[#556677] hover:text-white p-2 transition-colors"><X size={16} /></button>
                                    </div>
                                </div>
                                <button className="w-full border-2 border-dashed border-[#2A3A4A] hover:border-indigo-500/50 p-3 rounded-xl text-indigo-400 font-bold text-sm transition-colors flex items-center justify-center gap-2 group">
                                    <UserPlus size={16} className="text-[#556677] group-hover:text-indigo-400 transition-colors" /> Add Internal Member
                                </button>
                            </div>

                            {/* External Member */}
                            <div>
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">3. External NGO/Legal Member (Mandatory for POSH)</label>
                                <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-indigo-500 appearance-none text-sm">
                                    <option value="">Select affiliated external member...</option>
                                    <option value="priya">Adv. Priya Sharma (Women's Rights NGO)</option>
                                    <option value="kiran">Kiran Desai (External Legal Consulant)</option>
                                </select>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 mt-6 border-t border-[#1A2A3A] flex justify-end gap-3">
                            <button className="bg-[#131B2B] border border-[#2A3A4A] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#1A2A3A] transition-colors">
                                Save Draft
                            </button>
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20">
                                Confirm Assignment & Notify <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
