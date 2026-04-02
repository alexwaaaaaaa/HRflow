"use client";
import React, { useState } from "react";
import { UploadCloud, FileText, Bot, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function ResumeParser() {
    const [status, setStatus] = useState<"idle" | "parsing" | "done">("idle");

    const handleUpload = () => {
        setStatus("parsing");
        setTimeout(() => setStatus("done"), 3000); // simulate API delay
    };

    return (
        <div className="p-6 md:p-8 max-w-[1000px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">AI Resume Parser</h1>
                <p className="text-sm text-[#8899AA]">Upload resumes in bulk or individually. Our AI will extract data and create candidate profiles automatically.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Upload Section */}
                <div>
                    <div
                        onClick={status === "idle" ? handleUpload : undefined}
                        className={`h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6 transition-all ${status === "idle" ? 'border-[#1A2A3A] hover:border-[#0066FF] hover:bg-[#0066FF]/5 cursor-pointer' : 'border-[#1A2A3A] bg-[#0A1420] opacity-50 pointer-events-none'}`}>

                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${status === "idle" ? 'bg-[#1A2A3A] text-[#0066FF]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>
                            <UploadCloud size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Drag & Drop Resumes</h3>
                        <p className="text-sm text-[#8899AA] max-w-[250px]">Supports PDF, DOCX, and TXT files up to 10MB each. You can upload up to 50 resumes at once.</p>
                        <button className="h-10 px-6 mt-6 bg-[#0066FF] text-white text-sm font-bold rounded-xl pointer-events-none">Browse Files</button>
                    </div>

                    <div className="mt-6 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-2 text-sm font-semibold">
                            <Bot size={16} className="text-[#00E5A0]" /> Powered by HRflow AI
                        </div>
                        <p className="text-xs text-[#8899AA] leading-relaxed">
                            Our proprietary LLM automatically structures unstructured resume data, extracting skills, work history, education, and contact details with 98.5% accuracy.
                        </p>
                    </div>
                </div>

                {/* Parsing Status / Output */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                        <h3 className="font-semibold text-sm">Processing Queue</h3>
                    </div>

                    <div className="p-4 flex-1">
                        {status === "idle" && (
                            <div className="h-full flex flex-col items-center justify-center text-[#445566]">
                                <FileText size={40} className="mb-3 opacity-20" />
                                <p className="text-sm">No files uploaded yet.</p>
                            </div>
                        )}

                        {status === "parsing" && (
                            <div className="space-y-4">
                                <div className="p-4 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText size={18} className="text-[#8899AA]" />
                                        <div>
                                            <p className="text-sm font-medium text-white">amit_patel_cv_2025.pdf</p>
                                            <p className="text-xs text-[#0066FF] mt-1 flex items-center gap-1">
                                                <Loader2 size={10} className="animate-spin" /> Extracting entities...
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-white">45%</span>
                                </div>
                            </div>
                        )}

                        {status === "done" && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-4 bg-[#0A1420] border border-[#00E5A0]/30 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 bg-[#00E5A0]/10 text-[#00E5A0] rounded-bl-xl text-xs font-bold flex items-center gap-1">
                                        <CheckCircle2 size={12} /> Parsed
                                    </div>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center font-bold text-sm text-[#00E5A0]">AP</div>
                                        <div>
                                            <h4 className="font-bold text-white">Amit Patel</h4>
                                            <p className="text-[11px] text-[#8899AA]">Fullstack Developer · +91 98765 00000</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="bg-[#1A2A3A]/50 rounded text-xs px-2 py-1.5 flex justify-between">
                                            <span className="text-[#8899AA]">Experience</span>
                                            <span className="font-medium">4.5 Years</span>
                                        </div>
                                        <div className="bg-[#1A2A3A]/50 rounded text-xs px-2 py-1.5 flex justify-between">
                                            <span className="text-[#8899AA]">Education</span>
                                            <span className="font-medium">B.Tech, IIT Bombay</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {["Node.js", "React", "MongoDB", "AWS"].map(s => (
                                            <span key={s} className="text-[10px] bg-[#0066FF]/10 text-[#0066FF] px-2 py-1 rounded">{s}</span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 h-8 bg-[#00E5A0] text-[#060B14] text-xs font-bold rounded-lg hover:bg-[#00c98d] transition-colors">Create Candidate</button>
                                        <button className="flex-1 h-8 bg-transparent border border-[#2A3A4A] text-white text-xs font-bold rounded-lg hover:border-[#445566] transition-colors">Edit Data</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
