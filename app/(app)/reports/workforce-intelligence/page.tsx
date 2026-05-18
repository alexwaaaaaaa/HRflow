"use client";

import Link from "next/link";
import { BrainCircuit, Zap, Target, AlertTriangle } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static data (module scope) ───────────────────────────────────────────────

type RiskLevel = "High" | "Medium";

const RISK_VARIANT: Record<RiskLevel, "danger" | "warning"> = {
    High: "danger",
    Medium: "warning",
};

interface FlightRiskItem {
    id: string;
    group: string;
    risk: RiskLevel;
    prob: string;
    reason: string;
}

const FLIGHT_RISKS: FlightRiskItem[] = [
    {
        id: "fr1",
        group: "High Performers (Sales)",
        risk: "High",
        prob: "75%",
        reason: "Compensation below market average (-12%), Manager tenure < 6mo",
    },
    {
        id: "fr2",
        group: "Senior Engineers",
        risk: "Medium",
        prob: "45%",
        reason: "Stagnant promotion velocity (>36mo since last promo)",
    },
    {
        id: "fr3",
        group: "Customer Support L1",
        risk: "High",
        prob: "82%",
        reason: "Historical burn-out pattern at 12-month tenure mark",
    },
];

interface SkillGap {
    id: string;
    skill: string;
    gapPct: number;
    required: number;
    available: number;
    barClass: string;
}

// Static class map — no template literals
const SKILL_GAPS: SkillGap[] = [
    {
        id: "sg1",
        skill: "Cloud Architecture (AWS)",
        gapPct: 42,
        required: 12,
        available: 7,
        barClass: "bg-amber-500",
    },
    {
        id: "sg2",
        skill: "Enterprise Sales (B2B)",
        gapPct: 60,
        required: 15,
        available: 6,
        barClass: "bg-pink-500",
    },
];

interface Scenario {
    id: string;
    text: string;
    impact: string;
    impactClass: string;
    note: string;
}

// Static class map — no template literals
const SCENARIOS: Scenario[] = [
    {
        id: "s1",
        text: '"If we mandate 5-days Work From Office starting next quarter…"',
        impact: "+18% Attrition",
        impactClass: "text-pink-400",
        note: "Mainly in Engineering (Mid-level)",
    },
    {
        id: "s2",
        text: '"If we increase the variable bonus pool by 15% for top quartile performers…"',
        impact: "-8% Attrition",
        impactClass: "text-emerald-400",
        note: "High retention in Sales team",
    },
];

// ─── Sub-components (module scope) ────────────────────────────────────────────

function FlightRiskCard({ item }: { item: FlightRiskItem }) {
    return (
        <div className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl flex items-start justify-between hover:border-pink-500/30 transition-colors">
            <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-white font-bold mb-1">{item.group}</h3>
                <p className="text-xs text-[#8899AA]">{item.reason}</p>
            </div>
            <div className="text-right shrink-0">
                <p className="text-lg font-black text-white">{item.prob}</p>
                <Badge variant={RISK_VARIANT[item.risk]}>{item.risk} Risk</Badge>
            </div>
        </div>
    );
}

function SkillGapRow({ gap }: { gap: SkillGap }) {
    const coverage = 100 - gap.gapPct;
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{gap.skill}</span>
                <span className="font-bold text-white">{gap.gapPct}% Gap</span>
            </div>
            <div
                className="w-full bg-[#1A2A3A] rounded-full h-1.5"
                role="progressbar"
                aria-valuenow={coverage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${gap.skill}: ${coverage}% coverage`}
            >
                <div className={`${gap.barClass} h-1.5 rounded-full`} style={{ width: `${coverage}%` }} />
            </div>
            <p className="text-[10px] text-[#8899AA] mt-1">
                Required: {gap.required} · Available: {gap.available}
            </p>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkforceIntelligencePage() {
    return (
        <Page
            title="Workforce Intelligence Core"
            subtitle="AI-driven predictive models for flight risk, performance forecasting, and skills mapping."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Workforce Intelligence" },
            ]}
            maxWidth="1280px"
            actions={
                <Button icon={<Zap size={14} aria-hidden="true" />} href="/reports/workforce-intelligence-advanced">Advanced Modeler</Button>
            }
        >
            <div className="space-y-6">
                {/* Flight risk + skill gaps */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Flight risk predictor */}
                    <Card padding="lg" className="lg:col-span-2 border-pink-500/30">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-pink-500" aria-hidden="true" />
                            Predictive Flight Risk (Next 90 Days)
                        </h2>
                        <div className="space-y-4">
                            {FLIGHT_RISKS.map((item) => (
                                <FlightRiskCard key={item.id} item={item} />
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#1A2A3A] flex justify-end">
                            <Button variant="ghost" size="sm" className="text-pink-400">
                                View Individual Risk Profiles →
                            </Button>
                        </div>
                    </Card>

                    {/* Skill gap analysis */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Target size={18} className="text-emerald-400" aria-hidden="true" />
                            Critical Skill Gaps
                        </h2>
                        <div className="space-y-5">
                            {SKILL_GAPS.map((gap) => (
                                <SkillGapRow key={gap.id} gap={gap} />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Scenario modeling */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Zap size={18} className="text-amber-500" aria-hidden="true" />
                        Scenario Modeling (What-If Analysis)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SCENARIOS.map((s) => (
                            <div key={s.id} className="bg-[#0B1221] p-5 rounded-xl border border-[#1A2A3A]">
                                <h3 className="text-xs font-bold text-[#8899AA] mb-3 uppercase tracking-wider">
                                    Scenario
                                </h3>
                                <p className="text-white mb-4 text-sm">{s.text}</p>
                                <div className="pt-4 border-t border-[#1A2A3A]">
                                    <p className="text-xs text-[#8899AA] mb-1">Predicted Impact</p>
                                    <p className={`font-bold text-lg ${s.impactClass}`}>{s.impact}</p>
                                    <p className="text-[10px] text-[#8899AA]">{s.note}</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-center p-5 border border-dashed border-[#2A3A4A] rounded-xl hover:bg-[#1A2A3A]/20 transition-colors">
                            <div className="text-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Create new scenario"
                                    className="w-10 h-10 rounded-full bg-[#1A2A3A] hover:bg-[#2A3A4A] mx-auto mb-3 flex items-center justify-center"
                                >
                                    <span className="text-white text-xl leading-none">+</span>
                                </Button>
                                <h3 className="text-sm font-bold text-white">Create New Scenario</h3>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* AI badge */}
                <div className="flex items-center gap-3 p-4 bg-pink-500/5 border border-pink-500/20 rounded-xl">
                    <BrainCircuit size={20} className="text-pink-500 shrink-0" aria-hidden="true" />
                    <p className="text-sm text-[#8899AA]">
                        Powered by HRflow AI — models retrain weekly on anonymized workforce data.
                        <Link
                            href="/reports/workforce-intelligence-advanced"
                            className="ml-2 text-pink-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                        >
                            Open Advanced Modeler →
                        </Link>
                    </p>
                </div>
            </div>
        </Page>
    );
}
