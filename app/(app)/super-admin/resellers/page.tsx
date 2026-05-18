"use client";

import { MoreVertical, Plus, Award } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// migrated: immersive-ui

type ResellerTier = "Titanium" | "Gold" | "Silver";

interface Reseller {
  id: string;
  name: string;
  type: string;
  reg: string;
  seats: string;
  arr: string;
  tier: ResellerTier;
}

const TIER_VARIANT: Record<ResellerTier, "purple" | "warning" | "neutral"> = {
  Titanium: "purple",
  Gold: "warning",
  Silver: "neutral",
};

const RESELLERS: Reseller[] = [
  { id: "r1", name: "Middle East Tech Disti", type: "White-label Wholesale", reg: "MENA", seats: "14,500", arr: "$1.2M", tier: "Titanium" },
  { id: "r2", name: "SaaS Implementors UK", type: "Value Added Reseller", reg: "UK/Europe", seats: "4,200", arr: "$320K", tier: "Gold" },
  { id: "r3", name: "HR Consultants Pvt Ltd", type: "Referral Affiliate", reg: "India", seats: "850", arr: "$45K", tier: "Silver" },
];

const COLUMNS: Column<Reseller>[] = [
  {
    key: "name",
    label: "Reseller Partner",
    render: (r) => (
      <div className="text-white font-bold text-sm flex items-center gap-2">
        <Award
          size={16}
          className={r.tier === "Titanium" ? "text-indigo-400" : r.tier === "Gold" ? "text-amber-400" : "text-[#8899AA]"}
          aria-hidden="true"
        />
        {r.name}
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.name,
  },
  {
    key: "type",
    label: "Contract Type",
    render: (r) => <Badge variant="neutral">{r.type}</Badge>,
  },
  {
    key: "reg",
    label: "Region / Territory",
    render: (r) => <span className="text-white font-bold text-xs">{r.reg}</span>,
  },
  {
    key: "seats",
    label: "Active Seats Sold",
    render: (r) => <span className="text-white font-bold">{r.seats}</span>,
    sortable: true,
    sortValue: (r) => r.seats,
  },
  {
    key: "arr",
    label: "Net ARR Driven",
    render: (r) => <span className="text-emerald-400 font-mono font-bold text-xs">{r.arr}</span>,
  },
  {
    key: "tier",
    label: "Tier",
    render: (r) => <Badge variant={TIER_VARIANT[r.tier]}>{r.tier}</Badge>,
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: (r) => (
      <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} aria-label={`More actions for ${r.name}`} />
    ),
  },
];

export default function ResellersPage() {
  return (
    <Page
      title="Global Reseller Network"
      subtitle="Manage B2B Value Added Resellers (VARs), distis, and affiliate partners selling HRFlow."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Resellers" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="primary" icon={<Plus size={16} />}>
          Onboard Reseller
        </Button>
      }
    >
      <Card padding="none">
        <div className="p-4">
          <DataTable<Reseller>
            data={RESELLERS}
            columns={COLUMNS}
            rowKey={(r) => r.id}
            searchable
            searchPlaceholder="Search reseller name or ID..."
            aria-label="Resellers"
          />
        </div>
      </Card>
    </Page>
  );
}
