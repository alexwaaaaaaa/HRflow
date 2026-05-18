"use client";

import { Store, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

// migrated: immersive-ui

interface MarketplaceDev {
  id: string;
  name: string;
  rev: string;
  installs: string;
  rate: string;
}

const TOP_DEVS: MarketplaceDev[] = [
  { id: "d1", name: "Acme Background Checks (BGV)", rev: "$42,000", installs: "850", rate: "20%" },
  { id: "d2", name: "GiftCard Co. Data Connector", rev: "$12,400", installs: "320", rate: "15%" },
  { id: "d3", name: "Bio-Sync Identity Matrix", rev: "$8,500", installs: "145", rate: "20%" },
];

export default function MarketplaceRevPage() {
  return (
    <Page
      title="App Marketplace Economics"
      subtitle="Monetization tracking for 3rd party integrations and apps passing billing through Kaarya."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Marketplace Revenue" },
      ]}
      maxWidth="1300px"
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card padding="md">
            <div className="text-3xl font-black text-white mb-1">$84K</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Gross App Volume (GAV)</div>
          </Card>
          <Card padding="md">
            <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">
              Platform Take-rate: 20%
            </div>
            <div className="text-3xl font-black text-indigo-400 mb-1">$16.8K</div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Net Kaarya Revenue</div>
          </Card>
        </div>

        {/* Top earning providers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card padding="none">
            <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
              <Store size={18} className="text-[#556677]" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white">Top Performing 3rd-Party Devs</h2>
            </div>
            <div className="divide-y divide-[#1A2A3A]">
              {TOP_DEVS.map((dev) => (
                <div key={dev.id} className="p-5 hover:bg-[#131B2B] transition-colors flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                      {dev.name}
                      <CheckCircle2 size={12} className="text-indigo-400" aria-label="Verified" />
                    </h4>
                    <p className="text-xs text-[#8899AA] mt-1">{dev.installs} Active Tenant Installations</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-400">{dev.rev}</div>
                    <div className="text-[10px] text-[#556677] uppercase font-bold tracking-wider mt-0.5">
                      Platform Cut: {dev.rate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
