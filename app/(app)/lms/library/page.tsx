"use client";
import React, { useState } from "react";
import {
    Search, Filter, Star, Clock, Award, PlayCircle, Sparkles, CheckCircle2, Bookmark,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CATEGORIES = ["All", "Engineering", "Design", "Leadership", "HR & Compliance", "Sales", "Marketing"] as const;
type Category = (typeof CATEGORIES)[number];

interface Course {
    id: number;
    title: string;
    cat: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    time: string;
    rating: number;
    gradientClass: string;
    enrolled: boolean;
}

const COURSES: Course[] = [
    { id: 1, title: "Advanced React Patterns", cat: "Engineering", level: "Advanced", time: "8h 30m", rating: 4.9, gradientClass: "from-blue-600 to-indigo-800", enrolled: true },
    { id: 2, title: "System Design for Scale", cat: "Engineering", level: "Expert", time: "12h 0m", rating: 4.8, gradientClass: "from-purple-600 to-pink-800", enrolled: false },
    { id: 3, title: "Figma to React Workflow", cat: "Design", level: "Intermediate", time: "4h 15m", rating: 4.7, gradientClass: "from-emerald-600 to-teal-800", enrolled: false },
    { id: 4, title: "Inclusive Leadership 101", cat: "Leadership", level: "Beginner", time: "2h 45m", rating: 4.9, gradientClass: "from-amber-500 to-orange-700", enrolled: false },
    { id: 5, title: "Cybersecurity Basics", cat: "HR & Compliance", level: "Beginner", time: "1h 30m", rating: 4.5, gradientClass: "from-slate-600 to-slate-800", enrolled: true },
    { id: 6, title: "B2B Enterprise Sales", cat: "Sales", level: "Intermediate", time: "5h 0m", rating: 4.6, gradientClass: "from-red-500 to-rose-700", enrolled: false },
    { id: 7, title: "GraphQL API Development", cat: "Engineering", level: "Intermediate", time: "6h 20m", rating: 4.7, gradientClass: "from-pink-500 to-rose-600", enrolled: false },
    { id: 8, title: "Effective Communication", cat: "Leadership", level: "Beginner", time: "3h 0m", rating: 4.8, gradientClass: "from-cyan-600 to-blue-800", enrolled: false },
];

const LEVEL_BADGE_VARIANT: Record<Course["level"], "success" | "info" | "danger" | "neutral"> = {
    Beginner: "success",
    Intermediate: "info",
    Advanced: "danger",
    Expert: "danger",
};

export default function CourseLibrary() {
    const [activeCat, setActiveCat] = useState<Category>("All");

    const filteredCourses = activeCat === "All" ? COURSES : COURSES.filter((c) => c.cat === activeCat);

    return (
        <Page
            title="Learning Library"
            subtitle="Discover courses to upskill, gain certifications, and advance your career at TechCorp"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Library" }]}
            maxWidth="1600px"
            actions={
                <Button variant="secondary" icon={<Filter size={16} />}>Filters</Button>
            }
        >
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center w-full max-w-4xl mb-8">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={20} aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search for courses, skills, or certifications…"
                        aria-label="Search courses"
                        className="w-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#33E6FF] transition-colors shadow-lg text-lg"
                    />
                </div>
            </div>

            {/* Recommended Banner */}
            <div className="mb-10 bg-gradient-to-r from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#33E6FF]/10 rounded-full blur-3xl" aria-hidden="true" />
                <div className="relative z-10 max-w-xl">
                    <div className="flex items-center gap-2 text-[#33E6FF] mb-3 font-semibold uppercase tracking-wider text-sm">
                        <Sparkles size={16} aria-hidden="true" /> Recommended for you
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Advanced TypeScript Paradigms</h2>
                    <p className="text-[#8899AA] mb-6">Based on your recent completion of &ldquo;React Advanced Patterns&rdquo;. Master generics, mapped types, and conditional types.</p>
                    <div className="flex items-center gap-4 text-sm font-medium text-white mb-6">
                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#8899AA]" aria-hidden="true" /> 4h 30m</span>
                        <span className="flex items-center gap-1.5"><Star size={16} className="text-[#FFB020]" aria-hidden="true" /> 4.9 Rating</span>
                        <span className="flex items-center gap-1.5"><Award size={16} className="text-[#00E5A0]" aria-hidden="true" /> Certification</span>
                    </div>
                    <Button variant="primary" href="/lms/course/1">Start Course</Button>
                </div>
                <div className="relative z-10 w-full md:w-1/3 aspect-video bg-gradient-to-br from-blue-900 to-[#0A1420] rounded-xl border border-[#2A3A4A] flex items-center justify-center group cursor-pointer overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" aria-hidden="true" />
                    <PlayCircle size={64} className="text-white/80 group-hover:scale-110 group-hover:text-white transition-all drop-shadow-lg" aria-hidden="true" />
                    <span className="sr-only">Play course preview</span>
                </div>
            </div>

            {/* Categories Tabs */}
            <div
                className="flex overflow-x-auto gap-2 mb-8 pb-2"
                role="tablist"
                aria-label="Filter by category"
            >
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={activeCat === cat}
                        onClick={() => setActiveCat(cat)}
                        className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-colors border ${activeCat === cat ? "bg-[#1A2A3A] text-white border-[#33E6FF]" : "bg-[#0F1C2E] text-[#8899AA] border-[#1A2A3A] hover:bg-[#1A2A3A] hover:text-white"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                    <Link
                        href={`/lms/course/${course.id}`}
                        key={course.id}
                        className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden group hover:border-[#33E6FF] hover:-translate-y-1 transition-all block flex flex-col shadow-lg"
                    >
                        <div className={`h-40 bg-gradient-to-r ${course.gradientClass} relative`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" aria-hidden="true" />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => e.preventDefault()}
                                aria-label={`Bookmark ${course.title}`}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white/70 hover:text-white"
                            >
                                <Bookmark size={16} aria-hidden="true" />
                            </Button>
                            {course.enrolled && (
                                <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-[#00E5A0]" aria-hidden="true" />
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-white">Enrolled</span>
                                </div>
                            )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-center mb-3">
                                <Badge variant="info">{course.cat}</Badge>
                                <div className="flex items-center gap-1 text-xs font-bold text-[#FFB020]">
                                    <Star size={12} fill="currentColor" aria-hidden="true" /> {course.rating}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{course.title}</h3>
                            <div className="mt-auto">
                                <div className="flex items-center justify-between text-xs text-[#8899AA] font-medium pt-4 border-t border-[#1A2A3A]">
                                    <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden="true" /> {course.time}</span>
                                    <Badge variant={LEVEL_BADGE_VARIANT[course.level]}>{course.level}</Badge>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Page>
    );
}
