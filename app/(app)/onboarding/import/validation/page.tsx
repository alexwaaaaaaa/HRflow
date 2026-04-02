"use client";
import React, { useState, useEffect } from 'react';
import { ServerCrash, AlertTriangle, FileWarning, CheckCircle2, ChevronRight, Download } from 'lucide-react';

export default function ValidationReportScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Pre-Import Validation Check</h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        We scanned 1,248 records against Kaarya's strict payroll and compliance rules. Please resolve these issues before completing the import.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Error log
                    </button>
                    <button onClick={() => window.location.href = '/onboarding/import/progress'} className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-rose-500/20 transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                        Import Valid Records Only <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Scorecard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#060D1A] border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full" />
                    <CheckCircle2 className="text-emerald-500 mb-2" size={24} />
                    <div className="text-3xl font-black text-white mb-1">1,210</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Ready to Import</div>
                </div>
                <div className="bg-[#060D1A] border border-rose-500/30 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 blur-xl rounded-full" />
                    <ServerCrash className="text-rose-500 mb-2" size={24} />
                    <div className="text-3xl font-black text-white mb-1">14</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Critical Errors</div>
                </div>
                <div className="bg-[#060D1A] border border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 blur-xl rounded-full" />
                    <AlertTriangle className="text-amber-500 mb-2" size={24} />
                    <div className="text-3xl font-black text-white mb-1">24</div>
                    <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Warnings</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 flex flex-col justify-center">
                    <div className="text-sm text-white font-bold mb-2">Quality Score</div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-[#131B2B] rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[96%]" />
                        </div>
                        <span className="text-emerald-400 font-black">96%</span>
                    </div>
                </div>
            </div>

            {/* Error List */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden mt-8">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center gap-6">
                    <button className="text-sm font-bold text-white border-b-2 border-rose-500 pb-1 -mb-4">Critical Errors (14)</button>
                    <button className="text-sm font-bold text-[#556677] hover:text-[#8899AA] transition-colors">Warnings (24)</button>
                </div>

                <div className="divide-y divide-[#1A2A3A]">
                    {/* Error Item 1 */}
                    <div className="p-6 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-rose-500/20 p-2 rounded-lg text-rose-400 shrink-0">
                                <FileWarning size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold text-base mb-1">Missing IFCS Codes for Salary Accounts</h4>
                                <p className="text-sm text-[#8899AA] mb-4">
                                    8 employees have a Bank Account Number but no IFSC Code. Production payroll will fail for these users.
                                </p>

                                <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-[#131B2B] text-xs uppercase tracking-wider text-[#556677]">
                                            <tr>
                                                <th className="px-4 py-2 font-medium w-32">Row #</th>
                                                <th className="px-4 py-2 font-medium">Employee Name</th>
                                                <th className="px-4 py-2 font-medium">Bank Name</th>
                                                <th className="px-4 py-2 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1A2A3A] text-[#CCDDEE]">
                                            <tr>
                                                <td className="px-4 py-3 font-mono text-[#8899AA]">Row 42</td>
                                                <td className="px-4 py-3 font-medium text-white">Aditi Verma</td>
                                                <td className="px-4 py-3">HDFC Bank</td>
                                                <td className="px-4 py-3">
                                                    <input type="text" placeholder="Enter IFSC" className="bg-[#0A1420] border border-rose-500/50 rounded px-2 py-1 text-xs text-white max-w-[120px] outline-none focus:border-rose-400" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-mono text-[#8899AA]">Row 108</td>
                                                <td className="px-4 py-3 font-medium text-white">Suresh Menon</td>
                                                <td className="px-4 py-3">ICICI Bank</td>
                                                <td className="px-4 py-3">
                                                    <input type="text" placeholder="Enter IFSC" className="bg-[#0A1420] border border-rose-500/50 rounded px-2 py-1 text-xs text-white max-w-[120px] outline-none focus:border-rose-400" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4} className="px-4 py-2 text-center text-xs text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer">View 6 more...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Item 2 */}
                    <div className="p-6 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-rose-500/20 p-2 rounded-lg text-rose-400 shrink-0">
                                <AlertTriangle size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold text-base mb-1">Invalid PAN Format</h4>
                                <p className="text-sm text-[#8899AA] mb-4">
                                    6 employees have PAN numbers that do not match the required Indian format (5 letters, 4 numbers, 1 letter).
                                </p>
                                <button className="text-sm font-bold text-[#060D1A] bg-white px-4 py-2 rounded-lg transition-colors hover:bg-gray-200">
                                    Edit in Bulk Editor
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
