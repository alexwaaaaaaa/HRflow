"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Calculator, RefreshCw, Layers } from 'lucide-react';

export default function RemediationPlanScreen() {
    const [budget, setBudget] = useState(420000);

    return (
        <Page
            title="Gap Remediation Modeler"
            subtitle="Allocate budget and simulate compensation adjustments to resolve identified equity issues."
            breadcrumbs={[{ label: "Pay Equity", href: "/pay-equity" }, { label: "Remediation" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Calculator size={24} className="text-indigo-400" /> Gap Remediation Modeler</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Allocate budget and simulate compensation adjustments to resolve identified equity issues.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        Submit Plan for Approval
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Approved Remediation Budget</div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl font-black text-white">$</span>
                        <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="bg-transparent text-3xl font-black text-white focus:outline-none w-full" />
                    </div>
                    <div className="w-full h-1.5 bg-[#131B2B] rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-indigo-500" style={{ width: '84%' }}></div>
                    </div>
                    <div className="text-[#556677] text-xs mt-2">$352,400 (84%) allocated</div>
                </div>

                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Simulation Impact (Pre vs Post Adjustment)</h3>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-[#8899AA]">Global Unexplained Gender Gap</span>
                                <span className="text-rose-400">4.3% &rarr; 0.8%</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden flex">
                                <div className="h-full bg-rose-500/30 w-full relative">
                                    <div className="absolute left-0 top-0 bottom-0 bg-rose-500" style={{ width: '20%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-[#8899AA]">Red-Circle Employees (CR &lt; 0.80)</span>
                                <span className="text-amber-400">45 &rarr; 12</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden flex">
                                <div className="h-full bg-amber-500/30 w-full relative">
                                    <div className="absolute left-0 top-0 bottom-0 bg-amber-500" style={{ width: '26%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 text-xs">
                        <button className="flex items-center gap-1 text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors">
                            <RefreshCw size={12} /> Auto-Optimize Distribution
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-6 flex flex-col shadow-lg">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                    <h3 className="text-white font-bold px-2 flex items-center gap-2"><Layers size={18} className="text-[#556677]" /> Proposed Individual Adjustments</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Employee</th>
                                <th className="p-4 py-3">Risk Driver</th>
                                <th className="p-4 py-3">Current Base</th>
                                <th className="p-4 py-3">Proposed Base</th>
                                <th className="p-4 py-3 text-right">Adj Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">Maya Lin</div>
                                    <div className="text-[#8899AA] text-xs">Sr. Software Engineer (L4)</div>
                                </td>
                                <td className="p-4">
                                    <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Gender Model Outlier</span>
                                </td>
                                <td className="p-4 text-[#AABBCC] font-mono">$132,000</td>
                                <td className="p-4 text-emerald-400 font-bold font-mono">$145,000</td>
                                <td className="p-4 text-right font-bold text-indigo-400">+$13,000</td>
                            </tr>
                            <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">David Chang</div>
                                    <div className="text-[#8899AA] text-xs">Product Manager (L3)</div>
                                </td>
                                <td className="p-4">
                                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">CR Below Minimum (0.78)</span>
                                </td>
                                <td className="p-4 text-[#AABBCC] font-mono">$98,000</td>
                                <td className="p-4 text-emerald-400 font-bold font-mono">$110,000</td>
                                <td className="p-4 text-right font-bold text-indigo-400">+$12,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-[#060D1A] flex justify-center border-t border-[#1A2A3A]">
                    <button className="text-[#8899AA] hover:text-white text-xs font-bold transition-colors">View All 108 Beneficiaries &rarr;</button>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
