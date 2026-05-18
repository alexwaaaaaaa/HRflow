"use client";

import { useState } from "react";
import { Cpu, Network, Key, Plus, Save, Activity } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "Models" | "Features" | "API Keys" | "Advanced";

const TABS: Tab[] = ["Models", "Features", "API Keys", "Advanced"];

const TAB_ICONS: Record<Tab, React.ElementType> = {
  Models: Cpu,
  Features: Activity,
  "API Keys": Key,
  Advanced: Network,
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AIConfigurationPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Models");

  return (
    <Page
      title="AI Configuration"
      subtitle="Deep technical configuration for Kaarya's embedded AI services. Manage model versions, feature flags, and custom integrations."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Configuration" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary">Discard Changes</Button>
          <Button icon={<Save size={14} />}>Apply Configuration</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <nav className="flex flex-col gap-2" aria-label="Configuration sections">
          {TABS.map((tab) => {
            const Icon = TAB_ICONS[tab];
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors text-sm font-medium ${
                  active
                    ? "bg-[#1A2A3A] text-white border border-[#2A3A4A]"
                    : "text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} className={active ? "text-indigo-400" : ""} aria-hidden="true" />
                  {tab}
                </span>
                {tab === "Advanced" && <Badge variant="danger">Danger</Badge>}
              </button>
            );
          })}
        </nav>

        {/* Main Settings Area */}
        <Card padding="lg" className="lg:col-span-3">
          {activeTab === "Models" && (
            <div>
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Deployed Models</h2>
                  <p className="text-sm text-[#8899AA]">Manage versioning for internally hosted predictive models.</p>
                </div>
                <Button variant="secondary" size="sm" icon={<Plus size={14} />}>Add Custom Model</Button>
              </div>

              <div className="space-y-4">
                {/* Attrition Model */}
                <Card padding="md" className="hover:border-indigo-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-medium">Attrition Risk Predictor</h3>
                        <Badge variant="success">Active</Badge>
                      </div>
                      <p className="text-xs text-[#8899AA] mb-4">Internal XGBoost ensemble trained on HRFlow core tables.</p>
                      <div className="flex gap-4">
                        <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-2.5">
                          <label htmlFor="attrition-version" className="text-[10px] text-[#8899AA] uppercase tracking-wider block mb-1 font-semibold">
                            Current Version
                          </label>
                          <select id="attrition-version" className="bg-transparent text-white text-sm w-full outline-none appearance-none cursor-pointer">
                            <option>v4.2.1 (Production)</option>
                            <option>v4.2.0 (Stable)</option>
                            <option>v4.1.5 (Legacy)</option>
                          </select>
                        </div>
                        <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-2.5">
                          <div className="text-[10px] text-[#8899AA] uppercase tracking-wider block mb-1 font-semibold">Threshold</div>
                          <div className="text-sm text-white">0.85</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col justify-end gap-2 border-t border-[#1A2A3A] md:border-t-0 md:border-l md:pl-4 pt-4 md:pt-0 shrink-0">
                      <Button variant="secondary" size="sm">View Metrics</Button>
                    </div>
                  </div>
                </Card>

                {/* OCR Model */}
                <Card padding="md" className="hover:border-indigo-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-medium">Document Intelligence (OCR)</h3>
                        <Badge variant="success">Active</Badge>
                      </div>
                      <p className="text-xs text-[#8899AA] mb-4">Vision transformer for extracting text from KYC documents.</p>
                      <div className="flex gap-4">
                        <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-2.5">
                          <label htmlFor="ocr-version" className="text-[10px] text-[#8899AA] uppercase tracking-wider block mb-1 font-semibold">
                            Current Version
                          </label>
                          <select id="ocr-version" className="bg-transparent text-white text-sm w-full outline-none appearance-none cursor-pointer">
                            <option>v2.0.4 (Production)</option>
                            <option>v1.5.0 (Legacy)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col justify-end gap-2 border-t border-[#1A2A3A] md:border-t-0 md:border-l md:pl-4 pt-4 md:pt-0 shrink-0">
                      <Button variant="secondary" size="sm">View Metrics</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "Features" && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Activity size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
              <h2 className="text-xl font-bold text-white mb-2">Feature Toggles</h2>
              <p className="text-sm text-[#8899AA] max-w-sm">Enable or disable experimental AI capabilities before rolling them out globally to your tenant.</p>
            </div>
          )}

          {(activeTab === "API Keys" || activeTab === "Advanced") && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              {activeTab === "API Keys" ? (
                <Key size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
              ) : (
                <Network size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
              )}
              <h2 className="text-xl font-bold text-white mb-2">{activeTab}</h2>
              <p className="text-sm text-[#8899AA] max-w-sm">Configuration options for this section are coming soon.</p>
            </div>
          )}
        </Card>
      </div>
    </Page>
  );
}
