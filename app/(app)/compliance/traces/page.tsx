"use client";

import {
    Download,
    RefreshCw,
    CheckCircle,
    Key,
    FileText,
    Database,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type ApiStatus = "Success" | "Failed";

const API_BADGE: Record<ApiStatus, BadgeVariant> = {
    Success: "success",
    Failed: "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ApiLog {
    id: string;
    type: string;
    timestamp: string;
    status: ApiStatus;
    details: string;
}

const API_LOGS: ApiLog[] = [
    { id: "l1", type: "Verify PAN List (42)", timestamp: "12 Apr 2024, 10:15 AM", status: "Success", details: "42 Valid, 0 Invalid" },
    { id: "l2", type: "Download CSI File", timestamp: "10 Apr 2024, 02:30 PM", status: "Success", details: "Matched 3 Challans" },
    { id: "l3", type: "Form 16 Request", timestamp: "09 Apr 2024, 11:00 AM", status: "Failed", details: "ERR_AUTH_TOKEN_EXP" },
];

const COLUMNS: Column<ApiLog>[] = [
    {
        key: "type",
        label: "Request Type",
        render: (r) => <span className="text-xs font-black text-white">{r.type}</span>,
    },
    {
        key: "timestamp",
        label: "Timestamp",
        render: (r) => <span className="text-[10px] text-slate-400">{r.timestamp}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={API_BADGE[r.status]}>{r.status}</Badge>,
    },
    {
        key: "details",
        label: "Details",
        render: (r) => (
            <span className={`text-xs font-bold ${r.status === "Failed" ? "font-mono text-rose-400" : "text-slate-300"}`}>
                {r.details}
            </span>
        ),
    },
];

// ─── Action cards ─────────────────────────────────────────────────────────────
const ACTION_CARDS = [
    {
        id: "pan",
        title: "Bulk PAN Verification",
        desc: "Validate employee PANs against TRACES DB prior to TDS filing.",
        icon: Database,
        iconColor: "text-purple-500",
        footer: "Last Sync: 12 Apr",
        footerIcon: RefreshCw,
        footerColor: "text-purple-500",
        hoverBorder: "hover:border-purple-500/50",
    },
    {
        id: "form16",
        title: "Form 16 Bulk Request",
        desc: "Initiate download request for Part A/B for all active employees.",
        icon: FileText,
        iconColor: "text-blue-500",
        footer: "Ready for FY23-24",
        footerIcon: Download,
        footerColor: "text-blue-500",
        hoverBorder: "hover:border-blue-500/50",
    },
    {
        id: "csi",
        title: "CSI File Auto-Sync",
        desc: "Fetch Challan Status Inquiry file automatically for FVU validation.",
        icon: Download,
        iconColor: "text-emerald-500",
        footer: "",
        footerIcon: null,
        footerColor: "",
        hoverBorder: "hover:border-emerald-500/50",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TracesIntegration() {
    return (
        <Page
            title="TRACES Integration"
            subtitle="Directly sync PAN verification, Form 16s, and Justification Reports from TRACES."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "TRACES" },
            ]}
            maxWidth="1280px"
            actions={
                <Badge variant="success">
                    <CheckCircle size={10} aria-hidden="true" /> API Connected
                </Badge>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Actions and status */}
                <div className="space-y-6 lg:col-span-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {ACTION_CARDS.map((ac) => {
                            const Icon = ac.icon;
                            const FooterIcon = ac.footerIcon;
                            return (
                                <Card
                                    key={ac.id}
                                    padding="lg"
                                    className={`cursor-pointer transition-colors ${ac.hoverBorder}`}
                                >
                                    <div className="space-y-4">
                                        <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 w-max">
                                            <Icon size={24} className={ac.iconColor} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-sm font-black uppercase tracking-widest text-white">{ac.title}</h3>
                                            <p className="text-[10px] font-bold italic leading-relaxed text-slate-500">{ac.desc}</p>
                                        </div>
                                        {ac.footer && FooterIcon && (
                                            <div className={`flex items-center justify-between pt-2 text-[9px] font-black uppercase tracking-widest ${ac.footerColor}`}>
                                                <span>{ac.footer}</span>
                                                <FooterIcon size={12} aria-hidden="true" />
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* API logs */}
                    <Card padding="none">
                        <div className="border-b border-[#1A2A3A] bg-[#060B14]/50 p-4">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white">Recent API Transactions</h2>
                        </div>
                        <div className="p-4">
                            <DataTable<ApiLog>
                                data={API_LOGS}
                                columns={COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="TRACES API transaction logs"
                                emptyTitle="No API logs found"
                            />
                        </div>
                    </Card>
                </div>

                {/* Auth config */}
                <Card padding="md">
                    <h3 className="mb-4 flex items-center gap-2 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        <Key size={14} aria-hidden="true" /> Authentication
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: "TAN Number", value: "BLRK01982E" },
                            { label: "TRACES User ID", value: "hrflow_b2b_api" },
                            { label: "Password", value: "••••••••", type: "password" },
                        ].map((f) => (
                            <div key={f.label}>
                                <label className="mb-1 block text-[9px] font-black uppercase tracking-widest text-slate-500">
                                    {f.label}
                                </label>
                                <input
                                    type={f.type ?? "text"}
                                    defaultValue={f.value}
                                    disabled
                                    className="w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] p-2 font-mono text-xs text-white opacity-70"
                                    aria-label={f.label}
                                />
                            </div>
                        ))}
                        <Button variant="ghost" size="sm" className="mt-4 w-full">Update Credentials</Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
