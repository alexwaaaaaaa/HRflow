"use client";

import { Download, TrendingUp, AlertCircle, CreditCard, Building2, Calendar } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface Invoice {
  id: string;
  org: string;
  amount: string;
  type: string;
  status: "Paid" | "Failed" | "Past Due";
  date: string;
}

const INVOICES: Invoice[] = [
  { id: "INV-2026-1044", org: "TechCorp India", amount: "$4,500", type: "Annual Renewal", status: "Paid", date: "Oct 25, 2026" },
  { id: "INV-2026-1043", org: "Apex Media Group", amount: "$3,200", type: "Monthly Subs", status: "Failed", date: "Oct 24, 2026" },
  { id: "INV-2026-1042", org: "Zenith Logistics", amount: "$960", type: "Monthly Subs", status: "Paid", date: "Oct 24, 2026" },
  { id: "INV-2026-1041", org: "Global Finance Ltd", amount: "$15,000", type: "Custom Implementation", status: "Past Due", date: "Sep 25, 2026" },
];

const STATUS_VARIANT: Record<Invoice["status"], "success" | "danger" | "warning"> = {
  Paid: "success",
  Failed: "danger",
  "Past Due": "warning",
};

const COLUMNS: Column<Invoice>[] = [
  {
    key: "id",
    label: "Invoice ID",
    render: (r) => <span className="font-mono text-indigo-400 font-bold text-xs">{r.id}</span>,
    sortable: true,
    sortValue: (r) => r.id,
  },
  {
    key: "org",
    label: "Organization",
    render: (r) => (
      <div className="flex items-center gap-2 text-white font-bold">
        <Building2 size={14} className="text-[#556677]" aria-hidden="true" /> {r.org}
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.org,
  },
  {
    key: "amount",
    label: "Amount",
    render: (r) => <span className="text-white font-mono">{r.amount}</span>,
  },
  {
    key: "type",
    label: "Type",
    render: (r) => <span className="text-[#8899AA] text-xs">{r.type}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (r) => (
      <div>
        <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
        {r.status === "Failed" && <div className="text-[10px] text-rose-400/80 mt-1">Card Expired</div>}
      </div>
    ),
  },
  {
    key: "date",
    label: "Date Generated",
    render: (r) => (
      <div className="flex items-center gap-1 text-[#8899AA] text-xs">
        <Calendar size={12} aria-hidden="true" /> {r.date}
      </div>
    ),
    hideOnMobile: true,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: (r) =>
      r.status === "Failed" ? (
        <Button variant="danger" size="sm">Retry Charge</Button>
      ) : r.status === "Past Due" ? (
        <Button variant="secondary" size="sm">Send Reminder</Button>
      ) : (
        <Button variant="ghost" size="sm">View PDF</Button>
      ),
  },
];

export default function BillingPage() {
  return (
    <Page
      title="Billing & Receivables Hub"
      subtitle="Monitor platform MRR, outstanding invoices, and failed Stripe payments."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Billing" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<Download size={16} />}>
          Export Ledgers
        </Button>
      }
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">$1.18M</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Monthly Recurring Revenue</div>
            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp size={12} aria-hidden="true" /> +4.2% MoM
            </div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-amber-400 mb-1">$45K</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Past Due (Net 30)</div>
            <div className="text-[10px] text-[#556677] font-bold">From 14 Organizations</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-emerald-400 mb-1">$2.4M</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Collected (YTD)</div>
            <div className="w-full h-1 bg-[#131B2B] mt-2 rounded">
              <div className="h-full bg-emerald-500 w-[60%] rounded" />
            </div>
          </Card>
          <Card padding="md">
            <div className="flex justify-between items-start mb-1">
              <div className="text-3xl font-black text-rose-400">8</div>
              <AlertCircle size={20} className="text-rose-400" aria-hidden="true" />
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Failed Transactions</div>
            <div className="text-[10px] text-rose-400/80 font-bold mt-2">Requires immediate retry action</div>
          </Card>
        </div>

        {/* Invoices table */}
        <Card padding="none">
          <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
            <CreditCard size={18} className="text-[#556677]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Recent Invoices & Collections</h2>
          </div>
          <div className="p-4">
            <DataTable<Invoice>
              data={INVOICES}
              columns={COLUMNS}
              rowKey={(r) => r.id}
              aria-label="Invoices and collections"
            />
          </div>
        </Card>
      </div>
    </Page>
  );
}
