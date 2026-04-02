"use client";
import React, { useState } from "react";
import {
    PlayCircle, Clock, Star, Award, Users, FileText, CheckCircle2, ChevronDown, BookOpen, Share2, Bookmark
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const MODULES = [
    {
        title: "Module 1: Getting Started",
        duration: "45m",
        lessons: [
            { id: 1, title: "Course Introduction", time: "5m", type: "video", completed: true },
            { id: 2, title: "Environment Setup", time: "15m", type: "video", completed: true },
            { id: 3, title: "Basic Architecture", time: "25m", type: "video", completed: false },
        ]
    },
    {
        title: "Module 2: Advanced Concepts",
        duration: "2h 15m",
        lessons: [
            { id: 4, title: "State Management Deep Dive", time: "45m", type: "video", completed: false },
            { id: 5, title: "Performance Optimization", time: "40m", type: "video", completed: false },
            { id: 6, title: "Module Quiz", time: "10m", type: "quiz", completed: false },
        ]
    },
    {
        title: "Module 3: Final Project",
        duration: "3h 0m",
        lessons: [
            { id: 7, title: "Project Briefing", time: "15m", type: "video", completed: false },
            { id: 8, title: "Implementation Guide", time: "1h", type: "video", completed: false },
            { id: 9, title: "Code Submission", time: "1h 45m", type: "assignment", completed: false },
        ]
    }
];

export default function CourseDetail() {
    const params = useParams();
    const [expandedModule, setExpandedModule] = useState<number | null>(0);

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Course Header Banner */}
            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl overflow-hidden mb-8 shadow-xl">
                <div className="h-64 bg-gradient-to-r from-blue-700 to-indigo-900 relative p-8 flex flex-col justify-end">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#33E6FF] bg-[#33E6FF]/10 px-3 py-1 rounded-full border border-[#33E6FF]/20 backdrop-blur-md">Engineering</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/30 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">Advanced</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">Advanced React Patterns</h1>
                        <p className="text-blue-100 text-lg max-w-2xl text-shadow-sm">Master concurrent mode, suspense, and custom hooks to build enterprise-grade React applications.</p>
                    </div>
                </div>
                <div className="p-6 bg-[#0F1C2E] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                        <div className="flex items-center gap-2 text-white">
                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] overflow-hidden border-2 border-[#2A3A4A]">
                                <img src="https://i.pravatar.cc/150?u=1" alt="Instructor" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider">Instructor</p>
                                <p>Sarah Drasner</p>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-[#1A2A3A] hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-[#8899AA] uppercase tracking-wider">Rating</span>
                            <span className="flex items-center gap-1 text-[#FFB020]"><Star size={14} fill="currentColor" /> 4.9 (124 reviews)</span>
                        </div>
                        <div className="w-px h-10 bg-[#1A2A3A] hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-[#8899AA] uppercase tracking-wider">Students</span>
                            <span className="flex items-center gap-1 text-white"><Users size={14} className="text-[#33E6FF]" /> 1,420 Enrolled</span>
                        </div>
                        <div className="w-px h-10 bg-[#1A2A3A] hidden md:block"></div>
                        <div className="flex flex-col">
                            <span className="text-xs text-[#8899AA] uppercase tracking-wider">Last Updated</span>
                            <span className="flex items-center gap-1 text-white"><Clock size={14} className="text-[#00E5A0]" /> Oct 2025</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="p-3 bg-transparent border border-[#2A3A4A] text-[#8899AA] rounded-xl hover:text-white hover:bg-[#1A2A3A] transition-colors shrink-0">
                            <Bookmark size={20} />
                        </button>
                        <button className="p-3 bg-transparent border border-[#2A3A4A] text-[#8899AA] rounded-xl hover:text-white hover:bg-[#1A2A3A] transition-colors shrink-0">
                            <Share2 size={20} />
                        </button>
                        <Link href={`/lms/course/${params.id}/player`} className="flex-1 md:flex-none px-8 py-3 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] justify-center transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(0,229,160,0.15)]">
                            <PlayCircle size={20} /> Resume Course
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* About */}
                    <section className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">About this course</h2>
                        <div className="text-[#8899AA] space-y-4 leading-relaxed text-sm">
                            <p>In this comprehensive guide to advanced React, we'll look at the patterns the pros use to make their components flexible, scalable, and easy to maintain. We'll cover High Order Components, Render Props, the Context API, and how to effectively use the new Hooks API to clean up your codebase.</p>
                            <p>By the end of this course, you will have a deep understanding of React's render lifecycle, performance optimization techniques, and the architectural decisions required for building large-scale frontend applications.</p>
                        </div>
                        <h3 className="font-semibold text-white mt-6 mb-3">What you will learn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {['Custom Hooks design patterns', 'Concurrent rendering & Suspense', 'Advanced State Management', 'Memoization & Performance', 'Testing complex components', 'React Server Components basics'].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-[#8899AA]">
                                    <CheckCircle2 size={16} className="text-[#00E5A0] shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Curriculum */}
                    <section className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Course Curriculum</h2>
                            <span className="text-sm font-medium text-[#8899AA]">24 Lessons • 6h 0m total length</span>
                        </div>

                        <div className="space-y-3">
                            {MODULES.map((mod, idx) => (
                                <div key={idx} className="border border-[#1A2A3A] rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                                        className="w-full px-5 py-4 bg-[#152336] flex items-center justify-between hover:bg-[#1A2A3A] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ChevronDown size={18} className={`text-[#8899AA] transition-transform ${expandedModule === idx ? 'rotate-180' : ''}`} />
                                            <span className="font-semibold text-white">{mod.title}</span>
                                        </div>
                                        <span className="text-xs font-medium text-[#8899AA]">{mod.lessons.length} lessons • {mod.duration}</span>
                                    </button>

                                    {expandedModule === idx && (
                                        <div className="bg-[#0A1420] p-2">
                                            {mod.lessons.map(lesson => (
                                                <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#152336] transition-colors group cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        {lesson.completed ? (
                                                            <CheckCircle2 size={16} className="text-[#00E5A0]" />
                                                        ) : lesson.type === 'video' ? (
                                                            <PlayCircle size={16} className="text-[#445566] group-hover:text-[#33E6FF]" />
                                                        ) : lesson.type === 'quiz' ? (
                                                            <FileText size={16} className="text-[#445566] group-hover:text-[#FFB020]" />
                                                        ) : (
                                                            <BookOpen size={16} className="text-[#445566] group-hover:text-purple-400" />
                                                        )}
                                                        <span className={`text-sm ${lesson.completed ? 'text-[#8899AA] line-through decoration-[#445566]' : 'text-white'}`}>
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-[#8899AA]">{lesson.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4">Course Features</h3>
                        <ul className="space-y-4 text-sm text-[#8899AA]">
                            <li className="flex items-center gap-3"><PlayCircle size={18} className="text-[#33E6FF]" /> 6 hours on-demand video</li>
                            <li className="flex items-center gap-3"><FileText size={18} className="text-[#FFB020]" /> 12 articles & resources</li>
                            <li className="flex items-center gap-3"><BookOpen size={18} className="text-purple-400" /> 4 coding exercises</li>
                            <li className="flex items-center gap-3"><Award size={18} className="text-[#00E5A0]" /> Certificate of completion</li>
                        </ul>
                    </div>

                    <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-xs font-medium text-white">JavaScript ES6+</span>
                            <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-xs font-medium text-white">React Basics</span>
                            <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-xs font-medium text-white">HTML/CSS</span>
                            <span className="px-3 py-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-xs font-medium text-white">Git Fundamentals</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
