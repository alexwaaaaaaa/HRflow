"use client";

import {
    Fingerprint,
    Upload,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static palette ───────────────────────────────────────────────────────────
type DscStatus = "active" | "expiring";

const DSC_BORDER: Record<DscStatus, string> = {
    active: "border-emerald-500/30",
    expiring: "border-orange-500/30",
};

const DSC_ICON_BG: Record<DscStatus, string> = {
    active: "bg-emerald-500/10 text-emerald-500",
    expiring: "bg-orange-500/10 text-orange-500",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface DscCard {
    id: string;
    name: string;
    role: string;
    classType: string;
    usedFor: string;
    validity: string;
    provider: string;
    status: DscStatus;
    expiryNote?: string;
}

const DSC_CARDS: DscCard[] = [
    {
        id: "dsc-1",
        name: "Abhishek Sharma",
        role: "Director / Authorized Signatory",
        classType: "Class 3 (Org)",
        usedFor: "EPFO, TRACES, MCA",
        validity: "14 Dec 2025",
        provider: "eMudhra Ltd.",
        status: "active",
    },
    {
        id: "dsc-2",
        name: "Sarah Jenkins",
        role: "HR Head / Factory Manager",
        classType: "Class 3 (Org)",
        usedFor: "ESIC, Labour Dept",
        validity: "20 May 2024 (in 9 days)",
        provider: "Sify Tech",
        status: "expiring",
        expiryNote: "Validity Expires",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DigitalSignatureSetup() {
    return (
        <Page
            title="Digital Signatures (DSC)"
            subtitle="Manage Class 3 DSCs and e-Signs for Authorized Signatories."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Digital Signatures" },
            ]}
            maxWidth="1100px"
            actions={
                <Button
                    variant="secondary"
                    icon={<Upload size={16} aria-hidden="true" />}
                >
                    Register New DSC
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {DSC_CARDS.map((dsc) => (
                    <Card
                        key={dsc.id}
                        padding="lg"
                        className={`relative overflow-hidden ${DSC_BORDER[dsc.status]}`}
                    >
                        <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full pointer-events-none"
                            style={{ background: dsc.status === "active" ? "rgba(16,185,129,0.05)" : "rgba(249,115,22,0.05)" }}
                        />
                        <div className="mb-6 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${DSC_ICON_BG[dsc.status]}`}>
                                    <Fingerprint size={24} aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white">{dsc.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        {dsc.role}
                                    </p>
                                </div>
                            </div>
                            {dsc.status === "active" ? (
                                <Badge variant="success">
                                    <CheckCircle size={12} aria-hidden="true" /> Active
                                </Badge>
                            ) : (
                                <Badge variant="warning">
                                    <Clock size={12} aria-hidden="true" /> Expiring Soon
                                </Badge>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Class Type</div>
                                    <div className="text-sm font-black text-white">{dsc.classType}</div>
                                </div>
                                <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Used For</div>
                                    <div className="text-xs font-bold text-slate-300">{dsc.usedFor}</div>
                                </div>
                            </div>
                            <div className={`flex items-center justify-between rounded-xl border p-3 ${dsc.status === "expiring" ? "border-orange-500/20 bg-[#060B14]" : "border-[#1A2A3A] bg-[#060B14]"}`}>
                                <div>
                                    <div className={`mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${dsc.status === "expiring" ? "text-orange-400" : "text-slate-500"}`}>
                                        {dsc.status === "expiring" && <AlertCircle size={10} aria-hidden="true" />}
                                        Validity Expires
                                    </div>
                                    <div className={`text-sm font-black ${dsc.status === "expiring" ? "text-orange-500" : "text-white"}`}>
                                        {dsc.validity}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Provider</div>
                                    <div className="text-sm font-bold text-slate-300">{dsc.provider}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            {dsc.status === "active" ? (
                                <>
                                    <Button variant="secondary" size="sm" className="flex-1">Verify Map</Button>
                                    <Button variant="danger" size="sm" className="flex-1">Revoke</Button>
                                </>
                            ) : (
                                <Button variant="primary" size="sm" className="flex-1">Initiate Renewal</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </Page>
    );
}
