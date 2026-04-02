"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Heart, ChevronRight, Plus, ThumbsUp, Send, Smile, Zap, Star, Award } from "lucide-react";

const BADGES = [
    { icon: Star, label: "Star Performer", color: "#FFB800", bg: "#FFB800" },
    { icon: Zap, label: "Problem Solver", color: "#9D00FF", bg: "#9D00FF" },
    { icon: Heart, label: "Team Player", color: "#FF4444", bg: "#FF4444" },
    { icon: Award, label: "Innovation Champion", color: "#00E5A0", bg: "#00E5A0" },
    { icon: Smile, label: "Culture Ambassador", color: "#0066FF", bg: "#0066FF" },
];

const KUDOS_FEED = [
    { from: "Kavita Joshi", to: "Ravi Kumar", badge: "Problem Solver", note: "Brilliant debugging session that saved our release! 🚀", time: "1h ago", likes: 12 },
    { from: "Arjun Singh", to: "Sneha Rao", badge: "Team Player", note: "Always goes above and beyond to unblock the team. Absolute legend!", time: "3h ago", likes: 8 },
    { from: "Priya Mehta", to: "Rahul Gupta", badge: "Star Performer", note: "Delivered the ops migration 2 weeks early. Outstanding work!", time: "1d ago", likes: 15 },
];

export default function KudosScreen() {
    const [recipient, setRecipient] = useState("");
    const [note, setNote] = useState("");
    const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
    const [liked, setLiked] = useState<number[]>([]);

    return (
        <main className="min-h-screen bg-[#060B14] text-white p-6 pb-16 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                <header>
                    <nav className="flex items-center gap-1 text-xs text-[#8899AA] mb-1" aria-label="Breadcrumb">
                        <Link href="/feedback/dashboard" className="hover:text-white">Feedback</Link>
                        <ChevronRight size={12} aria-hidden="true" />
                        <span className="text-white">Kudos</span>
                    </nav>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Heart className="text-[#FF4444]" size={24} aria-hidden="true" /> Kudos Wall
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Celebrate and recognize your teammates publicly.</p>
                </header>

                {/* Give Kudos card */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="give-kudos-heading">
                    <h2 id="give-kudos-heading" className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                        <Plus size={14} className="text-[#FFB800]" aria-hidden="true" /> Give Kudos
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="kudos-recipient" className="block text-xs font-semibold text-[#8899AA] mb-1.5">To</label>
                            <input
                                id="kudos-recipient"
                                type="text"
                                value={recipient}
                                onChange={e => setRecipient(e.target.value)}
                                placeholder="Search teammate…"
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FFB800]"
                            />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#8899AA] mb-2">Select a Badge</p>
                            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select recognition badge">
                                {BADGES.map(b => (
                                    <label key={b.label} className="cursor-pointer">
                                        <input type="radio" name="badge" value={b.label} className="sr-only" onChange={() => setSelectedBadge(b.label)} checked={selectedBadge === b.label} />
                                        <div
                                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${selectedBadge === b.label ? "border-current" : "border-[#1A2A3A] text-[#445566] hover:border-[#2A3A4A]"}`}
                                            style={selectedBadge === b.label ? { color: b.color, borderColor: b.color, background: b.bg + "15" } : {}}
                                            aria-hidden="true"
                                        >
                                            <b.icon size={13} style={selectedBadge === b.label ? { color: b.color } : {}} aria-hidden="true" />
                                            {b.label}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="kudos-note" className="block text-xs font-semibold text-[#8899AA] mb-1.5">Message</label>
                            <textarea
                                id="kudos-note"
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                placeholder="Tell them specifically why they deserve this kudos…"
                                rows={3}
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FFB800] resize-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                disabled={!recipient || !selectedBadge || !note}
                                className="flex items-center gap-2 bg-[#FFB800] text-[#060B14] font-bold text-sm px-5 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Send size={13} aria-hidden="true" /> Send Kudos 🎉
                            </button>
                        </div>
                    </div>
                </section>

                {/* Feed */}
                <section aria-labelledby="kudos-feed-heading">
                    <h2 id="kudos-feed-heading" className="text-base font-semibold text-white mb-4">Recent Kudos</h2>
                    <ol role="list" className="space-y-4">
                        {KUDOS_FEED.map((k, i) => {
                            const badge = BADGES.find(b => b.label === k.badge) || BADGES[0];
                            const isLiked = liked.includes(i);
                            return (
                                <li key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: badge.bg + "20" }}
                                            aria-hidden="true"
                                        >
                                            <badge.icon size={18} style={{ color: badge.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                                <span className="text-sm font-bold text-white">{k.from}</span>
                                                <span className="text-xs text-[#445566]">→</span>
                                                <span className="text-sm font-bold" style={{ color: badge.color }}>{k.to}</span>
                                                <span
                                                    className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                                    style={{ color: badge.color, borderColor: badge.color + "40", background: badge.bg + "15" }}
                                                >
                                                    {k.badge}
                                                </span>
                                                <span className="ml-auto text-xs text-[#445566]">{k.time}</span>
                                            </div>
                                            <p className="text-sm text-[#CCDDEE] mb-3">{k.note}</p>
                                            <button
                                                type="button"
                                                onClick={() => setLiked(prev => isLiked ? prev.filter(n => n !== i) : [...prev, i])}
                                                aria-pressed={isLiked}
                                                aria-label={`${isLiked ? "Unlike" : "Like"} kudos for ${k.to}`}
                                                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isLiked ? "text-[#FF4444]" : "text-[#445566] hover:text-[#FF4444]"}`}
                                            >
                                                <Heart size={13} className={isLiked ? "fill-[#FF4444]" : ""} aria-hidden="true" />
                                                {k.likes + (isLiked ? 1 : 0)} Likes
                                            </button>
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
