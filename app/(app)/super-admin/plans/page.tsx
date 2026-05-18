"use client";

import { Package, Plus, Check, Edit2, Archive, DollarSign, Layers } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

interface Plan {
  id: string;
  name: string;
  price: string;
  seats: string;
  icon: React.ElementType;
  iconClass: string;
  features: string[];
  featuresLabel: string;
  status: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "startup",
    name: "Startup",
    price: "₹7,500 /mo",
    seats: "Up to 50 employees",
    icon: Package,
    iconClass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    features: ["Core HR", "Leave & Attendance", "Payroll Engine", "Statutory Compliance (Basic)"],
    featuresLabel: "Included Modules:",
    status: "Active",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹25,000 /mo",
    seats: "Up to 250 employees",
    icon: Layers,
    iconClass: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    features: ["Performance Management", "Expense Management", "Recruitment (ATS)", "API Access"],
    featuresLabel: "All Startup features, plus:",
    status: "Active",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Let's Talk",
    seats: "250+ employees",
    icon: DollarSign,
    iconClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    features: ["Dedicated Support", "Custom White-labeling", "SAML SSO Integration", "On-prem Backup Export"],
    featuresLabel: "All Growth features, plus:",
    status: "Custom",
  },
];

export default function PlansPage() {
  return (
    <Page
      title="Subscription Plans & Tiers"
      subtitle="Configure default SaaS packages, pricing, and module bundles."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Plans" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="primary" icon={<Plus size={16} />}>
          Create New Plan
        </Button>
      }
    >
      <div className="space-y-8">
        {/* Active plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                padding="lg"
                variant={plan.popular ? "elevated" : "default"}
                className={`relative flex flex-col h-full ${plan.popular ? "border-2 border-indigo-500/30" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className={`flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-4 ${plan.popular ? "mt-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${plan.iconClass}`}>
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h2 className="text-white font-bold text-lg">{plan.name}</h2>
                  </div>
                  <Badge variant="neutral">{plan.status}</Badge>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-black text-white mb-1">{plan.price}</div>
                  <p className="text-sm text-[#8899AA]">{plan.seats}</p>
                </div>
                <div className="space-y-3 mb-8 flex-1">
                  <div className="text-xs font-bold text-[#556677] uppercase tracking-wider">{plan.featuresLabel}</div>
                  {plan.features.map((mod) => (
                    <div key={mod} className="flex items-center gap-2 text-sm text-white">
                      <Check
                        size={14}
                        className={plan.popular ? "text-indigo-400" : "text-emerald-400"}
                        aria-hidden="true"
                      />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 border-t border-[#1A2A3A] pt-4 mt-auto">
                  <Button variant="secondary" size="sm" icon={<Edit2 size={14} />} className="flex-1 justify-center" aria-label={`Edit ${plan.name} plan`}>
                    Edit
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Legacy plans */}
        <Card padding="none">
          <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
            <Archive size={18} className="text-[#556677]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-white">Legacy &amp; Grandfathered Plans</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-[#8899AA] mb-4">
              These plans are no longer available for new workspaces, but existing tenants remain supported.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                <div>
                  <h3 className="text-white font-bold text-sm">Beta Pioneer (Free Forever)</h3>
                  <p className="text-xs text-[#556677]">Created Jan 2024</p>
                </div>
                <div className="flex items-center gap-6 text-sm font-bold">
                  <span className="text-[#8899AA]">14 Tenants Active</span>
                  <Badge variant="neutral">Read Only</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
