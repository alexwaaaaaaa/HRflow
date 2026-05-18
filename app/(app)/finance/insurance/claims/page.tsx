"use client";

import { Stethoscope, CheckCircle2, Clock, ShieldAlert, Plus } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type ClaimStatus = "Approved" | "Processing" | "Rejected";

interface Claim {
    id: string;
    patient: string;
    type: string;
    amount: number;
    date: string;
    hospital: string;
    status: ClaimStatus;
    tag: string;
    reason?: string;
}

const CLAIMS: Claim[] = [
    { id: "CLM-881920", patient: "Rohan Sharma (Spouse)", type: "Cashless", amount: 150000, date: "15 Oct 2025", hospital: "Apollo Hospitals", status: "Approved", tag: "GMC" },
    { id: "CLM-881554", patient: "Ananya Sharma (Self)", type: "Reimbursement", amount: 12500, date: "02 Sep 2025", hospital: "Fortis Clinic", status: "Processing", tag: "GMC" },
    { id: "CLM-881021", patient: "Aarav Sharma (Child)", type: "Cashless", amount: 45000, date: "12 May 2025", hospital: "Max Super Specialty", status: "Rejected", tag: "GMC", reason: "OPD Not Covered" },
];

const KPI_TILES = [
    { label: "Total Claims Filed", value: "3", sub: "Since Jan 2025", valueColor: "text-white" },
    { label: "Amount Approved (YTD)", value: "₹1,50,000", sub: "Across 1 claim", valueColor: "text-emerald-400" },
    { label: "In Processing", value: "1", sub: "Pending TPA Review", valueColor: "text-amber-400" },
] as const;

const COLUMNS: Column<Claim>[] = [
    {
        key: "id", label: "Claim ID / Date", render: (c) => (
            <div>
                <div className="font-mono text-indigo-400 font-medium">{c.id}</div>
                <div className="text-xs text-[#8899AA] mt-1">{c.date}</div>
            </div>
        ),
    },
    {
        key: "patient", label: "Patient / Hospital", render: (c) => (
            <div>
                <div className="text-white font-medium">{c.patient}</div>
                <div className="text-[#8899AA] text-xs mt-0.5 flex items-center gap-1">
                    <Stethoscope size={12} aria-hidden="true" /> {c.hospital}
                </div>
            </div>
        ),
    },
    {
        key: "type", label: "Type", render: (c) => (
            <div>
                <span className="text-white">{c.type}</span>
                <div className="text-[10px] text-[#8899AA] mt-0.5">{c.tag}</div>
            </div>
        ),
    },
    { key: "amount", label: "Amount Claimed", align: "right", render: (c) => <span className="text-white font-bold">₹{c.amount.toLocaleString()}</span> },
    {
        key: "status", label: "Status", align: "center",
        render: (c) => {
            if (c.status === "Approved") return <Badge variant="success"><CheckCircle2 size={12} className="inline mr-1" aria-hidden="true" />Settled</Badge>;
            if (c.status === "Processing") return <Badge variant="warning"><Clock size={12} className="inline mr-1" aria-hidden="true" />Under Review</Badge>;
            return (
                <div className="flex flex-col items-center gap-1">
                    <Badge variant="danger"><ShieldAlert size={12} className="inline mr-1" aria-hidden="true" />Rejected</Badge>
                    {c.reason && <span className="text-[10px] text-[#8899AA]">{c.reason}</span>}
                </div>
            );
        },
    },
    {
        key: "actions", label: "Actions", align: "center",
        render: (c) => (
            <Link href="/finance/insurance/claims/tracking" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium" aria-label={`Track claim ${c.id}`}>Track</Link>
        ),
    },
];

export default function ClaimsHistoryPage() {
    return (
        <Page
            title="Claims Center"
            subtitle="Track the status of your cashless and reimbursement insurance claims."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Insurance", href: "/finance/insurance/policy" },
                { label: "Claims History" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={14} />}>File New Claim</Button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {KPI_TILES.map((tile) => (
                    <Card key={tile.label} padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{tile.label}</p>
                        <h3 className={`text-2xl font-bold mb-1 ${tile.valueColor}`}>{tile.value}</h3>
                        <p className="text-xs text-[#8899AA]">{tile.sub}</p>
                    </Card>
                ))}
            </div>

            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A] flex gap-2">
                    <Button variant="secondary" size="sm">All Claims</Button>
                    <Button variant="ghost" size="sm">Cashless</Button>
                    <Button variant="ghost" size="sm">Reimbursement</Button>
                </div>
                <div className="p-4">
                    <DataTable<Claim>
                        data={CLAIMS}
                        columns={COLUMNS}
                        rowKey={(c) => c.id}
                        aria-label="Insurance claims history"
                        emptyTitle="No claims filed"
                        emptyDescription="File a new claim to get started."
                    />
                </div>
            </Card>
        </Page>
    );
}
