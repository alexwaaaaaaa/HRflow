"use client";
import React, { useState } from 'react';
import { UploadCloud, Link as LinkIcon, Database, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImportFromKekaScreen() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col justify-center">
            <div className="mb-8">
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors w-fit">
                    <ChevronLeft size={16} /> Back to Setup
                </Link>
            </div>

            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#101828] to-[#1D2939] border border-[#344054] rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl relative overflow-hidden">
                    {/* Keka Logo Mockup */}
                    <span className="text-2xl font-black text-white">keka</span>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/20 blur-xl rounded-full" />
                </div>
                <h1 className="text-3xl font-black text-white mb-2">Import from Keka</h1>
                <p className="text-[#8899AA] text-base max-w-xl mx-auto">
                    Securely migrate your employee data, leave balances, and historical payroll records directly from Keka HR.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 md:p-8">

                {/* Method 1: API */}
                <div className="bg-[#060D1A] border border-indigo-500/30 rounded-xl p-6 relative group overflow-hidden hover:border-indigo-400 transition-colors cursor-pointer">
                    <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended</div>

                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                        <LinkIcon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Direct API Sync</h3>
                    <p className="text-[#8899AA] text-sm mb-6">
                        Enter your Keka API keys to automatically fetch all org data, policies, and documents in minutes without CSV files.
                    </p>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors">
                        Connect Account <ArrowRight size={16} />
                    </button>

                    <p className="mt-4 text-xs flex items-center justify-center gap-1 text-[#556677] font-medium">
                        <ShieldCheck size={14} className="text-emerald-500" /> Bank-grade AES-256 encryption
                    </p>
                </div>

                {/* Method 2: CSV */}
                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-6 relative group hover:border-[#3A4A5A] transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-[#8899AA] mb-6 border border-[#2A3A4A]">
                        <UploadCloud size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Upload Data Exports</h3>
                    <p className="text-[#8899AA] text-sm mb-6">
                        Download the standard employee and payroll reports from Keka and upload the CSV/Excel files here.
                    </p>

                    <Link href="/onboarding/import/mapping" className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors">
                        Upload Files <UploadCloud size={16} />
                    </Link>

                    <div className="mt-4 flex flex-col gap-2">
                        <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center justify-center gap-1">How to export from Keka?</a>
                        <a href="#" className="text-xs text-[#556677] hover:text-[#8899AA] font-bold flex items-center justify-center gap-1">Download Kaarya Template</a>
                    </div>
                </div>

            </div>
        </div>
    );
}
