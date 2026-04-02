"use client";

import React, { useState } from "react";
import { AlertOctagon, RotateCcw, ShieldAlert, KeyRound, ArrowLeft } from "lucide-react";

export default function PayrollRollbackPage() {
    const [confirmText, setConfirmText] = useState("");

    const isConfirmed = confirmText === "CONFIRM ROLLBACK";

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans flex items-center justify-center">
            <div className="max-w-[700px] w-full space-y-6">

                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Payroll Dashboard
                </button>

                {/* Danger Zone Card */}
                <div className="bg-[#0A1420] border-2 border-[#FF4444]/30 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(255,68,68,0.1)]">

                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF4444]"></div>

                    <div className="p-8 pb-6 border-b border-[#1A2A3A]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-[#FF4444]/10 flex items-center justify-center shrink-0 border border-[#FF4444]/20">
                                <RotateCcw className="w-7 h-7 text-[#FF4444]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white tracking-tight">Initiate Payroll Rollback</h2>
                                <p className="text-[#FF4444] text-sm font-bold tracking-wider mt-1 uppercase">Emergency Undo Operation</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            You are about to revert a finalized payroll run. This action will delete generated payslips, invalidate bank files, and reverse accounting entries. This should only be used in case of severe miscalculations or compromised runs.
                        </p>
                    </div>

                    <div className="p-8 bg-[#060B14]">
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2">Rollback Target Details</h3>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Target Cycle</span>
                                <span className="font-bold text-white text-lg">March 2025 Regular</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Status</span>
                                <span className="bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-0.5 rounded text-xs font-bold border border-[#00E5A0]/20">Locked & Processed</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Affected Employees</span>
                                <span className="font-mono text-white text-lg">145 Personnel</span>
                            </div>
                            <div>
                                <span className="text-xs text-[#FF4444] font-bold block mb-1">Reversal Amount</span>
                                <span className="font-mono font-bold text-[#FF4444] text-xl">₹45,20,000</span>
                            </div>
                        </div>

                        <div className="bg-[#1A2A3A]/30 border border-[#FF4444]/20 rounded-lg p-5 mb-8">
                            <h4 className="text-xs font-bold text-[#FF4444] flex items-center gap-2 mb-3 uppercase tracking-wider">
                                <ShieldAlert className="w-4 h-4" /> System Impact Checklist
                            </h4>
                            <ul className="space-y-2.5 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF4444] mt-0.5">•</span>
                                    Direct deposit bank transfer files (.txt/.csv) will be immediately invalidated.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF4444] mt-0.5">•</span>
                                    Generated PDF payslips will be revoked and removed from employee portals.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF4444] mt-0.5">•</span>
                                    Accounting journal entries posted via API will be sent a reversal payload.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF4444] mt-0.5">•</span>
                                    Statutory liability accruals (PF, PT, TDS) for this cycle will be reset.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-200">Type <span className="text-[#FF4444] font-mono select-none">CONFIRM ROLLBACK</span> to proceed:</label>
                            </div>
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    placeholder="CONFIRM ROLLBACK"
                                    className="w-full bg-[#0A1420] border-2 border-[#1A2A3A] text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#FF4444] font-mono tracking-widest text-[#FF4444] placeholder-gray-600 transition-colors"
                                />
                            </div>

                            <button
                                disabled={!isConfirmed}
                                className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${isConfirmed
                                        ? 'bg-[#FF4444] hover:bg-[#FF2222] text-white shadow-[0_4px_20px_rgba(255,68,68,0.4)] cursor-pointer'
                                        : 'bg-[#1A2A3A] text-gray-500 cursor-not-allowed border border-[#334155]'
                                    }`}
                            >
                                <AlertOctagon className="w-6 h-6" /> Execute Rollback
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
