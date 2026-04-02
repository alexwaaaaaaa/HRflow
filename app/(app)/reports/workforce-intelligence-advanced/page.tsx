"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    BrainCog, ChevronRight, Zap, Target, Search, BarChart2
} from "lucide-react";

export default function WorkforceIntelligenceAdvancedScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/reports/dashboard" className="hover:text-white transition-colors">Reports</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/reports/workforce-intelligence" className="hover:text-white transition-colors">Workforce Intelligence</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Predictive Modeler</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
                            <BrainCog className="w-6 h-6 text-pink-500" />
                        </div>
                        AI Predictive Modeler
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Deep learning models forecasting workforce capacity, skills decay, and optimal team composition.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <Zap className="w-4 h-4" /> Run Simulation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Configuration Panel */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 lg:col-span-1 border-t-4 border-t-pink-500">
                    <h2 className="text-lg font-bold text-white mb-6">Model Parameters</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Forecasting Horizon</label>
                            <input type="range" className="w-full accent-pink-500" min="1" max="24" defaultValue="12" />
                            <div className="flex justify-between text-xs text-[#8899AA] mt-1">
                                <span>1 Month</span>
                                <span className="text-white font-bold">12 Months</span>
                                <span>24 Months</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Target Variable</label>
                            <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500 transition-colors">
                                <option>Headcount Demand (Capacity)</option>
                                <option>Skill Obsolescence Risk</option>
                                <option>Promotion Velocity</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#8899AA] mb-2">Input Features (Weights)</label>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white">Historical Attrition</span>
                                    <span className="text-pink-400">High Impact</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white">Revenue Projections</span>
                                    <span className="text-pink-400">High Impact</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white">Macro-economic Index</span>
                                    <span className="text-amber-500">Med Impact</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white">Competitor Hiring Vol.</span>
                                    <span className="text-[#8899AA]">Low Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simulation Output */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-0 lg:col-span-2 flex flex-col overflow-hidden relative">
                    {/* Overlay representing processing state (simulated) */}
                    <div className="absolute inset-0 bg-[#0B1221]/80 backdrop-blur-sm z-10 hidden flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#1A2A3A] border-t-pink-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-pink-400 font-bold animate-pulse">Running Monte Carlo Simulation...</p>
                    </div>

                    <div className="p-6 border-b border-[#1A2A3A]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-pink-500" /> Forecast: Headcount Demand (12 Mo)
                        </h2>
                    </div>

                    <div className="flex-1 p-6 relative">
                        {/* Abstract visual representation of a complex chart */}
                        <div className="absolute inset-x-6 top-6 bottom-6 border-b border-l border-[#2A3A4A]"></div>

                        {/* Simulation Bounds */}
                        <div className="absolute inset-x-6 top-1/4 bottom-1/4 bg-pink-500/5 border-y border-pink-500/20 rounded-r-lg"></div>

                        {/* Trend line */}
                        <svg className="absolute inset-x-6 top-6 bottom-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)]" preserveAspectRatio="none">
                            <path d="M 0,200 Q 100,180 200,150 T 400,100 T 600,40" fill="none" stroke="#ec4899" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                            <path d="M 0,200 Q 100,190 200,170 T 400,120 T 600,70" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" vectorEffect="non-scaling-stroke" />
                        </svg>

                        <div className="absolute right-10 top-10 text-xs font-mono space-y-1">
                            <div className="flex items-center gap-2 text-pink-400"><div className="w-3 h-1 bg-pink-500"></div> Target Forecast</div>
                            <div className="flex items-center gap-2 text-indigo-400"><div className="w-3 h-1 border-t-2 border-indigo-400 border-dashed"></div> Baseline (No Action)</div>
                            <div className="flex items-center gap-2 text-[#8899AA]"><div className="w-3 h-3 bg-pink-500/10 border border-pink-500/30"></div> 95% Confidence Int.</div>
                        </div>
                    </div>

                    <div className="p-6 bg-[#1A2A3A]/20 border-t border-[#1A2A3A]">
                        <h3 className="text-sm font-bold text-white mb-2">Model Conclusion</h3>
                        <p className="text-sm text-[#8899AA] leading-relaxed">The model predicts an impending capacity shortfall in <span className="text-pink-400 font-bold">Engineering (Frontend & Devops)</span> around Month 7. Accelerated hiring must begin by Month 4 to account for the current 45-day time-to-fill and 30-day onboarding ramp. Failure to execute will likely bottleneck Q3 product launches.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
