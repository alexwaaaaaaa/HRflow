"use client";

import { useState } from "react";
import {
    MoveRight,
    Clock,
    CheckCircle,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type ActivationStatus = "Activated" | "Pending by Emp";

const ACT_BADGE: Record<ActivationStatus, BadgeVariant> = {
    Activated: "success",
    "Pending by Emp": "warning",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface TransferRow {
    id: string;
    name: string;
    uan: string;
    old: string;
    newEst: string;
}

interface ActivationRow {
    id: string;
    name: string;
    doj: string;
    status: string;
    uan: string;
    act: ActivationStatus;
}

const TRANSFERS: TransferRow[] = [
    { id: "t1", name: "Sameer Khan", uan: "100456789030", old: "M/S Tech Mahindra (PUNE)", newEst: "Kaarya Tech (MUMBAI)" },
    { id: "t2", name: "Aditi Rao", uan: "100456789031", old: "Wipro Ltd (BLR)", newEst: "Kaarya Tech (MUMBAI)" },
];

const ACTIVATIONS: ActivationRow[] = [
    { id: "a1", name: "Mohit Sharma", doj: "15 Apr 2024", status: "Generated", uan: "100456789040", act: "Pending by Emp" },
    { id: "a2", name: "Anjali Verma", doj: "15 Apr 2024", status: "Generated", uan: "100456789041", act: "Activated" },
    { id: "a3", name: "Rohan Gupta", doj: "15 Apr 2024", status: "Pre-existing", uan: "100456789042", act: "Activated" },
];

const TRANSFER_COLUMNS: Column<TransferRow>[] = [
    {
        key: "employee",
        label: "Employee Details",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.name}</div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">UAN: {r.uan}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "old",
        label: "Transfer From (Old Est.)",
        render: (r) => <div className="text-[10px] font-bold leading-tight text-slate-400">{r.old}</div>,
    },
    {
        key: "new",
        label: "Transfer To (New Est.)",
        render: (r) => <div className="text-[10px] font-bold leading-tight text-blue-400">{r.newEst}</div>,
    },
    {
        key: "attest",
        label: "Attest",
        align: "center",
        render: () => <Button variant="primary" size="sm">DSC Sign</Button>,
    },
];

const ACTIVATION_COLUMNS: Column<ActivationRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.name}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">DOJ: {r.doj}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "uan",
        label: "UAN Status",
        render: (r) => (
            <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{r.status}</div>
                <div className="font-mono text-[10px] text-slate-500">{r.uan}</div>
            </div>
        ),
    },
    {
        key: "act",
        label: "Activation Status",
        render: (r) => (
            <Badge variant={ACT_BADGE[r.act]}>
                {r.act === "Activated" ? <CheckCircle size={10} aria-hidden="true" /> : <Clock size={10} aria-hidden="true" />}
                {r.act}
            </Badge>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PFTransferAndActivation() {
    const [activeTab, setActiveTab] = useState<"transfer" | "activation">("transfer");

    return (
        <Page
            title={activeTab === "transfer" ? "Form 13 Transfer Approval" : "UAN Activation Tracker"}
            subtitle={
                activeTab === "transfer"
                    ? "Attest transfer requests coming from previous employer or joining new employer."
                    : "Monitor Aadhar OTP based UAN activation for new joiners."
            }
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PF Transfer & Activation" },
            ]}
            maxWidth="1280px"
        >
            <div className="space-y-6">
                {/* Tab switcher */}
                <div className="flex gap-1 rounded-xl border border-[#1A2A3A] bg-[#0D1928] p-1 w-max">
                    <Button
                        variant={activeTab === "transfer" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("transfer")}
                    >
                        PF Transfer (Form 13)
                    </Button>
                    <Button
                        variant={activeTab === "activation" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("activation")}
                    >
                        UAN Activation
                    </Button>
                </div>

                {activeTab === "transfer" ? (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-3">
                            <Card padding="none">
                                <div className="border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                        Pending Transfer Requests (Online)
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <DataTable<TransferRow>
                                        data={TRANSFERS}
                                        columns={TRANSFER_COLUMNS}
                                        rowKey={(r) => r.id}
                                        searchable
                                        searchPlaceholder="Search Request..."
                                        aria-label="PF transfer requests"
                                        emptyTitle="No pending transfers"
                                    />
                                </div>
                            </Card>
                        </div>
                        <Card padding="md">
                            <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                Transfer Rules
                            </h3>
                            <p className="mb-4 text-[11px] italic leading-relaxed text-slate-400">
                                Online PF transfers can be attested by either the present employer OR the previous employer depending on
                                how the employee routed the request.
                            </p>
                            <div className="flex items-center gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 text-[10px] font-medium">
                                <MoveRight size={14} className="shrink-0 text-blue-500" aria-hidden="true" />
                                <span>Always advise new joiners to route requests to PRESENT employer for faster processing.</span>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-3">
                            <Card padding="none">
                                <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                        Activation Status (Recent Joiners)
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={<Clock size={14} aria-hidden="true" />}
                                    >
                                        Send Reminders
                                    </Button>
                                </div>
                                <div className="p-4">
                                    <DataTable<ActivationRow>
                                        data={ACTIVATIONS}
                                        columns={ACTIVATION_COLUMNS}
                                        rowKey={(r) => r.id}
                                        aria-label="UAN activation status"
                                        emptyTitle="No activation records"
                                    />
                                </div>
                            </Card>
                        </div>
                        <Card padding="md">
                            <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                Why Activate?
                            </h3>
                            <p className="mb-4 text-[11px] italic leading-relaxed text-slate-400">
                                Employees must activate their UAN using Aadhar-linked mobile number to access passbook, file
                                e-nomination, or submit withdrawal/advance claims.
                            </p>
                            <Button variant="primary" size="sm" className="w-full">Copy Activation Link</Button>
                        </Card>
                    </div>
                )}
            </div>
        </Page>
    );
}
