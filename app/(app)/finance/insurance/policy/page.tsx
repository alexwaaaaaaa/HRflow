"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Shield, ChevronRight, FileText, Download, Users, AlertCircle, Phone
} from "lucide-react";

export default function InsurancePolicyDetailScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/insurance/marketplace" className="hover:text-white transition-colors">Insurance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">My Policies</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Shield className="w-8 h-8 text-indigo-400" />
                        My Corporate Policies
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">View active coverage limits, E-Cards, and dependent details.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Policy details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* GMC Card */}
                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-indigo-500/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-4">
                                <div className="p-3 bg-white rounded-xl h-14 w-14 flex items-center justify-center">
                                    <span className="text-indigo-600 font-bold text-xs text-center border p-1">STAR<br />HEALTH</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Group Mediclaim (GMC)</h2>
                                    <p className="text-[#8899AA] text-sm mt-1">Policy NO: P/150000/01/2025/1129</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold tracking-widest uppercase">
                                Active
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-y border-[#2A3A4A] py-6">
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Base Cover (Family)</p>
                                <p className="text-white font-bold text-xl">₹5,00,000</p>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Super Top-up</p>
                                <p className="text-amber-400 font-bold text-xl">₹10,00,000</p>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Valid Till</p>
                                <p className="text-white font-medium">31 Dec 2025</p>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Type</p>
                                <p className="text-white font-medium">Floater</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 lg:gap-8 justify-between items-start md:items-center">
                            <div className="flex gap-2 text-sm text-[#8899AA]">
                                <Users className="w-5 h-5 text-indigo-400" />
                                <span>Covering: Self + Spouse + 1 Child</span>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg transition-colors">
                                    <Download className="w-4 h-4" /> E-Card
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-sm font-medium rounded-lg transition-colors">
                                    <FileText className="w-4 h-4" /> Policy PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* GPA Card */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-4 items-center">
                                <div className="p-2 bg-white rounded-lg h-10 w-10 flex items-center justify-center">
                                    <span className="text-red-600 font-bold text-[10px] text-center">HDFC<br />LIFE</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Group Term Life (GTL)</h2>
                                    <p className="text-[#8899AA] text-xs mt-0.5">Policy NO: GTL/1120/44</p>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold tracking-widest uppercase">
                                Active
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Sum Assured</p>
                                <p className="text-white font-bold">₹45,00,000</p>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Cover</p>
                                <p className="text-white font-medium text-sm">3x CTC (Self)</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[#8899AA] text-xs mb-1">Nominee</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-sm">Rohan Sharma (Spouse)</span>
                                    <span className="text-[10px] bg-[#1A2A3A] px-1.5 py-0.5 rounded text-[#8899AA]">100%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/finance/insurance/claims" className="flex items-center justify-between p-3 rounded-lg border border-[#2A3A4A] hover:bg-[#1A2A3A]/50 transition-colors group">
                                    <span className="text-sm text-white group-hover:text-indigo-400">Claims History & Status</span>
                                    <ChevronRight className="w-4 h-4 text-[#8899AA] group-hover:text-indigo-400" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/finance/insurance/dependents" className="flex items-center justify-between p-3 rounded-lg border border-[#2A3A4A] hover:bg-[#1A2A3A]/50 transition-colors group">
                                    <span className="text-sm text-white group-hover:text-indigo-400">Manage Dependents</span>
                                    <ChevronRight className="w-4 h-4 text-[#8899AA] group-hover:text-indigo-400" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/finance/insurance/endorsements" className="flex items-center justify-between p-3 rounded-lg border border-[#2A3A4A] hover:bg-[#1A2A3A]/50 transition-colors group">
                                    <span className="text-sm text-white group-hover:text-indigo-400">Endorsements (Mid-term changes)</span>
                                    <ChevronRight className="w-4 h-4 text-[#8899AA] group-hover:text-indigo-400" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Phone className="w-5 h-5 text-red-400" />
                            <h3 className="text-sm font-bold text-white">Emergency Assist (24x7)</h3>
                        </div>
                        <p className="text-xs text-[#8899AA] mb-4">For immediate hospitalization assistance or cashless approval queries at network hospitals.</p>
                        <div className="bg-[#0B1221]/50 p-3 rounded-lg border border-[#2A3A4A] text-center">
                            <p className="font-mono text-xl font-bold text-white tracking-widest">1800-425-2255</p>
                            <p className="text-[10px] text-red-400 mt-1 uppercase">Star Health TPA Helpdesk</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
