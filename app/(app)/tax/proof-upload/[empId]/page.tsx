"use client";

import React from "react";
import { UploadCloud, FileText } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ── Types ─────────────────────────────────────────────────────────────────────
type ProofStatus = "Uploaded" | "Pending" | "Rejected" | "Approved";

interface ProofItem {
    id: string;
    section: string;
    name: string;
    declared: string;
    status: ProofStatus;
    file: string | null;
    reason?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const REQUIRED_PROOFS: ProofItem[] = [
    { id: "p1", section: "80C", name: "PPF Contribution", declared: "₹50,000", status: "Uploaded", file: "ppf_statement_24_25.pdf" },
    { id: "p2", section: "80C", name: "LIC Premium", declared: "₹30,000", status: "Pending", file: null },
    { id: "p3", section: "HRA", name: "Rent Receipts (Apr-Sep)", declared: "₹1,50,000", status: "Rejected", file: "rent_apr_sep.pdf", reason: "Signature missing on receipt #3" },
    { id: "p4", section: "80D", name: "Health Insurance Premium", declared: "₹18,000", status: "Approved", file: "health_ins_star.pdf" },
    { id: "p5", section: "80CCD(1B)", name: "NPS Tier 1", declared: "₹50,000", status: "Pending", file: null },
];

const STATUS_VARIANT: Record<ProofStatus, "info" | "warning" | "danger" | "success"> = {
    Uploaded: "info",
    Pending: "warning",
    Rejected: "danger",
    Approved: "success",
};

const COLUMNS: Column<ProofItem>[] = [
    {
        key: "section",
        label: "Section / Category",
        render: (proof) => (
            <div>
                <p className="text-sm font-medium text-white mb-1">{proof.name}</p>
                <Badge variant="info">{proof.section}</Badge>
            </div>
        ),
    },
    {
        key: "declared",
        label: "Declared Amount",
        render: (proof) => <span className="text-sm font-medium text-white">{proof.declared}</span>,
    },
    {
        key: "file",
        label: "Proof Document",
        render: (proof) =>
            proof.file ? (
                <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                    <FileText size={16} className="text-[#0066FF]" aria-hidden="true" />
                    {proof.file}
                </div>
            ) : (
                <span className="text-sm text-[#445566] italic">No file uploaded</span>
            ),
    },
    {
        key: "status",
        label: "Status",
        render: (proof) => (
            <div>
                <Badge variant={STATUS_VARIANT[proof.status]}>
                    {proof.status === "Uploaded" ? "Uploaded (In Review)" : proof.status}
                </Badge>
                {proof.reason && (
                    <p className="text-xs text-red-400 mt-1 max-w-[150px]">{proof.reason}</p>
                )}
            </div>
        ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (proof) =>
            proof.status === "Pending" || proof.status === "Rejected" ? (
                <Button size="sm" icon={<UploadCloud size={14} />} href={`/tax/ocr-preview/${proof.id}`}>Upload</Button>
            ) : (
                <Button variant="secondary" size="sm">View</Button>
            ),
    },
];

export default function ProofUpload() {
    return (
        <Page
            title="Investment Proof Submission"
            subtitle="Upload documents to support your FY 2024-25 tax declarations"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Proof Upload" },
            ]}
            maxWidth="1000px"
        >
            <div className="space-y-6">
                {/* Deadline Banner */}
                <Card padding="md" className="flex justify-between items-center">
                    <div>
                        <p className="text-sm font-semibold text-white mb-1">
                            Submission Deadline: <span className="text-red-400">31 Jan 2025</span>
                        </p>
                        <p className="text-sm text-[#8899AA]">
                            Failure to submit proofs will result in higher TDS deduction in Mar 2025.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <p className="text-xs text-[#8899AA] mb-1">Total Required</p>
                            <p className="text-lg font-semibold text-white">5</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#8899AA] mb-1">Uploaded</p>
                            <p className="text-lg font-semibold text-[#00E5A0]">1</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#8899AA] mb-1">Pending</p>
                            <p className="text-lg font-semibold text-[#FFB800]">4</p>
                        </div>
                    </div>
                </Card>

                {/* Table */}
                <Card padding="none">
                    <DataTable<ProofItem>
                        data={REQUIRED_PROOFS}
                        columns={COLUMNS}
                        rowKey={(proof) => proof.id}
                        aria-label="Investment Proof Submissions"
                        emptyTitle="No proofs required"
                    />
                </Card>
            </div>
        </Page>
    );
}
