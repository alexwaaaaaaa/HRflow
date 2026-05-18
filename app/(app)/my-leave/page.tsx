"use client";

import Link from "next/link";
import { Calendar, Plane, Clock, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface LeaveBalance {
    type: string;
    code: "EL" | "SL" | "CL";
    granted: number;
    used: number;
    balance: number;
    accent: string;
}

interface LeaveHistory {
    id: number;
    dates: string;
    duration: string;
    type: string;
    status: "Approved" | "Pending" | "Rejected";
}

const BALANCES: LeaveBalance[] = [
    { type: "Privilege Leave", code: "EL", granted: 15, used: 2, balance: 13, accent: "#3b82f6" },
    { type: "Sick Leave", code: "SL", granted: 12, used: 4, balance: 8, accent: "#f59e0b" },
    { type: "Casual Leave", code: "CL", granted: 7, used: 6, balance: 1, accent: "#00e5a0" },
];

const HISTORY: LeaveHistory[] = [
    { id: 1, dates: "12 Nov - 14 Nov", duration: "3 Days", type: "Privilege Leave", status: "Approved" },
    { id: 2, dates: "24 Oct", duration: "1 Day", type: "Sick Leave", status: "Approved" },
    { id: 3, dates: "25 Dec", duration: "1 Day", type: "Casual Leave", status: "Pending" },
];

const STATUS_VARIANT: Record<LeaveHistory["status"], "success" | "warning" | "danger"> = {
    Approved: "success",
    Pending: "warning",
    Rejected: "danger",
};

export default function MyLeaveScreen() {
    return (
        <Page
            title="My leave"
            subtitle="Your personal time-off summary for 2024"
            breadcrumbs={[{ label: "My Leave" }]}
            maxWidth="1100px"
            actions={
                <Button icon={<Plane size={14} />} href="/my-leave/apply">Apply leave</Button>
            }
        >
            <div className="space-y-6">
                {/* Balances */}
                <section aria-labelledby="balances-heading">
                    <h2
                        id="balances-heading"
                        className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"
                    >
                        <Calendar size={16} className="text-[#00e5a0]" aria-hidden="true" />
                        Current balances
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {BALANCES.map((b) => (
                            <Card
                                key={b.code}
                                className="border-t-4"
                                style={{ borderTopColor: b.accent }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-base font-semibold text-white">{b.type}</h3>
                                        <span className="mt-1 inline-block rounded border border-[#1A2A3A] bg-[#060B14] px-2 py-0.5 text-[10px] font-semibold text-[#7a8fa6]">
                                            {b.code}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-white tabular-nums">
                                            {b.balance}
                                        </div>
                                        <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[#7a8fa6]">
                                            Available
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between border-t border-[#1A2A3A] pt-3 text-xs">
                                    <span className="text-[#7a8fa6]">
                                        Granted: <span className="text-white">{b.granted}</span>
                                    </span>
                                    <span className="text-[#7a8fa6]">
                                        Used: <span className="text-white">{b.used}</span>
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* History */}
                <Card padding="none">
                    <CardHeader className="border-b border-[#1A2A3A] p-5">
                        <CardTitle className="flex items-center gap-2">
                            <Clock size={16} className="text-[#3b82f6]" aria-hidden="true" />
                            Recent applications
                        </CardTitle>
                        <Link
                            href="/leave/reports"
                            className="text-xs font-semibold text-[#3b82f6] hover:underline"
                        >
                            View all history
                        </Link>
                    </CardHeader>
                    <ul className="divide-y divide-[#0e1a28]">
                        {HISTORY.map((req) => (
                            <li key={req.id}>
                                <Link
                                    href={`/leave/dashboard?id=${req.id}`}
                                    className="flex items-center justify-between gap-3 p-5 transition-colors hover:bg-[rgba(255,255,255,0.02)]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg border border-[#1A2A3A] bg-[#060B14]">
                                            <span className="text-[10px] font-semibold uppercase text-[#7a8fa6]">
                                                {req.dates.split(" ")[1] ?? ""}
                                            </span>
                                            <span className="text-sm font-bold text-white">
                                                {req.dates.split(" ")[0]}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{req.type}</p>
                                            <p className="mt-0.5 text-xs text-[#7a8fa6]">
                                                {req.dates} ·{" "}
                                                <span className="font-semibold text-white">
                                                    {req.duration}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={STATUS_VARIANT[req.status]}>
                                            {req.status}
                                        </Badge>
                                        <ChevronRight
                                            size={16}
                                            className="shrink-0 text-[#7a8fa6]"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </Page>
    );
}
