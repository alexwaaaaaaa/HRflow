"use client";

import { Zap, BarChart2 } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data (module scope) ───────────────────────────────────────────────

interface FeatureWeight {
    id: string;
    label: string;
    impact: string;
    impactClass: string;
}

// Static class map — no template literals
const FEATURE_WEIGHTS: FeatureWeight[] = [
    { id: "fw1", label: "Historical Attrition", impact: "High Impact", impactClass: "text-pink-400" },
    { id: "fw2", label: "Revenue Projections", impact: "High Impact", impactClass: "text-pink-400" },
    { id: "fw3", label: "Macro-economic Index", impact: "Med Impact", impactClass: "text-amber-500" },
    { id: "fw4", label: "Competitor Hiring Vol.", impact: "Low Impact", impactClass: "text-[#8899AA]" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkforceIntelligenceAdvancedPage() {
    return (
        <Page
            title="AI Predictive Modeler"
            subtitle="Deep learning models forecasting workforce capacity, skills decay, and optimal team composition."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Workforce Intelligence", href: "/reports/workforce-intelligence" },
                { label: "Predictive Modeler" },
            ]}
            maxWidth="1280px"
            actions={
                <Button icon={<Zap size={14} aria-hidden="true" />}>Run Simulation</Button>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration panel */}
                <Card padding="lg" className="lg:col-span-1 border-t-4 border-t-pink-500">
                    <h2 className="text-lg font-bold text-white mb-6">Model Parameters</h2>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="forecast-horizon" className="block text-sm font-medium text-[#8899AA] mb-2">
                                Forecasting Horizon
                            </label>
                            <input
                                id="forecast-horizon"
                                type="range"
                                className="w-full accent-pink-500"
                                min={1}
                                max={24}
                                defaultValue={12}
                                aria-valuemin={1}
                                aria-valuemax={24}
                                aria-valuenow={12}
                                aria-label="Forecasting horizon in months"
                            />
                            <div className="flex justify-between text-xs text-[#8899AA] mt-1">
                                <span>1 Month</span>
                                <span className="text-white font-bold">12 Months</span>
                                <span>24 Months</span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="target-variable" className="block text-sm font-medium text-[#8899AA] mb-2">
                                Target Variable
                            </label>
                            <select
                                id="target-variable"
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 transition-colors"
                            >
                                <option>Headcount Demand (Capacity)</option>
                                <option>Skill Obsolescence Risk</option>
                                <option>Promotion Velocity</option>
                            </select>
                        </div>

                        <div>
                            <p className="block text-sm font-medium text-[#8899AA] mb-2">
                                Input Features (Weights)
                            </p>
                            <ul className="space-y-3" aria-label="Feature weights">
                                {FEATURE_WEIGHTS.map((fw) => (
                                    <li key={fw.id} className="flex items-center justify-between text-sm">
                                        <span className="text-white">{fw.label}</span>
                                        <span className={fw.impactClass}>{fw.impact}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Simulation output */}
                <Card padding="none" className="lg:col-span-2 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-[#1A2A3A]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <BarChart2 size={18} className="text-pink-500" aria-hidden="true" />
                            Forecast: Headcount Demand (12 Mo)
                        </h2>
                    </div>

                    {/* Abstract chart visualization */}
                    <div className="flex-1 p-6 relative min-h-[300px]">
                        <div
                            className="absolute inset-x-6 top-6 bottom-6 border-b border-l border-[#2A3A4A]"
                            aria-hidden="true"
                        />
                        <div
                            className="absolute inset-x-6 top-1/4 bottom-1/4 bg-pink-500/5 border-y border-pink-500/20 rounded-r-lg"
                            aria-hidden="true"
                        />
                        <svg
                            className="absolute inset-x-6 top-6 bottom-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)]"
                            preserveAspectRatio="none"
                            aria-label="Headcount demand forecast chart"
                            role="img"
                        >
                            <path
                                d="M 0,200 Q 100,180 200,150 T 400,100 T 600,40"
                                fill="none"
                                stroke="#ec4899"
                                strokeWidth="3"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                d="M 0,200 Q 100,190 200,170 T 400,120 T 600,70"
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>

                        <div className="absolute right-10 top-10 text-xs font-mono space-y-1">
                            <div className="flex items-center gap-2 text-pink-400">
                                <div className="w-3 h-1 bg-pink-500" aria-hidden="true" />
                                Target Forecast
                            </div>
                            <div className="flex items-center gap-2 text-indigo-400">
                                <div className="w-3 h-0 border-t-2 border-indigo-400 border-dashed" aria-hidden="true" />
                                Baseline (No Action)
                            </div>
                            <div className="flex items-center gap-2 text-[#8899AA]">
                                <div className="w-3 h-3 bg-pink-500/10 border border-pink-500/30" aria-hidden="true" />
                                95% Confidence Int.
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-[#1A2A3A]/20 border-t border-[#1A2A3A]">
                        <h3 className="text-sm font-bold text-white mb-2">Model Conclusion</h3>
                        <p className="text-sm text-[#8899AA] leading-relaxed">
                            The model predicts an impending capacity shortfall in{" "}
                            <span className="text-pink-400 font-bold">Engineering (Frontend &amp; Devops)</span>{" "}
                            around Month 7. Accelerated hiring must begin by Month 4 to account for the current
                            45-day time-to-fill and 30-day onboarding ramp. Failure to execute will likely
                            bottleneck Q3 product launches.
                        </p>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
