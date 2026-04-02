"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
    ArrowLeft, Check, UploadCloud, FileText, AlertCircle,
    CheckCircle2, X, Eye, Sparkles, Loader2, RefreshCw, Plus
} from "lucide-react";

type DocStatus = "missing" | "uploaded" | "scanning" | "ai_done";

interface DocItem {
    title: string;
    status: DocStatus;
    file?: string;
    detectedAs?: string;
    autoVerified?: boolean;
}

const MANDATORY_DOCS_INITIAL: DocItem[] = [
    { title: "PAN Card", status: "ai_done", file: "PAN_Rahul_S.pdf", detectedAs: "PAN Card", autoVerified: true },
    { title: "Aadhaar Card", status: "missing" },
    { title: "Passport Photo", status: "missing" },
    { title: "Signed Offer Letter", status: "uploaded", file: "Offer_Letter_Signed.pdf" },
    { title: "Signed Appointment Letter", status: "missing" },
];

const STEPS = [
    { num: 1, label: "Personal", status: "completed" },
    { num: 2, label: "Job", status: "completed" },
    { num: 3, label: "Salary", status: "completed" },
    { num: 4, label: "Statutory", status: "completed" },
    { num: 5, label: "Bank", status: "completed" },
    { num: 6, label: "Docs", status: "active" },
];

