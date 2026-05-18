"use client";

import {
  AlertTriangle,
  Search,
  Filter,
  MessageSquare,
  XCircle,
  ArrowRight,
  UserCheck,
  UploadCloud,
  Clock,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Severity = "Critical" | "High" | "Medium";

interface Discrepancy {
  id: string;
  candidate: string;
  role: string;
  type: string;
  vendor: string;
  reportedOn: string;
  severity: Severity;
  status: string;
  desc: string;
}

const DISCREPANCIES: Discrepancy[] = [
  {
    id: "DIS-092",
    candidate: "Amit Singh",
    role: "Sales Exec",
    type: "Education",
    vendor: "Checkr",
    reportedOn: "2 days ago",
    severity: "High",
    status: "Pending Review",
    desc: "Graduation year mismatch. Candidate stated 2019, university records show 2021.",
  },
  {
    id: "DIS-091",
    candidate: "Suman Rao",
    role: "Marketing Mgr",
    type: "Employment",
    vendor: "HireRight",
    reportedOn: "3 days ago",
    severity: "Medium",
    status: "Clarification Requested",
    desc: "Dates of employment at previous company differ by 3 months. Candidate claims to have joining letter.",
  },
  {
    id: "DIS-088",
    candidate: "Vikram Batra",
    role: "Security Analyst",
    type: "Criminal",
    vendor: "FirstAdvantage",
    reportedOn: "5 days ago",
    severity: "Critical",
    status: "HR Escalated",
    desc: "Match found in local court database for civil dispute. Requires Legal team review.",
  },
];

const SEVERITY_VARIANT: Record<Severity, "danger" | "warning" | "info"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
};

function DiscrepancyCard({ item }: { item: Discrepancy }) {
  const isCritical = item.severity === "Critical";
  return (
    <Card padding="none" className="relative overflow-hidden">
      {isCritical && (
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-rose-500" aria-hidden="true" />
      )}
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <h3 className="text-lg font-bold text-white">{item.candidate}</h3>
              <span className="rounded bg-[#1A2A3A] px-2 py-0.5 font-mono text-xs text-[#8899AA]">
                {item.id}
              </span>
              <Badge variant={SEVERITY_VARIANT[item.severity]}>
                {isCritical && <AlertTriangle size={10} aria-hidden="true" className="mr-1" />}
                {item.severity}
              </Badge>
            </div>
            <p className="text-sm text-[#8899AA]">
              Role: <span className="text-white">{item.role}</span> • Vendor:{" "}
              <span className="text-white">{item.vendor}</span>
            </p>
          </div>
          <div className="text-right">
            <div className="mb-1 flex items-center justify-end gap-1.5 text-sm font-bold text-amber-500">
              <Clock size={14} aria-hidden="true" /> {item.status}
            </div>
            <div className="text-xs text-[#556677]">Reported {item.reportedOn}</div>
          </div>
        </div>

        <div className="mb-5 rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#556677]">
            Discrepancy Details ({item.type})
          </div>
          <p className="text-sm leading-relaxed text-slate-300">{item.desc}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1A2A3A] pt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" icon={<MessageSquare size={14} aria-hidden="true" />}>
              Send Query to Candidate
            </Button>
            <Button variant="secondary" size="sm" icon={<UploadCloud size={14} aria-hidden="true" />}>
              Request Re-upload
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="danger" size="sm" icon={<XCircle size={14} aria-hidden="true" />}>
              Reject Candidate
            </Button>
            <Button variant="outline" size="sm" icon={<UserCheck size={14} aria-hidden="true" />}>
              Override &amp; Accept
            </Button>
            <Button size="sm" icon={<ArrowRight size={14} aria-hidden="true" />} href={`/bgv/status/${item.id}`}>
              View Full Case
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function DiscrepanciesPage() {
  return (
    <Page
      title="Discrepancy Resolution Center"
      subtitle="Manage and resolve flags raised during background verifications."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Discrepancies" },
      ]}
      maxWidth="1200px"
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
                  aria-label="Search candidate or ID"
                  className="h-9 w-64 rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-9 pr-3 text-sm text-white outline-none transition-colors focus:border-amber-500"
                />
              </div>
              <Button variant="secondary" size="sm" icon={<Filter size={16} aria-hidden="true" />}>
                Severity
              </Button>
            </div>
            <div className="flex text-sm font-semibold">
              <div className="border-r border-[#1A2A3A] px-4 py-2 text-white">
                Pending Review{" "}
                <span className="ml-2 rounded bg-amber-500 px-1.5 py-0.5 text-xs text-[#060B14]">
                  12
                </span>
              </div>
              <button className="px-4 py-2 text-[#8899AA] transition-colors hover:text-white">
                Resolved
              </button>
            </div>
          </div>
        </Card>

        {/* List */}
        <div className="space-y-4">
          {DISCREPANCIES.map((item) => (
            <DiscrepancyCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Page>
  );
}
