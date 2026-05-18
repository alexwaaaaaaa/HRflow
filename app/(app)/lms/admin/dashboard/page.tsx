"use client";
import React from "react";
import {
    Users, BookOpen, GraduationCap, TrendingUp, Plus, Settings, MoreHorizontal, ArrowUpRight,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar } from "recharts";

const ENROLLMENT_DATA = [
    { month: "Jan", enrolls: 400, completions: 240 },
    { month: "Feb", enrolls: 300, completions: 139 },
    { month: "Mar", enrolls: 550, completions: 380 },
    { month: "Apr", enrolls: 480, completions: 390 },
    { month: "May", enrolls: 600, completions: 480 },
    { month: "Jun", enrolls: 800, completions: 500 },
];

const ENGAGEMENT_DATA = [
    { name: "Mon", hours: 420 },
    { name: "Tue", hours: 510 },
    { name: "Wed", hours: 640 },
    { name: "Thu", hours: 410 },
    { name: "Fri", hours: 680 },
    { name: "Sat", hours: 250 },
    { name: "Sun", hours: 290 },
];

interface TopCourse {
    id: number;
    title: string;
    students: number;
    rating: number;
    revenue: string;
}

const TOP_COURSES: TopCourse[] = [
    { id: 1, title: "Advanced React Patterns", students: 1420, rating: 4.9, revenue: "$42k" },
    { id: 2, title: "Data Security Compliance", students: 3200, rating: 4.7, revenue: "Req" },
    { id: 3, title: "Managerial Leadership", students: 850, rating: 4.8, revenue: "$15k" },
    { id: 4, title: "AWS Cloud Architect", students: 640, rating: 4.6, revenue: "$28k" },
];

const _TREND_VARIANT: Record<string, "success" | "danger"> = {
    up: "success",
    down: "danger",
};

interface KpiStat {
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: React.ElementType;
    colorClass: string;
    bgClass: string;
}

const KPI_STATS: KpiStat[] = [
    { label: "Active Learners", value: "4,821", trend: "+12%", trendUp: true, icon: Users, colorClass: "text-[#33E6FF]", bgClass: "bg-[#33E6FF]/10" },
    { label: "Total Courses", value: "156", trend: "+4", trendUp: true, icon: BookOpen, colorClass: "text-[#FFB020]", bgClass: "bg-[#FFB020]/10" },
    { label: "Completion Rate", value: "78.4%", trend: "+2.1%", trendUp: true, icon: GraduationCap, colorClass: "text-[#00E5A0]", bgClass: "bg-[#00E5A0]/10" },
    { label: "Avg. Learning Time", value: "4.2h", trend: "-0.5h", trendUp: false, icon: TrendingUp, colorClass: "text-purple-400", bgClass: "bg-purple-500/10" },
];

const COURSE_COLUMNS: Column<TopCourse>[] = [
    {
        key: "title",
        label: "Course Title",
        render: (c) => (
            <span className="font-semibold text-white">{c.title}</span>
        ),
        sortable: true,
        sortValue: (c) => c.title,
    },
    {
        key: "students",
        label: "Students",
        render: (c) => <span className="text-[#8899AA]">{c.students.toLocaleString()}</span>,
        sortable: true,
        sortValue: (c) => c.students,
    },
    {
        key: "rating",
        label: "Rating",
        align: "center",
        render: (c) => (
            <Badge variant="warning">{c.rating} ★</Badge>
        ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: () => (
            <Button variant="ghost" size="sm" aria-label="More actions">
                <MoreHorizontal size={16} aria-hidden="true" />
            </Button>
        ),
    },
];

export default function LMSAdminDashboard() {
    return (
        <Page
            title="LMS Administration"
            subtitle="Manage courses, track enrollments, and monitor learning compliance"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Admin" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Settings size={16} />} href="/lms/reports">Settings</Button>
                    <Button variant="primary" icon={<Plus size={16} />} href="/lms/admin/course/create">Create Course</Button>
                </>
            }
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPI_STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} padding="lg" variant="elevated">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bgClass}`}>
                                    <Icon size={24} className={stat.colorClass} aria-hidden="true" />
                                </div>
                                <Badge variant={stat.trendUp ? "success" : "danger"}>{stat.trend}</Badge>
                            </div>
                            <p className="text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                            <p className="text-sm font-medium text-[#8899AA]">{stat.label}</p>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Enrollment vs Completion</CardTitle>
                            <select className="bg-[#0A1420] border border-[#2A3A4A] text-sm text-[#8899AA] rounded-lg px-3 py-1.5 outline-none">
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                        </CardHeader>
                        <div className="h-72">
                            <ChartWrapper height="h-full">
                                <AreaChart data={ENROLLMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorEnrolls" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#33E6FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#33E6FF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                                    <YAxis stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <RechartsTooltip contentStyle={{ backgroundColor: "#0A1420", borderColor: "#2A3A4A", borderRadius: "12px", color: "#fff" }} itemStyle={{ color: "#fff" }} />
                                    <Area type="monotone" dataKey="enrolls" stroke="#33E6FF" strokeWidth={3} fillOpacity={1} fill="url(#colorEnrolls)" />
                                    <Area type="monotone" dataKey="completions" stroke="#00E5A0" strokeWidth={3} fillOpacity={1} fill="url(#colorCompletions)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Top Performing Courses</CardTitle>
                            <Button variant="ghost" size="sm">View All Courses</Button>
                        </CardHeader>
                        <DataTable<TopCourse>
                            data={TOP_COURSES}
                            columns={COURSE_COLUMNS}
                            rowKey={(c) => c.id}
                            aria-label="Top performing courses"
                            emptyTitle="No courses found"
                        />
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card padding="lg" variant="elevated">
                        <CardTitle className="mb-4">Pending Approvals</CardTitle>
                        <div className="space-y-4">
                            {[
                                { title: "Course Draft: CyberSec 101", sub: "Submitted by IT Dept · 2 hrs ago" },
                                { title: "Budget Request: AWS Certs", sub: "Requested by Eng Team · 5 hrs ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start justify-between p-3 bg-[#152336] border border-[#2A3A4A] rounded-xl flex-col gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-white">{item.title}</p>
                                        <p className="text-xs text-[#8899AA]">{item.sub}</p>
                                    </div>
                                    <div className="flex gap-2 w-full">
                                        <Button variant="primary" size="sm" className="flex-1 justify-center">Approve</Button>
                                        <Button variant="secondary" size="sm" className="flex-1 justify-center">Review</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-4 justify-center" iconRight={<ArrowUpRight size={14} />}>
                            View all 12 requests
                        </Button>
                    </Card>

                    <Card padding="lg">
                        <CardTitle className="mb-6">Learning Engagement</CardTitle>
                        <div className="h-48">
                            <ChartWrapper height="h-full">
                                <BarChart data={ENGAGEMENT_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#8899AA" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                    <YAxis hide />
                                    <RechartsTooltip cursor={{ fill: "#152336" }} contentStyle={{ backgroundColor: "#0A1420", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }} />
                                    <Bar dataKey="hours" fill="#33E6FF" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                        <p className="text-center text-xs text-[#8899AA] mt-4">Peak learning times: Wed &amp; Fri afternoons</p>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
