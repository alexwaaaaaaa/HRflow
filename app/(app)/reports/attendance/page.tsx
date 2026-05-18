"use client";

import { Download, Calendar } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static data (module scope) ───────────────────────────────────────────────

interface AttendanceRow {
    id: string;
    name: string;
    payDays: string;
    payDaysColor: "success" | "danger";
    days: Array<{ code: string; variant: "success" | "warning" | "danger" | "neutral" }>;
}

const ATTENDANCE_ROWS: AttendanceRow[] = [
    {
        id: "sneha",
        name: "Sneha Rao",
        payDays: "31/31",
        payDaysColor: "success",
        days: [
            { code: "P", variant: "success" },
            { code: "P", variant: "success" },
            { code: "P", variant: "success" },
            { code: "SH", variant: "warning" },
            { code: "P", variant: "success" },
            { code: "WO", variant: "neutral" },
            { code: "WO", variant: "neutral" },
        ],
    },
    {
        id: "rajiv",
        name: "Rajiv Mehta",
        payDays: "29.5/31",
        payDaysColor: "danger",
        days: [
            { code: "LWP", variant: "danger" },
            { code: "P", variant: "success" },
            { code: "P", variant: "success" },
            { code: "P", variant: "success" },
            { code: "HD", variant: "warning" },
            { code: "WO", variant: "neutral" },
            { code: "WO", variant: "neutral" },
        ],
    },
];

const DAY_HEADERS = [
    { day: "01", label: "M" },
    { day: "02", label: "T" },
    { day: "03", label: "W" },
    { day: "04", label: "T" },
    { day: "05", label: "F" },
    { day: "06", label: "S" },
    { day: "07", label: "S" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AttendanceReportPage() {
    return (
        <Page
            title="Muster Roll & Attendance"
            subtitle="Detailed timesheets, shortfalls, and overtime reports for payroll prep."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Attendance" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Calendar size={14} aria-hidden="true" />}>
                        Mar 2026
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>
                        Export for Payroll
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Avg. Office Presence</p>
                        <p className="text-3xl font-bold text-white mb-4">8h 15m</p>
                        <div
                            className="w-full bg-[#1A2A3A] rounded-full h-1.5"
                            role="progressbar"
                            aria-valuenow={85}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Average office presence 85%"
                        >
                            <div className="bg-[#00e5a0] h-1.5 rounded-full w-[85%]" />
                        </div>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Total Shortfall Hours</p>
                        <p className="text-3xl font-bold text-pink-400 mb-1">142h</p>
                        <p className="text-xs text-[#8899AA]">Across 32 employees</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Approved Overtime</p>
                        <p className="text-3xl font-bold text-emerald-400 mb-1">85h</p>
                        <p className="text-xs text-[#8899AA]">Pending payout calculation</p>
                    </Card>
                </div>

                {/* Muster grid */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h2 className="text-base font-bold text-white">Monthly Consolidated Grid</h2>
                        <div className="flex flex-wrap gap-3 text-xs text-[#8899AA]" aria-label="Legend">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                                Present
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-pink-500" aria-hidden="true" />
                                Absent/Leave
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
                                Shortfall/Late
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap border-collapse" aria-label="Monthly attendance grid">
                            <thead>
                                <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs">
                                    <th scope="col" className="p-3 font-medium border-b border-r border-[#2A3A4A] sticky left-0 bg-[#0D1928] z-10 w-48">
                                        Employee
                                    </th>
                                    <th scope="col" className="p-3 font-medium border-b border-r border-[#2A3A4A] text-center w-20">
                                        Pay Days
                                    </th>
                                    {DAY_HEADERS.map((d) => (
                                        <th
                                            key={d.day}
                                            scope="col"
                                            className="p-2 font-medium border-b border-r border-[#2A3A4A] text-center w-12"
                                        >
                                            <div>{d.day}</div>
                                            <div className="text-[10px] mt-1 font-normal opacity-70">{d.label}</div>
                                        </th>
                                    ))}
                                    <th scope="col" className="p-3 font-medium border-b border-[#2A3A4A]">
                                        …
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] text-sm font-mono">
                                {ATTENDANCE_ROWS.map((row) => (
                                    <tr key={row.id} className="hover:bg-[#1A2A3A]/30">
                                        <td className="p-3 border-r border-[#1A2A3A] sticky left-0 bg-[#0D1928] z-10 font-sans font-medium text-white">
                                            {row.name}
                                        </td>
                                        <td className="p-3 border-r border-[#1A2A3A] text-center">
                                            <Badge variant={row.payDaysColor}>{row.payDays}</Badge>
                                        </td>
                                        {row.days.map((d, i) => (
                                            <td key={i} className="p-2 border-r border-[#1A2A3A] text-center">
                                                <Badge variant={d.variant}>{d.code}</Badge>
                                            </td>
                                        ))}
                                        <td className="p-3 text-[#8899AA]">…</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-[#1A2A3A]/20 text-xs text-[#8899AA] border-t border-[#1A2A3A]">
                        Legend: P = Present, SH = Shortfall, LWP = Leave Without Pay, HD = Half Day, WO = Weekly Off.
                    </div>
                </Card>
            </div>
        </Page>
    );
}
