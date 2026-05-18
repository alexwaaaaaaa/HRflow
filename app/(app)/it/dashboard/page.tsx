"use client";

import {
    Laptop, Monitor, Smartphone, Server, FileText,
    AlertTriangle, CheckCircle, Plus, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Types & static data ──────────────────────────────────────────────────────

interface KpiStat {
    label: string;
    value: string;
    trend: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    colorClass: string;
    bgClass: string;
}

interface ProvisionRequest {
    id: string;
    user: string;
    item: string;
    status: "Pending Approval" | "Approved" | "Deployed";
    date: string;
}

const QUICK_STATS: KpiStat[] = [
    { label: "Total Assets", value: "1,248", trend: "+12 this month", icon: Server, colorClass: "text-[#33E6FF]", bgClass: "bg-[#33E6FF]/10" },
    { label: "Assigned", value: "984", trend: "79% utilization", icon: CheckCircle, colorClass: "text-[#00e5a0]", bgClass: "bg-[#00e5a0]/10" },
    { label: "Available", value: "186", trend: "Ready to deploy", icon: Laptop, colorClass: "text-[#f59e0b]", bgClass: "bg-[#f59e0b]/10" },
    { label: "Maintenance", value: "42", trend: "Requires attention", icon: AlertTriangle, colorClass: "text-[#ef4444]", bgClass: "bg-[#ef4444]/10" },
];

const RECENT_REQUESTS: ProvisionRequest[] = [
    { id: "REQ-2023-001", user: "Sarah Connor", item: 'MacBook Pro 16"', status: "Pending Approval", date: "2 hrs ago" },
    { id: "REQ-2023-002", user: "John Smith", item: 'Dell UltraSharp 27"', status: "Approved", date: "5 hrs ago" },
    { id: "REQ-2023-003", user: "Maria Garcia", item: "iPhone 14 Pro", status: "Deployed", date: "1 day ago" },
    { id: "REQ-2023-004", user: "David Chen", item: "Magic Keyboard", status: "Pending Approval", date: "1 day ago" },
];

const STATUS_VARIANT: Record<ProvisionRequest["status"], "warning" | "success" | "info"> = {
    "Pending Approval": "warning",
    Approved: "success",
    Deployed: "info",
};

const ASSET_CATEGORIES = [
    { name: "Laptops", count: 842, icon: Laptop, colorClass: "text-[#33E6FF]" },
    { name: "Monitors", count: 456, icon: Monitor, colorClass: "text-[#00e5a0]" },
    { name: "Mobiles", count: 124, icon: Smartphone, colorClass: "text-[#f59e0b]" },
    { name: "Licenses", count: 2450, icon: FileText, colorClass: "text-[#8b5cf6]" },
] as const;

const QUICK_LINKS = [
    { label: "Assign Asset", href: "/it/assets/assign" },
    { label: "Audit Software Licenses", href: "/it/software/orphaned" },
    { label: "Schedule Maintenance", href: "/it/maintenance" },
    { label: "IT Reports", href: "/it/reports" },
] as const;

// ─── Table columns ────────────────────────────────────────────────────────────

const REQUEST_COLUMNS: Column<ProvisionRequest>[] = [
    {
        key: "id",
        label: "Request ID",
        render: (r) => <span className="text-sm font-bold text-white">{r.id}</span>,
        sortable: true,
        sortValue: (r) => r.id,
    },
    {
        key: "user",
        label: "Requested By",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.user}</span>,
        sortable: true,
        sortValue: (r) => r.user,
    },
    {
        key: "item",
        label: "Item / Software",
        render: (r) => <span className="text-sm font-medium text-white">{r.item}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
    {
        key: "date",
        label: "Time",
        render: (r) => <span className="text-sm text-[#8899AA]">{r.date}</span>,
        hideOnMobile: true,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ITDashboardPage() {
    return (
        <Page
            title="IT Provisioning Dashboard"
            subtitle="Manage hardware assets, software licenses, and IT requests"
            breadcrumbs={[{ label: "IT", href: "/it/dashboard" }, { label: "Dashboard" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<Plus size={14} aria-hidden="true" />}
                        onClick={() => {}}
                        aria-label="New IT request"
                    >
                        New Request
                    </Button>
                    <Link href="/it/assets/add">
                        <Button icon={<Plus size={14} aria-hidden="true" />}>
                            Add Asset
                        </Button>
                    </Link>
                </>
            }
        >
            <div className="space-y-8">
                {/* KPI grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {QUICK_STATS.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.label} padding="lg">
                                <div className={`mb-4 inline-flex rounded-xl p-3 ${stat.bgClass}`}>
                                    <Icon size={24} className={stat.colorClass} aria-hidden="true" />
                                </div>
                                <p className="mb-1 text-sm font-bold text-[#8899AA]">{stat.label}</p>
                                <p className="mb-2 text-3xl font-black text-white">{stat.value}</p>
                                <p className={`text-xs font-bold ${stat.colorClass}`}>{stat.trend}</p>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Asset categories */}
                        <Card padding="lg">
                            <CardHeader>
                                <CardTitle>Assets by Category</CardTitle>
                                <Link
                                    href="/it/assets"
                                    className="flex items-center gap-1 text-sm font-bold text-[#33E6FF] hover:underline"
                                >
                                    View All <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                            </CardHeader>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {ASSET_CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <div
                                            key={cat.name}
                                            className="flex flex-col items-center justify-center rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 text-center transition-colors hover:bg-[#0D1928]"
                                        >
                                            <Icon size={32} className={`mb-3 ${cat.colorClass}`} aria-hidden="true" />
                                            <p className="mb-1 text-xl font-black text-white">{cat.count}</p>
                                            <p className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">{cat.name}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Recent requests table */}
                        <Card padding="lg">
                            <CardHeader>
                                <CardTitle>Recent Provisioning Requests</CardTitle>
                                <Button variant="ghost" size="sm">Manage Requests</Button>
                            </CardHeader>
                            <DataTable<ProvisionRequest>
                                data={RECENT_REQUESTS}
                                columns={REQUEST_COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Recent provisioning requests"
                                emptyTitle="No requests"
                                emptyDescription="No provisioning requests yet."
                            />
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Alerts */}
                        <Card padding="lg" className="border-[rgba(239,68,68,0.3)]">
                            <h3 className="mb-4 flex items-center gap-2 font-bold text-[#ef4444]">
                                <AlertTriangle size={18} aria-hidden="true" /> Action Required
                            </h3>
                            <div className="space-y-4">
                                <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                    <p className="mb-1 text-sm font-bold text-white">12 Orphaned Licenses</p>
                                    <p className="mb-3 text-xs text-[#8899AA]">Adobe CC licenses assigned to offboarded employees.</p>
                                    <Button variant="danger" size="sm">Revoke Access</Button>
                                </div>
                                <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                    <p className="mb-1 text-sm font-bold text-white">Low Inventory Alert</p>
                                    <p className="mb-3 text-xs text-[#8899AA]">Only 3 MacBook Pro 14" remaining in unassigned pool.</p>
                                    <Button variant="secondary" size="sm">Initiate Procurement</Button>
                                </div>
                            </div>
                        </Card>

                        {/* Quick links */}
                        <Card padding="lg">
                            <CardTitle className="mb-4">Quick Links</CardTitle>
                            <nav aria-label="IT quick links">
                                <ul className="space-y-1" role="list">
                                    {QUICK_LINKS.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="flex items-center justify-between rounded-xl p-3 text-sm font-bold text-[#8899AA] transition-colors hover:bg-[#1A2A3A] hover:text-white"
                                            >
                                                {link.label}
                                                <ArrowRight size={16} className="text-[#2A3A4A]" aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
