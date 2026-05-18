"use client";

import { AlertTriangle, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  status: "GA" | "BETA" | "DISABLED";
  rolloutTarget: string;
  rolloutPct?: number;
  enabled: boolean;
  warning?: string;
}

const FLAGS: FeatureFlag[] = [
  {
    id: "f1",
    name: "AI Performance Reviews",
    key: "ENABLE_AI_PERF_REVIEWS_V2",
    description: "Enables the generative AI assistant for summarizing continuous feedback into annual review drafts.",
    status: "GA",
    rolloutTarget: "All Active Workspaces",
    enabled: true,
  },
  {
    id: "f2",
    name: "Instant Payouts (EWA)",
    key: "ENABLE_EWA_INSTANT_TRANSFER",
    description: "Allows employees to withdraw earned wages instantly via UPI instead of waiting for standard payroll.",
    status: "BETA",
    rolloutTarget: "Percentage",
    rolloutPct: 20,
    enabled: true,
    warning: "Banking API limits apply during beta.",
  },
  {
    id: "f3",
    name: "Legacy Time-Tracking Sync",
    key: "DISABLE_LEGACY_BIOMETRIC_SYNC",
    description: "V1 API for fetching physical biometric machine logs. Replaced by V2.",
    status: "DISABLED",
    rolloutTarget: "None (Hard kill)",
    enabled: false,
  },
];

const STATUS_VARIANT: Record<FeatureFlag["status"], "success" | "info" | "neutral"> = {
  GA: "success",
  BETA: "info",
  DISABLED: "neutral",
};

export default function FeaturesPage() {
  return (
    <Page
      title="Feature Flags / Toggles"
      subtitle="Globally enable, disable, or gradually rollout beta features across the platform."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Feature Flags" },
      ]}
      maxWidth="1100px"
    >
      <Card padding="none">
        <div className="divide-y divide-[#1A2A3A]">
          {FLAGS.map((flag) => (
            <div
              key={flag.id}
              className={`p-6 hover:bg-[#131B2B] transition-colors ${!flag.enabled ? "opacity-70" : ""} ${flag.status === "BETA" ? "bg-indigo-500/5" : ""}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-bold text-lg">{flag.name}</h3>
                    <Badge variant={STATUS_VARIANT[flag.status]}>{flag.status}</Badge>
                  </div>
                  <div className="text-[#556677] font-mono text-xs mb-2">KEY: {flag.key}</div>
                  <p className="text-sm text-[#8899AA]">{flag.description}</p>

                  {flag.warning && (
                    <div className="mt-3 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-max">
                      <AlertTriangle size={14} className="text-amber-400" aria-hidden="true" />
                      <span className="text-xs text-amber-400 font-bold">{flag.warning}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6 md:min-w-[300px] justify-between">
                  <div className="flex-1">
                    <div className="text-[10px] text-[#556677] uppercase font-bold mb-1 tracking-wider">Rollout Target</div>
                    {flag.rolloutPct !== undefined ? (
                      <div>
                        <div className="text-sm font-bold text-white mb-1 flex items-center justify-between">
                          <span>Percentage</span>
                          <span className="text-indigo-400">{flag.rolloutPct}%</span>
                        </div>
                        <div
                          role="progressbar"
                          aria-valuenow={flag.rolloutPct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${flag.name} rollout: ${flag.rolloutPct}%`}
                          className="h-1.5 w-full bg-[#0A1420] border border-[#2A3A4A] rounded-full overflow-hidden"
                        >
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${flag.rolloutPct}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {flag.rolloutTarget !== "None (Hard kill)" && (
                          <Users size={14} className="text-[#8899AA]" aria-hidden="true" />
                        )}
                        {flag.rolloutTarget}
                      </div>
                    )}
                  </div>

                  {/* Toggle */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={flag.enabled}
                    aria-label={`Toggle ${flag.name}`}
                    className={`w-12 h-6 rounded-full relative cursor-pointer shrink-0 transition-colors ${
                      flag.enabled
                        ? flag.status === "BETA"
                          ? "bg-indigo-500"
                          : "bg-emerald-500"
                        : "bg-[#2A3A4A]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                        flag.enabled ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
}
