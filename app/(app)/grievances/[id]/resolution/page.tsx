"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { FileCheck, ShieldAlert, FileText, UploadCloud, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function GrievanceResolutionScreen({ params: _params }: { params: { id: string } }) {
    const defaultId = "GRV-2026-142";
    const [action, setAction] = useState('warning');

    return (
        <Page
            title="Draft Resolution Order"
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Id" }, { label: "Resolution" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
                <Link href={`/grievances/${defaultId}/investigation`} className="text-[#556677] hover:text-white text-sm font-bold transition-colors">← Back to Investigation</Link>
                <div className="flex items-center gap-3 mt-4">
                    <h1 className="text-2xl font-bold text-white">Draft Resolution Order</h1>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        Final Stage
                    </span>
                </div>
                <p className="text-[#8899AA] text-sm mt-1">Submit the committee's findings and recommended action to close {defaultId}.</p>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 shadow-2xl space-y-8">

                {/* Findings Summary */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider flex items-center gap-2">
                        <FileText size={16} /> 1. Investigative Findings
                    </label>
                    <textarea
                        rows={6}
                        placeholder="Detail the committee's conclusions based on the evidence, witness statements, and hearings..."
                        className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl p-4 resize-none outline-none focus:border-indigo-500 text-sm leading-relaxed"
                    />
                </div>

                {/* Disciplinary Action */}
                <div className="space-y-4">
                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider flex items-center gap-2">
                        <ShieldAlert size={16} /> 2. Recommended Disciplinary Action
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { id: 'warning', label: 'Written Warning', desc: 'Formal reprimand on file' },
                            { id: 'pip', label: 'Mandatory PIP / Training', desc: 'Behavioral correction' },
                            { id: 'demotion', label: 'Demotion / Transfer', desc: 'Role reassignment' },
                            { id: 'termination', label: 'Termination', desc: 'Immediate dismissal' },
                        ].map(opt => (
                            <div
                                key={opt.id}
                                onClick={() => setAction(opt.id)}
                                className={`border rounded-xl p-3 cursor-pointer transition-all ${action === opt.id
                                        ? 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.1)]'
                                        : 'bg-[#131B2B] border-[#2A3A4A] text-[#8899AA] hover:border-[#3A4A5A]'
                                    }`}
                            >
                                <div className={`text-sm font-bold mb-1 ${action === opt.id ? 'text-white' : ''}`}>{opt.label}</div>
                                <div className="text-[10px] opacity-80">{opt.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compensation / Relief */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider flex items-center gap-2">
                        3. Relief / Compensation to Complainant (If Applicable)
                    </label>
                    <textarea
                        rows={3}
                        placeholder="e.g. Paid leave, transfer to another branch, reimbursement of medical expenses..."
                        className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl p-4 resize-none outline-none focus:border-indigo-500 text-sm leading-relaxed"
                    />
                </div>

                {/* Upload Final Report */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider flex items-center gap-2">
                        4. Upload Signed Committee Report
                    </label>
                    <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-6 hover:border-[#3A4A5A] hover:bg-[#131B2B] transition-colors cursor-pointer text-center group flex flex-col items-center justify-center">
                        <UploadCloud size={28} className="text-[#556677] group-hover:text-indigo-400 mb-2 transition-colors" />
                        <h4 className="text-white font-bold mb-1 text-sm">Upload Signed PDF</h4>
                        <p className="text-xs text-[#556677]">Must contain physical/digital signatures of all IC members present.</p>
                    </div>
                </div>

                {/* Warning */}
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-rose-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <h4 className="text-rose-400 font-bold mb-1">Non-reversible Action</h4>
                        <p className="text-[#8899AA]">Publishing this resolution will officially close the case. An email containing the final order will be sent securely to the Employer, Complainant, and Respondent. The Respondent has 90 days to file an appeal.</p>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4 border-t border-[#1A2A3A]">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20">
                        <FileCheck size={18} /> Publish Final Resolution
                    </button>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
