"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    Gift, Star, Clock, ArrowRight, Wallet, TrendingUp, TrendingDown, Target, Zap, Shield, Users, Heart
} from 'lucide-react';
import Link from 'next/link';

export default function MyRewardsScreen() {
    const [activeTab, setActiveTab] = useState('Overview');

    const BADGES = [
        { id: 'innovator', name: 'Innovator', icon: LightbulbIcon, color: '#FFB020', count: 3, unlocked: true },
        { id: 'team_player', name: 'Team Player', icon: Users, color: '#33E6FF', count: 5, unlocked: true },
        { id: 'problem_solver', name: 'Problem Solver', icon: Zap, color: '#9D00FF', count: 2, unlocked: true },
        { id: 'customer_hero', name: 'Customer Hero', icon: Heart, color: '#FF4444', count: 0, unlocked: false },
        { id: 'above_beyond', name: 'Above & Beyond', icon: Star, color: '#00E5A0', count: 1, unlocked: true },
        { id: 'integrity', name: 'Integrity', icon: Shield, color: '#8899AA', count: 0, unlocked: false },
    ];

    const TRANSACTIONS = [
        { id: 1, type: 'earned', title: 'Recognition from Alex Patel', date: 'Oct 24, 2023', amount: 100, points: 1250 },
        { id: 2, type: 'earned', title: 'Q3 Performance Bonus', date: 'Oct 15, 2023', amount: 500, points: 1150 },
        { id: 3, type: 'spent', title: 'Redeemed: Amazon $50 Gift Card', date: 'Sep 28, 2023', amount: -600, points: 650 },
        { id: 4, type: 'earned', title: 'Recognition from Sarah Jenkins', date: 'Sep 10, 2023', amount: 50, points: 1250 },
        { id: 5, type: 'earned', title: 'Work Anniversary (2 Years)', date: 'Aug 01, 2023', amount: 1000, points: 1200 },
    ];

    return (
        <Page
            title="My Rewards"
            subtitle="Track your points, view earned badges, and manage your redemptions."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Rr", href: "/engagement/rr" }, { label: "My Rewards" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Gift size={32} className="text-[#9D00FF]" /> My Rewards
                    </h1>
                    <p className="text-[#8899AA]">Track your points, view earned badges, and manage your redemptions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/rr/catalog" className="px-5 py-2.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors shadow-[0_5px_15px_rgba(0,229,160,0.2)]">
                        Explore Catalog
                    </Link>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 rounded-3xl border border-[#2A3A4A] bg-gradient-to-br from-[#0A1420] to-[#152336] shadow-xl relative overflow-hidden group col-span-1 md:col-span-2">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#9D00FF]/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#9D00FF]/20 transition-all duration-500"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[#9D00FF]/10 flex items-center justify-center text-[#9D00FF] border border-[#9D00FF]/20">
                            <Wallet size={24} />
                        </div>
                        <div className="text-right">
                            <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Lifetime Earned</p>
                            <p className="text-[#CCDDEE] font-bold">12,450 pts</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <p className="text-[#8899AA] font-bold text-sm uppercase tracking-wider mb-1">Wallet Balance</p>
                            <h2 className="text-5xl font-black text-white font-mono tracking-tighter">4,250<span className="text-xl text-[#9D00FF] ml-2 font-sans tracking-normal">pts</span></h2>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFB020]/10 border border-[#FFB020]/20 rounded-lg max-w-max">
                            <Clock size={16} className="text-[#FFB020]" />
                            <span className="text-sm font-bold text-[#FFB020]">150 pts expiring in 14 days</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-3xl border border-[#2A3A4A] bg-[#0F1C2E] flex flex-col justify-between hover:border-[#33E6FF]/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#33E6FF]/10 flex items-center justify-center text-[#33E6FF] mb-4">
                        <ArrowRight size={20} className="rotate-45" />
                    </div>
                    <div>
                        <p className="text-[#8899AA] font-bold text-xs uppercase tracking-wider mb-1">Points Redeemed</p>
                        <h3 className="text-2xl font-bold text-white mb-2">8,200 <span className="text-sm text-[#445566] font-normal">pts</span></h3>
                        <p className="text-xs text-[#33E6FF] font-medium flex items-center gap-1">4 items claimed <Target size={12} /></p>
                    </div>
                </div>

                <div className="p-6 rounded-3xl border border-[#2A3A4A] bg-[#0F1C2E] flex flex-col justify-between hover:border-[#00E5A0]/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0] mb-4">
                        <Star size={20} />
                    </div>
                    <div>
                        <p className="text-[#8899AA] font-bold text-xs uppercase tracking-wider mb-1">Badges Unlocked</p>
                        <h3 className="text-2xl font-bold text-white mb-2">11 <span className="text-sm text-[#445566] font-normal">total</span></h3>
                        <p className="text-xs text-[#00E5A0] font-medium flex items-center gap-1">Top 15% in company <TrendingUp size={12} /></p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-8">

                <div className="flex-1 space-y-8">
                    {/* Tabs */}
                    <div className="flex items-center gap-6 border-b border-[#2A3A4A]">
                        {['Overview', 'Transaction History', 'Redemptions'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-2 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === tab ? 'text-[#33E6FF] border-[#33E6FF]' : 'text-[#8899AA] border-transparent hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'Overview' && (
                        <div className="space-y-8">
                            {/* Badge Cabinet */}
                            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Shield size={20} className="text-[#FFB020]" /> Badge Cabinet
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                                    {BADGES.map(badge => {
                                        const Icon = badge.icon;
                                        return (


                                            <div key={badge.id} className="flex flex-col items-center">
                                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-3 relative ${badge.unlocked ? 'bg-[#152336] border-2 shadow-lg shadow-[#000000]/50' : 'bg-[#0A1420] border-2 border-[#1A2A3A] opacity-40 grayscale'}`} style={badge.unlocked ? { borderColor: badge.color } : {}}>
                                                    <Icon size={32} color={badge.unlocked ? badge.color : '#8899AA'} />
                                                    {badge.unlocked && badge.count > 1 && (
                                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#1A2A3A] border-2 border-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white shadow-lg" style={{ backgroundColor: badge.color }}>
                                                            {badge.count}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className={`text-sm font-bold text-center leading-tight ${badge.unlocked ? 'text-white' : 'text-[#445566]'}`}>{badge.name}</span>
                                            </div>
                                        
            )
                                    })}
                                </div>
                            </div>

                            {/* Top Recognitions Received */}
                            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Heart size={20} className="text-[#FF4444]" /> Recent Appreciations
                                    </h3>
                                    <Link href="/engagement/rr/feed" className="text-xs font-bold text-[#33E6FF] hover:underline">View All</Link>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 border border-[#2A3A4A] rounded-2xl bg-[#152336] flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#33E6FF]/20 text-[#33E6FF] flex items-center justify-center font-bold shrink-0">AP</div>
                                        <div>
                                            <p className="text-sm text-[#8899AA] mb-1">From <strong className="text-white">Alex Patel</strong> • 1 day ago</p>
                                            <p className="text-white text-sm font-medium">"Brilliant implementation of the new caching layer. The latency has dropped drastically."</p>
                                        </div>
                                    </div>
                                    <div className="p-4 border border-[#2A3A4A] rounded-2xl bg-[#152336] flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#FFB020]/20 text-[#FFB020] flex items-center justify-center font-bold shrink-0">SJ</div>
                                        <div>
                                            <p className="text-sm text-[#8899AA] mb-1">From <strong className="text-white">Sarah Jenkins</strong> • 3 days ago</p>
                                            <p className="text-white text-sm font-medium">"Great leadership in the Q3 planning meeting. Your roadmaps are always so clear!"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Transaction History' && (
                        <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl overflow-hidden shadow-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Date</th>
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Description</th>
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Points</th>
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {TRANSACTIONS.map(tx => (
                                        <tr key={tx.id} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                            <td className="p-4 text-sm text-[#8899AA]">{tx.date}</td>
                                            <td className="p-4 text-sm text-white font-medium flex items-center gap-2">
                                                {tx.type === 'earned' ? <TrendingUp size={14} className="text-[#00E5A0]" /> : <TrendingDown size={14} className="text-[#FF4444]" />}
                                                {tx.title}
                                            </td>
                                            <td className={`p-4 text-sm font-bold text-right ${tx.type === 'earned' ? 'text-[#00E5A0]' : 'text-[#FF4444]'}`}>
                                                {tx.type === 'earned' ? '+' : ''}{tx.amount}
                                            </td>
                                            <td className="p-4 text-sm text-[#CCDDEE] font-bold text-right font-mono">{tx.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Right Sidebar: Quick Actions */}
                <div className="w-full lg:w-[320px] shrink-0 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Gift size={18} className="text-[#9D00FF]" /> Popular Rewards
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: "Amazon Gift Card", price: 1000, color: "bg-[#FFB020]" },
                                { name: "Starbucks Card", price: 500, color: "bg-[#00E5A0]" },
                                { name: "Extra Day Off", price: 5000, color: "bg-[#9D00FF]" }
                            ].map((reward, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-[#1A2A3A] bg-[#152336] hover:border-[#33E6FF]/30 transition-colors cursor-pointer group">
                                    <div className={`w-10 h-10 rounded-xl ${reward.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                                        <Gift size={20} className="text-[#0A1420]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">{reward.name}</p>
                                        <p className="text-xs text-[#00E5A0] font-bold">{reward.price} pts</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/engagement/rr/catalog" className="w-full mt-6 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors text-center text-sm flex items-center justify-center gap-2">
                            View Full Catalog <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}

function LightbulbIcon(props: any) {
    return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>;
}
