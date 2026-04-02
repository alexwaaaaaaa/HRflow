"use client";
import React from 'react';
import { LayoutDashboard, Wallet, Calendar, FileText, CheckCircle2, TrendingUp, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ESSDashboardScreen() {
    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <LayoutDashboard size={24} className="text-indigo-400" /> Welcome back, Anita K.
                </h1>
                <div className="text-sm font-bold bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl border border-indigo-500/20">
                    Engineering Department · Join Date: 12 Jan 2022
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Quick Pay Snapshot */}
                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h3 className="text-[#AABBCC] text-sm font-bold uppercase tracking-wider mb-2">Latest Payslip — March 2026</h3>
                        <div className="flex items-end gap-3 mb-6 relative z-10">
                            <span className="text-4xl font-black text-white">₹1,74,250</span>
                            <span className="text-emerald-400 text-sm font-bold flex items-center gap-1 mb-1"><TrendingUp size={16} /> Net Take Home</span>
                        </div>
                        <div className="flex gap-4 relative z-10">
                            <Link href="/ess/payslips" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                                <FileText size={16} /> View Full Payslip
                            </Link>
                            <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                                <Download size={16} /> Download PDF
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/tax/declaration" className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 hover:border-indigo-500/50 transition-colors group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Wallet size={20} /></div>
                            <h3 className="text-white font-bold mb-1 group-hover:text-indigo-400 transition-colors">Income Tax Declaration</h3>
                            <p className="text-[#8899AA] text-xs">Submit your 80C, 80D proofs to reduce TDS.</p>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded w-max">Window Open till Apr 15</div>
                        </Link>

                        <Link href="/fbp/declare" className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 hover:border-indigo-500/50 transition-colors group cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><LayoutDashboard size={20} /></div>
                            <h3 className="text-white font-bold mb-1 group-hover:text-indigo-400 transition-colors">FBP Structuring</h3>
                            <p className="text-[#8899AA] text-xs">Allocate your flexible benefits to save tax.</p>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded w-max"><CheckCircle2 size={10} /> Submitted</div>
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-white font-bold text-sm mb-4 border-b border-[#1A2A3A] pb-2">Upcoming Events & Reminders</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-[#131B2B] rounded-xl text-center shrink-0 border border-[#2A3A4A]">
                                    <span className="text-xs text-[#8899AA] font-bold">APR</span>
                                    <span className="text-white font-black text-lg leading-none">01</span>
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">New Financial Year</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">FY 2026-27 begins. Tax regime selection resets.</div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center shrink-0">
                                    <span className="text-xs text-rose-400 font-bold">APR</span>
                                    <span className="text-rose-400 font-black text-lg leading-none">15</span>
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Submit Tax Proofs</div>
                                    <div className="text-[#8899AA] text-xs mt-0.5">Last date to upload rent receipts and investment proofs.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <h3 className="text-white font-bold text-sm mb-4 border-b border-[#1A2A3A] pb-2">Quick Links</h3>
                        <div className="space-y-1">
                            <Link href="/reimbursements/claim" className="flex items-center justify-between p-2 hover:bg-[#131B2B] rounded-lg transition-colors group">
                                <span className="text-[#AABBCC] text-sm group-hover:text-white transition-colors">Claim Medical Expense</span>
                                <ArrowRight size={14} className="text-[#556677] group-hover:text-white" />
                            </Link>
                            <Link href="/profile/bank" className="flex items-center justify-between p-2 hover:bg-[#131B2B] rounded-lg transition-colors group">
                                <span className="text-[#AABBCC] text-sm group-hover:text-white transition-colors">Update Bank Details</span>
                                <ArrowRight size={14} className="text-[#556677] group-hover:text-white" />
                            </Link>
                            <Link href="/help" className="flex items-center justify-between p-2 hover:bg-[#131B2B] rounded-lg transition-colors group">
                                <span className="text-[#AABBCC] text-sm group-hover:text-white transition-colors">Help Center / Raise Ticket</span>
                                <ArrowRight size={14} className="text-[#556677] group-hover:text-white" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
