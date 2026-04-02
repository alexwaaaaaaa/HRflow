"use client";
import React from 'react';
import { Gift, Cake, CalendarHeart, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function LifeEventsNotificationPage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Gift className="text-pink-500" />
                        Life Events & Celebrations
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Birthdays, anniversaries, and personal milestones across your team.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Card */}
                <div className="bg-gradient-to-br from-[#0A1420] to-pink-900/10 border border-[#1A2A3A] hover:border-pink-500/30 transition-colors rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 blur-3xl rounded-full" />

                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                            <Cake size={24} />
                        </div>
                        <span className="text-xs font-bold bg-[#131B2B] text-[#CCDDEE] px-3 py-1 rounded-full border border-[#2A3A4A]">Today</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">Priya Sharma's Birthday</h3>
                    <p className="text-sm text-[#8899AA] mb-6">Wish her a fantastic day! She is turning 28 today.</p>

                    <div className="flex gap-3 relative z-10">
                        <button className="flex-1 bg-[#1A2A3A] hover:bg-pink-500/20 hover:text-pink-400 text-white border border-transparent hover:border-pink-500/30 transition-all rounded-xl py-2.5 text-sm font-semibold flex justify-center items-center gap-2">
                            <Sparkles size={16} /> Send Wishes
                        </button>
                        <button className="flex-1 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border border-transparent transition-all rounded-xl py-2.5 text-sm font-medium">
                            Claim Team Gift
                        </button>
                    </div>
                </div>

                {/* Event Card 2 */}
                <div className="bg-gradient-to-br from-[#0A1420] to-indigo-900/10 border border-[#1A2A3A] hover:border-indigo-500/30 transition-colors rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />

                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <CalendarHeart size={24} />
                        </div>
                        <span className="text-xs font-bold bg-[#131B2B] text-[#CCDDEE] px-3 py-1 rounded-full border border-[#2A3A4A]">Tomorrow</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">5 Year Work Anniversary</h3>
                    <p className="text-sm text-[#8899AA] mb-6">Rohan Gupta joined Kaarya exactly 5 years ago. Time flies!</p>

                    <div className="flex gap-3 relative z-10">
                        <button className="w-full bg-[#1A2A3A] hover:bg-indigo-500/20 hover:text-indigo-400 text-white border border-transparent hover:border-indigo-500/30 transition-all rounded-xl py-2.5 text-sm font-semibold flex justify-center items-center gap-2">
                            <Sparkles size={16} /> Send Kudobox
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-[#1A2A3A] pt-6">
                <h3 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-4">Upcoming Next Week</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-4 bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-[#131B2B] flex items-center justify-center text-[#556677]">
                            <Gift size={20} />
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">New Arrival: Baby Girl (Anita Desai)</p>
                            <p className="text-xs text-[#556677]">Oct 30, 2024</p>
                        </div>
                        <button className="ml-auto text-sm text-[#8899AA] hover:text-white px-3 py-1 rounded border border-[#2A3A4A] bg-[#131B2B]">Remind Me</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
