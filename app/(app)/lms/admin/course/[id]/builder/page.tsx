"use client";
import React, { useState } from "react";
import {
    ChevronLeft, Plus, Settings, Video, FileText, Type, List, Save, GripVertical, Trash2, Edit2, PlayCircle, ShieldCheck, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const INITIAL_MODULES = [
    {
        id: 1,
        title: "1. Getting Started",
        lessons: [
            { id: 101, title: "Course Introduction", type: "video", duration: "5:30" },
            { id: 102, title: "Environment Setup", type: "video", duration: "15:45" },
        ]
    },
    {
        id: 2,
        title: "2. Advanced Concepts",
        lessons: [
            { id: 201, title: "State Management Deep Dive", type: "video", duration: "45:00" },
            { id: 202, title: "Module Quiz", type: "quiz", questions: 10 },
        ]
    }
];

export default function CourseBuilderScreen() {
    const params = useParams();
    const router = useRouter();
    const [modules, setModules] = useState(INITIAL_MODULES);

    const getIconForType = (type: string) => {
        switch (type) {
            case 'video': return <Video size={16} className="text-[#33E6FF]" />;
            case 'quiz': return <List size={16} className="text-[#FFB020]" />;
            case 'text': return <FileText size={16} className="text-purple-400" />;
            default: return <Type size={16} className="text-[#8899AA]" />;
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0A1420]">

            {/* Top Navbar */}
            <div className="h-16 bg-[#0F1C2E] border-b border-[#1A2A3A] flex items-center justify-between px-6 shrink-0 shadow-sm z-10 text-white">
                <div className="flex items-center gap-4">
                    <Link href={`/lms/admin/course/create`} className="text-[#8899AA] hover:text-white transition-colors bg-[#1A2A3A] p-2 rounded-xl">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Advanced System Design</h1>
                        <p className="text-xs text-[#8899AA]">Step 2: Curriculum Builder</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm font-semibold text-[#8899AA] hover:text-white transition-colors">Discard</button>
                    <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl font-bold flex items-center gap-2 hover:bg-[#2A3A4A] transition-colors">
                        <Save size={16} /> Save Draft
                    </button>
                    <button
                        onClick={() => router.push(`/lms/admin/course/${params.id}/assign`)}
                        className="px-6 py-2 bg-[#00E5A0] text-[#0A1420] rounded-xl font-bold flex items-center gap-2 hover:bg-[#00c98d] transition-colors shadow-[0_5px_15px_rgba(0,229,160,0.2)]"
                    >
                        Publish & Assign <ShieldCheck size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex gap-8 justify-center">

                {/* Main Builder Area */}
                <div className="w-full max-w-4xl space-y-6">

                    {/* Setup Progress */}
                    <div className="flex items-center justify-between mb-10 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1A2A3A] z-0"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2/3 h-1 bg-[#33E6FF] z-0"></div>

                        {['Basic Info', 'Curriculum Builder', 'Settings & Pricing', 'Publish'].map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${idx === 1 ? 'bg-[#33E6FF] text-[#0A1420] border-[#33E6FF] shadow-[0_0_15px_rgba(51,230,255,0.3)]' :
                                    idx < 1 ? 'bg-[#0F1C2E] border-[#33E6FF] text-[#33E6FF]' :
                                        'bg-[#0F1C2E] border-[#2A3A4A] text-[#8899AA]'
                                    }`}>
                                    {idx < 1 ? <CheckCircle2 size={20} /> : idx + 1}
                                </div>
                                <span className={`text-xs font-semibold ${idx === 1 ? 'text-[#33E6FF]' : 'text-[#8899AA]'}`}>{step}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
                            <p className="text-[#8899AA] text-sm">Organize your course into modules and lessons.</p>
                        </div>
                        <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-xl font-bold hover:bg-[#2A3A4A] transition-colors flex items-center gap-2 text-sm">
                            <Plus size={16} /> Add Module
                        </button>
                    </div>

                    <div className="space-y-6">
                        {modules.map((mod, modIdx) => (
                            <div key={mod.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl">
                                {/* Module Header */}
                                <div className="px-4 py-3 bg-[#152336] border-b border-[#1A2A3A] flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="cursor-grab text-[#445566] hover:text-white"><GripVertical size={18} /></div>
                                        <h3 className="font-bold text-white text-lg">{mod.title}</h3>
                                        <button className="p-1 text-[#445566] hover:text-[#33E6FF] opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={14} /></button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="text-[#8899AA] hover:text-[#FF4444] p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                        <button className="w-8 h-8 rounded border border-[#2A3A4A] flex items-center justify-center text-white hover:bg-[#2A3A4A] transition-colors">
                                            <ChevronLeft size={16} className="-rotate-90" />
                                        </button>
                                    </div>
                                </div>

                                {/* Lessons List */}
                                <div className="p-4 space-y-3">
                                    {mod.lessons.map((lesson, lessIdx) => (
                                        <div key={lesson.id} className="flex items-center justify-between p-3 bg-[#0A1420] border border-[#2A3A4A] rounded-xl group hover:border-[#3A4A5A] transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="cursor-grab text-[#445566] hover:text-white"><GripVertical size={16} /></div>
                                                <div className="w-8 h-8 rounded-lg bg-[#1A2A3A] flex items-center justify-center">
                                                    {getIconForType(lesson.type)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-sm">{lesson.title}</p>
                                                    <p className="text-xs text-[#8899AA] mt-0.5">
                                                        {lesson.type === 'video' ? `Video • ${lesson.duration}` : `Quiz • ${lesson.questions} questions`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 bg-[#1A2A3A] text-white rounded-lg hover:bg-[#2A3A4A] text-xs font-semibold border border-[#2A3A4A]">Content</button>
                                                <button className="p-2 bg-[#1A2A3A] text-white rounded-lg hover:bg-[#2A3A4A] border border-[#2A3A4A]"><Settings size={14} /></button>
                                                <button className="p-2 text-[#8899AA] hover:text-[#FF4444]"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Content Buttons */}
                                    <div className="flex items-center gap-2 pt-2">
                                        <button className="flex-1 py-3 border border-dashed border-[#2A3A4A] rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-[#8899AA] hover:text-white hover:border-[#33E6FF] hover:bg-[#33E6FF]/5 transition-colors">
                                            <Video size={16} /> Add Video
                                        </button>
                                        <button className="flex-1 py-3 border border-dashed border-[#2A3A4A] rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-[#8899AA] hover:text-white hover:border-[#FFB020] hover:bg-[#FFB020]/5 transition-colors">
                                            <List size={16} /> Add Quiz
                                        </button>
                                        <button className="flex-1 py-3 border border-dashed border-[#2A3A4A] rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-[#8899AA] hover:text-white hover:border-purple-400 hover:bg-purple-500/5 transition-colors">
                                            <FileText size={16} /> Add Article
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Sidebar Tools */}
                <div className="w-80 shrink-0 hidden lg:block">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl sticky top-0">
                        <h3 className="font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2">Course Metrics</h3>
                        <ul className="space-y-4 text-sm mb-6">
                            <li className="flex justify-between">
                                <span className="text-[#8899AA]">Total Modules:</span>
                                <span className="text-white font-semibold">2</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-[#8899AA]">Total Lessons:</span>
                                <span className="text-white font-semibold">4</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-[#8899AA]">Estimated Time:</span>
                                <span className="text-white font-semibold">1h 15m</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-[#8899AA]">Status:</span>
                                <span className="text-[#FFB020] font-semibold bg-[#FFB020]/10 px-2 py-0.5 rounded text-xs">Draft</span>
                            </li>
                        </ul>

                        <h3 className="font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2 pt-4">Global Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg text-sm font-semibold hover:bg-[#2A3A4A] transition-colors flex items-center justify-center gap-2">
                                <PlayCircle size={16} /> Preview as Learner
                            </button>
                            <button className="w-full py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg text-sm font-semibold hover:bg-[#2A3A4A] transition-colors flex items-center justify-center gap-2">
                                <Settings size={16} /> Course Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
