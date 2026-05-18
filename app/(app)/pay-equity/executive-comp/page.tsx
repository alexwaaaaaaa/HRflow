"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Crown, PieChart, Download } from 'lucide-react';

export default function ExecutiveCompScreen() {
    return (
        <Page
            title="Executive Compensation & Ratio"
            subtitle="Track CEO Pay Ratio and Executive compensation mix for proxy reporting."
            breadcrumbs={[{ label: "Pay Equity", href: "/pay-equity" }, { label: "Executive Comp" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Crown size={24} className="text-amber-400" /> Executive Compensation & Ratio</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track CEO Pay Ratio and Executive compensation mix for proxy reporting.</p>
                </div>
                <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                    <Download size={16} /> Download SEC Proxy Data
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <h3 className="text-white font-bold mb-6">CEO Pay Ratio</h3>

                    <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                        68 <span className="text-[#556677] text-3xl">: 1</span>
                    </div>

                    <div className="text-[#8899AA] text-xs font-bold bg-[#131B2B] px-3 py-1.5 rounded-lg border border-[#2A3A4A] mt-4 shadow-inner">
                        Industry Average: 85:1
                    </div>
                </div>

                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center justify-between">
                        Target Compensation Mix (C-Suite)
                        <PieChart size={18} className="text-[#556677]" />
                    </h3>

                    <div className="space-y-6">
                        {/* CEO Mix */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-sm font-bold">Chief Executive Officer</span>
                                <span className="text-[#8899AA] text-xs font-mono">TDC: $6.4M</span>
                            </div>
                            <div className="h-6 w-full flex rounded-full overflow-hidden shadow-inner font-bold text-[10px] text-white">
                                <div className="bg-[#556677] h-full flex items-center justify-center border-r border-[#0A1420]" style={{ width: '15%' }}>15% Base</div>
                                <div className="bg-sky-500 h-full flex items-center justify-center border-r border-[#0A1420]" style={{ width: '25%' }}>25% STI (Cash)</div>
                                <div className="bg-purple-500 h-full flex items-center justify-center" style={{ width: '60%' }}>60% LTI (Equity)</div>
                            </div>
                        </div>

                        {/* Other NEOs Mix */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-sm font-bold">Other Named Executive Officers (Avg)</span>
                                <span className="text-[#8899AA] text-xs font-mono">TDC: $3.2M</span>
                            </div>
                            <div className="h-6 w-full flex rounded-full overflow-hidden shadow-inner font-bold text-[10px] text-white">
                                <div className="bg-[#556677] h-full flex items-center justify-center border-r border-[#0A1420]" style={{ width: '25%' }}>25% Base</div>
                                <div className="bg-sky-500 h-full flex items-center justify-center border-r border-[#0A1420]" style={{ width: '25%' }}>25% STI</div>
                                <div className="bg-purple-500 h-full flex items-center justify-center" style={{ width: '50%' }}>50% LTI (Equity)</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#1A2A3A] flex items-center justify-end">
                        <span className="flex items-center gap-1 text-[10px] text-[#AABBCC] bg-[#131B2B] px-2 py-1 rounded">
                            Performance-based at-risk: <strong className="text-white">85% (CEO)</strong>
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-6">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A]">
                    <h3 className="text-white font-bold">Median Employee Calculation (SEC Framework)</h3>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-8 items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#131B2B] to-[#0A1420]">
                    <div>
                        <p className="text-[#8899AA] text-sm leading-relaxed mb-4">
                            The median employee was identified using annualized base salary plus target bonus for all global employees active as of Dec 31st. Exclusions applied per SEC rules (&lt;5% non-US de minimis).
                        </p>
                        <div className="bg-[#060D1A] border border-[#2A3A4A] p-4 rounded-xl">
                            <div className="text-[#556677] text-xs font-bold uppercase mb-1">Median Employee Profile</div>
                            <div className="text-white font-bold text-lg mb-1">Software Engineer L3</div>
                            <div className="text-[#8899AA] text-sm mb-3">Austin, TX</div>
                            <div className="text-emerald-400 font-mono font-bold">$142,500 Total Target Cash</div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative w-48 h-48 border-[12px] border-[#131B2B] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <div className="absolute inset-2 border-4 border-dashed border-[#2A3A4A] rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="text-center relative z-10 w-full px-4 break-words">
                                <div className="text-2xl font-black text-white">$6.4M</div>
                                <div className="h-px bg-[#2A3A4A] w-12 mx-auto my-1"></div>
                                <div className="text-lg font-bold text-white">$94.2k</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
