"use client";

import React, { useState } from 'react';
import {
    Calculator, Download, UploadCloud, CheckCircle, Clock,
    AlertTriangle, Info, FileText, CreditCard, ArrowRight, Filter
} from 'lucide-react';

const sections = [
    { section: '192', desc: 'Salaries', tax: '14,50,000', cess: '58,000', interest: '0', total: '15,08,000', status: 'Unpaid' },
    { section: '192A', desc: 'Premature PF Withdrawal', tax: '12,500', cess: '500', interest: '0', total: '13,000', status: 'Unpaid' },
    { section: '194C', desc: 'Contractors & Sub-contractors', tax: '28,500', cess: '1,140', interest: '0', total: '29,640', status: 'Paid' },
    { section: '194J', desc: 'Professional / Technical Fees', tax: '45,000', cess: '1,800', interest: '0', total: '46,800', status: 'Paid' },
    { section: '194I(a)', desc: 'Rent – Plant & Machinery', tax: '10,000', cess: '400', interest: '0', total: '10,400', status: 'Unpaid' },
];

const history = [
    { month: 'Feb 2024', challanNo: 'CH29381023', bsr: '0001234', amount: '₹14,80,000', status: 'Acknowledged' },
    { month: 'Jan 2024', challanNo: 'CH29281891', bsr: '0001234', amount: '₹14,20,000', status: 'Acknowledged' },
    { month: 'Dec 2023', challanNo: 'CH29181320', bsr: '0001234', amount: '₹13,90,000', status: 'Acknowledged' },
];

