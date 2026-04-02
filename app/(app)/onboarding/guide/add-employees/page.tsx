"use client";
import React, { useState } from 'react';
import { UserPlus, ArrowRight, UploadCloud, Link as LinkIcon, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function AddEmployeesGuideScreen() {
    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col">

            <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <UserPlus size={20} />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg">Add Employees Guide</h2>
                        <p className="text-[#556677] text-xs font-mono">Step 1 of 1</p>
                    </div>
                </div>
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save & Exit
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6">

                <h1 className="text-4xl font-black text-white mb-4 text-center">How do you want to add people?</h1>
                <p className="text-[#8899AA] mb-12 max-w-xl text-center">
                    Whether you have 10 employees or 10,000, Kaarya offers multiple ways to ingest your workforce data securely.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">

                    {/* Option 1 */}
                    <Link href="/onboarding/import" className="bg-[#0A1420] border border-[#1A2A3A] hover:border-indigo-500/50 rounded-2xl p-8 transition-all group flex flex-col h-full hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/10">
                        <div className="w-16 h-16 bg-[#131B2B] rounded-2xl flex items-center justify-center text-indigo-400 mb-6 border border-[#2A3A4A] group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-colors">
                            <UploadCloud size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Bulk Import (CSV/Excel)</h3>
                        <p className="text-[#8899AA] text-sm mb-8 flex-1">
                            Download our perfectly formatted template, fill in your team's details, and upload it in one go. Best for mid-sized teams.
                        </p>
                        <div className="text-indigo-400 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Start Bulk Import <ArrowRight size={16} />
                        </div>
                    </Link>

                    {/* Option 2 */}
                    <Link href="/onboarding/import/darwinbox" className="bg-[#0A1420] border border-sky-500/30 rounded-2xl p-8 transition-all group flex flex-col h-full relative overflow-hidden shadow-xl shadow-sky-500/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-2xl rounded-full" />
                        <div className="absolute top-4 right-4 bg-sky-500/20 text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Fastest</div>

                        <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 mb-6 border border-sky-500/20 relative z-10">
                            <LinkIcon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Connect HRMS / ATS</h3>
                        <p className="text-[#8899AA] text-sm mb-8 flex-1 relative z-10">
                            Migrating from Keka, Darwinbox, or GreytHR? Simply authenticate and we'll sync your entire org hierarchy and data automatically.
                        </p>
                        <div className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">
                            Connect System <ArrowRight size={16} />
                        </div>
                    </Link>

                    {/* Option 3 */}
                    <button className="bg-[#0A1420] border border-[#1A2A3A] hover:border-[#3A4A5A] rounded-2xl p-8 transition-all group flex flex-col h-full text-left">
                        <div className="w-16 h-16 bg-[#131B2B] rounded-2xl flex items-center justify-center text-[#8899AA] mb-6 border border-[#2A3A4A] transition-colors">
                            <Edit3 size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Add Manually</h3>
                        <p className="text-[#8899AA] text-sm mb-8 flex-1">
                            Add employees one by one through a quick form. Good for founders just starting out with their first few hires.
                        </p>
                        <div className="text-[#556677] group-hover:text-white text-sm font-bold flex items-center gap-2 transition-colors">
                            Open Form <ArrowRight size={16} />
                        </div>
                    </button>

                </div>
            </div>

        </div>
    );
}
