"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface PolicyCategory {
    name: string;
    limit: string;
    cycle: string;
    taxable: boolean;
    active: boolean;
    claimsYtd: number;
}

const INITIAL_CATEGORIES: PolicyCategory[] = [
    { name: "Medical / OPD", limit: "₹15,000", cycle: "Annual", taxable: false, active: true, claimsYtd: 48 },
    { name: "LTA (Leave Travel Allowance)", limit: "₹50,000", cycle: "Annual", taxable: false, active: true, claimsYtd: 12 },
    { name: "Fuel & Conveyance", limit: "₹2,400", cycle: "Monthly", taxable: false, active: true, claimsYtd: 182 },
    { name: "Internet / Broadband", limit: "₹2,000", cycle: "Monthly", taxable: false, active: true, claimsYtd: 94 },
    { name: "Books & Periodicals", limit: "₹5,000", cycle: "Annual", taxable: false, active: true, claimsYtd: 8 },
    { name: "Professional Development", limit: "₹25,000", cycle: "Annual", taxable: true, active: false, claimsYtd: 0 },
    { name: "Telephone Reimbursement", limit: "₹1,200", cycle: "Monthly", taxable: true, active: true, claimsYtd: 66 },
];

function ToggleButton({ active, onToggle }: { active: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={active ? "Deactivate category" : "Activate category"}
            className="transition-colors"
        >
            {active ? (
                <ToggleRight size={22} className="text-violet-400 hover:text-violet-300" aria-hidden="true" />
            ) : (
                <ToggleLeft size={22} className="text-[#2A3A4A] hover:text-[#3A4A5A]" aria-hidden="true" />
            )}
        </button>
    );
}

function RowActions() {
    return (
        <div className="flex items-center justify-end gap-2">
            <button
                type="button"
                aria-label="Edit category"
                className="rounded-lg p-1.5 text-[#556677] transition-colors hover:bg-[#1A2A3A] hover:text-white"
            >
                <Edit2 size={14} aria-hidden="true" />
            </button>
            <button
                type="button"
                aria-label="Delete category"
                className="rounded-lg p-1.5 text-[#556677] transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
                <Trash2 size={14} aria-hidden="true" />
            </button>
        </div>
    );
}

export default function ReimbursementPolicyPage() {
    const [cats, setCats] = useState<PolicyCategory[]>(INITIAL_CATEGORIES);

    const toggle = (i: number) =>
        setCats((prev) => prev.map((c, idx) => (idx === i ? { ...c, active: !c.active } : c)));

    const columns: Column<PolicyCategory>[] = [
        {
            key: "name",
            label: "Category Name",
            render: (row) => <span className="font-semibold text-white">{row.name}</span>,
        },
        {
            key: "limit",
            label: "Limit",
            render: (row) => <span className="font-bold text-emerald-400">{row.limit}</span>,
        },
        {
            key: "cycle",
            label: "Cycle",
            render: (row) => <span className="text-[#AABBCC]">{row.cycle}</span>,
        },
        {
            key: "taxable",
            label: "Tax Treatment",
            render: (row) => (
                <Badge variant={row.taxable ? "warning" : "success"}>
                    {row.taxable ? "Taxable" : "Tax Exempt"}
                </Badge>
            ),
        },
        {
            key: "claimsYtd",
            label: "Claims YTD",
            render: (row) => <span className="text-[#AABBCC]">{row.claimsYtd}</span>,
        },
        {
            key: "active",
            label: "Active",
            render: (row, i) => (
                <ToggleButton active={row.active} onToggle={() => toggle(i)} />
            ),
        },
        {
            key: "actions",
            label: "",
            render: () => <RowActions />,
        },
    ];

    return (
        <Page
            title="Reimbursement Policy Setup"
            subtitle="Define categories, annual limits, and tax treatment for each reimbursement type"
            breadcrumbs={[
                { label: "Reimbursements", href: "/reimbursements/dashboard" },
                { label: "Policy Setup" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />





}>
                    Add Category
                </Button>
            }
        >
            <div className="space-y-4">
                <DataTable<PolicyCategory>
                    data={cats}
                    columns={columns}
                    rowKey={(row) => row.name}
                    aria-label="Reimbursement policy categories"
                />
                <div className="flex justify-start">
                    <Button>Save Policy Changes</Button>
                </div>
            </div>
        

        

        

        </Page>
    );
}
