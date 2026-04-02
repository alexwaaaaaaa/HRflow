"use client";

import React, { useState } from "react";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function WFHRequest() {
    const [submitted, setSubmitted] = useState(false);
    const [reason, setReason] = useState("");
    const [dates, setDates] = useState<string[]>([]);
    const DAYS = ["Mon 11", "Tue 12", "Wed 13", "Thu 14", "Fri 15"];

    if (submitted) return (
        <div className="p-6 md:p-8 max-w-[720px] mx-auto text-white">
            <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-2xl p-10 text-center">
                <CheckCircle2 className="w-14 h-14 text-[#00E5A0] mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">WFH Request Submitted!</h2>
                <p className="text-[#8899AA] mb-2">Your manager will be notified within 24 hours.</p>
                <p className="text-sm text-[#8899AA]">Dates: {dates.join(", ")} | Days: {dates.length}</p>
                <div className="flex gap-3 justify-center mt-6">
                    <button onClick={() => { setSubmitted(false); setDates([]); setReason(""); }} className="px-5 py-2 bg-[#1A2A3A] rounded-xl text-sm hover:bg-[#2A3A4A]">New Request</button>
                    <Link href="/attendance" className="px-5 py-2 bg-[#00E5A0] text-[#060B14] font-bold rounded-xl text-sm hover:bg-[#00c98d]">Back to Attendance</Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-8 max-w-[720px] mx-auto text-white">
            <Link href="/attendance" className="flex items-center gap-1 text-sm text-[#8899AA] hover:text-white mb-5 w-fit">
                <ChevronLeft className="w-4 h-4" /> Back
            </Link>

            <h2 className="text-2xl font-bold mb-1">WFH Request</h2>
            <p className="text-sm text-[#8899AA] mb-6">Request to work from home</p>

            {/* Balance Badge */}
            <div className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl px-5 py-3 mb-5 flex justify-between items-center">
                <span className="text-sm text-[#8899AA]">🔵 WFH Balance this month</span>
                <span className="font-semibold text-[#0066FF]">4 of 8 days used</span>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 space-y-6">
                {/* Week Selector */}
                <div>
                    <label className="block text-sm font-medium text-[#8899AA] mb-3">Select WFH Days (this week) *</label>
                    <div className="flex gap-2 flex-wrap">
                        {DAYS.map(d => (
                            <button key={d} onClick={() => setDates(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])}
                                className={`px-4 py-2 text-sm rounded-xl border transition-colors font-medium ${dates.includes(d) ? "bg-[#0066FF]/20 border-[#0066FF] text-[#0066FF]" : "border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]"}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                    {dates.length > 0 && <p className="text-xs text-[#8899AA] mt-2">{dates.length} day{dates.length > 1 ? "s" : ""} selected: {dates.join(", ")}</p>}
                </div>

                {/* Type */}
                <div>
                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Work Mode *</label>
                    <div className="space-y-2">
                        {["Work from Home (personal residence)", "Work from Client Site", "Work from Co-working Space"].map((t, i) => (
                            <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#1A2A3A] cursor-pointer hover:border-[#2A3A4A]">
                                <input type="radio" name="wfhType" defaultChecked={i === 0} className="accent-[#0066FF]" />
                                <span className="text-sm">{t}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Reason */}
                <div>
                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Reason *</label>
                    <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)}
                        placeholder="Internet and laptop available at home. Will attend all scheduled calls."
                        className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] resize-none" />
                </div>

                {/* Work Plan */}
                <div>
                    <label className="block text-sm font-medium text-[#8899AA] mb-2">Work Plan (optional)</label>
                    <textarea rows={3} placeholder="9-10 AM: Stand-up&#10;10-12 PM: Feature development&#10;2-6 PM: Sprint tasks"
                        className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] resize-none" />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button onClick={() => { if (dates.length && reason) setSubmitted(true); }}
                        className="flex-1 py-3 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052d4]">Submit WFH Request</button>
                    <Link href="/attendance" className="px-5 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A] flex items-center">Cancel</Link>
                </div>
            </div>
        </div>
    );
}
