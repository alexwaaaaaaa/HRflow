"use client";

import { CheckCircle, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type HolidayStatus = "selected" | "available" | "expired";

interface RestrictedHoliday {
    id: string;
    month: string;
    day: string;
    name: string;
    dayOfWeek: string;
    status: HolidayStatus;
}

const HOLIDAYS: RestrictedHoliday[] = [
    { id: "dussehra", month: "Oct", day: "12", name: "Dussehra", dayOfWeek: "Saturday", status: "selected" },
    { id: "rajyotsava", month: "Nov", day: "01", name: "Kannada Rajyotsava", dayOfWeek: "Friday", status: "available" },
    { id: "sankranti", month: "Jan", day: "15", name: "Makar Sankranti", dayOfWeek: "Monday", status: "expired" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function RestrictedHolidaysPage() {
    return (
        <Page
            title="Restricted Holidays"
            subtitle="Select optional regional or religious holidays (Max: 2 per year)"
            breadcrumbs={[
                { label: "Leave", href: "/leave/dashboard" },
                { label: "Settings" },
                { label: "Restricted Holidays" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                {/* Status banner */}
                <div
                    role="status"
                    className="flex items-center justify-between rounded-xl border border-[#00E5A0]/20 bg-[#00E5A0]/10 p-4 text-sm font-bold text-[#00E5A0]"
                >
                    <div className="flex items-center gap-3">
                        <Info size={18} aria-hidden="true" />
                        You have selected 1 out of 2 restricted holidays for 2024.
                    </div>
                    <div className="rounded border border-[#00E5A0]/30 bg-[#060B14] px-3 py-1 font-black">
                        1 Remaining
                    </div>
                </div>

                {/* Holiday list */}
                <Card padding="none">
                    <CardHeader className="border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                        <CardTitle>Available Restricted Holidays</CardTitle>
                    </CardHeader>
                    <ul className="divide-y divide-[#1A2A3A]" aria-label="Restricted holidays list">
                        {HOLIDAYS.map((holiday) => (
                            <li
                                key={holiday.id}
                                className={`flex items-center justify-between p-5 transition-colors hover:bg-[#1A2A3A]/20 ${
                                    holiday.status === "expired" ? "opacity-50" : ""
                                } ${holiday.status === "selected" ? "bg-[#060B14]" : ""}`}
                            >
                                <div className="flex w-2/3 items-center gap-6">
                                    <div className="w-16 text-center">
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#8899AA]">
                                            {holiday.month}
                                        </p>
                                        <p className={`text-2xl font-black ${holiday.status === "expired" ? "text-[#556677]" : "text-white"}`}>
                                            {holiday.day}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${holiday.status === "expired" ? "text-[#8899AA]" : "text-white"}`}>
                                            {holiday.name}
                                        </h3>
                                        <p className="text-xs text-[#556677]">
                                            {holiday.dayOfWeek} · Optional Holiday
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    {holiday.status === "selected" && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            icon={<CheckCircle size={16} aria-hidden="true" />}
                                            disabled
                                            aria-label={`${holiday.name} selected`}
                                        >
                                            Selected
                                        </Button>
                                    )}
                                    {holiday.status === "available" && (
                                        <Button size="sm" aria-label={`Opt in to ${holiday.name}`}>
                                            Opt-in
                                        </Button>
                                    )}
                                    {holiday.status === "expired" && (
                                        <Badge variant="neutral">Expired</Badge>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </Page>
    );
}
