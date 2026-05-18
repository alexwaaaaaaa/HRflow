"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Network, Wand2, ShieldAlert, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export default function UnexplainedGapScreen() {
    return (
        <Page
            title="AI Pay Gap Decomposition"
            subtitle="Machine Learning model identifying explained vs unexplained variances in compensation."
            breadcrumbs={[{ label: "Pay Equity", href: "/pay-equity" }, { label: "Unexplained Gap" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Wand2 size={24} className="text-purple-400" /> AI Pay Gap Decomposition</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Machine Learning model identifying "explained" vs "unexplained" variances in compensation.</p>
                </div>
                <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                    <Download size={16} /> Export Analysis Model
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* ML Decomposition Model View */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center justify-between">
                        Global Gender Gap Decomposition (12.4%)
                    </h3>

                    <div className="space-y-4 mb-8">
                        <div className="w-full bg-[#131B2B] h-12 rounded-xl flex overflow-hidden border border-[#2A3A4A]">
                            <div className="bg-indigo-500/80 h-full flex items-center justify-center text-xs font-bold text-white shadow-inner" style={{ width: '65%' }}>Explanatory Factors (65%)</div>
                            <div className="bg-rose-500/80 h-full flex items-center justify-center text-xs font-bold text-white shadow-inner relative overflow-hidden" style={{ width: '35%' }}>
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.1)_5px,rgba(0,0,0,0.1)_10px)]"></div>
                                Unexplained (35%)
                            </div>
                        </div>
                        <div className="text-[#8899AA] text-xs leading-relaxed max-w-lg mx-auto text-center">
                            The model attributes 65% of the gross 12.4% pay gap to legitimate compensable factors (experience, location, role). The remaining 35% (approx 4.3% absolute gap) remains unexplained and presents potential equity risk.
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#1A2A3A]">
                        <h4 className="text-sm font-bold text-white mb-2">Primary Drivers of Explained Variance</h4>
                        {[
                            { factor: 'Job Level / Seniority', weight: '42%' },
                            { factor: 'Geographic Cost of Labor (GEO)', weight: '31%' },
                            { factor: 'Job Family (e.g. Eng vs Ops)', weight: '18%' },
                            { factor: 'Tenure & Performance Yield', weight: '9%' },
                        ].map((d, i) => (
                            <div key={i} className="flex justify-between items-center bg-[#060D1A] p-3 rounded-xl border border-[#1A2A3A]">
                                <span className="text-[#8899AA] text-sm font-bold flex items-center gap-2"><Network size={14} className="text-[#556677]" />{d.factor}</span>
                                <span className="text-white font-mono font-bold">{d.weight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                        <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><ShieldAlert size={18} /> High-Risk At-Risk Cohorts</h3>

                        <div className="space-y-4">
                            <div className="bg-[#131B2B] border border-rose-500/30 p-4 rounded-xl cursor-pointer hover:bg-[#1A2A3A] transition-colors relative group">
                                <div className="absolute right-4 top-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight size={16} /></div>
                                <div className="text-white font-bold text-sm mb-1">Female Engineers (L3/Senior) in USA</div>
                                <div className="text-[#8899AA] text-xs mb-3">Statistically significant unexplained negative variance of -6.2% vs male peers forming a cluster of 14 employees.</div>
                                <div className="flex gap-2">
                                    <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">High Equity Risk</span>
                                    <span className="text-[10px] uppercase font-bold text-[#AABBCC] bg-[#2A3A4A] px-2 py-0.5 rounded">Cost to Remediate: $112k</span>
                                </div>
                            </div>

                            <div className="bg-[#131B2B] border border-amber-500/30 p-4 rounded-xl cursor-pointer hover:bg-[#1A2A3A] transition-colors relative group">
                                <div className="absolute right-4 top-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight size={16} /></div>
                                <div className="text-white font-bold text-sm mb-1">Recent Hires (Sales Directors)</div>
                                <div className="text-[#8899AA] text-xs mb-3">New hires in the last 12 months brought in at 12% premium over established incumbents with identical metrics.</div>
                                <div className="flex gap-2">
                                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Compression Risk</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-bold mb-1">Initiate Remediation Plan</h3>
                            <p className="text-[#8899AA] text-xs max-w-sm">Create salary adjustments utilizing the equity budget to close unexplained gaps.</p>
                        </div>
                        <Link href="/pay-equity/remediation" className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0">
                            Draft Plan &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
