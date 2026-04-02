"use client";

import React from 'react';
import {
    Download, ExternalLink, ShieldAlert, FileText,
    CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';

export default function Form26ASView() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
                            Form 26AS / Annual Information Statement (AIS)
                        </h1>
                        <p className="text-sm text-[#8899AA]">Access your consolidated tax statement directly from the Income Tax portal.</p>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 shadow-lg flex items-start space-x-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0066FF]/10 to-transparent pointer-events-none"></div>

                    <div className="w-16 h-16 bg-[#0066FF]/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#0066FF] border border-[#0066FF]/20">
                        <FileText size={32} />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Connect to IT Portal</h3>
                        <p className="text-sm text-[#8899AA] mb-6 leading-relaxed">
                            Form 26AS is a consolidated annual tax statement issued by the Income Tax Department. It contains details of tax deducted on your behalf by employers, banks, and other deductors. HRFlow can redirect you securely to download your latest statement.
                        </p>

                        <div className="flex space-x-4">
                            <button className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center">
                                Login to e-Filing Portal <ExternalLink size={16} className="ml-2" />
                            </button>
                            <button className="px-6 py-2.5 bg-transparent border border-[#2A3A4A] text-white font-bold text-sm rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center">
                                Fetch Summary (OTP required) <RefreshCw size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Important Notes */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl p-5">
                        <h4 className="flex items-center text-sm font-bold text-white mb-3">
                            <ShieldAlert size={16} className="text-[#FFB800] mr-2" /> Why check Form 26AS?
                        </h4>
                        <ul className="text-sm text-[#8899AA] space-y-2 list-disc pl-4 marker:text-[#556677]">
                            <li>Verify that the TDS deducted by your employer has been successfully deposited against your PAN.</li>
                            <li>Check for any TDS deducted on interest income by your banks.</li>
                            <li>Ensure no mismatch exists before filing your Income Tax Return to avoid notices.</li>
                        </ul>
                    </div>

                    <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl p-5 text-sm">
                        <h4 className="flex items-center text-sm font-bold text-white mb-3">
                            <CheckCircle2 size={16} className="text-[#00E5A0] mr-2" /> HRFlow Auto-Reconciliation
                        </h4>
                        <p className="text-[#8899AA] mb-4">
                            Your employer regularly runs backend reconciliations between HRFlow TDS records and TRACES portal data.
                        </p>
                        <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] px-3 py-2 rounded-lg font-bold text-xs flex items-center">
                            Last matched on: 05 Feb 2025. No discrepancies found.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
