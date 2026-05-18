"use client";

import { Calendar, Clock, Download, FileSpreadsheet } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface ExportOption {
    entity: string;
    description: string;
    format: string;
    lastExport: string;
}

const EXPORT_OPTIONS: ExportOption[] = [
    { entity: "Employee Master", description: "Full employee directory including personal, job, and statutory details.", format: "CSV / XLSX", lastExport: "1 day ago" },
    { entity: "Payroll Register", description: "Monthly payroll details with earnings, deductions, and net pay.", format: "CSV / XLSX / PDF", lastExport: "3 days ago" },
    { entity: "Attendance Logs", description: "Raw attendance punch data with GPS coordinates and device info.", format: "CSV", lastExport: "1 week ago" },
    { entity: "Leave Transactions", description: "All leave applications, approvals, and balance adjustments.", format: "CSV / XLSX", lastExport: "2 weeks ago" },
    { entity: "Performance Reviews", description: "Review cycle data with scores, competency ratings, and feedback.", format: "XLSX", lastExport: "Never" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ExportRow({ opt }: { opt: ExportOption }) {
    return (
        <Card padding="md" className="hover:border-[#2A3A4A] transition-colors group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA] group-hover:text-indigo-400 transition-colors shrink-0">
                        <FileSpreadsheet size={20} aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm mb-1">{opt.entity}</h3>
                        <p className="text-xs text-[#8899AA] leading-relaxed mb-2">{opt.description}</p>
                        <div className="flex items-center gap-4 text-[10px] text-[#445566]">
                            <span>Format: {opt.format}</span>
                            <span className="flex items-center gap-1">
                                <Clock size={10} aria-hidden="true" /> Last: {opt.lastExport}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 shrink-0">
                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-1.5 flex items-center gap-2">
                        <Calendar size={14} className="text-[#445566]" aria-hidden="true" />
                        <select
                            className="bg-transparent text-white text-xs outline-none appearance-none cursor-pointer"
                            aria-label={`Date range for ${opt.entity} export`}
                        >
                            <option>Last 30 Days</option>
                            <option>Last 90 Days</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <Button size="sm" icon={<Download size={14} aria-hidden="true" />}>Export</Button>
                </div>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DataExportPage() {
    return (
        <Page
            title="Data Export"
            subtitle="Download structured data from any Kaarya module. All exports are encrypted and audit-logged."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Data", href: "/settings/data/import" },
                { label: "Export" },
            ]}
            maxWidth="1000px"
        >
            <div className="space-y-4">
                {EXPORT_OPTIONS.map((opt) => (
                    <ExportRow key={opt.entity} opt={opt} />
                ))}
            </div>
        </Page>
    );
}
