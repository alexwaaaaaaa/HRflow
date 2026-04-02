"use client";
import React from 'react';
import { UploadCloud, Link as LinkIcon, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImportFromGreytHRScreen() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col justify-center">
            <div className="mb-8">
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors w-fit">
                    <ChevronLeft size={16} /> Back to Setup
                </Link>
            </div>

            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl relative overflow-hidden ring-4 ring-white/10">
                    <span className="text-xl font-black text-blue-600">greytHR</span>
                </div>
                <h1 className="text-3xl font-black text-white mb-2">Import from GreytHR</h1>
                <p className="text-[#8899AA] text-base max-w-xl mx-auto">
                    Bring your existing payroll configurations, tax declarations, and employee records from GreytHR effortlessly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 md:p-8">

                {/* Method 1: API */}
                <div className="bg-[#060D1A] border border-blue-500/30 rounded-xl p-6 relative group overflow-hidden hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended</div>

                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                        <LinkIcon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">GreytHR API Sync</h3>
                    <p className="text-[#8899AA] text-sm mb-6">
                        Use your GreytHR domain and API token to automate the migration of active employees, salaries, and YTD tax data.
                    </p>

                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
                        Connect Account <ArrowRight size={16} />
                    </button>

                </div>

                {/* Method 2: CSV */}
                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-6 relative group hover:border-[#3A4A5A] transition-colors cursor-pointer flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-[#8899AA] mb-6 border border-[#2A3A4A]">
                            <UploadCloud size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Upload Data Exports</h3>
                        <p className="text-[#8899AA] text-sm mb-6">
                            Export the "Employee Master" and "Payroll Summary" reports from GreytHR and upload them here.
                        </p>
                    </div>

                    <div>
                        <Link href="/onboarding/import/mapping" className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors mb-4">
                            Upload Excel Files <UploadCloud size={16} />
                        </Link>
                        <a href="#" className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-1">Supported GreytHR Report Formats</a>
                    </div>
                </div>

            </div>
        </div>
    );
}
