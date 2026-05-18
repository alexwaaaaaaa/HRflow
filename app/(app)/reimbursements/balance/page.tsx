"use client";

import { useState } from "react";
import { TrendingUp, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface BalanceEntry {
    name: string;
    dept: string;
    medical: { limit: number; used: number };
    lta: { limit: number; used: number };
    internet: { limit: number; used: number };
    fuel: { limit: number; used: number };
}

const EMPLOYEES: BalanceEntry[] = [
    { name: "Anita Kulkarni", dept: "Engineering", medical: { limit: 15000, used: 8400 }, lta: { limit: 50000, used: 0 }, internet: { limit: 24000, used: 14400 }, fuel: { limit: 0, used: 0 } },
    { name: "Rahul Sharma", dept: "Sales", medical: { limit: 15000, used: 15000 }, lta: { limit: 50000, used: 45000 }, internet: { limit: 24000, used: 21600 }, fuel: { limit: 18000, used: 8500 } },
    { name: "Meena Joshi", dept: "Finance", medical: { limit: 15000, used: 3200 }, lta: { limit: 50000, used: 0 }, internet: { limit: 24000, used: 7200 }, fuel: { limit: 0, used: 0 } },
    { name: "Karan Singh", dept: "Sales", medical: { limit: 15000, used: 0 }, lta: { limit: 50000, used: 0 }, internet: { limit: 24000, used: 12000 }, fuel: { limit: 18000, used: 17200 } },
    { name: "Vijay Kumar", dept: "HR", medical: { limit: 15000, used: 7800 }, lta: { limit: 50000, used: 50000 }, internet: { limit: 24000, used: 14400 }, fuel: { limit: 0, used: 0 } },
];

function BalBar({ used, limit }: { used: number; limit: number }) {
    if (limit === 0) return <span className="text-xs text-[#445566]">N/A</span>;
    const pct = Math.min(Math.round((used / limit) * 100), 100);
    const colorClass =
        pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-violet-500";
    return (
        <div>
            <div className="mb-0.5 flex justify-between text-[10px]">
                <span className="text-[#556677]">
                    ₹{used.toLocaleString()} / ₹{limit.toLocaleString()}
                </span>
                <span
                    className={
                        pct >= 100
                            ? "text-red-400"
                            : pct >= 80
                            ? "text-amber-400"
                            : "text-[#8899AA]"
                    }
                >
                    {pct}%
                </span>
            </div>
            <div
                className="h-1.5 overflow-hidden rounded-full bg-[#1A2A3A]"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${pct}% used`}
            >
                <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

const COLUMNS: Column<BalanceEntry>[] = [
    {
        key: "name",
        label: "Employee",
        render: (r) => (
            <div>
                <div className="text-xs font-semibold text-white">{r.name}</div>
                <div className="text-[10px] text-[#556677]">{r.dept}</div>
            </div>
        ),
    },
    {
        key: "medical",
        label: "Medical (₹15k)",
        render: (r) => <BalBar used={r.medical.used} limit={r.medical.limit} />,
    },
    {
        key: "lta",
        label: "LTA (₹50k)",
        render: (r) => <BalBar used={r.lta.used} limit={r.lta.limit} />,
    },
    {
        key: "internet",
        label: "Internet (₹24k)",
        render: (r) => <BalBar used={r.internet.used} limit={r.internet.limit} />,
    },
    {
        key: "fuel",
        label: "Fuel",
        render: (r) => <BalBar used={r.fuel.used} limit={r.fuel.limit} />,
    },
];

export default function ReimbursementBalanceScreen() {
    const [search, setSearch] = useState("");

    return (
        <Page
            title="Reimbursement Balance Tracker"
            subtitle="Employee-wise view of limits used and remaining across all categories (FY 2025-26)"
            breadcrumbs={[
                { label: "Reimbursements", href: "/reimbursements/dashboard" },
                { label: "Balance Tracker" },
            ]}
            maxWidth="1400px"
            actions={
                <Button
                    variant="secondary"
                    size="sm"
                    icon={<Download size={16} aria-hidden="true" />}
                >
                    Export
                </Button>
            }
        >
            <Card padding="none">
                <div className="p-4">
                    <label htmlFor="balance-search" className="sr-only">
                        Search employee or department
                    </label>
                    <div className="relative">
                        <TrendingUp
                            size={16}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                            aria-hidden="true"
                        />
                        <input
                            id="balance-search"
                            type="search"
                            placeholder="Search employee or department..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-[#1A2A3A] bg-[#0A1420] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-violet-500"
                        />
                    </div>
                </div>
                <DataTable
                    data={EMPLOYEES}
                    columns={COLUMNS}
                    rowKey={(r) => r.name}
                    searchable
                    searchPlaceholder="Search employee or department..."
                    searchPredicate={(r, q) =>
                        r.name.toLowerCase().includes(q) || r.dept.toLowerCase().includes(q)
                    }
                    aria-label="Employee reimbursement balance tracker"
                    emptyTitle="No employees found"
                />
            </Card>
        </Page>
    );
}
