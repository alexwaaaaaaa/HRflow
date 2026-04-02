"use client";
import React from 'react';
import { UserMinus, TrendingDown, Search, ArrowUpRight, MessageSquareX } from 'lucide-react';
import Link from 'next/link';

export default function ChurnAnalysisScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">← Back to Dashboard</Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Customer Churn Diagnostics</h1>
                    <p className="text-[#8899AA] text-sm">Analyze off-boarding telemetry, cancellation reasons, and lost ARR.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-rose-400 mb-1">1.2%</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Logo Churn (MoM)</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-rose-400 mb-1">$14.5K</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider flex items-center gap-1">Gross MRR Churn <TrendingDown size={14} /></div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-emerald-400 mb-1">-2.4%</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider flex items-center gap-1">Net MRR Churn (Negative is good)</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 relative overflow-hidden">
                    <div className="text-3xl font-black text-white mb-1">8 Months</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Avg Lifetime of Churned (LTV)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Cancellation Reasons */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#1A2A3A] pb-4 mb-6">Primary Defection Drivers (YTD)</h2>
                    <div className="space-y-6">
                        {[
                            { name: 'Missing Features / Integrations', pct: 45 },
                            { name: 'Switched to Cheaper Alternative', pct: 28 },
                            { name: 'Company Downsizing / Out of Business', pct: 15 },
                            { name: 'Poor Onboarding Experience', pct: 8 },
                            { name: 'Technical / Performance Issues', pct: 4 },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm font-bold text-white mb-2">
                                    <span>{item.name}</span>
                                    <span className="text-[#8899AA]">{item.pct}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Churns Table */}
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><UserMinus size={18} className="text-rose-400" /> Recent Cancellations</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Organization</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Lost MRR</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Tenure</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Exit Survey Note</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { org: 'StartUp XYZ Pvt Ltd', mrr: '$450', time: '14 Months', reason: "We needed deeper integration with Jira for time tracking. Moving to another vendor." },
                                    { org: 'Local Retailers Corp', mrr: '$1,200', time: '6 Months', reason: "System was too complex for our blue-collar workforce." },
                                    { org: 'Tech Innovators', mrr: '$800', time: '2 Years', reason: "Company acquired, consolidating HR systems onto parent company's platform Workday." },
                                    { org: 'Sunset Bakery', mrr: '$150', time: '3 Months', reason: "Downsizing staff, no longer need an HR system." },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                        <td className="px-6 py-4 text-white font-bold">{row.org}</td>
                                        <td className="px-6 py-4 text-rose-400 font-mono font-bold text-xs">{row.mrr}</td>
                                        <td className="px-6 py-4 text-[#8899AA] text-xs">{row.time}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-2 max-w-xs whitespace-normal line-clamp-2 text-xs text-[#556677] italic">
                                                <MessageSquareX size={14} className="shrink-0 mt-0.5" />
                                                "{row.reason}"
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
