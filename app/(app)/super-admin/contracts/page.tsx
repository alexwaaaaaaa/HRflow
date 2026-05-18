"use client";

import { CalendarClock, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type ContractStatus = "Active" | "Renewal Review" | "At Risk";

interface Contract {
  id: string;
  org: string;
  term: string;
  exp: string;
  status: ContractStatus;
}

const STATUS_VARIANT: Record<ContractStatus, "success" | "warning" | "danger"> = {
  Active: "success",
  "Renewal Review": "warning",
  "At Risk": "danger",
};

const CONTRACTS: Contract[] = [
  { id: "MSA-2024-089", org: "TechCorp India", term: "36 Months", exp: "Dec 31, 2027", status: "Active" },
  { id: "MSA-2023-144", org: "Global Finance Ltd", term: "12 Months", exp: "Nov 15, 2026", status: "Renewal Review" },
  { id: "MSA-2022-012", org: "Zenith Logistics", term: "24 Months", exp: "Oct 30, 2026", status: "At Risk" },
];

const COLUMNS: Column<Contract>[] = [
  {
    key: "id",
    label: "Contract ID",
    render: (r) => <span className="text-indigo-400 font-mono text-xs font-bold">{r.id}</span>,
    sortable: true,
    sortValue: (r) => r.id,
  },
  {
    key: "org",
    label: "Organization",
    render: (r) => <span className="text-white font-bold text-sm">{r.org}</span>,
    sortable: true,
    sortValue: (r) => r.org,
  },
  {
    key: "term",
    label: "Term Length",
    render: (r) => <span className="text-[#8899AA] text-xs font-bold">{r.term}</span>,
  },
  {
    key: "exp",
    label: "Expiration Date",
    render: (r) => (
      <div className="flex items-center gap-2 text-white font-mono text-xs">
        <CalendarClock size={12} className="text-[#556677]" aria-hidden="true" /> {r.exp}
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.exp,
  },
  {
    key: "status",
    label: "Renewal Status",
    render: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: () => (
      <Button variant="ghost" size="sm" icon={<Download size={16} />} aria-label="Download contract" />
    ),
  },
];

export default function ContractsPage() {
  return (
    <Page
      title="MSA & Contract Repository"
      subtitle="Master Service Agreements, custom pricing contracts, and renewal tracking for Enterprise accounts."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Contracts" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">84</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Active Enterprise Contracts</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-amber-400 mb-1">12</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Renewals Due (90 Days)</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">$4.2M</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Contracted ARR Value</div>
          </Card>
        </div>

        {/* Contracts table */}
        <Card padding="none">
          <div className="p-4">
            <DataTable<Contract>
              data={CONTRACTS}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              searchable
              searchPlaceholder="Search organization or contract ID..."
              aria-label="Contracts"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
