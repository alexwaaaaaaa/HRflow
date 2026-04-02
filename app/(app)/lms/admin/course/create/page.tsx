"use client";
import React, { useState } from "react";
import {
    UploadCloud, ArrowRight, Settings, LayoutGrid, CheckCircle2, ChevronLeft, Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateCourseScreen() {
    const router = useRouter();
    const [courseName, setCourseName] = useState("");
    const [category, setCategory] = useState("Technology");

    const handleNext = () => {
        // Navigate to the course builder with a mock 123
        router.push("/lms/admin/course/123/builder");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0A1420]">

            {/* Top Navbar */}
            <div className="h-16 bg-[#0F1C2E] border-b border-[#1A2A3A] flex items-center justify-between px-6 shrink-0 shadow-sm z-10 text-white">
                <div className="flex items-center gap-4">
                    <Link href={`/lms/admin/dashboard`} className="text-[#8899AA] hover:text-white transition-colors bg-[#1A2A3A] p-2 rounded-xl">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Create New Course</h1>
                        <p className="text-xs text-[#8899AA]">Step 1: Basic Information</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm font-semibold text-[#8899AA] hover:text-white transition-colors">Cancel</button>
                    <button
                        onClick={handleNext}
                        disabled={!courseName}
                        className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${courseName
                                ? 'bg-[#00E5A0] text-[#0A1420] hover:bg-[#00c98d] shadow-[0_5px_15px_rgba(0,229,160,0.2)]'
                                : 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed'
                            }`}
                    >
                        Proceed to Builder <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center">
                <div className="w-full max-w-4xl">

                    {/* Setup Progress */}
                    <div className="flex items-center justify-between mb-10 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1A2A3A] z-0"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1 bg-[#33E6FF] z-0"></div>

                        {['Basic Info', 'Curriculum Builder', 'Settings & Pricing', 'Publish'].map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${idx === 0 ? 'bg-[#33E6FF] text-[#0A1420] border-[#33E6FF] shadow-[0_0_15px_rgba(51,230,255,0.3)]' :
                                        idx < 0 ? 'bg-[#0F1C2E] border-[#33E6FF] text-[#33E6FF]' :
                                            'bg-[#0F1C2E] border-[#2A3A4A] text-[#8899AA]'
                                    }`}>
                                    {idx < 0 ? <CheckCircle2 size={20} /> : idx + 1}
                                </div>
                                <span className={`text-xs font-semibold ${idx === 0 ? 'text-[#33E6FF]' : 'text-[#8899AA]'}`}>{step}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <h2 className="text-2xl font-bold text-white mb-2">Course Details</h2>
                        <p className="text-[#8899AA] text-sm mb-8">Provide the foundational information for your new training module.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Course Title <span className="text-[#FF4444]">*</span></label>
                                    <input
                                        type="text"
                                        value={courseName}
                                        onChange={e => setCourseName(e.target.value)}
                                        className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                        placeholder="e.g. Advanced System Design"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">Category</label>
                                        <select
                                            value={category}
                                            onChange={e => setCategory(e.target.value)}
                                            className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors appearance-none"
                                        >
                                            <option>Technology</option>
                                            <option>Leadership</option>
                                            <option>Compliance</option>
                                            <option>Sales</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">Difficulty</label>
                                        <select className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors appearance-none">
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Short Description</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-[#33E6FF] transition-colors resize-none text-sm"
                                        placeholder="A brief summary of what this course covers..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Course Cover Image</label>
                                    <div className="border-2 border-dashed border-[#2A3A4A] bg-[#0A1420] rounded-2xl h-48 flex flex-col items-center justify-center text-center p-6 group hover:border-[#33E6FF] transition-colors cursor-pointer relative overflow-hidden">
                                        <div className="w-16 h-16 rounded-full bg-[#1A2A3A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <ImageIcon size={32} className="text-[#8899AA] group-hover:text-[#33E6FF] transition-colors" />
                                        </div>
                                        <p className="text-white font-semibold text-sm mb-1">Upload Cover Image</p>
                                        <p className="text-[#8899AA] text-xs">1920x1080px (16:9) recommended. Max 5MB.</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Assigned Instructor</label>
                                    <div className="flex items-center justify-between bg-[#0A1420] border border-[#2A3A4A] p-3 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] overflow-hidden">
                                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Inst" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm">Sarah Drasner</p>
                                                <p className="text-[#8899AA] text-xs">VP Developer Experience</p>
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-[#33E6FF] px-3 py-1.5 bg-[#33E6FF]/10 rounded-lg hover:bg-[#33E6FF]/20 transition-colors">
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
