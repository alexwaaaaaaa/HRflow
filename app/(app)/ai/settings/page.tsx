"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Shield, Sliders, Database, AlertTriangle, Workflow } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types ───────────────────────────────────────────────────────────────────

type SettingsTab = "General AI" | "Autonomy Levels" | "Data & Privacy" | "Model Connectors";

const SETTINGS_TABS: { id: SettingsTab; icon: React.ElementType; label: string }[] = [
  { id: "General AI", icon: SettingsIcon, label: "General Settings" },
  { id: "Autonomy Levels", icon: Workflow, label: "Autonomy Levels" },
  { id: "Data & Privacy", icon: Shield, label: "Privacy & Compliance" },
  { id: "Model Connectors", icon: Database, label: "LLM Connectors" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AISettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("General AI");

  return (
    <Page
      title="AI Settings & Configuration"
      subtitle="Global administrative controls for Kaarya's AI suite. Manage guardrails, auto-execution permissions, and external LLM API endpoints."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Settings" },
      ]}
      maxWidth="1300px"
      actions={
        <Button>Save Configuration</Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <nav className="flex flex-col gap-2" aria-label="AI settings sections">
          {SETTINGS_TABS.map(({ id, icon: Icon, label }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-sm font-medium ${
                  active
                    ? "bg-[#1A2A3A] text-white border border-[#2A3A4A]"
                    : "text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent"
                }`}
              >
                <Icon size={18} className={active ? "text-orange-400" : ""} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Main Settings Area */}
        <Card padding="lg" className="lg:col-span-3">
          {activeTab === "Autonomy Levels" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">AI Execution Guardrails</h2>
                <p className="text-sm text-[#8899AA]">Configure which actions the AI can execute autonomously versus requiring human approval.</p>
              </div>
              <div className="space-y-6">
                {/* Recruitment */}
                <Card padding="md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-medium mb-1">Recruitment Workflows</h3>
                      <p className="text-xs text-[#8899AA]">Applies to sourcing triggers, ATS stage progression, and interview scheduling.</p>
                    </div>
                    <div className="flex bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-1" role="group" aria-label="Recruitment autonomy level">
                      <Button variant="ghost" size="sm">Off</Button>
                      <Button variant="ghost" size="sm">Copilot (Suggest)</Button>
                      <Button variant="secondary" size="sm">Full Autonomy</Button>
                    </div>
                  </div>
                </Card>

                {/* Payroll */}
                <Card padding="md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-medium mb-1 flex items-center gap-2">
                        Payroll & Compensation <AlertTriangle size={14} className="text-amber-500" aria-hidden="true" />
                      </h3>
                      <p className="text-xs text-[#8899AA] max-w-md">Applies to mid-cycle hikes, bonus pool restructuring, and RSUs. High financial impact.</p>
                    </div>
                    <div className="flex bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-1" role="group" aria-label="Payroll autonomy level">
                      <Button variant="ghost" size="sm">Off</Button>
                      <Button variant="secondary" size="sm">Copilot (Suggest)</Button>
                      <Button variant="ghost" size="sm" disabled>Full Autonomy</Button>
                    </div>
                  </div>
                </Card>

                {/* Document Intelligence */}
                <Card padding="md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-medium mb-1">Document Intelligence & OCR</h3>
                      <p className="text-xs text-[#8899AA]">Auto-approve employee submitted documents exceeding confidence threshold.</p>
                    </div>
                    <div className="flex bg-[#0A1420] border border-[#2A3A4A] rounded-lg p-1" role="group" aria-label="Document intelligence autonomy level">
                      <Button variant="ghost" size="sm">Off</Button>
                      <Button variant="secondary" size="sm">Full Autonomy &gt; 95%</Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#1A2A3A]">
                    <label htmlFor="confidence-threshold" className="text-xs text-[#8899AA] mb-2 block">
                      Confidence Threshold (%)
                    </label>
                    <input
                      id="confidence-threshold"
                      type="range"
                      min="80"
                      max="99"
                      defaultValue="95"
                      className="w-full md:w-64 accent-orange-500"
                      aria-label="Confidence threshold percentage"
                    />
                    <div className="flex justify-between w-full md:w-64 text-[10px] text-[#445566] mt-1 font-mono">
                      <span>80%</span><span>90%</span><span>99%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "Model Connectors" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">External LLM Integrations</h2>
                <p className="text-sm text-[#8899AA]">Kaarya uses small proprietary models for core tasks, but relies on external foundational models for NLP generation tasks.</p>
              </div>
              <div className="space-y-6">
                {/* Anthropic */}
                <Card padding="md" className="border-orange-500/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-orange-400 font-bold">An</div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Anthropic Claude 3.5 Sonnet</h3>
                        <Badge variant="warning">Primary Routing Model</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-400 font-medium">Connected</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    </div>
                  </div>
                  <label htmlFor="anthropic-key" className="text-xs font-semibold text-[#8899AA] block mb-1">API Key</label>
                  <div className="flex gap-2">
                    <input
                      id="anthropic-key"
                      type="password"
                      value="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-[#8899AA] focus:outline-none"
                      aria-label="Anthropic API key"
                    />
                    <Button variant="secondary" size="sm">Update</Button>
                  </div>
                </Card>

                {/* OpenAI */}
                <Card padding="md" className="opacity-60">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-emerald-400 font-bold">OAI</div>
                      <div>
                        <h3 className="text-white font-medium mb-1">OpenAI GPT-4o</h3>
                        <span className="text-[10px] text-[#8899AA] uppercase tracking-wider">Fallback Model</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8899AA] font-medium">Disconnected</span>
                      <div className="w-2 h-2 rounded-full bg-[#445566]" aria-hidden="true" />
                    </div>
                  </div>
                  <label htmlFor="openai-key" className="text-xs font-semibold text-[#8899AA] block mb-1">API Key</label>
                  <input
                    id="openai-key"
                    type="password"
                    placeholder="sk-proj-…"
                    className="w-full bg-[#0A1420] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none transition-colors placeholder:text-[#445566]"
                    aria-label="OpenAI API key"
                  />
                </Card>
              </div>
            </div>
          )}

          {activeTab === "General AI" && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Sliders size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
              <h2 className="text-xl font-bold text-white mb-2">Module Configurations</h2>
              <p className="text-sm text-[#8899AA] max-w-sm">Use the sidebar to navigate specific AI subsystem settings including guardrails and data privacy policies.</p>
            </div>
          )}

          {activeTab === "Data & Privacy" && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Shield size={48} className="text-[#2A3A4A] mb-4" aria-hidden="true" />
              <h2 className="text-xl font-bold text-white mb-2">Privacy Vault</h2>
              <p className="text-sm text-[#8899AA] max-w-sm">Configure PII extraction mapping and data retention limits for model training pools here.</p>
            </div>
          )}
        </Card>
      </div>
    </Page>
  );
}
