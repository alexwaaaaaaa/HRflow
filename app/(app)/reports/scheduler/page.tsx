"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock, Play, Mail, Calendar, Edit3, Trash2, Plus } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Schema ───────────────────────────────────────────────────────────────────

const scheduleSchema = z.object({
    reportName: z.string().min(1, "Report name required"),
    frequency: z.enum(["daily", "weekly", "monthly", "quarterly"]),
    recipients: z.string().min(1, "At least one recipient required"),
    format: z.enum(["xlsx", "csv", "pdf"]),
});

type ScheduleForm = z.infer<typeof scheduleSchema>;

// ─── Static data (module scope) ───────────────────────────────────────────────

type ScheduleStatus = "Active" | "Paused";

const STATUS_VARIANT: Record<ScheduleStatus, "success" | "neutral"> = {
    Active: "success",
    Paused: "neutral",
};

interface ScheduleRow {
    id: string;
    name: string;
    frequency: string;
    format: string;
    recipients: string;
    status: ScheduleStatus;
}

const SCHEDULERS: ScheduleRow[] = [
    {
        id: "SCH-991",
        name: "Monthly Payroll Cost Center",
        frequency: "Monthly (1st Day)",
        format: "Excel (.xlsx)",
        recipients: "finance-leadership@acmecorp.com; ceo@acmecorp.com",
        status: "Active",
    },
    {
        id: "SCH-992",
        name: "Daily Attendance & Late Comers",
        frequency: "Daily (09:30 AM)",
        format: "CSV",
        recipients: "all-managers@acmecorp.com",
        status: "Active",
    },
    {
        id: "SCH-993",
        name: "Q3 Headcount Snapshot",
        frequency: "Quarterly",
        format: "PDF Dashboard",
        recipients: "hr-board@acmecorp.com",
        status: "Paused",
    },
];

const SCHEDULE_COLUMNS: Column<ScheduleRow>[] = [
    {
        key: "name",
        label: "Schedule Detail",
        render: (r) => (
            <div>
                <p className="font-bold text-white">{r.name}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                        <Calendar size={10} aria-hidden="true" />
                        {r.frequency}
                    </span>
                    <span className="text-xs text-[#8899AA] border border-[#2A3A4A] px-2 py-0.5 rounded">
                        {r.format}
                    </span>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "recipients",
        label: "Recipients",
        render: (r) => (
            <span className="flex items-start gap-2 text-xs text-[#8899AA] max-w-xs">
                <Mail size={14} className="shrink-0 mt-0.5 text-indigo-400" aria-hidden="true" />
                <span className="truncate" title={r.recipients}>
                    {r.recipients}
                </span>
            </span>
        ),
        hideOnMobile: true,
    },
    {
        key: "status",
        label: "Status",
        align: "center",
        render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (r) => (
            <div className="inline-flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Edit schedule ${r.name}`}
                >
                    <Edit3 size={14} aria-hidden="true" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete schedule ${r.name}`}
                >
                    <Trash2 size={14} aria-hidden="true" />
                </Button>
            </div>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportSchedulerPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<ScheduleForm>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            reportName: "",
            frequency: "monthly",
            recipients: "",
            format: "xlsx",
        },
    });

    const onSubmit = (_data: ScheduleForm) => {
        // TODO: replace with real mutation
    };

    return (
        <Page
            title="Report Scheduler"
            subtitle="Automate email delivery of critical reports and dashboards."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Scheduler" },
            ]}
            maxWidth="1280px"
            actions={
                <Button icon={<Plus size={14} aria-hidden="true" />}>
                    New Schedule
                </Button>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card padding="lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <Play size={24} aria-hidden="true" />
                            </div>
                            <span className="text-[#8899AA] text-xs">Active</span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">12</p>
                        <p className="text-xs text-[#8899AA]">Running schedules</p>
                    </Card>
                    <Card padding="lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400">
                                <Mail size={24} aria-hidden="true" />
                            </div>
                            <span className="text-[#8899AA] text-xs">Past 30 Days</span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">1,402</p>
                        <p className="text-xs text-[#8899AA]">Emails delivered</p>
                    </Card>
                    <Card padding="lg">
                        <h3 className="text-sm font-bold text-white mb-3">Next Scheduled Run</h3>
                        <div className="p-3 bg-[#0B1221] border border-[#2A3A4A] rounded-xl">
                            <p className="text-emerald-400 font-bold text-sm">Daily Attendance &amp; Late Comers</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-[#8899AA]">in 45 mins</span>
                                <span className="text-xs text-white">09:30 AM</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* New schedule form */}
                <Card padding="lg">
                    <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Clock size={16} className="text-pink-400" aria-hidden="true" />
                        Create New Schedule
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="sched-report" className="block text-xs text-[#8899AA] mb-1">
                                Report Name
                            </label>
                            <input
                                id="sched-report"
                                {...register("reportName")}
                                placeholder="e.g. Monthly Payroll MIS"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-[#00e5a0] focus:outline-none"
                                aria-invalid={!!errors.reportName}
                            />
                            {errors.reportName && (
                                <p className="text-xs text-pink-400 mt-1" role="alert">
                                    {errors.reportName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="sched-freq" className="block text-xs text-[#8899AA] mb-1">
                                Frequency
                            </label>
                            <select
                                id="sched-freq"
                                {...register("frequency")}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-[#00e5a0] focus:outline-none"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sched-recipients" className="block text-xs text-[#8899AA] mb-1">
                                Recipients (comma-separated)
                            </label>
                            <input
                                id="sched-recipients"
                                {...register("recipients")}
                                placeholder="email@company.com"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-[#00e5a0] focus:outline-none"
                                aria-invalid={!!errors.recipients}
                            />
                            {errors.recipients && (
                                <p className="text-xs text-pink-400 mt-1" role="alert">
                                    {errors.recipients.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="sched-format" className="block text-xs text-[#8899AA] mb-1">
                                Format
                            </label>
                            <div className="flex gap-2">
                                <select
                                    id="sched-format"
                                    {...register("format")}
                                    className="flex-1 bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:border-[#00e5a0] focus:outline-none"
                                >
                                    <option value="xlsx">Excel (.xlsx)</option>
                                    <option value="csv">CSV</option>
                                    <option value="pdf">PDF</option>
                                </select>
                                <Button type="submit" size="sm">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>

                {/* Schedules table */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h2 className="text-sm font-bold text-white">Active Schedules</h2>
                        <div className="flex gap-2" role="tablist" aria-label="Filter schedules">
                            {(["All", "Active", "Paused"] as const).map((f) => (
                                <Button
                                    key={f}
                                    variant="ghost"
                                    size="sm"
                                    role="tab"
                                    aria-selected={f === "All"}
                                >
                                    {f}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <DataTable<ScheduleRow>
                        data={SCHEDULERS}
                        columns={SCHEDULE_COLUMNS}
                        rowKey={(r) => r.id}
                        searchable
                        searchPlaceholder="Search schedules…"
                        emptyTitle="No schedules yet"
                        emptyDescription="Create a schedule to automate report delivery."
                        aria-label="Report schedules"
                    />
                </Card>
            </div>
        </Page>
    );
}
