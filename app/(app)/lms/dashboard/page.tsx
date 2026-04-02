"use client";
import React from "react";
import {
    BookOpen, PlayCircle, Clock, Trophy, Target, Star,
    ChevronRight, Award, ChevronDown, CheckCircle2, TrendingUp, Calendar,
    Shield, AlertCircle
} from "lucide-react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const ACTIVITY_DATA = [
    { name: 'Mon', hours: 1.5 },
    { name: 'Tue', hours: 2.0 },
    { name: 'Wed', hours: 0.5 },
    { name: 'Thu', hours: 3.5 },
    { name: 'Fri', hours: 1.0 },
    { name: 'Sat', hours: 0 },
    { name: 'Sun', hours: 0.5 },
];

const SKILL_DATA = [
    { name: 'React', value: 85, color: '#00E5A0' },
    { name: 'Node.js', value: 65, color: '#33E6FF' },
    { name: 'AWS', value: 45, color: '#FFB020' },
    { name: 'UI/UX', value: 30, color: '#9D00FF' },
];

export default function LMSDashboardEmployee() {
    return (
        <main className="px-6 py-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] text-white">

            {/* Welcome & Stats Header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1 bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/5 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Arjun! 👋</h1>
                            <p className="text-[#8899AA] text-sm mb-6 max-w-lg">You are 2 courses away from unlocking the "Frontend Master" badge. Keep up the great momentum!</p>
                            <div className="flex items-center gap-4">
                                <Link href="/lms/course/1/player" className="px-6 py-3 bg-[#00E5A0] text-[#0A1420] rounded-xl hover:bg-[#00c98d] transition-colors font-bold flex items-center gap-2 shadow-[0_10px_20px_rgba(0,229,160,0.15)]">
                                    <PlayCircle size={18} /> Resume: React Mastery
                                </Link>
                                <Link href="/lms/library" className="px-6 py-3 bg-transparent border border-[#2A3A4A] text-white rounded-xl hover:bg-[#1A2A3A] transition-colors font-semibold">
                                    Browse Library
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-4 border-[#2A3A4A] border-t-[#00E5A0] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,229,160,0.2)]" aria-hidden="true">
                                <Trophy size={32} className="text-[#00E5A0]" />
                            </div>
                            <span className="text-sm font-bold text-white">Level 12</span>
                            <span className="text-xs text-[#8899AA]">3,450 XP</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-80 shrink-0 flex flex-col gap-4">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#33E6FF]/10 text-[#33E6FF] rounded-xl flex items-center justify-center border border-[#33E6FF]/20">
                            <BookOpen size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white leading-none mb-1">12</h3>
                            <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider">Courses Finished</p>
                        </div>
                    </div>
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FFB020]/10 text-[#FFB020] rounded-xl flex items-center justify-center border border-[#FFB020]/20">
                            <Clock size={24} aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white leading-none mb-1">45h 30m</h3>
                            <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider">Learning Time</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Continue Learning */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Continue Learning</h2>
                            <Link href="/lms/library" className="text-sm font-medium text-[#33E6FF] hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Course Card 1 */}
                            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden group hover:border-[#2A3A4A] transition-colors cursor-pointer">
                                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-800 relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5 backdrop-filter">
                                        <PlayCircle size={14} className="text-white" aria-hidden="true" />
                                        <span className="text-xs font-semibold text-white">2h 15m left</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#33E6FF] bg-[#33E6FF]/10 px-2 py-0.5 rounded border border-[#33E6FF]/20">Frontend</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#33E6FF] transition-colors">React Advanced Patterns</h3>
                                    <p className="text-xs text-[#8899AA] mb-4">Master concurrent mode, suspense, and custom hooks.</p>

                                    <div className="flex items-center justify-between text-xs font-medium">
                                        <span className="text-white">65% Complete</span>
                                        <span className="text-[#8899AA]">Module 4 of 6</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full mt-2 overflow-hidden" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} aria-label="65% complete">
                                        <div className="h-full bg-[#00E5A0] w-[65%]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Card 2 */}
                            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden group hover:border-[#2A3A4A] transition-colors cursor-pointer">
                                <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-800 relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5 backdrop-filter">
                                        <PlayCircle size={14} className="text-white" aria-hidden="true" />
                                        <span className="text-xs font-semibold text-white">4h 30m left</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFB020] bg-[#FFB020]/10 px-2 py-0.5 rounded border border-[#FFB020]/20">Backend</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#33E6FF] transition-colors">Node.js Microservices</h3>
                                    <p className="text-xs text-[#8899AA] mb-4">Build scalable services with Docker and Kubernetes.</p>

                                    <div className="flex items-center justify-between text-xs font-medium">
                                        <span className="text-white">12% Complete</span>
                                        <span className="text-[#8899AA]">Module 1 of 8</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full mt-2 overflow-hidden" role="progressbar" aria-valuenow={12} aria-valuemin={0} aria-valuemax={100} aria-label="12% complete">
                                        <div className="h-full bg-[#00E5A0] w-[12%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Upcoming Compliance & Mandatory */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2 m-0">
                                <AlertCircle size={20} className="text-[#FF4444]" aria-hidden="true" /> Mandatory Trainings
                            </h2>
                        </div>
                        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                            <div className="p-4 flex items-center justify-between border-b border-[#1A2A3A] hover:bg-[#1A2A3A]/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#FF4444]/10 flex items-center justify-center text-[#FF4444] border border-[#FF4444]/20">
                                        <Target size={20} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold flex items-center gap-2">POSH Compliance 2026 <span className="text-[10px] bg-[#FF4444] text-white px-2 py-0.5 rounded font-bold uppercase">Required</span></h4>
                                        <p className="text-xs text-[#8899AA]">Annual mandatory training by HR</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <span className="block text-xs font-bold text-[#FF4444]">Due in 5 days</span>
                                        <span className="text-xs text-[#8899AA]">Est. time: 45 mins</span>
                                    </div>
                                    <button className="px-4 py-2 border border-[#2A3A4A] rounded-lg text-sm text-white font-medium hover:bg-[#1A2A3A] transition-colors">Start</button>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between hover:bg-[#1A2A3A]/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#FFB020]/10 flex items-center justify-center text-[#FFB020] border border-[#FFB020]/20">
                                        <Shield size={20} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">Information Security Basics</h4>
                                        <p className="text-xs text-[#8899AA]">Cybersecurity standards for all employees</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <span className="block text-xs font-bold text-[#FFB020]">Due in 14 days</span>
                                        <span className="text-xs text-[#8899AA]">Est. time: 1 hr</span>
                                    </div>
                                    <button className="px-4 py-2 border border-[#2A3A4A] rounded-lg text-sm text-white font-medium hover:bg-[#1A2A3A] transition-colors">Start</button>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Col: Widgets */}
                <div className="space-y-6">

                    {/* Learning Activity Chart */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-white m-0">Learning Activity</h2>
                            <span className="text-xs text-[#8899AA]">This Week</span>
                        </div>
                        <div className="h-40 w-full mb-4">
                            <ChartWrapper height="h-full">
                                <AreaChart data={ACTIVITY_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#33E6FF" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#33E6FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#445566" tick={{ fill: '#8899AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#445566" tick={{ fill: '#8899AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1A2A3A', borderColor: '#2A3A4A', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                                    <Area type="monotone" dataKey="hours" stroke="#33E6FF" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    {/* Skill Radar / Breakdown */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-white m-0">Skill Progress</h2>
                            <Link href="/lms/skills/matrix" className="text-xs text-[#33E6FF] hover:underline hover:underline-offset-2">View Map</Link>
                        </div>
                        <div className="space-y-4">
                            {SKILL_DATA.map(skill => (
                                <div key={skill.name}>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span className="text-white">{skill.name}</span>
                                        <span style={{ color: skill.color }}>{skill.value}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${skill.value}%`, backgroundColor: skill.color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Live Sessions */}
                    <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6">
                        <h2 className="font-bold text-white flex items-center gap-2 mb-4 m-0">
                            <Calendar size={16} className="text-[#00E5A0]" aria-hidden="true" /> Upcoming Webinars
                        </h2>
                        <div className="bg-[#0F1C2E] border border-[#1A2A3A] p-4 rounded-xl">
                            <h4 className="text-sm font-semibold text-white mb-1">Architecting on AWS (Live)</h4>
                            <p className="text-xs text-[#8899AA] mb-3 border-b border-[#1A2A3A] pb-3">Tomorrow, 2:00 PM - 4:00 PM</p>
                            <button className="w-full py-2 bg-[#1A2A3A] text-white text-xs font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors border border-[#2A3A4A]">
                                RSVP Accepted
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
