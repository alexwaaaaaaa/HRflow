"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

export default function ReadinessReportScreen() {
    return (
        <Page
            title="Organizational Readiness Tracker"
            subtitle="Aggregated view of bench strength across departments and critical roles."
            breadcrumbs={[{ label: "Succession", href: "/succession" }, { label: "Readiness" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ShieldCheck size={24} className="text-emerald-400" /> Organizational Readiness Tracker</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Aggregated view of bench strength across departments and critical roles.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Master Readiness
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Bench Coverage by Function</h3>
                    <div className="space-y-6 relative">
                        {/* Markers */}
                        <div className="absolute top-0 bottom-0 left-48 right-0 pointer-events-none hidden md:block">
                            <div className="h-full border-r border-[#1A2A3A] border-dashed absolute" style={{ left: '33%' }}></div>
                            <div className="h-full border-r border-[#1A2A3A] border-dashed absolute" style={{ left: '66%' }}></div>
                        </div>

                        {[
                            { label: 'Engineering', total: 18, ready: 5, oneYr: 8, threeYr: 3, risk: 2 },
                            { label: 'Sales & Marketing', total: 12, ready: 4, oneYr: 3, threeYr: 4, risk: 1 },
                            { label: 'Product Design', total: 6, ready: 0, oneYr: 2, threeYr: 2, risk: 2 },
                            { label: 'Finance & Legal', total: 5, ready: 2, oneYr: 1, threeYr: 2, risk: 0 },
                            { label: 'Operations & HR', total: 8, ready: 3, oneYr: 2, threeYr: 3, risk: 0 },
                        ].map((d, i) => (
                            <div key={i} className="flex items-center gap-4 relative z-10">
                                <div className="w-48 shrink-0 flex justify-between items-center">
                                    <span className="text-white text-sm font-bold">{d.label}</span>
                                    <span className="text-[#556677] text-xs font-mono">{d.total} Roles</span>
                                </div>
                                <div className="flex-1 h-6 flex overflow-hidden rounded-full cursor-help hover:ring-2 hover:ring-white/20 transition-all">
                                    {/* Visualizing stack: Ready Now, 1-2 Yrs, 3-5 Yrs, No Pipeline */}
                                    <div className="bg-emerald-500" style={{ width: `${(d.ready / d.total) * 100}%` }} title={`Ready Now: ${d.ready}`}></div>
                                    <div className="bg-emerald-500/50" style={{ width: `${(d.oneYr / d.total) * 100}%` }} title={`1-2 Years: ${d.oneYr}`}></div>
                                    <div className="bg-amber-500" style={{ width: `${(d.threeYr / d.total) * 100}%` }} title={`3-5 Years: ${d.threeYr}`}></div>
                                    <div className="bg-rose-500" style={{ width: `${(d.risk / d.total) * 100}%` }} title={`No Pipe / At Risk: ${d.risk}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8 pt-4 border-t border-[#1A2A3A] text-xs font-bold text-[#8899AA]">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"></div> Ready Now</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500/50"></div> Ready in 1-2 Yrs</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500"></div> Ready in 3-5 Yrs</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-rose-500"></div> No Pipeline / Risk</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center justify-between">
                            Critical Pipeline Gaps
                            <span className="bg-rose-500/10 text-rose-400 text-[10px] px-2 py-0.5 rounded font-bold border border-rose-500/20">Action Required</span>
                        </h3>

                        <div className="space-y-4 text-sm">
                            <div className="p-3 bg-[#131B2B] rounded-xl border border-rose-500/30">
                                <div className="text-rose-400 font-bold mb-1">VP, Platform Infrastructure</div>
                                <div className="text-[#8899AA] text-xs leading-relaxed">Incumbent mapped as 'High Flight Risk', 0 direct internal successors identified in 1-2yr bracket. Requires external mapping.</div>
                            </div>
                            <div className="p-3 bg-[#131B2B] rounded-xl border border-amber-500/30">
                                <div className="text-amber-400 font-bold mb-1">Dir, International Compliance</div>
                                <div className="text-[#8899AA] text-xs leading-relaxed">Sole successor recently departed. Succession plan nullified. Re-evaluation required.</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
                        <div className="flex justify-center mb-3 text-emerald-400"><CheckCircle2 size={32} /></div>
                        <div className="text-3xl font-black text-emerald-400 mb-1">82%</div>
                        <div className="text-emerald-200/80 text-sm font-bold">L1/L2 Roles with ≥1 Successor Built</div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
