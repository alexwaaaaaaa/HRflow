"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Building, Users, MapPin, MoreVertical } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types & static data ──────────────────────────────────────────────────────

type EntityStatus = "Active" | "Draft";

interface Entity {
    id: string;
    name: string;
    type: string;
    loc: string;
    emp: number;
    status: EntityStatus;
    dotCls: string;
    iconCls: string;
}

const ENTITIES: Entity[] = [
    {
        id: "ENT-001",
        name: "Acme Technologies Pvt Ltd",
        type: "Parent Company",
        loc: "Bengaluru, KA",
        emp: 342,
        status: "Active",
        dotCls: "bg-[#4f46e5]/10 text-[#818cf8]",
        iconCls: "text-[#818cf8]",
    },
    {
        id: "ENT-002",
        name: "Acme Retail Solutions",
        type: "Subsidiary",
        loc: "Mumbai, MH",
        emp: 128,
        status: "Active",
        dotCls: "bg-blue-500/10 text-blue-400",
        iconCls: "text-blue-400",
    },
    {
        id: "ENT-003",
        name: "Acme Logistics India",
        type: "Subsidiary",
        loc: "Delhi, DL",
        emp: 85,
        status: "Active",
        dotCls: "bg-emerald-500/10 text-emerald-400",
        iconCls: "text-emerald-400",
    },
    {
        id: "ENT-004",
        name: "Acme Global Ventures LLC",
        type: "Foreign Sub",
        loc: "Delaware, US",
        emp: 12,
        status: "Active",
        dotCls: "bg-purple-500/10 text-purple-400",
        iconCls: "text-purple-400",
    },
    {
        id: "ENT-005",
        name: "Acme Innovations Labs",
        type: "Joint Venture",
        loc: "Pune, MH",
        emp: 0,
        status: "Draft",
        dotCls: "bg-[#1A2A3A] text-[#8899AA]",
        iconCls: "text-[#8899AA]",
    },
];

const STATUS_VARIANT: Record<EntityStatus, "success" | "neutral"> = {
    Active: "success",
    Draft: "neutral",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function EntityCard({ entity }: { entity: Entity }) {
    return (
        <article className="relative flex h-full flex-col rounded-2xl border border-[#2A3A4A] bg-[#0D1928] p-6 transition-colors hover:border-[#4f46e5]/50">
            <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-4"
                aria-label={`More actions for ${entity.name}`}
                icon={<MoreVertical size={16} />}
            />

            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${entity.dotCls}`}>
                <Building size={24} aria-hidden="true" />
            </div>

            <Link
                href={`/multi-entity/settings?id=${entity.id}`}
                className={`mb-1 block text-lg font-bold text-white transition-colors hover:text-[#818cf8] ${entity.iconCls}`}
            >
                {entity.name}
            </Link>
            <div className="mb-6 flex items-center gap-2 text-xs text-[#8899AA]">
                <span className="rounded bg-[#1A2A3A] px-2 py-0.5 font-mono">{entity.id}</span>
                <span>•</span>
                <span>{entity.type}</span>
            </div>

            <dl className="mt-auto w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <dt className="flex items-center gap-2 text-[#556677]">
                        <MapPin size={14} aria-hidden="true" /> Location
                    </dt>
                    <dd className="font-medium text-white">{entity.loc}</dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <dt className="flex items-center gap-2 text-[#556677]">
                        <Users size={14} aria-hidden="true" /> Headcount
                    </dt>
                    <dd className="font-medium text-white">{entity.emp} Active</dd>
                </div>
            </dl>

            <div className="mt-6 flex items-center justify-between border-t border-[#2A3A4A] pt-4">
                <Badge variant={STATUS_VARIANT[entity.status]}>{entity.status}</Badge>
                <Link
                    href={`/multi-entity/dashboard?id=${entity.id}`}
                    className="flex items-center gap-1 text-xs font-bold text-[#AABBCC] transition-colors hover:text-white"
                >
                    View Dash →
                </Link>
            </div>
        </article>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EntityListPage() {
    const [search, setSearch] = useState("");

    const filtered = search
        ? ENTITIES.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
        : ENTITIES;

    return (
        <Page
            title="Group Entities"
            subtitle="Manage multiple companies, subsidiaries, and joint ventures under one roof"
            breadcrumbs={[{ label: "Multi-Entity" }]}
            maxWidth="1400px"
            actions={
                <Button icon={<Plus size={14} />} href="/multi-entity/add">Add New Entity</Button>
            }
        >
            <Card padding="none">
                {/* Table header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-3">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-white">All Entities ({ENTITIES.length})</span>
                        <span className="h-4 w-px bg-[#2A3A4A]" aria-hidden="true" />
                        <span className="text-sm text-[#8899AA]">
                            Total Group Headcount:{" "}
                            <strong className="text-white">
                                {ENTITIES.reduce((s, e) => s + e.emp, 0)}
                            </strong>
                        </span>
                    </div>
                    <div className="relative w-64">
                        <label htmlFor="entity-search" className="sr-only">
                            Search entities
                        </label>
                        <input
                            id="entity-search"
                            type="search"
                            placeholder="Search entity…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 w-full rounded-lg border border-[#1A2A3A] bg-[#0D1928] pl-3 pr-3 text-xs text-white outline-none placeholder:text-[#7a8fa6] focus:border-[#00e5a0]"
                        />
                    </div>
                </div>

                {/* Entity grid */}
                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((entity) => (
                        <EntityCard key={entity.id} entity={entity} />
                    ))}

                    {/* Add entity card */}
                    <Link
                        href="/multi-entity/add"
                        className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2A3A4A] p-6 text-center transition-colors hover:border-[#4f46e5]/50 hover:bg-[#0D1928]"
                        aria-label="Add a new sub-entity"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#556677] text-[#556677]">
                            <Plus size={24} aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Add Sub-Entity</h3>
                        <p className="mt-2 max-w-[200px] text-sm text-[#8899AA]">
                            Create an independent org structure that rolls up to the parent.
                        </p>
                    </Link>
                </div>
            </Card>
        </Page>
    );
}
