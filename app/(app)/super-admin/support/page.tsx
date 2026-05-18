"use client";

import { Clock, ShieldAlert, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type TicketPriority = "P0 - Critical" | "P1 - Urgent" | "P2 - High" | "P3 - Low";
type TicketStatus = "Open" | "In Progress" | "Resolved";

interface Ticket {
  id: string;
  sub: string;
  org: string;
  pri: TicketPriority;
  status: TicketStatus;
  clock: string;
  isCritical?: boolean;
  isHigh?: boolean;
}

const PRIORITY_VARIANT: Record<TicketPriority, "danger" | "warning" | "neutral"> = {
  "P0 - Critical": "danger",
  "P1 - Urgent": "warning",
  "P2 - High": "warning",
  "P3 - Low": "neutral",
};

const TICKETS: Ticket[] = [
  { id: "TCK-9901", sub: "Payroll Calculation Mismatch in FnF", org: "TechCorp India", pri: "P0 - Critical", status: "Open", clock: "1h 12m", isCritical: true },
  { id: "TCK-9892", sub: "New Feature Request: Custom Approval Flow", org: "Zenith Logistics", pri: "P3 - Low", status: "In Progress", clock: "12h 45m" },
  { id: "TCK-9884", sub: "Cannot download Form 16 Part B", org: "Apex Media Group", pri: "P2 - High", status: "Open", clock: "4h 20m", isHigh: true },
  { id: "TCK-9871", sub: "Login Page 500 Error for all employees", org: "Sunset Technologies", pri: "P0 - Critical", status: "Resolved", clock: "-" },
  { id: "TCK-9865", sub: "Billing invoice discrepancy", org: "Global Finance Ltd", pri: "P1 - Urgent", status: "Open", clock: "2h 10m" },
];

const COLUMNS: Column<Ticket>[] = [
  {
    key: "ticket",
    label: "Ticket Details",
    render: (r) => (
      <div>
        <div className="text-white font-bold text-sm truncate max-w-xs">{r.sub}</div>
        <div className="text-[10px] text-[#556677] font-mono mt-0.5">{r.id}</div>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.id,
  },
  {
    key: "org",
    label: "Organization",
    render: (r) => <span className="text-[#8899AA] font-bold text-xs">{r.org}</span>,
  },
  {
    key: "pri",
    label: "Priority",
    render: (r) => <Badge variant={PRIORITY_VARIANT[r.pri]}>{r.pri}</Badge>,
  },
  {
    key: "status",
    label: "Status",
    render: (r) => (
      <div className="flex items-center gap-2">
        {r.status === "Resolved" ? (
          <CheckCircle2 size={14} className="text-emerald-400" aria-hidden="true" />
        ) : (
          <Clock size={14} className="text-indigo-400" aria-hidden="true" />
        )}
        <Badge variant={r.status === "Resolved" ? "success" : "info"}>{r.status}</Badge>
      </div>
    ),
  },
  {
    key: "clock",
    label: "SLA Clock",
    render: (r) => <span className="text-white font-mono font-bold text-xs">{r.clock}</span>,
  },
  {
    key: "assignee",
    label: "Assignee",
    render: (r) => (
      <div className="flex items-center gap-2 text-[#8899AA] text-xs">
        <div
          aria-hidden="true"
          className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold"
        >
          L3
        </div>
        {r.status === "Resolved" ? "-" : "Unassigned"}
      </div>
    ),
  },
];

export default function SupportPage() {
  return (
    <Page
      title="Global Support Triage"
      subtitle="Manage L3 escalations and enterprise workspace tickets across the platform."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Support" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">142</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Open Tickets</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-rose-400 mb-1">18</div>
            <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">SLA Breached</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">2.4h</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Avg Resolution Time</div>
          </Card>
          <Card padding="md">
            <div className="flex justify-between items-start mb-1">
              <div className="text-3xl font-black text-amber-400">4</div>
              <ShieldAlert size={20} className="text-amber-400" aria-hidden="true" />
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">P0 Incidents</div>
          </Card>
        </div>

        {/* Tickets table */}
        <Card padding="none">
          <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap items-center gap-3 bg-[#060D1A]">
            <div className="flex items-center gap-2">
              <label htmlFor="ticket-status-filter" className="text-xs font-bold text-[#556677] uppercase">Filter:</label>
              <select
                id="ticket-status-filter"
                className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs font-bold rounded-lg px-3 py-2 outline-none cursor-pointer"
              >
                <option>Status: Open</option>
                <option>Status: P0 Only</option>
                <option>Status: Resolved</option>
              </select>
            </div>
          </div>
          <div className="p-4">
            <DataTable<Ticket>
              data={TICKETS}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              searchable
              searchPlaceholder="Search by Ticket ID, Workspace, or Subject..."
              aria-label="Support tickets"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
