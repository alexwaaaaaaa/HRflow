"use client";
import React from "react";
import {
    Trophy, Flame, Star, Award, Zap, ChevronUp, Target, Hexagon
} from "lucide-react";

const LEADERBOARD = [
    { rank: 1, name: "Arjun Kumar", dept: "Engineering", xp: "14,500", level: 24, trend: "up", avatar: "https://i.pravatar.cc/150?u=1" },
    { rank: 2, name: "Riya Sharma", dept: "Design", xp: "13,200", level: 22, trend: "same", avatar: "https://i.pravatar.cc/150?u=2" },
    { rank: 3, name: "Vikram Singh", dept: "Product", xp: "12,850", level: 21, trend: "down", avatar: "https://i.pravatar.cc/150?u=3" },
    { rank: 4, name: "Sneha Patel", dept: "Sales", xp: "11,100", level: 19, trend: "up", avatar: "https://i.pravatar.cc/150?u=4" },
    { rank: 5, name: "Rahul Dev", dept: "Engineering", xp: "10,950", level: 18, trend: "up", avatar: "https://i.pravatar.cc/150?u=5" },
];

const BADGES = [
    { icon: Flame, title: "7-Day Streak", desc: "Learned for 7 consecutive days", color: "text-[#FF4444]", bg: "bg-[#FF4444]/10", border: "border-[#FF4444]/30", earned: true },
    { icon: Star, title: "Top 10%", desc: "In the top 10% of learners this month", color: "text-[#FFB020]", bg: "bg-[#FFB020]/10", border: "border-[#FFB020]/30", earned: true },
    { icon: Award, title: "Master Architect", desc: "Completed 5 Advanced courses", color: "text-[#9D00FF]", bg: "bg-[#9D00FF]/10", border: "border-[#9D00FF]/30", earned: true },
    { icon: Zap, title: "Quick Learner", desc: "Finished a course in under 24hrs", color: "text-[#00E5A0]", bg: "bg-[#00E5A0]/10", border: "border-[#00E5A0]/30", earned: false },
    { icon: Target, title: "Perfect Score", desc: "100% on 3 assessments in a row", color: "text-[#33E6FF]", bg: "bg-[#33E6FF]/10", border: "border-[#33E6FF]/30", earned: false },
    { icon: Hexagon, title: "Pathfinder", desc: "Completed an entire Learning Path", color: "text-[#FF4444]", bg: "bg-[#FF4444]/10", border: "border-[#FF4444]/30", earned: false },
];

