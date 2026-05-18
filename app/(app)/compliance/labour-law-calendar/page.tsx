"use client";

import {
    MapPin,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static palette ───────────────────────────────────────────────────────────
type EventUrgency = "critical" | "routine" | "upcoming";

const URGENCY_BORDER: Record<EventUrgency, string> = {
    critical: "border-l-rose-500",
    routine: "border-l-blue-500",
    upcoming: "border-l-amber-500",
};

const URGENCY_DATE_TEXT: Record<EventUrgency, string> = {
    critical: "text-rose-500",
    routine: "text-slate-500",
    upcoming: "text-slate-500",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface CalendarEvent {
    id: string;
    date: string;
    daysLabel: string;
    title: string;
    frequency: string;
    portal: string;
    urgency: EventUrgency;
    urgencyLabel: string;
    actionLabel: string;
}

const EVENTS: CalendarEvent[] = [
    {
        id: "ev1",
        date: "15 May",
        daysLabel: "In 3 Days",
        title: "PF & ESIC Remittance",
        frequency: "Monthly",
        portal: "EPFO & ESIC Portal | Pan-India",
        urgency: "critical",
        urgencyLabel: "In 3 Days",
        actionLabel: "Action Required",
    },
    {
        id: "ev2",
        date: "20 May",
        daysLabel: "In 8 Days",
        title: "PT Return Filing",
        frequency: "Monthly",
        portal: "Karnataka State (e-Prerana)",
        urgency: "routine",
        urgencyLabel: "In 8 Days",
        actionLabel: "View Task",
    },
    {
        id: "ev3",
        date: "31 May",
        daysLabel: "In 19 Days",
        title: "Quarterly TDS Return (24Q/26Q)",
        frequency: "Quarterly",
        portal: "Income Tax Dept | Q4 Period",
        urgency: "upcoming",
        urgencyLabel: "In 19 Days",
        actionLabel: "View Task",
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LabourLawCalendar() {
    return (
        <Page
            title="Labour Law Master Calendar"
            subtitle="Holistic view of all periodic returns, registers, and renewals."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Labour Law Calendar" },
            ]}
            maxWidth="1280px"
        >
            <Card padding="lg">
                <div className="mb-10 flex flex-col items-center justify-between gap-4 border-b border-[#1A2A3A]/50 pb-6 md:flex-row">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Next 30 Days</h2>
                    <div className="flex gap-2">
                        <Badge variant="danger">2 Critical</Badge>
                        <Badge variant="neutral">4 Routine</Badge>
                    </div>
                </div>

                <div className="space-y-6">
                    {EVENTS.map((ev) => (
                        <div
                            key={ev.id}
                            className={`flex flex-col gap-6 rounded-r-2xl border border-y border-r border-[#1A2A3A] border-l-4 bg-[#060B14] p-5 transition-all hover:bg-[#1A2A3A]/30 md:flex-row md:items-center ${URGENCY_BORDER[ev.urgency]}`}
                        >
                            <div className="min-w-[120px]">
                                <div className="text-xl font-black text-white">{ev.date}</div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest ${URGENCY_DATE_TEXT[ev.urgency]}`}>
                                    {ev.daysLabel}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="mb-1 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-200">
                                    {ev.title}
                                    <Badge variant="neutral">{ev.frequency}</Badge>
                                </h3>
                                <p className="flex items-center gap-1 text-[11px] font-medium italic text-slate-400">
                                    <MapPin size={12} aria-hidden="true" /> {ev.portal}
                                </p>
                            </div>
                            <div className="text-right">
                                <Button
                                    variant={ev.urgency === "critical" ? "secondary" : "outline"}
                                    size="sm"
                                >
                                    {ev.actionLabel}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </Page>
    );
}
