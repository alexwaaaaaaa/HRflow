"use client";

import React, { useState } from 'react';
import {
    Clock, Calendar, ArrowRight, CheckCircle, Info
} from 'lucide-react';

export default function CompOffRequestScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Request Comp-off</h1>
                        <p className="text-sm text-[#8899AA]">Claim compensatory leave for working on a weekend or public holiday.</p>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-8">
                    <form className="space-y-6">

                        {/* Date of Work */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-[#8899AA]">Date Worked On</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-3 top-3 text-[#0066FF]" />
                                <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] text-sm" />
                            </div>
                            <p className="text-[10px] text-[#556677]">Must be a week-off (Saturday/Sunday) or an Official Holiday.</p>
                        </div>

                        {/* Hours */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-[#8899AA]">Hours Logged</label>
                            <div className="relative">
                                <Clock size={18} className="absolute left-3 top-3 text-[#0066FF]" />
                                <input type="number" defaultValue={8} className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] text-sm font-bold" />
                            </div>
                            <p className="text-[10px] text-[#556677]">Minimum 4 hours required for a half-day comp-off, 8 hours for full-day.</p>
                        </div>

                        {/* Reason / Project */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-[#8899AA]">Work Details / Project Justification</label>
                            <textarea
                                rows={4}
                                placeholder="E.g., Production deployment for the Alpha release..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-3 outline-none focus:border-[#0066FF] shadow-inner resize-none"
                            ></textarea>
                        </div>

                        {/* Policy Notice */}
                        <div className="bg-[#060B14] border border-[#1A2A3A] p-4 rounded-lg flex items-start text-sm">
                            <Info size={16} className="text-[#0066FF] mr-3 flex-shrink-0 mt-0.5" />
                            <div className="text-[#8899AA]">
                                <span className="text-white font-bold block mb-1">Important Guideline</span>
                                Comp-off requests expire if not submitted within <strong className="text-white">14 days</strong> of the worked weekend. Once approved, the leave must be consumed within <strong className="text-white">45 days</strong>.
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A] flex justify-end">
                            <button type="button" className="px-8 py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.4)] flex justify-center items-center">
                                Submit for Approval <ArrowRight size={18} className="ml-2" />
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}
