"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Clock, Settings, Save
} from 'lucide-react';

export default function AttendancePolicy() {
    return (
        <Page
            title="General Attendance Policy"
            subtitle="Configure global rules for regularizations, grace periods, and tracking behavior."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Policies" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">General Attendance Policy</h1>
                        <p className="text-sm text-[#8899AA]">Configure global rules for regularizations, grace periods, and tracking behavior.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Save Policies
                    </button>
                </div>

                <div className="space-y-6">

                    {/* Regularization Rules */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                            <Settings size={18} className="mr-2 text-[#00E5A0]" /> Regularization Settings
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Max Regularizations Allowed</h3>
                                    <p className="text-xs text-[#8899AA]">Maximum requests an employee can raise per calendar month.</p>
                                </div>
                                <select className="bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-2.5 outline-none focus:border-[#0066FF] w-32">
                                    <option>3 per month</option>
                                    <option>5 per month</option>
                                    <option>Unlimited</option>
                                </select>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Request Submission Window</h3>
                                    <p className="text-xs text-[#8899AA]">Number of days limit to apply for Regularization after the incident date.</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue={3} className="w-16 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2.5 outline-none focus:border-[#0066FF]" />
                                    <span className="text-sm font-bold text-[#556677]">days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Clock In / Out Restricts */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                            <Clock size={18} className="mr-2 text-[#FFB800]" /> App Punch Rules
                        </h2>

                        <div className="space-y-4">
                            <label className="flex flex-col space-y-2 cursor-pointer group bg-[#060B14] p-4 rounded-lg border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">Enforce Geofence</span>
                                    <div className="relative inline-flex items-center mt-0.5">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-9 h-5 bg-[#1A2A3A] rounded-full peer peer-checked:bg-[#0066FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-[#8899AA]">Block punches if an employee is outside allowed office location bounds.</p>
                            </label>

                            <label className="flex flex-col space-y-2 cursor-pointer group bg-[#060B14] p-4 rounded-lg border border-[#1A2A3A] hover:border-[#2A3A4A] transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">Block Outside Shift Hours</span>
                                    <div className="relative inline-flex items-center mt-0.5">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-9 h-5 bg-[#1A2A3A] rounded-full peer peer-checked:bg-[#0066FF] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-[#8899AA]">Employees cannot punch in more than 30 mins before shift start.</p>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
        );
}
