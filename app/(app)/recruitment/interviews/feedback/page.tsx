"use client";
import React, { useState } from "react";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, Save, Send } from "lucide-react";

const CRITERIA = [
    { id: "c1", label: "React & Next.js Fundamentals", desc: "Hooks, SSR, Routing, Context" },
    { id: "c2", label: "System Design", desc: "Component architecture, State Management" },
    { id: "c3", label: "Communication & Clarity", desc: "Explaining thought process clearly" },
];

export default function InterviewFeedback() {
    const [scores, setScores] = useState<Record<string, number>>({});
    const [decision, setDecision] = useState<"Hire" | "No Hire" | "Hold" | null>(null);

    return (
        <div className="p-6 md:p-8 max-w-[800px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><ArrowLeft size={16} /></button>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Feedback: Rahul Sharma</h1>
                        <p className="text-sm text-[#8899AA]">Technical Round · Sr. Frontend Engineer</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">

                {/* Scorecard */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold text-white mb-4">Competency Scorecard</h3>
                    <div className="space-y-6">
                        {CRITERIA.map(c => (
                            <div key={c.id} className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-white mb-1">{c.label}</p>
                                    <p className="text-[11px] text-[#445566]">{c.desc}</p>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button key={s} onClick={() => setScores(p => ({ ...p, [c.id]: s }))}
                                            className="w-10 h-10 border border-[#1A2A3A] rounded-lg flex flex-col items-center justify-center group hover:border-[#00E5A0] transition-all"
                                            style={scores[c.id] === s ? { background: "#00E5A020", borderColor: "#00E5A0" } : {}}>
                                            <Star size={12} fill={scores[c.id] >= s ? "#00E5A0" : "transparent"} color={scores[c.id] >= s ? "#00E5A0" : "#445566"} />
                                            <span className={`text-[9px] mt-1 font-bold ${scores[c.id] >= s ? 'text-[#00E5A0]' : 'text-[#445566]'}`}>{s}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Notes */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold text-white mb-4">Interview Notes</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-[#8899AA] mb-1.5 flex justify-between">
                                <span>Strengths</span>
                                <span className="text-[#00E5A0]">Good to hire</span>
                            </label>
                            <textarea rows={3} placeholder="What did the candidate do well?" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00E5A0] resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-[#8899AA] mb-1.5 flex justify-between">
                                <span>Areas of Concern</span>
                                <span className="text-[#FF4444]">Red flags</span>
                            </label>
                            <textarea rows={3} placeholder="Where did they struggle?" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#FF4444] resize-none" />
                        </div>
                    </div>
                </div>

                {/* Final Recommendation */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold text-white mb-4">Overall Recommendation</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { id: "Hire", icon: ThumbsUp, color: "#00E5A0", bg: "#00E5A0" },
                            { id: "Hold", icon: Star, color: "#FFB800", bg: "#FFB800" },
                            { id: "No Hire", icon: ThumbsDown, color: "#FF4444", bg: "#FF4444" }
                        ].map(r => (
                            <button key={r.id} onClick={() => setDecision(r.id as any)}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${decision === r.id ? '' : 'border-[#1A2A3A] hover:bg-[#1A2A3A]/30'}`}
                                style={decision === r.id ? { borderColor: r.color, background: r.bg + "15", color: r.color } : { color: "#8899AA" }}>
                                <r.icon size={24} />
                                <span className="text-sm font-bold">{r.id}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-4">
                    <button className="h-12 px-6 bg-[#0D1928] border border-[#1A2A3A] text-white font-medium rounded-xl hover:bg-[#1A2A3A] flex items-center gap-2 transition-colors">
                        <Save size={16} /> Save Draft
                    </button>
                    <button className="h-12 px-8 bg-[#0066FF] text-white font-bold rounded-xl hover:bg-[#0052cc] flex items-center gap-2 transition-colors">
                        <Send size={16} /> Submit Scorecard
                    </button>
                </div>

            </div>
        </div>
    );
}
