"use client";

import { useState } from "react";
import { Mail, MessageSquare, Monitor, Save, Smartphone, ToggleLeft, ToggleRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type Channel = "email" | "push" | "whatsapp" | "sms";
type Category = "leave" | "payroll" | "attendance" | "performance" | "system" | "hiring";

type ChannelState = Record<Channel, Record<Category, boolean>>;

const CATEGORIES: Category[] = ["leave", "payroll", "attendance", "performance", "system", "hiring"];

interface ChannelDef {
    key: Channel;
    label: string;
    icon: typeof Mail;
    color: string;
}

const CHANNEL_LIST: ChannelDef[] = [
    { key: "email", label: "Email", icon: Mail, color: "text-blue-400" },
    { key: "push", label: "Push / In-App", icon: Monitor, color: "text-emerald-400" },
    { key: "whatsapp", label: "WhatsApp", icon: MessageSquare, color: "text-[#25D366]" },
    { key: "sms", label: "SMS", icon: Smartphone, color: "text-amber-400" },
];

const CATEGORY_LABELS: Record<Category, string> = {
    leave: "Leave",
    payroll: "Payroll",
    attendance: "Attendance",
    performance: "Performance",
    system: "System Alerts",
    hiring: "Hiring",
};

const INITIAL_STATE: ChannelState = {
    email: { leave: true, payroll: true, attendance: true, performance: true, system: true, hiring: false },
    push: { leave: true, payroll: false, attendance: true, performance: false, system: true, hiring: true },
    whatsapp: { leave: false, payroll: true, attendance: false, performance: false, system: false, hiring: false },
    sms: { leave: false, payroll: false, attendance: false, performance: false, system: true, hiring: false },
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function NotificationPreferencesPage() {
    const [channels, setChannels] = useState<ChannelState>(INITIAL_STATE);
    const toast = useToast();

    const toggle = (channel: Channel, category: Category) => {
        setChannels((prev) => ({
            ...prev,
            [channel]: { ...prev[channel], [category]: !prev[channel][category] },
        }));
    };

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 400));
        toast.show({ variant: "success", title: "Preferences saved", description: "Notification settings have been updated." });
    };

    return (
        <Page
            title="Notification Preferences"
            subtitle="Configure which notification channels are active for each HR event category. Changes apply organization-wide."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications" },
            ]}
            maxWidth="1200px"
            actions={
                <Button onClick={handleSave} icon={<Save size={16} aria-hidden="true" />}>Save Preferences</Button>
            }
        >
            <div className="space-y-6">
                {/* Matrix Table */}
                <Card padding="none">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]" aria-label="Notification channel matrix">
                            <thead>
                                <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                                    <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider w-48">Category</th>
                                    {CHANNEL_LIST.map((ch) => (
                                        <th key={ch.key} scope="col" className="p-4 text-center">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <ch.icon size={18} className={ch.color} aria-hidden="true" />
                                                <span className="text-xs font-semibold text-white">{ch.label}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {CATEGORIES.map((cat) => (
                                    <tr key={cat} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                        <td className="p-4 text-sm text-white font-medium">{CATEGORY_LABELS[cat]}</td>
                                        {CHANNEL_LIST.map((ch) => {
                                            const isOn = channels[ch.key][cat];
                                            return (
                                                <td key={ch.key} className="p-4 text-center">
                                                    <button
                                                        onClick={() => toggle(ch.key, cat)}
                                                        aria-label={`${isOn ? "Disable" : "Enable"} ${ch.label} for ${CATEGORY_LABELS[cat]}`}
                                                        aria-pressed={isOn}
                                                        className="inline-block transition-transform hover:scale-110"
                                                    >
                                                        {isOn
                                                            ? <ToggleRight size={28} className="text-indigo-400" aria-hidden="true" />
                                                            : <ToggleLeft size={28} className="text-[#2A3A4A]" aria-hidden="true" />
                                                        }
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card padding="md">
                        <h3 className="text-white font-medium text-sm mb-2">Quiet Hours</h3>
                        <p className="text-xs text-[#8899AA] mb-4">Suppress non-critical notifications between specified hours to reduce noise.</p>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white w-28 text-center">10:00 PM</div>
                            <span className="text-[#445566] text-xs font-medium">to</span>
                            <div className="bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white w-28 text-center">8:00 AM</div>
                        </div>
                    </Card>
                    <Card padding="md">
                        <h3 className="text-white font-medium text-sm mb-2">Digest Mode</h3>
                        <p className="text-xs text-[#8899AA] mb-4">Batch low-priority notifications into a single daily email digest instead of real-time alerts.</p>
                        <div className="flex items-center gap-3">
                            <ToggleRight size={28} className="text-indigo-400" aria-hidden="true" />
                            <span className="text-sm text-white">Enabled — Daily at 9:00 AM IST</span>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
