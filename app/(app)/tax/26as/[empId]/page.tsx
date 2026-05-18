"use client";

import React from "react";
import { RefreshCw, ShieldCheck, ExternalLink, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface TdsEntry {
    id: string;
    deductor: string;
    tan: string;
    amountPaid: string;
    taxDeducted: string;
    taxDeposited: string;
}

const TDS_ENTRIES: TdsEntry[] = [
    { id: "1", deductor: "Kaarya Technologies Pvt Ltd", tan: "MUMK12345E", amountPaid: "₹7,00,000", taxDeducted: "₹52,468", taxDeposited: "₹52,468" },
    { id: "2", deductor: "State Bank of India (FD Interest)", tan: "MUMS98765A", amountPaid: "₹45,000", taxDeducted: "₹4,500", taxDeposited: "₹4,500" },
];

const COLUMNS: Column<TdsEntry>[] = [
    { key: "deductor", label: "Name of Deductor", render: (r) => <span className="text-sm font-medium text-white">{r.deductor}</span>, sortable: true, sortValue: (r) => r.deductor },
    { key: "tan", label: "TAN of Deductor", render: (r) => <span className="text-sm text-[#8899AA]">{r.tan}</span> },
    { key: "amountPaid", label: "Total Amount Paid", align: "right", render: (r) => <span className="text-sm text-white">{r.amountPaid}</span> },
    { key: "taxDeducted", label: "Total Tax Deducted", align: "right", render: (r) => <span className="text-sm text-[#FFB800]">{r.taxDeducted}</span> },
    { key: "taxDeposited", label: "Total Tax Deposited", align: "right", render: (r) => <span className="text-sm font-semibold text-[#00E5A0]">{r.taxDeposited}</span> },
];

export default function Form26AS() {
    return (
        <Page
            title="Form 26AS Synopsis"
            subtitle="Rahul Sharma (EMP-0848) • FY 2024-25"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Form 26AS" },
            ]}
            maxWidth="1000px"
            actions={
                <Button variant="secondary" icon={<RefreshCw size={14} />}>
                    Sync from TRACES
                </Button>
            }
        >
            <div className="space-y-6">
                <Card padding="md" className="border border-[#00E5A0]/20 bg-[#00E5A0]/5">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={24} className="text-[#00E5A0] shrink-0" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-semibold text-white mb-1">TDS Matches Deposited Amount</p>
                            <p className="text-sm text-[#00E5A0]">100% of the TDS deducted by Kaarya has been successfully reflected in your Form 26AS.</p>
                        </div>
                    </div>
                </Card>

                <Card padding="none">
                    <div className="px-6 py-4 border-b border-[#1A2A3A]">
                        <h3 className="text-base font-semibold text-white">Part A: Details of Tax Deducted at Source</h3>
                    </div>
                    <DataTable<TdsEntry>
                        data={TDS_ENTRIES}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="Form 26AS TDS Details"
                        emptyTitle="No TDS entries found"
                    />
                </Card>

                <div className="flex items-start gap-3 text-sm text-[#8899AA]">
                    <Info size={16} className="shrink-0 mt-0.5 text-[#8899AA]" aria-hidden="true" />
                    <span>
                        This is a synthesized synopsis for your convenience. For official tax filing purposes, please download the actual Form 26AS/AIS from the Income Tax e-Filing portal.{" "}
                        <a href="https://eportal.incometax.gov.in/" target="_blank" rel="noreferrer" className="text-[#0066FF] hover:underline inline-flex items-center gap-1">
                            Visit IT Portal <ExternalLink size={12} />
                        </a>
                    </span>
                </div>
            </div>
        </Page>
    );
}
