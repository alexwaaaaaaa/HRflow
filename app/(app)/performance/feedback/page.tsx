"use client";
import React, { useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Send, Star, Plus, Loader2 } from "lucide-react";

const FEED_ITEMS = [
    { id: 1, from: "Rajesh Kumar", fromRole: "Manager", to: "Anjali Singh", type: "appreciation", msg: "Outstanding work on the Q3 client pitch. Your presentation skills really stood out!", date: "Today, 9:45 AM", likes: 8, avatar: "RK" },
    { id: 2, from: "Priya Nair", fromRole: "Peer", to: "Rahul Sharma", type: "appreciation", msg: "Rahul, your code review feedback was incredibly detailed and helped me learn a ton!", date: "Yesterday, 3:20 PM", likes: 5, avatar: "PN" },
    { id: 3, from: "Suresh Rao", fromRole: "Manager", to: "Deepak Mehta", type: "constructive", msg: "Deepak, would love to see more proactive communication on blockers before sprint demos.", date: "02 Mar", likes: 1, avatar: "SR" },
    { id: 4, from: "Anjali Singh", fromRole: "Peer", to: "Meena Reddy", type: "appreciation", msg: "Meena, the onboarding playbook you created has been a game changer for the entire HR team!", date: "01 Mar", likes: 12, avatar: "AS" },
];

export default function ContinuousFeedback() {
    const [feedItems, setFeedItems] = useState(FEED_ITEMS);
    const [showForm, setShowForm] = useState(false);
    const [toEmp, setToEmp] = useState("");
    const [feedType, setFeedType] = useState<"appreciation" | "constructive">("appreciation");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [sending, setSending] = useState(false);
    const [liked, setLiked] = useState<number[]>([]);

    function sendFeedback() {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setFeedItems(prev => [{
                id: Date.now(), from: "You", fromRole: "Peer", to: toEmp,
                type: feedType, msg: message, date: "Just now", likes: 0, avatar: "ME"
            }, ...prev]);
            setShowForm(false); setMessage(""); setToEmp(""); setRating(0);
        }, 1500);
    }

    return (
        <div className="p-6 md:p-8 max-w-[800px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Continuous Feedback</h1>
                    <p className="text-sm text-[#8899AA]">Real-time peer and manager feedback across the organisation</p>
                </div>
                <button onClick={() => setShowForm(v => !v)} className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                    <Plus size={14} /> Give Feedback
                </button>
            </div>

            {/* Give feedback form */}
            {showForm && (
                <div className="bg-[#0D1928] border border-[#00E5A0]/30 rounded-2xl p-5 mb-6">
                    <h3 className="font-semibold mb-4">Give Feedback</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">To *</label>
                            <input value={toEmp} onChange={e => setToEmp(e.target.value)} placeholder="Employee name"
                                className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">Type</label>
                            <div className="flex gap-2">
                                {(["appreciation", "constructive"] as const).map(t => (
                                    <button key={t} onClick={() => setFeedType(t)}
                                        className={`flex-1 h-9 text-xs capitalize rounded-xl border transition-all ${feedType === t ? t === "appreciation" ? "border-[#00E5A0]/50 bg-[#00E5A0]/10 text-[#00E5A0]" : "border-[#FFB800]/50 bg-[#FFB800]/10 text-[#FFB800]" : "border-[#1A2A3A] text-[#8899AA]"}`}>
                                        {t === "appreciation" ? "👏 Appreciation" : "💬 Constructive"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="block text-xs text-[#8899AA] mb-1">Message *</label>
                        <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Share specific, actionable feedback..."
                            className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs text-[#8899AA] mb-1.5">Optional Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(s => (
                                <button key={s} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                                    <Star size={20} style={{ color: s <= (hover || rating) ? "#FFB800" : "#1A2A3A", fill: s <= (hover || rating) ? "#FFB800" : "#1A2A3A" }} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowForm(false)} className="h-9 px-4 bg-transparent border border-[#1A2A3A] text-sm text-white rounded-xl hover:bg-[#1A2A3A]">Cancel</button>
                        <button onClick={sendFeedback} disabled={!toEmp || !message || sending}
                            className="flex-1 h-9 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#00c98d] disabled:opacity-50 transition-all">
                            {sending ? <><Loader2 size={13} className="animate-spin" /> Sending...</> : <><Send size={13} /> Send Feedback</>}
                        </button>
                    </div>
                </div>
            )}

            {/* Feed */}
            <div className="space-y-4">
                {feedItems.map(item => (
                    <div key={item.id} className={`bg-[#0D1928] border rounded-2xl p-5 ${item.type === "appreciation" ? "border-[#00E5A0]/20" : "border-[#FFB800]/20"}`}>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0">{item.avatar}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-sm font-semibold text-white">{item.from}</span>
                                    <span className="text-[10px] text-[#445566]">{item.fromRole}</span>
                                    <span className="text-[10px] text-[#445566]">→</span>
                                    <span className="text-sm font-semibold" style={{ color: item.type === "appreciation" ? "#00E5A0" : "#FFB800" }}>{item.to}</span>
                                </div>
                                <div className="mb-1">
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${item.type === "appreciation" ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#FFB800]/10 text-[#FFB800]"}`}>
                                        {item.type === "appreciation" ? "👏 Appreciation" : "💬 Constructive"}
                                    </span>
                                </div>
                                <p className="text-sm text-[#8899AA] mt-2 leading-relaxed">{item.msg}</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="text-[11px] text-[#445566]">{item.date}</span>
                                    <button onClick={() => setLiked(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])}
                                        className={`flex items-center gap-1 text-[11px] transition-colors ${liked.includes(item.id) ? "text-[#0066FF]" : "text-[#445566] hover:text-[#8899AA]"}`}>
                                        <ThumbsUp size={12} /> {item.likes + (liked.includes(item.id) ? 1 : 0)}
                                    </button>
                                    <button className="flex items-center gap-1 text-[11px] text-[#445566] hover:text-[#8899AA] transition-colors">
                                        <MessageSquare size={12} /> Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
