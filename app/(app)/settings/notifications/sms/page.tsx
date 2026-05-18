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

interface SmsEvent {
    id: number;
    event: string;
    provider: string;
    enabled: boolean;
}

const SMS_EVENTS: SmsEvent[] = [
    { id: 1, event: "OTP — Login Verification", provider: "Twilio", enabled: true },
    { id: 2, event: "Leave Approved (SMS Alert)", provider: "MSG91", enabled: false },
    { id: 3, event: "Payslip Ready", provider: "MSG91", enabled: true },
    { id: 4, event: "Emergency Attendance Alert", provider: "Twilio", enabled: true },
    { id: 5, event: "Password Reset OTP", provider: "Twilio", enabled: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<SmsEvent>[] = [
    {
        key: "event",
        label: "Event",
        render: (ev) => <span className="text-sm text-white font-medium">{ev.event}</span>,
        sortable: true,
        sortValue: (ev) => ev.event,
    },
    {
        key: "provider",
        label: "Provider",
        render: (ev) => <span className="text-xs text-[#8899AA]">{ev.provider}</span>,
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
// ─────────────────────────────────────────────────────────────────────────────

export default function SMSNotificationSetupPage() {
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 400));
        toast.show({ variant: "success", title: "SMS settings saved" });
    };

    return (
        <Page
            title="SMS Notification Setup"
            subtitle="Configure SMS delivery for critical alerts and OTP verification."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications", href: "/settings/notifications" },
                { label: "SMS" },
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
                {/* Provider Config */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card padding="md">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-white font-medium text-sm">Primary Provider: MSG91</h3>
                            <Badge variant="success" dot>Active</Badge>
                        </div>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-[#8899AA]">Sender ID</dt><dd className="text-white font-mono">KAARYA</dd></div>
                            <div className="flex justify-between"><dt className="text-[#8899AA]">DLT Template IDs</dt><dd className="text-white">12 registered</dd></div>
                        </dl>
                    </Card>
                    <Card padding="md">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-white font-medium text-sm">Fallback Provider: Twilio</h3>
                            <Badge variant="success" dot>Active</Badge>
                        </div>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between"><dt className="text-[#8899AA]">Account SID</dt><dd className="text-white font-mono">AC••••••d8f2</dd></div>
                            <div className="flex justify-between"><dt className="text-[#8899AA]">From Number</dt><dd className="text-white">+91 99xx xxx xx0</dd></div>
                        </dl>
                    </Card>
                </div>

                <Card padding="none">
                    <DataTable<SmsEvent>
                        data={SMS_EVENTS}
                        columns={COLUMNS}
                        rowKey={(ev) => ev.id}
                        aria-label="SMS notification events"
                        emptyTitle="No SMS events configured"
                    />
                </Card>
            </div>
        </Page>
    );
}
