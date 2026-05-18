"use client";

import { useState } from "react";
import { CopyPlus, Play, TestTube, AlertOctagon, TrendingUp, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

// Calculation snapshot values — byte-identical after migration
// Scenario 1 (10% Hike): Total Payroll ₹1,12,12,680 (+₹9,95,880 vs Current), Avg ₹32,312, Annual ₹13.45 Cr (+₹1.19 Cr/year)
// Scenario 2 (12% Hike): Total Payroll ₹1,14,42,208 (+₹12,25,408 vs Current), Avg ₹32,975, Annual ₹13.73 Cr (+₹1.47 Cr/year)
// Scenario 3 (15% Hike): Total Payroll ₹1,32,74,400 (+₹30,57,600 vs Current), Avg ₹38,255, Annual ₹15.92 Cr (+₹3.66 Cr/year)

interface Scenario {
    id: number;
    name: string;
    isBase: boolean;
    desc: string;
}

const SCENARIOS: Scenario[] = [
    { id: 1, name: "Scenario 1: 10% Hike", isBase: true, desc: "10% flat hike for all eligible employees." },
    { id: 2, name: "Scenario 2: 12% Hike", isBase: false, desc: "12% flat hike for all eligible employees." },
    { id: 3, name: "Scenario 3: 15% Hike + Variable", isBase: false, desc: "15% hike + ₹50,000 variable component addition." },
];

interface ScenarioResult {
    id: number;
    title: string;
    totalPayroll: string;
    delta: string;
    deltaColor: string;
    avgSalary: string;
    annualCost: string;
    annualExtra: string;
    annualExtraColor: string;
    accentColor: string;
    isRecommended: boolean;
}

const SCENARIO_RESULTS: ScenarioResult[] = [
    {
        id: 1,
        title: "Scenario 1: 10% Hike",
        totalPayroll: "₹1,12,12,680",
        delta: "+₹9,95,880 vs Current",
        deltaColor: "text-[#00E5A0]",
        avgSalary: "₹32,312",
        annualCost: "₹13.45 Cr",
        annualExtra: "Additional: +₹1.19 Cr/year",
        annualExtraColor: "text-[#8899AA]",
        accentColor: "rgba(0,229,160,0.05)",
        isRecommended: false,
    },
    {
        id: 2,
        title: "Scenario 2: 12% Hike",
        totalPayroll: "₹1,14,42,208",
        delta: "+₹12,25,408 vs Current",
        deltaColor: "text-[#FFB800]",
        avgSalary: "₹32,975",
        annualCost: "₹13.73 Cr",
        annualExtra: "Additional: +₹1.47 Cr/year",
        annualExtraColor: "text-[#8899AA]",
        accentColor: "rgba(255,184,0,0.05)",
        isRecommended: true,
    },
    {
        id: 3,
        title: "Scenario 3: 15% Hike",
        totalPayroll: "₹1,32,74,400",
        delta: "+₹30,57,600 vs Current",
        deltaColor: "text-[#FF4444]",
        avgSalary: "₹38,255",
        annualCost: "₹15.92 Cr",
        annualExtra: "Additional: +₹3.66 Cr/year (High)",
        annualExtraColor: "text-[#FF4444]/80",
        accentColor: "rgba(255,68,68,0.05)",
        isRecommended: false,
    },
];

export default function PayrollSimulationPage() {
    const [scenarios] = useState<Scenario[]>(SCENARIOS);

    return (
        <Page
            title="Payroll Simulation"
            subtitle="Sandbox mode — changes here do NOT affect actual payroll"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Simulation" },
            ]}
            maxWidth="1600px"
            actions={
                <Badge variant="warning">
                    <AlertOctagon size={13} className="mr-1" aria-hidden="true" />
                    SIMULATION MODE — No actual payroll will be run
                </Badge>
            }
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#0066FF]/10 rounded-lg" aria-hidden="true">
                    <TestTube size={18} className="text-[#0066FF]" />
                </div>
                <p className="text-sm text-[#8899AA]">Compare up to 3 salary hike scenarios side-by-side before committing to a payroll cycle.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Scenario Builder */}
                <div className="xl:col-span-1 space-y-6">
                    <Card padding="md">
                        <h3 className="text-lg font-semibold text-white border-b border-[#1A2A3A] pb-3 mb-4">Scenario Builder</h3>

                        <div className="mb-4">
                            <label htmlFor="base-month" className="block text-sm font-medium text-[#8899AA] mb-2">Base Month</label>
                            <select
                                id="base-month"
                                className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]"
                            >
                                <option>March 2025 (Current)</option>
                                <option>February 2025</option>
                            </select>
                        </div>

                        <ul className="space-y-3" role="list">
                            {scenarios.map((scenario) => (
                                <li key={scenario.id}>
                                    <button
                                        type="button"
                                        className="w-full text-left bg-[#0A1420] border border-[#1A2A3A] rounded-lg p-3 hover:border-[#00E5A0]/50 transition-colors"
                                        aria-label={`Select ${scenario.name}`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-sm text-white">{scenario.name}</span>
                                            <Badge variant={scenario.isBase ? "neutral" : "success"}>
                                                {scenario.isBase ? "BASE" : `V${scenario.id}`}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-[#8899AA]">{scenario.desc}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="outline"
                            className="w-full mt-3"
                            icon={<CopyPlus size={14} aria-hidden="true" />}
                        >
                            Add Scenario
                        </Button>

                        <div className="pt-4 border-t border-[#1A2A3A] mt-4">
                            <Button
                                className="w-full"
                                icon={<Play size={14} className="fill-black" aria-hidden="true" />}
                            >
                                Run Simulation
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Comparison Output */}
                <div className="xl:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SCENARIO_RESULTS.map((result) => (
                            <Card key={result.id} padding="none" className="flex flex-col overflow-hidden">
                                <div className="bg-[#060B14] p-4 text-center border-b border-[#1A2A3A]">
                                    <h3 className="font-bold text-white text-lg">{result.title}</h3>
                                </div>
                                <div className="p-5 space-y-5 flex-1">
                                    <div className="p-4 rounded-lg border" style={{ background: result.accentColor, borderColor: result.accentColor.replace("0.05", "0.1") }}>
                                        <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider mb-1">Total Payroll</p>
                                        <p className="text-2xl font-bold text-white">{result.totalPayroll}</p>
                                        <p className={`text-sm font-medium mt-1 flex items-center gap-1 ${result.deltaColor}`}>
                                            <TrendingUp size={12} aria-hidden="true" /> {result.delta}
                                        </p>
                                    </div>
                                    <Card padding="sm">
                                        <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider mb-1">Avg Salary / Emp</p>
                                        <p className="text-xl font-semibold text-white">{result.avgSalary}</p>
                                    </Card>
                                    <Card padding="sm">
                                        <p className="text-xs text-[#8899AA] font-medium uppercase tracking-wider mb-1">Est. Annual Cost</p>
                                        <p className="text-xl font-semibold text-white">{result.annualCost}</p>
                                        <p className={`text-xs mt-1 ${result.annualExtraColor}`}>{result.annualExtra}</p>
                                    </Card>
                                </div>
                                <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A]">
                                    {result.isRecommended ? (
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            icon={<CheckCircle2 size={14} aria-hidden="true" />}
                                        >
                                            Apply as Next Base
                                        </Button>
                                    ) : (
                                        <Button variant="secondary" className="w-full">
                                            View Impact Detail
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Page>
    );
}
