"use client";

import { Plus, Calendar as CalIcon, Video, MoreVertical, Briefcase, ChevronRight, ChevronLeft } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

type InterviewType = "Technical" | "Culture" | "System Des" | "VP Round";

interface Interview {
    id: number;
    c_name: string;
    role: string;
    type: InterviewType;
    interviewer: string;
    date: string;
    time: string;
    mode: string;
}

const SCHEDULE: Interview[] = [
    { id: 1, c_name: "Rahul Sharma", role: "Sr. Frontend Eng", type: "Technical", interviewer: "Priya Nair", date: "Today", time: "10:30 AM - 11:30 AM", mode: "Google Meet" },
    { id: 2, c_name: "Sneha Gupta", role: "Product Manager", type: "Culture", interviewer: "Rajesh K.", date: "Today", time: "02:00 PM - 03:00 PM", mode: "Zoom" },
    { id: 3, c_name: "Amit Patel", role: "Backend Engineer", type: "System Des", interviewer: "Vikram S.", date: "Tomorrow", time: "11:00 AM - 12:30 PM", mode: "Office (Room 4)" },
    { id: 4, c_name: "Anjali Singh", role: "Sr. Frontend Eng", type: "VP Round", interviewer: "Suresh R.", date: "14 Mar", time: "04:00 PM - 04:45 PM", mode: "Google Meet" },
];

const KPI_STATS = [
    { label: "Today", value: "2", variant: "neutral" as const },
    { label: "This Week", value: "14", variant: "neutral" as const },
    { label: "Pending Feedbacks", value: "5", variant: "warning" as const },
    { label: "Rescheduled", value: "1", variant: "neutral" as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function TimingCell({ row }: { row: Interview }) {
    return (
        <div className="w-[120px] rounded-xl border border-[#1A2A3A] bg-[#060B14] py-2 text-center">
            <p className="text-[10px] font-bold uppercase text-[#445566]">{row.date}</p>
            <p className="text-xs font-semibold text-white">{row.time.split(" - ")[0]}</p>
        </div>
    );
}

function CandidateCell({ row }: { row: Interview }) {
    return (
        <div>
            <div className="mb-1 flex items-center gap-3">
                <h4 className="font-bold text-white">{row.c_name}</h4>
                <Badge variant="purple">{row.type} Round</Badge>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-[#8899AA]">
                <span className="flex items-center gap-1.5">
                    <Briefcase size={12} className="text-[#445566]" aria-hidden="true" /> {row.role}
                </span>
                <span className="flex items-center gap-1.5 rounded bg-[#1A2A3A] px-2 py-0.5 font-medium text-white">
                    <CalIcon size={12} className="text-[#8899AA]" aria-hidden="true" /> {row.interviewer}
                </span>
                <span className="flex items-center gap-1.5">
                    <Video size={12} className="text-[#0066FF]" aria-hidden="true" /> {row.mode}
                </span>
            </div>
        </div>
    );
}

function ActionsCell({ row }: { row: Interview }) {
    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="primary" size="sm">Join Call</Button>
            <Button variant="secondary" size="sm">Reschedule</Button>
            <Button
                variant="ghost"
                size="sm"
                icon={<MoreVertical size={16} aria-hidden="true" />}
                aria-label={`More actions for ${row.c_name}`}
            />
        </div>
    );
}

const COLUMNS: Column<Interview>[] = [
    {
        key: "timing",
        label: "Time",
        render: (r) => <TimingCell row={r} />,
    },
    {
        key: "candidate",
        label: "Candidate",
        render: (r) => <CandidateCell row={r} />,
        sortable: true,
        sortValue: (r) => r.c_name,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (r) => <ActionsCell row={r} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function InterviewSchedule() {
    return (
        <Page
            title="Interviews"
            subtitle="Manage upcoming interview schedules across the recruitment pipeline"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Interviews" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<CalIcon size={14} aria-hidden="true" />}
                    >
                        Sync Calendar
                    </Button>
                    <Button icon={<Plus size={14} aria-hidden="true" />}>
                        Schedule Interview
                    </Button>
                </>
            }
        >
            {/* Quick Stats */}
            <dl className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {KPI_STATS.map((s) => (
                    <Card key={s.label} padding="md">
                        <dd className="mb-1 text-2xl font-bold text-white">{s.value}</dd>
                        <dt className="text-xs text-[#8899AA]">{s.label}</dt>
                    </Card>
                ))}
            </dl>

            {/* Schedule */}
            <Card padding="none">
                <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0A1420] p-4">
                    <h3 className="text-sm font-semibold text-white">Upcoming Schedule</h3>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<ChevronLeft size={14} aria-hidden="true" />}
                            aria-label="Previous week"
                        />
                        <span className="px-2 text-xs font-medium text-white">12 Mar - 18 Mar</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={<ChevronRight size={14} aria-hidden="true" />}
                            aria-label="Next week"
                        />
                    </div>
                </div>
                <DataTable<Interview>
                    data={SCHEDULE}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    searchable
                    searchPlaceholder="Search interviewer or candidate…"
                    aria-label="Interview schedule"
                    emptyTitle="No interviews scheduled"
                    emptyDescription="No interviews match your search criteria."
                />
            </Card>
        </Page>
    );
}
