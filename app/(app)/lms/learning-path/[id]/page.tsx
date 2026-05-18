"use client";
import React from "react";
import Image from "next/image";
import {
    Milestone, PlayCircle, CheckCircle2, Lock, ArrowDown, Award, Clock, Users, Briefcase,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface PathCourse {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    status: "completed" | "in-progress" | "locked";
    progress?: number;
}

const PATH_COURSES: PathCourse[] = [
    { id: 1, title: "Advanced React Patterns", duration: "8h 30m", completed: true, status: "completed" },
    { id: 2, title: "State Management & Redux Toolkit", duration: "6h 15m", completed: false, status: "in-progress", progress: 65 },
    { id: 3, title: "Frontend Testing Strategies", duration: "5h 45m", completed: false, status: "locked" },
    { id: 4, title: "Web Performance & Optimization", duration: "7h 0m", completed: false, status: "locked" },
    { id: 5, title: "System Design for UI", duration: "4h 30m", completed: false, status: "locked" },
];

const STATUS_BADGE: Record<PathCourse["status"], "success" | "info" | "neutral"> = {
    completed: "success",
    "in-progress": "info",
    locked: "neutral",
};

const _STATUS_LABEL: Record<PathCourse["status"], string> = {
    completed: "Completed",
    "in-progress": "In Progress",
    locked: "Locked",
};

const SKILLS = ["React.js", "Redux", "Architecture", "TypeScript", "Web Vitals", "Testing", "CI/CD"] as const;

export default function LearningPathDetail() {
    return (
        <Page
            title="Senior Frontend Engineer Path"
            subtitle="A curated journey from mid-level to senior, covering advanced architecture, performance optimization, and leadership"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Learning Paths", href: "/lms/learning-path" },
                { label: "Senior Frontend Engineer" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="primary" icon={<PlayCircle size={16} />}>Continue Path</Button>
            }
        >
            {/* Hero Header */}
            <Card padding="lg" variant="elevated" className="mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#33E6FF]/20 via-[#0F1C2E] to-[#0A1420] opacity-50 z-0" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-[#33E6FF] font-semibold uppercase tracking-wider text-xs mb-4">
                            <Milestone size={16} aria-hidden="true" /> Learning Path
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-sm mt-6">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center border border-[#2A3A4A]">
                                    <Briefcase size={18} className="text-[#00E5A0]" aria-hidden="true" />
                                </div>
                                <div>
                                    <span className="block text-xs text-[#8899AA] uppercase tracking-wider">Role</span>
                                    Senior SDE
                                </div>
                            </div>
                            <div className="flex flex-col text-white font-medium">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider">Total Duration</span>
                                <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#FFB020]" aria-hidden="true" /> 45h 0m</span>
                            </div>
                            <div className="flex flex-col text-white font-medium">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider">Enrolled</span>
                                <span className="flex items-center gap-1.5"><Users size={16} className="text-[#33E6FF]" aria-hidden="true" /> 482</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6 w-full md:w-80 shrink-0 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5A0]/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                        <h3 className="text-white font-bold text-lg mb-6 relative z-10">Your Progress</h3>
                        <div
                            className="relative w-32 h-32 mx-auto mb-6"
                            role="img"
                            aria-label="40% path completion"
                        >
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#1A2A3A" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#00E5A0" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * 40) / 100} className="transition-all duration-1000 ease-out" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-extrabold text-white">40<span className="text-lg">%</span></span>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm font-medium mb-6 px-2">
                            <div className="text-center">
                                <span className="block text-white text-lg font-bold">1/5</span>
                                <span className="text-[#8899AA] text-xs uppercase tracking-wider">Courses</span>
                            </div>
                            <div className="w-px h-10 bg-[#2A3A4A]" aria-hidden="true" />
                            <div className="text-center">
                                <span className="block text-white text-lg font-bold">2</span>
                                <span className="text-[#8899AA] text-xs uppercase tracking-wider">Badges</span>
                            </div>
                        </div>
                        <Button variant="primary" className="w-full justify-center relative z-10" icon={<PlayCircle size={16} />}>
                            Continue Path
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Timeline / Courses */}
                <div className="lg:col-span-2 relative">
                    <h2 className="text-2xl font-bold text-white mb-8 border-b border-[#1A2A3A] pb-4">Path Journey</h2>

                    <div className="absolute left-7 top-24 bottom-10 w-0.5 bg-[#1A2A3A] hidden md:block z-0" aria-hidden="true" />

                    <div className="space-y-6 relative z-10">
                        {PATH_COURSES.map((course, idx) => (
                            <div
                                key={course.id}
                                className={`flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all ${course.status === "completed" ? "bg-[#0F1C2E] border-[#00E5A0]/30 shadow-[0_0_15px_rgba(0,229,160,0.05)]" : course.status === "in-progress" ? "bg-[#152336] border-[#33E6FF] shadow-[0_0_20px_rgba(51,230,255,0.1)] -translate-y-1" : "bg-[#0A1420] border-[#1A2A3A] opacity-70"}`}
                            >
                                <div className="hidden md:flex flex-col items-center shrink-0 z-10">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-[#0A1420] shadow-md ${course.status === "completed" ? "bg-[#00E5A0] text-[#0A1420]" : course.status === "in-progress" ? "bg-[#33E6FF] text-[#0A1420]" : "bg-[#1A2A3A] text-[#445566]"}`}>
                                        {course.status === "completed" ? (
                                            <CheckCircle2 size={24} strokeWidth={3} aria-hidden="true" />
                                        ) : course.status === "in-progress" ? (
                                            <PlayCircle size={24} strokeWidth={3} aria-hidden="true" />
                                        ) : (
                                            <Lock size={20} aria-hidden="true" />
                                        )}
                                    </div>
                                    {idx !== PATH_COURSES.length - 1 && (
                                        <ArrowDown size={16} className="text-[#2A3A4A] mt-2 mb-[-8px]" aria-hidden="true" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant={STATUS_BADGE[course.status]}>Course {idx + 1}</Badge>
                                        {course.progress !== undefined && (
                                            <span className="text-xs font-bold text-[#33E6FF]">{course.progress}%</span>
                                        )}
                                    </div>
                                    <h3 className={`text-xl font-bold mb-2 ${course.status === "locked" ? "text-[#8899AA]" : "text-white"}`}>
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-[#8899AA] mb-4 flex items-center gap-1.5">
                                        <Clock size={16} aria-hidden="true" /> {course.duration} · 12 Modules
                                    </p>

                    {course.status === "in-progress" && course.progress !== undefined && (
                                        <div
                                            className="w-full h-2 bg-[#0A1420] rounded-full overflow-hidden border border-[#1A2A3A] mb-4"
                                            role="progressbar"
                                            aria-valuenow={course.progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${course.progress}% complete`}
                                        >
                                            <div
                                                className="h-full bg-gradient-to-r from-[#33E6FF] to-blue-500 rounded-full"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    )}

                                    {course.status !== "locked" && (
                                        <Link href={`/lms/course/${course.id}`}>
                                            <Button
                                                variant={course.status === "in-progress" ? "primary" : "secondary"}
                                                size="sm"
                                            >
                                                {course.status === "completed" ? "Review Course" : "Continue Course"}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Final Milestone */}
                        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#FFB020]/20 mt-8 relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent to-[#FFB020]" aria-hidden="true" />
                            <div className="hidden md:flex flex-col items-center shrink-0 z-10 p-2">
                                <div className="w-14 h-14 rounded-full bg-[#1A2A3A] border border-[#FFB020]/30 shadow-[0_0_15px_rgba(255,176,32,0.15)] flex items-center justify-center text-[#FFB020]">
                                    <Award size={28} aria-hidden="true" />
                                </div>
                            </div>
                            <div className="flex-1 relative z-10">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFB020] transition-colors">Path Completion Certificate</h3>
                                <p className="text-[#8899AA] text-sm">Finish all 5 courses to unlock your Senior Frontend Engineer Certification badge and digital credentials.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <h3 className="font-bold text-white mb-4">Path Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {SKILLS.map((skill) => (
                                <span key={skill} className="px-3 py-1.5 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-xs font-semibold text-white shadow-inner">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    <Card padding="lg" variant="elevated">
                        <h3 className="font-bold text-white mb-4">Instructors</h3>
                        {[
                            { name: "Sarah Drasner", role: "VP Developer Experience", avatar: "https://i.pravatar.cc/150?u=2" },
                            { name: "Kent C. Dodds", role: "Frontend Architect", avatar: "https://i.pravatar.cc/150?u=3" },
                        ].map((inst) => (
                            <div key={inst.name} className="flex items-center gap-4 mb-4 last:mb-0">
                                <div className="w-12 h-12 rounded-full bg-[#1A2A3A] overflow-hidden border-2 border-[#2A3A4A] shrink-0">
                                    { }
                                    <Image src={inst.avatar} alt={inst.name} width={48} height={48} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{inst.name}</p>
                                    <p className="text-xs text-[#8899AA]">{inst.role}</p>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </Page>
    );
}
