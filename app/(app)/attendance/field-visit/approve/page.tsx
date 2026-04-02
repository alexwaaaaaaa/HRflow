"use client";

import React, { useState } from "react";
import { CheckCircle2, XOctagon, MapPin } from "lucide-react";

const FV_REQUESTS = [
    { id: 1, name: "Vikram Singh", dept: "Sales", avatar: "VS", date: "14 Nov", time: "09:00–06:00", purpose: "Client demo at XYZ Corp HQ", location: "BKC, Mumbai", selfie: true, gps: true },
    { id: 2, name: "Ravi Kumar", dept: "Sales", avatar: "RK", date: "15 Nov", time: "10:00–04:00", purpose: "Distributor quarterly review", location: "Thane, Mumbai", selfie: true, gps: true },
    { id: 3, name: "Amit Sharma", dept: "Mktg", avatar: "AS", date: "14 Nov", time: "09:30–05:00", purpose: "Product photoshoot — LMN Brands", location: "Worli, Mumbai", selfie: false, gps: true },
];

export default function FieldVisitApproval() {
    const [requests, setRequests] = useState(FV_REQUESTS);

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">Field Visit Approval
                        <span className="bg-[#0066FF]/20 text-[#0066FF] text-sm px-2.5 py-0.5 rounded-full">{requests.length} pending</span>
                    </h2>
                </div>
                <button onClick={() => setRequests([])} className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d]">Approve All</button>
            </div>

            <div className="space-y-4">
                {requests.map(req => (
                    <div key={req.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA]">{req.avatar}</div>
                            <div>
                                <p className="font-semibold">{req.name} <span className="text-xs text-[#8899AA] ml-1">• {req.dept}</span></p>
                                <p className="text-xs text-[#445566]">{req.date} • {req.time}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-3">
                                <p className="text-xs text-[#445566] mb-0.5">Purpose</p>
                                <p className="text-sm font-medium">{req.purpose}</p>
                            </div>
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-3">
                                <p className="text-xs text-[#445566] mb-0.5">Location</p>
                                <p className="text-sm font-medium flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0066FF]" />{req.location}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 text-xs mb-4">
                            <span className={req.gps ? "text-[#00E5A0]" : "text-[#FF4444]"}>{req.gps ? "✅ GPS verified" : "❌ GPS missing"}</span>
                            <span className={req.selfie ? "text-[#00E5A0]" : "text-[#FFB800]"}>{req.selfie ? "✅ Selfie uploaded" : "⚠️ No selfie"}</span>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setRequests(r => r.filter(x => x.id !== req.id))}
                                className="px-4 py-2 bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 text-sm font-semibold rounded-xl hover:bg-[#00E5A0]/20 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Approve
                            </button>
                            <button onClick={() => setRequests(r => r.filter(x => x.id !== req.id))}
                                className="px-4 py-2 bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30 text-sm font-semibold rounded-xl hover:bg-[#FF4444]/20 flex items-center gap-1.5">
                                <XOctagon className="w-4 h-4" /> Reject
                            </button>
                        </div>
                    </div>
                ))}
                {requests.length === 0 && (
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-16 text-center">
                        <CheckCircle2 className="w-12 h-12 text-[#00E5A0] mx-auto mb-3 opacity-60" />
                        <p className="text-[#8899AA]">All field visit requests reviewed.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
