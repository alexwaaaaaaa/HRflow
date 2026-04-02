"use client";
import React, { useState } from "react";
import {
    FileText, CheckCircle2, Circle, Eye, ExternalLink, ShieldAlert,
    Download, ChevronRight, Lock
} from "lucide-react";

const POLICIES = [
    { id: 1, title: "Code of Conduct & Ethics", size: "2.4 MB", readTime: "10 mins", required: true, status: "pending" },
    { id: 2, title: "IT Asset & Security Policy", size: "1.1 MB", readTime: "5 mins", required: true, status: "pending" },
    { id: 3, title: "Prevention of Sexual Harassment (POSH)", size: "3.5 MB", readTime: "15 mins", required: true, status: "pending" },
    { id: 4, title: "Leave & Attendance Policy", size: "800 KB", readTime: "3 mins", required: false, status: "pending" },
];

export default function PolicyAcknowledgment() {
    const [agreedPolicies, setAgreedPolicies] = useState<number[]>([]);
    const [viewingPolicy, setViewingPolicy] = useState<number | null>(null);

    const toggleAgree = (id: number) => {
        if (agreedPolicies.includes(id)) {
            setAgreedPolicies(agreedPolicies.filter(pid => pid !== id));
        } else {
            setAgreedPolicies([...agreedPolicies, id]);
        }
    };

    const allMandatoryAgreed = POLICIES.filter(p => p.required).every(p => agreedPolicies.includes(p.id));

    return (
        <div className="min-h-screen bg-[#0A1420] text-white flex">

            {/* Policy List Sidebar */}
            <div className={`w-full md:w-[450px] shrink-0 border-r border-[#1A2A3A] bg-[#0F1C2E] flex flex-col ${viewingPolicy ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-6 border-b border-[#1A2A3A]">
                    <div className="flex items-center gap-3 mb-2 text-[#33E6FF]">
                        <ShieldAlert size={24} />
                        <h1 className="text-xl font-bold">Policy Compliance</h1>
                    </div>
                    <p className="text-sm text-[#8899AA]">Please review and acknowledge all mandatory company policies (3/4 Remaining).</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {POLICIES.map(policy => {
                        const agreed = agreedPolicies.includes(policy.id);

                        return (
                            <div
                                key={policy.id}
                                onClick={() => setViewingPolicy(policy.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${viewingPolicy === policy.id ? 'bg-[#1A2A3A] border-[#33E6FF]' :
                                        agreed ? 'bg-[#0A1420]/50 border-[#1A2A3A] opacity-60 hover:opacity-100' :
                                            'bg-[#0A1420] border-[#1A2A3A] hover:border-[#2A3A4A]'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            {policy.required && <span className="text-[10px] font-bold tracking-wider text-[#FF4444] bg-[#FF4444]/10 px-2 py-0.5 rounded uppercase">Mandatory</span>}
                                            <span className="text-[10px] text-[#445566] font-mono">{policy.readTime} read</span>
                                        </div>
                                        <h3 className={`text-[15px] font-semibold ${agreed ? 'text-[#8899AA] line-through decoration-[#445566]' : 'text-white'}`}>
                                            {policy.title}
                                        </h3>
                                    </div>
                                    <div className="mt-1">
                                        {agreed ? (
                                            <CheckCircle2 size={24} className="text-[#00E5A0]" />
                                        ) : (
                                            <Circle size={24} className="text-[#445566]" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-6 border-t border-[#1A2A3A] bg-[#0F1C2E]">
                    <button
                        disabled={!allMandatoryAgreed}
                        className="w-full py-3.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[#00E5A0]/10 flex items-center justify-center gap-2"
                    >
                        Complete Compliance <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Policy Viewer Main Area */}
            <div className={`flex-1 flex flex-col bg-[#0A1420] ${!viewingPolicy ? 'hidden md:flex' : 'flex'}`}>
                {viewingPolicy ? (
                    <>
                        {/* Viewer Header */}
                        <div className="h-16 shrink-0 border-b border-[#1A2A3A] bg-[#0F1C2E] flex items-center justify-between px-6">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-[#8899AA]" />
                                <span className="font-semibold text-white">
                                    {POLICIES.find(p => p.id === viewingPolicy)?.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-[#8899AA] hover:text-white transition-colors" title="Download PDF">
                                    <Download size={18} />
                                </button>
                                <button className="p-2 text-[#8899AA] hover:text-white transition-colors md:hidden" onClick={() => setViewingPolicy(null)}>
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* Simulated PDF Viewer */}
                        <div className="flex-1 overflow-y-auto p-8 bg-[#0A1420] flex justify-center">
                            <div className="w-full max-w-3xl min-h-[800px] bg-white rounded-lg shadow-2xl pointer-events-none select-none p-12 relative flex flex-col pt-32 overflow-hidden border border-gray-200">
                                <div className="absolute top-0 left-0 w-full h-16 bg-blue-900 flex items-center px-12 z-10 text-white font-bold tracking-widest uppercase">
                                    Confidential
                                </div>
                                {/* Header watermark */}
                                <div className="absolute right-12 top-24 opacity-10">
                                    <ShieldAlert size={120} className="text-black" />
                                </div>

                                <h1 className="text-3xl font-black text-gray-900 mb-6 border-b-4 border-blue-900 pb-4 inline-block tracking-tight">TechCorp Code of Conduct</h1>

                                <div className="mt-8 space-y-6 text-gray-700 text-sm leading-relaxed text-justify">
                                    <p className="font-semibold text-lg text-gray-900">1. Introduction</p>
                                    <p>TechCorp Solutions is committed to conducting its business with the highest standards of integrity, ethics, and corporate governance. This Code of Conduct applies to all employees, contractors, and third-party associates.</p>

                                    <p className="font-semibold text-lg text-gray-900 mt-8">2. Equal Opportunity & Anti-Discrimination</p>
                                    <p>We are an equal opportunity employer. We do not tolerate any form of discrimination or harassment based on race, color, religion, gender, age, national origin, disability, or sexual orientation.</p>

                                    <div className="p-4 bg-gray-50 border-l-4 border-blue-900 mt-6">
                                        <p className="italic font-medium text-gray-800 text-center">"Integrity is doing the right thing, even when no one is watching."</p>
                                    </div>

                                    <p className="font-semibold text-lg text-gray-900 mt-8">3. Confidentiality & Data Security</p>
                                    <p>Employees must protect the company's confidential information and intellectual property. Unauthorized sharing of internal data, client details, or proprietary algorithms is strictly prohibited and subject to legal action.</p>

                                    <div className="h-64 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 font-mono text-xl mt-12 bg-gray-50">
                                        [ Rest of Document Content... ]
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Acknowledgment Footer */}
                        <div className="shrink-0 bg-[#0F1C2E] border-t border-[#1A2A3A] p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-20">
                            <label className={`flex items-start gap-4 p-4 rounded-xl border border-[#2A3A4A] cursor-pointer transition-colors ${agreedPolicies.includes(viewingPolicy) ? 'bg-[#00E5A0]/5 border-[#00E5A0]/30' : 'bg-[#1A2A3A] hover:border-[#445566]'}`}>
                                <div className="relative mt-1">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={agreedPolicies.includes(viewingPolicy)}
                                        onChange={() => toggleAgree(viewingPolicy)}
                                    />
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${agreedPolicies.includes(viewingPolicy) ? 'bg-[#00E5A0] border-[#00E5A0]' : 'border-[#445566] bg-[#0A1420]'}`}>
                                        {agreedPolicies.includes(viewingPolicy) && <CheckCircle2 size={16} className="text-[#0A1420]" />}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-semibold ${agreedPolicies.includes(viewingPolicy) ? 'text-[#00E5A0]' : 'text-white'}`}>
                                        I have read and agree to the {POLICIES.find(p => p.id === viewingPolicy)?.title}
                                    </h4>
                                    <p className="text-sm text-[#8899AA] mt-1">By checking this box, I electronically sign and acknowledge my compliance with this document.</p>
                                </div>
                            </label>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-[#445566] p-8 text-center">
                        <ShieldAlert size={64} className="mb-6 opacity-20" />
                        <h2 className="text-xl font-medium text-white mb-2">Select a policy to review</h2>
                        <p className="text-sm max-w-sm">You must read and acknowledge all mandatory policies listed in the sidebar before completing your pre-boarding.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
