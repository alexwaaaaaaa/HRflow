"use client";
import React, { useState } from 'react';
import {
    Heart, MessageSquare, Medal, TrendingUp, Search, Filter, Share2, MoreHorizontal, Zap, Users, Star, Gift
} from 'lucide-react';
import Link from 'next/link';

export default function RecognitionFeedScreen() {
    const [activeTab, setActiveTab] = useState('Global');

    const FEED_ITEMS = [
        { id: 1, from: "Sarah Jenkins", to: "Michael Chen", toRole: "DevOps Lead", badge: "Problem Solver", icon: Zap, color: "#9D00FF", bg: "bg-[#9D00FF]/10", border: "border-[#9D00FF]/30", points: 50, message: "Thanks for jumping into the critical Sev-1 incident this weekend. Your quick thinking saved us hours of downtime!", time: "2 hours ago", likes: 12, comments: 3, isLiked: true },
        { id: 2, from: "David Rodriguez", to: "Emma Wilson", toRole: "Marketing Spec", badge: "Team Player", icon: Users, color: "#33E6FF", bg: "bg-[#33E6FF]/10", border: "border-[#33E6FF]/30", points: 25, message: "Emma is always ready to lend a helping hand. Thanks for helping the content team with the Q3 assets!", time: "5 hours ago", likes: 8, comments: 1, isLiked: false },
        { id: 3, from: "Alex Patel", to: "Jessica Kim", toRole: "Senior Engineer", badge: "Innovator", icon: LightbulbIcon, color: "#FFB020", bg: "bg-[#FFB020]/10", border: "border-[#FFB020]/30", points: 100, message: "Brilliant implementation of the new caching layer. The latency has dropped drastically.", time: "1 day ago", likes: 24, comments: 5, isLiked: false },
        { id: 4, from: "Jessica Kim", to: "Alex Patel", toRole: "Engineering Mgr", badge: "Above & Beyond", icon: Star, color: "#00E5A0", bg: "bg-[#00E5A0]/10", border: "border-[#00E5A0]/30", points: 50, message: "Appreciate the mentorship and guidance on the new architecture. Couldn't have done it without you!", time: "2 days ago", likes: 18, comments: 2, isLiked: true },
    ];

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Heart size={32} className="text-[#FF4444]" fill="currentColor" /> Recognition Feed
                    </h1>
                    <p className="text-[#8899AA]">See who's making an impact and celebrate your colleagues' success.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/rr/give" className="px-5 py-2.5 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                        Give Recognition
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Main Feed */}
                <div className="flex-1 w-full space-y-6 lg:max-w-[750px]">

                    {/* Controls */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-2 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sticky top-4 z-40 shadow-xl">
                        <div className="flex items-center gap-1 bg-[#0A1420] p-1 rounded-xl w-max border border-[#1A2A3A]">
                            {['Global', 'My Team', 'Following'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-[#1A2A3A] text-white shadow-md border border-[#2A3A4A]' : 'text-[#8899AA] hover:text-white'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 px-2">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                <input type="text" placeholder="Search feed..." className="w-48 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#33E6FF]" />
                            </div>
                            <button className="p-2 border border-[#2A3A4A] bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Feed Items */}
                    <div className="space-y-6">
                        {FEED_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-6 shadow-lg hover:border-[#2A3A4A] transition-colors relative overflow-hidden">

                                    {/* Interactive Background Glow based on Badge */}
                                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-[0.03] pointer-events-none" style={{ backgroundColor: item.color }}></div>

                                    {/* Top: Header */}
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-4">
                                                <div className="w-12 h-12 rounded-full border-2 border-[#0F1C2E] bg-[#1A2A3A] flex items-center justify-center text-white font-bold z-10 shadow-lg">
                                                    {item.from.charAt(0)}
                                                </div>
                                                <div className="w-12 h-12 rounded-full border-2 border-[#0F1C2E] bg-gradient-to-tr from-[#33E6FF] to-blue-500 flex items-center justify-center text-white font-bold z-0 relative">
                                                    {item.to.charAt(0)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center flex-wrap gap-x-1.5 text-base">
                                                    <span className="font-bold text-white">{item.from}</span>
                                                    <span className="text-[#8899AA]">recognized</span>
                                                    <span className="font-bold text-[#33E6FF] hover:underline cursor-pointer">{item.to}</span>
                                                </div>
                                                <p className="text-xs text-[#445566] font-medium">{item.toRole} • {item.time}</p>
                                            </div>
                                        </div>
                                        <button className="text-[#445566] hover:text-white"><MoreHorizontal size={20} /></button>
                                    </div>

                                    {/* Middle: Badge & Points */}
                                    <div className="flex items-center justify-between bg-[#152336] border border-[#1A2A3A] rounded-2xl p-4 mb-5 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.border} border shadow-inner`}>
                                                <Icon size={20} color={item.color} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-0.5" style={{ color: item.color }}>Awarded Badge</p>
                                                <p className="text-white font-bold">{item.badge}</p>
                                            </div>
                                        </div>
                                        {item.points > 0 && (
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider mb-0.5">Points</span>
                                                <span className="text-xl font-black text-[#00E5A0] bg-[#00E5A0]/10 px-3 py-1 rounded-lg border border-[#00E5A0]/20">+{item.points}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <p className="text-[#CCDDEE] text-[15px] leading-relaxed mb-6 font-medium relative z-10 pl-2 border-l-2 border-[#2A3A4A]">
                                        "{item.message}"
                                    </p>

                                    {/* Bottom: Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-[#1A2A3A] relative z-10">
                                        <div className="flex items-center gap-6">
                                            <button className={`flex items-center gap-2 text-sm font-bold transition-colors ${item.isLiked ? 'text-[#FF4444]' : 'text-[#8899AA] hover:text-[#FF4444]'}`}>
                                                <Heart size={18} className={item.isLiked ? "fill-[#FF4444]" : ""} /> {item.likes} <span className="hidden sm:inline">Likes</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-sm font-bold text-[#8899AA] hover:text-[#33E6FF] transition-colors">
                                                <MessageSquare size={18} /> {item.comments} <span className="hidden sm:inline">Comments</span>
                                            </button>
                                        </div>
                                        <button className="flex items-center gap-2 text-sm font-bold text-[#8899AA] hover:text-white transition-colors">
                                            <Share2 size={18} /> <span className="hidden sm:inline">Share</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="w-full lg:w-[320px] shrink-0 space-y-6">

                    {/* Quick Profile */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#1A2A3A] to-[#0A1420]"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#33E6FF] to-blue-500 border-4 border-[#0F1C2E] shadow-xl flex items-center justify-center text-white font-bold text-2xl mb-3">
                                JD
                            </div>
                            <h3 className="text-white font-bold text-lg">John Doe</h3>
                            <p className="text-[#8899AA] text-sm mb-6">Senior Designer</p>

                            <div className="w-full grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-[#152336] border border-[#1A2A3A] p-3 rounded-xl text-center">
                                    <div className="text-2xl font-black text-[#00E5A0]">2.5k</div>
                                    <div className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider mt-1">Wallet Pts</div>
                                </div>
                                <div className="bg-[#152336] border border-[#1A2A3A] p-3 rounded-xl text-center">
                                    <div className="text-2xl font-black text-[#FFB020]">12</div>
                                    <div className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider mt-1">Badges</div>
                                </div>
                            </div>

                            <Link href="/engagement/rr/my-rewards" className="w-full py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors text-center text-sm flex items-center justify-center gap-2">
                                <Gift size={16} /> View My Rewards
                            </Link>
                        </div>
                    </div>

                    {/* Top Recognizers */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-[#33E6FF]" /> Top Recognizers (Oct)
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: "Sarah Jenkins", count: 18, color: "#33E6FF" },
                                { name: "Alex Patel", count: 14, color: "#00E5A0" },
                                { name: "David Rodriguez", count: 12, color: "#FFB020" }
                            ].map((user, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-[#CCDDEE]">{user.name}</span>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: `${user.color}15`, color: user.color }}>
                                        {user.count} given
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function LightbulbIcon(props: any) {
    return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>;
}
