"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    HeartHandshake, ChevronRight, Shield, Star, Info, Check, ArrowRight
} from "lucide-react";

export default function InsuranceMarketplaceScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/insurance/policy" className="hover:text-white transition-colors">Insurance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Marketplace</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <HeartHandshake className="w-8 h-8 text-pink-500" />
                        Benefit Marketplace
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Explore and enroll in employer-sponsored and voluntary insurance plans.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium rounded-lg">
                        Open Enrollment Ends: <strong>31 Oct 2025</strong>
                    </div>
                </div>
            </div>

            {/* Employer Paid Core Benefits */}
            <div className="mb-12">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-400" /> Employer-Funded Core Plans
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* GMC */}
                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors cursor-pointer">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase">Default Active</div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Group Mediclaim (GMC)</h3>
                                <p className="text-sm text-indigo-400 font-medium">Star Health Allied</p>
                            </div>
                            <img src="/api/placeholder/40/40" alt="Provider" className="w-10 h-10 rounded bg-white p-1" />
                        </div>
                        <div className="mb-6">
                            <span className="text-2xl font-bold text-white">₹5 Lakhs</span>
                            <span className="text-[#8899AA] text-sm"> / family floater</span>
                        </div>
                        <ul className="space-y-2 text-sm text-[#8899AA] mb-6">
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Covers Employee + Spouse + 2 Kids</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Pre-existing diseases covered from Day 1</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> ₹50,000 Maternity coverage inner limit</li>
                        </ul>
                        <div className="flex items-center justify-between border-t border-[#2A3A4A] pt-4 mt-auto">
                            <span className="text-sm font-medium text-white">Cost: ₹0 (Company Paid)</span>
                            <Link href="/finance/insurance/policy" className="text-indigo-400 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                View Details <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* GPA / GTL */}
                    <div className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors cursor-pointer">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase">Default Active</div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Term & Accident (GTL/GPA)</h3>
                                <p className="text-sm text-indigo-400 font-medium">HDFC Life</p>
                            </div>
                            <img src="/api/placeholder/40/40" alt="Provider" className="w-10 h-10 rounded bg-white p-1" />
                        </div>
                        <div className="mb-6">
                            <span className="text-2xl font-bold text-white">3X</span>
                            <span className="text-[#8899AA] text-sm"> Annual CTC</span>
                        </div>
                        <ul className="space-y-2 text-sm text-[#8899AA] mb-6">
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Death benefit to nominee</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Permanent total disability cover</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Worldwide 24/7 validity</li>
                        </ul>
                        <div className="flex items-center justify-between border-t border-[#2A3A4A] pt-4 mt-auto">
                            <span className="text-sm font-medium text-white">Cost: ₹0 (Company Paid)</span>
                            <Link href="/finance/insurance/policy" className="text-indigo-400 text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                View Details <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Voluntary Benefits */}
            <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" /> Voluntary Top-ups & Add-ons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Super Topup */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col hover:border-[#2A3A4A] cursor-pointer group">
                        <div className="mb-4">
                            <span className="px-2 py-1 bg-[#1A2A3A] text-xs font-semibold rounded text-[#8899AA]">Health Extra</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">GMC Super Top-up</h3>
                        <p className="text-[#8899AA] text-sm mb-4 h-10">Add an additional ₹10 Lakhs safety net over your base GMC plan.</p>

                        <div className="bg-[#1A2A3A]/40 rounded-lg p-3 mb-6 flex justify-between items-center text-sm border border-[#2A3A4A]">
                            <span className="text-white">Est. Premium</span>
                            <span className="font-bold text-amber-400">₹350/mo</span>
                        </div>

                        <Link href="/finance/insurance/enroll" className="mt-auto w-full py-2 bg-white text-black text-center text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            Explore & Enroll
                        </Link>
                    </div>

                    {/* Parents Cover */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col hover:border-[#2A3A4A] cursor-pointer group">
                        <div className="mb-4">
                            <span className="px-2 py-1 bg-[#1A2A3A] text-xs font-semibold rounded text-[#8899AA]">Dependent Care</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Parents Mediclaim</h3>
                        <p className="text-[#8899AA] text-sm mb-4 h-10">Extend a ₹3 Lakh health cover to your dependent parents or in-laws.</p>

                        <div className="bg-[#1A2A3A]/40 rounded-lg p-3 mb-6 flex justify-between items-center text-sm border border-[#2A3A4A]">
                            <span className="text-white">Est. Premium</span>
                            <span className="font-bold text-amber-400">₹1,200/mo</span>
                        </div>

                        <Link href="/finance/insurance/enroll" className="mt-auto w-full py-2 bg-[#1A2A3A] text-white text-center text-sm font-medium rounded-lg hover:bg-[#2A3A4A] border border-[#2A3A4A] transition-colors">
                            Explore & Enroll
                        </Link>
                    </div>

                    {/* Pet Insurance */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col hover:border-[#2A3A4A] cursor-pointer group">
                        <div className="mb-4">
                            <span className="px-2 py-1 bg-pink-500/10 text-xs font-semibold rounded text-pink-400 border border-pink-500/20">Popular ❤️</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Pet Insurance</h3>
                        <p className="text-[#8899AA] text-sm mb-4 h-10">Comprehensive surgery & OPD cover for your dogs and cats.</p>

                        <div className="bg-[#1A2A3A]/40 rounded-lg p-3 mb-6 flex justify-between items-center text-sm border border-[#2A3A4A]">
                            <span className="text-white">Est. Premium</span>
                            <span className="font-bold text-amber-400">₹450/mo</span>
                        </div>

                        <Link href="/finance/insurance/enroll" className="mt-auto w-full py-2 bg-[#1A2A3A] text-white text-center text-sm font-medium rounded-lg hover:bg-[#2A3A4A] border border-[#2A3A4A] transition-colors">
                            Explore & Enroll
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}
