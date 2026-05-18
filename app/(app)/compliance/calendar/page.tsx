"use client";

import {
    AlertCircle,
    Bell,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Download,
    FileText,
    Filter,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Timeline data (module scope so it stays static across renders)
// ─────────────────────────────────────────────────────────────────────────────

type TimelineKind = "alert" | "filing" | "done";

interface TimelineEvent {
    id: string;
    /** ISO date for the <time dateTime> attribute (e.g. "2024-04-15"). */
    date: string;
    /** Human-readable label rendered in the card (e.g. "15 April"). */
    dateLabel: string;
    /** Optional postfix for the visible label (e.g. "(Today)"). */
    dateNote?: string;
    title: string;
    description: string;
    kind: TimelineKind;
    /** Pill text. */
    status: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
    {
        id: "pf-esic-15",
        date: "2024-04-15",
        dateLabel: "15 April",
        dateNote: "(Today)",
        title: "PF & ESIC remittance",
        description:
            "Deposit PF & ESIC contributions for the month of March 2024 and file ECR.",
        kind: "alert",
        status: "Pending",
    },
    {
        id: "pt-25",
        date: "2024-04-25",
        dateLabel: "25 April",
        title: "Professional tax (PT)",
        description: "File PT return and pay tax for applicable states (KA, MH, TS).",
        kind: "filing",
        status: "Upcoming",
    },
    {
        id: "tds-30",
        date: "2024-04-30",
        dateLabel: "30 April",
        title: "TDS payment",
        description: "Deposit TDS deducted under section 192 for March 2024.",
        kind: "done",
        status: "Done",
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Static visual map per timeline kind
//
// IMPORTANT — Tailwind v4 JIT only picks up class names it can statically see.
// Keep every entry as a literal string so the compiler resolves the classes
// reliably in production. Do NOT introduce template-literal class names like
// `bg-${kind}-500/10` here.
// ─────────────────────────────────────────────────────────────────────────────

interface TimelineTone {
    icon: typeof AlertCircle;
    bullet: string;
    card: string;
    cardHover: string;
    dateText: string;
    titleText: string;
    titleExtra: string;
    descText: string;
    badgeVariant: BadgeVariant;
}

const KIND_TONE: Record<TimelineKind, TimelineTone> = {
    alert: {
        icon: AlertCircle,
        bullet: "bg-amber-500 text-white shadow shadow-amber-500/50",
        card: "bg-[#060B14] border border-amber-500/30",
        cardHover: "",
        dateText: "text-amber-500",
        titleText: "text-white",
        titleExtra: "",
        descText: "text-slate-500",
        badgeVariant: "warning",
    },
    filing: {
        icon: FileText,
        bullet: "bg-blue-500 text-white",
        card: "bg-[#060B14] border border-[#1A2A3A]",
        cardHover: "transition-colors hover:border-slate-700",
        dateText: "text-blue-500",
        titleText: "text-slate-200",
        titleExtra: "",
        descText: "text-slate-500",
        badgeVariant: "info",
    },
    done: {
        icon: CheckCircle,
        bullet: "bg-[#1A2A3A] text-slate-500",
        card: "bg-[#060B14]/50 border border-[#1A2A3A]/50",
        cardHover: "",
        dateText: "text-slate-500",
        titleText: "text-slate-400",
        titleExtra: "line-through",
        descText: "text-slate-600",
        badgeVariant: "success",
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ComplianceCalendar() {
    return (
        <Page
            title="Statutory calendar"
            subtitle="Track all upcoming compliance deadlines across states and acts."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Calendar" },
            ]}
            maxWidth="1280px"
        >
            <div className="space-y-6">
                {/* Calendar nav strip */}
                <Card padding="sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                aria-label="Previous month"
                                icon={<ChevronLeft size={16} aria-hidden="true" />}
                            />
                            <h2 className="w-40 text-center text-sm font-black uppercase tracking-widest text-white">
                                April 2024
                            </h2>
                            <Button
                                variant="outline"
                                size="sm"
                                aria-label="Next month"
                                icon={<ChevronRight size={16} aria-hidden="true" />}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<Filter size={14} aria-hidden="true" />}
                            >
                                Filter by act
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                icon={<Filter size={14} aria-hidden="true" />}
                            >
                                State (Pan-India)
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Schedule + sidebar */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Timeline */}
                    <Card padding="lg" className="lg:col-span-3">
                        <h2 className="sr-only">April 2024 deadlines</h2>
                        <ol
                            role="list"
                            aria-label="April 2024 deadlines"
                            className="relative space-y-10 pl-6 before:absolute before:inset-0 before:ml-[31px] before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-[#1A2A3A] before:to-transparent md:before:mx-auto md:before:translate-x-0"
                        >
                            {TIMELINE_EVENTS.map((ev) => {
                                const tone = KIND_TONE[ev.kind];
                                const Icon = tone.icon;
                                return (
                                    <li
                                        key={ev.id}
                                        className="group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                                    >
                                        <div
                                            className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#0D1928] md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${tone.bullet}`}
                                        >
                                            <Icon size={16} aria-hidden="true" />
                                        </div>
                                        <div
                                            className={`w-[calc(100%-4rem)] rounded-2xl p-5 shadow-lg md:w-[calc(50%-2.5rem)] ${tone.card} ${tone.cardHover}`}
                                        >
                                            <div className="mb-2 flex items-center justify-between gap-2">
                                                <time
                                                    dateTime={ev.date}
                                                    className={`text-xs font-black uppercase tracking-widest ${tone.dateText}`}
                                                >
                                                    {ev.dateLabel}
                                                    {ev.dateNote ? ` ${ev.dateNote}` : ""}
                                                </time>
                                                <Badge variant={tone.badgeVariant}>
                                                    {ev.status}
                                                </Badge>
                                            </div>
                                            <h3
                                                className={`text-sm font-black uppercase tracking-tight ${tone.titleText} ${tone.titleExtra}`}
                                            >
                                                {ev.title}
                                            </h3>
                                            <p
                                                className={`mt-1 text-[10px] font-medium italic leading-relaxed ${tone.descText}`}
                                            >
                                                {ev.description}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </Card>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Notification settings */}
                        <Card padding="md">
                            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                Notification settings
                            </h3>
                            <div className="space-y-4">
                                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 focus-within:ring-2 focus-within:ring-emerald-500/50">
                                    <span className="flex items-center gap-3">
                                        <Bell
                                            size={16}
                                            className="text-slate-500"
                                            aria-hidden="true"
                                        />
                                        <span className="text-xs font-bold text-slate-300">
                                            Email alerts
                                        </span>
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        defaultChecked
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="relative h-4 w-8 shrink-0 rounded-full bg-[#1A2A3A] transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-3 after:w-3 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-emerald-500 peer-checked:after:translate-x-4"
                                    />
                                </label>

                                <button
                                    type="button"
                                    className="flex w-full items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-[10px] font-black uppercase tracking-widest text-blue-500 transition-all hover:bg-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                                >
                                    <Download size={14} aria-hidden="true" />
                                    Sync to Google Calendar
                                </button>
                            </div>
                        </Card>

                        {/* Statutory support promo */}
                        <Card
                            padding="lg"
                            className="bg-gradient-to-br from-[#1A2A3A] to-[#0D1928]"
                        >
                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-tight text-white">
                                    Need statutory support?
                                </h3>
                                <p className="text-[11px] font-medium leading-relaxed text-slate-400">
                                    Connect with our panel of labour law consultants for complex
                                    filings.
                                </p>
                                <Button variant="primary" className="w-full">
                                    Request callback
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
