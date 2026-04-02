"use client";
import React from "react";
import {
    Milestone, ArrowRight, Clock, Star, Users, CheckCircle2, ChevronRight, Target, BookOpen
} from "lucide-react";
import Link from "next/link";

const PATHS = [
    {
        id: 1,
        title: "Senior Frontend Engineer Path",
        desc: "A curated journey from mid-level to senior, covering advanced architecture, performance optimization, and leadership.",
        color: "from-[#33E6FF] to-blue-600",
        courses: 6,
        duration: "45h",
        progress: 35,
        enrolled: true
    },
    {
        id: 2,
        title: "Cloud Architect Certification Track",
        desc: "Master AWS services, infrastructure as code, and system design principles required for architecting scalable applications.",
        color: "from-[#FFB020] to-orange-600",
        courses: 8,
        duration: "120h",
        progress: 0,
        enrolled: false
    },
    {
        id: 3,
        title: "Engineering Manager Transition",
        desc: "Develop the soft skills, agile methodologies, and leadership capabilities needed to successfully lead engineering teams.",
        color: "from-purple-500 to-indigo-600",
        courses: 4,
        duration: "24h",
        progress: 100,
        enrolled: true
    }
];

export default function LearningPaths() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                            <Milestone size={20} className="text-purple-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Learning Paths</h1>
                    </div>
                    <p className="text-[#8899AA] text-lg max-w-2xl mt-2">Curated chronological journeys designed to help you master specific roles or large skillsets.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-medium rounded-xl hover:bg-[#2A3A4A] transition-colors">
                        My Paths
                    </button>
                    <button className="px-5 py-2.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] justify-center transition-colors">
                        Explore All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PATHS.map(path => (
                    <div key={path.id} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl overflow-hidden hover:-translate-y-1 hover:border-[#2A3A4A] transition-all flex flex-col group shadow-lg">
                        <div className={`h-32 bg-gradient-to-r ${path.color} p-6 relative flex flex-col justify-between`}>
                            <div className="absolute top-0 right-0 w-full h-full bg-black/20 group-hover:bg-transparent transition-colors"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                                    <Target size={24} className="text-white" />
                                </div>
                                {path.enrolled && path.progress === 100 ? (
                                    <div className="bg-[#00E5A0] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-md flex items-center gap-1">
                                        <CheckCircle2 size={12} /> Completed
                                    </div>
                                ) : path.enrolled ? (
                                    <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-white/20 shadow-md">
                                        In Progress
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">{path.title}</h3>
                            <p className="text-[#8899AA] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{path.desc}</p>

                            {path.enrolled && path.progress < 100 && (
                                <div className="mb-6 bg-[#152336] p-4 rounded-2xl border border-[#2A3A4A]">
                                    <div className="flex justify-between text-xs font-semibold mb-2">
                                        <span className="text-white">Overall Progress</span>
                                        <span className="text-[#33E6FF]">{path.progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-[#0A1420] rounded-full overflow-hidden border border-[#1A2A3A]">
                                        <div className="h-full bg-gradient-to-r from-[#33E6FF] to-blue-500 rounded-full" style={{ width: `${path.progress}%` }}></div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between text-xs font-bold text-[#445566] uppercase tracking-wider mb-6 pt-6 border-t border-[#1A2A3A]">
                                <span className="flex items-center gap-1.5"><BookOpen size={16} className="text-[#8899AA]" /> {path.courses} Courses</span>
                                <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#8899AA]" /> {path.duration}</span>
                            </div>

                            <Link href={`/lms/learning-path/${path.id}`} className="w-full py-3.5 bg-[#1A2A3A] text-white font-semibold rounded-xl hover:bg-[#2A3A4A] transition-colors border border-[#2A3A4A] flex justify-center items-center gap-2 group-hover:border-[#33E6FF]/50 group-hover:text-[#33E6FF]">
                                View Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
