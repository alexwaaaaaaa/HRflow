"use client";

import { Building2, Globe, Users, CreditCard, Cpu, Settings, ShieldAlert, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

export default function OrganizationDetailPage({ params: _params }: { params: { id: string } }) {
  const orgId = "ORG-A981";

  return (
    <Page
      title="TechCorp India Pvt Ltd"
      subtitle={`${orgId} · techcorp.hrflow.in`}
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Organizations", href: "/super-admin/organizations" },
        { label: "TechCorp India" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Settings size={16} />}>
            Backend Settings
          </Button>
          <Button variant="danger" icon={<ShieldAlert size={16} />} href={`/super-admin/organizations/${orgId}/impersonate`}>
            System Impersonation
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Building2 size={24} aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">TechCorp India Pvt Ltd</h2>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="text-[#8899AA] text-sm flex items-center gap-3 font-mono">
            <span>{orgId}</span>
            <span className="text-[#3A4A5A]">|</span>
            <span className="flex items-center gap-1">
              <Globe size={14} aria-hidden="true" /> techcorp.hrflow.in
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Overview */}
        <div className="lg:col-span-1 space-y-6">
          {/* Key Stats */}
          <Card padding="lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex items-center justify-between border-b border-[#1A2A3A] pb-4">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Current Cycle</h3>
              </div>
              <div>
                <div className="text-xs text-[#556677] uppercase font-bold mb-1">Seats Used</div>
                <div className="text-xl font-black text-white flex items-center gap-2">
                  <Users size={16} className="text-[#8899AA]" aria-hidden="true" /> 450
                </div>
              </div>
              <div>
                <div className="text-xs text-[#556677] uppercase font-bold mb-1">MRR Impact</div>
                <div className="text-xl font-black text-emerald-400">$4,500</div>
              </div>
            </div>
          </Card>

          {/* Subscription Details */}
          <Card padding="lg">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard size={16} className="text-[#556677]" aria-hidden="true" /> Subscription
            </h3>
            <div className="bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl mb-4">
              <span className="text-indigo-400 font-bold text-sm block mb-1">Enterprise (India)</span>
              <span className="text-[#8899AA] text-xs">Annual Contract • Renews Oct 2027</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm border-b border-[#1A2A3A] pb-2">
                <span className="text-[#556677]">Payment Method</span>
                <span className="text-white font-bold">ACH / Bank TXN</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-1">
                <span className="text-[#556677]">Account Exec</span>
                <span className="text-white font-bold">Meghna S. (AM-04)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Operations */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center gap-2">
              <Cpu size={18} className="text-[#556677]" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white">Ecosystem Provisioning</h2>
            </div>

            <div className="p-6 divide-y divide-[#1A2A3A]">
              {/* Modules */}
              <div className="pb-6">
                <h3 className="text-xs text-[#8899AA] uppercase font-bold tracking-wider mb-4">Enabled Modules (Feature Flags)</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {["Core HR", "Payroll Engine", "Statutory India", "Leave & Attendance", "Performance Mgmt", "Expense Mgmt"].map((mod) => (
                    <div key={mod} className="bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-white font-medium">{mod}</span>
                      <div
                        className="w-8 h-4 bg-emerald-500 rounded-full relative"
                        role="switch"
                        aria-checked="true"
                        aria-label={`${mod} enabled`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5" />
                      </div>
                    </div>
                  ))}
                  <div className="bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg flex items-center justify-between text-xs opacity-50">
                    <span className="text-white font-medium">BGV Pro</span>
                    <div
                      className="w-8 h-4 bg-[#2A3A4A] rounded-full relative"
                      role="switch"
                      aria-checked="false"
                      aria-label="BGV Pro disabled"
                    >
                      <div className="w-3 h-3 bg-gray-400 rounded-full absolute top-0.5 left-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Limits & Usage */}
              <div className="py-6">
                <h3 className="text-xs text-[#8899AA] uppercase font-bold tracking-wider mb-4 flex justify-between">
                  <span>Platform Usage Limits</span>
                  <button type="button" className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors">
                    Modify Quotas
                  </button>
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold text-white mb-2">
                      <span>Storage (Attachments, Resumes)</span>
                      <span className="font-mono">45GB / 100GB</span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={45}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Storage usage: 45%"
                      className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden"
                    >
                      <div className="h-full bg-indigo-500 rounded-full w-[45%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-white mb-2">
                      <span>API Calls (Monthly)</span>
                      <span className="font-mono">842K / 1M</span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={84}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="API calls usage: 84%"
                      className="h-1.5 w-full bg-[#131B2B] rounded-full overflow-hidden"
                    >
                      <div className="h-full bg-amber-500 rounded-full w-[84%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="pt-6">
                <h3 className="text-xs text-rose-400 uppercase font-bold tracking-wider mb-4">Danger Zone</h3>
                <button
                  type="button"
                  className="w-full text-left p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-colors flex justify-between items-center group"
                >
                  <div>
                    <span className="text-rose-400 font-bold text-sm block">Suspend Workspace</span>
                    <span className="text-[#8899AA] text-xs">Temporarily revoke login access for all employees.</span>
                  </div>
                  <ArrowRight size={16} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
