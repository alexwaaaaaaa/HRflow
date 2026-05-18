"use client";

import { ShieldCheck, CheckCircle2, PlayCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface BonusRow {
    id: string;
    name: string;
    basic: number;
    qual: number;
    min: number;
    pct: number;
    tds: number;
}

const EMPLOYEES: BonusRow[] = [
    { id: "EMP234", name: "Mohan Lal", basic: 144000, qual: 144000, min: 11995, pct: 10, tds: 2880 },
    { id: "EMP256", name: "Shanti Devi", basic: 192000, qual: 192000, min: 15994, pct: 10, tds: 3840 },
    { id: "EMP281", name: "Raju Bhai", basic: 240000, qual: 252000, min: 19992, pct: 15, tds: 5400 },
    { id: "EMP302", name: "Kamla Kamat", basic: 110000, qual: 110000, min: 9163, pct: 8.33, tds: 0 },
    { id: "EMP310", name: "Ajay Singh", basic: 168000, qual: 168000, min: 13994, pct: 12, tds: 4032 },
];

const COMPLIANCE_RULES = [
    "Establishment type: Factory / Non-seasonal",
    "Employee salary: ≤ ₹21,000/month",
    "Minimum 30 working days verified",
    "Minimum bonus: 8.33% of annual salary",
    "Maximum bonus: 20% of annual salary",
];

const COLUMNS: Column<BonusRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (e) => (
            <div>
                <p className="font-medium text-white">{e.name}</p>
                <p className="text-xs text-[#8899AA]">{e.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (e) => e.name,
    },
    {
        key: "basic",
        label: "Annual Basic (₹)",
        align: "right",
        render: (e) => <span className="text-sm text-white">{e.basic.toLocaleString()}</span>,
    },
    {
        key: "qual",
        label: "Qualifying (₹)",
        align: "right",
        render: (e) => <span className="text-sm text-white">{e.qual.toLocaleString()}</span>,
    },
    {
        key: "min",
        label: "Min Bonus 8.33%",
        align: "right",
        render: (e) => <span className="text-sm text-[#8899AA]">{e.min.toLocaleString()}</span>,
    },
    {
        key: "pct",
        label: "Declared %",
        align: "center",
        render: (e) => (
            <input
                type="number"
                defaultValue={e.pct}
                aria-label={`Declared percentage for ${e.name}`}
                className="h-7 w-16 rounded border border-[#2A3A4A] bg-[#1A2A3A] text-center text-sm text-white outline-none"
            />
        ),
    },
    {
        key: "gross",
        label: "Gross Bonus (₹)",
        align: "right",
        render: (e) => {
            const gross = Math.round(e.qual * (e.pct / 100));
            return <span className="font-medium text-white">{gross.toLocaleString()}</span>;
        },
    },
    {
        key: "tds",
        label: "TDS (₹)",
        align: "right",
        render: (e) => <span className="text-red-400">-{e.tds.toLocaleString()}</span>,
    },
    {
        key: "net",
        label: "Net Bonus (₹)",
        align: "right",
        render: (e) => {
            const gross = Math.round(e.qual * (e.pct / 100));
            const net = gross - e.tds;
            return <span className="font-semibold text-[#00E5A0]">{net.toLocaleString()}</span>;
        },
    },
];

export default function StatutoryBonusPage() {
    return (
        <Page
            title="Statutory Bonus — FY 2024-25"
            subtitle="Payment of Bonus Act, 1965 · Process annual minimum/maximum bonus for eligible employees."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Statutory Bonus" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<PlayCircle size={14} aria-hidden="true" />}>
                    Process Bonus Payroll
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card padding="lg">
                        <h3 className="mb-4 text-base font-semibold text-white">Act Compliance Check</h3>
                        <ul className="flex flex-col gap-3">
                            {COMPLIANCE_RULES.map((rule) => (
                                <li key={rule} className="flex items-center gap-2.5 text-sm text-[#8899AA]">
                                    <CheckCircle2 size={15} className="shrink-0 text-[#00E5A0]" aria-hidden="true" /> {rule}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card padding="lg" className="flex items-center">
                        <div className="flex flex-1 flex-col">
                            <p className="text-sm text-[#8899AA]">Eligible Employees</p>
                            <p className="mt-1 text-3xl font-semibold text-white">89</p>
                            <p className="mt-1 text-sm text-[#00E5A0]">Salary ≤ ₹21,000/month</p>
                        </div>
                        <div className="mx-6 h-16 w-px bg-[#1A2A3A]" />
                        <div className="flex flex-1 flex-col">
                            <p className="text-sm text-[#8899AA]">Ineligible Employees</p>
                            <p className="mt-1 text-3xl font-semibold text-[#8899AA]">258</p>
                            <p className="mt-1 text-sm text-[#8899AA]">Salary &gt; ₹21,000/month</p>
                        </div>
                    </Card>

                    <Card
                        variant="bare"
                        className="flex flex-col justify-center rounded-2xl border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.05)] p-5"
                    >
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#00E5A0]">
                            <ShieldCheck size={16} aria-hidden="true" /> 100% Compliant Array
                        </div>
                        <p className="text-sm text-[#8899AA]">Total Statutory Payout</p>
                        <p className="mt-1 text-3xl font-bold text-white">₹12,84,000</p>
                    </Card>
                </div>

                {/* Bonus Computation Table */}
                <Card padding="none" aria-labelledby="bonus-computation-heading">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A2A3A] px-6 py-4">
                        <h3 id="bonus-computation-heading" className="text-base font-semibold text-white">
                            Bonus Computation (89 Eligible)
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-[#8899AA]">Bulk Action:</span>
                            <select
                                aria-label="Bulk action for bonus percentage"
                                className="h-8 rounded-md border-none bg-[#1A2A3A] px-3 text-sm text-white outline-none"
                            >
                                <option>Set all to Min (8.33%)</option>
                                <option>Set all to Max (20%)</option>
                                <option>Set to 10%</option>
                            </select>
                            <Button size="sm">Apply</Button>
                        </div>
                    </div>
                    <DataTable<BonusRow>
                        data={EMPLOYEES}
                        columns={COLUMNS}
                        rowKey={(e) => e.id}
                        aria-label="Statutory bonus computation"
                        emptyTitle="No eligible employees"
                    />
                </Card>
            </div>
        </Page>
    );
}
