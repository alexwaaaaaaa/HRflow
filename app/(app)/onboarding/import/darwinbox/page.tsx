"use client";
import React from 'react';
import { UploadCloud, Link as LinkIcon, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ImportFromDarwinboxScreen() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col justify-center">
            <div className="mb-8">
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors w-fit">
                    <ChevronLeft size={16} /> Back to Setup
                </Link>
            </div>

            <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0A2540] to-[#041120] border border-[#1A3A5A] rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl relative overflow-hidden">
                    <span className="text-xl font-black text-white">darwin<br />box</span>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-sky-500/20 blur-xl rounded-full" />
                </div>
                <h1 className="text-3xl font-black text-white mb-2">Import from Darwinbox</h1>
                <p className="text-[#8899AA] text-base max-w-xl mx-auto">
                    Securely migrate your enterprise employee data, custom fields, and complex org structures natively to Kaarya.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 md:p-8">

                {/* Method 1: API */}
                <div className="bg-[#060D1A] border border-sky-500/30 rounded-xl p-6 relative group overflow-hidden hover:border-sky-400 transition-colors cursor-pointer">
                    <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-sky-500/20 text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended</div>

                    <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 mb-6 border border-sky-500/20">
                        <LinkIcon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Direct API Sync</h3>
                    <p className="text-[#8899AA] text-sm mb-6">
                        Provide your Darwinbox tenant URL and API credentials to sync vast amounts of data seamlessly in the background.
                    </p>

                    <button className="w-full bg-sky-600 hover:bg-sky-500 text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors shadow-lg shadow-sky-500/20">
                        Connect Account <ArrowRight size={16} />
                    </button>

                    <p className="mt-4 text-xs flex items-center justify-center gap-1 text-[#556677] font-medium">
                        <ShieldCheck size={14} className="text-emerald-500" /> Enterprise Grade Security
                    </p>
                </div>

                {/* Method 2: CSV */}
                <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-6 relative group hover:border-[#3A4A5A] transition-colors cursor-pointer flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-[#8899AA] mb-6 border border-[#2A3A4A]">
                            <UploadCloud size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Upload Data Exports</h3>
                        <p className="text-[#8899AA] text-sm mb-6">
                            Export your Data Studio reports from Darwinbox and map them to Kaarya's unified schema.
                        </p>
                    </div>

                    <div>
                        <Link href="/onboarding/import/mapping" className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors mb-4">
                            Upload CSV/ZIP <UploadCloud size={16} />
                        </Link>
                        <a href="#" className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center justify-center gap-1">View Darwinbox Export Guide</a>
                    </div>
                </div>

            </div>
        </div>
    );
}
