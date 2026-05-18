"use client";

import { useState } from "react";
import { UploadCloud, FileText, Bot, CheckCircle2, Loader2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ParseStatus = "idle" | "parsing" | "done";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ResumeParser() {
    const [status, setStatus] = useState<ParseStatus>("idle");

    const handleUpload = () => {
        setStatus("parsing");
        setTimeout(() => setStatus("done"), 3000);
    };

    return (
        <Page
            title="AI Resume Parser"
            subtitle="Upload resumes in bulk or individually. Our AI will extract data and create candidate profiles automatically."
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Resume Parser" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Upload Section */}
                <div className="space-y-6">
                    <button
                        type="button"
                        onClick={status === "idle" ? handleUpload : undefined}
                        disabled={status !== "idle"}
                        aria-label="Upload resumes"
                        className={`flex h-[300px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
                            status === "idle"
                                ? "cursor-pointer border-[#1A2A3A] hover:border-[#0066FF] hover:bg-[#0066FF]/5"
                                : "pointer-events-none border-[#1A2A3A] bg-[#0A1420] opacity-50"
                        }`}
                    >
                        <div
                            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
                                status === "idle" ? "bg-[#1A2A3A] text-[#0066FF]" : "bg-[#1A2A3A] text-[#8899AA]"
                            }`}
                        >
                            <UploadCloud size={24} aria-hidden="true" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-white">Drag &amp; Drop Resumes</h3>
                        <p className="max-w-[250px] text-sm text-[#8899AA]">
                            Supports PDF, DOCX, and TXT files up to 10MB each. You can upload up to 50
                            resumes at once.
                        </p>
                        <div className="pointer-events-none mt-6">
                            <Button>Browse Files</Button>
                        </div>
                    </button>

                    <Card padding="md">
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                            <Bot size={16} className="text-[#00E5A0]" aria-hidden="true" /> Powered by HRflow AI
                        </div>
                        <p className="text-xs leading-relaxed text-[#8899AA]">
                            Our proprietary LLM automatically structures unstructured resume data,
                            extracting skills, work history, education, and contact details with 98.5%
                            accuracy.
                        </p>
                    </Card>
                </div>

                {/* Parsing Status / Output */}
                <Card padding="none" className="flex flex-col overflow-hidden">
                    <div className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <h3 className="text-sm font-semibold text-white">Processing Queue</h3>
                    </div>

                    <div className="flex-1 p-4">
                        {status === "idle" && (
                            <div className="flex h-full flex-col items-center justify-center text-[#445566]">
                                <FileText size={40} className="mb-3 opacity-20" aria-hidden="true" />
                                <p className="text-sm">No files uploaded yet.</p>
                            </div>
                        )}

                        {status === "parsing" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-4">
                                    <div className="flex items-center gap-3">
                                        <FileText size={18} className="text-[#8899AA]" aria-hidden="true" />
                                        <div>
                                            <p className="text-sm font-medium text-white">
                                                amit_patel_cv_2025.pdf
                                            </p>
                                            <p className="mt-1 flex items-center gap-1 text-xs text-[#0066FF]">
                                                <Loader2 size={10} className="animate-spin" aria-hidden="true" />{" "}
                                                Extracting entities…
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-white">45%</span>
                                </div>
                            </div>
                        )}

                        {status === "done" && (
                            <div className="space-y-4">
                                <div className="relative overflow-hidden rounded-xl border border-[#00E5A0]/30 bg-[#0A1420] p-4">
                                    <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl bg-[#00E5A0]/10 p-2 text-xs font-bold text-[#00E5A0]">
                                        <CheckCircle2 size={12} aria-hidden="true" /> Parsed
                                    </div>

                                    <div className="mb-4 flex items-center gap-3">
                                        <div
                                            aria-hidden="true"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A3A] text-sm font-bold text-[#00E5A0]"
                                        >
                                            AP
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Amit Patel</h4>
                                            <p className="text-[11px] text-[#8899AA]">
                                                Fullstack Developer · +91 98765 00000
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-4 space-y-2">
                                        <div className="flex justify-between rounded bg-[#1A2A3A]/50 px-2 py-1.5 text-xs">
                                            <span className="text-[#8899AA]">Experience</span>
                                            <span className="font-medium text-white">4.5 Years</span>
                                        </div>
                                        <div className="flex justify-between rounded bg-[#1A2A3A]/50 px-2 py-1.5 text-xs">
                                            <span className="text-[#8899AA]">Education</span>
                                            <span className="font-medium text-white">B.Tech, IIT Bombay</span>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex flex-wrap gap-1">
                                        {["Node.js", "React", "MongoDB", "AWS"].map((s) => (
                                            <span
                                                key={s}
                                                className="rounded bg-[#0066FF]/10 px-2 py-1 text-[10px] text-[#0066FF]"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button size="sm" className="flex-1 justify-center">
                                            Create Candidate
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1 justify-center">
                                            Edit Data
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
