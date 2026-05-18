"use client";

import Link from "next/link";
import { Building2, ExternalLink, Filter, MoreVertical } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type OrgStatus = "Active" | "Trial" | "Suspended";

interface OrgRow {
  id: string;
  name: string;
  plan: string;
  domain: string;
  emp: number;
  mrr: string;
  status: OrgStatus;
  statusLabel: string;
  customUrl?: boolean;
}

const STATUS_VARIANT: Record<OrgStatus, "success" | "warning" | "danger"> = {
  Active: "success",
  Trial: "warning",
  Suspended: "danger",
};

const ORGS: OrgRow[] = [
  { id: "ORG-A981", name: "TechCorp India", plan: "Enterprise (Annual)", domain: "techcorp.hrflow.in", emp: 450, mrr: "$4,500", status: "Active", statusLabel: "Active" },
  { id: "ORG-B102", name: "Zenith Logistics", plan: "Growth (Monthly)", domain: "zenith.hrflow.in", emp: 120, mrr: "$960", status: "Active", statusLabel: "Active" },
  { id: "ORG-C334", name: "Apex Media Group", plan: "Trial", domain: "apexmedia.hrflow.in", emp: 45, mrr: "$0", status: "Trial", statusLabel: "Trial Ends in 4d" },
  { id: "ORG-D881", name: "Global Finance Ltd", plan: "Custom Enterprise", domain: "gfl.kaarya.com", emp: 1200, mrr: "$15,000", status: "Active", statusLabel: "Active", customUrl: true },
  { id: "ORG-X992", name: "Sunset Technologies", plan: "Startup", domain: "sunset.hrflow.in", emp: 15, mrr: "$90", status: "Suspended", statusLabel: "Suspended (Billing)" },
];

const COLUMNS: Column<OrgRow>[] = [
  {
    key: "org",
    label: "Organization",
    render: (r) => (
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="w-8 h-8 rounded bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-[#556677]"
        >
          <Building2 size={16} />
        </div>
        <div>
          <div className="text-white font-bold text-sm tracking-wide">{r.name}</div>
          <div className="text-[10px] text-indigo-400 font-mono mt-0.5">{r.id}</div>
        </div>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.name,
  },
  {
    key: "plan",
    label: "Plan Tier",
    render: (r) => <span className="text-[#8899AA] font-medium text-sm">{r.plan}</span>,
  },
  {
    key: "domain",
    label: "Workspace Domain",
    render: (r) => (
      <div className="text-sm font-medium text-white flex items-center gap-2">
        {r.domain}
        {r.customUrl && <Badge variant="info">Custom Name</Badge>}
      </div>
    ),
    hideOnMobile: true,
  },
  {
    key: "emp",
    label: "Employees",
    align: "right",
    render: (r) => <span className="text-white font-mono font-bold">{r.emp}</span>,
    sortable: true,
    sortValue: (r) => r.emp,
  },
  {
    key: "mrr",
    label: "MRR",
    align: "right",
    render: (r) => <span className="text-emerald-400 font-bold">{r.mrr}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.statusLabel}</Badge>,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: (r) => (
      <div className="flex items-center justify-end gap-2">
        <Link href={`/super-admin/organizations/${r.id}`}>
          <Button variant="ghost" size="sm" icon={<ExternalLink size={16} />} aria-label={`Open ${r.name} details`} />
        </Link>
        <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} aria-label={`More actions for ${r.name}`} />
      </div>
    ),
  },
];

export default function OrganizationsPage() {
  return (
    <Page
      title="Organizations Database"
      subtitle="Manage all tenant workspaces, subscriptions, and platform access."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Organizations" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Filter size={14} />}>
            Advanced Filters
          </Button>
          <Button variant="primary">Provision New Tenant</Button>
        </>
      }
    >
      <Card padding="none">
        <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap items-center gap-3 bg-[#060D1A]">
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-xs font-bold text-[#556677] uppercase">Filter Status:</label>
            <select
              id="status-filter"
              className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs font-bold rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              <option>All Active</option>
              <option>Churned</option>
              <option>Trial</option>
            </select>
          </div>
        </div>
        <div className="p-4">
          <DataTable<OrgRow>
            data={ORGS}
            columns={COLUMNS}
            rowKey={(r) => r.id}
            searchable
            searchPlaceholder="Search by Org Name, Domain, or ID..."
            aria-label="Organizations"
          />
        </div>
      </Card>
    </Page>
  );
}
