"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { UserPlus, ShieldCheck, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';

export default function FairPayCheckScreen() {
    const [val, setVal] = useState(135000);
    const [status, setStatus] = useState<'neutral' | 'pass' | 'fail'>('neutral');
    const [loading, setLoading] = useState(false);

    const triggerAnalysis = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStatus(val > 150000 ? 'fail' : 'pass');
        }, 1000);
    };

    return (
        <Page
            title="Pre-Offer Fair Pay Interceptor"
            subtitle="Validate proposed candidate offers against internal equity models before HR approval."
            breadcrumbs={[{ label: "Pay Equity", href: "/pay-equity" }, { label: "Fair Pay Check" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus size={24} className="text-sky-400" /> Pre-Offer Fair Pay Interceptor</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Validate proposed candidate offers against internal equity models before HR approval.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Interceptor Simulator */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 shadow-2xl relative">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                        Offer Definition
                    </h3>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2 uppercase tracking-wider">Target Role</label>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold opacity-70">L4 Senior Software Engineer</div>
                            </div>
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2 uppercase tracking-wider">Location</label>
                                <div className="bg-[#131B2B] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm opacity-70">Austin, TX (Tier 2)</div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2 uppercase tracking-wider">Proposed Base Salary (USD)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-black text-xl">$</span>
                                <input type="number" value={val} onChange={(e) => { setVal(Number(e.target.value)); setStatus('neutral'); }}
                                    className={`w-full bg-[#060D1A] border-2 rounded-xl pl-8 pr-4 py-4 text-white font-black text-2xl focus:outline-none transition-colors ${status === 'fail' ? 'border-rose-500/50 focus:border-rose-500' : status === 'pass' ? 'border-emerald-500/50 focus:border-emerald-500' : 'border-[#2A3A4A] focus:border-sky-500'}`} />
                            </div>
                        </div>

                        <button
                            onClick={triggerAnalysis}
                            disabled={loading}
                            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4">
                            {loading ? <RefreshCw className="animate-spin" size={18} /> : 'Simulate Equity Validation'}
                        </button>
                    </div>

                    {/* Validation Outcome Overlay / Section */}
                    {status !== 'neutral' && !loading && (
                        <div className={`mt-6 p-5 rounded-2xl border ${status === 'pass' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'} animate-in zoom-in-95`}>
                            <div className={`flex items-start gap-3 ${status === 'pass' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {status === 'pass' ? <ShieldCheck size={24} className="shrink-0 mt-0.5" /> : <AlertCircle size={24} className="shrink-0 mt-0.5" />}
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{status === 'pass' ? 'Offer Approved: Internally Equitable' : 'Offer Flagged: High Equity Risk'}</h4>
                                    <p className={`text-sm ${status === 'pass' ? 'text-emerald-200/80' : 'text-rose-200/80'}`}>
                                        {status === 'pass'
                                            ? `This offer aligns with existing incumbents mapped to similar experience and location variables. No unjustified gaps detected.`
                                            : `This offer is $${(val - 145000).toLocaleString()} higher than the risk threshold for comparable internal incumbents. Proceeding requires VP HR override and justification.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contextual Model Data */}
                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6 flex items-center gap-2">
                            <BarChart2 size={18} className="text-[#556677]" /> Model Variables Evaluated
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-bold mb-1">
                                    <span className="text-[#8899AA]">Current L4 SWE Band (Austin)</span>
                                    <span className="text-white font-mono">$110k - $160k</span>
                                </div>
                                <div className="w-full h-2 rounded-full border border-[#2A3A4A] bg-[#060D1A] overflow-hidden">
                                    {/* Assume $110k - $160k, range=$50k */}
                                    <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${Math.max(0, Math.min(100, ((val - 110000) / 50000) * 100))}%` }}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1A2A3A]">
                                <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A]">
                                    <div className="text-[#556677] text-[10px] font-bold uppercase mb-1">Target CR</div>
                                    <div className="text-white font-bold">{(val / 135000).toFixed(2)}</div>
                                </div>
                                <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A]">
                                    <div className="text-[#556677] text-[10px] font-bold uppercase mb-1">Comparable Incumbents</div>
                                    <div className="text-white font-bold">14</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-2xl p-4 text-sm text-[#8899AA] leading-relaxed">
                        <strong className="text-white block mb-1">How does the interceptor work?</strong>
                        By plugging in API endpoints with your ATS (e.g., Greenhouse or Lever), HRFlow automatically scores offer approvals based on real-time organizational parity data, blocking compensation decisions that widen unexplained pay gaps.
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
