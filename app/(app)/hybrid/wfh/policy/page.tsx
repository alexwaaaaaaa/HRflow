"use client";

import React, { useState } from 'react';
import {
    Home, Settings, ShieldCheck, CheckCircle2, Save, ChevronLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WfhPolicyScreen() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            className="p-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Work From Home Policy</h1>
                            <p className="text-sm text-[#8899AA]">Configure hybrid work rules and quotas for the organization.</p>
                        </div>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Save Policy
                    </button>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                        <Home size={18} className="mr-2 text-[#0066FF]" /> Baseline WFH Quota
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 pr-12">
                                <h3 className="text-sm font-bold text-white mb-1">Monthly WFH Allowance</h3>
                                <p className="text-xs text-[#8899AA] leading-relaxed">Number of days an employee is permitted to Work from Home in a calendar month.</p>
                            </div>
                            <div className="flex items-center space-x-2 w-48 border-l border-[#1A2A3A] pl-6">
                                <input type="number" defaultValue={8} className="w-16 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2.5 outline-none focus:border-[#0066FF]" />
                                <span className="text-sm font-bold text-[#556677]">days / month</span>
                            </div>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-start justify-between">
                            <div className="flex-1 pr-12">
                                <h3 className="text-sm font-bold text-white mb-1">Consecutive Days Limit</h3>
                                <p className="text-xs text-[#8899AA] leading-relaxed">Maximum number of continuous WFH days allowed in a single stretch to ensure some office presence.</p>
                            </div>
                            <div className="flex items-center space-x-2 w-48 border-l border-[#1A2A3A] pl-6">
                                <input type="number" defaultValue={3} className="w-16 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2.5 outline-none focus:border-[#0066FF]" />
                                <span className="text-sm font-bold text-[#556677]">max stretch</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                        <ShieldCheck size={18} className="mr-2 text-[#00E5A0]" /> Restrictions
                    </h2>

                    <div className="space-y-4">
                        <label className="flex flex-col space-y-2 cursor-pointer group bg-[#060B14] p-4 rounded-lg border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">Block Mondays/Fridays</span>
                                <div className="relative inline-flex items-center mt-0.5">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-9 h-5 bg-[#1A2A3A] rounded-full peer peer-checked:bg-[#0066FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                </div>
                            </div>
                            <p className="text-xs text-[#8899AA]">Prevent employees from clubbing WFH with weekends for extended leaves.</p>
                        </label>

                        <label className="flex flex-col space-y-2 cursor-pointer group bg-[#060B14] p-4 rounded-lg border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">Require Manager Approval</span>
                                <div className="relative inline-flex items-center mt-0.5">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-9 h-5 bg-[#1A2A3A] rounded-full peer peer-checked:bg-[#0066FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                </div>
                            </div>
                            <p className="text-xs text-[#8899AA]">If unchecked, WFH requests within quota are auto-approved.</p>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
}
