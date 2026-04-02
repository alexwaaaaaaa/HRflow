"use client";

import React, { useState } from 'react';
import {
    Calendar, RefreshCw, Zap, Save, CheckCircle
} from 'lucide-react';

export default function LeaveAccrualRules() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Leave Accrual Settings</h1>
                        <p className="text-sm text-[#8899AA]">Define how and when leaves are credited to employee accounts.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00cca0] transition-colors flex items-center shadow-[0_0_15px_rgba(0,229,160,0.3)]">
                        <Save size={16} className="mr-2" /> Save Rules
                    </button>
                </div>

                {/* Global Frequency */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                        <RefreshCw size={18} className="mr-2 text-[#0066FF]" /> Default Accrual Frequency
                    </h2>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                        <label className="relative flex p-4 cursor-pointer rounded-xl border-2 border-[#0066FF] bg-[#0066FF]/5">
                            <input type="radio" name="freq" className="absolute opacity-0" defaultChecked />
                            <div className="flex items-start w-full">
                                <div className="mt-0.5 mr-3 text-[#0066FF]"><CheckCircle size={20} /></div>
                                <div>
                                    <span className="block font-bold text-white text-base mb-1">Monthly</span>
                                    <span className="block text-xs text-[#8899AA]">Leaves are prorated and credited at the start of each month (e.g., 1.25 EL per month).</span>
                                </div>
                            </div>
                        </label>

                        <label className="relative flex p-4 cursor-pointer rounded-xl border border-[#1A2A3A] bg-[#0A1420] hover:border-[#2A3A4A] transition-colors opacity-70">
                            <input type="radio" name="freq" className="absolute opacity-0" />
                            <div className="flex items-start w-full">
                                <div className="mt-0.5 mr-3 text-[#556677]"><Calendar size={20} /></div>
                                <div>
                                    <span className="block font-bold text-white text-base mb-1">Yearly Upfront</span>
                                    <span className="block text-xs text-[#8899AA]">Total annual quota is credited on Jan 1st (or start of financial year).</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Accrual Conditions */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                        <Zap size={18} className="mr-2 text-[#FFB800]" /> Advanced Accrual Conditions
                    </h2>

                    <div className="space-y-6 text-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white mb-1">Prorate Accrual for LWP</h3>
                                <p className="text-xs text-[#8899AA]">Reduce next month's leave credit if employee takes Leave Without Pay (LWP).</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFB800]"></div>
                            </label>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-white mb-1">Probation Period Hold</h3>
                                <p className="text-xs text-[#8899AA]">Accrue leaves during probation, but restrict usage until confirmation.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5A0]"></div>
                            </label>
                        </div>

                        <hr className="border-[#1A2A3A]" />

                        <div className="flex items-center justify-between">
                            <div className="pr-10">
                                <h3 className="font-bold text-white mb-1">Date of Credit (Monthly)</h3>
                                <p className="text-xs text-[#8899AA]">Which day of the month should leaves be credited to the balance?</p>
                            </div>
                            <select className="bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-2.5 outline-none focus:border-[#00E5A0] w-48 font-bold text-center">
                                <option>1st of the Month</option>
                                <option>End of Payroll Cycle</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
