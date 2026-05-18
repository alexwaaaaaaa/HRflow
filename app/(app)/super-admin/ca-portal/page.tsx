"use client";

import { Briefcase, Building2, FileSignature, CheckCircle2, ShieldAlert, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type PartnerTier = "Platinum" | "Gold" | "Silver" | "Onboarding";

interface CaPartner {
  id: string;
  name: string;
  tier: PartnerTier;
  clients: number;
  mrr: string;
  status: "verified" | "pending";
}

const TIER_VARIANT: Record<PartnerTier, "purple" | "warning" | "neutral" | "info"> = {
  Platinum: "purple",
  Gold: "warning",
  Silver: "neutral",
  Onboarding: "info",
};

const PARTNERS: CaPartner[] = [
  { id: "p1", name: "KPMG India (Payroll Div)", tier: "Platinum", clients: 124, mrr: "$12,400", status: "verified" },
  { id: "p2", name: "Sharma & Associates", tier: "Gold", clients: 45, mrr: "$4,500", status: "verified" },
  { id: "p3", name: "Agrawal Tax Pro", tier: "Silver", clients: 12, mrr: "$1,200", status: "verified" },
  { id: "p4", name: "FinTrust Advisory", tier: "Onboarding", clients: 0, mrr: "$0", status: "pending" },
];

const COLUMNS: Column<CaPartner>[] = [
  {
    key: "name",
    label: "Partner Firm",
    render: (r) => (
      <div className="text-white font-bold text-sm flex items-center gap-2">
        <Building2 size={14} className="text-[#556677]" aria-hidden="true" /> {r.name}
        {r.status === "verified" && <CheckCircle2 size={12} className="text-emerald-400" aria-label="Verified" />}
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.name,
  },
  {
    key: "tier",
    label: "Tier",
    render: (r) => <Badge variant={TIER_VARIANT[r.tier]}>{r.tier}</Badge>,
  },
  {
    key: "clients",
    label: "Clients",
    render: (r) => <span className="text-white font-bold">{r.clients}</span>,
    sortable: true,
    sortValue: (r) => r.clients,
  },
  {
    key: "mrr",
    label: "Net MRR",
    render: (r) => <span className="text-white font-mono font-bold text-xs">{r.mrr}</span>,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: () => (
      <Button variant="ghost" size="sm" iconRight={<ArrowRight size={14} />}>
        Manage
      </Button>
    ),
  },
];

export default function CAPortalPage() {
  return (
    <Page
      title="Chartered Accountant (CA) Partner Network"
      subtitle="Manage multi-tenant access for CA firms managing payroll/compliance for their SME clients."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "CA Portal" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">412</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Registered CA Firms</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-indigo-400 mb-1">1,845</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Client Workspaces Managed</div>
          </Card>
          <Card padding="md">
            <div className="text-3xl font-black text-emerald-400 mb-1">$45K</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Total Rev Share (YTD)</div>
          </Card>
          <Card padding="md">
            <div className="flex justify-between items-start mb-1">
              <div className="text-3xl font-black text-amber-400">14</div>
              <FileSignature size={20} className="text-amber-400" aria-hidden="true" />
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Pending KYC Approvals</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Partners table */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
                <Briefcase size={18} className="text-[#556677]" aria-hidden="true" />
                <h2 className="text-lg font-bold text-white">Active Partner Agency Network</h2>
              </div>
              <div className="p-4">
                <DataTable<CaPartner>
                  data={PARTNERS}
                  columns={COLUMNS}
                  rowKey={(r) => r.id}
                  aria-label="CA partner network"
                />
              </div>
            </Card>
          </div>

          {/* KYC Action Required */}
          <div>
            <Card padding="none">
              <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-2">
                <ShieldAlert size={16} className="text-amber-400" aria-hidden="true" />
                <h3 className="font-bold text-white text-sm">Pending KYC/KYB Reviews</h3>
              </div>
              <div className="divide-y divide-[#1A2A3A]">
                <div className="p-4 hover:bg-[#131B2B] transition-colors">
                  <h4 className="font-bold text-white text-sm mb-1">Delhi Tax Consultants LLP</h4>
                  <p className="text-xs text-[#8899AA] mb-3">
                    Submitted GSTIN and Firm Registration Docs for Tier 1 Partner Access.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1 justify-center">
                      Approve
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1 justify-center">
                      Review Docs
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}
