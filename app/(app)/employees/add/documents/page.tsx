"use client";

import Page from "@/components/ui/Page";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  X,
  Eye,
  Sparkles,
  Loader2,
  RefreshCw,
  Plus,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type DocStatus = "missing" | "uploaded" | "scanning" | "ai_done";

interface DocItem {
  title: string;
  status: DocStatus;
  file?: string;
  detectedAs?: string;
  autoVerified?: boolean;
}

const MANDATORY_DOCS_INITIAL: DocItem[] = [
  {
    title: "PAN Card",
    status: "ai_done",
    file: "PAN_Rahul_S.pdf",
    detectedAs: "PAN Card",
    autoVerified: true,
  },
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
  const uploadedCount = docs.filter(
    (d) => d.status === "uploaded" || d.status === "ai_done"
  ).length;
  const totalCount = docs.length;

  function simulateAIScan(idx: number, filename: string) {
    setDocs((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, status: "scanning", file: filename } : d))
    );
    setTimeout(() => {
      setDocs((prev) =>
        prev.map((d, i) =>
          i === idx
            ? {
                ...d,
                status: "ai_done",
                detectedAs: d.title,
                autoVerified: true,
              }
            : d
        )
      );
    }, 2200);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const missingIdx = docs.findIndex((d) => d.status === "missing");
    if (missingIdx !== -1) simulateAIScan(missingIdx, file.name);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const missingIdx = docs.findIndex((d) => d.status === "missing");
    if (missingIdx !== -1) simulateAIScan(missingIdx, file.name);
  }

  function removeDoc(idx: number) {
    setDocs((prev) =>
      prev.map((d, i) =>
        i === idx
          ? { ...d, status: "missing", file: undefined, detectedAs: undefined, autoVerified: false }
          : d
      )
    );
  }

  const completeness = Math.round((uploadedCount / totalCount) * 100);

  return (
        <Page
      title="Add New Employee"
      subtitle="Complete all steps to onboard a new team member."
      breadcrumbs={[
        { label: "Employees", href: "/employees" },
        { label: "Add", href: "/employees/add" },
        { label: "Documents" },
      ]}
      maxWidth="1200px"
    >






      <div className="mx-auto max-w-[720px] px-6 py-8">
        {/* Back */}
        <Link
          href="/employees"
          className="mb-5 inline-flex items-center gap-2 text-sm text-[#8899AA] no-underline transition-colors hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Employees
        </Link>
        <h1 className="mb-1 text-2xl font-bold text-white">Add New Employee</h1>
        <p className="mb-8 text-sm text-[#8899AA]">
          Complete all steps to onboard a new team member.
        </p>
        {/* Step Progress */}
        <div className="mb-12 flex items-center">
          {STEPS.map((step, i, arr) => (
            <div
              key={step.num}
              className="flex items-center"
              style={{ flex: i < arr.length - 1 ? 1 : "initial" }}
            >
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold ${step.status === "completed" ? "bg-[#00E5A0] text-[#060B14]" : step.status === "active" ? "bg-[#0066FF] text-white ring-4 ring-[#0066FF]/20" : "bg-[#1A2A3A] text-[#445566]"}`}
                >
                  {step.status === "completed" ? <Check size={14} /> : step.num}
                </div>
                <span
                  className={`absolute top-10 text-[11px] font-medium whitespace-nowrap ${step.status === "pending" ? "text-[#445566]" : "text-white"}`}
                >
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  className={`mx-3 mt-[-16px] h-0.5 flex-1 ${step.status === "completed" ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}
                />
              )}
            </div>
          ))}
        </div>
        {/* Completeness banner */}
        <Card className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-white">Document Completeness</span>
            <span
              className={`text-sm font-bold ${completeness === 100 ? "text-[#00E5A0]" : completeness >= 60 ? "text-[#FFB800]" : "text-[#FF4444]"}`}
            >
              {completeness}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#1A2A3A]">
            <div
              className={`h-2 rounded-full transition-all duration-700 ${completeness === 100 ? "bg-[#00E5A0]" : completeness >= 60 ? "bg-[#FFB800]" : "bg-[#FF4444]"}`}
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-[#8899AA]">
            {uploadedCount} of {totalCount} mandatory documents uploaded{" "}
            {completeness < 100 && "— you can complete this later"}
          </p>
        </Card>
        {/* AI Drop Zone */}
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          className="hidden"
          onChange={handleFileInput}
          id="page-119"
          aria-label="page-119"
        />
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`mb-6 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${dragOver ? "scale-[1.01] border-[#00E5A0] bg-[#00E5A0]/5" : "border-[#1A2A3A] hover:border-[#0066FF]/50 hover:bg-[#0066FF]/5"}`}
        >
          <UploadCloud
            size={40}
            className={`mx-auto mb-4 ${dragOver ? "text-[#00E5A0]" : "text-[#445566]"}`}
          />
          <h3 className="mb-2 text-lg font-semibold text-white">
            Drop files here or click to browse
          </h3>
          <p className="mb-4 text-sm text-[#8899AA]">
            Accepts PDF, JPG, PNG, DOCX · Max 10MB per file
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-xs font-medium text-[#00E5A0]">
            <Sparkles size={13} />
            AI auto-detects document type and categorizes instantly
          </div>
        </div>
        {/* Mandatory Documents */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-[#1A2A3A] bg-[#0D1928]">
          <div className="flex items-center gap-3 border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-4">
            <h3 className="text-sm font-semibold text-white">Mandatory Documents</h3>
            <span className="rounded-full bg-[#FF4444]/10 px-2 py-0.5 text-[10px] font-medium text-[#FF4444]">
              Required before payroll
            </span>
          </div>

          {docs.map((doc, i) => (
            <div
              key={doc.title}
              className={`flex items-center justify-between px-6 py-4 ${i < docs.length - 1 ? "border-b border-[#0A1420]" : ""} ${doc.status === "scanning" ? "bg-[#0066FF]/5" : ""}`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${doc.status === "ai_done" ? "bg-[#00E5A0]/10" : doc.status === "uploaded" ? "bg-[#0066FF]/10" : doc.status === "scanning" ? "bg-[#FFB800]/10" : "bg-[#1A2A3A]"}`}
                >
                  {doc.status === "scanning" ? (
                    <Loader2 size={18} className="animate-spin text-[#FFB800]" />
                  ) : doc.status === "ai_done" ? (
                    <Sparkles size={18} className="text-[#00E5A0]" />
                  ) : doc.status === "uploaded" ? (
                    <FileText size={18} className="text-[#0066FF]" />
                  ) : (
                    <AlertCircle size={18} className="text-[#445566]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{doc.title}</p>
                  {doc.status === "scanning" && (
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#FFB800]">
                      <Loader2 size={10} className="animate-spin" /> AI scanning document...
                    </p>
                  )}
                  {doc.status === "ai_done" && (
                    <div className="mt-0.5 flex items-center gap-2">
                      <p className="text-[11px] text-[#8899AA]">{doc.file}</p>
                      {doc.autoVerified && (
                        <span className="rounded bg-[#0066FF]/10 px-1.5 py-0.5 text-[9px] font-medium text-[#0066FF]">
                          AI Verified
                        </span>
                      )}
                    </div>
                  )}
                  {doc.status === "uploaded" && (
                    <p className="mt-0.5 text-[11px] text-[#8899AA]">{doc.file}</p>
                  )}
                  {doc.status === "missing" && (
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#FFB800]">
                      <AlertCircle size={10} /> Pending upload
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {(doc.status === "uploaded" || doc.status === "ai_done") && (
                  <>
                    <CheckCircle2
                      size={16}
                      className={doc.status === "ai_done" ? "text-[#00E5A0]" : "text-[#0066FF]"}
                    />
                    
                    <button className="flex items-center gap-1 text-xs text-[#0066FF] hover:underline">
                      <Eye size={12} /> View
                    </button>
                    <Button variant="danger" onClick={() => removeDoc(i)}>
                      <X size={14} />
                    </Button>
                  </>
                )}
                {doc.status === "missing" && (
                  <div className="flex gap-2">
                    
                    <button className="text-xs text-[#8899AA] transition-colors hover:text-white">
                      Request
                    </button>
                    
                    <button
                      onClick={() => simulateAIScan(i, `${doc.title.replace(/\s/g, "_")}.pdf`)}
                      className="h-8 rounded-lg border border-[#1A2A3A] bg-[#1A2A3A] px-3 text-xs text-white transition-all hover:border-[#445566] hover:bg-[#243040]"
                    >
                      Upload
                    </button>
                  </div>
                )}
                {doc.status === "scanning" && (
                  <RefreshCw size={14} className="animate-spin text-[#FFB800]" />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Educational & Employment Docs */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Educational & Employment Documents
              </h3>
              <p className="mt-1 text-xs text-[#8899AA]">
                Degrees, relieving letters, last 3 months payslips
              </p>
            </div>
            
            <button className="flex items-center gap-1.5 text-sm text-[#0066FF] transition-colors hover:text-blue-400">
              <Plus size={14} /> Add Document
            </button>
          </div>
        </Card>
        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-6">
          <Link href="/employees/add/bank">
            <Button variant="outline" size="lg">
              ← Back
            </Button>
          </Link>
          <div className="flex gap-4">
            
            <button className="h-11 bg-transparent px-6 text-sm text-[#8899AA] transition-colors hover:text-white">
              Save Draft
            </button>
            <Link href="/employees/add/review">
              <Button variant="primary" size="lg">
                Review & Submit →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    

        

        

        </Page>
    );
}
