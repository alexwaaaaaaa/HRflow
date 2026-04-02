"use client";

import React, { useState } from 'react';
import {
    Calendar, ArrowLeft, UploadCloud, Info, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ApplyLeaveScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center text-[#8899AA] text-sm mb-6">
                    <Link href="/my-leave" className="hover:text-white transition-colors flex items-center">
                        <ArrowLeft size={16} className="mr-2" /> Back to My Leaves
                    </Link>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-2xl overflow-hidden">

                    {/* Progress Bar */}
                    <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-8 py-4 flex justify-between items-center text-xs font-bold text-[#556677]">
                        <div className={`flex items-center ${step >= 1 ? 'text-[#0066FF]' : ''}`}>
                            <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 border-current">1</span>
                            Leave Details
                        </div>
                        <div className="h-px bg-[#1A2A3A] flex-1 mx-4"></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-[#00E5A0]' : ''}`}>
                            <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 border-current">2</span>
                            Supporting Docs
                        </div>
                        <div className="h-px bg-[#1A2A3A] flex-1 mx-4"></div>
                        <div className={`flex items-center ${step >= 3 ? 'text-[#FFB800]' : ''}`}>
                            <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 border-current">3</span>
                            Confirm
                        </div>
                    </div>

                    <div className="p-8 space-y-8">

                        {step === 1 && (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">What time off do you need?</h2>

                                {/* Leave Type */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-[#8899AA]">Leave Type</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] shadow-inner font-bold">
                                        <option value="EL">Privilege Leave (Balance: 13)</option>
                                        <option value="SL">Sick Leave (Balance: 8)</option>
                                        <option value="CL">Casual Leave (Balance: 1)</option>
                                    </select>
                                </div>

                                {/* Dates Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-[#8899AA]">Start Date</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-3 top-3 text-[#0066FF]" />
                                            <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-[#8899AA]">End Date</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-3 top-3 text-[#00E5A0]" />
                                            <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#00E5A0] text-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Duration & Sessions */}
                                <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#8899AA]">Calculated Duration:</span>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-2 text-sm text-white cursor-pointer">
                                            <input type="radio" name="session" defaultChecked className="accent-[#0066FF]" />
                                            <span>Full Day(s)</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-sm text-[#8899AA] cursor-pointer">
                                            <input type="radio" name="session" className="accent-[#0066FF]" />
                                            <span>First Half</span>
                                        </label>
                                        <label className="flex items-center space-x-2 text-sm text-[#8899AA] cursor-pointer">
                                            <input type="radio" name="session" className="accent-[#0066FF]" />
                                            <span>Second Half</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-[#8899AA]">Reason for Leave</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Add a brief reason for your manager..."
                                        className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-3 outline-none focus:border-[#0066FF] shadow-inner resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button onClick={() => setStep(2)} className="px-8 py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                                        Continue to Next Step
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">Supporting Documents</h2>
                                <p className="text-sm text-[#8899AA] mb-6">If you are applying for Sick Leave {'>'} 2 days, a medical certificate is required.</p>

                                <div className="border-2 border-dashed border-[#1A2A3A] bg-[#0A1420] rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#0066FF] hover:bg-[#0066FF]/5 transition-all">
                                    <div className="bg-[#0D1928] p-4 rounded-full mb-4">
                                        <UploadCloud size={32} className="text-[#0066FF]" />
                                    </div>
                                    <h3 className="font-bold text-white mb-1">Upload Medical Certificate</h3>
                                    <p className="text-xs text-[#556677] mb-4">PNG, PDF or JPG (max 5MB)</p>
                                    <button className="px-6 py-2 border border-[#1A2A3A] bg-[#060B14] text-white text-xs font-bold rounded-lg hover:border-[#2A3A4A] transition-colors">
                                        Browse Files
                                    </button>
                                </div>

                                <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 p-4 rounded-lg flex items-start mt-6 text-[#FFB800] text-sm">
                                    <Info size={16} className="mr-3 flex-shrink-0 mt-0.5" />
                                    Since you selected Privilege Leave, no document is strictly mandated. You may skip this step.
                                </div>

                                <div className="pt-8 flex justify-between">
                                    <button onClick={() => setStep(1)} className="px-8 py-3 bg-[#0D1928] border border-[#1A2A3A] text-white font-bold rounded-xl hover:bg-[#1A2A3A] transition-colors">
                                        Back
                                    </button>
                                    <button onClick={() => setStep(3)} className="px-8 py-3 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl hover:bg-[#00cca0] transition-colors shadow-[0_0_15px_rgba(0,229,160,0.4)]">
                                        Review Application
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Additional steps can be mocked here. We'll stick to 1 and 2 for demo view */}

                    </div>
                </div>

            </div>
        </div>
    );
}
