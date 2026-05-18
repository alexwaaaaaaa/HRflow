"use client";

import { CheckCircle2, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: "Paid";
}

const FEATURES = [
    "All 22 Core Modules",
    "AI + Chatbot Suite",
    "Unlimited Workflows",
    "Priority Email & Chat Support",
    "Custom Integrations",
    "Dedicated CSM",
    "SOC 2 Type II Compliance",
    "99.99% SLA",
    "White-labeling",
];

const INVOICES: Invoice[] = [
    { id: "INV-2024-03", date: "Mar 1, 2024", amount: "₹50,944", status: "Paid" },
    { id: "INV-2024-02", date: "Feb 1, 2024", amount: "₹49,401", status: "Paid" },
    { id: "INV-2024-01", date: "Jan 1, 2024", amount: "₹49,401", status: "Paid" },
];

const PLAN_STATS = [
    { label: "Active Employees", value: "256" },
    { label: "Billing Cycle", value: "Annual" },
    { label: "Next Invoice", value: "Apr 1, 2024" },
    { label: "MRR", value: "₹50,944" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const INVOICE_COLUMNS: Column<Invoice>[] = [
    {
        key: "id",
        label: "Invoice",
        render: (inv) => <span className="text-sm text-white font-mono">{inv.id}</span>,
    },
    {
        key: "date",
        label: "Date",
        render: (inv) => <span className="text-sm text-[#8899AA]">{inv.date}</span>,
    },
    {
        key: "amount",
        label: "Amount",
        render: (inv) => <span className="text-sm text-white font-semibold">{inv.amount}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: () => <Badge variant="success">Paid</Badge>,
    },
    {
        key: "download",
        label: "",
        align: "right",
        render: () => (
            <Button variant="ghost" size="sm" aria-label="Download invoice" icon={<Download size={14} aria-hidden="true" />} />
        ),
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function BillingSubscriptionPage() {
    return (
        <Page
            title="Billing & Subscription"
            subtitle="Manage your Kaarya subscription plan, payment methods, and invoices."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Billing" },
            ]}
            maxWidth="1000px"
        >
            <div className="space-y-8">
                {/* Current Plan */}
                <Card padding="lg" variant="elevated" className="border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                        <div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold mb-2">Current Plan</div>
                            <h2 className="text-2xl font-bold text-white mb-1">Kaarya Enterprise</h2>
                            <p className="text-sm text-[#8899AA] mb-4">Unlimited modules, priority support, custom SLAs, and dedicated CSM.</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold text-white">₹199</span>
                                <span className="text-sm text-[#8899AA]">/ employee / month</span>
                            </div>
                        </div>
                        <Card padding="md" className="w-full md:w-64 shrink-0">
                            <dl className="space-y-3 text-sm">
                                {PLAN_STATS.map((stat) => (
                                    <div key={stat.label} className="flex justify-between">
                                        <dt className="text-[#8899AA]">{stat.label}</dt>
                                        <dd className="text-white font-bold">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Card>
                    </div>
                </Card>

                {/* What's Included */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">What&apos;s Included</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {FEATURES.map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-sm text-[#c0c6cc]">
                                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" aria-hidden="true" /> {feat}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Invoices */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Recent Invoices</h3>
                        <Button variant="secondary" size="sm">View All</Button>
                    </div>
                    <Card padding="none">
                        <DataTable<Invoice>
                            data={INVOICES}
                            columns={INVOICE_COLUMNS}
                            rowKey={(inv) => inv.id}
                            aria-label="Recent invoices"
                            emptyTitle="No invoices yet"
                        />
                    </Card>
                </div>
            </div>
        </Page>
    );
}
