"use client";

import { useState } from "react";
import { Laptop, Monitor, Smartphone, Server, Plus, Download } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Types & static data ──────────────────────────────────────────────────────

type AssetStatus = "Available" | "Assigned" | "In Repair" | "Write-off";
type AssetCategory = "Laptop" | "Monitor" | "Mobile" | "Server";

interface Asset {
    id: string;
    name: string;
    category: AssetCategory;
    serial: string;
    assignedTo: string | null;
    status: AssetStatus;
    purchaseDate: string;
}

const ASSETS: Asset[] = [
    { id: "AST-LTP-001", name: 'MacBook Pro 16" M2', category: "Laptop", serial: "C02F8XYZMD6T", assignedTo: "Sarah Connor", status: "Assigned", purchaseDate: "2023-01-15" },
    { id: "AST-LTP-002", name: "ThinkPad X1 Carbon", category: "Laptop", serial: "PF3W8XYZ", assignedTo: null, status: "Available", purchaseDate: "2023-02-20" },
    { id: "AST-MON-012", name: 'Dell UltraSharp 27"', category: "Monitor", serial: "CN-0XJ1XYZ", assignedTo: "John Smith", status: "Assigned", purchaseDate: "2022-11-05" },
    { id: "AST-MOB-005", name: "iPhone 14 Pro", category: "Mobile", serial: "F17H8XYZHXY", assignedTo: null, status: "In Repair", purchaseDate: "2023-03-10" },
    { id: "AST-LTP-008", name: "MacBook Air M2", category: "Laptop", serial: "C02G8XYZMD6X", assignedTo: "Maria Garcia", status: "Assigned", purchaseDate: "2023-05-12" },
    { id: "AST-SRV-002", name: "Dell PowerEdge R740", category: "Server", serial: "8XYZ123", assignedTo: null, status: "Available", purchaseDate: "2021-08-20" },
    { id: "AST-MON-015", name: 'LG 34" UltraWide', category: "Monitor", serial: "304NTXYZ123", assignedTo: null, status: "Write-off", purchaseDate: "2020-01-10" },
];

const STATUS_VARIANT: Record<AssetStatus, "success" | "info" | "warning" | "danger"> = {
    Available: "success",
    Assigned: "info",
    "In Repair": "warning",
    "Write-off": "danger",
};

const CATEGORY_ICON: Record<AssetCategory, React.ComponentType<{ size?: number; className?: string }>> = {
    Laptop: Laptop,
    Monitor: Monitor,
    Mobile: Smartphone,
    Server: Server,
};

const CATEGORIES: Array<"All" | AssetCategory> = ["All", "Laptop", "Monitor", "Mobile", "Server"];
const STATUSES: Array<"All" | AssetStatus> = ["All", "Available", "Assigned", "In Repair", "Write-off"];

// ─── Table columns ────────────────────────────────────────────────────────────

function buildColumns(): Column<Asset>[] {
    return [
        {
            key: "id",
            label: "Asset ID",
            render: (a) => (
                <Link href={`/it/assets/${a.id}`} className="font-bold text-[#33E6FF] hover:underline text-sm">
                    {a.id}
                </Link>
            ),
            sortable: true,
            sortValue: (a) => a.id,
        },
        {
            key: "hardware",
            label: "Hardware",
            render: (a) => (
                <div>
                    <p className="text-sm font-bold text-white">{a.name}</p>
                    <p className="text-xs text-[#8899AA]">Purchased: {a.purchaseDate}</p>
                </div>
            ),
            sortable: true,
            sortValue: (a) => a.name,
        },
        {
            key: "category",
            label: "Category",
            render: (a) => {
                const Icon = CATEGORY_ICON[a.category];
                return (
                    <span className="flex items-center gap-2 text-sm text-[#8899AA]">
                        <Icon size={14} aria-hidden="true" />
                        {a.category}
                    </span>
                );
            },
        },
        {
            key: "serial",
            label: "Serial Number",
            render: (a) => <span className="font-mono text-sm text-[#8899AA]">{a.serial}</span>,
            hideOnMobile: true,
        },
        {
            key: "status",
            label: "Status",
            align: "center",
            render: (a) => <Badge variant={STATUS_VARIANT[a.status]}>{a.status}</Badge>,
        },
        {
            key: "assignedTo",
            label: "Assigned To",
            render: (a) =>
                a.assignedTo ? (
                    <div className="flex items-center gap-2">
                        <div
                            aria-hidden="true"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-[10px] font-bold text-white"
                        >
                            {a.assignedTo.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium text-white">{a.assignedTo}</span>
                    </div>
                ) : (
                    <span className="text-sm italic text-[#445566]">Unassigned</span>
                ),
        },
        {
            key: "actions",
            label: "",
            align: "right",
            render: (a) => (
                <div className="flex items-center justify-end gap-2">
                    {a.status === "Available" && (
                        <Button size="sm" variant="primary" href={`/it/assets/assign?asset=${a.id}`}>Assign</Button>
                    )}
                    {a.status === "Assigned" && (
                        <Button size="sm" variant="secondary" href={`/it/assets/return?asset=${a.id}`}>Return</Button>
                    )}
                    <Button size="sm" variant="outline" href={`/it/assets/${a.id}`}>View</Button>
                </div>
            ),
        },
    ];
}

const COLUMNS = buildColumns();

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AssetListPage() {
    const [filterCategory, setFilterCategory] = useState<"All" | AssetCategory>("All");
    const [filterStatus, setFilterStatus] = useState<"All" | AssetStatus>("All");

    const filtered = ASSETS.filter(
        (a) =>
            (filterCategory === "All" || a.category === filterCategory) &&
            (filterStatus === "All" || a.status === filterStatus)
    );

    return (
        <Page
            title="Asset Inventory"
            subtitle="Manage your hardware inventory, track lifecycles, and check availabilities"
            breadcrumbs={[{ label: "IT", href: "/it/dashboard" }, { label: "Assets" }]}
            maxWidth="1400px"
            actions={
                <>






                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Export CSV
                    </Button>
                    <Button icon={<Plus size={14} aria-hidden="true" />} href="/it/assets/add">Add Asset</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Filters */}
                <Card padding="md">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Category filter */}
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                            {CATEGORIES.map((cat) => {
                                const active = filterCategory === cat;
                                return (
                                    <Button
                                        key={cat}
                                        variant={active ? "secondary" : "ghost"}
                                        size="sm"
                                        aria-pressed={active}
                                        onClick={() => setFilterCategory(cat)}
                                        className={active ? "border-[#33E6FF] text-[#33E6FF]" : ""}
                                    >
                                        {cat}
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Status filter */}
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
                            {STATUSES.map((s) => {
                                const active = filterStatus === s;
                                return (
                                    <Button
                                        key={s}
                                        variant={active ? "secondary" : "ghost"}
                                        size="sm"
                                        aria-pressed={active}
                                        onClick={() => setFilterStatus(s)}
                                        className={active ? "border-[#00e5a0] text-[#00e5a0]" : ""}
                                    >
                                        {s}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </Card>

                {/* Table */}
                <Card padding="none">
                    <DataTable<Asset>
                        data={filtered}
                        columns={COLUMNS}
                        rowKey={(a) => a.id}
                        searchable
                        searchPlaceholder="Search by ID, name, serial…"
                        aria-label="Asset inventory"
                        emptyTitle="No assets found"
                        emptyDescription="Try adjusting your filters or search term."
                    />
                </Card>
            </div>
        

        

        

        </Page>
    );
}
