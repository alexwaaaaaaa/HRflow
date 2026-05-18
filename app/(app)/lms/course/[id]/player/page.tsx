// migrated: immersive-ui — full-screen course player; Page shell intentionally omitted
"use client";
import React, { useState } from "react";
import {
    Play, Volume2, Maximize, Settings, FileText, CheckCircle2, Circle, MessageSquare,
    ChevronLeft, PlayCircle, SkipBack, SkipForward, Captions, ChevronRight, ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";

interface Lesson {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
    active?: boolean;
    type?: string;
}

interface SyllabusModule {
    module: string;
    lessons: Lesson[];
}

const SYLLABUS: SyllabusModule[] = [
    {
        module: "1. Getting Started",
        lessons: [
            { id: 1, title: "Course Introduction", duration: "5:30", completed: true },
            { id: 2, title: "Environment Setup", duration: "15:45", completed: true },
            { id: 3, title: "Basic Architecture", duration: "25:10", completed: false, active: true },
        ],
    },
    {
        module: "2. Advanced Concepts",
        lessons: [
            { id: 4, title: "State Management Deep Dive", duration: "45:00", completed: false },
            { id: 5, title: "Performance Optimization", duration: "40:20", completed: false },
            { id: 6, title: "Module Quiz", duration: "10:00", type: "quiz", completed: false },
        ],
    },
];

export default function CoursePlayer() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState<"overview" | "notes" | "qa">("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0A1420]">
            {/* Top Navbar */}
            <div className="h-14 bg-[#0F1C2E] border-b border-[#1A2A3A] flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <Link href={`/lms/course/${params.id}`} aria-label="Back to course">
                        <Button variant="secondary" size="sm">
                            <ChevronLeft size={16} aria-hidden="true" />
                        </Button>
                    </Link>
                    <h1 className="text-white font-bold text-sm md:text-base hidden sm:block">
                        Advanced React Patterns <span className="text-[#445566] font-normal mx-2">|</span> Basic Architecture
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-xs font-medium bg-[#1A2A3A] border border-[#2A3A4A] rounded-full px-3 py-1">
                        <span className="text-white">Your Progress:</span>
                        <span className="text-[#00E5A0]">2/12</span>
                        <div
                            className="w-16 h-1.5 bg-[#2A3A4A] rounded-full overflow-hidden ml-1"
                            role="progressbar"
                            aria-valuenow={16}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="16% course progress"
                        >
                            <div className="w-[16%] h-full bg-[#00E5A0]" />
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-expanded={sidebarOpen}
                        aria-controls="syllabus-panel"
                        className="hidden lg:flex"
                    >
                        {sidebarOpen ? "Hide Syllabus" : "Show Syllabus"}
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 min-h-0 relative">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                    {/* Video Player Mock */}
                    <div className="relative w-full bg-black aspect-video max-h-[70vh] flex flex-col group">
                        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 to-black relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label="Play video"
                                className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur text-white opacity-50 hover:opacity-100 hover:bg-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-110"
                            >
                                <Play size={36} className="ml-2" fill="currentColor" aria-hidden="true" />
                            </Button>
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <h2 className="text-white font-semibold text-lg drop-shadow-md">Basic Architecture</h2>
                                <Button variant="secondary" size="sm" aria-label="Open Q&A">
                                    <MessageSquare size={16} aria-hidden="true" />
                                </Button>
                            </div>
                        </div>

                        {/* Player Controls */}
                        <div className="h-14 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0 flex items-center px-4 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 cursor-pointer hover:h-1.5 transition-all" role="slider" aria-label="Video progress" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}>
                                <div className="w-1/3 h-full bg-[#00E5A0] relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow translate-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                </div>
                            </div>

                            <Button variant="ghost" size="sm" aria-label="Play/Pause">
                                <Play size={18} fill="currentColor" aria-hidden="true" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Skip back">
                                <SkipBack size={18} fill="currentColor" aria-hidden="true" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Skip forward">
                                <SkipForward size={18} fill="currentColor" aria-hidden="true" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Volume">
                                <Volume2 size={18} aria-hidden="true" />
                            </Button>

                            <div className="text-xs text-white/80 font-medium ml-2 font-mono" aria-label="Video time: 8 minutes 14 seconds of 25 minutes 10 seconds">
                                08:14 / 25:10
                            </div>

                            <div className="flex-1" />

                            <Button variant="ghost" size="sm" aria-label="Captions">
                                <Captions size={18} aria-hidden="true" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Settings">
                                <Settings size={18} aria-hidden="true" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Fullscreen">
                                <Maximize size={18} aria-hidden="true" />
                            </Button>
                        </div>
                    </div>

                    {/* Content Tabs */}
                    <div className="flex-1 bg-[#0F1C2E] flex flex-col min-h-0 border-t border-[#1A2A3A]">
                        <div className="flex border-b border-[#1A2A3A] px-4 shrink-0 bg-[#0A1420]" role="tablist" aria-label="Course content tabs">
                            {(["overview", "notes", "qa"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab}
                                    aria-controls={`tab-panel-${tab}`}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${activeTab === tab ? "border-[#00E5A0] text-[#00E5A0] bg-[#1A2A3A]/30" : "border-transparent text-[#8899AA] hover:text-white"}`}
                                >
                                    {tab === "notes" && <FileText size={14} aria-hidden="true" />}
                                    {tab === "qa" && <MessageSquare size={14} aria-hidden="true" />}
                                    {tab === "overview" ? "Overview" : tab === "notes" ? "Notes" : <>Q&amp;A <span className="bg-[#33E6FF] text-[#0A1420] text-[10px] px-1.5 rounded-full ml-1" aria-label="12 questions">12</span></>}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 text-white text-sm">
                            {activeTab === "overview" && (
                                <div id="tab-panel-overview" role="tabpanel" aria-labelledby="tab-overview" className="max-w-3xl space-y-6">
                                    <h3 className="text-xl font-bold">About this lesson</h3>
                                    <p className="text-[#8899AA] leading-relaxed">
                                        In this video, we cover the foundational architectural patterns to consider when structuring a large-scale React application.
                                        We discuss folder structures, separation of concerns, and where to place your business logic versus your UI components.
                                    </p>
                                    <div className="bg-[#152336] border border-[#2A3A4A] p-4 rounded-xl">
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Settings size={16} className="text-[#33E6FF]" aria-hidden="true" /> Resources
                                        </h4>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="text-[#33E6FF] hover:underline flex items-center gap-2"><FileText size={14} aria-hidden="true" /> Architecture_Diagram.pdf</a></li>
                                            <li><a href="#" className="text-[#33E6FF] hover:underline flex items-center gap-2"><FileText size={14} aria-hidden="true" /> Starter_Codebase.zip</a></li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {activeTab === "notes" && (
                                <div id="tab-panel-notes" role="tabpanel" aria-labelledby="tab-notes" className="max-w-3xl flex flex-col h-full">
                                    <div className="flex-1 border border-[#2A3A4A] bg-[#0A1420] rounded-xl p-4 text-[#8899AA] overflow-auto mb-4">
                                        <p className="mb-2"><span className="text-[#00E5A0] font-mono bg-[#1A2A3A] px-1 rounded mr-2">02:15</span> Store business logic in custom hooks.</p>
                                        <p><span className="text-[#00E5A0] font-mono bg-[#1A2A3A] px-1 rounded mr-2">12:30</span> Remember to memoize context providers.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <label htmlFor="note-input" className="sr-only">Type a new note</label>
                                        <input
                                            id="note-input"
                                            type="text"
                                            placeholder="Type a new note…"
                                            className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#33E6FF]"
                                        />
                                        <Button variant="primary" size="sm">Save Note</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Syllabus */}
                {sidebarOpen && (
                    <div
                        id="syllabus-panel"
                        className="w-80 lg:w-96 shrink-0 bg-[#0A1420] border-l border-[#1A2A3A] flex flex-col absolute inset-y-0 right-0 lg:static z-20 shadow-2xl lg:shadow-none transform transition-transform duration-300"
                        role="complementary"
                        aria-label="Course syllabus"
                    >
                        <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0F1C2E]">
                            <h2 className="font-bold text-white">Course Content</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden"
                                aria-label="Close syllabus"
                            >
                                <ChevronRight size={18} aria-hidden="true" />
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {SYLLABUS.map((mod, i) => (
                                <div key={i} className="border-b border-[#1A2A3A]">
                                    <div className="px-4 py-3 bg-[#152336] sticky top-0 z-10 border-b border-[#2A3A4A]/50">
                                        <h3 className="text-sm font-bold text-white flex justify-between items-center">
                                            {mod.module}
                                            <ChevronDown size={14} className="text-[#8899AA]" aria-hidden="true" />
                                        </h3>
                                    </div>
                                    <div className="py-2">
                                        {mod.lessons.map((lesson) => (
                                            <div
                                                key={lesson.id}
                                                className={`px-4 py-3 flex items-start gap-3 cursor-pointer transition-colors ${lesson.active ? "bg-[#1A2A3A]/80 border-l-2 border-[#00E5A0]" : "hover:bg-[#1A2A3A]/40 border-l-2 border-transparent"}`}
                                            >
                                                <div className="mt-0.5 shrink-0">
                                                    {lesson.completed ? (
                                                        <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                                    ) : lesson.active ? (
                                                        <Play size={16} className="text-[#33E6FF]" fill="currentColor" aria-hidden="true" />
                                                    ) : (
                                                        <Circle size={16} className="text-[#445566]" aria-hidden="true" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`text-sm font-semibold transition-colors ${lesson.active ? "text-[#00E5A0]" : "text-white"}`}>
                                                        {lesson.title}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-1 text-xs">
                                                        <span className="flex items-center gap-1 text-[#8899AA]">
                                                            <PlayCircle size={12} aria-hidden="true" /> {lesson.duration}
                                                        </span>
                                                        {lesson.active && (
                                                            <span className="text-[#00E5A0] font-medium flex items-center gap-1">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" aria-hidden="true" /> Playing
                                                            </span>
                                                        )}
                                                        {lesson.type === "quiz" && (
                                                            <span className="px-1.5 py-0.5 rounded bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/20 font-bold uppercase tracking-wider text-[8px]">
                                                                Quiz
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
