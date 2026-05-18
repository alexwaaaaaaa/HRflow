"use client";

import { PlayCircle, RefreshCw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type VerifyStatus = "Verified" | "Failed" | "Pending";

interface Account {
    name: string;
    id: string;
    bank: string;
    accEnd: string;
    ifsc: string;
    status: VerifyStatus;
    pennyDrop: string;
}

const ACCOUNTS: Account[] = [
    { name: "Rahul Sharma", id: "EMP-001", bank: "HDFC Bank", accEnd: "4451", ifsc: "HDFC0001234", status: "Verified", pennyDrop: "Success" },
    { name: "Sneha Patil", id: "EMP-045", bank: "ICICI Bank", accEnd: "9822", ifsc: "ICIC0000014", status: "Verified", pennyDrop: "Success" },
    { name: "Vikram Reddy", id: "EMP-204", bank: "State Bank of India", accEnd: "1190", ifsc: "SBIN0004561", status: "Failed", pennyDrop: "Name Mismatch" },
    { name: "Kiran Sharma", id: "EMP-312", bank: "Axis Bank", accEnd: "3321", ifsc: "UTIB0000192", status: "Pending", pennyDrop: "Not Initiated" },
    { name: "Amit Kumar", id: "EMP-415", bank: "Kotak Mahindra", accEnd: "8845", ifsc: "KKBK0000213", status: "Verified", pennyDrop: "Success" },
];

const STATUS_BADGE: Record<VerifyStatus, "success" | "danger" | "warning"> = {
    Verified: "success",
    Failed: "danger",
    Pending: "warning",
};

const KPI_CARDS = [
    { label: "Total Accounts", value: "842", color: "text-white" },
    { label: "Verified Active", value: "825", color: "text-[#00E5A0]" },
    { label: "Failed / Invalid", value: "4", color: "text-[#FF4444]" },
    { label: "Pending Verification", value: "13", color: "text-[#FFB800]" },
] as const;

const COLUMNS: Column<Account>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (a) => (
            <div>
                <div className="text-sm font-semibold text-white mb-1">{a.name}</div>
                <div className="text-xs text-[#8899AA]">{a.id}</div>
            </div>
        ),
        sortable: true,
        sortValue: (a) => a.name,
    },
    {
        key: "bank",
        label: "Bank Details",
        render: (a) => (
            <div>
                <div className="text-sm text-[#c8d8e8] mb-1">{a.bank} •••• {a.accEnd}</div>
                <div className="text-xs text-[#8899AA]">IFSC: {a.ifsc}</div>
            </div>
        ),
    },
    {
        key: "status",
        label: "Verification Status",
        render: (a) => <Badge variant={STATUS_BADGE[a.status]}>{a.status}</Badge>,
    },
    {
        key: "pennyDrop",
        label: "Penny Drop Response",
        render: (a) => (
            <span className={a.pennyDrop === "Name Mismatch" ? "text-[#FF4444] text-sm" : "text-[#8899AA] text-sm"}>
                {a.pennyDrop}
            </span>
        ),
    },
    {
        key: "actions",
        label: "Action",
        render: (a) => (
            <div className="flex gap-2">
                {a.status === "Failed" && (
                    <Button variant="danger" size="sm">Request Update</Button>
                )}
                {a.status === "Pending" && (
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<RefreshCw size={13} aria-hidden="true" />}
                        aria-label={`Verify ${a.name}'s account`}
                    />
                )}
            </div>
        ),
    },
];

export default function BankAccountVerification() {
    return (
        <Page
            title="Bank Account Verification"
            subtitle="Verify employee bank accounts via automated penny drops before payroll disbursement."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Bank Verification" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<PlayCircle size={16} aria-hidden="true" />}>
                    Run Penny Drop on Pending
                </Button>
            }
        >
            {/* KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {KPI_CARDS.map((kpi) => (
                    <Card key={kpi.label} padding="md">
                        <div className="text-xs text-[#8899AA] mb-2">{kpi.label}</div>
                        <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                    </Card>
                ))}
            </div>

            {/* Accounts Table */}
            <Card padding="none">
                <DataTable<Account>
                    data={ACCOUNTS}
                    columns={COLUMNS}
                    rowKey={(a) => a.id}
                    searchable
                    searchPlaceholder="Search employee..."
                    aria-label="Employee bank account verification status"
                />
            </Card>
        </Page>
    );
}
