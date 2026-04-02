"use client";
import React, { useState } from "react";
import { CopyPlus, ArrowRight, Activity, Zap, CheckCircle2, Bot } from "lucide-react";

export default function OnboardingTrigger() {
    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="text-center mb-10 mt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0066FF] to-[#00E5A0] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.3)] rotate-3">
                    <CopyPlus size={36} className="text-white -rotate-3" />
                </div>
                <h1 className="text-4xl font-black mb-2 tracking-tight">Trigger Core HR Handover</h1>
                <p className="text-[#8899AA] max-w-[500px] mx-auto leading-relaxed">Rahul Sharma has cleared BGV and accepted the offer. Trigger the automated workflow to convert them into an Employee in the core database.</p>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF] opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Zap size={20} className="text-[#00E5A0]" /> Workflow Automation Setup
                </h3>

                <div className="space-y-6 relative z-10">

                    {/* Action 1 */}
                    <div className="flex items-start gap-4 p-4 border border-[#2A3A4A] bg-[#0A1420] rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center font-bold font-mono text-xs shrink-0 border border-[#445566]">01</div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base mb-1">Create Employee Profile (Database)</h4>
                            <p className="text-xs text-[#8899AA] mb-4">Transfer personal data, compensation info, and documents from ATS to Core Employee profile table automatically.</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-[#445566] uppercase mb-1">Emp ID Generation</label>
                                    <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]">
                                        <option>Auto-assign Series (TC-XXXX)</option>
                                        <option>Manual Entry later</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[#445566] uppercase mb-1">Module Sync</label>
                                    <div className="h-10 border border-[#00E5A0]/30 bg-[#00E5A0]/5 rounded-xl px-3 text-xs text-[#00E5A0] font-bold flex items-center gap-2">
                                        <CheckCircle2 size={14} /> Payroll Engine & PMS Linked
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action 2 */}
                    <div className="flex items-start gap-4 p-4 border border-[#2A3A4A] bg-[#0A1420] rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center font-bold font-mono text-xs shrink-0 border border-[#445566]">02</div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base mb-1">Provision IT Access & Hardware</h4>
                            <p className="text-xs text-[#8899AA] mb-4">Auto-generate IT service desk tickets for laptop procurement and email account creation.</p>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-[#445566] uppercase mb-1">Hardware Policy (SDE)</label>
                                    <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]">
                                        <option>Apple MacBook Pro 16" M3</option>
                                        <option>Apple MacBook Pro 14" M3</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-[#445566] uppercase mb-1">Access Groups (SSO)</label>
                                    <input value="Engineering, GitHub, AWS Dev" readOnly className="w-full h-10 bg-[#1A2A3A] border border-[#1A2A3A] rounded-xl px-3 text-sm text-[#8899AA] cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action 3 */}
                    <div className="flex items-start gap-4 p-4 border border-[#2A3A4A] bg-[#0A1420] rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center font-bold font-mono text-xs shrink-0 border border-[#445566]">03</div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base mb-1">Assign Onboarding Plan</h4>
                            <div className="flex items-center gap-4 mt-3">
                                <button className="h-10 px-4 bg-[#060B14] border border-[#0066FF] text-[#0066FF] text-xs font-bold rounded-xl hover:bg-[#0066FF]/10 transition-colors">
                                    Software Engineering Plan (30 Days)
                                </button>
                                <div className="flex items-center gap-2 text-xs font-medium text-[#8899AA]">
                                    <Bot size={14} className="text-[#9B59B6]" /> Kaarya AI Buddy initialized
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button className="w-full h-14 bg-gradient-to-r from-[#0066FF] to-[#00E5A0] text-white text-base font-black rounded-2xl hover:brightness-110 flex justify-center items-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,229,160,0.2)]">
                        Execute Handover Protocol <ArrowRight size={20} />
                    </button>
                    <p className="text-center text-[11px] text-[#8899AA] mt-3">This action cannot be undone. Notifications will be sent to Candidate, Hiring Manager, and IT.</p>
                </div>
            </div>
        </div>
    );
}
