"use client";
import React, { useState } from "react";
import {
    Users, Building2, UserCircle, Calendar, Send, Filter, CheckCircle2, Search, X
} from "lucide-react";

export default function CourseAssignmentScreen() {
    const [activeTab, setActiveTab] = useState('department');

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Assign Course</h1>
                <p className="text-[#8899AA]">Distribute "Advanced System Design" to learners.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Target Selection */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-[#1A2A3A] bg-[#0A1420]">
                            <button
                                onClick={() => setActiveTab('department')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors border-b-2 ${activeTab === 'department' ? 'border-[#33E6FF] text-[#33E6FF] bg-[#1A2A3A]/50' : 'border-transparent text-[#8899AA] hover:text-white'}`}
                            ><Building2 size={18} /> By Department</button>
                            <button
                                onClick={() => setActiveTab('role')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors border-b-2 ${activeTab === 'role' ? 'border-[#33E6FF] text-[#33E6FF] bg-[#1A2A3A]/50' : 'border-transparent text-[#8899AA] hover:text-white'}`}
                            ><Users size={18} /> By Role</button>
                            <button
                                onClick={() => setActiveTab('individuals')}
                                className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors border-b-2 ${activeTab === 'individuals' ? 'border-[#33E6FF] text-[#33E6FF] bg-[#1A2A3A]/50' : 'border-transparent text-[#8899AA] hover:text-white'}`}
                            ><UserCircle size={18} /> Select Individuals</button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">

                            {activeTab === 'department' && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                        <input type="text" placeholder="Search departments..." className="w-full bg-[#0A1420] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#33E6FF]" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Engineering', 'Product Management', 'Design', 'Data Science', 'Sales', 'Marketing'].map((dept, i) => (
                                            <label key={i} className="flex items-center gap-3 p-4 border border-[#2A3A4A] rounded-xl cursor-pointer hover:bg-[#1A2A3A] transition-colors bg-[#0A1420]">
                                                <input type="checkbox" className="w-5 h-5 rounded border-[#445566] text-[#33E6FF] focus:ring-[#33E6FF] focus:ring-offset-[#0F1C2E]" defaultChecked={i === 0} />
                                                <div>
                                                    <span className="text-white font-medium block">{dept}</span>
                                                    <span className="text-xs text-[#8899AA]">{i === 0 ? '142' : '40+'} Emp</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'role' && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                        <input type="text" placeholder="Search roles..." className="w-full bg-[#0A1420] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#33E6FF]" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Frontend Engineer', 'Backend Engineer', 'Fullstack Engineer', 'QA Engineer'].map((role, i) => (
                                            <label key={i} className="flex items-center gap-3 p-4 border border-[#2A3A4A] rounded-xl cursor-pointer hover:bg-[#1A2A3A] transition-colors bg-[#0A1420]">
                                                <input type="checkbox" className="w-5 h-5 rounded border-[#445566] text-[#33E6FF] focus:ring-[#33E6FF] focus:ring-offset-[#0F1C2E]" />
                                                <span className="text-white font-medium block">{role}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2"><Calendar size={18} className="text-[#00E5A0]" /> Assignment Settings</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">Due Date</label>
                                <input type="date" className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] [color-scheme:dark]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">Requirement Level</label>
                                <select className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] appearance-none">
                                    <option>Mandatory (Compliance)</option>
                                    <option>Required (Job Role)</option>
                                    <option>Optional / Recommended</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            <input type="checkbox" id="notify" className="w-5 h-5 rounded border-[#445566] text-[#33E6FF] focus:ring-[#33E6FF] focus:リング-offset-[#0F1C2E]" defaultChecked />
                            <label htmlFor="notify" className="text-sm text-white">Send automated email & push notification to learners immediately</label>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <input type="checkbox" id="remind" className="w-5 h-5 rounded border-[#445566] text-[#33E6FF] focus:ring-[#33E6FF] focus:リング-offset-[#0F1C2E]" defaultChecked />
                            <label htmlFor="remind" className="text-sm text-white">Send automated reminder 3 days before due date</label>
                        </div>
                    </div>

                </div>

                {/* Right Col: Summary */}
                <div className="space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl sticky top-0 border-t-4 border-t-[#00E5A0]">
                        <h3 className="font-bold text-white mb-4">Assignment Summary</h3>

                        <div className="bg-[#152336] p-4 rounded-xl border border-[#2A3A4A] mb-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#00E5A0]/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                            <p className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Total Targeted</p>
                            <p className="text-3xl font-extrabold text-white">142 <span className="text-sm font-medium text-[#8899AA]">Learners</span></p>
                        </div>

                        <div className="space-y-3 text-sm mb-8">
                            <div className="flex justify-between border-b border-[#1A2A3A] pb-2">
                                <span className="text-[#8899AA]">Target Groups</span>
                                <span className="text-white font-medium text-right">Engineering Dept.</span>
                            </div>
                            <div className="flex justify-between border-b border-[#1A2A3A] pb-2">
                                <span className="text-[#8899AA]">Due Date</span>
                                <span className="text-white font-medium">Not set</span>
                            </div>
                            <div className="flex justify-between border-b border-[#1A2A3A] pb-2">
                                <span className="text-[#8899AA]">Priority</span>
                                <span className="text-white font-medium">Mandatory</span>
                            </div>
                        </div>

                        <button className="w-full py-3.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors shadow-[0_5px_15px_rgba(0,229,160,0.2)] flex items-center justify-center gap-2 text-lg">
                            <Send size={20} /> Deploy Course
                        </button>
                        <button className="w-full mt-3 py-3 border border-[#2A3A4A] text-white font-bold rounded-xl hover:bg-[#1A2A3A] transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}
