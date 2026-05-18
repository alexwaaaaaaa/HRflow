"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreHorizontal,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

type BgvStatus = "Clear" | "In Progress" | "Discrepancy" | "Failed";

interface StatusRecord {
  id: string;
  cand: string;
  role: string;
  vendor: string;
  initDate: string;
  status: BgvStatus;
  prog: number;
}

const STATUS_RECORDS: StatusRecord[] = [
  { id: "BGC-2024-101", cand: "Saurabh Kumar", role: "Frontend Eng.", vendor: "FirstAdvantage", initDate: "12 Nov 2024", status: "Clear", prog: 100 },
  { id: "BGC-2024-100", cand: "Neha Sharma", role: "DevOps Lead", vendor: "Checkr", initDate: "10 Nov 2024", status: "In Progress", prog: 65 },
  { id: "BGC-2024-099", cand: "Rajesh Patel", role: "Sales VP", vendor: "HireRight", initDate: "08 Nov 2024", status: "Discrepancy", prog: 80 },
  { id: "BGC-2024-098", cand: "Kavita Singh", role: "HR Manager", vendor: "FirstAdvantage", initDate: "05 Nov 2024", status: "Failed", prog: 100 },
  { id: "BGC-2024-097", cand: "Aman Gupta", role: "Analyst", vendor: "AuthBridge", initDate: "01 Nov 2024", status: "Clear", prog: 100 },
  { id: "BGC-2024-096", cand: "Pooja Reddy", role: "Support", vendor: "Checkr", initDate: "28 Oct 2024", status: "Clear", prog: 100 },
];

const STATUS_VARIANT: Record<BgvStatus, "success" | "info" | "warning" | "danger"> = {
  Clear: "success",
  "In Progress": "info",
  Discrepancy: "warning",
  Failed: "danger",
};

const STATUS_ICON: Record<BgvStatus, React.ElementType> = {
  Clear: CheckCircle,
  "In Progress": Clock,
  Discrepancy: AlertTriangle,
  Failed: XCircle,
};

const PROG_COLOR: Record<BgvStatus, string> = {
  Clear: "bg-[#00E5A0]",
  "In Progress": "bg-[#0066FF]",
  Discrepancy: "bg-amber-500",
  Failed: "bg-rose-500",
};

const COLUMNS: Column<StatusRecord>[] = [
  {
    key: "id",
    label: "Verification ID",
    render: (r) => (
      <Link href={`/bgv/status/${r.id}`} className="font-mono text-sm font-bold text-[#0066FF] hover:underline">
        {r.id}
      </Link>
    ),
  },
  {
    key: "candidate",
    label: "Candidate & Role",
    render: (r) => (
      <div>
        <p className="text-sm font-bold text-white">{r.cand}</p>
        <p className="text-xs text-[#8899AA]">{r.role}</p>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.cand,
  },
  {
    key: "vendor",
    label: "Vendor",
    render: (r) => (
      <div className="flex items-center gap-2">
        <Shield size={14} className="text-[#556677]" aria-hidden="true" />
        <span className="text-sm text-slate-300">{r.vendor}</span>
      </div>
    ),
    hideOnMobile: true,
  },
  {
    key: "initDate",
    label: "Initiated On",
    render: (r) => <span className="text-sm text-slate-300">{r.initDate}</span>,
    hideOnMobile: true,
  },
  {
    key: "status",
    label: "Overall Status",
    render: (r) => {
      const Icon = STATUS_ICON[r.status];
      return (
        <Badge variant={STATUS_VARIANT[r.status]}>
          <Icon size={12} aria-hidden="true" className="mr-1" />
          {r.status}
        </Badge>
      );
    },
  },
  {
    key: "progress",
    label: "Progress",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div
          className="h-1.5 w-24 overflow-hidden rounded-full bg-[#1A2A3A]"
          role="progressbar"
          aria-valuenow={r.prog}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${r.cand} progress`}
        >
          <div className={`h-full rounded-full ${PROG_COLOR[r.status]}`} style={{ width: `${r.prog}%` }} />
        </div>
        <span className="w-6 text-xs font-medium text-[#8899AA]">{r.prog}%</span>
      </div>
    ),
    hideOnMobile: true,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: (r) => (
      <Button variant="ghost" size="sm" icon={<MoreHorizontal size={18} aria-hidden="true" />} aria-label={`More actions for ${r.cand}`} />
    ),
  },
];

export default function BGVStatusPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = searchTerm
    ? STATUS_RECORDS.filter(
        (r) =>
          r.cand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : STATUS_RECORDS;

  return (
    <Page
      title="BGV Status Tracker"
      subtitle="Track real-time background verification progress for all candidates."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Status" },
      ]}
      maxWidth="1400px"
      actions={
        <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>
          Export
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Toolbar */}
        <Card padding="sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search candidate, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search candidate or ID"
                  className="h-9 w-64 rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-9 pr-3 text-sm text-white outline-none transition-colors hover:border-[#2A3A4A] focus:border-[#0066FF]"
                />
              </div>
              <Button variant="secondary" size="sm" icon={<Filter size={16} aria-hidden="true" />}>
                Filter By Status
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8899AA]">Global Status:</span>
              <div className="flex items-center gap-3 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 py-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-[#0066FF]" aria-hidden="true" />
                  <span className="text-xs font-bold text-white">45 Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
                  <span className="text-xs font-bold text-white">12 Issues</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card padding="none">
          <div className="p-4">
            <DataTable<StatusRecord>
              data={filtered}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              aria-label="BGV status tracker"
              emptyTitle="No records found"
              emptyDescription="Try adjusting your search or filters."
            />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#1A2A3A] bg-[#0A1420] px-4 py-4">
            <div className="text-sm text-[#8899AA]">
              Showing <span className="font-bold text-white">1</span> to{" "}
              <span className="font-bold text-white">6</span> of{" "}
              <span className="font-bold text-white">124</span> checks
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" icon={<ChevronLeft size={16} aria-hidden="true" />} disabled aria-label="Previous page" />
              <Button size="sm" aria-current="page">1</Button>
              <Button variant="secondary" size="sm">2</Button>
              <span className="text-[#556677]">...</span>
              <Button variant="secondary" size="sm">12</Button>
              <Button variant="secondary" size="sm" icon={<ChevronRight size={16} aria-hidden="true" />} aria-label="Next page" />
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
