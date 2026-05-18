"use client";

import {
    Users,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronRight,
    MoreVertical,
    Zap,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
    PieChart,
    Pie,
} from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─────────────────────────────────────────────────────────────────────────────
// Static config (module scope — keeps the page render fn pure)
// ─────────────────────────────────────────────────────────────────────────────

interface KpiTile {
    id: number;
    title: string;
    value: string;
    trend: string;
    trendLabel: string;
    icon: typeof Users;
    color: string;
}

const KPI_DATA: KpiTile[] = [
    {
        id: 1,
        title: "Active Onboardings",
        value: "42",
        trend: "+12%",
        trendLabel: "vs last month",
        icon: Users,
        color: "#00E5A0",
    },
    {
        id: 2,
        title: "Avg Time to Complete",
        value: "12 Days",
        trend: "-2 Days",
        trendLabel: "vs last month",
        icon: Clock,
        color: "#33E6FF",
    },
    {
        id: 3,
        title: "Tasks Overdue",
        value: "18",
        trend: "+5",
        trendLabel: "vs last week",
        icon: AlertCircle,
        color: "#FF4444",
    },
    {
        id: 4,
        title: "Feedback Score",
        value: "4.8/5",
        trend: "+0.2",
        trendLabel: "vs last month",
        icon: Zap,
        color: "#FFB020",
    },
];

const ONBOARDING_TREND = [
    { name: "Week 1", completed: 15, dropoff: 2 },
    { name: "Week 2", completed: 22, dropoff: 1 },
    { name: "Week 3", completed: 18, dropoff: 0 },
    { name: "Week 4", completed: 35, dropoff: 3 },
    { name: "Week 5", completed: 28, dropoff: 1 },
];

const DEPARTMENT_DATA = [
    { name: "Engineering", active: 15, color: "#00E5A0" },
    { name: "Sales", active: 12, color: "#33E6FF" },
    { name: "Marketing", active: 8, color: "#9D00FF" },
    { name: "Design", active: 7, color: "#FFB020" },
];

const NEW_JOINERS = [
    {
        id: 1,
        name: "Sneha Rao",
        role: "Product Designer",
        dept: "Design",
        date: "Today",
        progress: 85,
        avatar: "SR",
    },
    {
        id: 2,
        name: "Arjun Mehta",
        role: "Frontend Dev",
        dept: "Engineering",
        date: "Tomorrow",
        progress: 60,
        avatar: "AM",
    },
    {
        id: 3,
        name: "Priya Singh",
        role: "Marketing Mngr",
        dept: "Marketing",
        date: "15 Mar",
        progress: 10,
        avatar: "PS",
    },
    {
        id: 4,
        name: "Kabir Das",
        role: "Sales Executive",
        dept: "Sales",
        date: "16 Mar",
        progress: 40,
        avatar: "KD",
    },
];

type TaskCategory = "IT" | "Compliance" | "Performance" | "HR Ops" | "Comms";

interface PriorityTask {
    id: number;
    title: string;
    badge: TaskCategory;
    due: string;
    time: string;
    /** Priority dot colour (separate from the category badge variant). */
    priorityColor: string;
    /** True when the task is overdue — used to colour the time string. */
    overdue?: boolean;
}

const PRIORITY_TASKS: PriorityTask[] = [
    {
        id: 1,
        title: "Approve IT Assets - Arjun Mehta",
        badge: "IT",
        due: "Today",
        time: "2 Hours Overdue",
        priorityColor: "#FF4444",
        overdue: true,
    },
    {
        id: 2,
        title: "Upload Signed Offer - Sneha Rao",
        badge: "Compliance",
        due: "Today",
        time: "Ends in 4 hrs",
        priorityColor: "#FFB020",
    },
    {
        id: 3,
        title: "Manager Welcome Check-in",
        badge: "Performance",
        due: "Tomorrow",
        time: "10:00 AM",
        priorityColor: "#00E5A0",
    },
    {
        id: 4,
        title: "Review BGV Status - Priya Singh",
        badge: "HR Ops",
        due: "15 Mar",
        time: "Standard",
        priorityColor: "#33E6FF",
    },
    {
        id: 5,
        title: "Send Pre-boarding Kit - Kabir",
        badge: "Comms",
        due: "16 Mar",
        time: "Standard",
        priorityColor: "#9D00FF",
    },
];

