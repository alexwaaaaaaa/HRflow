"use client";
import React, { useState } from "react";
import { ArrowLeft, Users, Plus, MoveVertical, Save, Trash2, CheckSquare } from "lucide-react";

export default function InterviewPanelSetup() {
    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><ArrowLeft size={16} /></button>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Interview Panel Setup</h1>
                        <p className="text-sm text-[#8899AA]">Define the hiring stages and assign default interviewers for "Senior Frontend Engineer"</p>
                    </div>
                </div>
                <button className="h-10 px-6 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                    <Save size={14} /> Save Template
                </button>
            </div>

            <div className="space-y-4">
                {/* Stage 1 */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex overflow-hidden">
                    <div className="w-12 bg-[#0A1420] border-r border-[#1A2A3A] flex items-center justify-center cursor-move text-[#445566] hover:text-white transition-colors">
                        <MoveVertical size={16} />
                    </div>
                    <div className="flex-1 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-white flex items-center justify-center">1</div>
                                <input defaultValue="HR Screening" className="bg-transparent text-lg font-bold text-white focus:outline-none border-b border-transparent focus:border-[#0066FF] transition-colors" />
                            </div>
                            <button className="text-[#8899AA] hover:text-[#FF4444] transition-colors"><Trash2 size={16} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-2">Assigned Interviewers</label>
                                <div className="flex flex-wrap gap-2">
                                    <div className="bg-[#1A2A3A] text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-[#0066FF] text-[8px] flex items-center justify-center font-bold">PN</div>
                                        Priya Nair <span className="text-[#445566] ml-1">×</span>
                                    </div>
                                    <button className="bg-transparent border border-dashed border-[#2A3A4A] text-[#8899AA] hover:text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"><Plus size={14} /> Add User</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-2">Duration & Tool</label>
                                <div className="flex gap-2">
                                    <select className="h-9 flex-1 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-2 text-sm text-white focus:outline-none">
                                        <option>30 Minutes</option><option>45 Minutes</option><option>60 Minutes</option>
                                    </select>
                                    <select className="h-9 flex-1 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-2 text-sm text-white focus:outline-none">
                                        <option>Phone Call</option><option>Google Meet</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex overflow-hidden">
                    <div className="w-12 bg-[#0A1420] border-r border-[#1A2A3A] flex items-center justify-center cursor-move text-[#445566] hover:text-white transition-colors">
                        <MoveVertical size={16} />
                    </div>
                    <div className="flex-1 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-white flex items-center justify-center">2</div>
                                <input defaultValue="Technical Round (React.js)" className="bg-transparent text-lg font-bold text-white focus:outline-none border-b border-transparent focus:border-[#0066FF] transition-colors" />
                            </div>
                            <button className="text-[#8899AA] hover:text-[#FF4444] transition-colors"><Trash2 size={16} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-2">Assigned Interviewers</label>
                                <div className="flex flex-wrap gap-2">
                                    <div className="bg-[#1A2A3A] text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-[#9B59B6] text-[8px] flex items-center justify-center font-bold">AS</div>
                                        Ankit Sharma <span className="text-[#445566] ml-1">×</span>
                                    </div>
                                    <div className="bg-[#1A2A3A] text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border border-[#00E5A0]">
                                        <div className="w-4 h-4 rounded-full bg-[#FFB800] text-[8px] flex items-center justify-center font-bold text-black">NS</div>
                                        Neha S. (Shadow) <span className="text-[#445566] ml-1">×</span>
                                    </div>
                                    <button className="bg-transparent border border-dashed border-[#2A3A4A] text-[#8899AA] hover:text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"><Plus size={14} /> Add</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-2">Feedback Scorecard</label>
                                <div className="flex gap-2 items-center">
                                    <div className="h-9 flex-1 bg-[#1A2A3A] rounded-lg px-3 text-sm text-white flex items-center gap-2">
                                        <CheckSquare size={14} className="text-[#00E5A0]" /> Frontend Tech Scorecard
                                    </div>
                                    <button className="text-[#0066FF] text-xs font-medium hover:underline">Change</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Stage Button */}
                <button className="w-full h-14 border-2 border-dashed border-[#1A2A3A] rounded-2xl flex items-center justify-center text-[#8899AA] font-bold hover:bg-[#1A2A3A]/30 hover:border-[#2A3A4A] hover:text-white transition-colors">
                    <Plus size={18} className="mr-2" /> Add Interview Stage
                </button>
            </div>
        </div>
    );
}
