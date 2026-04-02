"use client";
import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, ExternalLink, Calendar, Star, Download, MoreHorizontal, CheckCircle2, ChevronRight, FileText } from "lucide-react";

export default function CandidateProfile() {
    const [activeTab, setActiveTab] = useState("Resume");

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] text-white">
            {/* Header */}
            <div className="shrink-0 p-6 md:px-8 flex items-center justify-between border-b border-[#1A2A3A]">
                <div className="flex items-center gap-5">
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><ArrowLeft size={16} /></button>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0066FF] to-[#00E5A0] rounded-full p-[2px]">
                        <div className="w-full h-full bg-[#0A1420] rounded-full flex items-center justify-center text-lg font-bold text-white">
                            RS
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold">Rahul Sharma</h1>
                            <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#9B59B6]/10 text-[#9B59B6]">Interview Stage</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#8899AA]">
                            <span className="flex items-center gap-1.5"><Mail size={12} /> r.sharma@example.com</span>
                            <span className="flex items-center gap-1.5"><Phone size={12} /> +91 98765 43210</span>
                            <span className="flex items-center gap-1.5"><ExternalLink size={12} /> LinkedIn</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#FF4444]/10 text-[#FF4444] text-sm font-medium rounded-xl hover:bg-[#FF4444]/20 transition-colors">Reject</button>
                    <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-white text-sm font-medium rounded-xl hover:bg-[#1A2A3A] transition-colors">Move Stage</button>
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><MoreHorizontal size={16} /></button>
                </div>
            </div>

            {/* Split View */}
            <div className="flex-1 overflow-hidden flex">

                {/* PDF/Resume Preview (Left) */}
                <div className="w-1/2 border-r border-[#1A2A3A] flex flex-col bg-[#060B14]">
                    <div className="h-12 border-b border-[#1A2A3A] px-4 flex items-center justify-between shrink-0 bg-[#0A1420]">
                        <div className="flex gap-2 text-sm">
                            {["Resume", "Cover Letter", "Portfolio"].map(t => (
                                <button key={t} onClick={() => setActiveTab(t)}
                                    className={`px-4 h-12 border-b-2 font-medium transition-colors ${activeTab === t ? 'border-[#0066FF] text-white' : 'border-transparent text-[#8899AA] hover:text-white'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <button className="h-8 px-3 bg-[#1A2A3A] text-[#8899AA] text-xs rounded-lg hover:text-white transition-colors flex items-center gap-1.5">
                            <Download size={12} /> Download
                        </button>
                    </div>
                    {/* Fake PDF Viewer */}
                    <div className="flex-1 m-4 border border-[#1A2A3A] bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                        <div className="text-gray-400 text-center">
                            <FileText size={48} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm font-medium">Rahul_Sharma_Resume.pdf</p>
                            <p className="text-xs mt-1">Simulated PDF Viewer</p>
                        </div>
                    </div>
                </div>

                {/* Details & Timeline (Right) */}
                <div className="w-1/2 flex flex-col bg-[#0A1420] overflow-y-auto w-full scrollbar-thin scrollbar-thumb-[#1A2A3A] scrollbar-track-transparent">
                    <div className="p-6 space-y-6">

                        {/* Application Info */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <h3 className="font-semibold text-sm mb-4">Application Details</h3>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                                <div>
                                    <p className="text-[#8899AA] text-xs mb-1">Applied For</p>
                                    <p className="font-medium text-white">Senior Frontend Engineer</p>
                                </div>
                                <div>
                                    <p className="text-[#8899AA] text-xs mb-1">Source</p>
                                    <p className="font-medium text-white">LinkedIn Job Board</p>
                                </div>
                                <div>
                                    <p className="text-[#8899AA] text-xs mb-1">Applied Date</p>
                                    <p className="font-medium text-white">12 Mar 2025</p>
                                </div>
                                <div>
                                    <p className="text-[#8899AA] text-xs mb-1">Expected Salary</p>
                                    <p className="font-medium text-white">₹32,00,000 P.A.</p>
                                </div>
                            </div>
                        </div>

                        {/* Parsed Skills */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-sm">Skills Match (88%)</h3>
                                <span className="text-xs text-[#00E5A0]">Strong Fit</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "GraphQL", "Jest"].map(skill => (
                                    <div key={skill} className="bg-[#1A2A3A] text-xs text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                                        <CheckCircle2 size={12} className="text-[#00E5A0]" /> {skill}
                                    </div>
                                ))}
                                <div className="bg-[#1A2A3A] border border-dashed border-[#FF4444]/50 text-[#8899AA] text-xs px-2.5 py-1.5 rounded-lg">
                                    Missing: AWS Deployments
                                </div>
                            </div>
                        </div>

                        {/* Interview Feedback */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-sm text-white">Scorecards & Feedback</h3>
                                <button className="text-xs font-medium text-[#0066FF] hover:underline">Request Feedback</button>
                            </div>
                            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-white">PN</div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">Technical Round</p>
                                            <p className="text-[11px] text-[#8899AA]">By Priya Nair · 14 Mar 2025</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} size={12} style={{ color: s <= 4 ? "#00E5A0" : "#1A2A3A", fill: s <= 4 ? "#00E5A0" : "#1A2A3A" }} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-[#8899AA] leading-relaxed">
                                    "Rahul demonstrated excellent knowledge of React rendering concepts and built the required component in 20 minutes. Communication was extremely clear. Highly recommended."
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
