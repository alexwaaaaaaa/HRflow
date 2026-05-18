"use client";
import React from "react";
import { ArrowRight, Clock, CheckCircle2, Target, BookOpen,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface LearningPath {
    id: number;
    title: string;
    desc: string;
    gradientClass: string;
    courses: number;
    duration: string;
    progress: number;
    enrolled: boolean;
}

const PATHS: LearningPath[] = [
    {
        id: 1,
        title: "Senior Frontend Engineer Path",
        desc: "A curated journey from mid-level to senior, covering advanced architecture, performance optimization, and leadership.",
        gradientClass: "from-[#33E6FF] to-blue-600",
        courses: 6,
        duration: "45h",
        progress: 35,
        enrolled: true,
    },
    {
        id: 2,
        title: "Cloud Architect Certification Track",
        desc: "Master AWS services, infrastructure as code, and system design principles required for architecting scalable applications.",
        gradientClass: "from-[#FFB020] to-orange-600",
        courses: 8,
        duration: "120h",
        progress: 0,
        enrolled: false,
    },
    {
        id: 3,
        title: "Engineering Manager Transition",
        desc: "Develop the soft skills, agile methodologies, and leadership capabilities needed to successfully lead engineering teams.",
        gradientClass: "from-purple-500 to-indigo-600",
        courses: 4,
        duration: "24h",
        progress: 100,
        enrolled: true,
    },
];

function PathCard({ path }: { path: LearningPath }) {
    return (
        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl overflow-hidden hover:-translate-y-1 hover:border-[#2A3A4A] transition-all flex flex-col group shadow-lg">
            <div className={`h-32 bg-gradient-to-r ${path.gradientClass} p-6 relative flex flex-col justify-between`}>
                <div className="absolute top-0 right-0 w-full h-full bg-black/20 group-hover:bg-transparent transition-colors" aria-hidden="true" />
                <div className="flex justify-between items-start relative z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                        <Target size={24} className="text-white" aria-hidden="true" />
                    </div>
                    {path.enrolled && path.progress === 100 ? (
                        <Badge variant="success">
                            <CheckCircle2 size={10} aria-hidden="true" /> Completed
                        </Badge>
                    ) : path.enrolled ? (
                        <Badge variant="info">In Progress</Badge>
                    ) : null}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">{path.title}</h3>
                <p className="text-[#8899AA] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{path.desc}</p>

                {path.enrolled && path.progress > 0 && path.progress < 100 && (
                    <div className="mb-6 bg-[#152336] p-4 rounded-2xl border border-[#2A3A4A]">
                        <div className="flex justify-between text-xs font-semibold mb-2">
                            <span className="text-white">Overall Progress</span>
                            <span className="text-[#33E6FF]">{path.progress}%</span>
                        </div>
                        <div
                            className="w-full h-2 bg-[#0A1420] rounded-full overflow-hidden border border-[#1A2A3A]"
                            role="progressbar"
                            aria-valuenow={path.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${path.progress}% complete`}
                        >
                            <div
                                className="h-full bg-gradient-to-r from-[#33E6FF] to-blue-500 rounded-full"
                                style={{ width: `${path.progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between text-xs font-bold text-[#445566] uppercase tracking-wider mb-6 pt-6 border-t border-[#1A2A3A]">
                    <span className="flex items-center gap-1.5"><BookOpen size={16} className="text-[#8899AA]" aria-hidden="true" /> {path.courses} Courses</span>
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#8899AA]" aria-hidden="true" /> {path.duration}</span>
                </div>

                <Link href={`/lms/learning-path/${path.id}`}>
                    <Button
                        variant="secondary"
                        className="w-full justify-center group-hover:border-[#33E6FF]/50 group-hover:text-[#33E6FF]"
                        iconRight={<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />}
                    >
                        View Journey
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function LearningPaths() {
    return (
        <Page
            title="Learning Paths"
            subtitle="Curated chronological journeys designed to help you master specific roles or large skillsets"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Learning Paths" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary">My Paths</Button>
                    <Button variant="primary">Explore All</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {PATHS.map((path) => (
                    <PathCard key={path.id} path={path} />
                ))}
            </div>
        </Page>
    );
}
