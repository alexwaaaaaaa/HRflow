"use client";

import { Download, FileText, UploadCloud } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static data ──────────────────────────────────────────────────────────────

type ReadinessStatus = "Ready" | "Missing";

const STATUS_VARIANT: Record<ReadinessStatus, "success" | "warning"> = {
    Ready: "success",
    Missing: "warning",
};

interface BRSRRow {
    id: string;
    principle: string;
    dataPoints: string[];
    status: ReadinessStatus;
    statusLabel: string;
    actionLabel: string;
}

const BRSR_ROWS: BRSRRow[] = [
    {
        id: "p3",
        principle: "Principle 3: Employee Well-being",
        dataPoints: [
            "Gender & Differently Abled Breakdown",
            "Minimum Wage & Median Remuneration",
            "Leave & Maternity/Paternity Benefits",
        ],
        status: "Ready",
        statusLabel: "100% Ready",
        actionLabel: "Review Data",
    },
    {
        id: "p5",
        principle: "Principle 5: Human Rights",
        dataPoints: [
            "POSH Complaints & Resolutions",
            "Employees paid min. wage",
            "Human Rights Training Coverage",
        ],
        status: "Missing",
        statusLabel: "Data Missing (Trg)",
        actionLabel: "Add Data",
    },
    {
        id: "p8",
        principle: "Principle 8: Inclusive Growth",
        dataPoints: ["CSR Job Creation Initiatives", "Vulnerable/Marginalized Hires"],
        status: "Ready",
        statusLabel: "100% Ready",
        actionLabel: "Review Data",
    },
];

const BRSR_COLUMNS: Column<BRSRRow>[] = [
    {
        key: "principle",
        label: "Principle",
        render: (r) => <span className="font-bold text-white">{r.principle}</span>,
    },
    {
        key: "dataPoints",
        label: "Data Points Auto-Mapped",
        render: (r) => (
            <ul className="list-disc list-inside space-y-1 text-xs text-[#8899AA]">
                {r.dataPoints.map((dp) => (
                    <li key={dp}>{dp}</li>
                ))}
            </ul>
        ),
        hideOnMobile: true,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.statusLabel}</Badge>,
    },
    {
        key: "action",
        label: "",
        align: "right",
        render: (r) => (
            <Button variant="ghost" size="sm">
                {r.actionLabel}
            </Button>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BRSRReportPage() {
    return (
        <Page
            title="Business Responsibility & Sustainability Report"
            subtitle="SEBI prescribed format mapping ESG data points across HR modules."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "BRSR Reporting" },
            ]}
            maxWidth="1280px"
            actions={
                <>






                    <Button
                        variant="secondary"
                        icon={<UploadCloud size={14} aria-hidden="true" />}
                    >
                        Import External Data
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>
                        Generate SEBI XBRL
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg" className="border-emerald-500/30">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Data Readiness Score</p>
                        <p className="text-4xl font-black text-emerald-400 mb-1">92%</p>
                        <p className="text-xs text-[#8899AA]">Ready for FY25-26 Disclosure</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm mb-2">Gender Diversity (Board)</p>
                        <p className="text-3xl font-bold text-white mb-1">33%</p>
                        <p className="text-xs text-emerald-400">Above mandated 20%</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm mb-2">POSH Complaints</p>
                        <p className="text-3xl font-bold text-amber-500 mb-1">2</p>
                        <p className="text-xs text-[#8899AA]">1 resolved, 1 under investigation</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm mb-2">Training (Safety/Skill)</p>
                        <p className="text-3xl font-bold text-indigo-400 mb-1">98%</p>
                        <p className="text-xs text-[#8899AA]">Coverage of permanent workforce</p>
                    </Card>
                </div>

                {/* Principle mapping table */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center">
                        <h2 className="text-sm font-bold text-white">BRSR Principle-wise Data Mapping</h2>
                        <Badge variant="info">FY 2025-26</Badge>
                    </div>
                    <DataTable<BRSRRow>
                        data={BRSR_ROWS}
                        columns={BRSR_COLUMNS}
                        rowKey={(r) => r.id}
                        emptyTitle="No principles mapped"
                        aria-label="BRSR principle data mapping"
                    />
                </Card>

                {/* Info footer */}
                <Card padding="lg">
                    <div className="flex items-start gap-4">
                        <FileText size={32} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                        <div>
                            <h3 className="text-white font-bold mb-1">About BRSR Mapping</h3>
                            <p className="text-sm text-[#8899AA]">
                                HRflow automatically aggregates data points required for the National Guidelines on
                                Responsible Business Conduct (NGRBC) directly from your live payroll, recruitment, and
                                attendance data, minimizing manual data entry errors for the Top 1000 listed entities.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        

        

        

        </Page>
    );
}
