"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { PieChart, TrendingUp, Download, Filter, Target } from 'lucide-react';

export default function AttritionAnalyticsScreen() {
    return (
        <Page
            title="Retention & Attrition Insights"
            subtitle="Analyze turnover trends, identify flight risks, and understand the core drivers of employee exits."
            breadcrumbs={[{ label: "Offboarding", href: "/offboarding" }, { label: "Analytics" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><TrendingUp size={24} className="text-rose-400" /> Retention & Attrition Insights</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Analyze turnover trends, identify flight risks, and understand the core drivers of employee exits.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Filter size={16} /> Q3 2025
                    </button>
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center group">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Annualized Attrition</div>
                    <div className="text-4xl font-black text-rose-400 mb-2">14.2%</div>
                    <div className="text-rose-400 text-xs font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 w-fit mx-auto">
                        +1.8% vs Q2
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Voluntary vs Involuntary</div>
                    <div className="text-4xl font-black text-white mb-2">82<span className="text-[#556677] text-2xl">/18</span></div>
                    <div className="flex w-full h-1.5 rounded-full overflow-hidden mt-1 max-w-[120px] mx-auto">
                        <div className="bg-sky-500 h-full" style={{ width: '82%' }}></div>
                        <div className="bg-[#556677] h-full" style={{ width: '18%' }}></div>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Regretted Loss Rate</div>
                    <div className="text-4xl font-black text-amber-500 mb-2">35%</div>
                    <div className="text-[#556677] text-xs font-bold max-w-[150px] mx-auto leading-tight">High-performers who left voluntarily</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Cost of Turnover (Est)</div>
                    <div className="text-4xl font-black text-white mb-2">$1.4M</div>
                    <div className="text-[#556677] text-xs font-bold">Lost productivity & backfilling</div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Turnover Reasons */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 h-[400px] flex flex-col relative">
                    <h3 className="text-white font-bold mb-6 flex items-center justify-between">
                        Top Exit Drivers (Exit Interview NLP)
                        <PieChart size={18} className="text-[#556677]" />
                    </h3>

                    <div className="flex-1 space-y-5 flex flex-col justify-center pb-4">
                        {[
                            { label: 'Better Compensation Base', pct: 42, color: 'bg-emerald-500' },
                            { label: 'Lack of Career Progression', pct: 28, color: 'bg-sky-500' },
                            { label: 'Relocation / Remote Work Policy', pct: 15, color: 'bg-purple-500' },
                            { label: 'Management/Leadership Issues', pct: 10, color: 'bg-rose-500' },
                            { label: 'Other/Personal', pct: 5, color: 'bg-[#556677]' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-white">{item.label}</span>
                                    <span className="text-[#8899AA]">{item.pct}%</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-[#131B2B] overflow-hidden">
                                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Flight Risk Hotspots */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 h-[400px] flex flex-col">
                    <h3 className="text-white font-bold mb-6 flex items-center justify-between">
                        Predictive Flight Risk Hotspots
                        <Target size={18} className="text-[#556677]" />
                    </h3>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <h4 className="text-rose-400 font-bold mb-1">Engineering (Data Platform)</h4>
                                <p className="text-rose-200/70 text-xs max-w-sm">Elevated risk due to recent leadership change and below-market compa-ratios (avg 0.88).</p>
                            </div>
                            <div className="text-right pl-4 border-l border-rose-500/20">
                                <div className="text-white font-bold text-xl">High</div>
                                <div className="text-rose-400 text-[10px] uppercase font-bold text-center">Severity</div>
                            </div>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <h4 className="text-amber-400 font-bold mb-1">Sales (Enterprise East)</h4>
                                <p className="text-amber-200/70 text-xs max-w-sm">Quota attainment dropped 20% QoQ. Increased probability of top-performer exits.</p>
                            </div>
                            <div className="text-right pl-4 border-l border-amber-500/20">
                                <div className="text-white font-bold text-xl">Med</div>
                                <div className="text-amber-400 text-[10px] uppercase font-bold text-center">Severity</div>
                            </div>
                        </div>

                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <h4 className="text-[#AABBCC] font-bold mb-1">Customer Success (EMEA)</h4>
                                <p className="text-[#556677] text-xs max-w-sm">Tenure cluster reaching 3-year mark (historical turnover peak).</p>
                            </div>
                            <div className="text-right pl-4 border-l border-[#2A3A4A]">
                                <div className="text-white font-bold text-xl">Low</div>
                                <div className="text-[#556677] text-[10px] uppercase font-bold text-center">Severity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
