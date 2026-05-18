"use client";

import {
    Laptop, CheckCircle, AlertTriangle, PenTool, Tag,
    History, ShieldCheck, MapPin, Receipt, Calendar, User, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types & static data ──────────────────────────────────────────────────────

interface AssetSpec {
    label: string;
    value: string;
}

interface HistoryEvent {
    date: string;
    action: string;
    by: string;
}

// ─── Sub-components (module scope) ───────────────────────────────────────────

function SpecRow({ label, value }: AssetSpec) {
    return (
        <div className="flex flex-col border-b border-[#1A2A3A] py-3">
            <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#8899AA]">{label}</span>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
}

function MetaRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">{label}</span>
            <span className="text-sm font-medium text-white">{value}</span>
        </div>
    );
}

function QuickActionButton({ icon: Icon, label, iconClass }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; iconClass: string }) {
    return (
        <Button
            type="button"
            variant="ghost"
            className="group flex flex-col items-center justify-center rounded-xl p-3 h-auto text-center"
        >
            <Icon size={20} className={`mx-auto mb-2 text-[#8899AA] transition-colors ${iconClass}`} aria-hidden="true" />
            <span className="text-xs font-bold text-white">{label}</span>
        </Button>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssetDetailPage({ params }: { params: { id: string } }) {
    const asset = {
        id: params.id || "AST-LTP-001",
        name: 'MacBook Pro 16" M2 Max',
        category: "Laptop",
        status: "Assigned" as const,
        serial: "C02F8XYZMD6T",
        brand: "Apple",
        model: "A2485",
        purchaseDate: "Jan 15, 2023",
        purchasePrice: "$3,499.00",
        vendor: "Apple Business",
        warrantyEnds: "Jan 14, 2026",
        location: "New York Office",
        specifications: [
            { label: "Processor", value: "Apple M2 Max (12-core)" },
            { label: "Memory", value: "32GB Unified" },
            { label: "Storage", value: "1TB SSD" },
            { label: "Display", value: "16.2\" Liquid Retina XDR" },
            { label: "OS", value: "macOS Sonoma 14.1" },
            { label: "MAC Address", value: "00:1A:2B:3C:4D:5E" },
        ] as AssetSpec[],
        assignedTo: {
            name: "Sarah Connor",
            role: "Product Designer",
            dept: "Design",
            assignedDate: "Jan 20, 2023",
        },
        history: [
            { date: "Jan 20, 2023", action: "Assigned to Sarah Connor", by: "IT Admin (Mike)" },
            { date: "Jan 16, 2023", action: "Provisioned with Base Image", by: "IT Admin (John)" },
            { date: "Jan 15, 2023", action: "Asset Created & Added to Inventory", by: "System" },
        ] as HistoryEvent[],
    };

    return (
        <Page
            title={asset.name}
            subtitle={`${asset.category} · ${asset.id}`}
            breadcrumbs={[
                { label: "IT", href: "/it/dashboard" },
                { label: "Assets", href: "/it/assets" },
                { label: asset.id },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Link href="/it/assets">
                        <Button variant="outline" icon={<ArrowLeft size={14} aria-hidden="true" />}>
                            Back
                        </Button>
                    </Link>
                    <Button variant="secondary" icon={<PenTool size={14} aria-hidden="true" />}>
                        Edit Asset
                    </Button>
                    {asset.status === "Assigned" ? (
                        <Button variant="secondary" className="text-[#f59e0b] border-[#f59e0b]/30">
                            Return Asset
                        </Button>
                    ) : (
                        <Button>Assign Asset</Button>
                    )}
                </>
            }
        >
            <div className="space-y-8">
                {/* Hero card */}
                <Card padding="lg">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[#1A2A3A] bg-[#060B14]">
                            <Laptop size={48} className="text-[#33E6FF]" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-extrabold text-white">{asset.name}</h2>
                                <Badge variant={asset.status === "Assigned" ? "info" : "success"}>
                                    {asset.status}
                                </Badge>
                            </div>
                            <p className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[#8899AA]">
                                <span className="flex items-center gap-1.5">
                                    <Tag size={14} aria-hidden="true" /> {asset.id}
                                </span>
                                <span className="rounded border border-[#1A2A3A] bg-[#060B14] px-2 py-0.5 font-mono">
                                    SN: {asset.serial}
                                </span>
                            </p>
                            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-4 md:grid-cols-4">
                                <div>
                                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8899AA]">Category</p>
                                    <p className="font-bold text-white">{asset.category}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8899AA]">Brand / Model</p>
                                    <p className="font-bold text-white">{asset.brand} {asset.model}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8899AA]">Location</p>
                                    <p className="flex items-center gap-1 font-bold text-white">
                                        <MapPin size={14} className="text-[#00e5a0]" aria-hidden="true" />
                                        {asset.location}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8899AA]">Condition</p>
                                    <p className="flex items-center gap-1 font-bold text-[#00e5a0]">
                                        <CheckCircle size={14} aria-hidden="true" /> Good
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left — main content */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Current assignment */}
                        <Card padding="lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User size={18} className="text-[#33E6FF]" aria-hidden="true" />
                                    Current Assignment
                                </CardTitle>
                            </CardHeader>
                            {asset.status === "Assigned" && asset.assignedTo ? (
                                <div className="flex items-center gap-6 rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-4">
                                    <div
                                        aria-hidden="true"
                                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#1A2A3A] bg-[#0A1420] text-xl font-black text-white"
                                    >
                                        {asset.assignedTo.name.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-lg font-bold text-white">{asset.assignedTo.name}</p>
                                        <p className="text-sm text-[#8899AA]">{asset.assignedTo.role} · {asset.assignedTo.dept}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8899AA]">Assigned On</p>
                                        <p className="text-sm font-bold text-white">{asset.assignedTo.assignedDate}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-[#1A2A3A] bg-[#060B14] p-8 text-center text-sm text-[#8899AA]">
                                    Asset is currently available in the unassigned pool.
                                </div>
                            )}
                        </Card>

                        {/* Specifications */}
                        <Card padding="lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Laptop size={18} className="text-[#00e5a0]" aria-hidden="true" />
                                    Specifications
                                </CardTitle>
                            </CardHeader>
                            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                                {asset.specifications.map((spec) => (
                                    <SpecRow key={spec.label} label={spec.label} value={spec.value} />
                                ))}
                            </div>
                        </Card>

                        {/* History timeline */}
                        <Card padding="lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History size={18} className="text-[#f59e0b]" aria-hidden="true" />
                                    Lifecycle History
                                </CardTitle>
                            </CardHeader>
                            <ol className="space-y-6" aria-label="Asset lifecycle history">
                                {asset.history.map((evt, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="relative flex flex-col items-center">
                                            <div className="z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#33E6FF] bg-[#1A2A3A]">
                                                <div className="h-1.5 w-1.5 rounded-full bg-[#33E6FF]" />
                                            </div>
                                            {i < asset.history.length - 1 && (
                                                <div className="mt-1 w-0.5 flex-1 bg-[#1A2A3A]" aria-hidden="true" />
                                            )}
                                        </div>
                                        <div className="pb-6">
                                            <p className="text-sm font-bold text-white">{evt.action}</p>
                                            <p className="mt-1 flex flex-wrap gap-3 text-xs text-[#8899AA]">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} aria-hidden="true" /> {evt.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User size={12} aria-hidden="true" /> {evt.by}
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-6">
                        {/* Purchase & warranty */}
                        <Card padding="lg">
                            <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                                <Receipt size={18} className="text-[#33E6FF]" aria-hidden="true" />
                                Purchase Details
                            </h3>
                            <div className="mb-6 space-y-4 border-b border-[#1A2A3A] pb-6">
                                <MetaRow label="Purchase Date" value={asset.purchaseDate} />
                                <MetaRow label="Vendor" value={asset.vendor} />
                                <MetaRow label="Price" value={asset.purchasePrice} />
                            </div>

                            <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                                <ShieldCheck size={18} className="text-[#00e5a0]" aria-hidden="true" />
                                Warranty Info
                            </h3>
                            <div className="rounded-xl border border-[rgba(0,229,160,0.3)] bg-[rgba(0,229,160,0.1)] p-4">
                                <span className="mb-1 block text-xs font-black uppercase tracking-wider text-[#00e5a0]">Active Status</span>
                                <p className="text-sm text-white">Expires: <strong>{asset.warrantyEnds}</strong></p>
                                <p className="mt-2 text-xs text-[#8899AA]">AppleCare+ Enterprise Level Support</p>
                            </div>
                        </Card>

                        {/* Quick actions */}
                        <Card padding="lg">
                            <CardTitle className="mb-4">Quick Actions</CardTitle>
                            <div className="grid grid-cols-2 gap-3">
                                <QuickActionButton icon={PenTool} label="Log Repair" iconClass="group-hover:text-[#33E6FF]" />
                                <QuickActionButton icon={AlertTriangle} label="Write-off" iconClass="group-hover:text-[#ef4444]" />
                                <QuickActionButton icon={Receipt} label="View Invoice" iconClass="group-hover:text-[#00e5a0]" />
                                <QuickActionButton icon={ShieldCheck} label="Claim Warranty" iconClass="group-hover:text-[#f59e0b]" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
