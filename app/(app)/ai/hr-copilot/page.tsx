"use client";

import React, { useState } from 'react';
import { Sparkles, BrainCircuit, ArrowRight, MousePointerClick, CheckCircle, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HRCopilotPage() {
    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <BrainCircuit size={28} className="text-purple-400" /> HR Copilot
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Your intelligent co-pilot for automating complex HR workflows, drafting communications, and executing bulk actions instantly.
                    </p>
                </div>
            </div>

            <div className="flex gap-8 flex-1 min-h-0">

                {/* Left Panel: Scenarios */}
                <div className="w-1/3 flex flex-col shrink-0">
                    <h3 className="text-lg font-semibold text-white mb-4">Suggested Workflows</h3>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-2 flex-1 overflow-y-auto space-y-2">

                        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 cursor-pointer transition-colors relative">
                            <div className="absolute top-4 right-4 text-purple-400">
                                <Sparkles size={16} />
                            </div>
                            <h4 className="text-white font-medium text-sm mb-1 pr-6">Offboarding Automation</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                Draft custom exit emails, revoke IT access across 12 apps, and schedule the FnF calculation for 3 departing employees.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl hover:bg-[#131B2B] border border-transparent hover:border-[#2A3A4A] cursor-pointer transition-colors group">
                            <h4 className="text-white font-medium text-sm mb-1 group-hover:text-indigo-400 transition-colors">Performance Review Prep</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                Summarize 360-feedback, sync OKR completion rates, and draft initial manager review templates for the Product team.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl hover:bg-[#131B2B] border border-transparent hover:border-[#2A3A4A] cursor-pointer transition-colors group">
                            <h4 className="text-white font-medium text-sm mb-1 group-hover:text-indigo-400 transition-colors">Compensation Correction</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                Identify 14 employees below the new L3 band minimums and draft batch increment proposals for CFO approval.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl hover:bg-[#131B2B] border border-transparent hover:border-[#2A3A4A] cursor-pointer transition-colors group">
                            <h4 className="text-white font-medium text-sm mb-1 group-hover:text-indigo-400 transition-colors">Compliance Audit Fixes</h4>
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                Generate missing Form 16s for the last financial year and email them to the 42 affected ex-employees.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Right Panel: Execution Context */}
                <div className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="p-6 border-b border-[#1A2A3A] shrink-0 bg-[#0D1928]/80 backdrop-blur z-10">
                        <h2 className="text-xl font-semibold text-white">Execution Plan: Offboarding Automation</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-medium bg-[#1A2A3A] text-[#8899AA] px-2.5 py-1 rounded-md border border-[#2A3A4A]">3 Employees</span>
                            <span className="text-xs font-medium bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-md border border-amber-500/20">Requires Human Review</span>
                        </div>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto z-10">
                        <div className="space-y-6">

                            {/* Step 1 */}
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                        <CheckCircle size={14} className="text-emerald-400" />
                                    </div>
                                    <div className="w-px h-16 bg-[#2A3A4A] mx-auto mt-2" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium text-sm mb-2 text-emerald-400">Step 1: Draft Exit Communications</h4>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl text-sm text-[#8899AA]">
                                        Drafted 3 personalized farewell & exit interview emails based on employee tenure and role.
                                        <button className="text-purple-400 hover:text-purple-300 font-medium ml-2 transition-colors">Review Drafts</button>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                        <span className="text-xs font-bold text-white">2</span>
                                    </div>
                                    <div className="w-px h-24 bg-[#2A3A4A] mx-auto mt-2" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium text-sm mb-2 text-purple-400">Step 2: IT Access Revocation Schedule</h4>
                                    <div className="bg-[#131B2B] border border-purple-500/30 p-4 rounded-xl">
                                        <p className="text-sm text-[#8899AA] mb-4">
                                            Kaarya will automatically trigger Okta de-provisioning on their last working day at 5:00 PM IST.
                                        </p>
                                        <div className="flex gap-2 mb-3">
                                            {['Slack', 'Google Workspace', 'Jira', '+9 others'].map((app, i) => (
                                                <span key={i} className="text-xs bg-[#1A2A3A] px-2 py-1 rounded text-[#8899AA] border border-[#2A3A4A]">{app}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-4">
                                <div className="mt-1 shrink-0">
                                    <div className="w-6 h-6 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center">
                                        <span className="text-xs font-bold text-[#8899AA]">3</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium text-sm mb-2 text-[#8899AA]">Step 3: FnF Calculation Trigger</h4>
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-2 text-[#8899AA] text-sm">
                                            <Clock size={16} /> Pending Step 2 execution
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="p-6 border-t border-[#1A2A3A] bg-[#0A1420] shrink-0 z-10 flex justify-end gap-3">
                        <Button variant="secondary" className="border-[#2A3A4A] text-white">
                            Modify Plan
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-none py-2 px-6 h-auto">
                            Approve & Execute <MousePointerClick size={16} className="ml-2" />
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
