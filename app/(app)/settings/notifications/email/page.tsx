"use client";

import { Save, ToggleLeft, ToggleRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface EmailEvent {
    id: number;
    event: string;
    template: string;
    enabled: boolean;
}

const EMAIL_EVENTS: EmailEvent[] = [
    { id: 1, event: "Leave Approved", template: "TPL-LV-01", enabled: true },
    { id: 2, event: "Leave Rejected", template: "TPL-LV-02", enabled: true },
    { id: 3, event: "Payslip Generated", template: "TPL-PAY-01", enabled: true },
    { id: 4, event: "Performance Review Published", template: "TPL-PERF-01", enabled: false },
    { id: 5, event: "New Hire Welcome", template: "TPL-ONB-01", enabled: true },
    { id: 6, event: "Birthday Wish", template: "TPL-ENG-01", enabled: true },
    { id: 7, event: "Work Anniversary", template: "TPL-ENG-02", enabled: true },
    { id: 8, event: "Password Reset", template: "TPL-SYS-01", enabled: true },
];

const SMTP_STATS = [
    { label: "Provider", value: "Amazon SES" },
    { label: "From Address", value: "noreply@kaarya.io" },
    { label: "Daily Limit", value: "50,000" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<EmailEvent>[] = [
    {
        key: "event",
        label: "System Event",
        render: (ev) => <span className="text-sm text-white font-medium">{ev.event}</span>,
        sortable: true,
        sortValue: (ev) => ev.event,
    },
    {
        key: "template",
        label: "Template",
        render: (ev) => <span className="text-xs text-[#8899AA] font-mono">{ev.template}</span>,
    },
    {
        key: "enabled",
        label: "Enabled",
        align: "center",
        render: (ev) => ev.enabled
            ? <ToggleRight size={24} className="text-indigo-400 mx-auto cursor-pointer" aria-label="Enabled" />
            : <ToggleLeft size={24} className="text-[#2A3A4A] mx-auto cursor-pointer" aria-label="Disabled" />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────="────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

export default function EmailNotificationSetupPage() {
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 400));
        toast.show({ variant: "success", title: "Email settings saved" });
    };

    return (
        <Page
            title="Email Notification Setup"
            subtitle="Map system events to email templates and control delivery."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications", href: "/settings/notifications" },
                { label: "Email" },
            ]}
            maxWidth="900px"
            actions={
                <div className="flex gap-2">
                    <Button variant="secondary" href="/settings/notifications">← Back</Button>
                    <Button onClick={handleSave} icon={<Save size={16} aria-hidden="true" />}>Save</Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* SMTP Config */}
                <Card padding="md">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-white font-medium text-sm">SMTP Configuration</h3>
                        <Badge variant="success" dot>Connected</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
                        {SMTP_STATS.map((s) => (
                            <div key={s.label}>
                                <p className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">{s.label}</p>
                                <p className="text-white">{s.value}</p>
                            </div>
                        ))}
                        <div>
                            <p className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Status</p>
                            <p className="text-emerald-400 font-medium">Connected</p>
                        </div>
                    </div>
                </Card>

                {/* Event Table */}
                <Card padding="none">
                    <DataTable<EmailEvent>
                        data={EMAIL_EVENTS}
                        columns={COLUMNS}
                        rowKey={(ev) => ev.id}
                        aria-label="Email notification events"
                        emptyTitle="No email events configured"
                    />
                </Card>
            </div>
        </Page>
    );
}
