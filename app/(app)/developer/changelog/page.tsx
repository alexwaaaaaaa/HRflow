"use client";
import React from 'react';
import { FileClock, Plus, Calendar } from 'lucide-react';

export default function ApiChangelogPage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileClock className="text-[#00E5A0]" />
                        API Changelog & Versions
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Track updates, deprecations, and new features added to the Kaarya API.</p>
                </div>
            </div>

            <div className="relative border-l border-[#1A2A3A] ml-6 pl-8 space-y-12 py-4">

                {/* Release v2.4 */}
                <div className="relative">
                    <div className="absolute -left-[45px] top-1 w-6 h-6 rounded-full border-4 border-[#060D1A] bg-[#00E5A0] z-10" />

                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#00E5A0]/10 text-[#00E5A0] font-bold px-3 py-1 rounded border border-[#00E5A0]/20 text-sm">v2.4.0 (Latest)</span>
                        <span className="text-[#556677] text-sm flex items-center gap-1"><Calendar size={14} /> October 12, 2024</span>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 space-y-4">
                        <div>
                            <h4 className="text-white font-bold flex items-center gap-2 mb-2"><Plus size={16} className="text-emerald-400" /> New Features</h4>
                            <ul className="list-disc list-inside text-sm text-[#CCDDEE] space-y-1 font-mono">
                                <li>Added <span className="text-indigo-300">GET /v2/analytics/headcount</span> to aggregate team sizes.</li>
                                <li>Introduced <span className="text-amber-300">timezone</span> field in the Employee object response.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold flex items-center gap-2 mb-2"><span className="w-4 h-4 rounded bg-amber-500/20 text-amber-500 flex justify-center items-center text-[10px] font-bold">~</span> Modifications</h4>
                            <ul className="list-disc list-inside text-sm text-[#CCDDEE] space-y-1 font-mono">
                                <li>Increased rate limit for Webhook Retries from 3 to 5 limit.</li>
                                <li>Pagination metadata now includes <span className="text-indigo-300">total_pages</span>.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Release v2.3.1 */}
                <div className="relative">
                    <div className="absolute -left-[45px] top-1 w-6 h-6 rounded-full border-4 border-[#060D1A] bg-indigo-500 z-10" />

                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#1A2A3A] text-[#CCDDEE] font-bold px-3 py-1 rounded border border-[#2A3A4A] text-sm">v2.3.1</span>
                        <span className="text-[#556677] text-sm flex items-center gap-1"><Calendar size={14} /> August 28, 2024</span>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 space-y-4 opacity-80">
                        <div>
                            <h4 className="text-white font-bold flex items-center gap-2 mb-2"><span className="w-4 h-4 rounded bg-rose-500/20 text-rose-500 flex justify-center items-center text-[10px] font-bold">-</span> Deprecations</h4>
                            <p className="text-sm text-[#CCDDEE] font-mono leading-relaxed">
                                The <span className="text-rose-300 line-through">GET /v2/reports/legacy</span> endpoint will be fully disabled on Dec 31, 2024. Please migrate to the new Analytics API endpoints.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
