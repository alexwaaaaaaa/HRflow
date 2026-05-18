"use client";

import {
    UploadCloud,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type AadharStatus = "Verified" | "Pending";

const AADHAR_BADGE: Record<AadharStatus, BadgeVariant> = {
    Verified: "success",
    Pending: "warning",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface JoinerRow {
    id: string;
    name: string;
    empId: string;
    doj: string;
    aadhar: AadharStatus;
    pre: string;
}

const JOINERS: JoinerRow[] = [
    { id: "j1", name: "Ajit Singh", empId: "EMP-905", doj: "02 Apr 2024", aadhar: "Verified", pre: "None" },
    { id: "j2", name: "Nisha Patil", empId: "EMP-906", doj: "03 Apr 2024", aadhar: "Verified", pre: "None" },
    { id: "j3", name: "Kabir Das", empId: "EMP-907", doj: "05 Apr 2024", aadhar: "Pending", pre: "None" },
    { id: "j4", name: "Lalit Ram", empId: "EMP-908", doj: "10 Apr 2024", aadhar: "Verified", pre: "Likely Has Old IP" },
];

const COLUMNS: Column<JoinerRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.name}</div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">{r.empId}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "doj",
        label: "DOJ",
        render: (r) => <span className="text-xs font-bold text-slate-400">{r.doj}</span>,
    },
    {
        key: "aadhar",
        label: "Aadhar / Pre-existing",
        render: (r) => (
            <div className="flex flex-col gap-1">
                <Badge variant={AADHAR_BADGE[r.aadhar]}>{r.aadhar}</Badge>
                {r.pre !== "None" && (
                    <span className="text-[8px] font-black uppercase tracking-widest text-rose-500">{r.pre}</span>
                )}
            </div>
        ),
    },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: (r) => (
            <Button
                variant="ghost"
                size="sm"
                disabled={r.aadhar !== "Verified"}
            >
                Register
            </Button>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ESICIPNumber() {
    return (
        <Page
            title="ESIC IP Number Generation"
            subtitle="Insured Person (IP) Number registration for new joiners."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "ESIC IP Number" },
            ]}
            maxWidth="1280px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <div className="space-y-6 lg:col-span-3">
                    <Card padding="none">
                        <div className="border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                Pending IP Registration
                            </h2>
                        </div>
                        <div className="p-4">
                            <DataTable<JoinerRow>
                                data={JOINERS}
                                columns={COLUMNS}
                                rowKey={(r) => r.id}
                                searchable
                                searchPlaceholder="Search Joiners..."
                                aria-label="Pending ESIC IP registrations"
                                emptyTitle="No pending registrations"
                            />
                        </div>
                        <div className="border-t border-[#1A2A3A] bg-[#060B14] p-4">
                            <Button
                                variant="primary"
                                className="w-full"
                                icon={<UploadCloud size={16} aria-hidden="true" />}
                            >
                                Download ESIC Portal Excel Format
                            </Button>
                        </div>
                    </Card>
                </div>

                <Card padding="md">
                    <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">ESIC Quick Rules</h3>
                    <ul className="space-y-3 text-[10px] font-medium italic leading-relaxed text-slate-300">
                        <li>• Mandatory for employees earning up to ₹21,000 gross.</li>
                        <li>• Registration must be done within 10 days of DOJ.</li>
                        <li>• Do not generate new IP if employee already has one from a previous job. Just link the existing IP to your employer code.</li>
                    </ul>
                </Card>
            </div>
        </Page>
    );
}
