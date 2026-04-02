"use client";
import React, { useState } from "react";
import {
    ShieldAlert, BookOpen, Clock, FileText, CheckSquare, Award, ArrowRight, PlayCircle, Scale
} from "lucide-react";
import Link from "next/link";

export default function PoshComplianceScreen() {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="p-6 max-w-[1000px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Banner */}
            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#33E6FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border-2 border-[#2A3A4A] flex flex-col items-center justify-center shrink-0 shadow-lg relative z-10">
                    <Scale size={32} className="text-[#33E6FF] mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8899AA]">Annual</span>
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF4444] bg-[#FF4444]/10 border border-[#FF4444]/20 px-2.5 py-1 rounded mb-3">
                        <ShieldAlert size={14} /> Mandatory Compliance
                    </div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Prevention of Sexual Harassment (POSH)</h1>
                    <p className="text-[#8899AA] text-sm flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <span className="flex items-center gap-1.5"><Clock size={14} /> Est. Time: 1h 30m</span>
                        <span className="flex items-center gap-1.5"><FileText size={14} /> 4 Modules + Quiz</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#FFB020]" /> Due: Oct 31, 2025</span>
                    </p>
                </div>

                <div className="shrink-0 relative z-10 w-full md:w-auto">
                    <button className="w-full md:w-max px-8 py-3.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors shadow-[0_5px_15px_rgba(0,229,160,0.2)] flex items-center justify-center gap-2">
                        Start Module 1 <PlayCircle size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-8">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl text-sm text-[#8899AA] leading-relaxed">
                        <h2 className="text-xl font-bold text-white mb-4">Course Overview</h2>
                        <p className="mb-4">TechCorp is committed to providing a safe, inclusive, and harassment-free workplace for all employees. This mandatory training is designed to help you understand what constitutes sexual harassment, how to prevent it, and the procedures for reporting instances of misconduct.</p>
                        <p>Failure to complete this compliance training by the due date may result in suspension of system access.</p>

                        <h3 className="text-white font-bold mt-6 mb-3">Learning Objectives</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><CheckSquare size={16} className="text-[#33E6FF] shrink-0 mt-0.5" /> Understand the legal definition of sexual harassment in the workplace</li>
                            <li className="flex items-start gap-2"><CheckSquare size={16} className="text-[#33E6FF] shrink-0 mt-0.5" /> Identify inappropriate behaviors and understand their impact</li>
                            <li className="flex items-start gap-2"><CheckSquare size={16} className="text-[#33E6FF] shrink-0 mt-0.5" /> Know the company's internal complaint committee (ICC) members</li>
                            <li className="flex items-start gap-2"><CheckSquare size={16} className="text-[#33E6FF] shrink-0 mt-0.5" /> Learn the procedures for filing a grievance and non-retaliation policies</li>
                        </ul>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-white mb-6">Curriculum</h2>
                        <div className="space-y-3">
                            {[
                                { m: 1, title: "Introduction & Legal Framework", dur: "20m", type: "video" },
                                { m: 2, title: "Identifying Harassment & Case Studies", dur: "35m", type: "interactive" },
                                { m: 3, title: "TechCorp's Reporting Protocol & ICC", dur: "15m", type: "article" },
                                { m: 4, title: "Bystander Intervention", dur: "10m", type: "video" },
                                { m: 5, title: "Final Assessment & Attestation", dur: "10m", type: "quiz" },
                            ].map((mod, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-[#152336] border border-[#2A3A4A] rounded-xl hover:border-[#33E6FF]/50 transition-colors cursor-not-allowed opacity-80">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#1A2A3A] rounded-lg flex items-center justify-center">
                                            {mod.type === 'video' ? <PlayCircle size={14} className="text-[#33E6FF]" /> : mod.type === 'quiz' ? <FileText size={14} className="text-[#FFB020]" /> : <BookOpen size={14} className="text-purple-400" />}
                                        </div>
                                        <span className="text-white font-medium text-sm">Module {mod.m}: {mod.title}</span>
                                    </div>
                                    <span className="text-xs text-[#8899AA] border border-[#2A3A4A] px-2 py-1 rounded bg-[#0A1420]">{mod.dur}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Policy Acknowledgment Block */}
                    <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl">
                        <h3 className="font-bold text-white mb-4">Pre-Course Attestation</h3>
                        <p className="text-sm text-[#8899AA] mb-4">Before beginning this course, you must acknowledge that you have access to the latest TechCorp POSH Policy document.</p>

                        <div className="p-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-[#33E6FF]" />
                                <span className="text-white text-sm">TechCorp_POSH_Policy_2025.pdf</span>
                            </div>
                            <button className="text-xs font-semibold text-[#00E5A0] hover:underline">Download</button>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-start pt-0.5">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="w-5 h-5 rounded border-[#2A3A4A] bg-[#0A1420] text-[#00E5A0] focus:ring-[#00E5A0] focus:ring-offset-[#152336] transition-colors"
                                />
                            </div>
                            <span className="text-sm text-[#8899AA] group-hover:text-white transition-colors">
                                I acknowledge that I have received and read the TechCorp Prevention of Sexual Harassment Policy. I understand that completing this training is a mandatory requirement of my employment.
                            </span>
                        </label>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl sticky top-0">
                        <h3 className="font-bold text-white mb-4">Course Info</h3>
                        <ul className="space-y-4 text-sm mb-6">
                            <li className="flex flex-col">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider mb-1">Status</span>
                                <span className="inline-flex w-max items-center gap-1.5 px-2 py-1 bg-[#1A2A3A] text-white font-medium rounded border border-[#2A3A4A]">Not Started</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider mb-1">Pass Requirement</span>
                                <span className="text-white font-medium">100% on Final Assessment</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-xs text-[#8899AA] uppercase tracking-wider mb-1">Certificate Valid For</span>
                                <span className="text-white font-medium">1 Year</span>
                            </li>
                        </ul>

                        <div className="bg-[#152336] p-4 border border-[#2A3A4A] rounded-xl text-center">
                            <Award size={32} className="text-[#00E5A0] mx-auto mb-2 opacity-50" />
                            <p className="text-xs text-[#8899AA]">Complete course to unlock your compliance certificate and digital badge.</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
