"use client";

import { useState } from "react";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface CompOffRequest {
    id: string;
    empName: string;
    initials: string;
    dept: string;
    dateWorked: string;
    hours: number;
    credit: string;
    reason: string;
}

const INITIAL_REQUESTS: CompOffRequest[] = [
    {
        id: "CO-912",
        empName: "Rohan Sharma",
        initials: "RS",
        dept: "Engineering",
        dateWorked: "10 Nov 2024 (Sunday)",
        hours: 8,
        credit: "1 Full Day",
        reason: "Emergency hotfix deployment.",
    },
    {
        id: "CO-914",
        empName: "David Chen",
        initials: "DC",
        dept: "Sales",
        dateWorked: "03 Nov 2024 (Sunday)",
        hours: 4.5,
        credit: "0.5 Half Day",
        reason: "Client meeting during US timezone.",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CompOffApprovalsPage() {
    const toast = useToast();
    const [requests, setRequests] = useState(INITIAL_REQUESTS);
    const [busy, setBusy] = useState<string | null>(null);

    const act = async (req: CompOffRequest, decision: "approve" | "reject") => {
        setBusy(req.id);
        try {
            // TODO: replace with real mutation
            await new Promise((r) => setTimeout(r, 500));
            setRequests((prev) => prev.filter((r) => r.id !== req.id));
            toast.show({
                variant: decision === "approve" ? "success" : "warning",
                title: decision === "approve" ? "Comp-off approved" : "Comp-off rejected",
                description: `${req.empName}'s comp-off request (${req.credit}) has been ${decision}d.`,
            });
        } finally {
            setBusy(null);
        }
    };

    return (
        <Page
            title="Comp-off Approvals"
            subtitle="Review and approve compensatory leave claims from your team"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Comp-off Approvals" },
            ]}
            maxWidth="1000px"
        >
            {requests.length === 0 ? (
                <Card padding="lg" className="text-center">
                    <CheckCircle className="mx-auto mb-3 h-12 w-12 text-[#00e5a0]" aria-hidden="true" />
                    <p className="text-sm font-semibold text-white">All caught up</p>
                    <p className="mt-1 text-xs text-[#7a8fa6]">No pending comp-off requests.</p>
                </Card>
            ) : (
                <ul className="space-y-6" aria-label="Pending comp-off requests">
                    {requests.map((req) => (
                        <li key={req.id}>
                            <Card padding="lg">
                                {/* Header */}
                                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            aria-hidden="true"
                                            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-lg font-bold text-white"
                                        >
                                            {req.initials}
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-white">{req.empName}</p>
                                            <p className="text-xs text-[#8899AA]">{req.dept} · {req.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-4 py-2">
                                        <Clock size={16} className="text-[#0066FF]" aria-hidden="true" />
                                        <span className="text-sm text-[#8899AA]">Worked:</span>
                                        <span className="font-bold font-mono text-white">{req.hours} Hrs</span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-4">
                                        <p className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#556677]">
                                            Date Worked On
                                        </p>
                                        <p className="text-sm font-bold text-white">{req.dateWorked}</p>
                                    </div>
                                    <div className="rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-4">
                                        <p className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#556677]">
                                            Calculated Credit
                                        </p>
                                        <Badge variant="success" className="text-lg font-black">
                                            +{req.credit}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Justification */}
                                <div className="mb-6 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4">
                                    <div className="flex items-start gap-3 text-sm">
                                        <FileText size={16} className="mt-0.5 shrink-0 text-[#8899AA]" aria-hidden="true" />
                                        <div>
                                            <p className="mb-1 font-bold text-[#8899AA]">Work Justification</p>
                                            <p className="italic text-white">&ldquo;{req.reason}&rdquo;</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A2A3A] pt-5">
                                    <p className="text-xs text-[#556677]">
                                        If approved, {req.credit} will be added to {req.empName.split(" ")[0]}&apos;s Comp-off balance immediately.
                                    </p>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="danger"
                                            icon={<XCircle size={16} aria-hidden="true" />}
                                            isLoading={busy === req.id}
                                            onClick={() => act(req, "reject")}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            icon={<CheckCircle size={16} aria-hidden="true" />}
                                            isLoading={busy === req.id}
                                            onClick={() => act(req, "approve")}
                                        >
                                            Approve Credit
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </Page>
    );
}
