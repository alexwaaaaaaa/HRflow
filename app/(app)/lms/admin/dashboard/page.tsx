"use client";
import React from "react";
import {
    Users, BookOpen, GraduationCap, TrendingUp, Plus, Settings, MoreHorizontal, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import ChartWrapper from '@/components/ui/ChartWrapper';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar } from 'recharts';

const ENROLLMENT_DATA = [
    { month: 'Jan', enrolls: 400, completions: 240 },
    { month: 'Feb', enrolls: 300, completions: 139 },
    { month: 'Mar', enrolls: 550, completions: 380 },
    { month: 'Apr', enrolls: 480, completions: 390 },
    { month: 'May', enrolls: 600, completions: 480 },
    { month: 'Jun', enrolls: 800, completions: 500 },
];

const TOP_COURSES = [
    { id: 1, title: "Advanced React Patterns", students: 1420, rating: 4.9, revenue: "$42k" },
    { id: 2, title: "Data Security Compliance", students: 3200, rating: 4.7, revenue: "Req" },
    { id: 3, title: "Managerial Leadership", students: 850, rating: 4.8, revenue: "$15k" },
    { id: 4, title: "AWS Cloud Architect", students: 640, rating: 4.6, revenue: "$28k" },
];

export default function LMSAdminDashboard() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">LMS Administration</h1>
                    <p className="text-[#8899AA]">Manage courses, track enrollments, and monitor learning compliance.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/lms/reports" className="px-4 py-2 border border-[#2A3A4A] bg-[#0F1C2E] text-white rounded-xl font-medium hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <Settings size={18} className="text-[#8899AA]" /> Settings
                    </Link>
                    <Link href="/lms/admin/course/create" className="px-5 py-2 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors flex items-center gap-2 shadow-lg shadow-[#00E5A0]/20">
                        <Plus size={20} /> Create Course
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Active Learners", value: "4,821", trend: "+12%", trendUp: true, icon: Users, color: "text-[#33E6FF]", bg: "bg-[#33E6FF]/10" },
                    { label: "Total Courses", value: "156", trend: "+4", trendUp: true, icon: BookOpen, color: "text-[#FFB020]", bg: "bg-[#FFB020]/10" },
                    { label: "Completion Rate", value: "78.4%", trend: "+2.1%", trendUp: true, icon: GraduationCap, color: "text-[#00E5A0]", bg: "bg-[#00E5A0]/10" },
                    { label: "Avg. Learning Time", value: "4.2h", trend: "-0.5h", trendUp: false, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" }
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <Icon size={24} className={stat.color} />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#FF4444]/10 text-[#FF4444]'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h3>
                                <p className="text-sm font-medium text-[#8899AA]">{stat.label}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Charts */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Enrollment vs Completion</h2>
                            <select className="bg-[#0A1420] border border-[#2A3A4A] text-sm text-[#8899AA] rounded-lg px-3 py-1.5 outline-none">
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="h-72">
                            <ChartWrapper height="h-full">
                                <AreaChart data={ENROLLMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorEnrolls" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#33E6FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#33E6FF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                    <YAxis stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0A1420', borderColor: '#2A3A4A', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="enrolls" stroke="#33E6FF" strokeWidth={3} fillOpacity={1} fill="url(#colorEnrolls)" />
                                    <Area type="monotone" dataKey="completions" stroke="#00E5A0" strokeWidth={3} fillOpacity={1} fill="url(#colorCompletions)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    {/* Quick Actions / Course Management Table */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Top Performing Courses</h2>
                            <button className="text-[#33E6FF] text-sm font-semibold hover:underline">View All Courses</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs uppercase tracking-wider text-[#8899AA] border-b border-[#1A2A3A]">
                                        <th className="pb-3 font-semibold">Course Title</th>
                                        <th className="pb-3 font-semibold">Students</th>
                                        <th className="pb-3 font-semibold">Rating</th>
                                        <th className="pb-3 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {TOP_COURSES.map((course) => (
                                        <tr key={course.id} className="hover:bg-[#152336] transition-colors group">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[#2A3A4A] overflow-hidden">
                                                        <img src={`https://picsum.photos/seed/${course.id}/100/100`} alt="cover" className="w-full h-full object-cover opacity-80" />
                                                    </div>
                                                    <span className="font-semibold text-white group-hover:text-[#33E6FF] transition-colors">{course.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-[#8899AA]">{course.students.toLocaleString()}</td>
                                            <td className="py-4">
                                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#FFB020] bg-[#FFB020]/10 px-2.5 py-1 rounded-md">
                                                    {course.rating} ⭐
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#2A3A4A] rounded-lg transition-colors">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar widgets */}
                <div className="space-y-8">

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl blur-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-bold text-white mb-4 relative z-10">Pending Approvals</h3>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-start justify-between p-3 bg-[#152336] border border-[#2A3A4A] rounded-xl flex-col gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-white">Course Draft: CyberSec 101</p>
                                    <p className="text-xs text-[#8899AA]">Submitted by IT Dept • 2 hrs ago</p>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <button className="flex-1 py-1.5 bg-[#00E5A0] text-black text-xs font-bold rounded hover:bg-[#00c98d] transition-colors">Approve</button>
                                    <button className="flex-1 py-1.5 bg-[#1A2A3A] text-white text-xs font-bold rounded hover:bg-[#2A3A4A] transition-colors border border-[#2A3A4A]">Review</button>
                                </div>
                            </div>
                            <div className="flex items-start justify-between p-3 bg-[#152336] border border-[#2A3A4A] rounded-xl flex-col gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-white">Budget Request: AWS Certs</p>
                                    <p className="text-xs text-[#8899AA]">Requested by Eng Team • 5 hrs ago</p>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <button className="flex-1 py-1.5 bg-[#00E5A0] text-black text-xs font-bold rounded hover:bg-[#00c98d] transition-colors">Approve</button>
                                    <button className="flex-1 py-1.5 bg-[#1A2A3A] text-white text-xs font-bold rounded hover:bg-[#2A3A4A] transition-colors border border-[#2A3A4A]">Review</button>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 text-xs font-semibold text-[#33E6FF] hover:underline flex justify-center items-center gap-1">
                            View all 12 requests <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-6">Learning Engagement</h3>
                        <div className="h-48">
                            <ChartWrapper height="h-full">
                                <BarChart data={[
                                    { name: 'Mon', hours: 420 }, { name: 'Tue', hours: 510 }, { name: 'Wed', hours: 640 },
                                    { name: 'Thu', hours: 410 }, { name: 'Fri', hours: 680 }, { name: 'Sat', hours: 250 }, { name: 'Sun', hours: 290 }
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                    <YAxis hide={true} />
                                    <RechartsTooltip cursor={{ fill: '#152336' }} contentStyle={{ backgroundColor: '#0A1420', borderColor: '#2A3A4A', borderRadius: '8px', color: '#fff' }} />
                                    <Bar dataKey="hours" fill="#33E6FF" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                        <p className="text-center text-xs text-[#8899AA] mt-4">Peak learning times: Wed & Fri afternoons</p>
                    </div>

                </div>

            </div>

        </div>
    );
}
