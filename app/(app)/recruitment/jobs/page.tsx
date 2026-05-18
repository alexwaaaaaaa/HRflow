"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MapPin, Users, Calendar, Eye, MoreVertical } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type JobStatus = "Active" | "Draft" | "Closed";

interface Job {
    id: string;
    title: string;
    dept: string;
    location: string;
    status: JobStatus;
    posted: string;
    applicants: number;
    new: number;
}

const STATUS_VARIANT: Record<JobStatus, "success" | "warning" | "danger"> = {
    Active: "success",
    Draft: "warning",
    Closed: "danger",
};

const JOBS: Job[] = [
    { id: "J-101", title: "Senior Frontend Engineer", dept: "Engineering", location: "Bengaluru, Hybrid", status: "Active", posted: "12 Mar 2025", applicants: 145, new: 12 },
    { id: "J-102", title: "Product Marketing Manager", dept: "Marketing", location: "Mumbai, On-site", status: "Active", posted: "10 Mar 2025", applicants: 89, new: 5 },
    { id: "J-103", title: "Enterprise Sales Rep", dept: "Sales", location: "Delhi, Remote", status: "Draft", posted: "—", applicants: 0, new: 0 },
    { id: "J-104", title: "HR Business Partner", dept: "HR", location: "Bengaluru, On-site", status: "Closed", posted: "15 Jan 2025", applicants: 210, new: 0 },
    { id: "J-105", title: "Backend Engineer (Go)", dept: "Engineering", location: "Pune, Hybrid", status: "Active", posted: "05 Mar 2025", applicants: 67, new: 8 },
];

const COLUMNS: Column<Job>[] = [
    {
        key: "title",
        label: "Job",
        render: (j) => (
            <div>
                <p className="font-semibold text-white">{j.title}</p>
                <p className="mt-0.5 text-[11px] text-[#7a8fa6]">
                    {j.id} · {j.dept}
                </p>
            </div>
        ),
        sortable: true,
        sortValue: (j) => j.title,
    },
    {
        key: "location",
        label: "Location",
        render: (j) => (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#8899AA]">
                <MapPin size={12} className="text-[#7a8fa6]" aria-hidden="true" />
                {j.location}
            </span>
        ),
        hideOnMobile: true,
    },
    {
        key: "status",
        label: "Status",
        align: "center",
        render: (j) => <Badge variant={STATUS_VARIANT[j.status]}>{j.status}</Badge>,
    },
    {
        key: "applicants",
        label: "Applicants",
        align: "center",
        render: (j) => (
            <div className="inline-flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                    <Users size={11} className="mr-1 inline text-[#7a8fa6]" aria-hidden="true" />
                    {j.applicants}
                </span>
                {j.new > 0 && (
                    <span className="rounded bg-[#0066FF] px-1.5 py-0.5 text-[10px] font-medium text-white">
                        +{j.new}
                    </span>
                )}
            </div>
        ),
        sortable: true,
        sortValue: (j) => j.applicants,
    },
    {
        key: "posted",
        label: "Posted",
        render: (j) => (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#8899AA]">
                <Calendar size={12} className="text-[#7a8fa6]" aria-hidden="true" />
                {j.posted}
            </span>
        ),
        hideOnMobile: true,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (j) => (
            <div className="inline-flex items-center gap-2">
                <Link
                    href={`/recruitment/jobs/${j.id}`}
                    aria-label={`View ${j.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A2A3A] text-white transition-colors hover:bg-[#243040]"
                >
                    <Eye size={14} aria-hidden="true" />
                </Link>
                <button
                    type="button"
                    aria-label={`More actions for ${j.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7a8fa6] transition-colors hover:text-white"
                >
                    <MoreVertical size={14} aria-hidden="true" />
                </button>
            </div>
        ),
    },
];

const STATUS_FILTERS: ReadonlyArray<"All" | JobStatus> = ["All", "Active", "Draft", "Closed"];

export default function JobPostingsPage() {
    const [status, setStatus] = useState<"All" | JobStatus>("All");
    const filtered = status === "All" ? JOBS : JOBS.filter((j) => j.status === status);

    return (
        <Page
            title="Job postings"
            subtitle="Manage your open requisitions and fast-track hiring"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Jobs" },
            ]}
            maxWidth="1300px"
            actions={
                <Button icon={<Plus size={14} />} href="/recruitment/jobs/create">Create job</Button>
            }
        >
            <Card padding="lg">
                <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
                    {STATUS_FILTERS.map((s) => {
                        const active = status === s;
                        return (
                            <button
                                key={s}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setStatus(s)}
                                className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-colors ${
                                    active
                                        ? "border-[#0066FF] bg-[#0066FF] text-white"
                                        : "border-[#1A2A3A] bg-[#0D1928] text-[#8899AA] hover:border-[#2A3A4A]"
                                }`}
                            >
                                {s}
                            </button>
                        );
                    })}
                </div>
                <DataTable<Job>
                    data={filtered}
                    columns={COLUMNS}
                    rowKey={(j) => j.id}
                    searchable
                    searchPlaceholder="Search by title or ID…"
                    aria-label="Jobs"
                />
            </Card>
        </Page>
    );
}
