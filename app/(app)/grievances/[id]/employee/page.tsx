"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { ShieldCheck, MessageSquare, Paperclip, Clock, ArrowLeft, CheckCircle2, User, FileText } from 'lucide-react';
import Link from 'next/link';

export default function GrievanceDetailEmployeeScreen() {
    return (
        <Page
            title="Case #GRV-2026-142"
            subtitle="Reported on Oct 24, 2026 • Category: Workplace Harassment"
            breadcrumbs={[{ label: "Grievances", href: "/grievances" }, { label: "Id" }, { label: "Employee" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4 border-b border-[#1A2A3A] pb-4 mb-4">
                <Link href="/grievances/employee-dashboard" className="text-[#556677] hover:text-white transition-colors bg-[#0A1420] border border-[#1A2A3A] p-2 rounded-lg">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-xl font-bold text-white">Case #GRV-2026-142</h1>
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Investigating</span>
                    </div>
                    <p className="text-[#8899AA] text-sm">Reported on Oct 24, 2026 • Category: Workplace Harassment</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content Pane */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Progress Tracker */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8 relative z-10">Case Progress Timeline</h3>

                        <div className="relative z-10">
                            <div className="absolute left-4 top-2 bottom-6 w-0.5 bg-[#1A2A3A]" />

                            <div className="space-y-8">
                                <div className="flex gap-4 relative">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0 z-10 mt-[-4px]">
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Grievance Submitted</h4>
                                        <p className="text-xs text-[#556677] mt-1">Oct 24, 10:45 AM</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 relative">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0 z-10 mt-[-4px]">
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Committee Assigned</h4>
                                        <p className="text-xs text-[#556677] mt-1">Primary contact: Meera V. (Head of HR)</p>
                                        <p className="text-xs text-[#556677]">Oct 24, 02:30 PM</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 relative">
                                    <div className="w-8 h-8 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] border-4 border-[#0A1420] flex items-center justify-center shrink-0 z-10 mt-[-4px] animate-pulse">
                                        <Clock size={14} className="text-[#0A1420]" />
                                    </div>
                                    <div>
                                        <h4 className="text-amber-400 font-bold text-sm">Investigation Ongoing</h4>
                                        <p className="text-xs text-[#8899AA] mt-1">We are reviewing the evidence and may contact you for a statement.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 relative opacity-40">
                                    <div className="w-8 h-8 rounded-full bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center shrink-0 z-10 mt-[-4px]" />
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Resolution Proposed</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Original Complaint Details */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-4 border-b border-[#1A2A3A] flex items-center gap-2">
                            <FileText size={16} className="text-[#556677]" /> Original Complaint
                        </h3>
                        <div className="prose prose-invert prose-sm max-w-none text-[#CCDDEE] leading-relaxed mb-6">
                            <p>On October 23rd, during the Q3 planning meeting, the project manager made repeatedly inappropriate and offensive remarks regarding my background despite me asking him to stop.</p>
                            <p>This is not the first occurrence. I have attached the meeting notes and a screenshot of subsequent slack messages where he continued this behavior in a public channel.</p>
                        </div>

                        <div className="bg-[#060D1A] rounded-xl p-4 border border-[#1A2A3A]">
                            <h4 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-3">Attached Evidence</h4>
                            <div className="flex gap-3">
                                <div className="bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg flex items-center gap-3 w-48 hover:border-[#3A4A5A] transition-colors cursor-pointer group">
                                    <div className="bg-[#0A1420] p-1.5 rounded"><Paperclip size={16} className="text-[#556677]" /></div>
                                    <div className="overflow-hidden">
                                        <div className="text-sm text-white font-medium truncate group-hover:text-indigo-400 transition-colors">slack_logs.png</div>
                                        <div className="text-xs text-[#556677]">1.2 MB</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secure Messaging Sidebar */}
                <div className="lg:col-span-1 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-[700px] overflow-hidden">
                    <div className="p-4 bg-[#060D1A] border-b border-[#1A2A3A] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-emerald-500" size={18} />
                            <h3 className="font-bold text-white text-sm">Secure Channel</h3>
                        </div>
                        <span className="text-[10px] text-[#556677] uppercase tracking-wider font-bold">Encrypted</span>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0A1420]">
                        <div className="text-center text-xs text-[#556677] font-bold mb-6">Oct 24, 2026</div>

                        {/* Auto Message */}
                        <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg text-sm text-[#8899AA] mx-4 text-center">
                            Case assigned to the Internal Complaints Committee. Wait time for first response is typically 24-48 hours.
                        </div>

                        {/* HR Message */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-500/30">
                                MV
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-xl rounded-tl-sm text-sm text-[#CCDDEE] shadow-sm">
                                Hello. My name is Meera, and I will be leading the review of your case. Thank you for coming forward. We are currently reviewing the slack logs you attached. <br /><br />
                                To proceed, would you be available for a short, confidential zoom call tomorrow at 11 AM?
                                <div className="text-[10px] text-[#556677] text-right mt-2">02:45 PM</div>
                            </div>
                        </div>

                        {/* Employee Message */}
                        <div className="flex items-start gap-3 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center font-bold text-xs shrink-0 border border-[#2A3A4A]">
                                <User size={14} />
                            </div>
                            <div className="bg-indigo-600 border border-indigo-500 text-white p-3 rounded-xl rounded-tr-sm text-sm shadow-md">
                                Yes, tomorrow at 11 AM works for me. Please send the link.
                                <div className="text-[10px] text-indigo-200 text-right mt-2">03:10 PM ✓✓</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-[#060D1A] border-t border-[#1A2A3A]">
                        <div className="relative">
                            <textarea
                                placeholder="Type a secure message..."
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-xl pl-4 pr-12 py-3 text-sm resize-none outline-none focus:border-indigo-500 h-[60px]"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                                <MessageSquare size={14} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
