"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Users } from 'lucide-react';

export default function GenderPayGapScreen() {
    return (
        <Page
            title="Gender Pay Gap Reporting"
            subtitle="Detailed demographic analysis and regulatory metric calculation for gender-based compensation discrepancies."
            breadcrumbs={[{ label: "Pay Equity", href: "/pay-equity" }, { label: "Gender" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Users size={24} className="text-rose-400" /> Gender Pay Gap Reporting</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Detailed demographic analysis and regulatory metric calculation for gender-based compensation discrepancies.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[250px] shadow-lg">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2 text-center absolute top-6">Unadjusted Gender Pay Gap (UK Model)</div>
                    <div className="flex items-center justify-center gap-8 w-full mt-4">
                        <div className="text-center group">
                            <div className="text-4xl font-black text-rose-400 mb-2 transition-transform group-hover:scale-105">£18.42</div>
                            <div className="text-rose-200/50 text-xs font-bold">Womens Median Hourly</div>
                        </div>
                        <div className="text-[#556677] text-xl font-light">vs</div>
                        <div className="text-center group">
                            <div className="text-4xl font-black text-blue-400 mb-2 transition-transform group-hover:scale-105">£21.05</div>
                            <div className="text-blue-200/50 text-xs font-bold">Mens Median Hourly</div>
                        </div>
                    </div>
                    <div className="mt-8 bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-6 py-3 text-center">
                        <span className="text-white font-bold text-lg">12.4% Gap</span>
                        <span className="text-[#8899AA] text-xs ml-2">Women earn 87p for every £1 men earn.</span>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Bonus Pay Gap</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-bold text-[#8899AA] mb-2">
                                <span>Proportion receiving bonus</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="w-full h-8 bg-[#131B2B] rounded-lg overflow-hidden flex items-center relative group">
                                    <div className="h-full bg-rose-500/80" style={{ width: '64%' }}></div>
                                    <span className="absolute left-2 text-white font-bold text-xs shadow-black drop-shadow-md">Women (64%)</span>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center mt-3">
                                <div className="w-full h-8 bg-[#131B2B] rounded-lg overflow-hidden flex items-center relative group">
                                    <div className="h-full bg-blue-500/80" style={{ width: '78%' }}></div>
                                    <span className="absolute left-2 text-white font-bold text-xs shadow-black drop-shadow-md">Men (78%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A] flex justify-between items-center bg-[#060D1A] p-4 rounded-xl border border-[#1A2A3A]">
                            <span className="text-[#8899AA] font-bold text-sm">Median Bonus Pay Gap</span>
                            <span className="text-amber-400 font-black text-xl">28.5%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Pay Quartiles Distribution</h3>
                <p className="text-[#8899AA] text-xs mb-6 max-w-2xl">Proportion of male and female employees across four equal pay bands. A higher concentration of men in upper quartiles primarily drives the unadjusted gap.</p>

                <div className="space-y-4">
                    {[
                        { q: 'Upper Quartile', w: 32, m: 68 },
                        { q: 'Upper Middle Quartile', w: 41, m: 59 },
                        { q: 'Lower Middle Quartile', w: 55, m: 45 },
                        { q: 'Lower Quartile', w: 62, m: 38 },
                    ].map((d, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-48 text-right text-sm text-white font-bold shrink-0">{d.q}</div>
                            <div className="flex-1 h-12 flex rounded-xl overflow-hidden shadow-inner font-bold text-white text-sm">
                                <div className="bg-rose-500/80 flex items-center justify-center transition-all hover:bg-rose-500" style={{ width: `${d.w}%` }}><span className="opacity-0 hover:opacity-100 transition-opacity">{d.w}% Female</span></div>
                                <div className="bg-blue-500/80 flex items-center justify-center transition-all hover:bg-blue-500" style={{ width: `${d.m}%` }}><span className="opacity-0 hover:opacity-100 transition-opacity">{d.m}% Male</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    
        </Page>
    );
}
