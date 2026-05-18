"use client";

import { Calendar, MessageSquare, Check, XCircle, Target, Navigation } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─── Types & static data ──────────────────────────────────────────────────────

interface FieldRequest {
    id: string;
    empName: string;
    empId: string;
    dept: string;
    date: string;
    client: string;
    location: string;
    duration: string;
    reason: string;
}

const REQUESTS: FieldRequest[] = [
    {
        id: "1",
        empName: "Rohan Sharma",
        empId: "EMP124",
        dept: "Sales",
        date: "08 Nov 2024",
        client: "Acme Corp HQ",
        location: "Navi Mumbai",
        duration: "Full Day",
        reason: "Q4 Contract Renewal negotiation",
    },
    {
        id: "2",
        empName: "Aditi Jain",
        empId: "EMP044",
        dept: "Operations",
        date: "07 Nov 2024",
        client: "Warehouse Site-B",
        location: "Bhiwandi Area",
        duration: "Half Day (Morning)",
        reason: "Audit equipment installation",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FieldVisitApprovalsPage() {
    const toast = useToast();

    const handleApprove = (req: FieldRequest) => {
        // TODO: replace with real mutation
        toast.show({ variant: "success", title: "Visit approved", description: `${req.empName}'s field visit on ${req.date} has been approved.` });
    };

    const handleReject = (req: FieldRequest) => {
        // TODO: replace with real mutation
        toast.show({ variant: "danger", title: "Visit rejected", description: `${req.empName}'s field visit has been rejected.` });
    };

    return (
        <Page
            title="Field Visit Approvals"
            subtitle="Review out-of-office and client site logs submitted by the team"
            breadcrumbs={[
                { label: "Hybrid", href: "/hybrid/wfh/request" },
                { label: "Field Approvals" },
            ]}
            maxWidth="1200px"
        >
            <ul className="space-y-4" role="list" aria-label="Field visit approval requests">
                {REQUESTS.map((req) => (
                    <li key={req.id}>
                        <Card padding="none" className="overflow-hidden">
                            {/* Card header */}
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        aria-hidden="true"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2A3A4A] bg-[#1A2A3A] text-sm font-bold text-white"
                                    >
                                        {req.empName.split(" ").map((n) => n[0]).join("")}
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-white">{req.empName}</p>
                                        <p className="text-xs text-[#8899AA]">{req.empId} · {req.dept}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                    <Calendar size={12} className="text-[#f59e0b]" aria-hidden="true" />
                                    Date: {req.date}
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:items-center">
                                {/* Destination */}
                                <div className="rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4 md:col-span-4">
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#8899AA]">Visit Destination</p>
                                    <p className="mb-1 flex items-center gap-1.5 text-sm font-black text-white">
                                        <Target size={14} className="text-[#f59e0b]" aria-hidden="true" />
                                        {req.client}
                                    </p>
                                    <p className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                                        <Navigation size={12} aria-hidden="true" />
                                        {req.location}
                                    </p>
                                </div>

                                {/* Agenda */}
                                <div className="border-[#1A2A3A] md:col-span-5 md:border-l md:pl-6">
                                    <div className="flex items-start gap-3 text-sm">
                                        <MessageSquare size={16} className="mt-0.5 shrink-0 text-[#556677]" aria-hidden="true" />
                                        <div>
                                            <span className="mb-1 block text-xs font-bold text-[#8899AA]">Agenda / Duration</span>
                                            <p className="text-slate-300">"{req.reason}"</p>
                                            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#f59e0b]">{req.duration}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3 md:col-span-3">
                                    <Button
                                        variant="primary"
                                        className="bg-[#f59e0b] text-[#060B14] hover:bg-[#e6a600]"
                                        icon={<Check size={16} aria-hidden="true" />}
                                        onClick={() => handleApprove(req)}
                                        aria-label={`Approve field visit for ${req.empName}`}
                                    >
                                        Approve Visit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        icon={<XCircle size={16} aria-hidden="true" />}
                                        onClick={() => handleReject(req)}
                                        aria-label={`Reject field visit for ${req.empName}`}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </li>
                ))}
            </ul>
        </Page>
    );
}
