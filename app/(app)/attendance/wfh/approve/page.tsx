"use client";

import React, { useState } from "react";
import { CheckCircle2, XOctagon } from "lucide-react";

const REQUESTS = [
    { id: 1, name: "Priya Mehta", dept: "Eng", avatar: "PM", dates: "Mon 11, Tue 12", days: 2, mode: "Home", reason: "Back-to-back calls; attending all by VC.", ctx: "4 WFH used of 8 | Compliance ✅", ctxGood: true, manager: "Kavya Reddy" },
    { id: 2, name: "Rohan Desai", dept: "Eng", avatar: "RD", dates: "Wed 13–Fri 15", days: 3, mode: "Client site", reason: "On-site delivery at Infosys campus, Pune.", ctx: "3 WFH used of 8 | Compliance ✅", ctxGood: true, manager: "Kavya Reddy" },
    { id: 3, name: "Suresh Kumar", dept: "Ops", avatar: "SK", dates: "Mon 11", days: 1, mode: "Co-work", reason: "Fever — need rest, but can attend critical tasks.", ctx: "7 WFH used of 8 | ⚠️ 1 left", ctxGood: false, manager: "Ajay Biswas" },
];

export default function WFHApproval() {
    const [requests, setRequests] = useState(REQUESTS);

    const approve = (id: number) => setRequests(r => r.filter(x => x.id !== id));
    const reject = (id: number) => setRequests(r => r.filter(x => x.id !== id));

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">WFH Approvals
                        <span className="bg-[#0066FF]/20 text-[#0066FF] text-sm px-2.5 py-0.5 rounded-full">{requests.length} pending</span>
                    </h2>
                </div>
                <button onClick={() => setRequests([])} className="px-4 py-2 bg-[#0066FF] text-white text-sm font-bold rounded-xl hover:bg-[#0052d4]">Approve All</button>
            </div>

            <div className="space-y-4">
                {requests.map(req => (
                    <div key={req.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]">{req.avatar}</div>
                                <div>
                                    <p className="font-semibold">{req.name}</p>
                                    <p className="text-xs text-[#8899AA]">{req.dept} • Report to: {req.manager}</p>
                                </div>
                            </div>
                            <span className="text-xs text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/30 px-2.5 py-1 rounded-full">{req.mode}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">📅 Dates</p>
                                <p className="text-sm font-medium">{req.dates}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">🗓 Duration</p>
                                <p className="text-sm font-medium">{req.days} day{req.days > 1 ? "s" : ""}</p>
                            </div>
                            <div>
                                <p className="text-xs text-[#445566] mb-0.5">📊 WFH Usage</p>
                                <p className={`text-sm font-medium ${req.ctxGood ? "text-[#00E5A0]" : "text-[#FFB800]"}`}>{req.ctx}</p>
                            </div>
                        </div>

                        <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 mb-4">
                            <p className="text-sm text-[#8899AA] italic">{req.reason}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => approve(req.id)}
                                className="px-4 py-2 bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 text-sm font-semibold rounded-xl hover:bg-[#0066FF]/20 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Approve
                            </button>
                            <button onClick={() => reject(req.id)}
                                className="px-4 py-2 bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 text-sm font-semibold rounded-xl hover:bg-[#FF4444]/20 flex items-center gap-1.5">
                                <XOctagon className="w-4 h-4" /> Reject
                            </button>
                            <button className="px-4 py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Add Comment</button>
                        </div>
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-16 text-center">
                        <CheckCircle2 className="w-12 h-12 text-[#00E5A0] mx-auto mb-3 opacity-60" />
                        <p className="text-[#8899AA]">All WFH requests reviewed.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
