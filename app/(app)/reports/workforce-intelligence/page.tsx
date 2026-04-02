"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    BrainCircuit, ChevronRight, Zap, Target, AlertTriangle
} from "lucide-react";

export default function WorkforceIntelligenceScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Workforce Intelligence</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                            <BrainCircuit className="w-6 h-6 text-pink-500" />
                        </div>
                        Workforce Intelligence Core
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">AI-driven predictive models for flight risk, performance forecasting, and skills mapping.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Flight Risk Predictor */}
                <div className="bg-[#0D1928] border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.1)] rounded-2xl p-6 lg:col-span-2">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-pink-500" /> Predictive Flight Risk (Next 90 Days)
                    </h2>

                    <div className="space-y-4">
                        {[
                            { group: "High Performers (Sales)", risk: "High", prob: "75%", reason: "Compensation below market average (-12%), Manager tenure < 6mo" },
                            { group: "Senior Engineers", risk: "Medium", prob: "45%", reason: "Stagnant promotion velocity (>36mo since last promo)" },
                            { group: "Customer Support L1", risk: "High", prob: "82%", reason: "Historical burn-out pattern at 12-month tenure mark" },
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-xl flex items-start justify-between group hover:border-pink-500/30 transition-colors">
                                <div>
                                    <h3 className="text-white font-bold mb-1">{item.group}</h3>
                                    <p className="text-xs text-[#8899AA]">{item.reason}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-black ${item.risk === 'High' ? 'text-pink-500' : 'text-amber-500'}`}>{item.prob}</div>
                                    <div className="text-[10px] text-[#8899AA] uppercase tracking-wider">{item.risk} Risk</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#1A2A3A] flex justify-end">
                        <button className="text-pink-400 text-sm font-bold hover:underline">View Individual Risk Profiles &rarr;</button>
                    </div>
                </div>

                {/* Skill Gap Analysis */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-emerald-400" /> Critical Skill Gaps
                    </h2>

                    <div className="flex-1 space-y-5">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white">Cloud Architecture (AWS)</span>
                                <span className="text-amber-500 font-bold">42% Gap</span>
                            </div>
                            <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '58%' }}></div>
                            </div>
                            <p className="text-[10px] text-[#8899AA] mt-1">Required: 12 • Available: 7</p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white">Enterprise Sales (B2B)</span>
                                <span className="text-pink-500 font-bold">60% Gap</span>
                            </div>
                            <div className="w-full bg-[#1A2A3A] rounded-full h-1.5">
                                <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                            <p className="text-[10px] text-[#8899AA] mt-1">Required: 15 • Available: 6</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Impact Modeling */}
            <div className="bg-gradient-to-r from-[#0D1928] to-[#1A2A3A] border border-[#2A3A4A] rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> Scenario Modeling (What-If Analysis)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0B1221] p-5 rounded-xl border border-[#1A2A3A]">
                        <h3 className="text-sm font-bold text-[#8899AA] mb-3 uppercase tracking-wider">Scenario</h3>
                        <p className="text-white mb-4">"If we mandate 5-days Work From Office starting next quarter..."</p>
                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <p className="text-xs text-[#8899AA] mb-1">Predicted Impact</p>
                            <div className="text-pink-400 font-bold text-lg">+18% Attrition</div>
                            <p className="text-[10px] text-[#8899AA]">Mainly in Engineering (Mid-level)</p>
                        </div>
                    </div>

                    <div className="bg-[#0B1221] p-5 rounded-xl border border-[#1A2A3A]">
                        <h3 className="text-sm font-bold text-[#8899AA] mb-3 uppercase tracking-wider">Scenario</h3>
                        <p className="text-white mb-4">"If we increase the variable bonus pool by 15% for top quartile performers..."</p>
                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <p className="text-xs text-[#8899AA] mb-1">Predicted Impact</p>
                            <div className="text-emerald-400 font-bold text-lg">-8% Attrition</div>
                            <p className="text-[10px] text-[#8899AA]">High retention in Sales team</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-5 border border-dashed border-[#2A3A4A] rounded-xl hover:bg-[#1A2A3A]/20 transition-colors cursor-pointer group">
                        <div className="text-center">
                            <div className="w-10 h-10 bg-[#1A2A3A] group-hover:bg-[#2A3A4A] rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                                <span className="text-white text-xl">+</span>
                            </div>
                            <h3 className="text-sm font-bold text-white">Create New Scenario</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
