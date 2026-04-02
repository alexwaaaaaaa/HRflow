"use client";
import React, { useState } from "react";
import { ArrowLeft, FileText, Send, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function OfferGeneration() {
    const [ctc, setCtc] = useState("3200000");

    const getBreakdown = (base: number) => {
        return [
            { label: "Basic Salary", val: base * 0.4 },
            { label: "HRA", val: base * 0.2 },
            { label: "Special Allowance", val: base * 0.25 },
            { label: "PF (Employer)", val: base * 0.05 },
            { label: "Variable Pay (Bonus)", val: base * 0.1 },
        ];
    };

    const numCtc = Number(ctc) || 0;
    const breakdown = getBreakdown(numCtc);

    return (
        <div className="flex h-[calc(100vh-64px)] text-white">

            {/* Input Form (Left) */}
            <div className="w-[450px] border-r border-[#1A2A3A] bg-[#0A1420] flex flex-col">
                <div className="p-6 border-b border-[#1A2A3A] shrink-0">
                    <div className="flex items-center gap-3 mb-6">
                        <button className="w-8 h-8 bg-[#1A2A3A] rounded-lg flex items-center justify-center text-[#8899AA] hover:text-white transition-colors"><ArrowLeft size={14} /></button>
                        <h1 className="text-xl font-bold">Generate Offer</h1>
                    </div>

                    <div className="bg-[#1A2A3A]/50 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00E5A0] rounded-full flex items-center justify-center text-sm font-bold shadow-lg">RS</div>
                        <div>
                            <p className="font-bold text-base">Rahul Sharma</p>
                            <p className="text-xs text-[#8899AA]">Senior Frontend Engineer · Bengaluru</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1A2A3A]">
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-sm mb-4">Compensation Details (INR)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Total CTC (Annual)</label>
                                    <input type="number" value={ctc} onChange={e => setCtc(e.target.value)}
                                        className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm font-bold text-white focus:outline-none focus:border-[#00E5A0] transition-colors" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Joining Bonus</label>
                                        <input type="number" defaultValue="200000" className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Relocation Bonus</label>
                                        <input type="number" defaultValue="0" className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-sm mb-4">CTC Breakdown Preview</h3>
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl overflow-hidden">
                                {breakdown.map((b, i) => (
                                    <div key={i} className={`flex justify-between items-center px-4 py-2.5 text-xs ${i !== breakdown.length - 1 ? 'border-b border-[#1A2A3A]' : ''}`}>
                                        <span className="text-[#8899AA]">{b.label}</span>
                                        <span className="font-medium text-white">₹ {(b.val).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                <div className="bg-[#1A2A3A]/30 px-4 py-3 border-t border-[#1A2A3A] flex justify-between items-center text-sm font-bold">
                                    <span className="text-[#00E5A0]">Total CTC</span>
                                    <span className="text-[#00E5A0]">₹ {numCtc.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-sm mb-4">Dates & Expiration</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Expected Joining Date</label>
                                    <input type="date" defaultValue="2025-04-15" className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Offer Valid Until</label>
                                    <input type="date" defaultValue="2025-03-20" className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] [color-scheme:dark]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-[#1A2A3A] flex gap-2 shrink-0 bg-[#0D1928]">
                    <button className="flex-1 h-10 bg-[#1A2A3A] text-white text-xs font-bold rounded-xl hover:bg-[#2A3A4A] flex justify-center items-center gap-2 transition-colors">
                        <Save size={14} /> Save Draft
                    </button>
                    <button className="flex-1 h-10 bg-[#00E5A0] text-[#060B14] text-xs font-bold rounded-xl hover:bg-[#00c98d] flex justify-center items-center gap-2 transition-colors">
                        <Send size={14} /> Generate & Send
                    </button>
                </div>
            </div>

            {/* Letter Preview Pane (Right) */}
            <div className="flex-1 bg-[#060B14] flex flex-col p-8 items-center overflow-y-auto">
                <div className="w-full max-w-[800px] flex items-center justify-between mb-4">
                    <h3 className="text-[#8899AA] font-medium text-sm flex items-center gap-2">
                        <FileText size={16} /> Live Letter Preview
                    </h3>
                    <div className="flex gap-2 text-xs">
                        <span className="bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-1 rounded font-bold">Auto-sync ON</span>
                        <span className="bg-[#1A2A3A] text-white px-2 py-1 rounded">Template: Standard Tech Offer</span>
                    </div>
                </div>

                {/* Simulated A4 Paper */}
                <div className="w-full max-w-[800px] min-h-[1100px] bg-white text-black p-12 shadow-2xl rounded-sm">
                    {/* Letterhead */}
                    <div className="flex justify-between items-start border-b-2 border-gray-200 pb-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-[#0A1420] tracking-tighter">TECHCORP</h2>
                            <p className="text-xs text-gray-500 mt-1">TechCorp Solutions Pvt. Ltd.<br />123 Innovation Drive, Bengaluru</p>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                            <p>Date: 15 Mar 2025</p>
                            <p>Ref: TC/OFFER/2025/1045</p>
                        </div>
                    </div>

                    <div className="space-y-6 text-sm leading-relaxed text-gray-800">
                        <p>To,<br /><strong className="text-base text-black">Rahul Sharma</strong><br />Bengaluru, India</p>

                        <p className="font-bold text-lg text-black mt-8">Subject: Offer of Employment</p>

                        <p>Dear Rahul,</p>

                        <p>
                            We are delighted to offer you the full-time position of <strong>Senior Frontend Engineer</strong> at TechCorp Solutions.
                            Your expected commencement date will be <strong>15 April 2025</strong>.
                        </p>

                        <p>
                            Your total annual compensation (Cost to Company) will be <strong>INR {numCtc.toLocaleString('en-IN')}</strong> per annum.
                            A detailed breakdown of your compensation is attached in Annexure A.
                        </p>

                        <p>You will also be receiving a one-time joining bonus of <strong>INR 2,00,000</strong>, payable with your first month's salary.</p>

                        <p>
                            This offer is contingent upon the successful completion of a background verification check.
                            If you choose to accept this offer, please sign the digital copy of this letter by <strong>20 March 2025</strong>.
                        </p>

                        <div className="mt-12 pt-12 border-t border-gray-200">
                            <p>Sincerely,</p>
                            <div className="mt-4 mb-2">
                                <span className="font-cursive text-2xl text-blue-900 border-b border-gray-300 pb-1 pr-12 block w-fit">Priya Nair</span>
                            </div>
                            <p className="font-bold text-black">Priya Nair</p>
                            <p className="text-xs text-gray-500">VP, Human Resources</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
