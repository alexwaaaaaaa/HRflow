"use client";

import {
    ArrowRight,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    PlusCircle,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Stat {
    label: string;
    value: string;
    sub: string;
    colorClass: string;
    icon: LucideIcon;
}

const STATS: Stat[] = [
    { label: "Pending Claims", value: "₹2,84,500", sub: "14 claims awaiting approval", colorClass: "text-amber-400", icon: Clock },
    { label: "Approved (This Month)", value: "₹9,12,000", sub: "67 claims processed", colorClass: "text-emerald-400", icon: CheckCircle2 },
    { label: "Rejected", value: "₹45,000", sub: "3 claims returned", colorClass: "text-red-400", icon: AlertCircle },
    { label: "Annual Limit Used", value: "64%", sub: "₹5.4L of ₹8.4L used", colorClass: "text-indigo-400", icon: TrendingUp },
];

interface Claim {
    id: string;
    emp: string;
    avatar: string;
    type: string;
    amount: string;
    date: string;
    status: "Pending" | "Approved" | "Rejected";
}

const RECENT_CLAIMS: Claim[] = [
    { id: "RMB-441", emp: "Anita Kulkarni", avatar: "AK", type: "Medical", amount: "₹12,400", date: "09 Mar", status: "Pending" },
    { id: "RMB-440", emp: "Rahul Sharma", avatar: "RS", type: "LTA", amount: "₹45,000", date: "08 Mar", status: "Approved" },
    { id: "RMB-438", emp: "Vijay Kumar", avatar: "VK", type: "Internet", amount: "₹1,800", date: "07 Mar", status: "Approved" },
    { id: "RMB-435", emp: "Deepa Agrawal", avatar: "DA", type: "Fuel", amount: "₹8,500", date: "06 Mar", status: "Rejected" },
    { id: "RMB-432", emp: "Meena Joshi", avatar: "MJ", type: "Medical", amount: "₹22,000", date: "05 Mar", status: "Pending" },
];

const STATUS_VARIANT = {
    Pending: "warning",
    Approved: "success",
    Rejected: "danger",
} as const;

const CLAIM_COLUMNS: Column<Claim>[] = [
    {
        key: "emp",
        label: "Employee",
        render: (r) => (
            <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/15 text-[10px] font-bold text-violet-400">
                    {r.avatar}
                </div>
                <div>
                    <div className="text-xs font-semibold text-white">{r.emp}</div>
                    <div className="text-[10px] text-[#7a8fa6]">{r.id}</div>
                </div>
            </div>
        ),
    },
    { key: "type", label: "Type", render: (r) => <span className="text-xs text-[#AABBCC]">{r.type}</span> },
    { key: "amount", label: "Amount", render: (r) => <span className="text-xs font-bold text-white">{r.amount}</span> },
    { key: "date", label: "Date", render: (r) => <span className="text-xs text-[#7a8fa6]">{r.date}</span> },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
];

const NAV_LINKS = [
    { label: "Policy Setup", href: "/reimbursements/policy", desc: "Configure categories & limits" },
    { label: "Submit Claim", href: "/reimbursements/claim", desc: "New reimbursement request" },
    { label: "Approvals Queue", href: "/reimbursements/approvals", desc: "14 pending approval" },
    { label: "Balance Tracker", href: "/reimbursements/balance", desc: "Employee-wise limits" },
    { label: "LTA Claims", href: "/reimbursements/lta", desc: "Leave Travel Allowance" },
    { label: "Medical Claims", href: "/reimbursements/medical", desc: "Hospitalization & OPD" },
    { label: "Reports", href: "/reimbursements/reports", desc: "Monthly & annual summaries" },
];

export default function ReimbursementDashboard() {
    return (
        <Page
            title="Reimbursements"
            subtitle="Manage employee expense claims, LTA, medical, and all benefit reimbursements"
            breadcrumbs={[{ label: "Reimbursements" }]}
            maxWidth="1400px"
            actions={
                <Button
                    variant="primary"
                    size="md"
                    icon={<PlusCircle size={16} aria-hidden="true" />}
                    href="/reimbursements/claim"
                >
                    New Claim
                </Button>
            }
        >
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {STATS.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.label} padding="md">
                                <div className="mb-1 flex items-center gap-2">
                                    <Icon size={16} className={stat.colorClass} aria-hidden="true" />
                                    <div className={`text-2xl font-black ${stat.colorClass}`}>
                                        {stat.value}
                                    </div>
                                </div>
                                <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                    {stat.label}
                                </div>
                                <div className="mt-1 text-[10px] text-[#7a8fa6]">{stat.sub}</div>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Quick Nav */}
                    <Card padding="none">
                        <div className="border-b border-[#1A2A3A] p-4 text-sm font-bold text-white">
                            Quick Navigation
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {NAV_LINKS.map((n) => (
                                <Link
                                    key={n.href}
                                    href={n.href}
                                    className="group flex items-center gap-3 p-4 transition-colors hover:bg-[#131B2B]"
                                >
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-white transition-colors group-hover:text-violet-300">
                                            {n.label}
                                        </div>
                                        <div className="text-xs text-[#7a8fa6]">{n.desc}</div>
                                    </div>
                                    <ArrowRight
                                        size={14}
                                        className="shrink-0 text-[#7a8fa6] transition-colors group-hover:text-violet-400"
                                        aria-hidden="true"
                                    />
                                </Link>
                            ))}
                        </div>
                    </Card>

                    {/* Recent Claims */}
                    <div className="md:col-span-2">
                        <Card padding="none">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] p-4">
                                <span className="text-sm font-bold text-white">Recent Claims</span>
                                <Link
                                    href="/reimbursements/approvals"
                                    className="text-xs font-bold text-violet-400 transition-colors hover:text-violet-300"
                                >
                                    View All
                                </Link>
                            </div>
                            <DataTable
                                data={RECENT_CLAIMS}
                                columns={CLAIM_COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Recent reimbursement claims"
                                emptyTitle="No recent claims"
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