export default function DocumentsStep() {
    const [docs, setDocs] = useState<DocItem[]>(MANDATORY_DOCS_INITIAL);
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const uploadedCount = docs.filter(d => d.status === "uploaded" || d.status === "ai_done").length;
    const totalCount = docs.length;

    function simulateAIScan(idx: number, filename: string) {
        setDocs(prev => prev.map((d, i) => i === idx ? { ...d, status: "scanning", file: filename } : d));
        setTimeout(() => {
            setDocs(prev => prev.map((d, i) => i === idx ? {
                ...d, status: "ai_done",
                detectedAs: d.title,
                autoVerified: true
            } : d));
        }, 2200);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        const missingIdx = docs.findIndex(d => d.status === "missing");
        if (missingIdx !== -1) simulateAIScan(missingIdx, file.name);
    }

    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const missingIdx = docs.findIndex(d => d.status === "missing");
        if (missingIdx !== -1) simulateAIScan(missingIdx, file.name);
    }

    function removeDoc(idx: number) {
        setDocs(prev => prev.map((d, i) => i === idx ? { ...d, status: "missing", file: undefined, detectedAs: undefined, autoVerified: false } : d));
    }

    const completeness = Math.round((uploadedCount / totalCount) * 100);

    return (
        <div className="max-w-[720px] mx-auto px-6 py-8">
            {/* Back */}
            <Link href="/employees" className="inline-flex items-center gap-2 text-[#8899AA] text-sm mb-5 hover:text-white no-underline transition-colors">
                <ArrowLeft size={16} /> Back to Employees
            </Link>

            <h1 className="text-2xl font-bold text-white mb-1">Add New Employee</h1>
            <p className="text-sm text-[#8899AA] mb-8">Complete all steps to onboard a new team member.</p>

            {/* Step Progress */}
            <div className="flex items-center mb-12">
                {STEPS.map((step, i, arr) => (
                    <div key={step.num} className="flex items-center" style={{ flex: i < arr.length - 1 ? 1 : "initial" }}>
                        <div className="flex flex-col items-center gap-1.5 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${step.status === "completed" ? "bg-[#00E5A0] text-[#060B14]" : step.status === "active" ? "bg-[#0066FF] text-white ring-4 ring-[#0066FF]/20" : "bg-[#1A2A3A] text-[#445566]"}`}>
                                {step.status === "completed" ? <Check size={14} /> : step.num}
                            </div>
                            <span className={`absolute top-10 text-[11px] whitespace-nowrap font-medium ${step.status === "pending" ? "text-[#445566]" : "text-white"}`}>{step.label}</span>
                        </div>
                        {i < arr.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-3 mt-[-16px] ${step.status === "completed" ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Completeness banner */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Document Completeness</span>
                    <span className={`text-sm font-bold ${completeness === 100 ? "text-[#00E5A0]" : completeness >= 60 ? "text-[#FFB800]" : "text-[#FF4444]"}`}>{completeness}%</span>
                </div>
                <div className="w-full bg-[#1A2A3A] rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-700 ${completeness === 100 ? "bg-[#00E5A0]" : completeness >= 60 ? "bg-[#FFB800]" : "bg-[#FF4444]"}`} style={{ width: `${completeness}%` }} />
                </div>
                <p className="text-[11px] text-[#8899AA] mt-2">{uploadedCount} of {totalCount} mandatory documents uploaded {completeness < 100 && "— you can complete this later"}</p>
            </div>

            {/* AI Drop Zone */}
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.docx" className="hidden" onChange={handleFileInput} />
            <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all mb-6 ${dragOver ? "border-[#00E5A0] bg-[#00E5A0]/5 scale-[1.01]" : "border-[#1A2A3A] hover:border-[#0066FF]/50 hover:bg-[#0066FF]/5"}`}
            >
                <UploadCloud size={40} className={`mx-auto mb-4 ${dragOver ? "text-[#00E5A0]" : "text-[#445566]"}`} />
                <h3 className="text-lg font-semibold text-white mb-2">Drop files here or click to browse</h3>
                <p className="text-sm text-[#8899AA] mb-4">Accepts PDF, JPG, PNG, DOCX · Max 10MB per file</p>
                <div className="inline-flex items-center gap-2 bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-medium px-4 py-1.5 rounded-full">
                    <Sparkles size={13} />
                    AI auto-detects document type and categorizes instantly
                </div>
            </div>

            {/* Mandatory Documents */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-6">
                <div className="px-6 py-4 bg-[#0A1420] border-b border-[#1A2A3A] flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-white">Mandatory Documents</h3>
                    <span className="text-[10px] bg-[#FF4444]/10 text-[#FF4444] px-2 py-0.5 rounded-full font-medium">Required before payroll</span>
                </div>

                {docs.map((doc, i) => (
                    <div key={doc.title} className={`flex items-center justify-between px-6 py-4 ${i < docs.length - 1 ? "border-b border-[#0A1420]" : ""} ${doc.status === "scanning" ? "bg-[#0066FF]/5" : ""}`}>
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${doc.status === "ai_done" ? "bg-[#00E5A0]/10" : doc.status === "uploaded" ? "bg-[#0066FF]/10" : doc.status === "scanning" ? "bg-[#FFB800]/10" : "bg-[#1A2A3A]"}`}>
                                {doc.status === "scanning"
                                    ? <Loader2 size={18} className="text-[#FFB800] animate-spin" />
                                    : doc.status === "ai_done"
                                        ? <Sparkles size={18} className="text-[#00E5A0]" />
                                        : doc.status === "uploaded"
                                            ? <FileText size={18} className="text-[#0066FF]" />
                                            : <AlertCircle size={18} className="text-[#445566]" />
                                }
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{doc.title}</p>
                                {doc.status === "scanning" && <p className="text-[11px] text-[#FFB800] mt-0.5 flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> AI scanning document...</p>}
                                {doc.status === "ai_done" && (
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-[11px] text-[#8899AA]">{doc.file}</p>
                                        {doc.autoVerified && <span className="text-[9px] bg-[#0066FF]/10 text-[#0066FF] px-1.5 py-0.5 rounded font-medium">AI Verified</span>}
                                    </div>
                                )}
                                {doc.status === "uploaded" && <p className="text-[11px] text-[#8899AA] mt-0.5">{doc.file}</p>}
                                {doc.status === "missing" && <p className="text-[11px] text-[#FFB800] mt-0.5 flex items-center gap-1"><AlertCircle size={10} /> Pending upload</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {(doc.status === "uploaded" || doc.status === "ai_done") && (
                                <>
                                    <CheckCircle2 size={16} className={doc.status === "ai_done" ? "text-[#00E5A0]" : "text-[#0066FF]"} />
                                    <button className="text-xs text-[#0066FF] hover:underline flex items-center gap-1">
                                        <Eye size={12} /> View
                                    </button>
                                    <button onClick={() => removeDoc(i)} className="text-xs text-[#FF4444] hover:text-red-400 transition-colors">
                                        <X size={14} />
                                    </button>
                                </>
                            )}
                            {doc.status === "missing" && (
                                <div className="flex gap-2">
                                    <button className="text-xs text-[#8899AA] hover:text-white transition-colors">Request</button>
                                    <button
                                        onClick={() => simulateAIScan(i, `${doc.title.replace(/\s/g, "_")}.pdf`)}
                                        className="h-8 px-3 bg-[#1A2A3A] border border-[#1A2A3A] text-white text-xs rounded-lg hover:border-[#445566] hover:bg-[#243040] transition-all"
                                    >
                                        Upload
                                    </button>
                                </div>
                            )}
                            {doc.status === "scanning" && <RefreshCw size={14} className="text-[#FFB800] animate-spin" />}
                        </div>
                    </div>
                ))}
            </div>

            {/* Educational & Employment Docs */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-white">Educational & Employment Documents</h3>
                        <p className="text-xs text-[#8899AA] mt-1">Degrees, relieving letters, last 3 months payslips</p>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm text-[#0066FF] hover:text-blue-400 transition-colors">
                        <Plus size={14} /> Add Document
                    </button>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between pt-6 border-t border-[#1A2A3A]">
                <Link href="/employees/add/bank">
                    <button className="h-11 px-6 bg-transparent border border-[#1A2A3A] text-white text-sm rounded-lg hover:bg-[#1A2A3A] transition-colors">
                        ← Back
                    </button>
                </Link>
                <div className="flex gap-4">
                    <button className="h-11 px-6 bg-transparent text-[#8899AA] text-sm hover:text-white transition-colors">
                        Save Draft
                    </button>
                    <Link href="/employees/add/review">
                        <button className="h-11 px-8 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-lg hover:bg-[#00c98d] transition-colors">
                            Review & Submit →
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
