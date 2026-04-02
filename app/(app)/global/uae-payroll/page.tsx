"use client";
import React from 'react';
import { Landmark, CheckCircle2, ChevronRight, Activity, CalendarDays, FileText } from 'lucide-react';

export default function UAEPayrollScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><span className="text-2xl">🇦🇪</span> UAE Payroll & WPS Dashboard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage processing, Gratuity tracking, and MoHRE WPS (Wage Protection System) compliance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Total Payroll (Oct 2025)</div>
                    <div className="text-3xl font-black text-white mb-2">1.82M <span className="text-sm text-[#556677] font-bold">AED</span></div>
                    <div className="text-[#8899AA] text-xs font-bold">85 Employees across 2 Emirates</div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">End of Service Accrual</div>
                    <div className="text-3xl font-black text-white mb-2">450k <span className="text-sm text-[#556677] font-bold">AED</span></div>
                    <div className="text-emerald-400 text-xs font-bold flex items-center gap-1">Gratuity liability fully funded</div>
                </div>

                <div className="md:col-span-2 bg-gradient-to-r from-[#132B2B] to-[#0A1420] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden flex items-center justify-between">
                    <div>
                        <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><CheckCircle2 size={14} /> WPS SIF File Status</div>
                        <div className="text-2xl font-bold text-white mb-1">Generated & Validated</div>
                        <div className="text-emerald-200/80 text-xs font-medium">Ready for upload to Ministry portal (MoHRE)</div>
                    </div>

                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors flex items-center gap-2">
                        <DownloadSIFIcon /> Download SIF (.csv)
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold">UAE Localised Compensation Splitting</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                        <th className="p-4 py-3">Pay Component</th>
                                        <th className="p-4 py-3 text-right">Amount (AED)</th>
                                        <th className="p-4 py-3 text-right">% of Total</th>
                                        <th className="p-4 py-3 pl-8">MoHRE SIF Mapping</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-mono">
                                    <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50">
                                        <td className="p-4 text-white font-bold font-sans">Basic Salary</td>
                                        <td className="p-4 text-right">910,000</td>
                                        <td className="p-4 text-right text-[#AABBCC]">50.0%</td>
                                        <td className="p-4 pl-8 text-emerald-400 text-xs">Included (Base)</td>
                                    </tr>
                                    <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50">
                                        <td className="p-4 text-white font-bold font-sans">Housing Allowance (HRA)</td>
                                        <td className="p-4 text-right">546,000</td>
                                        <td className="p-4 text-right text-[#AABBCC]">30.0%</td>
                                        <td className="p-4 pl-8 text-sky-400 text-xs">Included (Allowances)</td>
                                    </tr>
                                    <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50">
                                        <td className="p-4 text-white font-bold font-sans">Transportation Allowance</td>
                                        <td className="p-4 text-right">364,000</td>
                                        <td className="p-4 text-right text-[#AABBCC]">20.0%</td>
                                        <td className="p-4 pl-8 text-sky-400 text-xs">Included (Allowances)</td>
                                    </tr>
                                    <tr className="bg-[#131B2B] font-bold text-white border-t-2 border-[#2A3A4A]">
                                        <td className="p-4 font-sans">Total Fixed Gross (AED)</td>
                                        <td className="p-4 text-right">1,820,000</td>
                                        <td className="p-4 text-right text-emerald-400">100%</td>
                                        <td className="p-4 pl-8 text-[#556677] text-xs font-sans">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 bg-amber-500/10 border-t border-amber-500/20 text-xs text-amber-200/80 leading-relaxed">
                            <span className="font-bold text-amber-400 block mb-1">Local Compliance Note:</span>
                            As per UAE Labor Law, Basic Salary must constitute a minimum percentage of the total gross salary (often structured as 50-60%). Gratuity is calculated solely on the Basic Salary portion.
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Pension Config (GCC Nationals)</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-[#8899AA] text-sm">GPSSA Registered Employees</div>
                                <div className="text-white font-bold">12</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-[#8899AA] text-sm">Employer Contribution (15%)</div>
                                <div className="text-white font-bold font-mono">27,300 AED</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-[#8899AA] text-sm">Employee Deduction (5%)</div>
                                <div className="text-white font-bold font-mono">9,100 AED</div>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-xl text-sm transition-colors text-center">
                            Review GCC Pension Report
                        </button>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4 flex items-center gap-2">
                            <CalendarDays size={18} className="text-[#556677]" /> Emirates Public Holidays
                        </h3>
                        <div className="space-y-3">
                            {[
                                { n: 'Commemoration Day', d: 'Dec 01, 2025' },
                                { n: 'UAE National Day', d: 'Dec 02-03, 2025' },
                                { n: 'New Year', d: 'Jan 01, 2026' },
                            ].map((h, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-white font-bold">{h.n}</span>
                                    <span className="text-[#8899AA] text-xs">{h.d}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DownloadSIFIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}
