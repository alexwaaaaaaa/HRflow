"use client";

import React, { useState } from 'react';
import { BookMarked, ArrowLeft, AlertCircle, FileText, CheckCircle, ExternalLink, Activity, Users, FileSignature, ShieldAlert } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function GazetteChangeDetailPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-80px)]">

            {/* Header / Nav */}
            <div className="mb-6 shrink-0 flex flex-col">
                <Link href="/ai/gazette-monitor" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit mb-4">
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Gazette Monitor</span>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] mt-1">
                            <BookMarked size={28} className="text-indigo-400" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h1 className="text-2xl font-bold text-white tracking-tight">Amendment to Minimum Wages Act (Karnataka)</h1>
                                <span className="px-2.5 py-1 bg-red-500/10 text-red-400 text-[10px] rounded border border-red-500/20 font-bold uppercase tracking-wider">
                                    High Impact
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-[#8899AA] text-sm">
                                <span>Ref: GAZ-2023-10-A</span>
                                <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                <span>Published: Oct 15, 2023</span>
                                <span className="w-1 h-1 rounded-full bg-[#445566]" />
                                <span className="text-amber-500 font-medium">Effective Deadline: Nov 1, 2023</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        <Button variant="secondary" className="border-[#2A3A4A] text-white">
                            <ExternalLink size={16} className="mr-2" /> View Original PDF
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">

                {/* AI Summary & Source Text */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-[#0D1928] border border-indigo-500/30 p-6 md:p-8 rounded-2xl relative overflow-hidden flex-1 shadow-lg">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
                            <Activity size={20} className="text-indigo-400" /> Kaarya Legal AI Synthesis
                        </h3>

                        <div className="prose prose-invert max-w-none prose-sm prose-p:text-[#8899AA] prose-p:leading-relaxed prose-strong:text-white relative z-10 space-y-4">
                            <p>
                                The Government of Karnataka has issued a gazette notification updating the basic Dearness Allowance (DA) by <strong className="text-emerald-400">₹450/month</strong> across all skill categories (Unskilled, Semi-skilled, Skilled, Highly Skilled) under the Minimum Wages Act, 1948.
                            </p>
                            <p>
                                This revision mandates an immediate corresponding increase in the gross salary structure to maintain statutory compliance. Failure to comply by the November payroll cycle will result in retrospective arrears calculation and potential spot-penalties during labor inspections.
                            </p>

                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 mt-6">
                                <h4 className="text-sm font-semibold text-white mb-3">Extracted Formula Changes</h4>
                                <code className="block bg-[#0A1420] text-blue-400 p-3 rounded-lg text-xs font-mono border border-[#1A2A3A]">
                                    NEW_VDA = OLD_VDA + (CPI_INCREASE * RATE_PER_POINT) <br />
                                    <span className="text-[#8899AA]">// Approx ₹450 variance detected for base locations in Zone I</span>
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl">
                        <h3 className="text-white font-semibold mb-4">Impacted Population</h3>
                        <div className="flex items-center justify-between p-4 bg-[#131B2B] rounded-xl border border-[#2A3A4A] mb-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#1A2A3A] p-3 rounded-lg text-[#8899AA]">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">24</div>
                                    <div className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold">Affected Employees</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-white">Facility Management Staff</div>
                                <div className="text-xs text-[#8899AA]">Location: Bangalore (Zone I)</div>
                            </div>
                        </div>
                        <p className="text-xs text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                            <ShieldAlert size={14} className="inline mr-1" /> Financial impact estimated at ₹10,800/month across the pool.
                        </p>
                    </div>
                </div>

                {/* Workflow & Actions */}
                <div className="flex flex-col gap-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-[100px] -translate-y-8 translate-x-8 pointer-events-none" />

                        <h3 className="text-lg font-semibold text-white mb-6">Execution Workflow</h3>

                        <div className="relative pl-6 border-l-2 border-[#1A2A3A] space-y-8 pb-4">

                            <div className="relative">
                                <span className="absolute -left-[31px] bg-indigo-500/20 border border-indigo-500 w-4 h-4 rounded-full flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                </span>
                                <h5 className="text-sm font-medium text-white mb-1">1. Review AI Impact Analysis</h5>
                                <p className="text-xs text-[#8899AA] leading-relaxed">
                                    Kaarya has identified 24 employees earning below the new required minimum.
                                </p>
                            </div>

                            <div className="relative opacity-60">
                                <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full" />
                                <h5 className="text-sm font-medium text-white mb-1">2. Auto-Adjust Salary Structures</h5>
                                <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                                    Generate new salary breakdowns updating the VDA component by ₹450 for the affected pool.
                                </p>
                                <Button disabled className="w-full bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] text-xs h-auto py-2">
                                    <FileSignature size={14} className="mr-2" /> Generate Revisions
                                </Button>
                            </div>

                            <div className="relative opacity-60">
                                <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full" />
                                <h5 className="text-sm font-medium text-white mb-1">3. Approval & Payroll Sync</h5>
                                <p className="text-xs text-[#8899AA] leading-relaxed mb-3">
                                    Route the revised structures to Finance Head for 1-click approval and inject into November payroll.
                                </p>
                                <Button disabled className="w-full bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] text-xs h-auto py-2">
                                    <CheckCircle size={14} className="mr-2" /> Sync to Payroll
                                </Button>
                            </div>

                        </div>

                        <div className="mt-4 pt-6 border-t border-[#1A2A3A]">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2.5">
                                Start Workflow
                            </Button>
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl">
                        <div className="text-xs text-[#8899AA] mb-2 uppercase tracking-wider font-semibold">Audit Trail</div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-[#131B2B] p-2 rounded-lg border border-[#2A3A4A]">
                                <span className="text-xs text-[#8899AA]">Oct 15, 08:30 AM</span>
                                <span className="text-xs text-white">Parsed via Kaarya Bot</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#131B2B] p-2 rounded-lg border border-[#2A3A4A]">
                                <span className="text-xs text-[#8899AA]">Oct 15, 08:32 AM</span>
                                <span className="text-xs text-indigo-400">Impact Analysis generated</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