const CATEGORY_BADGE: Record<TaskCategory, BadgeVariant> = {
    IT: "info",
    Compliance: "warning",
    Performance: "success",
    "HR Ops": "neutral",
    Comms: "purple",
};

// ─────────────────────────────────────────────────────────────────────────────
// Pure helpers (module scope)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * KPI trend variant: positive trends are "good" (success), except for
 * "Tasks Overdue" where rising values are bad. Negative trends on
 * "Avg Time to Complete" are also "good" (faster onboarding).
 */
function trendVariant(title: string, trend: string): "success" | "danger" {
    const isPositive = trend.startsWith("+");
    const isNegative = trend.startsWith("-");
    if (isPositive && title !== "Tasks Overdue") return "success";
    if (isNegative && title === "Avg Time to Complete") return "success";
    return "danger";
}

function progressFill(progress: number): string {
    if (progress === 100) return "#00E5A0";
    if (progress > 50) return "#33E6FF";
    return "#FFB020";
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OnboardingDashboard() {
    return (
        <Page
            title="Onboarding dashboard"
            subtitle="Overview of new joiners, task progression, and experience metrics"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding" },
                { label: "Dashboard" },
            ]}
            maxWidth="1600px"
            actions={
                <>
                    <Button variant="secondary">Download report</Button>
                    <Button>+ Add joiner</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI tiles */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {KPI_DATA.map((kpi) => {
                        const variant = trendVariant(kpi.title, kpi.trend);
                        const Icon = kpi.icon;
                        return (
                            <Card key={kpi.id}>
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                                        style={{
                                            backgroundColor: `${kpi.color}15`,
                                            color: kpi.color,
                                        }}
                                    >
                                        <Icon size={20} aria-hidden="true" />
                                    </div>
                                    <Badge variant={variant} dot>
                                        {kpi.trend.replace(/[+-]/, "")}
                                    </Badge>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold tracking-tight text-white">
                                        {kpi.value}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-[#8899AA]">
                                        {kpi.title}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Trend chart */}
                    <Card padding="lg" className="lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="m-0 text-lg font-semibold text-white">
                                Onboarding completion trends
                            </h2>
                            <label htmlFor="trend-period" className="sr-only">
                                Select period
                            </label>
                            <select
                                id="trend-period"
                                className="cursor-pointer rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-1.5 text-sm text-[#8899AA] focus:outline-none"
                            >
                                <option>Last 5 Weeks</option>
                                <option>Last 3 Months</option>
                            </select>
                        </div>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <AreaChart
                                    data={ONBOARDING_TREND}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorCompleted"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#00E5A0"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#00E5A0"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="colorDropoff"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#FF4444"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#FF4444"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#1A2A3A"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#445566"
                                        tick={{ fill: "#8899AA", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        stroke="#445566"
                                        tick={{ fill: "#8899AA", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0A1420",
                                            borderColor: "#1A2A3A",
                                            borderRadius: "8px",
                                        }}
                                        itemStyle={{ color: "#fff" }}
                                    />
                                    <Legend
                                        iconType="circle"
                                        wrapperStyle={{ fontSize: "12px", color: "#8899AA" }}
                                    />
                                    <Area
                                        type="monotone"
                                        name="Completed Onboardings"
                                        dataKey="completed"
                                        stroke="#00E5A0"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorCompleted)"
                                    />
                                    <Area
                                        type="monotone"
                                        name="Drop-offs/No Shows"
                                        dataKey="dropoff"
                                        stroke="#FF4444"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorDropoff)"
                                    />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    {/* Dept breakdown */}
                    <Card padding="lg" className="flex flex-col">
                        <h2 className="mb-6 text-lg font-semibold text-white">
                            Active by department
                        </h2>
                        <div className="relative min-h-[250px] flex-1">
                            <ChartWrapper height="h-full">
                                <PieChart>
                                    <Pie
                                        data={DEPARTMENT_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="active"
                                        stroke="none"
                                    >
                                        {DEPARTMENT_DATA.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#0A1420",
                                            borderColor: "#1A2A3A",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                        itemStyle={{ color: "#fff" }}
                                    />
                                </PieChart>
                            </ChartWrapper>
                            {/* Center text overlay (PieChart inner text is hard to style otherwise) */}
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white">42</span>
                                <span className="text-xs text-[#8899AA]">Total</span>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {DEPARTMENT_DATA.map((d) => (
                                <div
                                    key={d.name}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2 text-[#8899AA]">
                                        <span
                                            aria-hidden="true"
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{ backgroundColor: d.color }}
                                        />
                                        {d.name}
                                    </div>
                                    <span className="font-medium text-white">{d.active}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Lists row */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {/* New joiners */}
                    <Card padding="lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">
                                Upcoming &amp; recent joiners
                            </h2>
                            <Button variant="ghost" size="sm">
                                View all
                            </Button>
                        </div>
                        <ul role="list" className="space-y-4">
                            {NEW_JOINERS.map((joiner) => (
                                <li
                                    key={joiner.id}
                                    className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#1A2A3A] bg-[#0A1420]/50 p-4 transition-colors hover:bg-[#1A2A3A] focus-within:ring-2 focus-within:ring-[#00e5a0]"
                                >
                                    <div className="flex min-w-0 items-center gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3A4A5A] bg-gradient-to-br from-[#1A2A3A] to-[#2A3A4A] text-sm font-bold text-white">
                                            {joiner.avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="truncate text-[15px] font-semibold text-white">
                                                {joiner.name}
                                            </h4>
                                            <p className="truncate text-xs text-[#8899AA]">
                                                {joiner.role} • {joiner.dept}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex w-32 flex-col items-end gap-2">
                                        <div className="flex w-full items-center justify-between text-xs">
                                            <span className="text-[#8899AA]">
                                                Joins {joiner.date}
                                            </span>
                                            <span className="font-medium text-white">
                                                {joiner.progress}%
                                            </span>
                                        </div>
                                        <div
                                            className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                                            role="progressbar"
                                            aria-valuenow={joiner.progress}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${joiner.name} onboarding ${joiner.progress}% complete`}
                                        >
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${joiner.progress}%`,
                                                    backgroundColor: progressFill(joiner.progress),
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-md p-2 text-[#7a8fa6] opacity-0 transition-colors group-hover:opacity-100 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                                        aria-label={`View ${joiner.name} onboarding details`}
                                    >
                                        <ChevronRight size={18} aria-hidden="true" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Priority tasks */}
                    <Card padding="lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">
                                Priority onboarding tasks
                            </h2>
                            <Button variant="ghost" size="sm">
                                View calendar
                            </Button>
                        </div>
                        <ul role="list" className="space-y-3">
                            {PRIORITY_TASKS.map((task) => (
                                <li
                                    key={task.id}
                                    className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#1A2A3A] bg-transparent p-3.5 transition-colors hover:bg-[#1A2A3A] focus-within:ring-2 focus-within:ring-[#00e5a0]"
                                >
                                    <div className="flex min-w-0 items-start gap-3">
                                        <span
                                            aria-hidden="true"
                                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                                            style={{ backgroundColor: task.priorityColor }}
                                        />
                                        <div className="min-w-0">
                                            <h4 className="truncate text-sm font-medium text-white transition-colors group-hover:text-[#00e5a0]">
                                                {task.title}
                                            </h4>
                                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                                <Badge variant={CATEGORY_BADGE[task.badge]}>
                                                    {task.badge}
                                                </Badge>
                                                <span
                                                    aria-hidden="true"
                                                    className="text-xs text-[#7a8fa6]"
                                                >
                                                    •
                                                </span>
                                                <span
                                                    className={`text-xs ${
                                                        task.overdue
                                                            ? "text-[#FF4444]"
                                                            : "text-[#8899AA]"
                                                    }`}
                                                >
                                                    {task.due} - {task.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2">
                                        <button
                                            type="button"
                                            className="hidden rounded-md p-1.5 text-[#8899AA] transition-colors hover:bg-[#2A3A4A] hover:text-[#00e5a0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] group-hover:block"
                                            aria-label={`Mark task complete: ${task.title}`}
                                        >
                                            <CheckCircle2 size={16} aria-hidden="true" />
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded-md p-1.5 text-[#8899AA] transition-colors hover:bg-[#2A3A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                                            aria-label={`More options for: ${task.title}`}
                                        >
                                            <MoreVertical size={16} aria-hidden="true" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
