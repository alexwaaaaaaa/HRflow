"use client";

import { Archive, Calendar, Filter } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface LogEntry {
    id: number;
    timestamp: string;
    channel: string;
    category: string;
    subject: string;
    status: "Delivered" | "Failed" | "Pending";
}

const LOG_DATA: LogEntry[] = [
    { id: 1, timestamp: "Oct 24, 2024 · 14:32", channel: "Email", category: "System Update", subject: "Maintenance window scheduled for...", status: "Delivered" },
    { id: 2, timestamp: "Oct 24, 2024 · 13:15", channel: "Push", category: "Payroll", subject: "Your October payslip is ready", status: "Delivered" },
    { id: 3, timestamp: "Oct 24, 2024 · 11:00", channel: "Email", category: "Leave", subject: "Leave request approved by manager", status: "Delivered" },
    { id: 4, timestamp: "Oct 23, 2024 · 16:45", channel: "SMS", category: "Security", subject: "New login detected from Bengaluru", status: "Delivered" },
    { id: 5, timestamp: "Oct 23, 2024 · 09:30", channel: "Email", category: "Compliance", subject: "Policy acknowledgement required", status: "Failed" },
    { id: 6, timestamp: "Oct 22, 2024 · 17:00", channel: "Push", category: "Engagement", subject: "Pulse survey: share your feedback", status: "Delivered" },
];

const STATUS_VARIANT = {
    Delivered: "success",
    Failed: "danger",
    Pending: "warning",
} as const;

const COLUMNS: Column<LogEntry>[] = [
    {
        key: "timestamp",
        label: "Timestamp",
        render: (r) => <span className="whitespace-nowrap text-[#8899AA]">{r.timestamp}</span>,
    },
    {
        key: "channel",
        label: "Channel",
        render: (r) => <Badge variant="neutral">{r.channel}</Badge>,
    },
    {
        key: "category",
        label: "Category",
        render: (r) => <span className="text-[#CCDDEE]">{r.category}</span>,
    },
    {
        key: "subject",
        label: "Subject / Title",
        render: (r) => <span className="text-white">{r.subject}</span>,
    },
    {
        key: "status",
        label: "Status",
        align: "right",
        render: (r) => (
            <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
        ),
    },
];

export default function NotificationHistoryPage() {
    return (
        <Page
            title="Notification Log & History"
            subtitle="Audit trail of all communication sent to your account"
            breadcrumbs={[
                { label: "Notifications", href: "/notifications" },
                { label: "History" },
            ]}
            maxWidth="1100px"
            actions={
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<Calendar size={14} aria-hidden="true" />}
                    >
                        Last 30 Days
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<Filter size={14} aria-hidden="true" />}
                    >
                        Event Type
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                <Card padding="none">
                    <div className="flex items-center gap-3 p-4">
                        <Archive size={18} className="text-indigo-400" aria-hidden="true" />
                        <span className="text-sm font-semibold text-white">
                            Showing 1–6 of 1,204 logs
                        </span>
                    </div>
                    <DataTable
                        data={LOG_DATA}
                        columns={COLUMNS}
                        rowKey={(r) => r.id}
                        aria-label="Notification history log"
                        emptyTitle="No logs found"
                        emptyDescription="Try adjusting your filters."
                    />
                </Card>

                <div className="flex items-center justify-between text-sm text-[#556677]">
                    <span>Showing 1 to 6 of 1,204 logs</span>
                    <div className="flex gap-1">
                        <Button variant="secondary" size="sm">Prev</Button>
                        <Button variant="secondary" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
