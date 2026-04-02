"use client";
import React, { useState } from 'react';
import { FileText, ArrowLeft, Download, Building, Lock } from 'lucide-react';
import Link from 'next/link';

const PAYSLIPS = [
    { month: 'March 2026', paidOn: '31 Mar 2026', gross: 219000, tds: 34500, pf: 10250, net: 174250, status: 'Available' },
    { month: 'February 2026', paidOn: '28 Feb 2026', gross: 219000, tds: 34500, pf: 10250, net: 174250, status: 'Available' },
    { month: 'January 2026', paidOn: '31 Jan 2026', gross: 219000, tds: 34500, pf: 10250, net: 174250, status: 'Available' },
    { month: 'December 2025', paidOn: '31 Dec 2025', gross: 219000, tds: 34500, pf: 10250, net: 174250, status: 'Available' },
];

export default function ESSPayslipsScreen() {
    const [selected, setSelected] = useState(0);
    const slip = PAYSLIPS[selected];

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileText size={22} className="text-indigo-400" /> My Payslips</h1>
                    <p className="text-[#8899AA] text-sm mt-1">View and download your monthly salary slips.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                    <Download size={16} /> Download Selected (PDF)
                </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {/* Sidebar Selector */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-[600px] overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                        <h3 className="text-white font-bold text-sm">Payslip Archive</h3>
                    </div>
                    <div className="overflow-y-auto divide-y divide-[#1A2A3A]">
                        {PAYSLIPS.map((p, i) => (
                            <button key={i} onClick={() => setSelected(i)} className={`w-full text-left p-4 transition-colors ${selected === i ? 'bg-[#131B2B] border-l-4 border-indigo-500' : 'hover:bg-[#131B2B] border-l-4 border-transparent'}`}>
                                <div className="text-white font-bold text-sm">{p.month}</div>
                                <div className="text-[#556677] text-xs mt-1 flex justify-between">
                                    <span>Paid: {p.paidOn}</span>
                                    <span className="text-emerald-400 font-semibold">₹{(p.net / 1000).toFixed(0)}k</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payslip Render */}
                <div className="md:col-span-3 bg-white text-slate-900 rounded-2xl p-8 relative overflow-hidden min-h-[600px] shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>

                    <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6 mt-4">
                        <div>
                            <h1 className="text-2xl font-black text-indigo-900 tracking-tight">Acme Corporation Ltd.</h1>
                            <div className="text-slate-500 text-sm mt-1">Payslip for the month of <strong className="text-slate-700">{slip.month}</strong></div>
                        </div>
                        <div className="text-right">
                            <div className="text-slate-500 text-sm">Net Pay Amount</div>
                            <div className="text-3xl font-black text-emerald-600">₹{slip.net.toLocaleString()}</div>
                            <div className="text-slate-400 text-xs mt-1 w-max bg-slate-100 px-2 py-0.5 rounded ml-auto flex items-center gap-1"><Lock size={10} /> Password protected PDF</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">Employee Name:</span> <span className="font-bold">Anita Kulkarni</span></div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">Bank Name:</span> <span className="font-bold">HDFC Bank</span></div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">Employee ID:</span> <span className="font-bold">EMP-001</span></div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">Bank A/C No:</span> <span className="font-bold">XXXXXX4521</span></div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">Designation:</span> <span className="font-bold">Senior Engineer</span></div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">UAN:</span> <span className="font-bold">10098453210</span></div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">Days Paid:</span> <span className="font-bold">31.0</span></div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-1"><span className="text-slate-500">PAN:</span> <span className="font-bold">ABCDE1234F</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-slate-800 font-bold bg-slate-100 px-3 py-1.5 rounded-t-lg border-b border-slate-200">Earnings</h3>
                            <div className="border border-t-0 border-slate-100 rounded-b-lg">
                                {[
                                    ['Basic Salary', 78400],
                                    ['House Rent Allowance (HRA)', 39200],
                                    ['Special Allowance', 101400],
                                ].map(([label, amt], i) => (
                                    <div key={i} className="flex justify-between px-3 py-2 text-sm border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                        <span className="text-slate-700">{label}</span>
                                        <span className="font-medium">₹{Number(amt).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between px-3 py-2 text-sm font-bold bg-slate-50 rounded-b-lg mt-2">
                                    <span className="text-slate-800">Total Earnings (A)</span>
                                    <span className="text-indigo-600 text-base lg:text-lg">₹{slip.gross.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-slate-800 font-bold bg-slate-100 px-3 py-1.5 rounded-t-lg border-b border-slate-200">Deductions</h3>
                            <div className="border border-t-0 border-slate-100 rounded-b-lg">
                                {[
                                    ['Income Tax (TDS)', 34500],
                                    ['Provident Fund (EE)', 10250],
                                ].map(([label, amt], i) => (
                                    <div key={i} className="flex justify-between px-3 py-2 text-sm border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                        <span className="text-slate-700">{label}</span>
                                        <span className="font-medium text-red-600">₹{Number(amt).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between px-3 py-2 text-sm font-bold bg-slate-50 rounded-b-lg mt-[38px]">
                                    <span className="text-slate-800">Total Deductions (B)</span>
                                    <span className="text-red-600 text-base lg:text-lg">₹{(slip.tds + slip.pf).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-xs text-slate-400">
                        This is a computer generated document. No signature is required.
                    </div>
                </div>
            </div>
        </div>
    );
}
