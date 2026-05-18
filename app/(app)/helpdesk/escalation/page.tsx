"use client";
import {
    Plus, AlertTriangle, Users, Clock, Mail, X,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const ACTIVE_RULES = [
    {
        title: "IT Critical Breach",
        desc: "Applies to: IT Support • Critical",
        active: true,
    },
    {
        title: "Standard Unassigned",
        desc: "Applies to: All • Unassigned > 2h",
        active: false,
    },
    {
        title: "VIP Executive Escalation",
        desc: "Applies to: VIP Users",
        active: false,
    },
];

export default function EscalationMatrixPage() {
    return (
        <Page
            title="Escalation Matrix"
            subtitle="Define automated workflows and notifications when tickets breach SLA targets."
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Escalation Matrix" },
            ]}
            maxWidth="1400px"
            actions={
                <Button
                    variant="danger"
                    icon={<Plus size={16} aria-hidden="true" />}
                >
                    New Escalation Rule
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Rule List */}
                <div className="space-y-4 lg:col-span-1">
                    <Card padding="none">
                        <div className="border-b border-[#1A2A3A] bg-[#152336] p-4">
                            <h3 className="text-sm font-bold text-white">Active Rules</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {ACTIVE_RULES.map((rule) => (
                                <button
                                    key={rule.title}
                                    type="button"
                                    className={`w-full border-l-2 p-4 text-left transition-colors ${
                                        rule.active
                                            ? "border-l-[#FF4444] bg-[#1A2A3A]"
                                            : "border-l-transparent hover:bg-[#1A2A3A]/50"
                                    }`}
                                >
                                    <span
                                        className={`mb-0.5 block text-sm font-bold ${
                                            rule.active ? "text-white" : "text-[#8899AA]"
                                        }`}
                                    >
                                        {rule.title}
                                    </span>
                                    <span
                                        className={`text-xs ${rule.active ? "text-[#8899AA]" : "text-[#445566]"}`}
                                    >
                                        {rule.desc}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Rule Builder Canvas */}
                <div className="lg:col-span-3">
                    <Card padding="lg">
                        {/* Rule Header */}
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="mb-2 text-2xl font-bold text-white">
                                    IT Critical Breach Rule
                                </h2>
                                <p className="text-sm text-[#8899AA]">
                                    Triggers when a Critical priority ticket in IT Support misses its
                                    resolution target.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[#8899AA]">Status:</span>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        defaultChecked
                                        aria-label="Toggle escalation rule status"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-[#1A2A3A] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#00E5A0] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
                                </label>
                            </div>
                        </div>

                        {/* Escalation Path */}
                        <div className="relative">
                            {/* Trigger Condition */}
                            <div className="relative z-10 mb-8">
                                <div className="ml-6 rounded-xl border border-[#2A3A4A] border-l-4 border-l-[#FFB020] bg-[#1A2A3A] p-6 shadow-lg">
                                    <div className="absolute -left-[45px] top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#0F1C2E] bg-[#1A2A3A] text-[#FFB020]">
                                        <Clock size={16} aria-hidden="true" />
                                    </div>
                                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                                        When
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        <span className="text-[#8899AA]">Ticket matches</span>
                                        <span className="rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-1.5 font-medium text-white">
                                            Category: IT Support
                                        </span>
                                        <span className="text-[#8899AA]">AND</span>
                                        <span className="rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-1.5 font-medium text-white">
                                            Priority: Critical
                                        </span>
                                        <span className="text-[#8899AA]">AND resolution is overdue by</span>
                                        <select
                                            aria-label="Overdue threshold"
                                            className="rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-1.5 font-bold text-[#FF4444] outline-none focus:border-[#33E6FF]"
                                        >
                                            <option>0 mins (Immediately)</option>
                                            <option>15 mins</option>
                                            <option>30 mins</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-10 left-[39px] top-10 w-1 bg-[#1A2A3A]" aria-hidden="true" />

                            {/* Level 1 Escalation */}
                            <div className="relative z-10 mb-8">
                                <div className="ml-6 rounded-xl border border-[#2A3A4A] border-l-4 border-l-[#FF4444] bg-[#1A2A3A] p-6 shadow-lg">
                                    <div className="absolute -left-[45px] top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#0F1C2E] bg-[#1A2A3A] text-sm font-bold text-[#FF4444]">
                                        L1
                                    </div>
                                    <div className="mb-4 flex items-start justify-between">
                                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                                            Escalate To L1
                                        </h3>
                                        <button
                                            type="button"
                                            aria-label="Remove L1 escalation"
                                            className="text-[#8899AA] transition-colors hover:text-[#FF4444]"
                                        >
                                            <X size={16} aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Users size={16} className="text-[#8899AA]" aria-hidden="true" />
                                            <span className="text-sm font-medium text-white">
                                                Reassign Ticket to:
                                            </span>
                                            <select
                                                aria-label="Reassign to team"
                                                className="flex-1 rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-1.5 text-sm text-white outline-none"
                                            >
                                                <option>IT Management Team</option>
                                                <option>Specific User</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle size={16} className="text-[#8899AA]" aria-hidden="true" />
                                            <span className="text-sm font-medium text-white">
                                                Change Priority to:
                                            </span>
                                            <select
                                                aria-label="Change priority"
                                                className="rounded-lg border border-[#2A3A4A] bg-[#0A1420] px-3 py-1.5 text-sm font-bold text-[#FF4444] outline-none"
                                            >
                                                <option>Unchanged</option>
                                                <option>Critical</option>
                                            </select>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail size={16} className="mt-1 text-[#8899AA]" aria-hidden="true" />
                                            <div className="flex-1">
                                                <span className="mb-2 block text-sm font-medium text-white">
                                                    Send Email Notification:
                                                </span>
                                                <div className="rounded-lg border border-[#2A3A4A] bg-[#0A1420] p-3">
                                                    <div className="mb-2 flex flex-wrap gap-2">
                                                        <span className="flex items-center gap-1 rounded bg-[#1A2A3A] px-2 py-1 text-xs text-white">
                                                            Assignee{" "}
                                                            <button type="button" aria-label="Remove Assignee recipient">
                                                                <X size={12} aria-hidden="true" />
                                                            </button>
                                                        </span>
                                                        <span className="flex items-center gap-1 rounded bg-[#1A2A3A] px-2 py-1 text-xs text-white">
                                                            Department Head{" "}
                                                            <button type="button" aria-label="Remove Department Head recipient">
                                                                <X size={12} aria-hidden="true" />
                                                            </button>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="px-1 text-xs text-[#33E6FF]"
                                                        >
                                                            + Add Recipient
                                                        </button>
                                                    </div>
                                                    <div className="font-mono text-xs text-[#8899AA]">
                                                        Template: [SLA Breach] Critical IT Ticket Escalation
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Level 2 Placeholder */}
                            <div className="relative z-10 mb-8">
                                <div className="ml-6 rounded-xl border border-dashed border-[#2A3A4A] bg-[#1A2A3A]/50 p-6 shadow-lg">
                                    <div className="absolute -left-[45px] top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#1A2A3A] bg-[#0F1C2E] text-sm font-bold text-[#8899AA]">
                                        L2
                                    </div>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-center gap-2 py-2 text-sm font-bold text-[#33E6FF] transition-colors hover:text-[#00E5A0]"
                                    >
                                        <Plus size={16} aria-hidden="true" /> Add Level 2 Escalation
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save */}
                        <div className="flex justify-end gap-3 border-t border-[#1A2A3A] pt-6">
                            <Button variant="outline">Discard Changes</Button>
                            <Button variant="danger">Save Rule</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