export default function TDSChallan() {
    const [selected, setSelected] = useState<number[]>([]);

    const toggle = (i: number) =>
        setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 pb-4 border-b border-[#1A2A3A]">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                            Compliance <ArrowRight size={10} /> Income Tax <ArrowRight size={10} /> TDS Challan
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Calculator size={28} className="text-sky-500" /> TDS Challan (ITNS 281)
                        </h1>
                        <p className="text-slate-400 text-sm font-medium mt-1">
                            Generate section-wise ITNS 281 challans and pay via TIN 2.0 portal.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2">
                            March 2024
                        </button>
                        <button className="px-6 py-2.5 bg-sky-600 rounded-xl text-sm font-black text-white hover:bg-sky-700 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center gap-2">
                            <UploadCloud size={16} /> Pay Selected via TIN 2.0
                        </button>
                    </div>
                </div>

                {/* KPI Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total TDS Liability', val: '₹15,67,840', color: 'sky', icon: Calculator },
                        { label: 'Paid This Month', val: '₹86,440', color: 'emerald', icon: CheckCircle },
                        { label: 'Due: 7th April', val: '₹14,81,400', color: 'rose', icon: Clock },
                        { label: 'Interest Accrued', val: '₹0', color: 'slate', icon: AlertTriangle },
                    ].map((kpi, i) => (
                        <div key={i} className={`bg-[#0D1928] border border-${kpi.color}-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-${kpi.color}-500/50 transition-all`}>
                            <div className={`text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2`}>{kpi.label}</div>
                            <div className={`text-2xl font-black text-${kpi.color === 'slate' ? 'slate-300' : kpi.color + '-400'} tabular-nums tracking-tight`}>{kpi.val}</div>
                            <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-${kpi.color}-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700`} />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section Table */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-4 bg-[#060B14]/60 border-b border-[#1A2A3A] flex justify-between items-center">
                                <h2 className="text-xs font-black text-white uppercase tracking-widest">Section-wise Liability — March 2024</h2>
                                <button className="p-1.5 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-slate-400 hover:text-white">
                                    <Filter size={14} />
                                </button>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#060B14]/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-[#1A2A3A]">
                                    <tr>
                                        <th className="px-4 py-3 w-8"></th>
                                        <th className="px-4 py-3">Section / Nature</th>
                                        <th className="px-4 py-3 text-right">Tax (₹)</th>
                                        <th className="px-4 py-3 text-right">Surcharge+Cess(₹)</th>
                                        <th className="px-4 py-3 text-right">Total (₹)</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {sections.map((row, i) => (
                                        <tr key={i} className={`group transition-all cursor-pointer
                                            ${row.status === 'Unpaid' ? 'hover:bg-rose-500/5' : 'hover:bg-emerald-500/5'}
                                            ${selected.includes(i) ? 'bg-sky-500/10' : ''}`}
                                            onClick={() => row.status === 'Unpaid' && toggle(i)}>
                                            <td className="px-4 py-3">
                                                {row.status === 'Unpaid' && (
                                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
                                                        ${selected.includes(i) ? 'bg-sky-500 border-sky-500' : 'border-slate-600'}`}>
                                                        {selected.includes(i) && <CheckCircle size={10} className="text-white" />}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-xs font-black text-white">{row.section}</div>
                                                <div className="text-[10px] font-bold text-slate-500">{row.desc}</div>
                                            </td>
                                            <td className="px-4 py-3 text-xs font-bold text-slate-300 text-right tabular-nums">{row.tax}</td>
                                            <td className="px-4 py-3 text-xs font-bold text-slate-400 text-right tabular-nums">{row.cess}</td>
                                            <td className="px-4 py-3 text-xs font-black text-white text-right tabular-nums">{row.total}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border
                                                    ${row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-[#1A2A3A] bg-[#060B14]/60">
                                        <td colSpan={4} className="px-4 py-4 text-xs font-black text-white uppercase tracking-widest">Total Liability</td>
                                        <td className="px-4 py-4 text-base font-black text-sky-400 text-right tabular-nums">₹15,67,840</td>
                                        <td className="px-4 py-4">
                                            <button className="px-4 py-2 bg-sky-600 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-sky-700 transition-colors">
                                                Pay All Due
                                            </button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Info Card */}
                        <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl flex gap-3">
                            <Info size={16} className="text-sky-500 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                TDS for salary (Sec 192) is due by <b className="text-sky-400">7th of the following month</b>. Late deductions attract 1% per month; late payments attract 1.5% per month u/s 201(1A).
                            </p>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-6">
                        {/* Challan History */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 shadow-xl flex flex-col max-h-[320px]">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 border-b border-[#1A2A3A] pb-3 flex justify-between items-center">
                                Challan History <Download size={12} className="text-slate-500 cursor-pointer hover:text-white" />
                            </h3>
                            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                                {history.map((h, i) => (
                                    <div key={i} className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl hover:border-slate-600 transition-colors cursor-pointer">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-black text-slate-300">{h.month}</span>
                                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{h.status}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-mono">{h.challanNo} | BSR {h.bsr}</div>
                                        <div className="text-xs font-black text-slate-400 tabular-nums mt-1">{h.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BSR Import */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-4 shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4">Import BSR Data from Bank</h3>
                            <div className="border-2 border-dashed border-[#1A2A3A] rounded-xl p-6 flex flex-col items-center text-center gap-3">
                                <CreditCard size={24} className="text-slate-600" />
                                <p className="text-[10px] text-slate-500 font-medium">Upload challan counterfoil or bank confirmation slip</p>
                                <button className="px-4 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors">
                                    Browse File
                                </button>
                            </div>
                        </div>

                        {/* Navigate */}
                        <div className="grid grid-cols-2 gap-3">
                            <a href="/compliance/tds-return-24q">
                                <div className="p-4 bg-[#0D1928] border border-indigo-500/20 rounded-xl hover:border-indigo-500/50 transition-all cursor-pointer group">
                                    <FileText size={18} className="text-indigo-500 mb-2" />
                                    <div className="text-xs font-black text-white">Form 24Q</div>
                                    <div className="text-[9px] text-slate-500 mt-0.5">Salary Returns</div>
                                </div>
                            </a>
                            <a href="/compliance/tds-return-26q">
                                <div className="p-4 bg-[#0D1928] border border-purple-500/20 rounded-xl hover:border-purple-500/50 transition-all cursor-pointer group">
                                    <FileText size={18} className="text-purple-500 mb-2" />
                                    <div className="text-xs font-black text-white">Form 26Q</div>
                                    <div className="text-[9px] text-slate-500 mt-0.5">Non-Salary Returns</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
