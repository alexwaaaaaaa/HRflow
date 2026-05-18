"use client";
import { Clock, Plus, Settings, Edit2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const SLA_POLICIES = [
    { name: "Default Internal SLA", active: true, badge: "Active" as const },
    { name: "VIP Management", active: false, badge: "Active" as const },
    { name: "Hardware Replacements", active: false, badge: "Draft" as const },
];

const PRIORITY_TARGETS = [
    { level: "Critical", resp: "15", respUnit: "mins", res: "2", resUnit: "hrs", colorClass: "text-[#FF4444]" },
    { level: "High", resp: "1", respUnit: "hrs", res: "8", resUnit: "hrs", colorClass: "text-[#FFB020]" },
    { level: "Medium", resp: "4", respUnit: "hrs", res: "24", resUnit: "hrs", colorClass: "text-[#33E6FF]" },
    { level: "Low", resp: "8", respUnit: "hrs", res: "48", resUnit: "hrs", colorClass: "text-[#8899AA]" },
] as const;

export default function SLAConfigPage() {
    return (
        <Page
            title="Service Level Agreements (SLA)"
            subtitle="Define expectations for response and resolution times to maintain high support quality."
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "SLA Configuration" },
            ]}
            maxWidth="1400px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />}>
                    Create SLA Policy
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Left Sidebar */}
                <div className="space-y-6 lg:col-span-1">
                    <Card padding="lg">
                        <h3 className="mb-4 font-bold text-white">SLA Policies</h3>
                        <div className="space-y-2">
                            {SLA_POLICIES.map((policy) => (
                                <button
                                    key={policy.name}
                                    type="button"
                                    className={`flex w-full items-center justify-between rounded-xl border p-3 transition-colors ${
                                        policy.active
                                            ? "border-[#00E5A0] bg-[#1A2A3A]"
                                            : "group border-transparent hover:border-[#2A3A4A]"
                                    }`}
                                >
                                    <span
                                        className={`text-sm font-semibold ${
                                            policy.active ? "text-white" : "text-[#8899AA] group-hover:text-white"
                                        }`}
                                    >
                                        {policy.name}
                                    </span>
                                    <Badge variant={policy.badge === "Active" ? "success" : "neutral"}>
                                        {policy.badge}
                                    </Badge>
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h3 className="mb-2 flex items-center gap-2 font-bold text-white">
                            <Clock size={16} className="text-[#33E6FF]" aria-hidden="true" />
                            Business Hours
                        </h3>
                        <p className="mb-4 text-sm text-[#8899AA]">
                            SLAs only count down during specified business hours.
                        </p>
                        <label htmlFor="business-hours" className="sr-only">
                            Business hours schedule
                        </label>
                        <select
                            id="business-hours"
                            className="mb-2 w-full rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-2 text-sm text-white outline-none"
                        >
                            <option>Standard (Mon-Fri, 9am - 6pm)</option>
                            <option>24/7 Support</option>
                        </select>
                        <button
                            type="button"
                            className="text-sm font-semibold text-[#00E5A0] hover:underline"
                        >
                            Manage Calendars
                        </button>
                    </Card>
                </div>

                {/* Main Panel */}
                <div className="lg:col-span-3">
                    <Card padding="none">
                        <div className="flex items-start justify-between border-b border-[#1A2A3A] p-8">
                            <div>
                                <h2 className="mb-2 flex items-center gap-2 text-3xl font-bold text-white">
                                    Default Internal SLA
                                    <button
                                        type="button"
                                        aria-label="Edit SLA policy name"
                                        className="ml-2 align-middle text-[#445566] transition-colors hover:text-white"
                                    >
                                        <Edit2 size={16} aria-hidden="true" />
                                    </button>
                                </h2>
                                <p className="text-sm text-[#8899AA]">
                                    Applies to all tickets unless a more specific SLA policy matches.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-[#8899AA]">Status:</span>
                                <div className="flex items-center gap-2 rounded-full border border-[#00E5A0]/20 bg-[#00E5A0]/10 px-3 py-1">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-[#00E5A0]" aria-hidden="true" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A0]">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10 p-8">
                            {/* Targets Table */}
                            <section>
                                <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                    <Clock size={16} aria-hidden="true" /> Targets by Priority
                                </h3>
                                <div className="overflow-hidden rounded-xl border border-[#1A2A3A] bg-[#0A1420]">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-[#1A2A3A] bg-[#152336] text-xs font-medium uppercase tracking-wider text-[#8899AA]">
                                                <th scope="col" className="w-1/4 p-4">Priority</th>
                                                <th scope="col" className="w-1/3 p-4">First Response Time</th>
                                                <th scope="col" className="w-1/3 p-4">Resolution Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1A2A3A]">
                                            {PRIORITY_TARGETS.map((p) => (
                                                <tr
                                                    key={p.level}
                                                    className="text-sm text-white transition-colors hover:bg-[#1A2A3A]/30"
                                                >
                                                    <td className={`p-4 font-bold ${p.colorClass}`}>
                                                        {p.level}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex w-fit overflow-hidden rounded border border-[#2A3A4A] bg-[#1A2A3A]">
                                                            <input
                                                                type="text"
                                                                defaultValue={p.resp}
                                                                aria-label={`${p.level} first response time value`}
                                                                className="w-12 bg-transparent px-2 py-1 text-center outline-none"
                                                            />
                                                            <select
                                                                aria-label={`${p.level} first response time unit`}
                                                                defaultValue={p.respUnit}
                                                                className="border-l border-[#2A3A4A] bg-[#2A3A4A] px-2 text-[#8899AA] outline-none focus:text-white"
                                                            >
                                                                <option value="mins">mins</option>
                                                                <option value="hrs">hrs</option>
                                                                <option value="days">days</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex w-fit overflow-hidden rounded border border-[#2A3A4A] bg-[#1A2A3A]">
                                                            <input
                                                                type="text"
                                                                defaultValue={p.res}
                                                                aria-label={`${p.level} resolution time value`}
                                                                className="w-12 bg-transparent px-2 py-1 text-center outline-none"
                                                            />
                                                            <select
                                                                aria-label={`${p.level} resolution time unit`}
                                                                defaultValue={p.resUnit}
                                                                className="border-l border-[#2A3A4A] bg-[#2A3A4A] px-2 text-[#8899AA] outline-none focus:text-white"
                                                            >
                                                                <option value="mins">mins</option>
                                                                <option value="hrs">hrs</option>
                                                                <option value="days">days</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Applicability Conditions */}
                            <section>
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                        <Settings size={16} aria-hidden="true" /> Applies To (Conditions)
                                    </h3>
                                </div>
                                <div className="flex flex-col items-center justify-center rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] p-6 text-center">
                                    <p className="mb-4 text-sm text-[#8899AA]">
                                        This default policy applies to{" "}
                                        <strong className="text-white">All Tickets</strong>.
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Add Condition (e.g., Department = HR)
                                    </Button>
                                </div>
                            </section>

                            {/* Save */}
                            <div className="flex justify-end border-t border-[#1A2A3A] pt-6">
                                <Button>Save Policy</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
