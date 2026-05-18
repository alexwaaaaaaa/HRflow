"use client";

import { Globe, AlertCircle, RefreshCw, Server, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface DomainRow {
  id: string;
  dom: string;
  org: string;
  status: "Active" | "Pending Verification";
  ssl: string;
  route: string;
}

const DOMAINS: DomainRow[] = [
  { id: "d1", dom: "people.techcorp.in", org: "TechCorp India", status: "Active", ssl: "Let's Encrypt (Automated)", route: "tenant.kaarya.com/t/techcorp" },
  { id: "d2", dom: "hr.zenithlogistics.com", org: "Zenith Logistics", status: "Pending Verification", ssl: "Pending", route: "tenant.kaarya.com/t/zenith" },
  { id: "d3", dom: "careers.globalfinance.co.uk", org: "Global Finance Ltd", status: "Active", ssl: "Custom (AWS ACM)", route: "jobs.kaarya.com/c/globalfin" },
  { id: "d4", dom: "portal.apexmedia.com", org: "Apex Media Group", status: "Active", ssl: "Let's Encrypt (Automated)", route: "tenant.kaarya.com/t/apex" },
];

const COLUMNS: Column<DomainRow>[] = [
  {
    key: "dom",
    label: "Custom Domain",
    render: (r) => (
      <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
        <Globe size={14} className="text-[#556677]" aria-hidden="true" /> {r.dom}
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.dom,
  },
  {
    key: "org",
    label: "Organization",
    render: (r) => <span className="text-white font-bold text-xs">{r.org}</span>,
    sortable: true,
    sortValue: (r) => r.org,
  },
  {
    key: "status",
    label: "Status",
    render: (r) => (
      <div className="flex items-center gap-1.5">
        {r.status === "Pending Verification" ? (
          <AlertCircle size={14} className="text-amber-400" aria-hidden="true" />
        ) : (
          <CheckCircle2 size={14} className="text-emerald-400" aria-hidden="true" />
        )}
        <Badge variant={r.status === "Pending Verification" ? "warning" : "success"}>{r.status}</Badge>
      </div>
    ),
  },
  {
    key: "ssl",
    label: "SSL Provider",
    render: (r) => <span className="text-[#8899AA] text-[10px] uppercase font-bold tracking-wider">{r.ssl}</span>,
    hideOnMobile: true,
  },
  {
    key: "route",
    label: "Target Route",
    render: (r) => <span className="text-[#556677] font-mono text-xs">{r.route}</span>,
    hideOnMobile: true,
  },
];

export default function DomainsPage() {
  return (
    <Page
      title="Custom Domain & SSL Provisioning"
      subtitle="Manage CNAME records, automated Let's Encrypt certificates, and custom routing for Enterprise tenants."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Domains" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<RefreshCw size={16} />}>
          Force Renew All SSL
        </Button>
      }
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">124</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Active Custom Domains</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-emerald-400 mb-1">100%</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">SSL Coverage</div>
          </Card>
          <Card padding="md">
            <div className="flex justify-between items-start mb-1">
              <div className="text-3xl font-black text-amber-400">3</div>
              <AlertCircle size={20} className="text-amber-400" aria-hidden="true" />
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Pending DNS Verification</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-rose-400 mb-1">0</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">SSL Expiring &lt; 7 Days</div>
          </Card>
        </div>

        {/* Domain directory */}
        <Card padding="none">
          <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
            <Server size={18} className="text-[#556677]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Domain Directory</h2>
          </div>
          <div className="p-4">
            <DataTable<DomainRow>
              data={DOMAINS}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              searchable
              searchPlaceholder="Search domain or organization..."
              aria-label="Domain directory"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
