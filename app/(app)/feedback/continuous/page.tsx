"use client";
import { useState } from "react";
import { Plus, ThumbsUp, Send, Star } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface FeedItem {
    from: string;
    role: string;
    avatar: string;
    time: string;
    text: string;
    type: "praise" | "constructive";
    rating: number;
}

const FEED: FeedItem[] = [
    {
        from: "Ravi Kumar",
        role: "Eng Lead",
        avatar: "RK",
        time: "2h ago",
        text: "Great job facilitating today's cross-team meeting — kept everyone aligned and action-focused.",
        type: "praise",
        rating: 5,
    },
    {
        from: "Sneha Rao",
        role: "Product Manager",
        avatar: "SR",
        time: "Yesterday",
        text: "Would love to see more proactive communication on blockers before they escalate. Overall strong cycle.",
        type: "constructive",
        rating: 3,
    },
    {
        from: "Kavita Joshi",
        role: "HR Manager",
        avatar: "KJ",
        time: "3 days ago",
        text: "Really appreciate how you handled the difficult vendor conversation. Showed strong ownership.",
        type: "praise",
        rating: 4,
    },
    {
        from: "Arjun Singh",
        role: "Marketing Head",
        avatar: "AS",
        time: "5 days ago",
        text: "Documentation could be more structured. Otherwise, the collaboration was excellent.",
        type: "constructive",
        rating: 3,
    },
];

const TYPE_VARIANT: Record<FeedItem["type"], "success" | "warning"> = {
    praise: "success",
    constructive: "warning",
};

const TYPE_LABEL: Record<FeedItem["type"], string> = {
    praise: "Praise",
    constructive: "Constructive",
};

export default function ContinuousFeedbackPage() {
    const [newText, setNewText] = useState("");
    const [newRecipient, setNewRecipient] = useState("");

    const canSend = newText.trim().length > 0 && newRecipient.trim().length > 0;

    return (
        <Page
            title="Continuous Feedback"
            subtitle="Real-time peer feedback — give and receive anytime"
            breadcrumbs={[
                { label: "Feedback", href: "/feedback/dashboard" },
                { label: "Continuous Feedback" },
            ]}
            maxWidth="900px"
        >
            {/* Give quick feedback */}
            <Card padding="lg">
                <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Plus size={14} className="text-[#00E5A0]" aria-hidden="true" />
                    Give Quick Feedback
                </h2>
                <div className="space-y-3">
                    <div>
                        <label
                            htmlFor="cf-recipient"
                            className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                        >
                            To
                        </label>
                        <input
                            id="cf-recipient"
                            type="text"
                            value={newRecipient}
                            onChange={(e) => setNewRecipient(e.target.value)}
                            placeholder="Search employee…"
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="cf-text"
                            className="block text-xs font-semibold text-[#8899AA] mb-1.5"
                        >
                            Feedback
                        </label>
                        <textarea
                            id="cf-text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            placeholder="Specific, actionable, and kind…"
                            rows={3}
                            className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            icon={<Send size={13} />}
                            disabled={!canSend}
                        >
                            Send Feedback
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Feed */}
            <section aria-labelledby="feed-heading">
                <h2
                    id="feed-heading"
                    className="text-sm font-semibold text-white mb-3"
                >
                    Recent Feedback Received
                </h2>
                <ol role="list" className="space-y-4">
                    {FEED.map((f, i) => (
                        <li key={i}>
                            <Card padding="md">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-9 h-9 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0"
                                        aria-hidden="true"
                                    >
                                        {f.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-white">{f.from}</span>
                                            <span className="text-xs text-[#445566]">·</span>
                                            <span className="text-xs text-[#8899AA]">{f.role}</span>
                                            <span className="text-xs text-[#445566] ml-auto">{f.time}</span>
                                        </div>
                                        <p className="text-sm text-[#CCDDEE] mb-3">{f.text}</p>
                                        <div className="flex items-center gap-3">
                                            <Badge variant={TYPE_VARIANT[f.type]}>
                                                {TYPE_LABEL[f.type]}
                                            </Badge>
                                            <div
                                                className="flex items-center gap-0.5"
                                                aria-label={`Rating: ${f.rating} out of 5`}
                                            >
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <Star
                                                        key={n}
                                                        size={12}
                                                        className={
                                                            n <= f.rating
                                                                ? "text-[#FFB800] fill-[#FFB800]"
                                                                : "text-[#2A3A4A]"
                                                        }
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                icon={<ThumbsUp size={12} />}
                                                aria-label="Like this feedback"
                                            >
                                                Helpful
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ol>
            </section>
        </Page>
    );
}
