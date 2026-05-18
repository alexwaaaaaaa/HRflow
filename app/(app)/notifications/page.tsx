"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
    Bell,
    Check,
    MoreVertical,
    Star,
    ShieldAlert,
    Award,
    CalendarHeart,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import EmptyTable from "@/components/ui/EmptyTable";

type NotificationType = "alert" | "mention" | "achievement" | "event" | "system";

interface NotificationItem {
    id: number;
    type: NotificationType;
    title: string;
    desc: string;
    time: string;
    unread: boolean;
    icon: ReactNode;
}

const NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        type: "alert",
        title: "Server CPU Spiked",
        desc: "Production server CPU reached 95% for 10 minutes.",
        time: "10m ago",
        unread: true,
        icon: <ShieldAlert className="text-red-500" size={18} aria-hidden="true" />,
    },
    {
        id: 2,
        type: "mention",
        title: "Mentioned you in a comment",
        desc: '@arjun flagged you in "Q3 Performance Review Draft".',
        time: "1h ago",
        unread: true,
        icon: <Star className="text-amber-500" size={18} aria-hidden="true" />,
    },
    {
        id: 3,
        type: "achievement",
        title: "Badge Earned: Code Ninja",
        desc: "You merged 50 Pull Requests this month.",
        time: "2h ago",
        unread: false,
        icon: <Award className="text-indigo-500" size={18} aria-hidden="true" />,
    },
    {
        id: 4,
        type: "event",
        title: "Upcoming Work Anniversary",
        desc: "Priya Sharma completes 5 years tomorrow.",
        time: "1d ago",
        unread: false,
        icon: <CalendarHeart className="text-pink-500" size={18} aria-hidden="true" />,
    },
];

const FILTERS = ["All", "Unread", "Mentions", "System"] as const;
type Filter = (typeof FILTERS)[number];

export default function NotificationsPage() {
    const [filter, setFilter] = useState<Filter>("All");
    const [items, setItems] = useState(NOTIFICATIONS);

    const filtered = useMemo(() => {
        switch (filter) {
            case "Unread":
                return items.filter((n) => n.unread);
            case "Mentions":
                return items.filter((n) => n.type === "mention");
            case "System":
                return items.filter((n) => n.type === "alert" || n.type === "system");
            default:
                return items;
        }
    }, [filter, items]);

    const unreadCount = items.filter((n) => n.unread).length;

    const markAllRead = () =>
        setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    const toggleRead = (id: number) =>
        setItems((prev) =>
            prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
        );

    return (
        <Page
            title="Notifications"
            subtitle="Manage alerts, mentions, and system updates"
            breadcrumbs={[{ label: "Notifications" }]}
            maxWidth="900px"
            actions={
                <Button
                    variant="ghost"
                    size="md"
                    icon={<Check size={14} />





}
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                >
                    Mark all read{unreadCount > 0 ? ` (${unreadCount})` : ""}
                </Button>
            }
        >
            <div className="space-y-4">
                {/* Filter chips */}
                <div
                    role="tablist"
                    aria-label="Notification filters"
                    className="flex flex-wrap gap-2 border-b border-[#1A2A3A] pb-3"
                >
                    {FILTERS.map((f) => {
                        const active = filter === f;
                        return (
                            <button
                                key={f}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setFilter(f)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-[#1A2A3A] text-white"
                                        : "text-[#8899AA] hover:bg-[#0A1420] hover:text-[#c8d8e8]"
                                }`}
                            >
                                {f}
                            </button>
                        );
                    })}
                </div>

                {/* Feed */}
                {filtered.length === 0 ? (
                    <Card>
                        <EmptyTable
                            icon={<Bell size={20} className="text-[#00e5a0]" aria-hidden="true" />}
                            title="You're all caught up"
                            description="No notifications match this filter right now."
                        />
                    </Card>
                ) : (
                    <ul className="space-y-3" aria-label="Notification feed">
                        {filtered.map((n) => (
                            <li key={n.id}>
                                <article
                                    className={`group flex items-start gap-4 rounded-xl border p-4 transition-colors ${
                                        n.unread
                                            ? "border-[#1A2A3A] bg-[#0D1928] shadow-lg shadow-[#00e5a0]/5"
                                            : "border-transparent bg-transparent hover:bg-[#0A1420]"
                                    }`}
                                >
                                    <div
                                        className={`mt-1 shrink-0 rounded-full p-2 ${
                                            n.unread ? "bg-[#1A2A3A]" : "bg-[#0A1420]"
                                        }`}
                                    >
                                        {n.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <header className="mb-1 flex flex-wrap items-center justify-between gap-2">
                                            <h3
                                                className={`text-sm font-semibold ${
                                                    n.unread ? "text-white" : "text-[#8899AA]"
                                                }`}
                                            >
                                                {n.title}
                                            </h3>
                                            <span className="whitespace-nowrap text-xs text-[#556677]">
                                                {n.time}
                                            </span>
                                        </header>
                                        <p
                                            className={`text-sm ${
                                                n.unread ? "text-[#c8d8e8]" : "text-[#556677]"
                                            }`}
                                        >
                                            {n.desc}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        {n.unread && (
                                            <span
                                                aria-label="Unread"
                                                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#00e5a0]"
                                            />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => toggleRead(n.id)}
                                            aria-label={n.unread ? "Mark as read" : "Mark as unread"}
                                            className="rounded p-1 text-[#556677] transition-colors hover:text-white"
                                        >
                                            <MoreVertical size={16} aria-hidden="true" />
                                        </button>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        

        

        

        </Page>
    );
}
