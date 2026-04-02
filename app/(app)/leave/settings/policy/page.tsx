"use client";

import React, { useState } from 'react';
import {
    ShieldCheck, Settings, Save, Clock, Calendar,
    AlertTriangle, Check, X
} from 'lucide-react';

export default function LeavePolicySetup() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Global Leave Policies</h1>
                        <p className="text-sm text-[#8899AA]">Configure high-level constraints and compliance rules for leave management.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Save Configuration
                    </button>
                </div>

                <div className="space-y-6">

                    {/* General Constraints */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                            <Settings size={18} className="mr-2 text-[#00E5A0]" /> General Constraints
                        </h2>

                        <div className="space-y-6 text-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-white mb-1">Max Consecutive Leaves</h3>
                                    <p className="text-xs text-[#8899AA]">Maximum days an employee can apply continuously before HR override is required.</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue={15} className="w-20 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2.5 outline-none focus:border-[#0066FF]" />
                                    <span className="font-bold text-[#556677]">days</span>
                                </div>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div className="flex items-center justify-between">
                                <div className="pr-10">
                                    <h3 className="font-bold text-white mb-1">Joining Proration</h3>
                                    <p className="text-xs text-[#8899AA]">Prorate leaves based on date of joining for mid-year hires.</p>
                                </div>
                                <div className="flex items-center space-x-1 bg-[#060B14] p-1 rounded-lg border border-[#2A3A4A]">
                                    <button className="px-4 py-1.5 rounded bg-[#1A2A3A] text-white font-bold text-xs">Enabled</button>
                                    <button className="px-4 py-1.5 rounded text-[#8899AA] hover:text-white font-bold text-xs">Disabled</button>
                                </div>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div className="flex items-center justify-between">
                                <div className="pr-10">
                                    <h3 className="font-bold text-white mb-1">Notice Period Restrictions</h3>
                                    <p className="text-xs text-[#8899AA]">Block leave applications during the employee's resignation notice period.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4444]"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Timeline & Approvals */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                            <Clock size={18} className="mr-2 text-[#0066FF]" /> Timelines & Escalations
                        </h2>

                        <div className="space-y-6 text-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-white mb-1">Advance Notice Required</h3>
                                    <p className="text-xs text-[#8899AA]">Minimum days required before applying for planned long leaves ({'>'}3 days).</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="number" defaultValue={7} className="w-20 bg-[#060B14] border border-[#2A3A4A] text-center text-white font-bold rounded p-2.5 outline-none focus:border-[#0066FF]" />
                                    <span className="font-bold text-[#556677]">days</span>
                                </div>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-white mb-1">Auto-Approve L1 Manager</h3>
                                    <p className="text-xs text-[#8899AA]">Auto-approve leave requests if the manager does not respond within X days.</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5A0]"></div>
                                    </label>
                                    <span className="text-[#8899AA] px-2">|</span>
                                    <input type="number" defaultValue={2} disabled className="w-16 bg-[#1A2A3A] border border-[#2A3A4A] text-center text-[#556677] font-bold rounded p-2 outline-none cursor-not-allowed" />
                                    <span className="text-[#556677] font-bold">days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verification / Doc Requirements */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] border-dashed rounded-xl p-6">
                        <div className="flex items-start">
                            <div className="bg-[#FFB800]/10 p-3 rounded-lg mr-4 border border-[#FFB800]/20">
                                <AlertTriangle size={20} className="text-[#FFB800]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base mb-1">Medical Certificate Settings</h3>
                                <p className="text-sm text-[#8899AA] mb-4">Mandate document uploads for extended sick leaves.</p>
                                <div className="flex items-center bg-[#060B14] border border-[#1A2A3A] rounded-lg p-1 w-max">
                                    <span className="text-sm text-[#8899AA] px-4 font-bold">Require MC if Sick Leave exceeds</span>
                                    <input type="number" defaultValue={2} className="w-12 bg-[#1A2A3A] text-white text-center font-bold py-1.5 rounded outline-none" />
                                    <span className="text-sm text-[#8899AA] px-4 font-bold">days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
