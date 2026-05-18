"use client";
import { useState } from "react";
import { Heart, Plus, Send, Smile, Zap, Star, Award } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface BadgeOption {
    icon: React.ElementType;
    label: string;
    color: string;
    selectedClass: string;
    iconBg: string;
}

const BADGES: BadgeOption[] = [
    { icon: Star, label: "Star Performer", color: "#FFB800", selectedClass: "border-[#FFB800] bg-[#FFB800]/10 text-[#FFB800]", iconBg: "bg-[#FFB800]/20" },
    { icon: Zap, label: "Problem Solver", color: "#9D00FF", selectedClass: "border-[#9D00FF] bg-[#9D00FF]/10 text-[#9D00FF]", iconBg: "bg-[#9D00FF]/20" },
    { icon: Heart, label: "Team Player", color: "#FF4444", selectedClass: "border-[#FF4444] bg-[#FF4444]/10 text-[#FF4444]", iconBg: "bg-[#FF4444]/20" },
    { icon: Award, label: "Innovation Champion", color: "#00E5A0", selectedClass: "border-[#00E5A0] bg-[#00E5A0]/10 text-[#00E5A0]", iconBg: "bg-[#00E5A0]/20" },
    { icon: Smile, label: "Culture Ambassador", color: "#0066FF", selectedClass: "border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF]", iconBg: "bg-[#0066FF]/20" },
];

interface KudosItem {
    from: string;
    to: string;
    badge: string;
    note: string;
    time: string;
    likes: number;
}

const KUDOS_FEED: KudosItem[] = [
    { from: "Kavita Joshi", to: "Ravi Kumar", badge: "Problem Solver", note: "Brilliant debugging session that saved our release!", time: "1h ago", likes: 12 },
    { from: "Arjun Singh", to: "Sneha Rao", badge: "Team Player", note: "Always goes above and beyond to unblock the team. Absolute legend!", time: "3h ago", likes: 8 },
    { from: "Priya Mehta", to: "Rahul Gupta", badge: "Star Performer", note: "Delivered the ops migration 2 weeks early. Outstanding work!", time: "1d ago", likes: 15 },
];

export default function KudosPage() {
    const [recipient, setRecipient] = useState("");
    const [note, setNote] = useState("");
    const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
    const [liked, setLiked] = useState<number[]>([]);

    const canSend = recipient.trim().length > 0 && selectedBadge !== null && note.trim().length > 0;

    return (
        <Page
            title="Kudos Wall"
            subtitle="Celebrate and recognize your teammates publicly"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Kudos" },
            ]}
            maxWidth="900px"
        >
            {/* Give Kudos card */}
            <Card padding="lg">
                <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Plus size={14} className="text-[#FFB800]" aria-hidden="true" />
                    Give Kudos
                </h2>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="kudos-recipient"
                            className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                        >
                            To
                        </label>
                        <input
                            id="kudos-recipient"
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Search teammate…"
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FFB800]"
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-[#8899AA] mb-2">Select a Badge</p>
                        <div
                            className="flex flex-wrap gap-2"
                            role="radiogroup"
                            aria-label="Select recognition badge"
                        >
                            {BADGES.map((b) => {
                                const isSelected = selectedBadge === b.label;
                                return (
                                    <label key={b.label} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="badge"
                                            value={b.label}
                                            className="sr-only"
                                            onChange={() => setSelectedBadge(b.label)}
                                            checked={isSelected}
                                        />
                                        <div
                                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                                                isSelected
                                                    ? b.selectedClass
                                                    : "border-[#1A2A3A] text-[#445566] hover:border-[#2A3A4A]"
                                            }`}
                                            aria-hidden="true"
                                        >
                                            <b.icon
                                                size={13}
                                                style={isSelected ? { color: b.color } : {}}
                                                aria-hidden="true"
                                            />
                                            {b.label}
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="kudos-note"
                            className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                        >
                            Message
                        </label>
                        <textarea
                            id="kudos-note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Tell them specifically why they deserve this kudos…"
                            rows={3}
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#FFB800] resize-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            icon={<Send size={13} />}
                            disabled={!canSend}
                        >
                            Send Kudos
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Feed */}
            <section aria-labelledby="kudos-feed-heading">
                <h2
                    id="kudos-feed-heading"
                    className="text-base font-semibold text-white mb-4"
                >
                    Recent Kudos
                </h2>
                <ol role="list" className="space-y-4">
                    {KUDOS_FEED.map((k, i) => {
                        const badge = BADGES.find((b) => b.label === k.badge) ?? BADGES[0];
                        const isLiked = liked.includes(i);
                        return (
                            <li key={i}>
                                <Card padding="md">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${badge.iconBg}`}
                                            aria-hidden="true"
                                        >
                                            <badge.icon size={18} style={{ color: badge.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                                <span className="text-sm font-bold text-white">{k.from}</span>
                                                <span className="text-xs text-[#445566]">→</span>
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{ color: badge.color }}
                                                >
                                                    {k.to}
                                                </span>
                                                <span
                                                    className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                                                    style={{
                                                        color: badge.color,
                                                        borderColor: badge.color + "40",
                                                        background: badge.color + "15",
                                                    }}
                                                >
                                                    {k.badge}
                                                </span>
                                                <span className="ml-auto text-xs text-[#445566]">
                                                    {k.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#CCDDEE] mb-3">{k.note}</p>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                icon={
                                                    <Heart
                                                        size={13}
                                                        className={isLiked ? "fill-[#FF4444] text-[#FF4444]" : ""}
                                                        aria-hidden="true"
                                                    />
                                                }
                                                aria-pressed={isLiked}
                                                aria-label={`${isLiked ? "Unlike" : "Like"} kudos for ${k.to}`}
                                                onClick={() =>
                                                    setLiked((prev) =>
                                                        isLiked
                                                            ? prev.filter((n) => n !== i)
                                                            : [...prev, i]
                                                    )
                                                }
                                                className={isLiked ? "text-[#FF4444]" : ""}
                                            >
                                                {k.likes + (isLiked ? 1 : 0)} Likes
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </li>
                        );
                    })}
                </ol>
            </section>
        </Page>
    );
}
