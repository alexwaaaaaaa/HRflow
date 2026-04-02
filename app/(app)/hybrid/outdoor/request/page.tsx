"use client";

import React, { useState } from 'react';
import {
    Briefcase, Calendar, ChevronRight, FileText, CheckCircle2
} from 'lucide-react';

export default function OutdoorDutyRequest() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="mb-8 border-b border-[#1A2A3A] pb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">Outdoor Duty Request</h1>
                    <p className="text-sm text-[#8899AA]">Apply for On-Duty (OD) marking for off-site training, conferences, or long-term client deployments.</p>
                </div>

                <div className="grid grid-cols-3 gap-8">

                    {/* Form Component (Left 2 cols) */}
                    <div className="col-span-2 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                            <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                                <Briefcase size={18} className="mr-2 text-[#0066FF]" /> Duty Details
                            </h2>

                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#8899AA] mb-2">From Date</label>
                                        <input
                                            type="date"
                                            className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#8899AA] mb-2">To Date</label>
                                        <input
                                            type="date"
                                            className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2">Purpose of Duty</label>
                                    <select className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors">
                                        <option>Select Purpose...</option>
                                        <option>Client Site Deployment</option>
                                        <option>Training / Workshop</option>
                                        <option>Conference / Seminar</option>
                                        <option>Company Event</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2">Location / Venue</label>
                                    <input
                                        type="text"
                                        placeholder="City / specific venue name"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2">Additional Remarks</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Any other details..."
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side panels */}
                    <div className="col-span-1 space-y-6">
                        {/* Info card */}
                        <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-xl p-5">
                            <h3 className="text-sm font-bold text-[#00E5A0] mb-2">How OD Works</h3>
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                Approved OD requests will automatically mark your attendance as <strong className="text-white">Present (Full Day)</strong> for the specified duration, bypassing biometric and app punch requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
