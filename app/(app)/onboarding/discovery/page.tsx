"use client";
import React, { useState } from "react";
import { Sparkles, Calendar, DollarSign, Target, Award, Users, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ──────────────────────────────────────────────────────────────

const FEATURES = [
    { id: "performance", icon: Target, title: "Performance & OKRs", desc: "Align teams with continuous feedback, goal tracking, and 360° reviews.", color: "text-sky-400", bg: "bg-sky-500/10" },
    { id: "payroll", icon: DollarSign, title: "Automated Payroll", desc: "Execute 1-click payroll with built-in compliance for PF, ESI, and PT.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: "leave", icon: Calendar, title: "Time & Attendance", desc: "Geofenced clock-ins, complex shift scheduling, and smart leave policies.", color: "text-amber-400", bg: "bg-amber-500/10" },
    { id: "rewards", icon: Award, title: "Rewards & Recognition", desc: "Boost morale with peer-to-peer recognition, leaderboards, and instant badges.", color: "text-purple-400", bg: "bg-purple-500/10" },
    { id: "recruitment", icon: Users, title: "Applicant Tracking", desc: "Manage your entire hiring pipeline from job posting to offer rollout.", color: "text-rose-400", bg: "bg-rose-500/10" },
] as const;

type FeatureId = typeof FEATURES[number]["id"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeatureDiscoveryScreen() {
    const [selectedFeature, setSelectedFeature] = useState<FeatureId>("performance");

    const selected = FEATURES.find(f => f.id === selectedFeature);

    return (
        <Page
            title="Discover the Power of Kaarya"
            subtitle="You've finished the core setup. Explore the premium modules designed to scale your performance and culture."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Discovery", href: "/onboarding/discovery" },
            ]}
            maxWidth="1200px"
        >
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-indigo-500/20 shadow-xl">
                    <Sparkles className="text-indigo-400" size={28} aria-hidden="true" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Feature List */}
                <div className="col-span-1 space-y-3">
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <button
                                key={feature.id}
                                type="button"
                                onClick={() => setSelectedFeature(feature.id)}
                                aria-pressed={selectedFeature === feature.id}
                                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                                    selectedFeature === feature.id
                                        ? "bg-[#131B2B] border-[#3A4A5A] shadow-lg translate-x-2"
                                        : "bg-[#0A1420] border-[#1A2A3A] hover:bg-[#060D1A] hover:border-[#2A3A4A]"
                                }`}
                            >
                                <div className={`mt-1 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${feature.bg} ${feature.color}`}>
                                    <Icon size={24} aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className={`font-bold mb-1 ${selectedFeature === feature.id ? "text-white" : "text-[#CCDDEE]"}`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`text-xs ${selectedFeature === feature.id ? "text-[#8899AA]" : "text-[#556677]"}`}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Feature Preview Area */}
                <div className="col-span-1 lg:col-span-2">
                    <Card className="h-[500px] flex flex-col overflow-hidden relative group" padding="none">

                        {/* Dynamic Backgrounds */}
                        {selectedFeature === "performance" && <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 to-transparent opacity-50" />}
                        {selectedFeature === "payroll" && <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-50" />}
                        {selectedFeature === "leave" && <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent opacity-50" />}
                        {selectedFeature === "rewards" && <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-50" />}
                        {selectedFeature === "recruitment" && <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent opacity-50" />}

                        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center relative z-10" key={selectedFeature}>
                            <div className="w-full max-w-md h-64 bg-[#060D1A] border border-[#2A3A4A] rounded-xl shadow-2xl mb-8 flex items-center justify-center overflow-hidden relative">
                                <div className="absolute top-0 inset-x-0 h-8 bg-[#131B2B] border-b border-[#2A3A4A] flex items-center px-3 gap-1.5" aria-hidden="true">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                </div>
                                <span className="text-[#556677] font-mono text-sm tracking-widest mt-4">Interactive Preview Area</span>
                            </div>

                            <h2 className="text-2xl font-black text-white mb-3">{selected?.title}</h2>
                            <Button icon={<ChevronRight size={16} aria-hidden="true" />}>
                                Enable Module
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
