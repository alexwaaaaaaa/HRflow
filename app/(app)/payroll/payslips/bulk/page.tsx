"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Download, FileText, Mail, Printer, Send, Calendar,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Row {
    id: string;
    name: string;
    initials: string;
    role: string;
    dept: string;
    netPay: number;
    status: "Generated" | "Pending";
    emailed: boolean;
}

const ROWS: Row[] = [
    { id: "EMP-001", name: "Rahul Sharma", initials: "RS", role: "Frontend Developer", dept: "Engineering", netPay: 85500, status: "Generated", emailed: true },
    { id: "EMP-045", name: "Sneha Patil", initials: "SP", role: "Sales Manager", dept: "Sales", netPay: 110500, status: "Generated", emailed: false },
    { id: "EMP-204", name: "Vikram Reddy", initials: "VR", role: "DevOps Engineer", dept: "Engineering", netPay: 92000, status: "Generated", emailed: true },
    { id: "EMP-312", name: "Kiran Sharma", initials: "KS", role: "HR Executive", dept: "HR", netPay: 45000, status: "Pending", emailed: false },
    { id: "EMP-415", name: "Amit Kumar", initials: "AK", role: "Marketing Lead", dept: "Marketing", netPay: 65000, status: "Generated", emailed: true },
    { id: "EMP-821", name: "Anil Desai", initials: "AD", role: "Operations Exec", dept: "Operations", netPay: 38500, status: "Pending", emailed: false },
];

const inr = (n: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(n);

export default function PayslipBulkPage() {
    const [selected, setSelected] = useState<Set<string>>(
        new Set(ROWS.map((r) => r.id))
    );
    const [month, setMonth] = useState("Nov 2024");

    const toggle = (id: string) =>
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    const allSelected = selected.size === ROWS.length;
    const toggleAll = () =>
        setSelected(allSelected ? new Set() : new Set(ROWS.map((r) => r.id)));

    const COLUMNS: Column<Row>[] = [
        {
            key: "select",
            label: "",
            width: "w-10",
            render: (r) => (
                <input
                    type="checkbox"
                    aria-label={`Select ${r.name}`}
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                    className="h-4 w-4 cursor-pointer accent-[#00e5a0]"
                />
            ),
        },
        {
            key: "employee",
            label: "Employee",
            render: (r) => (
                <div className="flex items-center gap-3">
                    <div
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A2A3A] text-xs font-semibold text-white"
                    >
                        {r.initials}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">{r.name}</p>
                        <p className="text-xs text-[#8899AA]">
                            {r.id} · {r.role}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "dept",
            label: "Department",
            render: (r) => <span className="text-sm text-white">{r.dept}</span>,
            hideOnMobile: true,
        },
        {
            key: "net",
            label: "Net pay",
            align: "right",
            render: (r) => (
                <span className="font-semibold tabular-nums text-white">
                    {inr(r.netPay)}
                </span>
            ),
            sortable: true,
            sortValue: (r) => r.netPay,
        },
        {
            key: "status",
            label: "Status",
            render: (r) => (
                <Badge variant={r.status === "Generated" ? "success" : "warning"}>
                    {r.status}
                </Badge>
            ),
        },
        {
            key: "email",
            label: "Email",
            render: (r) => (
                <span className="inline-flex items-center gap-1.5 text-xs">
                    <Mail
                        size={13}
                        className={r.emailed ? "text-[#00e5a0]" : "text-[#7a8fa6]"}
                        aria-hidden="true"
                    />
                    {r.emailed ? "Sent" : "Not sent"}
                </span>
            ),
            hideOnMobile: true,
        },
        {
            key: "action",
            label: "",
            align: "right",
            render: (r) => (
                <Link href={`/payroll/payslips/${r.id}`}>
                    <Button variant="secondary" size="sm" icon={<FileText size={12} />}>
                        View
                    </Button>
                </Link>
            ),
        },
    ];

    const KPIS = [
        { label: "Total eligible", value: "844", tone: "text-white" },
        { label: "PDFs generated", value: "842", tone: "text-[#00e5a0]" },
        { label: "Emailed successfully", value: "780", tone: "text-white" },
        { label: "Pending / failed", value: "2", tone: "text-[#FFB800]" },
    ];

    return (
        <Page
            title="Generate & distribute payslips"
            subtitle={
                <span className="inline-flex items-center gap-2">






                    <Calendar size={14} aria-hidden="true" />
                    Pay period:
                    <select
                        aria-label="Pay period"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="cursor-pointer border-b border-dashed border-[#445566] bg-transparent pb-0.5 text-sm font-semibold text-white outline-none"
                    >
                        <option value="Nov 2024">November 2024</option>
                        <option value="Oct 2024">October 2024</option>
                        <option value="Sep 2024">September 2024</option>
                    </select>
                </span> as unknown as string
            }
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Payslips" },
                { label: "Bulk" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Printer size={14} />}>
                        Print ({selected.size})
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Download size={14} />}
                        disabled={selected.size === 0}
                    >
                        Download ({selected.size})
                    </Button>
                    <Button icon={<Send size={14} />} disabled={selected.size === 0}>
                        Email ({selected.size})
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {KPIS.map((k) => (
                        <Card key={k.label}>
                            <p className="text-xs text-[#8899AA]">{k.label}</p>
                            <p className={`mt-2 text-2xl font-bold ${k.tone}`}>{k.value}</p>
                        </Card>
                    ))}
                </div>

                <Card padding="none">
                    <div className="flex items-center justify-between border-b border-[#1A2A3A] p-4">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                aria-label="Select all"
                                checked={allSelected}
                                onChange={toggleAll}
                                className="h-4 w-4 cursor-pointer accent-[#00e5a0]"
                            />
                            <span className="text-[#8899AA]">
                                Select all ({selected.size}/{ROWS.length})
                            </span>
                        </label>
                    </div>
                    <DataTable<Row>
                        data={ROWS}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search employee, ID, or role…"
                        aria-label="Payslip generation queue"
                    />
                </Card>
            </div>
        

        

        

        </Page>
    );
}
