"use client";

import { Plus, ShieldAlert, AlertTriangle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface Band {
    id: string;
    name: string;
    roles: string;
    min: number;
    max: number;
    mid: number;
    count: number;
    alert: number;
}

const BANDS: Band[] = [
    { id: "BND-L1", name: "Entry Level (L1)", roles: "Associate, Junior Engineer", min: 300000, max: 600000, mid: 450000, count: 245, alert: 12 },
    { id: "BND-L2", name: "Mid Level (L2)", roles: "Engineer, Specialist", min: 600000, max: 1200000, mid: 900000, count: 320, alert: 5 },
    { id: "BND-L3", name: "Senior Level (L3)", roles: "Senior Engineer, Manager", min: 1200000, max: 2400000, mid: 1800000, count: 180, alert: 0 },
    { id: "BND-L4", name: "Leadership (L4)", roles: "Director, VP", min: 2400000, max: 5000000, mid: 3700000, count: 42, alert: 2 },
];

const COLUMNS: Column<Band>[] = [
    {
        key: "band",
        label: "Band Details",
        render: (b) => (
            <div>
                <div className="text-sm font-semibold text-white mb-1">{b.name}</div>
                <div className="text-xs text-[#8899AA]">Mapped Roles: {b.roles}</div>
            </div>
        ),
        sortable: true,
        sortValue: (b) => b.name,
    },
    {
        key: "range",
        label: "Pay Range (Min - Max)",
        render: (b) => (
            <div className="flex items-center gap-3">
                <span className="text-xs text-[#c8d8e8] w-12">{(b.min / 100000).toFixed(1)}L</span>
                <div
                    className="h-1.5 w-24 bg-[#1A2A3A] rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Pay range: ₹${(b.min / 100000).toFixed(1)}L to ₹${(b.max / 100000).toFixed(1)}L`}
                >
                    <div className="h-full bg-[#00E5A0] rounded-full w-full" />
                </div>
                <span className="text-xs text-[#c8d8e8] w-12 text-right">{(b.max / 100000).toFixed(1)}L</span>
            </div>
        ),
    },
    {
        key: "mid",
        label: "Mid-Point",
        align: "center",
        render: (b) => <span className="text-sm font-semibold text-white">₹{(b.mid / 100000).toFixed(2)}L</span>,
        sortable: true,
        sortValue: (b) => b.mid,
    },
    {
        key: "count",
        label: "Headcount",
        align: "center",
        render: (b) => <span className="text-sm text-[#c8d8e8]">{b.count}</span>,
        sortable: true,
        sortValue: (b) => b.count,
    },
    {
        key: "anomalies",
        label: "Anomalies",
        align: "right",
        render: (b) =>
            b.alert > 0 ? (
                <Badge variant="danger">
                    <AlertTriangle size={11} className="mr-1" aria-hidden="true" />
                    {b.alert} Outside
                </Badge>
            ) : (
                <span className="text-xs text-[#8899AA]">None</span>
            ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: () => (
            <Button variant="secondary" size="sm">Edit Band</Button>
        ),
    },
];

export default function SalaryBandSetup() {
    return (
        <Page
            title="Salary Bands & Pay Ranges"
            subtitle="Define CTC guardrails by grade or designation to maintain internal parity."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Bands" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>Create New Band</Button>
            }
        >
            {/* KPI Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card padding="md">
                    <div className="text-xs text-[#8899AA] mb-2">Total Active Bands</div>
                    <div className="text-2xl font-bold text-white">6</div>
                </Card>
                <Card padding="md">
                    <div className="text-xs text-[#8899AA] mb-2">Employees Mapped to Bands</div>
                    <div className="text-2xl font-bold text-[#00E5A0]">100%</div>
                </Card>
                <Card padding="md" className="border-dashed border-[#FF4444]/30 bg-[#FF4444]/5">
                    <div className="flex gap-2 items-center mb-2">
                        <ShieldAlert size={14} className="text-[#FF4444]" aria-hidden="true" />
                        <div className="text-xs text-[#8899AA]">Out of Band Anomalies</div>
                    </div>
                    <div className="text-2xl font-bold text-[#FF4444] flex items-center gap-3">
                        19
                        <button
                            type="button"
                            className="text-xs font-medium px-2 py-1 bg-[#FF4444]/10 rounded-md hover:bg-[#FF4444]/20 transition-colors"
                        >
                            View Details
                        </button>
                    </div>
                </Card>
            </div>

            {/* Bands Table */}
            <Card padding="none">
                <DataTable<Band>
                    data={BANDS}
                    columns={COLUMNS}
                    rowKey={(b) => b.id}
                    searchable
                    searchPlaceholder="Search bands or roles..."
                    aria-label="Salary bands and pay ranges"
                />
            </Card>
        </Page>
    );
}
