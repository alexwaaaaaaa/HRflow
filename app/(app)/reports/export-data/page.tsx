"use client";

import { Download, Key, History, ShieldAlert } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static data ──────────────────────────────────────────────────────────────

type ExtractStatus = "Completed" | "Masked";

const EXTRACT_STATUS_VARIANT: Record<ExtractStatus, "success" | "warning"> = {
    Completed: "success",
    Masked: "warning",
};

interface ExtractRow {
    id: string;
    jobId: string;
    domain: string;
    initiatedBy: string;
    size: string;
    status: ExtractStatus;
    statusLabel: string;
}

const EXTRACT_HISTORY: ExtractRow[] = [
    {
        id: "ext1",
        jobId: "ext_9982ac",
        domain: "Core Employee Master",
        initiatedBy: "admin@company.com",
        size: "24.5 MB",
        status: "Completed",
        statusLabel: "Completed (Parquet)",
    },
    {
        id: "ext2",
        jobId: "ext_8821bx",
        domain: "Payroll Journals",
        initiatedBy: "finance.head@company.com",
        size: "112.8 MB",
        status: "Masked",
        statusLabel: "Masked (CSV)",
    },
];

const EXTRACT_COLUMNS: Column<ExtractRow>[] = [
    {
        key: "jobId",
        label: "Extract Job ID",
        render: (r) => <span className="font-mono text-[#8899AA] text-xs">{r.jobId}</span>,
    },
    {
        key: "domain",
        label: "Domain",
        render: (r) => <span className="text-white">{r.domain}</span>,
        sortable: true,
        sortValue: (r) => r.domain,
    },
    {
        key: "initiatedBy",
        label: "Initiated By",
        render: (r) => <span className="text-[#8899AA] text-xs">{r.initiatedBy}</span>,
        hideOnMobile: true,
    },
    {
        key: "size",
        label: "Size",
        align: "right",
        render: (r) => <span className="text-[#8899AA] text-xs">{r.size}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => (
            <Badge variant={EXTRACT_STATUS_VARIANT[r.status]}>{r.statusLabel}</Badge>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DataExportPage() {
    return (
        <Page
            title="Secure Dump Extract"
            subtitle="Export raw system data for integration with third-party BI tools, Snowflake, or Redshift."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Data Export" },
            ]}
            maxWidth="1280px"
            actions={
                <div className="flex items-center gap-2 bg-[#1A2A3A] px-4 py-2 border border-[#2A3A4A] rounded-lg">
                    <ShieldAlert size={16} className="text-amber-500" aria-hidden="true" />
                    <span className="text-xs text-[#8899AA]">All data exports are logged for compliance.</span>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration panel */}
                <Card padding="lg" className="lg:col-span-1 border-t-4 border-t-emerald-500">
                    <h2 className="text-lg font-bold text-white mb-6">Extract Configuration</h2>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="data-domain" className="block text-sm font-medium text-[#8899AA] mb-2">
                                Data Domain
                            </label>
                            <select
                                id="data-domain"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option>Core Employee Master Data</option>
                                <option>Payroll Journals &amp; History</option>
                                <option>Attendance &amp; Shifts Log</option>
                                <option>Recruitment Funnel Data</option>
                            </select>
                        </div>

                        <fieldset>
                            <legend className="block text-sm font-medium text-[#8899AA] mb-2">Date Range</legend>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="date-from" className="sr-only">
                                        From date
                                    </label>
                                    <input
                                        id="date-from"
                                        type="date"
                                        defaultValue="2025-04-01"
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date-to" className="sr-only">
                                        To date
                                    </label>
                                    <input
                                        id="date-to"
                                        type="date"
                                        defaultValue="2026-03-31"
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <div>
                            <p className="block text-sm font-medium text-[#8899AA] mb-2">Anonymization Flag</p>
                            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="rounded text-amber-500 focus:ring-0 focus:ring-offset-0 bg-[#1A2A3A] border-[#2A3A4A]"
                                        aria-label="Mask PII data"
                                    />
                                    <span className="text-sm text-white font-medium">Mask PII Data</span>
                                </label>
                                <p className="text-[10px] text-[#8899AA] mt-2 ml-7">
                                    Names, Emails, and Phone numbers will be hashed (SHA-256) for compliance with
                                    GDPR / DPDP Act.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="output-format" className="block text-sm font-medium text-[#8899AA] mb-2">
                                Output Format
                            </label>
                            <select
                                id="output-format"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option>Parquet (Recommended for BI)</option>
                                <option>CSV (Comma Separated)</option>
                                <option>JSON Lines Format</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <Button className="w-full" icon={<Download size={18} aria-hidden="true" />}>
                                Execute Data Dump
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* API + History */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Key size={20} className="text-indigo-400" aria-hidden="true" />
                            API Access &amp; Webhooks
                        </h2>
                        <p className="text-sm text-[#8899AA] mb-4">
                            Instead of manual exports, connect your BI tools (Tableau, PowerBI, Looker) directly
                            using our REST API or establish a secure warehouse sync.
                        </p>

                        <div className="p-4 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-xs text-[#8899AA] uppercase tracking-wider font-bold mb-1">
                                    Production API Key
                                </p>
                                <div className="font-mono text-white text-sm">sk_live_hR9vXm*************Kq2</div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm">
                                    Copy Key
                                </Button>
                                <Button variant="danger" size="sm">
                                    Revoke
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <Button variant="ghost" size="sm" className="text-indigo-400">
                                View API Documentation →
                            </Button>
                            <Button variant="ghost" size="sm" className="text-emerald-400">
                                Setup Snowflake Sync →
                            </Button>
                        </div>
                    </Card>

                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-2">
                            <History size={18} className="text-[#8899AA]" aria-hidden="true" />
                            <h2 className="text-lg font-bold text-white">Recent Extract History</h2>
                        </div>
                        <DataTable<ExtractRow>
                            data={EXTRACT_HISTORY}
                            columns={EXTRACT_COLUMNS}
                            rowKey={(r) => r.id}
                            emptyTitle="No extracts yet"
                            emptyDescription="Run your first data dump to see history here."
                            aria-label="Recent extract history"
                        />
                    </Card>
                </div>
            </div>
        </Page>
    );
}
