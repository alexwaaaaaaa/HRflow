"use client";

import { BarChart3, TrendingUp, CreditCard } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

// migrated: immersive-ui

export default function RevenuePage() {
  return (
    <Page
      title="Financial Operations & Revenue"
      subtitle="Analyze MRR, ARR, expansion revenue, and multi-tenant payment flows."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Revenue" },
      ]}
      maxWidth="1300px"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Metrics */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card padding="lg">
              <h3 className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Annual Recurring Revenue (ARR)</h3>
              <div className="text-4xl font-black text-white">$14.2M</div>
              <div className="mt-4 flex items-center gap-4 text-sm font-bold border-t border-indigo-500/20 pt-4">
                <span className="text-emerald-400 flex items-center gap-1">
                  <TrendingUp size={16} aria-hidden="true" /> +24% YoY
                </span>
                <span className="text-[#8899AA]">Target: $20M</span>
              </div>
            </Card>
            <Card padding="lg">
              <h3 className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-2">Net Revenue Retention (NRR)</h3>
              <div className="text-4xl font-black text-emerald-400">114%</div>
              <div className="mt-4 flex items-center gap-4 text-sm font-bold border-t border-[#1A2A3A] pt-4">
                <span className="text-emerald-400">World-class benchmark</span>
              </div>
            </Card>
          </div>

          <Card padding="lg" className="h-80 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4 font-bold text-white">MRR Growth (12 Months)</div>
            <BarChart3 size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
            <span className="text-[#556677] text-sm font-bold uppercase tracking-widest" aria-label="MRR Growth chart visualization area">Chart Visualization Area</span>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="space-y-6">
          <Card padding="lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#1A2A3A] pb-4 mb-6">
              Revenue Breakdown
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold text-white mb-2">
                  <span>Subscription Revenue</span>
                  <span>$1.05M</span>
                </div>
                <div className="text-xs text-[#8899AA]">Monthly recurring software licenses.</div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold text-white mb-2">
                  <span>Implementation &amp; Setup Services</span>
                  <span>$85K</span>
                </div>
                <div className="text-xs text-[#8899AA]">One-time data migration and onboarding fees.</div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold text-white mb-2">
                  <span>Add-ons &amp; Usage Billing</span>
                  <span>$45K</span>
                </div>
                <div className="text-xs text-[#8899AA]">API overages, WhatsApp texts, etc.</div>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-[#556677]" aria-hidden="true" /> Recent High-Value Upgrades
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white font-bold">TechCorp India</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-xs">+$4,500 MRR</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-[#1A2A3A] pt-4">
                <span className="text-white font-bold">Global Finance</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-xs">+$15,000 ARR</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
