"use client";

import { AlertTriangle, ArrowLeft, Filter } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type LogStatus = 200 | 504;
type LogDirection = "INBOUND" | "OUTBOUND";

interface IntegrationLog {
    id: string;
    status: LogStatus;
    event: string;
    direction: LogDirection;
    ref: string;
    time: string;
}

const LOGS: IntegrationLog[] = [
    { id: "1", status: 504, event: "Slash Command /kaarya leave", direction: "INBOUND", ref: "cmd_928xn", time: "10 mins ago" },
    { id: "2", status: 200, event: "Webhook leave.approved", direction: "OUTBOUND", ref: "msg_po82b", time: "1 hour ago" },
    { id: "3", status: 200, event: "Webhook employee.created", direction: "OUTBOUND", ref: "msg_xj28a", time: "3 hours ago" },
    { id: "4", status: 504, event: "Slash Command /kaarya peers", direction: "INBOUND", ref: "cmd_1l9xn", time: "4 hours ago" },
    { id: "5", status: 200, event: "Org Announcement Sync", direction: "OUTBOUND", ref: "msg_98zqw", time: "Yesterday" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function StatusCell({ status }: { status: LogStatus }) {
    return (
        <Badge variant={status === 200 ? "success" : "danger"}>{status}</Badge>
    );
}

function EventCell({ log }: { log: IntegrationLog }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-white text-sm">{log.event}</span>
            <span className="text-[10px] font-bold text-[#556677] uppercase tracking-wider">{log.direction}</span>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<IntegrationLog>[] = [
    {
        key: "status",
        label: "Status",
        render: (log) => <StatusCell status={log.status} />,
        sortable: true,
        sortValue: (log) => log.status,
    },
    {
        key: "event",
        label: "Event Type / Direction",
        render: (log) => <EventCell log={log} />,
    },
    {
        key: "ref",
        label: "Payload Ref",
        render: (log) => <span className="text-[#CCDDEE] font-mono text-sm">{log.ref}</span>,
    },
    {
        key: "time",
        label: "Timestamp",
        render: (log) => <span className="text-[#556677] text-sm">{log.time}</span>,
    },
    {
        key: "details",
        label: "",
        align: "right",
        render: () => (
            <Button variant="ghost" size="sm">Details</Button>
        ),
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function IntegrationLogsPage() {
    return (
        <Page
            title="Slack Integration Logs"
            subtitle="Audit trail of automated data syncs and webhooks specific to this integration."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Integrations", href: "/settings/integrations" },
                { label: "Slack", href: "/settings/integrations/1" },
                { label: "Logs" },
            ]}
            maxWidth="1200px"
            actions={
                <div className="flex gap-2">
                    <Button variant="secondary" icon={<ArrowLeft size={16} aria-hidden="true" />} href="/settings/integrations/1">Back</Button>
                    <Button variant="secondary" icon={<Filter size={16} aria-hidden="true" />}>Filter</Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Summary Banner */}
                <Card padding="md" className="border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent">
                    <div className="flex gap-4 items-center">
                        <div className="bg-red-500/20 p-2 rounded-lg shrink-0">
                            <AlertTriangle className="text-red-400" size={24} aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-sm">2 Failed Deliveries in last 24h</h4>
                            <p className="text-[#8899AA] text-xs mt-0.5">Some Slack slash commands timed out before Kaarya could respond.</p>
                        </div>
                        <Button variant="secondary" size="sm">Retry Failed</Button>
                    </div>
                </Card>

                <Card padding="none">
                    <DataTable<IntegrationLog>
                        data={LOGS}
                        columns={COLUMNS}
                        rowKey={(log) => log.id}
                        searchable
                        searchPlaceholder="Search event ID or type…"
                        aria-label="Integration logs"
                        emptyTitle="No logs found"
                        emptyDescription="Integration activity will appear here."
                    />
                </Card>
            </div>
        </Page>
    );
}
