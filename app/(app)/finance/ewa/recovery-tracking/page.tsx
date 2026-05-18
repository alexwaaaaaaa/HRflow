"use client";

import { Download, Filter, RotateCcw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type RecoveryStatus = "Recovered" | "Failed" | "Partially Recovered" | "Absconding - Loss";

interface RecoveryRecord {
    id: string;
    emp: string;
    empId: string;
    month: string;
    expected: number;
    status: RecoveryStatus;
    mode: string;
    note?: string;
}

const RECOVERY_TRACKING: RecoveryRecord[] = [
    { id: "R-001", emp: "Ananya S", empId: "EMP-042", month: "Sep 2025", expected: 15150, status: "Recovered", mode: "Auto Deduction" },
    { id: "R-002", emp: "Vikram R", empId: "EMP-011", month: "Sep 2025", expected: 8080, status: "Failed", mode: "Auto Deduction", note: "LOP exceeded net pay" },
    { id: "R-003", emp: "Sneha R", empId: "EMP-112", month: "Sep 2025", expected: 25250, status: "Recovered", mode: "Auto Deduction" },
    { id: "R-004", emp: "Rahul K", empId: "EMP-091", month: "Aug 2025", expected: 5050, status: "Partially Recovered", mode: "Manual Adjustment", note: "Recovered 3000. Bal 2050 carry fwd" },
    { id: "R-005", emp: "Amit V", empId: "EMP-210", month: "Jul 2025", expected: 12000, status: "Absconding - Loss", mode: "FnF", note: "Legal notice sent" },
];

const KPI_TILES = [
    { label: "Total Outstanding Exceptions", value: "₹35,130", sub: "Across 8 active cases", valueColor: "text-amber-400" },
    { label: "Written Off (YTD)", value: "₹55,000", sub: "Absconding / NPA", valueColor: "text-pink-400" },
    { label: "Overall Collection Efficiency", value: "99.1%", sub: "YTD healthy", valueColor: "text-emerald-400" },
] as const;

const COLUMNS: Column<RecoveryRecord>[] = [
    {
        key: "emp", label: "Employee", render: (r) => (
            <div>
                <div className="text-white font-medium">{r.emp}</div>
                <div className="text-[#8899AA] text-xs mt-0.5">{r.empId}</div>
            </div>
        ),
    },
    { key: "month", label: "Target Month", render: (r) => <span className="text-[#8899AA]">{r.month}</span> },
    {
        key: "expected", label: "Expected Payload", align: "right", render: (r) => (
            <div>
                <div className="text-white font-bold">₹{r.expected.toLocaleString()}</div>
                <div className="text-[#8899AA] text-xs">{r.mode}</div>
            </div>
        ),
    },
    {
        key: "status", label: "Status / Note", render: (r) => {
            if (r.status === "Recovered") return <Badge variant="success">Recovered</Badge>;
            if (r.status === "Failed") return (
                <div>
                    <Badge variant="danger">Failed (Zero Pay)</Badge>
                    {r.note && <p className="text-[#8899AA] text-xs mt-1">{r.note}</p>}
                </div>
            );
            if (r.status === "Partially Recovered") return (
                <div>
                    <Badge variant="warning">Partial Shortfall</Badge>
                    {r.note && <p className="text-[#8899AA] text-xs mt-1">{r.note}</p>}
                </div>
            );
            return (
                <div>
                    <Badge variant="neutral">NPA / Written Off</Badge>
                    {r.note && <p className="text-pink-400/80 text-xs mt-1">{r.note}</p>}
                </div>
            );
        },
    },
    {
        key: "action", label: "Intervention", align: "center",
        render: (r) => (
            r.status !== "Recovered" && r.status !== "Absconding - Loss"
                ? <Button variant="secondary" size="sm" icon={<RotateCcw size={12} />}>Roll to Next Month</Button>
                : null
        ),
    },
];

export default function EWARecoveryTrackingPage() {
    return (
        <Page
            title="Recovery Exceptions Tracking"
            subtitle="Track and manage shortfalls, partial recoveries, and absconding debts."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "EWA", href: "/finance/ewa" },
                { label: "Recovery Exceptions" },
            ]}
            maxWidth="1300px"
            actions={
                <Button variant="secondary" icon={<Download size={14} />}>Export Defaults List</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-1 ${tile.valueColor}`}>{tile.value}</h3>
                        <p className="text-xs text-[#8899AA]">{tile.sub}</p>
                    </Card>
                ))}
            </div>

            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="search"
                        placeholder="Search exceptions..."
                        aria-label="Search recovery exceptions"
                        className="w-full md:w-96 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <Button variant="secondary" icon={<Filter size={14} />}>Exceptions Only</Button>
                </div>
                <div className="p-4">
                    <DataTable<RecoveryRecord>
                        data={RECOVERY_TRACKING}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="EWA recovery exceptions"
                        emptyTitle="No exceptions found"
                        emptyDescription="All recoveries are on track."
                    />
                </div>
            </Card>
        </Page>
    );
}
