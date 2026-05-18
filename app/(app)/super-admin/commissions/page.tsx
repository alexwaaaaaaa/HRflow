"use client";

import { DollarSign, CreditCard } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

interface CommissionRow {
  id: string;
  name: string;
  base: string;
  rate: string;
  amt: string;
}

const PAYOUTS: CommissionRow[] = [
  { id: "p1", name: "KPMG India (Payroll Div)", base: "$12,400", rate: "20%", amt: "$2,480" },
  { id: "p2", name: "SaaS Implementors UK", base: "$8,200", rate: "15%", amt: "$1,230" },
  { id: "p3", name: "Middle East Tech Disti", base: "$45,000", rate: "30%", amt: "$13,500" },
];

const COLUMNS: Column<CommissionRow>[] = [
  {
    key: "name",
    label: "Partner Entity",
    render: (r) => <span className="text-white font-bold text-sm">{r.name}</span>,
    sortable: true,
    sortValue: (r) => r.name,
  },
  {
    key: "base",
    label: "Commission Base",
    render: (r) => <span className="text-white font-mono text-xs">{r.base}</span>,
  },
  {
    key: "rate",
    label: "Rate",
    render: (r) => <span className="text-[#8899AA] font-mono text-xs">{r.rate}</span>,
  },
  {
    key: "amt",
    label: "Amount Due",
    render: (r) => <span className="text-emerald-400 font-mono font-bold">{r.amt}</span>,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: () => (
      <Button variant="secondary" size="sm">
        Process Payout
      </Button>
    ),
  },
];

export default function CommissionsPage() {
  return (
    <Page
      title="Partner Commission Payouts"
      subtitle="Calculate and disburse rev-share amounts to CAs, Affiliates, and Resellers."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Commissions" },
      ]}
      maxWidth="1300px"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending payouts */}
        <div className="md:col-span-2">
          <Card padding="none">
            <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-400" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white">Pending Payouts (October 2026 Cycle)</h2>
            </div>
            <div className="p-4">
              <DataTable<CommissionRow>
                data={PAYOUTS}
                columns={COLUMNS}
                rowKey={(r) => r.id}
                aria-label="Pending commission payouts"
              />
            </div>
          </Card>
        </div>

        {/* Treasury overview */}
        <Card padding="lg">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Treasury Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Cleared This Month (YTD)</div>
              <div className="text-3xl font-black text-white">$142K</div>
            </div>
            <div className="border-t border-[#1A2A3A] pt-4">
              <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Outstanding Pipeline</div>
              <div className="text-2xl font-black text-amber-400">$17.2K</div>
            </div>
          </div>
          <Button variant="secondary" icon={<CreditCard size={16} />} className="w-full justify-center mt-6">
            Link Stripe Connect
          </Button>
        </Card>
      </div>
    </Page>
  );
}
