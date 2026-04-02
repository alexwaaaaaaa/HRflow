"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, ChevronRight, Plus, ThumbsUp, Send, Star } from "lucide-react";

const FEED = [
    { from: "Ravi Kumar", role: "Eng Lead", avatar: "RK", time: "2h ago", text: "Great job facilitating today's cross-team meeting — kept everyone aligned and action-focused.", type: "praise", rating: 5 },
    { from: "Sneha Rao", role: "Product Manager", avatar: "SR", time: "Yesterday", text: "Would love to see more proactive communication on blockers before they escalate. Overall strong cycle.", type: "constructive", rating: 3 },
    { from: "Kavita Joshi", role: "HR Manager", avatar: "KJ", time: "3 days ago", text: "Really appreciate how you handled the difficult vendor conversation. Showed strong ownership.", type: "praise", rating: 4 },
    { from: "Arjun Singh", role: "Marketing Head", avatar: "AS", time: "5 days ago", text: "Documentation could be more structured. Otherwise, the collaboration was excellent.", type: "constructive", rating: 3 },
];

const TYPE_CONFIG = {
    praise: { label: "Praise", color: "#00E5A0" },
    constructive: { label: "Constructive", color: "#FFB800" },
};

export default function ContinuousFeedbackScreen() {
    const [newText, setNewText] = useState("");
    const [newRecipient, setNewRecipient] = useState("");

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                            <Link href="/feedback/dashboard" className="hover:text-white">Feedback</Link>
                            <ChevronRight size={12} aria-hidden="true" />
                            <span className="text-white">Continuous Feedback</span>
                        </nav>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <MessageCircle className="text-[#00E5A0]" size={24} aria-hidden="true" /> Continuous Feedback
                        </h1>
                        <p className="text-sm text-[#8899AA] mt-1">Real-time peer feedback — give and receive anytime.</p>
                    </div>
                </header>

                {/* Give quick feedback */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5" aria-labelledby="give-quick-heading">
                    <h2 id="give-quick-heading" className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <Plus size={14} className="text-[#00E5A0]" aria-hidden="true" /> Give Quick Feedback
                    </h2>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="cf-recipient" className="block text-xs font-semibold text-[#8899AA] mb-1.5">To</label>
                            <input
                                id="cf-recipient"
                                type="text"
                                value={newRecipient}
                                onChange={e => setNewRecipient(e.target.value)}
                                placeholder="Search employee…"
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                            />
                        </div>
                        <div>
                            <label htmlFor="cf-text" className="block text-xs font-semibold text-[#8899AA] mb-1.5">Feedback</label>
                            <textarea
                                id="cf-text"
                                value={newText}
                                onChange={e => setNewText(e.target.value)}
                                placeholder="Specific, actionable, and kind…"
                                rows={3}
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                disabled={!newText.trim() || !newRecipient.trim()}
                                className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#00c98d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Send size={13} aria-hidden="true" /> Send Feedback
                            </button>
                        </div>
                    </div>
                </section>

                {/* Feed */}
                <section aria-labelledby="feed-heading">
                    <h2 id="feed-heading" className="text-sm font-semibold text-white mb-3">Recent Feedback Received</h2>
                    <ol role="list" className="space-y-4">
                        {FEED.map((f, i) => {
                            const cfg = TYPE_CONFIG[f.type as keyof typeof TYPE_CONFIG];
                            return (
                                <li key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0" aria-hidden="true">{f.avatar}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-semibold text-white">{f.from}</span>
                                                <span className="text-xs text-[#445566]">·</span>
                                                <span className="text-xs text-[#8899AA]">{f.role}</span>
                                                <span className="text-xs text-[#445566] ml-auto">{f.time}</span>
                                            </div>
                                            <p className="text-sm text-[#CCDDEE] mb-3">{f.text}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ color: cfg.color, borderColor: cfg.color + "40", background: cfg.color + "15" }}>
                                                    {cfg.label}
                                                </span>
                                                <div className="flex items-center gap-0.5" aria-label={`Rating: ${f.rating} out of 5`}>
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <Star key={n} size={12} className={n <= f.rating ? "text-[#FFB800] fill-[#FFB800]" : "text-[#2A3A4A]"} aria-hidden="true" />
                                                    ))}
                                                </div>
                                                <button type="button" className="ml-auto flex items-center gap-1 text-xs text-[#445566] hover:text-[#00E5A0] transition-colors" aria-label="Like this feedback">
                                                    <ThumbsUp size={12} aria-hidden="true" /> Helpful
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </section>

            </div>
        </main>
    );
}
