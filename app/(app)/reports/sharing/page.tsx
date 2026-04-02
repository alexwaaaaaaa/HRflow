"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Share2, ChevronRight, CheckCircle2, Copy, Users, Lock, ShieldAlert, Mail
} from "lucide-react";

export default function ReportSharingScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex items-center justify-center">

            <div className="w-full max-w-2xl">
                <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                    <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/reports/saved" className="hover:text-white transition-colors">Saved</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white">Share Access</span>
                </div>

                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3 mb-8">
                    <Share2 className="w-8 h-8 text-[#00E5FF]" />
                    Share Report Configuration
                </h1>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-6">
                    <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#1A2A3A]">
                        <div className="p-3 bg-[#1A2A3A] rounded-xl text-white">
                            <span className="font-bold text-xl">D&I</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Diversity & Inclusion (D&I) Tracker</h2>
                            <p className="text-sm text-[#8899AA] mt-1">Contains sensitive demographic and PII data.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Access Link */}
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-emerald-400" /> Private Link
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value="https://hrflow.acme.co/reports/view/req_88192a"
                                    className="flex-1 bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] rounded-lg px-4 py-3 text-sm focus:outline-none"
                                />
                                <button className="px-5 py-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border border-[#2A3A4A] rounded-lg transition-colors flex items-center gap-2 font-medium">
                                    <Copy className="w-4 h-4" /> Copy
                                </button>
                            </div>
                        </div>

                        {/* Invite People */}
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Invite People</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8899AA]" />
                                    <input
                                        type="email"
                                        placeholder="Add email addresses or department aliases..."
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:border-[#00E5FF] focus:outline-none transition-colors"
                                    />
                                </div>
                                <select className="bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none w-32">
                                    <option>Can View</option>
                                    <option>Can Edit</option>
                                </select>
                                <button className="px-6 py-2.5 bg-[#00E5FF] hover:bg-[#00B3CC] text-[#0B1221] font-semibold rounded-lg transition-colors">
                                    Invite
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-white mb-4">People with access</h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">SR</div>
                                <div>
                                    <p className="text-sm font-bold text-white">Sneha Rao (You)</p>
                                    <p className="text-xs text-[#8899AA]">sneha@acmecorp.com</p>
                                </div>
                            </div>
                            <span className="text-xs text-[#8899AA]">Owner</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">RM</div>
                                <div>
                                    <p className="text-sm font-bold text-white">Rajiv Mehta</p>
                                    <p className="text-xs text-[#8899AA]">rajiv.m@acmecorp.com</p>
                                </div>
                            </div>
                            <select className="bg-transparent border-none text-[#8899AA] text-xs focus:outline-none cursor-pointer">
                                <option>Can View</option>
                                <option>Can Edit</option>
                                <option className="text-pink-400">Remove</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] text-white flex items-center justify-center font-bold text-sm"><Users className="w-4 h-4" /></div>
                                <div>
                                    <p className="text-sm font-bold text-white">HR Leadership Group</p>
                                    <p className="text-xs text-[#8899AA]">12 Members</p>
                                </div>
                            </div>
                            <select className="bg-transparent border-none text-[#8899AA] text-xs focus:outline-none cursor-pointer">
                                <option>Can Edit</option>
                                <option>Can View</option>
                                <option className="text-pink-400">Remove</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-start gap-3 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-sm">
                    <ShieldAlert className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-pink-400 font-bold mb-1">Data Masking Active</p>
                        <p className="text-[#8899AA]">
                            Since this report contains PII, users with "Can View" access will see masked compensation fields based on their Role-Based Access Control (RBAC) permissions.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
