"use client";

import React, { useState } from "react";
import {
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    Eye,
    RefreshCw,
    XCircle,
    ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Sub-components (module-scope to avoid react-hooks/static-components) ────

interface ProofItemProps {
    title: string;
    desc: string;
    amount: string;
    status: "uploaded" | "pending" | "rejected";
    date: string;
}

const STATUS_ICON: Record<ProofItemProps["status"], React.ReactNode> = {
    uploaded: <CheckCircle2 size={20} />,
    pending: <AlertCircle size={20} />,
    rejected: <XCircle size={20} />,
};

const STATUS_ICON_CLASS: Record<ProofItemProps["status"], string> = {
    uploaded: "bg-[#00E5A0]/10 text-[#00E5A0]",
    pending: "bg-[#FFB800]/10 text-[#FFB800]",
    rejected: "bg-[#FF4444]/10 text-[#FF4444]",
};

function ProofItem({ title, desc, amount, status, date }: ProofItemProps) {
    return (
        <div className="p-4 flex items-center justify-between hover:bg-[#1A2A3A]/30 transition-colors">
            <div className="flex items-center gap-4">
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${STATUS_ICON_CLASS[status]}`}
                    aria-hidden="true"
                >
                    {STATUS_ICON[status]}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">{title}</h4>
                    <p className="text-xs text-[#8899AA] mt-0.5">{desc}</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-sm font-bold text-white">{amount}</div>
                    <div className="text-[10px] text-[#8899AA] mt-0.5">{date}</div>
                </div>

                {status === "uploaded" ? (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label="View proof"
                            icon={<Eye size={16} aria-hidden="true" />}
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label="Replace proof"
                            icon={<RefreshCw size={16} aria-hidden="true" />}
                        />
                    </div>
                ) : (
                    <Button variant="outline" size="sm">
                        Upload Now
                    </Button>
                )}
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvestmentProofUploadPage() {
    const router = useRouter();
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            simulateUpload();
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            simulateUpload();
        }
    };

    const simulateUpload = () => {
        setUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setUploading(false);
                        router.push("/tax/proofs/ocr-preview");
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <Page
            title="Investment proof upload"
            subtitle="Upload documents before January 31, 2025 for final TDS computation — FY 2024-25"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Proof upload" },
            ]}
            maxWidth="1200px"
            actions={
                <div className="flex items-center gap-4 rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] px-4 py-2">
                    <div>
                        <div className="text-xs text-[#8899AA]">Total proofs</div>
                        <div className="text-sm font-bold text-white">14 Required</div>
                    </div>
                    <div className="h-8 w-px bg-[#2A3A4A]" />
                    <div>
                        <div className="text-xs text-[#8899AA]">Status</div>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#FFB800]" aria-hidden="true" />
                            <span className="text-sm font-bold text-[#FFB800]">5 Pending</span>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Bulk Upload Zone */}
                <div
                    role="region"
                    aria-label="File upload drop zone"
                    className={`rounded-xl border-2 border-dashed p-8 transition-colors ${
                        dragActive
                            ? "border-[#00E5A0] bg-[#00E5A0]/5"
                            : "border-[#1A2A3A] bg-[#0D1928] hover:border-[#2A3A4A]"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <div
                            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2A3A]"
                            aria-hidden="true"
                        >
                            <UploadCloud size={32} className="text-[#00E5A0]" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-white">
                            Drag &amp; drop all your proof documents here
                        </h3>
                        <p className="mb-6 text-sm text-[#8899AA]">
                            Supports: PDF, JPG, PNG, ZIP (max 50 MB total, 5 MB per file)
                        </p>

                        {uploading ? (
                            <div className="w-full max-w-md space-y-3">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-white">Processing documents…</span>
                                    <span className="text-[#00E5A0]">{uploadProgress}%</span>
                                </div>
                                <div
                                    role="progressbar"
                                    aria-valuenow={uploadProgress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="Upload progress"
                                    className="h-2 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                                >
                                    <div
                                        className="relative h-full bg-[#00E5A0] transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    >
                                        <div className="absolute inset-0 animate-pulse bg-white/20" />
                                    </div>
                                </div>
                                <p className="text-xs text-[#8899AA]">
                                    AI is scanning &amp; extracting data via OCR…
                                </p>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png,.zip"
                                    className="hidden"
                                    id="bulk-upload"
                                    onChange={handleFileInput}
                                    aria-label="Select files to upload"
                                />
                                <label
                                    htmlFor="bulk-upload"
                                    className="inline-block cursor-pointer rounded-lg bg-[#1A2A3A] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#2A3A4A]"
                                >
                                    Browse files
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* 80C Section */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-5 py-4">
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm font-bold text-white">Section 80C investments</h3>
                            <Badge variant="success">₹1,50,000 limit</Badge>
                        </div>
                        <span className="text-xs text-[#8899AA]">2/3 Uploaded</span>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        <ProofItem
                            title="PPF Statement"
                            desc="State Bank PPF Account"
                            amount="₹50,000"
                            status="uploaded"
                            date="Uploaded 10/01/25"
                        />
                        <ProofItem
                            title="ELSS Statement"
                            desc="Axis Long Term Equity"
                            amount="₹38,400"
                            status="uploaded"
                            date="Uploaded 10/01/25"
                        />
                        <ProofItem
                            title="Life Insurance Premium"
                            desc="LIC Jeevan Anand"
                            amount="₹25,000"
                            status="pending"
                            date="Required"
                        />
                    </div>
                </Card>

                {/* 80D Section */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-5 py-4">
                        <h3 className="text-sm font-bold text-white">Section 80D health insurance</h3>
                        <span className="text-xs text-[#8899AA]">2/2 Uploaded</span>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        <ProofItem
                            title="Self Insurance Certificate"
                            desc="Star Health Optima"
                            amount="₹15,000"
                            status="uploaded"
                            date="Uploaded 12/01/25"
                        />
                        <ProofItem
                            title="Parents Insurance Certificate"
                            desc="HDFC Ergo Health"
                            amount="₹12,000"
                            status="uploaded"
                            date="Uploaded 12/01/25"
                        />
                    </div>
                </Card>

                {/* HRA Section */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-5 py-4">
                        <h3 className="text-sm font-bold text-white">House Rent Allowance (HRA)</h3>
                        <Badge variant="warning">Action required</Badge>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        <ProofItem
                            title="Rent Agreement"
                            desc="Apr 2024 – Mar 2025 Lease"
                            amount="—"
                            status="uploaded"
                            date="Uploaded 05/04/24"
                        />
                        <ProofItem
                            title="Rent Receipts (Q3 &amp; Q4)"
                            desc="Oct–Dec, Jan–Mar receipts pending"
                            amount="₹1,20,000"
                            status="pending"
                            date="4 months pending"
                        />
                    </div>
                </Card>

                {/* Other Deductions */}
                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-5 py-4">
                        <h3 className="text-sm font-bold text-white">Other deductions</h3>
                        <Badge variant="danger">1 Rejected</Badge>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Rejected item — custom layout */}
                        <div className="flex items-center justify-between bg-[#FF4444]/5 p-4">
                            <div className="flex items-start gap-4">
                                <div
                                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF4444]/10"
                                    aria-hidden="true"
                                >
                                    <XCircle size={20} className="text-[#FF4444]" />
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                                        80G PM Relief Fund
                                        <Badge variant="danger">Rejected</Badge>
                                    </h4>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        Amount mismatch — declared ₹10,000, receipt shows ₹8,000
                                    </p>
                                    <p className="mt-2 text-xs font-medium text-[#FF4444]">
                                        Action: Re-upload correct receipt or amend declaration
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    Amend Declaration
                                </Button>
                                <Button variant="danger" size="sm">
                                    Re-upload
                                </Button>
                            </div>
                        </div>
                        <ProofItem
                            title="80TTA Savings Interest"
                            desc="SBI Savings Account Statement"
                            amount="₹3,400"
                            status="uploaded"
                            date="Uploaded 15/01/25"
                        />
                    </div>
                </Card>

                {/* Footer Actions */}
                <div className="flex items-center justify-between border-t border-[#1A2A3A] py-4">
                    <Button variant="ghost" size="sm">
                        Download bulk upload template
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        icon={<ShieldCheck size={18} aria-hidden="true" />}
                        className="opacity-50 cursor-not-allowed"
                        aria-disabled="true"
                    >
                        Submit all proofs
                    </Button>
                </div>
            </div>
        </Page>
    );
}
