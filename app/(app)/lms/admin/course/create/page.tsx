"use client";
import React, { useState } from "react";
import NextImage from "next/image";
import { ArrowRight, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const STEPS = ["Basic Info", "Curriculum Builder", "Settings & Pricing", "Publish"] as const;

const STEP_CLASSES: Record<number, string> = {
    0: "bg-[#33E6FF] text-[#0A1420] border-[#33E6FF] shadow-[0_0_15px_rgba(51,230,255,0.3)]",
    1: "bg-[#0F1C2E] border-[#2A3A4A] text-[#8899AA]",
    2: "bg-[#0F1C2E] border-[#2A3A4A] text-[#8899AA]",
    3: "bg-[#0F1C2E] border-[#2A3A4A] text-[#8899AA]",
};

export default function CreateCourseScreen() {
    const router = useRouter();
    const [courseName, setCourseName] = useState("");
    const [category, setCategory] = useState("Technology");

    const handleNext = () => {
        router.push("/lms/admin/course/123/builder");
    };

    return (
        <Page
            title="Create New Course"
            subtitle="Step 1: Basic Information"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Admin", href: "/lms/admin/dashboard" },
                { label: "Create Course" },
            ]}
            maxWidth="1000px"
            actions={
                <>
                    <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={!courseName}
                        iconRight={<ArrowRight size={18} aria-hidden="true" />}
                    >
                        Proceed to Builder
                    </Button>
                </>
            }
        >
            {/* Setup Progress */}
            <div className="flex items-center justify-between mb-10 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1A2A3A] z-0" aria-hidden="true" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-1 bg-[#33E6FF] z-0" aria-hidden="true" />

                <ol className="flex items-center justify-between w-full" aria-label="Course creation steps">
                    {STEPS.map((step, idx) => (
                        <li key={idx} className="relative z-10 flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${STEP_CLASSES[idx] ?? "bg-[#0F1C2E] border-[#2A3A4A] text-[#8899AA]"}`}
                                aria-current={idx === 0 ? "step" : undefined}
                            >
                                {idx < 0 ? <CheckCircle2 size={20} aria-hidden="true" /> : idx + 1}
                            </div>
                            <span className={`text-xs font-semibold ${idx === 0 ? "text-[#33E6FF]" : "text-[#8899AA]"}`}>{step}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <Card padding="lg" className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />

                <h2 className="text-2xl font-bold text-white mb-2">Course Details</h2>
                <p className="text-[#8899AA] text-sm mb-8">Provide the foundational information for your new training module.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="course-title" className="block text-sm font-semibold text-white mb-2">
                                Course Title <span className="text-[#FF4444]" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="course-title"
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                required
                                className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                placeholder="e.g. Advanced System Design"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="course-category" className="block text-sm font-semibold text-white mb-2">Category</label>
                                <select
                                    id="course-category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors appearance-none"
                                >
                                    <option>Technology</option>
                                    <option>Leadership</option>
                                    <option>Compliance</option>
                                    <option>Sales</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="course-difficulty" className="block text-sm font-semibold text-white mb-2">Difficulty</label>
                                <select
                                    id="course-difficulty"
                                    className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors appearance-none"
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="course-description" className="block text-sm font-semibold text-white mb-2">Short Description</label>
                            <textarea
                                id="course-description"
                                rows={4}
                                className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors resize-none text-sm"
                                placeholder="A brief summary of what this course covers..."
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">Course Cover Image</label>
                            <label
                                htmlFor="course-cover"
                                className="border-2 border-dashed border-[#2A3A4A] bg-[#0A1420] rounded-2xl h-48 flex flex-col items-center justify-center text-center p-6 group hover:border-[#33E6FF] transition-colors cursor-pointer relative overflow-hidden"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#1A2A3A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <ImageIcon size={32} className="text-[#8899AA] group-hover:text-[#33E6FF] transition-colors" aria-hidden="true" />
                                </div>
                                <p className="text-white font-semibold text-sm mb-1">Upload Cover Image</p>
                                <p className="text-[#8899AA] text-xs">1920x1080px (16:9) recommended. Max 5MB.</p>
                                <input id="course-cover" type="file" accept="image/*" className="sr-only" />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">Assigned Instructor</label>
                            <div className="flex items-center justify-between bg-[#0A1420] border border-[#2A3A4A] p-3 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#1A2A3A] overflow-hidden">
                                        { }
                                        <NextImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Sarah Drasner" width={40} height={40} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">Sarah Drasner</p>
                                        <p className="text-[#8899AA] text-xs">VP Developer Experience</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Change</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
