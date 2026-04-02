"use client";
import React, { useState } from "react";
import {
    Server, Lightbulb, PenTool, Paperclip, Send, X
} from "lucide-react";

export default function RaiseTicket() {
    const [category, setCategory] = useState("IT");

    return (
        <div className="p-6 max-w-[800px] mx-auto min-h-[calc(100vh-80px)] border-t border-[#1A2A3A] mt-6">

            <div className="mb-8 font-jakarta">
                <h1 className="text-3xl font-bold text-white mb-2">Raise a new request</h1>
                <p className="text-[#8899AA]">Provide details so our specific helpdesk agents can assist you faster.</p>
            </div>

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-8 shadow-xl">

                {/* Step 1: Category */}
                <div className="mb-8">
                    <label className="text-sm font-semibold text-[#8899AA] mb-3 block">1. Select Request Category</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            onClick={() => setCategory("IT")}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${category === 'IT' ? 'bg-[#33E6FF]/10 border-[#33E6FF] text-[#33E6FF]' : 'bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566]'}`}
                        >
                            <Server size={24} />
                            <span className="font-semibold">IT Support</span>
                        </button>
                        <button
                            onClick={() => setCategory("HR")}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${category === 'HR' ? 'bg-[#9D00FF]/10 border-[#9D00FF] text-[#9D00FF]' : 'bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566]'}`}
                        >
                            <Lightbulb size={24} />
                            <span className="font-semibold">HR & Benefits</span>
                        </button>
                        <button
                            onClick={() => setCategory("Facilities")}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${category === 'Facilities' ? 'bg-[#FFB020]/10 border-[#FFB020] text-[#FFB020]' : 'bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566]'}`}
                        >
                            <PenTool size={24} />
                            <span className="font-semibold">Facilities</span>
                        </button>
                    </div>
                </div>

                {/* Step 2: Request Type Dropdown (Dynamically changes based on category) */}
                <div className="mb-6">
                    <label className="text-sm font-semibold text-[#8899AA] mb-2 block">2. Issue Type</label>
                    <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00E5A0] transition-colors appearance-none">
                        {category === 'IT' && (
                            <>
                                <option>Hardware Issue / Need Replacement</option>
                                <option>Software Access / License Request</option>
                                <option>Network / VPN Connectivity</option>
                                <option>Other IT Issue</option>
                            </>
                        )}
                        {category === 'HR' && (
                            <>
                                <option>Payroll / Salary Inquiry</option>
                                <option>Leave Management Query</option>
                                <option>Benefits & Insurance</option>
                            </>
                        )}
                        {category === 'Facilities' && (
                            <>
                                <option>Desk Setup / Ergonomics</option>
                                <option>Office Maintenance</option>
                                <option>ID Card Issue</option>
                            </>
                        )}
                    </select>
                </div>

                {/* Step 3: Subject & Description */}
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="text-sm font-semibold text-[#8899AA] mb-2 block">3. Subject / Summary <span className="text-[#FF4444]">*</span></label>
                        <input
                            type="text"
                            placeholder="Briefly state your issue..."
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00E5A0] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#8899AA] mb-2 block text-white-500">4. Detailed Description <span className="text-[#FF4444]">*</span></label>
                        <div className="border border-[#2A3A4A] rounded-xl overflow-hidden focus-within:border-[#00E5A0] transition-colors bg-[#1A2A3A]">
                            <textarea
                                rows={6}
                                className="w-full bg-transparent text-white p-4 focus:outline-none resize-y min-h-[120px]"
                                placeholder="Please provide as much context as possible. Steps to reproduce if it's a bug."
                            ></textarea>

                            {/* Attachments Footer */}
                            <div className="bg-[#0A1420] border-t border-[#2A3A4A] p-3 flex items-center justify-between">
                                <button className="flex items-center gap-2 text-sm text-[#8899AA] hover:text-[#00E5A0] transition-colors px-2 py-1 bg-[#1A2A3A] rounded border border-[#2A3A4A]">
                                    <Paperclip size={16} /> Attach Files or Screenshots
                                </button>
                                <span className="text-xs text-[#445566]">Max total size: 10MB</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Priority Override & Submit */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[#1A2A3A] gap-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 bg-[#1A2A3A] border-[#2A3A4A] rounded text-[#FF4444] focus:ring-[#FF4444] accent-[#FF4444]" />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white group-hover:text-[#FF4444] transition-colors">Mark as High Priority</span>
                            <span className="text-xs text-[#8899AA]">Use only if work is completely blocked.</span>
                        </div>
                    </label>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-3 text-[#8899AA] font-semibold hover:text-white transition-colors bg-[#1A2A3A] rounded-xl border border-[#2A3A4A]">
                            Cancel
                        </button>
                        <button className="flex-1 md:flex-none px-8 py-3 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-all shadow-[0_10px_20px_rgba(0,229,160,0.2)] flex items-center justify-center gap-2">
                            <Send size={18} /> Submit Request
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
