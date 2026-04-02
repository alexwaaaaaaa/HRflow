"use client";
import React, { useState } from "react";
import {
    Search, Filter, BookOpen, Star, Clock, Award, PlayCircle,
    ChevronRight, Sparkles, CheckCircle2, Bookmark
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "Engineering", "Design", "Leadership", "HR & Compliance", "Sales", "Marketing"];

const COURSES = [
    { id: 1, title: "Advanced React Patterns", cat: "Engineering", level: "Advanced", time: "8h 30m", rating: 4.9, bg: "from-blue-600 to-indigo-800", enrolled: true },
    { id: 2, title: "System Design for Scale", cat: "Engineering", level: "Expert", time: "12h 0m", rating: 4.8, bg: "from-purple-600 to-pink-800", enrolled: false },
    { id: 3, title: "Figma to React Workflow", cat: "Design", level: "Intermediate", time: "4h 15m", rating: 4.7, bg: "from-emerald-600 to-teal-800", enrolled: false },
    { id: 4, title: "Inclusive Leadership 101", cat: "Leadership", level: "Beginner", time: "2h 45m", rating: 4.9, bg: "from-amber-500 to-orange-700", enrolled: false },
    { id: 5, title: "Cybersecurity Basics", cat: "HR & Compliance", level: "Beginner", time: "1h 30m", rating: 4.5, bg: "from-slate-600 to-slate-800", enrolled: true },
    { id: 6, title: "B2B Enterprise Sales", cat: "Sales", level: "Intermediate", time: "5h 0m", rating: 4.6, bg: "from-red-500 to-rose-700", enrolled: false },
    { id: 7, title: "GraphQL API Development", cat: "Engineering", level: "Intermediate", time: "6h 20m", rating: 4.7, bg: "from-pink-500 to-rose-600", enrolled: false },
    { id: 8, title: "Effective Communication", cat: "Leadership", level: "Beginner", time: "3h 0m", rating: 4.8, bg: "from-cyan-600 to-blue-800", enrolled: false },
];

export default function CourseLibrary() {
    const [activeCat, setActiveCat] = useState("All");

    const filteredCourses = activeCat === "All" ? COURSES : COURSES.filter(c => c.cat === activeCat);

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header & Search */}
            <div className="mb-8 relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">Explore the Learning Library</h1>
                <p className="text-[#8899AA] text-lg max-w-2xl mb-8">Discover courses to upskill, gain certifications, and advance your career at TechCorp.</p>

                <div className="flex flex-col md:flex-row gap-4 items-center w-full max-w-4xl">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={20} />
                        <input
                            type="text"
                            placeholder="Search for courses, skills, or certifications..."
                            className="w-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#33E6FF] transition-colors shadow-lg text-lg"
                        />
                    </div>
                    <button className="px-6 py-4 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-2xl hover:bg-[#2A3A4A] transition-colors font-medium flex items-center gap-2 shrink-0">
                        <Filter size={20} /> Filters
                    </button>
                </div>
            </div>

            {/* Recommended Banner */}
            <div className="mb-10 bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#33E6FF]/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 max-w-xl">
                    <div className="flex items-center gap-2 text-[#33E6FF] mb-3 font-semibold uppercase tracking-wider text-sm">
                        <Sparkles size={16} /> Recommended for you
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Advanced TypeScript Paradigms</h2>
                    <p className="text-[#8899AA] mb-6">Based on your recent completion of "React Advanced Patterns". Master generics, mapped types, and conditional types.</p>
                    <div className="flex items-center gap-4 text-sm font-medium text-white mb-6">
                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#8899AA]" /> 4h 30m</span>
                        <span className="flex items-center gap-1.5"><Star size={16} className="text-[#FFB020]" /> 4.9 Rating</span>
                        <span className="flex items-center gap-1.5"><Award size={16} className="text-[#00E5A0]" /> Certification</span>
                    </div>
                    <Link href="/lms/course/1" className="px-6 py-3 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors inline-block">
                        Start Course
                    </Link>
                </div>
                <div className="relative z-10 w-full md:w-1/3 aspect-video bg-gradient-to-br from-blue-900 to-[#0A1420] rounded-xl border border-[#2A3A4A] flex items-center justify-center group cursor-pointer overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <PlayCircle size={64} className="text-white/80 group-hover:scale-110 group-hover:text-white transition-all drop-shadow-lg" />
                </div>
            </div>

            {/* Categories Tabs */}
            <div className="flex overflow-x-auto scrollbar-none gap-2 mb-8 pb-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCat(cat)}
                        className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-colors border ${activeCat === cat
                            ? 'bg-[#1A2A3A] text-white border-[#33E6FF]'
                            : 'bg-[#0F1C2E] text-[#8899AA] border-[#1A2A3A] hover:bg-[#1A2A3A] hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                    <Link href={`/lms/course/${course.id}`} key={course.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden group hover:border-[#33E6FF] hover:-translate-y-1 transition-all block flex flex-col shadow-lg">
                        <div className={`h-40 bg-gradient-to-r ${course.bg} relative`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/70 hover:text-white transition-colors">
                                <Bookmark size={16} />
                            </div>
                            {course.enrolled && (
                                <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-[#00E5A0]" />
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-white">Enrolled</span>
                                </div>
                            )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#33E6FF] bg-[#33E6FF]/10 px-2 py-0.5 rounded border border-[#33E6FF]/20">
                                    {course.cat}
                                </span>
                                <div className="flex items-center gap-1 text-xs font-bold text-[#FFB020]">
                                    <Star size={12} fill="currentColor" /> {course.rating}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{course.title}</h3>
                            <div className="mt-auto">
                                <div className="flex items-center justify-between text-xs text-[#8899AA] font-medium pt-4 border-t border-[#1A2A3A]">
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {course.time}</span>
                                    <span className={`px-2 py-1 rounded bg-[#0A1420] border border-[#2A3A4A] ${course.level === 'Beginner' ? 'text-[#00E5A0]' : course.level === 'Intermediate' ? 'text-[#33E6FF]' : 'text-[#FF4444]'
                                        }`}>{course.level}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
