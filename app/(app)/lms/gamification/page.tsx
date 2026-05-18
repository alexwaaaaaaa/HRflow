"use client";
import React from "react";
import Image from "next/image";
import {
    Trophy, Flame, Star, Award, Zap, ChevronUp, Target, Hexagon,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { seededFloats } from "@/lib/random";

interface LeaderboardUser {
    rank: number;
    name: string;
    dept: string;
    xp: string;
    level: number;
    trend: "up" | "same" | "down";
    avatar: string;
}

const LEADERBOARD: LeaderboardUser[] = [
    { rank: 1, name: "Arjun Kumar", dept: "Engineering", xp: "14,500", level: 24, trend: "up", avatar: "https://i.pravatar.cc/150?u=1" },
    { rank: 2, name: "Riya Sharma", dept: "Design", xp: "13,200", level: 22, trend: "same", avatar: "https://i.pravatar.cc/150?u=2" },
    { rank: 3, name: "Vikram Singh", dept: "Product", xp: "12,850", level: 21, trend: "down", avatar: "https://i.pravatar.cc/150?u=3" },
    { rank: 4, name: "Sneha Patel", dept: "Sales", xp: "11,100", level: 19, trend: "up", avatar: "https://i.pravatar.cc/150?u=4" },
    { rank: 5, name: "Rahul Dev", dept: "Engineering", xp: "10,950", level: 18, trend: "up", avatar: "https://i.pravatar.cc/150?u=5" },
];

interface BadgeItem {
    icon: React.ElementType;
    title: string;
    desc: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    earned: boolean;
}

const BADGES: BadgeItem[] = [
    { icon: Flame, title: "7-Day Streak", desc: "Learned for 7 consecutive days", colorClass: "text-[#FF4444]", bgClass: "bg-[#FF4444]/10", borderClass: "border-[#FF4444]/30", earned: true },
    { icon: Star, title: "Top 10%", desc: "In the top 10% of learners this month", colorClass: "text-[#FFB020]", bgClass: "bg-[#FFB020]/10", borderClass: "border-[#FFB020]/30", earned: true },
    { icon: Award, title: "Master Architect", desc: "Completed 5 Advanced courses", colorClass: "text-[#9D00FF]", bgClass: "bg-[#9D00FF]/10", borderClass: "border-[#9D00FF]/30", earned: true },
    { icon: Zap, title: "Quick Learner", desc: "Finished a course in under 24hrs", colorClass: "text-[#00E5A0]", bgClass: "bg-[#00E5A0]/10", borderClass: "border-[#00E5A0]/30", earned: false },
    { icon: Target, title: "Perfect Score", desc: "100% on 3 assessments in a row", colorClass: "text-[#33E6FF]", bgClass: "bg-[#33E6FF]/10", borderClass: "border-[#33E6FF]/30", earned: false },
    { icon: Hexagon, title: "Pathfinder", desc: "Completed an entire Learning Path", colorClass: "text-[#FF4444]", bgClass: "bg-[#FF4444]/10", borderClass: "border-[#FF4444]/30", earned: false },
];

// Stable decorative progress values — seeded, not Math.random()
const QUEST_PROGRESS = seededFloats(77, 2);
// Static progress values derived from seed (no template-literal classes)
const QUEST_PROGRESS_VALUES = [
    Math.round((QUEST_PROGRESS[0] ?? 0.5) * 100),
    Math.round((QUEST_PROGRESS[1] ?? 0.8) * 100),
] as const;

export default function GamificationScreen() {
    return (
        <Page
            title="Learning Achievements"
            subtitle="Track your XP, badges, daily quests, and leaderboard ranking"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Gamification" }]}
            maxWidth="1400px"
        >
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#00E5A0]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#FFB020]/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="w-24 h-24 rounded-full border-4 border-[#0A1420] shadow-[0_0_0_2px_#00E5A0] relative shrink-0">
                        { }
                        <Image src="https://i.pravatar.cc/150?u=1" alt="Arjun Kumar profile" width={96} height={96} className="w-full h-full rounded-full object-cover" />
                        <div className="absolute -bottom-2 -right-2 bg-[#00E5A0] text-[#0A1420] text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[#0A1420]" aria-label="Level 24">
                            Lvl 24
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Arjun Kumar</h2>
                        <p className="text-[#8899AA] font-medium text-sm">Engineering Department</p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1.5 bg-[#152336] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm font-semibold shadow-inner">
                                <span className="text-[#FFB020]">14,500</span>
                                <span className="text-white text-xs">XP</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-[#152336] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-sm font-semibold shadow-inner">
                                <Flame size={14} className="text-[#FF4444]" aria-hidden="true" />
                                <span className="text-white">12 Day Streak</span>
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
                    <div
                        className="h-3 bg-[#0A1420] rounded-full overflow-hidden border border-[#2A3A4A] w-full"
                        role="progressbar"
                        aria-valuenow={85}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="85% progress to Level 25"
                    >
                        <div className="h-full bg-gradient-to-r from-[#00E5A0] to-teal-400 rounded-full w-[85%] shadow-[0_0_10px_rgba(0,229,160,0.5)]" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card padding="lg">
                        <CardTitle className="mb-6">Badges &amp; Achievements</CardTitle>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {BADGES.map((badge, i) => {
                                const Icon = badge.icon;
                                return (
                                    <div
                                        key={i}
                                        className={`p-5 rounded-xl border flex flex-col items-center text-center transition-all ${badge.earned ? `${badge.bgClass} ${badge.borderClass} shadow-[0_5px_15px_rgba(0,0,0,0.2)]` : "bg-[#0A1420] border-[#1A2A3A] opacity-60 grayscale hover:grayscale-0 hover:opacity-100"}`}
                                    >
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${badge.earned ? "bg-white/10" : "bg-[#1A2A3A]"}`}>
                                            <Icon size={28} className={badge.earned ? badge.colorClass : "text-[#445566]"} strokeWidth={1.5} aria-hidden="true" />
                                        </div>
                                        <h3 className={`font-bold mb-1 ${badge.earned ? "text-white" : "text-[#8899AA]"}`}>{badge.title}</h3>
                                        <p className="text-xs text-[#8899AA] leading-relaxed">{badge.desc}</p>
                                        {badge.earned && <Badge variant="success" className="mt-2">Earned</Badge>}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    <Card padding="lg">
                        <CardTitle className="mb-6">Daily Quests</CardTitle>
                        <div className="space-y-4">
                            {[
                                { title: "Complete a module quiz", desc: "Pass any end-of-module assessment with 80% or higher.", xp: "+150 XP", progressIdx: 0 },
                                { title: "Learn for 30 minutes today", desc: "Watch videos or read course materials.", xp: "+50 XP", progressIdx: 1 },
                            ].map((quest, i) => (
                                <div key={i} className="p-4 bg-[#152336] border border-[#2A3A4A] rounded-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{quest.title}</h4>
                                        <p className="text-xs text-[#8899AA]">{quest.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant="warning">{quest.xp}</Badge>
                                        <div
                                            className="w-20 h-2 bg-[#0A1420] rounded-full border border-[#1A2A3A]"
                                            role="progressbar"
                                            aria-label={`Quest progress`}
                                            aria-valuenow={QUEST_PROGRESS_VALUES[quest.progressIdx] ?? 50}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <div
                                                className="h-full bg-[#00E5A0] rounded-full"
                                                style={{ width: `${QUEST_PROGRESS_VALUES[quest.progressIdx] ?? 50}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card padding="lg" variant="elevated">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy size={18} className="text-[#FFB020]" aria-hidden="true" /> Leaderboard
                            </CardTitle>
                            <select className="bg-[#0A1420] border border-[#2A3A4A] text-xs text-[#8899AA] rounded px-2 py-1 outline-none" aria-label="Leaderboard period">
                                <option>This Month</option>
                                <option>All Time</option>
                            </select>
                        </CardHeader>

                        <div className="space-y-1">
                            {LEADERBOARD.map((user, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${idx === 0 ? "bg-gradient-to-r from-[#FFB020]/10 to-transparent border border-[#FFB020]/20" : "hover:bg-[#152336] border border-transparent"}`}
                                >
                                    <div className="w-6 text-center font-bold text-[#445566] shrink-0" aria-hidden="true">
                                        {user.rank === 1 ? <Trophy size={16} className="text-[#FFB020] mx-auto" /> : `#${user.rank}`}
                                    </div>
                                    { }
                                    <Image src={user.avatar} width={40} height={40} className="w-10 h-10 rounded-full border border-[#2A3A4A] shrink-0" alt={`${user.name} avatar`} />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold truncate ${idx === 0 ? "text-[#FFB020]" : "text-white"}`}>{user.name}</p>
                                        <p className="text-[10px] text-[#8899AA] uppercase tracking-wider">{user.dept}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-white">{user.xp} <span className="text-[10px] text-[#8899AA] font-normal">XP</span></p>
                                        <div className="flex items-center justify-end gap-1 text-[10px]">
                                            {user.trend === "up" && <ChevronUp size={12} className="text-[#00E5A0]" aria-hidden="true" />}
                                            <span className="text-[#8899AA]">Lvl {user.level}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="secondary" size="sm" className="w-full mt-4 justify-center">
                            View Full Rankings
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
