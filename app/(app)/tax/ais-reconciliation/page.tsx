"use client";

import React, { useState } from "react";
import { AlertTriangle, RefreshCw, Download, FileText, CheckCircle2, Info, ShieldAlert, BadgeInfo } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface MismatchRow {
    id: string;
    name: string;
    pan: string;
    panInvalid?: boolean;
    isNew?: boolean;
    hrflowGross: string;
    hrflowTds: string;
    aisGross?: string;
    aisTds?: string;
    diff?: string;
    diffVariant?: "danger";
    noRecord?: boolean;
    action: string;
}

const MISMATCHES: MismatchRow[] = [
    { id: "1", name: "Vikram Singh", pan: "AVXPS9876K", hrflowGross: "₹4,50,000", hrflowTds: "₹45,000", aisGross: "₹4,50,000", aisTds: "₹42,500", diff: "-₹2,500", diffVariant: "danger", action: "Investigate" },
    { id: "2", name: "Sneha Gupta", pan: "SNEHG123X", panInvalid: true, isNew: true, hrflowGross: "₹1,20,000", hrflowTds: "₹12,000", noRecord: true, action: "Verify PAN" },
];

const COLUMNS: Column<MismatchRow>[] = [
    {
        key: "employee",
        label: "Employee Details",
        render: (r) => (
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    {r.isNew && <Badge variant="warning">NEW EMP</Badge>}
                </div>
                <p className={`text-xs font-mono ${r.panInvalid ? "text-[#FF4444]" : "text-[#8899AA]"}`}>PAN: {r.pan}</p>
            </div>
        ),
    },
    {
        key: "hrflow",
        label: "HRFlow TDS Booked",
        render: (r) => (
            <div>
                <p className="text-sm text-white">{r.hrflowGross} <span className="text-xs text-[#8899AA]">Gross</span></p>
                <p className="text-sm font-semibold text-[#FFB800]">{r.hrflowTds} <span className="text-xs text-[#8899AA]">TDS</span></p>
            </div>
        ),
    },
    {
        key: "ais",
        label: "AIS Portal Data",
        render: (r) => r.noRecord ? (
            <div className="flex items-center gap-1.5 text-xs text-[#FFB800] font-semibold">
                <BadgeInfo size={14} aria-hidden="true" /> No records found on TRACES for this PAN.
            </div>
        ) : (
            <div>
                <p className="text-sm text-[#8899AA]">{r.aisGross} <span className="text-xs">Gross</span></p>
                <p className="text-sm text-[#c8d8e8]">{r.aisTds} <span className="text-xs">TDS</span></p>
            </div>
        ),
    },
    {
        key: "diff",
        label: "Diff",
        render: (r) => r.diff ? (
            <Badge variant="danger">{r.diff}</Badge>
        ) : (
            <span className="text-xs text-[#8899AA] font-semibold">N/A</span>
        ),
    },
    {
        key: "action",
        label: "Action",
        align: "right",
        render: (r) => (
            <Button variant="secondary" size="sm">{r.action}</Button>
        ),
    },
];

export default function AISReconciliationScreen() {
    const [isReconciling, setIsReconciling] = useState(false);

    const handleReconcile = () => {
        setIsReconciling(true);
        setTimeout(() => setIsReconciling(false), 2500);
    };

    return (
        <Page
            title="AIS Reconciliation"
            subtitle="Match HRFlow TDS records with Income Tax Dept AIS portal data to catch discrepancies before filing."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "AIS Reconciliation" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={16} />}>Export Mismatch Report</Button>
                    <Button
                        onClick={handleReconcile}
                        disabled={isReconciling}
                        isLoading={isReconciling}
                        loadingText="Fetching Data..."
                        icon={<RefreshCw size={16} />}
                    >
                        Run Auto-Recon (TRACES API)
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#8899AA] font-semibold mb-1 uppercase tracking-wider">Total PANs Checked</p>
                            <p className="text-2xl font-black text-white">405 / 412</p>
                        </div>
                        <FileText size={24} className="text-[#8899AA] opacity-50" aria-hidden="true" />
                    </Card>
                    <Card padding="md" className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#00E5A0] font-semibold mb-1 uppercase tracking-wider">Perfect Match</p>
                            <p className="text-2xl font-black text-[#00E5A0]">382</p>
                        </div>
                        <CheckCircle2 size={24} className="text-[#00E5A0] opacity-50" aria-hidden="true" />
                    </Card>
                    <Card padding="md" className="bg-[#FF4444]/5 border border-[#FF4444]/20 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#FF4444] font-semibold mb-1 uppercase tracking-wider">Mismatches Found</p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-black text-[#FF4444]">14</p>
                                <Badge variant="danger">Action Req</Badge>
                            </div>
                        </div>
                        <AlertTriangle size={24} className="text-[#FF4444] opacity-50" aria-hidden="true" />
                    </Card>
                    <Card padding="md" className="bg-[#FFB800]/5 border border-[#FFB800]/20 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#FFB800] font-semibold mb-1 uppercase tracking-wider">Invalid / Unverified PANs</p>
                            <p className="text-2xl font-black text-[#FFB800]">9</p>
                        </div>
                        <ShieldAlert size={24} className="text-[#FFB800] opacity-50" aria-hidden="true" />
                    </Card>
                </div>

                {/* Discrepancy Queue */}
                <Card padding="none">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <AlertTriangle size={16} className="text-[#FF4444]" aria-hidden="true" /> Discrepancy Queue
                        </h3>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm">All Issues</Button>
                            <Button variant="ghost" size="sm">TDS Mismatch</Button>
                            <Button variant="ghost" size="sm">PAN Errors</Button>
                        </div>
                    </div>
                    <DataTable<MismatchRow>
                        data={MISMATCHES}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="AIS Discrepancy Queue"
                        emptyTitle="No discrepancies found"
                        emptyDescription="All PANs match the AIS portal data"
                    />
                </Card>

                {/* Info */}
                <Card padding="md" className="flex items-start gap-3">
                    <Info size={18} className="text-[#0066FF] mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="text-sm text-[#8899AA]">
                        <strong className="text-white">Why rely on this?</strong> Any mismatch between HRFlow and TRACES AIS can lead to Form 16s generating with wrong amounts, triggering IT notices for employees. Always clear this queue before doing bulk Form 16 generation.
                    </p>
                </Card>
            </div>
        </Page>
    );
}
