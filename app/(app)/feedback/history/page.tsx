"use client";
import { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface HistoryItem {
    id: string;
    cycle: string;
    type: string;
    direction: "received" | "given" | "self";
    from: string;
    rating: number;
    date: string;
    summary: string;
}

const HISTORY: HistoryItem[] = [
    { id: "h1", cycle: "Mid-Year 2025", type: "360 Review", direction: "received", from: "Ravi Kumar", rating: 4.3, date: "Mar 5, 2025", summary: "Strong ownership, excellent cross-team collaboration." },
    { id: "h2", cycle: "Mid-Year 2025", type: "360 Review", direction: "given", from: "Me → Sneha Rao", rating: 4.0, date: "Mar 4, 2025", summary: "Great product instincts, needs stronger stakeholder management." },
    { id: "h3", cycle: "Q4 2024", type: "Peer Review", direction: "received", from: "Arjun Singh", rating: 3.8, date: "Dec 10, 2024", summary: "Good delivery but communication could be more proactive." },
    { id: "h4", cycle: "Q4 2024", type: "Peer Review", direction: "given", from: "Me → Rahul Gupta", rating: 4.5, date: "Dec 8, 2024", summary: "Exceptional ops management, highly reliable." },
    { id: "h5", cycle: "Q3 2024", type: "Self Assessment", direction: "self", from: "Myself", rating: 3.9, date: "Sep 15, 2024", summary: "Need to improve delegation and escalation judgment." },
];

const DIR_VARIANT: Record<HistoryItem["direction"], "success" | "info" | "purple"> = {
    received: "success",
    given: "info",
    self: "purple",
};

const DIR_LABEL: Record<HistoryItem["direction"], string> = {
    received: "Received",
    given: "Given",
    self: "Self",
};

const DIRECTION_FILTERS = ["all", "received", "given", "self"] as const;
type DirectionFilter = typeof DIRECTION_FILTERS[number];

const COLUMNS: Column<HistoryItem>[] = [
    {
        key: "direction",
        label: "Direction",
        render: (h) => <Badge variant={DIR_VARIANT[h.direction]}>{DIR_LABEL[h.direction]}</Badge>,
    },
    {
        key: "from",
        label: "From / To",
        render: (h) => <span className="text-sm font-semibold text-white">{h.from}</span>,
        sortable: true,
        sortValue: (h) => h.from,
    },
    {
        key: "type",
        label: "Type",
        render: (h) => (
            <div>
                <p className="text-xs text-white">{h.type}</p>
                <p className="text-[10px] text-[#445566]">{h.cycle}</p>
            </div>
        ),
        sortable: true,
        sortValue: (h) => h.cycle,
    },
    {
        key: "rating",
        label: "Rating",
        align: "center",
        render: (h) => (
            <div className="flex items-center gap-1 justify-center" aria-label={`Rating: ${h.rating} out of 5`}>
                <Star size={13} className="text-[#FFB800] fill-[#FFB800]" aria-hidden="true" />
                <span className="text-sm font-bold text-white">{h.rating}</span>
            </div>
        ),
        sortable: true,
        sortValue: (h) => h.rating,
    },
    {
        key: "date",
        label: "Date",
        render: (h) => <span className="text-xs text-[#445566]">{h.date}</span>,
        hideOnMobile: true,
    },
    {
        key: "summary",
        label: "Summary",
        render: (h) => <p className="text-sm text-[#8899AA] leading-relaxed">{h.summary}</p>,
        hideOnMobile: true,
    },
];

export default function FeedbackHistoryPage() {
    const [dir, setDir] = useState<DirectionFilter>("all");

    const filtered = HISTORY.filter((h) => dir === "all" || h.direction === dir);

    return (
        <Page
            title="Feedback History"
            subtitle="All feedback received and given across cycles"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "History" },
            ]}
            maxWidth="1100px"
        >
            <Card padding="lg">
                {/* Direction filter */}
                <div
                    className="flex items-center gap-1 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-1 mb-4 w-fit"
                    role="group"
                    aria-label="Filter by direction"
                >
                    {DIRECTION_FILTERS.map((d) => (
                        <button
                            key={d}
                            type="button"
                            onClick={() => setDir(d)}
                            aria-pressed={dir === d}
                            className={`px-3 py-1.5 capitalize text-xs font-semibold rounded-lg transition-colors ${
                                dir === d ? "bg-[#0066FF] text-white" : "text-[#8899AA] hover:text-white"
                            }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>

                <DataTable<HistoryItem>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(h) => h.id}
                    searchable
                    searchPlaceholder="Search by person or cycle…"
                    aria-label="Feedback history"
                    emptyTitle="No feedback found"
                    emptyDescription="Try adjusting the filter above."
                    emptyAction={
                        <div className="flex flex-col items-center gap-2 text-[#445566]">
                            <MessageCircle size={32} className="opacity-30" aria-hidden="true" />
                        </div>
                    }
                />
            </Card>
        </Page>
    );
}
