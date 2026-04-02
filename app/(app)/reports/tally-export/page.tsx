"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileCode2, ChevronRight, Download, CheckCircle2, Settings, AlertTriangle
} from "lucide-react";

export default function TallyExportScreen() {
    const [status, setStatus] = useState("ready"); // "ready", "generating", "done"

    const handleGenerate = () => {
        setStatus("generating");
        setTimeout(() => setStatus("done"), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Accounting Integration</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <FileCode2 className="w-8 h-8 text-amber-500" />
                        Tally ERP 9 / Prime Export
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Generate automated Journal Vouchers (JVs) in Tally XML format.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors">
                        <Settings className="w-4 h-4" /> Setup Ledger Mapping
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Generation Form */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-lg shadow-black/20">
                    <h2 className="text-lg font-bold text-white mb-6">Generate XML Voucher</h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-1">Company Entity</label>
                            <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors">
                                <option>Kaarya Technologies Pvt Ltd (KTPL)</option>
                                <option>Kaarya Global Services (KGS)</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-1">Payroll Month</label>
                                <input type="month" className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors" defaultValue="2026-03" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-1">Voucher Type</label>
                                <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors">
                                    <option>Journal Voucher (JV)</option>
                                    <option>Payment Voucher</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-1">Voucher Date</label>
                            <input type="date" className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors" defaultValue="2026-03-31" />
                        </div>

                        <div className="pt-4">
                            {status === "ready" && (
                                <button
                                    onClick={handleGenerate}
                                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-[#0B1221] font-bold rounded-lg transition-colors shadow-[0_4px_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
                                >
                                    <FileCode2 className="w-5 h-5" /> Generate Tally XML
                                </button>
                            )}

                            {status === "generating" && (
                                <button disabled className="w-full py-3 bg-[#1A2A3A] text-[#8899AA] font-bold rounded-lg transition-colors border border-[#2A3A4A] flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-[#8899AA] border-t-amber-500 rounded-full animate-spin"></div> Compiling XML...
                                </button>
                            )}

                            {status === "done" && (
                                <button
                                    onClick={() => setStatus("ready")}
                                    className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="w-5 h-5" /> Voucher Generated Successfully
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status & Validation */}
                <div className="flex flex-col gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 h-full flex flex-col">
                        <h2 className="text-lg font-bold text-white mb-6">Ledger Mapping Validation</h2>

                        <div className="flex-1 space-y-4">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-bold text-white">Basic Pay & Allowances (Dr.)</h3>
                                    <p className="text-xs text-[#8899AA] mt-1">12 distinct components mapped correctly to expenses.</p>
                                </div>
                            </div>

                            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-bold text-white">TDS Payable (Cr.)</h3>
                                    <p className="text-xs text-[#8899AA] mt-1">Warning: Ledger name `TDS_Salary_Payable` does not exactly match Tally master (`TDS on Salary`). Recommend fixing before import.</p>
                                </div>
                            </div>

                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-bold text-white">Salary Payable (Cr.)</h3>
                                    <p className="text-xs text-[#8899AA] mt-1">Net payable amount correctly mapped to liability ledger.</p>
                                </div>
                            </div>
                        </div>

                        {status === "done" && (
                            <div className="mt-6 pt-6 border-t border-[#1A2A3A]">
                                <h3 className="text-sm font-bold text-white mb-2">Recent Exports</h3>
                                <div className="flex items-center justify-between p-3 bg-[#1A2A3A]/40 rounded-lg border border-[#2A3A4A]">
                                    <div>
                                        <p className="text-white text-sm font-medium">KTPL_Payroll_JV_Mar26.xml</p>
                                        <p className="text-xs text-[#8899AA]">Generated just now • 14 KB</p>
                                    </div>
                                    <button className="text-amber-500 hover:text-amber-400 p-2">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
