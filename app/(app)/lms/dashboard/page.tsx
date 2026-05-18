"use client";
import React from "react";
import {
    BookOpen, PlayCircle, Clock, Trophy, Target, Calendar,
    Shield, AlertCircle, Plus,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { seededFloats } from "@/lib/random";

const ACTIVITY_DATA = [
    { name: "Mon", hours: 1.5 },
    { name: "Tue", hours: 2.0 },
    { name: "Wed", hours: 0.5 },
    { name: "Thu", hours: 3.5 },
    { name: "Fri", hours: 1.0 },
    { name: "Sat", hours: 0 },
    { name: "Sun", hours: 0.5 },
];

const SKILL_DATA = [
    { name: "React", value: 85, colorClass: "bg-[#00E5A0]" },
    { name: "Node.js", value: 65, colorClass: "bg-[#33E6FF]" },
    { name: "AWS", value: 45, colorClass: "bg-[#FFB020]" },
    { name: "UI/UX", value: 30, colorClass: "bg-purple-500" },
];

const SKILL_TEXT_COLORS: Record<string, string> = {
    React: "text-[#00E5A0]",
    "Node.js": "text-[#33E6FF]",
    AWS: "text-[#FFB020]",
    "UI/UX": "text-purple-400",
};

const SKILL_BAR_COLORS: Record<string, string> = {
    React: "bg-[#00E5A0]",
    "Node.js": "bg-[#33E6FF]",
    AWS: "bg-[#FFB020]",
    "UI/UX": "bg-purple-500",
};

const PROGRESS_WIDTHS: Record<string, string> = {
    "65": "w-[65%]",
    "12": "w-[12%]",
};

// Seeded decorative values — stable across renders
const _decorative = seededFloats(42, 4);

function CourseCard({
    title,
    tag,
    tagColorClass,
    tagBgClass,
    tagBorderClass,
    gradientClass,
    timeLeft,
    progress,
    module,
}: {
    title: string;
    tag: string;
    tagColorClass: string;
    tagBgClass: string;
    tagBorderClass: string;
    gradientClass: string;
    timeLeft: string;
    progress: number;
    module: string;
}) {
    const widthClass = PROGRESS_WIDTHS[String(progress)] ?? "w-[50%]";
    return (
        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden group hover:border-[#2A3A4A] transition-colors cursor-pointer">
            <div className={`h-32 bg-gradient-to-r ${gradientClass} relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                    <PlayCircle size={14} className="text-white" aria-hidden="true" />
                    <span className="text-xs font-semibold text-white">{timeLeft} left</span>
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${tagColorClass} ${tagBgClass} px-2 py-0.5 rounded border ${tagBorderClass}`}>
                        {tag}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#33E6FF] transition-colors">{title}</h3>
                <div className="flex items-center justify-between text-xs font-medium mt-4">
                    <span className="text-white">{progress}% Complete</span>
                    <span className="text-[#8899AA]">{module}</span>
                </div>
                <div
                    className="w-full h-1.5 bg-[#1A2A3A] rounded-full mt-2 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${progress}% complete`}
                >
                    <div className={`h-full bg-[#00E5A0] ${widthClass}`} />
                </div>
            </div>
        </div>
    );
}

export default function LMSDashboardEmployee() {
    return (
        <Page
            title="My Learning"
            subtitle="Track your progress, complete mandatory trainings, and grow your skills"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Dashboard" }]}
            maxWidth="1400px"
            actions={
                <Button variant="primary" icon={<Plus size={14} />}>
                    Browse Library
                </Button>
            }
        >
            {/* Welcome & Stats Header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1 bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5A0]/5 rounded-full blur-3xl" aria-hidden="true" />
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Arjun!</h2>
                            <p className="text-[#8899AA] text-sm mb-6 max-w-lg">
                                You are 2 courses away from unlocking the &ldquo;Frontend Master&rdquo; badge. Keep up the great momentum!
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <Link href="/lms/course/1/player">
                                    <Button variant="primary" icon={<PlayCircle size={16} />}>
                                        Resume: React Mastery
                                    </Button>
                                </Link>
                                <Button variant="secondary" href="/lms/library">Browse Library</Button>
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-col items-center" aria-hidden="true">
                            <div className="w-24 h-24 rounded-full border-4 border-[#2A3A4A] border-t-[#00E5A0] flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,229,160,0.2)]">
                                <Trophy size={32} className="text-[#00E5A0]" />
                            </div>
                            <span className="text-sm font-bold text-white">Level 12</span>
                            <span className="text-xs text-[#8899AA]">3,450 XP</span>
                        </div>
                    </div>
                </div>

                <div className="md:w-80 shrink-0 flex flex-col gap-4">
                    <Card padding="md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#33E6FF]/10 text-[#33E6FF] rounded-xl flex items-center justify-center border border-[#33E6FF]/20">
                                <BookOpen size={24} aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white leading-none mb-1">12</p>
                                <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider">Courses Finished</p>
                            </div>
                        </div>
                    </Card>
                    <Card padding="md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FFB020]/10 text-[#FFB020] rounded-xl flex items-center justify-center border border-[#FFB020]/20">
                                <Clock size={24} aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white leading-none mb-1">45h 30m</p>
                                <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider">Learning Time</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col */}
                <div className="lg:col-span-2 space-y-8">
                    <section aria-labelledby="continue-heading">
                        <div className="flex items-center justify-between mb-4">
                            <h2 id="continue-heading" className="text-xl font-bold text-white">Continue Learning</h2>
                            <Link href="/lms/library" className="text-sm font-medium text-[#33E6FF] hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CourseCard
                                title="React Advanced Patterns"
                                tag="Frontend"
                                tagColorClass="text-[#33E6FF]"
                                tagBgClass="bg-[#33E6FF]/10"
                                tagBorderClass="border-[#33E6FF]/20"
                                gradientClass="from-blue-600 to-indigo-800"
                                timeLeft="2h 15m"
                                progress={65}
                                module="Module 4 of 6"
                            />
                            <CourseCard
                                title="Node.js Microservices"
                                tag="Backend"
                                tagColorClass="text-[#FFB020]"
                                tagBgClass="bg-[#FFB020]/10"
                                tagBorderClass="border-[#FFB020]/20"
                                gradientClass="from-emerald-600 to-teal-800"
                                timeLeft="4h 30m"
                                progress={12}
                                module="Module 1 of 8"
                            />
                        </div>
                    </section>

                    <section aria-labelledby="mandatory-heading">
                        <div className="flex items-center justify-between mb-4">
                            <h2 id="mandatory-heading" className="text-xl font-bold text-white flex items-center gap-2">
                                <AlertCircle size={20} className="text-[#FF4444]" aria-hidden="true" />
                                Mandatory Trainings
                            </h2>
                        </div>
                        <Card padding="none">
                            <div className="p-4 flex items-center justify-between border-b border-[#1A2A3A] hover:bg-[#1A2A3A]/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#FF4444]/10 flex items-center justify-center text-[#FF4444] border border-[#FF4444]/20">
                                        <Target size={20} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold flex items-center gap-2">
                                            POSH Compliance 2026
                                            <Badge variant="danger">Required</Badge>
                                        </h4>
                                        <p className="text-xs text-[#8899AA]">Annual mandatory training by HR</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <span className="block text-xs font-bold text-[#FF4444]">Due in 5 days</span>
                                        <span className="text-xs text-[#8899AA]">Est. time: 45 mins</span>
                                    </div>
                                    <Button variant="secondary" size="sm">Start</Button>
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
                                    <Button variant="secondary" size="sm">Start</Button>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Right Col */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Learning Activity</CardTitle>
                            <span className="text-xs text-[#8899AA]">This Week</span>
                        </CardHeader>
                        <div className="h-40 w-full mb-4">
                            <ChartWrapper height="h-full">
                                <AreaChart data={ACTIVITY_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#33E6FF" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#33E6FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#445566" tick={{ fill: "#8899AA", fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#445566" tick={{ fill: "#8899AA", fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: "#1A2A3A", borderColor: "#2A3A4A", borderRadius: "8px" }} itemStyle={{ color: "#fff" }} />
                                    <Area type="monotone" dataKey="hours" stroke="#33E6FF" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Skill Progress</CardTitle>
                            <Link href="/lms/skills/matrix" className="text-xs text-[#33E6FF] hover:underline">
                                View Map
                            </Link>
                        </CardHeader>
                        <div className="space-y-4">
                            {SKILL_DATA.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between text-xs mb-1 font-medium">
                                        <span className="text-white">{skill.name}</span>
                                        <span className={SKILL_TEXT_COLORS[skill.name]}>{skill.value}%</span>
                                    </div>
                                    <div
                                        className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={skill.value}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${skill.name} skill: ${skill.value}%`}
                                    >
                                        <div
                                            className={`h-full rounded-full ${SKILL_BAR_COLORS[skill.name]}`}
                                            style={{ width: `${skill.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                Upcoming Webinars
                            </CardTitle>
                        </CardHeader>
                        <div className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-xl">
                            <h4 className="text-sm font-semibold text-white mb-1">Architecting on AWS (Live)</h4>
                            <p className="text-xs text-[#8899AA] mb-3 border-b border-[#1A2A3A] pb-3">Tomorrow, 2:00 PM – 4:00 PM</p>
                            <Button variant="secondary" size="sm" className="w-full justify-center">
                                RSVP Accepted
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
