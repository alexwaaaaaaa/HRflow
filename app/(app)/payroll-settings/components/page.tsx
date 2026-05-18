"use client";

import { Plus, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface SalaryComponent {
    id: string;
    name: string;
    type: "Earning" | "Deduction";
    calc: string;
    taxable: boolean;
    pf: boolean;
    status: "Active" | "Inactive";
    isSystem: boolean;
}

const COMPONENTS: SalaryComponent[] = [
    { id: "COMP-01", name: "Basic Salary", type: "Earning", calc: "Flat Amount", taxable: true, pf: true, status: "Active", isSystem: true },
    { id: "COMP-02", name: "House Rent Allowance (HRA)", type: "Earning", calc: "Formula (50% of Basic)", taxable: true, pf: false, status: "Active", isSystem: true },
    { id: "COMP-03", name: "Special Allowance", type: "Earning", calc: "Formula (Gross - Basic - HRA)", taxable: true, pf: false, status: "Active", isSystem: true },
    { id: "COMP-04", name: "Sales Incentive", type: "Earning", calc: "Variable (Input Monthly)", taxable: true, pf: false, status: "Active", isSystem: false },
    { id: "COMP-05", name: "Leave Travel Allowance", type: "Earning", calc: "Flat Amount", taxable: false, pf: false, status: "Inactive", isSystem: false },
    { id: "COMP-06", name: "Provident Fund (EPF)", type: "Deduction", calc: "Formula (12% of Basic)", taxable: false, pf: true, status: "Active", isSystem: true },
    { id: "COMP-07", name: "Professional Tax", type: "Deduction", calc: "Slab Based", taxable: false, pf: false, status: "Active", isSystem: true },
    { id: "COMP-08", name: "Income Tax (TDS)", type: "Deduction", calc: "Auto Calculated", taxable: false, pf: false, status: "Active", isSystem: true },
];

const TABS = ["Earnings", "Deductions", "Reimbursements", "Formulas", "Pay Slips"] as const;
type Tab = typeof TABS[number];

const COLUMNS: Column<SalaryComponent>[] = [
    {
        key: "name",
        label: "Component Name",
        render: (c) => (
            <div>
                <div className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                    {c.name}
                    {c.isSystem && <span className="text-[10px] bg-[#1A2A3A] px-1.5 py-0.5 rounded text-[#8899AA]">System</span>}
                </div>
                <div className="text-xs text-[#8899AA]">{c.id} · Pro-rata applicable</div>
            </div>
        ),
        sortable: true,
        sortValue: (c) => c.name,
    },
    {
        key: "calc",
        label: "Calculation Type",
        render: (c) => <span className="text-sm text-white">{c.calc}</span>,
    },
    {
        key: "taxable",
        label: "Taxable",
        align: "center",
        render: (c) =>
            c.taxable
                ? <CheckCircle2 size={15} className="text-[#00E5A0] mx-auto" aria-label="Taxable" />
                : <XCircle size={15} className="text-[#445566] mx-auto" aria-label="Not taxable" />,
    },
    {
        key: "status",
        label: "Status",
        render: (c) => <Badge variant={c.status === "Active" ? "success" : "neutral"}>{c.status}</Badge>,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (c) =>
            c.calc.includes("Formula") ? (
                <Button variant="ghost" size="sm" href="/payroll-settings/components/formula">Edit Formula</Button>
            ) : (
                <Button variant="ghost" size="sm" aria-label={`More actions for ${c.name}`}>
                    <MoreVertical size={14} aria-hidden="true" />
                </Button>
            ),
    },
];

export default function SalaryComponents() {
    const [activeTab, setActiveTab] = useState<Tab>("Earnings");

    const filtered = COMPONENTS.filter((c) => {
        if (activeTab === "Formulas") return c.calc.includes("Formula");
        if (activeTab === "Earnings") return c.type === "Earning";
        if (activeTab === "Deductions") return c.type === "Deduction";
        return false;
    });

    return (
        <Page
            title="Salary Components"
            subtitle="Configure earnings, deductions, and variable pay elements for your payroll calculation."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Components" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>Add Component</Button>
            }
        >
            <div className="flex gap-8">
                {/* Sidebar Navigation */}
                <nav className="w-52 shrink-0" aria-label="Component categories">
                    <ul className="space-y-1" role="list">
                        {TABS.map((tab) => (
                            <li key={tab}>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                                        activeTab === tab
                                            ? "font-semibold text-[#00E5A0] bg-[#00E5A0]/10"
                                            : "font-medium text-[#8899AA] hover:bg-[#1A2A3A]"
                                    }`}
                                    aria-current={activeTab === tab ? "page" : undefined}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Main Content */}
                <div className="flex-1">
                    <Card padding="lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-white">{activeTab} Components</h2>
                        </div>
                        <DataTable<SalaryComponent>
                            data={filtered}
                            columns={COLUMNS}
                            rowKey={(c) => c.id}
                            searchable
                            searchPlaceholder={`Search ${activeTab.toLowerCase()}…`}
                            aria-label={`${activeTab} salary components`}
                            emptyTitle="No components found"
                        />
                    </Card>
                </div>
            </div>
        </Page>
    );
}
