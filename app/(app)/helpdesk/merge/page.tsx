"use client";
import { useState } from "react";
import { GitMerge, Search, AlertCircle, ArrowRight, CheckCircle2, X } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface TicketItem {
    id: string;
    title: string;
    user: string;
    time: string;
    status: string;
}

const TICKETS: TicketItem[] = [
    { id: "TKT-4470", title: "Office wifi down in sector 4", user: "Priya Singh", time: "2d ago", status: "Open" },
    { id: "TKT-4475", title: "Cannot connect to WiFi", user: "Rahul Sharma", time: "1d ago", status: "Open" },
    { id: "TKT-4481", title: "Internet is not working on 4th floor", user: "Sneha Rao", time: "12h ago", status: "Open" },
    { id: "TKT-4490", title: "Wifi disconnected", user: "Kabir Das", time: "2h ago", status: "Open" },
];

export default function TicketMergePage() {
    const [primaryTicket, setPrimaryTicket] = useState("TKT-4470");
    const [selectedTickets, setSelectedTickets] = useState<string[]>(["TKT-4475", "TKT-4481"]);
    const [merged, setMerged] = useState(false);

    const toggleSelect = (id: string) => {
        if (id === primaryTicket) return;
        if (selectedTickets.includes(id)) {
            setSelectedTickets(selectedTickets.filter((t) => t !== id));
        } else {
            setSelectedTickets([...selectedTickets, id]);
        }
    };

    if (merged) {
        return (
            <Page
                title="Merge Duplicate Tickets"
                breadcrumbs={[
                    { label: "Helpdesk", href: "/helpdesk/dashboard" },
                    { label: "Merge" },
                ]}
                maxWidth="800px"
            >
                <Card padding="lg">
                    <div className="flex flex-col items-center py-8 text-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#00E5A0]/10 text-[#00E5A0]">
                            <GitMerge size={40} aria-hidden="true" />
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-white">Tickets Merged Successfully</h2>
                        <p className="mb-8 text-[#8899AA]">
                            Selected tickets have been closed and linked to the primary ticket{" "}
                            {primaryTicket}.
                        </p>
                        <Button variant="secondary" href="/helpdesk/management">Return to Queue</Button>
                    </div>
                </Card>
            </Page>
        );
    }

    const primaryData = TICKETS.find((t) => t.id === primaryTicket);

    return (
        <Page
            title="Merge Duplicate Tickets"
            subtitle="Combine redundant requests into a single primary ticket. All communications will be consolidated."
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Merge" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Left: Search & Select */}
                <div className="space-y-6">
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]"
                            size={18}
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            placeholder="Search tickets by keyword to find duplicates..."
                            defaultValue="wifi"
                            aria-label="Search for duplicate tickets"
                            className="w-full rounded-xl border border-[#1A2A3A] bg-[#0F1C2E] py-3 pl-12 pr-4 text-white outline-none transition-colors focus:border-[#FFB020]"
                        />
                    </div>

                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#152336] p-4">
                            <h3 className="text-sm font-bold text-white">Search Results (4)</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {TICKETS.map((ticket) => {
                                const isPrimary = ticket.id === primaryTicket;
                                const isSelected = selectedTickets.includes(ticket.id);
                                return (
                                    <div
                                        key={ticket.id}
                                        onClick={() => toggleSelect(ticket.id)}
                                        className={`flex cursor-pointer items-start gap-4 border-l-2 p-4 transition-colors ${
                                            isPrimary
                                                ? "border-l-[#FFB020] bg-[#FFB020]/10"
                                                : isSelected
                                                ? "border-l-[#33E6FF] bg-[#1A2A3A]"
                                                : "border-l-transparent hover:bg-[#1A2A3A]/50"
                                        }`}
                                    >
                                        <div className="mt-1">
                                            {isPrimary ? (
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFB020] text-[#0A1420]">
                                                    <CheckCircle2 size={12} aria-hidden="true" />
                                                </div>
                                            ) : (
                                                <input
                                                    type="checkbox"
                                                    readOnly
                                                    checked={isSelected}
                                                    aria-label={`Select ${ticket.id}`}
                                                    className="h-5 w-5 cursor-pointer rounded border-[#2A3A4A] bg-[#0A1420] text-[#33E6FF] focus:ring-0"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="font-mono text-xs font-semibold text-[#8899AA]">
                                                    {ticket.id}
                                                </span>
                                                {isPrimary && (
                                                    <Badge variant="warning">Primary</Badge>
                                                )}
                                            </div>
                                            <h4
                                                className={`mb-1 text-sm font-semibold ${
                                                    isPrimary || isSelected ? "text-white" : "text-[#8899AA]"
                                                }`}
                                            >
                                                {ticket.title}
                                            </h4>
                                            <p className="text-xs text-[#445566]">
                                                Requester: {ticket.user} • Created: {ticket.time}
                                            </p>
                                        </div>
                                        {!isPrimary && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPrimaryTicket(ticket.id);
                                                    setSelectedTickets(
                                                        selectedTickets.filter((id) => id !== ticket.id)
                                                    );
                                                }}
                                                className="rounded border border-[#2A3A4A] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8899AA] transition-colors hover:border-[#FFB020] hover:text-[#FFB020]"
                                            >
                                                Make Primary
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Right: Merge Preview */}
                <div>
                    <Card padding="lg">
                        <h3 className="mb-6 flex items-center gap-2 font-bold text-white">
                            <GitMerge size={20} className="text-[#33E6FF]" aria-hidden="true" />
                            Merge Plan
                        </h3>

                        {/* Primary Target */}
                        <div className="mb-8">
                            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#FFB020]">
                                Will Merge Into (Primary)
                            </span>
                            <div className="rounded-xl border border-[#FFB020]/50 bg-[#0F1C2E] p-4">
                                <span className="mb-1 block font-mono text-xs text-[#8899AA]">
                                    {primaryData?.id}
                                </span>
                                <h4 className="font-semibold text-white">{primaryData?.title}</h4>
                            </div>
                        </div>

                        {/* Source Duplicates */}
                        <div>
                            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                                Tickets to be closed as &apos;Duplicate&apos;
                            </span>
                            {selectedTickets.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-[#1A2A3A] bg-[#0A1420] p-4 text-center text-sm italic text-[#445566]">
                                    Select tickets from the left to merge.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {selectedTickets.map((id) => {
                                        const t = TICKETS.find((tk) => tk.id === id);
                                        return (
                                            <div
                                                key={id}
                                                className="flex items-center justify-between rounded-xl border border-[#2A3A4A] bg-[#0A1420] p-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <ArrowRight
                                                        size={16}
                                                        className="text-[#33E6FF]"
                                                        aria-hidden="true"
                                                    />
                                                    <div>
                                                        <span className="mb-0.5 block font-mono text-xs text-[#8899AA]">
                                                            {id}
                                                        </span>
                                                        <h4 className="text-sm font-medium text-[#8899AA] line-through decoration-[#445566]">
                                                            {t?.title}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSelect(id)}
                                                    aria-label={`Remove ${id} from merge`}
                                                    className="text-[#445566] transition-colors hover:text-[#FF4444]"
                                                >
                                                    <X size={16} aria-hidden="true" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Confirm */}
                        <div className="mt-10 border-t border-[#2A3A4A] pt-6">
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#FFB020]/20 bg-[#FFB020]/10 p-4">
                                <AlertCircle
                                    size={20}
                                    className="mt-0.5 shrink-0 text-[#FFB020]"
                                    aria-hidden="true"
                                />
                                <div>
                                    <h4 className="mb-1 text-sm font-bold text-[#FFB020]">
                                        Confirm Merge Action
                                    </h4>
                                    <p className="text-xs text-[#8899AA]">
                                        Requesters of duplicate tickets will receive an automated email
                                        notifying them that their ticket was merged. This action cannot be
                                        undone easily.
                                    </p>
                                </div>
                            </div>
                            <Button
                                disabled={selectedTickets.length === 0}
                                onClick={() => setMerged(true)}
                                className="w-full"
                            >
                                Merge {selectedTickets.length} Tickets
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
