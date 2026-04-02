"use client";

import React from 'react';
import {
    Coins, Calculator, Download, ArrowLeft,
    ChevronRight, Save, Info, AlertTriangle, Briefcase, TrendingUp
} from 'lucide-react';

export default function FnFCalculation() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Full & Final Calculation</h1>
                            <p className="text-slate-400 text-sm font-medium italic">Employee: Arnab Das • ID: <span className="text-blue-500">EMP-771</span></p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center">
                            <Download size={16} className="mr-2" /> Export Worksheet
                        </button>
                        <button className="px-6 py-2.5 bg-[#0066FF] rounded-xl text-sm font-black text-white hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                            Generate Final Slip
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Components Comparison */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928]/50 flex justify-between items-center">
                                <h2 className="text-lg font-black text-white flex items-center">
                                    <Coins size={20} className="mr-3 text-emerald-500" /> Earnings & Dues
                                </h2>
                                <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest">+ Credits</span>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Component</th>
                                        <th className="px-6 py-4">Calculation Basis</th>
                                        <th className="px-6 py-4 text-right">Amount (₹)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { item: 'Unpaid Monthly Salary', basis: '24 Days Worked', amount: '1,20,000.00' },
                                        { item: 'Leave Encashment', basis: '18 Days Bal @ Gross', amount: '82,500.00' },
                                        { item: 'Notice Pay Buyout (Credit)', basis: 'Negotiated Waiver', amount: '45,000.00' },
                                        { item: 'Statutory Gratuity', basis: '3.2 Years Service', amount: '2,15,400.00', highlight: true },
                                        { item: 'Pending Expense Claims', basis: 'Verified Receipts', amount: '12,201.00' },
                                    ].map((row, i) => (
                                        <tr key={i} className={`group hover:bg-[#1A2A3A]/30 transition-all ${row.highlight ? 'bg-blue-500/5' : ''}`}>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-200">{row.item}</td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500 italic">{row.basis}</td>
                                            <td className="px-6 py-4 text-right text-sm font-black text-white group-hover:text-emerald-500 transition-colors">₹{row.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928]/50 flex justify-between items-center">
                                <h2 className="text-lg font-black text-white flex items-center">
                                    <Calculator size={20} className="mr-3 text-rose-500" /> Deductions & Recoveries
                                </h2>
                                <span className="text-xs font-black text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full uppercase tracking-widest">- Debits</span>
                            </div>

                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-6 py-4">Component</th>
                                        <th className="px-6 py-4">Policy Rule</th>
                                        <th className="px-6 py-4 text-right">Amount (₹)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {[
                                        { item: 'Notice Shortfall Recovery', basis: '12 Days @ Basic', amount: '48,000.00' },
                                        { item: 'Unreturned Assets Penalty', basis: 'MacBook Charger Pen.', amount: '8,500.00' },
                                        { item: 'Pending Loan Recovery', basis: 'Furniture Advance', amount: '25,000.00' },
                                        { item: 'Income Tax (TDS)', basis: 'Estimated Projection', amount: '68,400.00' },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-[#1A2A3A]/30 transition-all">
                                            <td className="px-6 py-4 text-sm font-bold text-slate-200">{row.item}</td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500 italic">{row.basis}</td>
                                            <td className="px-6 py-4 text-right text-sm font-black text-rose-500 group-hover:text-rose-400 transition-colors">₹{row.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Summary Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-gradient-to-br from-[#0066FF] to-[#0044CC] rounded-3xl p-8 space-y-8 shadow-[0_20px_50px_rgba(0,102,255,0.3)] relative overflow-hidden group">
                            <h2 className="text-xs font-black text-white/70 uppercase tracking-[0.25em] text-center mb-4">Net Settlement Balance</h2>

                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="text-5xl font-black text-white tabular-nums drop-shadow-xl group-hover:scale-105 transition-transform">₹3,25,202.00</div>
                                    <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-2">Payable to Employee</div>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-5 space-y-3 backdrop-blur-md border border-white/10">
                                    <div className="flex justify-between items-center text-xs font-bold text-white/80">
                                        <span>Total Earnings</span>
                                        <span className="text-emerald-300 font-black">₹4,75,102.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-white/80">
                                        <span>Total Deductions</span>
                                        <span className="text-rose-300 font-black">₹1,49,900.00</span>
                                    </div>
                                    <div className="h-px bg-white/20 my-2" />
                                    <div className="flex justify-between items-center text-sm font-black text-white">
                                        <span className="uppercase tracking-tighter">Effective Pay</span>
                                        <span className="text-yellow-300">₹3.25 L</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 relative z-10 pt-4">
                                <button className="w-full py-4 bg-white rounded-2xl text-[#0066FF] font-black text-sm hover:translate-y-[-2px] transition-all shadow-xl">
                                    Finalize Worksheet
                                </button>
                                <p className="text-[9px] text-white/40 text-center font-bold uppercase tracking-tighter">Worksheet is auto-saved. Revision history active.</p>
                            </div>

                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle size={14} className="text-amber-500" /> Critical Review Points
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Gratuity Eligibility', check: true, msg: 'Met 3+ yr criteria' },
                                    { label: 'Unused LWP', check: false, msg: 'Missing attendance logs' },
                                    { label: 'Bonus Accrual', check: true, msg: 'Pro-rata applied' },
                                ].map((pt, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className={`mt-1 h-3 w-3 rounded-sm shrink-0 ${pt.check ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'} flex items-center justify-center`}>
                                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[11px] font-black text-white uppercase tracking-tighter leading-none mb-1">{pt.label}</div>
                                            <div className="text-[10px] text-slate-500 font-medium italic truncate">{pt.msg}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
