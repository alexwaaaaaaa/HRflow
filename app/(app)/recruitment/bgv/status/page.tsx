"use client";

import { useState } from "react";
import { Download, ExternalLink, RefreshCw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

type BGVStatus = "Cleared" | "Discrepancy" | "In Progress";

interface BGVRecord {
    id: string;
    name: string;
    role: string;
    ref: string;
    vendor: string;
    initiated: string;
    checks: Array<"clear" | "discrepancy" | "in-progress" | "pending">;
    status: BGVStatus;
}

const STATUS_VARIANT: Record<BGVStatus, "success" | "danger" | "warning"> = {
    Cleared: "success",
    Discrepancy: "danger",
    "In Progress": "warning",
};

const BGV_RECORDS: BGVRecord[] = [
    {
        id: "AB-88902-IN",
        name: "Vikram Reddy",
        role: "Account Executive",
        ref: "AB-88902-IN",
        vendor: "AuthBridge Solutions",
        initiated: "01 Mar 2025",
        checks: ["clear", "discrepancy", "clear", "pending"],
        status: "Discrepancy",
    },
    {
        id: "FA-441-2025",
        name: "Neha Gupta",
        role: "HR Business Partner",
        ref: "FA-441-2025",
        vendor: "FirstAdvantage",
        initiated: "10 Mar 2025",
        checks: ["clear", "in-progress", "pending", "pending"],
        status: "In Progress",
    },
    {
        id: "AB-99211-IN",
        name: "Amit Patel",
        role: "Backend Engineer (Go)",
        ref: "AB-99211-IN",
        vendor: "AuthBridge Solutions",
        initiated: "28 Feb 2025",
        checks: ["clear", "clear", "clear", "clear"],
        status: "Cleared",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

const CHECK_COLORS: Record<string, string> = {
    clear: "bg-[#00E5A0]",
    discrepancy: "bg-[#FF4444]",
    "in-progress": "bg-[#FFB800] animate-pulse",
    pending: "bg-[#1A2A3A]",
};

const CHECK_LABELS: Record<string, string> = {
    clear: "Clear",
    discrepancy: "Discrepancy Found",
    "in-progress": "In Progress",
    pending: "Pending",
};

function ChecksCell({ row }: { row: BGVRecord }) {
    return (
        <div className="flex items-center justify-center gap-1.5">
            {row.checks.map((c, i) => (
                <div
                    key={i}
                    className={`h-4 w-4 rounded-full ${CHECK_COLORS[c]}`}
                    title={CHECK_LABELS[c]}
                    aria-label={CHECK_LABELS[c]}
                />
            ))}
        </div>
    );
}

function ActionsCell({ row }: { row: BGVRecord }) {
    if (row.status === "Discrepancy") {
        return (
            <div className="flex justify-end">
                <Button variant="danger" size="sm">View Details</Button>
            </div>
        );
    }
    if (row.status === "Cleared") {
        return (
            <div className="flex justify-end">
                <Button variant="secondary" size="sm" icon={<Download size={12} aria-hidden="true" />}>
                    Report PDF
                </Button>
            </div>
        );
    }
    return (
        <div className="flex justify-end">
            <Button
                variant="ghost"
                size="sm"
                icon={<ExternalLink size={14} aria-hidden="true" />}
                aria-label="Open vendor portal"
            />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<BGVRecord>[] = [
    {
        key: "candidate",
        label: "Candidate & Role",
        render: (r) => (
            <div>
                <p className="font-bold text-white">{r.name}</p>
                <p className="text-[10px] text-[#8899AA]">{r.role}</p>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "ref",
        label: "BGV Ref / Vendor",
        render: (r) => (
            <div>
                <p className="font-mono text-xs text-white">{r.ref}</p>
                <p className="text-[10px] text-[#445566]">{r.vendor}</p>
            </div>
        ),
        hideOnMobile: true,
    },
    {
        key: "initiated",
        label: "Initiated On",
        render: (r) => <span className="text-xs text-[#8899AA]">{r.initiated}</span>,
        hideOnMobile: true,
    },
    {
        key: "checks",
        label: "Checks Breakdown",
        align: "center",
        render: (r) => <ChecksCell row={r} />,
    },
    {
        key: "status",
        label: "Overall Status",
        align: "center",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (r) => <ActionsCell row={r} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function BGVStatus() {
    const [_search, _setSearch] = useState("");

    return (
        <Page
            title="BGV Status Dashboard"
            subtitle="Track real-time progress of background verification checks"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "BGV Status" },
            ]}
            maxWidth="1200px"
            actions={
                <Button
                    variant="secondary"
                    icon={<RefreshCw size={14} aria-hidden="true" />





}
                >
                    Sync Vendor Data
                </Button>
            }
        >
            <Card padding="none">
                <DataTable<BGVRecord>
                    data={BGV_RECORDS}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    searchable
                    searchPlaceholder="Search candidate or BGV Ref ID…"
                    searchPredicate={(r, q) =>
                        r.name.toLowerCase().includes(q) ||
                        r.ref.toLowerCase().includes(q) ||
                        r.vendor.toLowerCase().includes(q)
                    }
                    aria-label="BGV status records"
                    emptyTitle="No BGV records"
                    emptyDescription="No background verification records match your search."
                />
            </Card>
        

        

        

        </Page>
    );
}
