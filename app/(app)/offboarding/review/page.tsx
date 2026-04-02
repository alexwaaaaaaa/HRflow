"use client";
import React from 'react';
import { UserMinus, CheckCircle2, ShieldAlert, CalendarClock, MessageSquare } from 'lucide-react';

export default function ManagerReviewScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><UserMinus size={24} className="text-indigo-400" /> Manager Review: Resignation</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Review employee resignation request, confirm dates, and initiate handover processes.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#131B2B] border-2 border-[#2A3A4A] flex items-center justify-center text-white font-bold text-xl shrink-0">
                        DP
                    </div>
                    <div>
                        <div className="text-rose-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><ShieldAlert size={12} /> Critical Role Departure</div>
                        <h2 className="text-xl font-bold text-white mb-0.5">David Palmer</h2>
                        <span className="text-sm text-[#8899AA]">Lead Infrastructure Engineer</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[#131B2B] rounded-xl border border-[#2A3A4A] p-3 px-5 text-center">
                        <div className="text-[#556677] text-[10px] uppercase font-bold mb-1">Notice Date</div>
                        <div className="text-white font-mono text-sm">Oct 15, 2025</div>
                    </div>
                    <div className="bg-amber-500/10 rounded-xl border border-amber-500/30 p-3 px-5 text-center">
                        <div className="text-amber-500/70 text-[10px] uppercase font-bold mb-1">Requested LWD</div>
                        <div className="text-amber-400 font-mono text-sm font-bold">Nov 15, 2025</div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Resignation Details</h3>
                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-[#556677] uppercase block mb-1">Primary Reason Stated</label>
                                <div className="text-white text-sm bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 inline-block">Career Growth / Better Opportunity</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#556677] uppercase block mb-2">Employee Remarks</label>
                                <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-xl p-4 text-[#AABBCC] text-sm leading-relaxed italic border-l-4 border-l-indigo-500">
                                    "After 4 incredible years at the company, I have decided to move on to pursue a Senior Principal role at a startup. I am committed to ensuring a smooth handover of the infra migration project before my departure..."
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Manager Action: LWD Confirmation</h3>

                        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 mb-6 flex gap-3">
                            <CalendarClock size={20} className="text-sky-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sky-400 font-bold text-sm mb-1">Shortfall Request Detected</h4>
                                <p className="text-sky-200/70 text-xs">Employee has requested an LWD of <strong className="text-white">Nov 15</strong>, which is a <strong className="text-white">30 day shortfall</strong> from the contractual 60-day notice requirement.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl cursor-pointer hover:bg-emerald-500/10 transition-colors">
                                <div>
                                    <div className="text-white font-bold text-sm mb-1 flex items-center gap-2">Accept Requested Date <span className="text-emerald-400"><CheckCircle2 size={16} /></span></div>
                                    <div className="text-[#8899AA] text-xs">Nov 15, 2025. Wave shortfall recovery.</div>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-500/20"></div>
                            </div>
                            <div className="flex items-center justify-between p-4 border border-[#2A3A4A] bg-[#131B2B] rounded-xl cursor-pointer hover:border-[#3A4A5A] transition-colors opacity-70">
                                <div>
                                    <div className="text-white font-bold text-sm mb-1">Enforce Contractual Date</div>
                                    <div className="text-[#8899AA] text-xs">Dec 14, 2025. Standard 60 days.</div>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-[#556677]"></div>
                            </div>
                            <div className="flex items-center justify-between p-4 border border-[#2A3A4A] bg-[#131B2B] rounded-xl cursor-pointer hover:border-[#3A4A5A] transition-colors opacity-70">
                                <div>
                                    <div className="text-white font-bold text-sm mb-1">Custom Date (Subject to buyout)</div>
                                    <div className="text-[#8899AA] text-xs">Select a different date; HR will calculate buyout.</div>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-[#556677]"></div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button className="px-5 py-2.5 rounded-xl border border-[#2A3A4A] text-[#8899AA] font-bold text-sm hover:text-white hover:bg-[#131B2B] transition-colors">Reject Request</button>
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm">
                                Approve & Proceed
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Retention & Handover</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-[#556677] uppercase block mb-2">Is the employee eligible for re-hire?</label>
                                <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
                                    <option>Yes, unconditionally</option>
                                    <option>Yes, with conditions</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-[#556677] uppercase block mb-2">Assign Knowledge Transfer Lead</label>
                                <select className="w-full bg-[#131B2B] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
                                    <option>Select team member...</option>
                                    <option>Sarah Jenkins</option>
                                    <option>Aisha Patel</option>
                                </select>
                            </div>
                            <div className="pt-4 mt-2 border-t border-[#1A2A3A]">
                                <button className="w-full border border-indigo-500/30 text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 font-bold py-2 rounded-lg text-xs transition-colors py-2.5">
                                    Flag for Retention Chat (HRBP)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
