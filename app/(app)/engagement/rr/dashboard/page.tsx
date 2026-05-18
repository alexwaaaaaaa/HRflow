"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import {
    Award, Gift, Star, TrendingUp, Users, Heart, Medal, Plus, ArrowRight, ChevronRight, Zap
} from 'lucide-react';
import Link from 'next/link';

export default function RRDashboardScreen() {
    const recentRecognitions = [
        { id: 1, from: "Sarah Jenkins", to: "Michael Chen", badge: "Problem Solver", points: 50, message: "Thanks for jumping into the critical Sev-1 incident this weekend. Your quick thinking saved us hours of downtime!", time: "2 hours ago", likes: 12, comments: 3 },
        { id: 2, from: "David Rodriguez", to: "Emma Wilson", badge: "Team Player", points: 25, message: "Emma is always ready to lend a helping hand. Thanks for helping the content team with the Q3 assets!", time: "5 hours ago", likes: 8, comments: 1 },
        { id: 3, from: "Alex Patel", to: "Jessica Kim", badge: "Innovator", points: 100, message: "Brilliant implementation of the new caching layer. The latency has dropped drastically.", time: "1 day ago", likes: 24, comments: 5 },
    ];

    const leaderboard = [
        { rank: 1, name: "Jessica Kim", role: "Senior Engineer", points: 1250, delta: "+150" },
        { rank: 2, name: "Michael Chen", role: "DevOps Lead", points: 980, delta: "+50" },
        { rank: 3, name: "Emma Wilson", role: "Marketing Spec", points: 845, delta: "+75" },
        { rank: 4, name: "James Anderson", role: "Product Manager", points: 720, delta: "+20" },
        { rank: 5, name: "Sarah Jenkins", role: "Engineering Mgr", points: 690, delta: "-10" },
    ];

    return (
        <Page
            title="Recognition & Rewards"
            subtitle="Celebrate wins, appreciate peers, and redeem your hard-earned points."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Rr", href: "/engagement/rr" }, { label: "Dashboard" }]}
            maxWidth="1400px"
        >

        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-3">
                        <Award size={32} className="text-[#00E5A0]" /> Recognition & Rewards
                    </h1>
                    <p className="text-[#8899AA] text-lg">Celebrate wins, appreciate peers, and redeem your hard-earned points.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/rr/give" className="px-6 py-2.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] justify-center transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(0,229,160,0.2)]">
                        <Plus size={20} /> Give Recognition
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Left Column: Wallet & KPIs */}
                <div className="col-span-1 flex flex-col gap-6">

                    {/* Wallet Card */}
                    <div className="p-6 rounded-3xl border border-[#2A3A4A] bg-gradient-to-br from-[#0A1420] to-[#152336] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#33E6FF]/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-[#33E6FF]/20 transition-all duration-500"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-[#33E6FF]/10 flex items-center justify-center text-[#33E6FF] border border-[#33E6FF]/20">
                                <Gift size={24} />
                            </div>
                            <Link href="/engagement/rr/catalog" className="text-sm font-semibold text-[#8899AA] hover:text-[#33E6FF] flex items-center gap-1 transition-colors">
                                Redeem <ArrowRight size={14} />
                            </Link>
                        </div>
                        <p className="text-[#8899AA] font-medium text-sm uppercase tracking-wider mb-1 relative z-10">My Reward Balance</p>
                        <h2 className="text-5xl font-black text-white mb-2 relative z-10 font-mono tracking-tighter">4,250<span className="text-lg text-[#33E6FF] ml-2 font-sans tracking-normal">pts</span></h2>
                        <p className="text-sm text-[#00E5A0] font-medium flex items-center gap-1.5 relative z-10">
                            <TrendingUp size={14} /> +250 points this month
                        </p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl border border-[#2A3A4A] bg-[#0F1C2E] hover:border-[#FFB020]/50 transition-colors">
                            <Medal size={20} className="text-[#FFB020] mb-3" />
                            <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Badges Earned</p>
                            <p className="text-2xl font-bold text-white">12</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-[#2A3A4A] bg-[#0F1C2E] hover:border-[#FF4444]/50 transition-colors">
                            <Heart size={20} className="text-[#FF4444] mb-3" />
                            <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Appreciations</p>
                            <p className="text-2xl font-bold text-white">48</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-[#2A3A4A] bg-[#0F1C2E] hover:border-[#9D00FF]/50 transition-colors">
                            <Users size={20} className="text-[#9D00FF] mb-3" />
                            <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Peers Honored</p>
                            <p className="text-2xl font-bold text-white">24</p>
                        </div>
                        <div className="p-5 rounded-2xl border border-[#2A3A4A] bg-[#0F1C2E] hover:border-[#00E5A0]/50 transition-colors">
                            <Star size={20} className="text-[#00E5A0] mb-3" />
                            <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Global Rank</p>
                            <p className="text-2xl font-bold text-white">#14</p>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="flex-1 border border-[#2A3A4A] rounded-3xl bg-[#0F1C2E] overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <TrophyIcon /> Leaderboard (Oct)
                            </h3>
                            <button className="text-xs text-[#33E6FF] hover:underline font-semibold">Full List</button>
                        </div>
                        <div className="p-2 flex-1 overflow-y-auto">
                            {leaderboard.map((user, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1A2A3A] transition-colors group">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-[#FFB020] text-[#0A1420]' : idx === 1 ? 'bg-[#8899AA] text-[#0A1420]' : idx === 2 ? 'bg-[#CD7F32] text-[#0A1420]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>
                                        {user.rank}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                        <p className="text-xs text-[#8899AA] truncate">{user.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#00E5A0]">{user.points} <span className="text-[10px] text-[#445566]">pt</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Feed */}
                <div className="col-span-1 lg:col-span-2 border border-[#2A3A4A] rounded-3xl bg-[#0F1C2E] overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Zap size={22} className="text-[#FFB020]" /> Company Recognition Feed
                        </h3>
                        <Link href="/engagement/rr/feed" className="text-sm font-bold text-[#8899AA] hover:text-white flex items-center gap-1 transition-colors">
                            View All <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto space-y-6">
                        {recentRecognitions.map((rec) => (
                            <div key={rec.id} className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6 shadow-md hover:border-[#33E6FF]/30 transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#33E6FF] to-blue-500 border-2 border-[#152336] flex items-center justify-center text-white font-bold text-sm z-10 shadow-lg">
                                                {rec.from.charAt(0)}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9D00FF] to-purple-500 border-2 border-[#152336] flex items-center justify-center text-white font-bold text-sm z-0">
                                                {rec.to.charAt(0)}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white text-sm">
                                                <span className="font-bold">{rec.from}</span> recognized <span className="font-bold text-[#33E6FF]">{rec.to}</span>
                                            </p>
                                            <p className="text-xs text-[#8899AA]">{rec.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFB020]/10 border border-[#FFB020]/20 rounded-full">
                                        <Medal size={14} className="text-[#FFB020]" />
                                        <span className="text-xs font-bold text-[#FFB020]">{rec.badge}</span>
                                    </div>
                                </div>

                                <p className="text-[#CCDDEE] text-sm md:text-base leading-relaxed mb-6">
                                    "{rec.message}"
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-[#1A2A3A]">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-[#8899AA] hover:text-[#FF4444] transition-colors group">
                                            <Heart size={16} className="group-hover:fill-[#FF4444]" /> {rec.likes}
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-[#8899AA] hover:text-[#33E6FF] transition-colors">
                                            <MessageSquareIcon /> {rec.comments}
                                        </button>
                                    </div>
                                    {rec.points > 0 && (
                                        <span className="text-xs font-extrabold text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded">
                                            +{rec.points} pts
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}

function TrophyIcon() {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>;
}

function MessageSquareIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
