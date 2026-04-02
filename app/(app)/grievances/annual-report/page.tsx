"use client";
import React from 'react';
import { FileBadge, ArrowRight, Save, Building2, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export default function ICAnnualReportScreen() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6 py-10">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                    <FileBadge size={28} />
                </div>
                <h1 className="text-3xl font-black text-white mb-2">Generate Annual POSH Report</h1>
                <p className="text-[#8899AA] text-sm max-w-xl mx-auto">
                    Section 21 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 requires the IC to prepare an annual report for the Employer and District Officer.
                </p>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                {/* Official Header Mockup */}
                <div className="border-b-2 border-double border-[#2A3A4A] pb-8 mb-8 text-center relative">
                    <span className="absolute right-0 top-0 text-[10px] font-mono text-[#556677] border border-[#2A3A4A] px-2 py-1 bg-[#131B2B] rounded">FORM REF: POSH-ANNUAL-01</span>
                    <Building2 size={32} className="text-[#556677] mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-1">INTERNAL COMPLAINTS COMMITTEE</h2>
                    <p className="text-sm text-[#8899AA] uppercase tracking-wider">Annual Statutory Report for Calendar Year 2026</p>
                </div>

                <div className="space-y-8">

                    {/* Auto-gathered Data Section */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2 flex items-center gap-2">
                            System-Generated Data (Under Section 21)
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex justify-between items-center group">
                                <span className="text-sm text-[#8899AA]">(a) Complaints received in the year</span>
                                <span className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">14</span>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex justify-between items-center group">
                                <span className="text-sm text-[#8899AA]">(b) Complaints disposed off</span>
                                <span className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">12</span>
                            </div>
                            <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 flex justify-between items-center group">
                                <span className="text-sm text-[#8899AA]">(c) Pending for &gt; 90 days</span>
                                <span className="text-xl font-black text-rose-400">2</span>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex justify-between items-center group">
                                <span className="text-sm text-[#8899AA]">(d) Action taken nature</span>
                                <span className="text-sm font-bold text-white flex items-center gap-1"><FileText size={14} className="text-[#556677]" /> See Annexure A</span>
                            </div>
                        </div>
                    </div>

                    {/* Manual Input Section */}
                    <div>
                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2">
                            Additional Required Information
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#8899AA] block">(e) Number of workshops or awareness programs carried out</label>
                                <input type="number" defaultValue={4} className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#8899AA] block">Details of workshops (Dates, Audience, Topics)</label>
                                <textarea
                                    rows={4}
                                    defaultValue="- Mar 8: Women's Day POSH Refresher (All Staff)\n- Jul 15: Manager Sensitization Workshop (Leadership)\n- Oct 5: IC Committee legal framework update\n- Dec 1: Mandatory e-learning module rollout"
                                    className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-emerald-500 resize-none text-sm leading-relaxed font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sign Off */}
                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-6 mt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#3A4A5A] text-emerald-500 focus:ring-emerald-500 bg-[#131B2B]" />
                            <span className="text-sm text-[#8899AA]">I hereby certify that the above information is accurate and reflects the complete record of the Internal Complaints Committee.</span>
                        </div>
                        <div className="flex justify-between items-end border-t border-[#1A2A3A] pt-4 mt-2">
                            <div>
                                <div className="font-script text-2xl text-white transform -rotate-3 mb-1 opacity-80">Meera Venkatesh</div>
                                <div className="text-xs font-bold text-[#556677] uppercase tracking-wider">Presiding Officer Signature</div>
                            </div>
                            <div className="text-xs text-[#556677] font-bold text-right">
                                Date: \n Oct 24, 2026
                            </div>
                        </div>
                    </div>

                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#1A2A3A]">
                    <button className="text-[#8899AA] hover:text-white font-bold text-sm transition-colors flex items-center gap-2">
                        <Save size={16} /> Save Draft
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/20">
                        Generate Official PDF <ArrowRight size={16} />
                    </button>
                </div>

            </div>
        </div>
    );
}
