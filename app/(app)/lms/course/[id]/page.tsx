"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    PlayCircle, Clock, Star, Award, Users, FileText, CheckCircle2, ChevronDown, BookOpen, Share2, Bookmark,
} from "lucide-react";
import { useParams } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Lesson {
    id: number;
    title: string;
    time: string;
    type: "video" | "quiz" | "assignment";
    completed: boolean;
}

interface CourseModule {
    title: string;
    duration: string;
    lessons: Lesson[];
}

const MODULES: CourseModule[] = [
    {
        title: "Module 1: Getting Started",
        duration: "45m",
        lessons: [
            { id: 1, title: "Course Introduction", time: "5m", type: "video", completed: true },
            { id: 2, title: "Environment Setup", time: "15m", type: "video", completed: true },
            { id: 3, title: "Basic Architecture", time: "25m", type: "video", completed: false },
        ],
    },
    {
        title: "Module 2: Advanced Concepts",
        duration: "2h 15m",
        lessons: [
            { id: 4, title: "State Management Deep Dive", time: "45m", type: "video", completed: false },
            { id: 5, title: "Performance Optimization", time: "40m", type: "video", completed: false },
            { id: 6, title: "Module Quiz", time: "10m", type: "quiz", completed: false },
        ],
    },
    {
        title: "Module 3: Final Project",
        duration: "3h 0m",
        lessons: [
            { id: 7, title: "Project Briefing", time: "15m", type: "video", completed: false },
            { id: 8, title: "Implementation Guide", time: "1h", type: "video", completed: false },
            { id: 9, title: "Code Submission", time: "1h 45m", type: "assignment", completed: false },
        ],
    },
];

const LESSON_ICON: Record<Lesson["type"], React.ElementType> = {
    video: PlayCircle,
    quiz: FileText,
    assignment: BookOpen,
};

const LESSON_ICON_COLOR: Record<Lesson["type"], string> = {
    video: "text-[#33E6FF]",
    quiz: "text-[#FFB020]",
    assignment: "text-purple-400",
};

const LEARN_ITEMS = [
    "Custom Hooks design patterns",
    "Concurrent rendering & Suspense",
    "Advanced State Management",
    "Memoization & Performance",
    "Testing complex components",
    "React Server Components basics",
] as const;

