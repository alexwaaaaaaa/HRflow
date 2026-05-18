"use client";
import Link from "next/link";
import { MessageSquare, Plus, Clock, Star, Users, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";

interface KpiItem {
    label: string;
    value: string;
    sub: string;
    icon: React.ElementType;
    color: string;
    iconBg: string;
}

const KPI: KpiItem[] = [
    { label: "Pending Requests", value: "3", sub: "2 overdue", icon: Clock, color: "#FF4444", iconBg: "bg-[#FF4444]/20" },
    { label: "Received Feedback", value: "12", sub: "This cycle", icon: MessageSquare, color: "#00E5A0", iconBg: "bg-[#00E5A0]/20" },
    { label: "Avg Rating", value: "4.2", sub: "+0.3 vs last cycle", icon: Star, color: "#FFB800", iconBg: "bg-[#FFB800]/20" },
    { label: "Reviewers Coverage", value: "87%", sub: "8 of 9 contributed", icon: Users, color: "#0066FF", iconBg: "bg-[#0066FF]/20" },
];

interface PendingItem {
    name: string;
    role: string;
    due: string;
    avatar: string;
}

const PENDING: PendingItem[] = [
    { name: "Ravi Kumar", role: "Engineering Lead", due: "Mar 15", avatar: "RK" },
    { name: "Sneha Rao", role: "Product Manager", due: "Mar 16", avatar: "SR" },
    { name: "Arjun Singh", role: "Marketing Head", due: "Mar 18", avatar: "AS" },
];

const RADAR_DATA = [
    { subject: "Leadership", A: 4.2 },
    { subject: "Execution", A: 4.0 },
    { subject: "Collaboration", A: 4.5 },
    { subject: "Communication", A: 3.8 },
    { subject: "Innovation", A: 4.1 },
    { subject: "Problem Solving", A: 4.3 },
];

interface QuickLink {
    label: string;
    href: string;
    icon: React.ElementType;
    color: string;
    iconBg: string;
}

const QUICK_LINKS: QuickLink[] = [
    { label: "View My Report", href: "/feedback/report", icon: BarChart2, color: "#00E5A0", iconBg: "bg-[#00E5A0]/20" },
    { label: "Feedback History", href: "/feedback/history", icon: Clock, color: "#0066FF", iconBg: "bg-[#0066FF]/20" },
    { label: "Give Kudos", href: "/feedback/kudos", icon: Star, color: "#FFB800", iconBg: "bg-[#FFB800]/20" },
    { label: "Competency Assessment", href: "/feedback/competency", icon: CheckCircle2, color: "#9D00FF", iconBg: "bg-[#9D00FF]/20" },
];

export default function FeedbackDashboardPage() {
    return (
        <Page
            title="360° Feedback Dashboard"
            subtitle="Multi-rater feedback hub — Mid-Year cycle · Q1 2025"
            breadcrumbs={[{ label: "Feedback" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<Plus size={14} />}
                        aria-label="Request feedback"
                        href="/feedback/request"
                    >
                        Request Feedback
                    </Button>
                    <Button icon={<Star size={14} />} href="/feedback/give">Give Feedback</Button>
                </>
            }
        >
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {KPI.map((k) => (
                    <Card key={k.label} padding="md">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-xs text-[#8899AA] font-medium">{k.label}</p>
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${k.iconBg}`}
                                aria-hidden="true"
                            >
                                <k.icon size={14} style={{ color: k.color }} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{k.value}</p>
                        <p className="text-[11px] text-[#8899AA]">{k.sub}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending */}
                <section
                    className="lg:col-span-2"
                    aria-labelledby="pending-heading"
                >
                    <Card padding="none">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2A3A]">
                            <h2
                                id="pending-heading"
                                className="text-base font-semibold text-white"
                            >
                                Pending Feedback Requests
                            </h2>
                            <Link
                                href="/feedback/give"
                                className="text-xs text-[#c084fc] hover:underline flex items-center gap-1"
                            >
                                Give All <ChevronRight size={12} aria-hidden="true" />
                            </Link>
                        </div>
                        <ul role="list" className="divide-y divide-[#1A2A3A]">
                            {PENDING.map((p) => (
                                <li
                                    key={p.name}
                                    className="flex items-center gap-4 px-6 py-4 hover:bg-[#152336] transition-colors"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full bg-[#9D00FF]/20 border border-[#9D00FF]/30 flex items-center justify-center text-sm font-bold text-[#c084fc] shrink-0"
                                        aria-hidden="true"
                                    >
                                        {p.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white">{p.name}</p>
                                        <p className="text-xs text-[#8899AA]">{p.role}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <Badge variant="danger" dot>
                                            Due {p.due}
                                        </Badge>
                                        <div className="mt-2">
                                            <Link
                                                href={`/feedback/form?for=${encodeURIComponent(p.name)}`}
                                                className="text-xs font-bold text-[#c084fc] border border-[#9D00FF]/30 bg-[#9D00FF]/10 px-3 py-1 rounded-lg hover:bg-[#9D00FF]/20 transition-colors"
                                            >
                                                Give Feedback
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </section>

                {/* Radar */}
                <section aria-labelledby="competency-radar-heading">
                    <Card padding="md">
                        <h2
                            id="competency-radar-heading"
                            className="text-sm font-semibold text-white mb-1"
                        >
                            My Competency Profile
                        </h2>
                        <p className="text-xs text-[#8899AA] mb-4">
                            Based on received 360 feedback
                        </p>
                        <div className="h-52">
                            <ChartWrapper height="h-full">
                                <RadarChart data={RADAR_DATA}>
                                    <PolarGrid stroke="#1A2A3A" />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: "#8899AA", fontSize: 10 }}
                                    />
                                    <Radar
                                        dataKey="A"
                                        stroke="#9D00FF"
                                        fill="#9D00FF"
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#060B14",
                                            border: "1px solid #1A2A3A",
                                            borderRadius: 8,
                                        }}
                                        itemStyle={{ color: "#fff", fontSize: 12 }}
                                    />
                                </RadarChart>
                            </ChartWrapper>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-[#8899AA]">Avg Score</span>
                            <span className="text-base font-bold text-[#c084fc]">4.2 / 5</span>
                        </div>
                    </Card>
                </section>
            </div>

            {/* Quick Links */}
            <nav aria-label="360 Feedback navigation">
                <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {QUICK_LINKS.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className="flex items-center gap-3 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 hover:bg-[#152336] transition-all"
                            >
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${l.iconBg}`}
                                    aria-hidden="true"
                                >
                                    <l.icon size={14} style={{ color: l.color }} />
                                </div>
                                <span className="text-sm font-medium text-white">{l.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </Page>
    );
}
