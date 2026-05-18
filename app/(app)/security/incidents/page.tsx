"use client";

import { Search, Filter, AlertTriangle, Siren, ChevronRight } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Severity = "Critical" | "High" | "Medium" | "Low";
type IncidentStatus = "Resolved" | "Investigating" | "Triage" | "Containment";

const SEVERITY_COLOR: Record<Severity, string> = {
  Critical: "text-rose-500",
  High: "text-rose-400",
  Medium: "text-amber-400",
  Low: "text-sky-400",
};

const STATUS_VARIANT: Record<IncidentStatus, "success" | "info"> = {
  Resolved: "success",
  Investigating: "info",
  Triage: "info",
  Containment: "info",
};

const INCIDENTS = [
  { id: "INC-2026-089", desc: "Lost Corporate Laptop (EMP-1022)", sev: "High" as Severity, status: "Investigating" as IncidentStatus, by: "Aditi Krishnan", time: "2 hours ago" },
  { id: "INC-2026-088", desc: "Suspicious Email Forwarding Rule", sev: "High" as Severity, status: "Triage" as IncidentStatus, by: "System Alert", time: "Yesterday" },
  { id: "INC-2026-087", desc: "Unauthorized Access to Payroll Folder", sev: "High" as Severity, status: "Containment" as IncidentStatus, by: "System Alert", time: "2 days ago" },
  { id: "INC-2026-086", desc: "Vendor Phishing Attempt", sev: "Medium" as Severity, status: "Resolved" as IncidentStatus, by: "Rajesh Kumar", time: "Oct 20, 2026" },
  { id: "INC-2026-085", desc: "Shared Password Detected", sev: "Low" as Severity, status: "Resolved" as IncidentStatus, by: "Meera Venkatesh", time: "Oct 15, 2026" },
];

export default function SecurityIncidentPage() {
  return (
    <Page
      title="Incident Response Center"
      subtitle="Track, manage, and mitigate security incidents like data breaches, lost devices, or policy violations."
      breadcrumbs={[
        { label: "Security", href: "/security/dashboard" },
        { label: "Incidents" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="danger" icon={<Siren size={16} aria-hidden="true" />}>
          Declare Incident
        </Button>
      }
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card padding="md">
            <div className="mb-1 flex items-start justify-between">
              <div className="text-3xl font-black text-white">0</div>
              <Badge variant="success">Clear</Badge>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Critical Priority</div>
          </Card>
          <Card padding="md">
            <div className="mb-1 flex items-start justify-between">
              <div className="text-3xl font-black text-rose-400">3</div>
              <Badge variant="danger">Open</Badge>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">High Priority</div>
          </Card>
          <Card padding="md">
            <div className="mb-1 text-3xl font-black text-amber-400">12</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Medium / Low</div>
          </Card>
          <Card padding="md">
            <div className="mb-1 text-3xl font-black text-[#556677]">142</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">Resolved (YTD)</div>
          </Card>
        </div>

        {/* Table */}
        <Card padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-4">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search incidents..."
                aria-label="Search incidents"
                className="h-9 w-64 rounded-lg border border-[#2A3A4A] bg-[#131B2B] pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-indigo-500"
              />
            </div>
            <Button variant="secondary" size="sm" icon={<Filter size={14} aria-hidden="true" />}>
              Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Security incidents">
              <thead className="bg-[#0A1420] text-xs uppercase tracking-wider text-[#8899AA]">
                <tr>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Incident ID</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Description</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Severity</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Status</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Reported By</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4 font-bold">Created</th>
                  <th className="border-b border-[#1A2A3A] px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2A3A]">
                {INCIDENTS.map((row, i) => (
                  <tr key={i} className="group cursor-pointer transition-colors hover:bg-[#131B2B]">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-indigo-400">{row.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[300px] truncate font-medium text-white">{row.desc}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${SEVERITY_COLOR[row.sev]}`}>
                        <AlertTriangle size={14} aria-hidden="true" />
                        {row.sev}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-[#8899AA]">{row.by}</td>
                    <td className="px-6 py-4 text-[#8899AA]">{row.time}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/security/incidents/${row.id}`}
                        className="inline-flex items-center justify-center rounded-lg border border-[#2A3A4A] bg-[#131B2B] p-2 text-[#8899AA] transition-all group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white"
                        aria-label={`View incident ${row.id}`}
                      >
                        <ChevronRight size={16} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Page>
  );
}