export default function GamificationScreen() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Hero Header */}
            <div className="bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#FFB020]/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="w-24 h-24 rounded-full border-4 border-[#0A1420] shadow-[0_0_0_2px_#00E5A0] relative shrink-0">
                        <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        <div className="absolute -bottom-2 -right-2 bg-[#00E5A0] text-[#0A1420] text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[#0A1420]">
                            Lvl 24
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Arjun Kumar</h1>
                        <p className="text-[#8899AA] font-medium text-sm">Engineering Department</p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1.5 bg-[#152336] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm font-semibold shadow-inner">
                                <span className="text-[#FFB020]">14,500</span> <span className="text-white text-xs">XP</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#152336] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm font-semibold shadow-inner">
                                <Flame size={14} className="text-[#FF4444]" /> <span className="text-white">12 Day Streak</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-md relative z-10">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-1">Next Level: 25</p>
                            <p className="text-sm text-white font-medium">500 XP to advance</p>
                        </div>
                        <span className="text-[#00E5A0] font-bold">15,000 XP</span>
                    </div>
                    <div className="h-3 bg-[#0A1420] rounded-full overflow-hidden border border-[#2A3A4A] w-full">
                        <div className="h-full bg-gradient-to-r from-[#00E5A0] to-teal-400 rounded-full w-[85%] relative shadow-[0_0_10px_rgba(0,229,160,0.5)]"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content (Badges & Quests) */}
                <div className="lg:col-span-2 space-y-8">

                    <section className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-white mb-6">Badges & Achievements</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {BADGES.map((badge, i) => {
                                const Icon = badge.icon;
                                return (
                                    <div key={i} className={`p-5 rounded-xl border flex flex-col items-center text-center transition-all ${badge.earned ? `${badge.bg} ${badge.border} shadow-[0_5px_15px_rgba(0,0,0,0.2)]` : 'bg-[#0A1420] border-[#1A2A3A] opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${badge.earned ? 'bg-white/10' : 'bg-[#1A2A3A]'}`}>
                                            <Icon size={28} className={badge.earned ? badge.color : 'text-[#445566]'} strokeWidth={1.5} />
                                        </div>
                                        <h3 className={`font-bold mb-1 ${badge.earned ? 'text-white' : 'text-[#8899AA]'}`}>{badge.title}</h3>
                                        <p className="text-xs text-[#8899AA] leading-relaxed">{badge.desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    <section className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-white mb-6">Daily Quests</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#152336] border border-[#2A3A4A] rounded-xl flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-white mb-1">Complete a module quiz</h4>
                                    <p className="text-xs text-[#8899AA]">Pass any end-of-module assessment with 80% or higher.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[#FFB020] font-bold text-sm bg-[#FFB020]/10 px-2 py-1 rounded">+150 XP</span>
                                    <div className="w-20 h-2 bg-[#0A1420] rounded-full border border-[#1A2A3A]">
                                        <div className="w-1/2 h-full bg-[#00E5A0]"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-[#152336] border border-[#2A3A4A] rounded-xl flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-white mb-1">Learn for 30 minutes today</h4>
                                    <p className="text-xs text-[#8899AA]">Watch videos or read course materials.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[#FFB020] font-bold text-sm bg-[#FFB020]/10 px-2 py-1 rounded">+50 XP</span>
                                    <div className="w-20 h-2 bg-[#0A1420] rounded-full border border-[#1A2A3A]">
                                        <div className="w-[80%] h-full bg-[#00E5A0]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar (Leaderboard) */}
                <div className="space-y-8">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#33E6FF]/5 to-transparent pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Trophy size={20} className="text-[#FFB020]" /> Leaderboard
                            </h2>
                            <select className="bg-[#0A1420] border border-[#2A3A4A] text-xs text-[#8899AA] rounded px-2 py-1 outline-none">
                                <option>This Month</option>
                                <option>All Time</option>
                            </select>
                        </div>

                        <div className="space-y-1 relative z-10">
                            {LEADERBOARD.map((user, idx) => (
                                <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${idx === 0 ? 'bg-gradient-to-r from-[#FFB020]/10 to-transparent border border-[#FFB020]/20' : 'hover:bg-[#152336] border border-transparent'}`}>
                                    <div className="w-6 text-center font-bold text-[#445566] shrink-0">
                                        {user.rank === 1 ? <Trophy size={16} className="text-[#FFB020] mx-auto" /> : `#${user.rank}`}
                                    </div>
                                    <img src={user.avatar} className="w-10 h-10 rounded-full border border-[#2A3A4A] shrink-0" alt="Avatar" />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold truncate ${idx === 0 ? 'text-[#FFB020]' : 'text-white'}`}>{user.name}</p>
                                        <p className="text-[10px] text-[#8899AA] uppercase tracking-wider">{user.dept}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-white">{user.xp} <span className="text-[10px] text-[#8899AA] font-normal">XP</span></p>
                                        <div className="flex items-center justify-end gap-1 text-[10px]">
                                            {user.trend === 'up' ? <ChevronUp size={12} className="text-[#00E5A0]" /> : <span className="w-3 h-3 block opacity-0"></span>}
                                            <span className="text-[#8899AA]">Lvl {user.level}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-2 border border-[#2A3A4A] rounded-lg text-xs font-semibold text-white hover:bg-[#1A2A3A] transition-colors relative z-10">
                            View Full Rankings
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
