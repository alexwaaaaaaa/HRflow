"use client";

import React, { useState } from 'react';
import {
    Baby, Activity, AlertCircle, ArrowRight
} from 'lucide-react';

export default function MaternityPaternityLeaveScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center">
                            Special Leaves <Baby size={20} className="ml-3 text-[#FFB800]" />
                        </h1>
                        <p className="text-sm text-[#8899AA]">Maternity, Paternity, and Sabbatical leave requests.</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Types Info */}
                    <div className="col-span-1 space-y-4">
                        <div className="bg-[#FFB800]/10 border-l-4 border-[#FFB800] p-4 rounded-r-lg cursor-pointer">
                            <h3 className="font-bold text-[#FFB800] text-sm mb-1">Maternity Leave (ML)</h3>
                            <p className="text-xs text-[#8899AA]">26 Weeks paid leave. Requires medical certifications.</p>
                        </div>
                        <div className="bg-[#0A1420] border-l-4 border-[#1A2A3A] p-4 rounded-r-lg cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                            <h3 className="font-bold text-white text-sm mb-1">Paternity Leave (PL)</h3>
                            <p className="text-xs text-[#8899AA]">15 Days paid leave. Must be taken within 6 months.</p>
                        </div>
                        <div className="bg-[#0A1420] border-l-4 border-[#1A2A3A] p-4 rounded-r-lg cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                            <h3 className="font-bold text-white text-sm mb-1">Sabbatical (LWP)</h3>
                            <p className="text-xs text-[#8899AA]">Up to 1 year unpaid. Requires 3 years tenure.</p>
                        </div>
                    </div>

                    {/* ML Form/Details View */}
                    <div className="col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center">
                            Apply for Maternity Leave
                        </h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">Expected Delivery Date (EDD)</label>
                                    <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-3 outline-none focus:border-[#FFB800]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider">Leave Start Date</label>
                                    <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white text-sm rounded-lg p-3 outline-none focus:border-[#FFB800]" />
                                    <p className="text-[10px] text-[#556677]">Max 8 weeks before EDD.</p>
                                </div>
                            </div>

                            <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold text-[#8899AA] block mb-1">Calculated End Date</span>
                                    <div className="text-lg font-bold text-[#FFB800]">Pending Dates...</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold text-[#8899AA] block mb-1">Total Duration</span>
                                    <div className="text-lg font-bold text-white">182 Days</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-[#8899AA] uppercase tracking-wider block">Required Documents</label>
                                <div className="border border-dashed border-[#2A3A4A] rounded-lg p-6 text-center hover:border-[#FFB800] transition-colors cursor-pointer bg-[#060B14]">
                                    <Activity size={24} className="mx-auto text-[#556677] mb-2" />
                                    <p className="text-sm font-bold text-white">Upload Medical Certificate</p>
                                    <p className="text-xs text-[#8899AA] mt-1">PDF or JPEG, max 5MB</p>
                                </div>
                            </div>

                            <div className="bg-[#060B14] border border-[#1A2A3A] p-4 rounded-lg flex items-start text-xs text-[#8899AA]">
                                <AlertCircle size={16} className="mr-3 text-[#FF4444] flex-shrink-0" />
                                <p>Special leaves bypass standard manager approval and are routed directy to HR for administrative processing and compliance checks.</p>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button type="button" className="px-6 py-3 bg-[#FFB800] text-[#060B14] font-bold rounded-lg hover:bg-[#e6a600] transition-colors shadow-[0_0_15px_rgba(255,184,0,0.3)] flex items-center">
                                    Submit Request <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