export default function CourseDetail() {
    const params = useParams();
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    return (
        <Page
            title="Advanced React Patterns"
            subtitle="Master concurrent mode, suspense, and custom hooks to build enterprise-grade React applications"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Library", href: "/lms/library" },
                { label: "Advanced React Patterns" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" size="sm" aria-label="Bookmark course">
                        <Bookmark size={18} aria-hidden="true" />
                    </Button>
                    <Button variant="secondary" size="sm" aria-label="Share course">
                        <Share2 size={18} aria-hidden="true" />
                    </Button>
                    <Button variant="primary" icon={<PlayCircle size={16} />} href={`/lms/course/${params.id}/player`}>Resume Course</Button>
                </>
            }
        >
            {/* Course Header Banner */}
            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl overflow-hidden mb-8 shadow-xl">
                <div className="h-64 bg-gradient-to-r from-blue-700 to-indigo-900 relative p-8 flex flex-col justify-end">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" aria-hidden="true" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="info">Engineering</Badge>
                            <Badge variant="neutral">Advanced</Badge>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-[#0F1C2E] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                        <div className="flex items-center gap-2 text-white">
                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] overflow-hidden border-2 border-[#2A3A4A]">
                                { }
                                <Image src="https://i.pravatar.cc/150?u=1" alt="Instructor Sarah Drasner" width={40} height={40} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider">Instructor</p>
                                <p>Sarah Drasner</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-[#8899AA] uppercase tracking-wider">Rating</span>
                            <span className="flex items-center gap-1 text-[#FFB020]">
                                <Star size={14} fill="currentColor" aria-hidden="true" /> 4.9 (124 reviews)
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-[#8899AA] uppercase tracking-wider">Students</span>
                            <span className="flex items-center gap-1 text-white">
                                <Users size={14} className="text-[#33E6FF]" aria-hidden="true" /> 1,420 Enrolled
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-[#8899AA] uppercase tracking-wider">Last Updated</span>
                            <span className="flex items-center gap-1 text-white">
                                <Clock size={14} className="text-[#00E5A0]" aria-hidden="true" /> Oct 2025
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card padding="lg">
                        <h2 className="text-xl font-bold text-white mb-4">About this course</h2>
                        <div className="text-[#8899AA] space-y-4 leading-relaxed text-sm">
                            <p>
                                In this comprehensive guide to advanced React, we&apos;ll look at the patterns the pros use to make their components flexible, scalable, and easy to maintain.
                                We&apos;ll cover High Order Components, Render Props, the Context API, and how to effectively use the new Hooks API to clean up your codebase.
                            </p>
                            <p>
                                By the end of this course, you will have a deep understanding of React&apos;s render lifecycle, performance optimization techniques, and the architectural decisions required for building large-scale frontend applications.
                            </p>
                        </div>
                        <h3 className="font-semibold text-white mt-6 mb-3">What you will learn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {LEARN_ITEMS.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-[#8899AA]">
                                    <CheckCircle2 size={16} className="text-[#00E5A0] shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card padding="lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Course Curriculum</h2>
                            <span className="text-sm font-medium text-[#8899AA]">24 Lessons · 6h 0m total length</span>
                        </div>

                        <div className="space-y-3">
                            {MODULES.map((mod, idx) => (
                                <div key={idx} className="border border-[#1A2A3A] rounded-xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                                        className="w-full px-5 py-4 bg-[#152336] flex items-center justify-between hover:bg-[#1A2A3A] transition-colors"
                                        aria-expanded={expandedModule === idx}
                                        aria-controls={`module-panel-${idx}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <ChevronDown
                                                size={18}
                                                className={`text-[#8899AA] transition-transform ${expandedModule === idx ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                            />
                                            <span className="font-semibold text-white">{mod.title}</span>
                                        </div>
                                        <span className="text-xs font-medium text-[#8899AA]">{mod.lessons.length} lessons · {mod.duration}</span>
                                    </button>

                                    {expandedModule === idx && (
                                        <div id={`module-panel-${idx}`} className="bg-[#0A1420] p-2" role="region" aria-labelledby={`module-btn-${idx}`}>
                                            {mod.lessons.map((lesson) => {
                                                const Icon = LESSON_ICON[lesson.type];
                                                const iconColor = LESSON_ICON_COLOR[lesson.type];
                                                return (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-[#152336] transition-colors group cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {lesson.completed ? (
                                                                <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                                            ) : (
                                                                <Icon size={16} className={`text-[#445566] group-hover:${iconColor}`} aria-hidden="true" />
                                                            )}
                                                            <span className={`text-sm ${lesson.completed ? "text-[#8899AA] line-through decoration-[#445566]" : "text-white"}`}>
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-[#8899AA]">{lesson.time}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card padding="lg">
                        <h3 className="font-bold text-white mb-4">Course Features</h3>
                        <ul className="space-y-4 text-sm text-[#8899AA]">
                            <li className="flex items-center gap-3"><PlayCircle size={18} className="text-[#33E6FF]" aria-hidden="true" /> 6 hours on-demand video</li>
                            <li className="flex items-center gap-3"><FileText size={18} className="text-[#FFB020]" aria-hidden="true" /> 12 articles &amp; resources</li>
                            <li className="flex items-center gap-3"><BookOpen size={18} className="text-purple-400" aria-hidden="true" /> 4 coding exercises</li>
                            <li className="flex items-center gap-3"><Award size={18} className="text-[#00E5A0]" aria-hidden="true" /> Certificate of completion</li>
                        </ul>
                    </Card>

                    <Card padding="lg" variant="elevated">
                        <h3 className="font-bold text-white mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {["JavaScript ES6+", "React Basics", "HTML/CSS", "Git Fundamentals"].map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-xs font-medium text-white">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
