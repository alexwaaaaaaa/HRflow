"use client";
import React from 'react';
import { Layers, FileText, Download, Target, Users, Search } from 'lucide-react';
import Link from 'next/link';

export default function ShadowPayrollScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Layers size={24} className="text-purple-400" /> Shadow Payroll Processing</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage tax equivalency and reporting for expat employees remaining on home country payroll while working in host country.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Consolidated GL
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                            <h3 className="text-white font-bold">Active Shadow Ledgers (Oct 2025)</h3>
                            <div className="relative w-64">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                                <input type="text" placeholder="Search Expat..."
                                    className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs outline-none focus:border-purple-500" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                        <th className="p-4 py-3">Expat Info</th>
                                        <th className="p-4 py-3">Home Entity (Physical Pay)</th>
                                        <th className="p-4 py-3">Host Entity (Shadow Run)</th>
                                        <th className="p-4 py-3 text-right">Gross Taxable Equiv</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white mb-0.5">David Chang</div>
                                            <div className="text-[#556677] text-xs">Expat ID: EX-402</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs">🇸🇬</span> <span className="text-white font-bold text-xs bg-[#1A2A3A] px-2 py-0.5 rounded border border-[#2A3A4A]">Acme SG</span>
                                            </div>
                                            <div className="text-[#8899AA] text-xs font-mono">14,200 SGD</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs">🇺🇸</span> <span className="text-purple-300 font-bold text-xs bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Acme US</span>
                                            </div>
                                            <div className="text-purple-400 text-xs font-mono">Report Only</div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="font-mono text-white">$10,480.00 USD</div>
                                            <div className="text-[#556677] text-[10px] mt-0.5">Rate: 0.7380</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-[#1A2A3A] bg-[#060D1A] flex justify-end">
                            <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                Commit Shadow Run for Period
                            </button>
                        </div>
                    </div>

                    <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
                        <h3 className="text-purple-300 font-bold text-sm mb-2 flex items-center gap-2"><Target size={16} /> How this works</h3>
                        <p className="text-[#8899AA] text-xs leading-relaxed max-w-2xl">
                            A "Shadow Payroll" mimics the actual payroll process in a host country for compliance and tax reporting without making an actual net payment to the employee's bank account (since they are paid via the home country entity). This module automatically calculates hypothetical tax withholding and generates necessary W-2 / local tax equivalents for international assignee compliance.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Tax Equalization Status</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Pending Settlements</span>
                                <span className="text-white font-bold">2</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Hypothetical Tax YTD</span>
                                <span className="text-white font-bold font-mono">$104,250 USD</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pb-4 border-b border-[#1A2A3A]">
                                <span className="text-[#8899AA]">Host Tax Remitted YTD</span>
                                <span className="text-white font-bold font-mono">$112,800 USD</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white font-bold">Employer Balance Owed</span>
                                <span className="text-rose-400 font-bold font-mono">-$8,550 USD</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2 rounded-xl text-sm transition-colors text-center">
                            Download Tax Ledger
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
