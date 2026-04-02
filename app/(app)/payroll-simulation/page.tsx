"use client";

import React, { useState } from "react";
import { CopyPlus, Play, TestTube, AlertOctagon, TrendingUp, CheckCircle2 } from "lucide-react";

export default function PayrollSimulationPage() {
    const [scenarios, setScenarios] = useState([
        { id: 1, name: "Scenario 1: 10% Hike", isBase: true },
        { id: 2, name: "Scenario 2: 12% Hike", isBase: false },
        { id: 3, name: "Scenario 3: 15% Hike + Variable", isBase: false }
    ]);

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1600px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#0066FF]/10 rounded-lg">
                                <TestTube className="w-5 h-5 text-[#0066FF]" />
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Payroll Simulation</h2>
                        </div>
                        <p className="text-gray-400 text-sm mt-1 ml-12">Sandbox mode — changes here do NOT affect actual payroll</p>
                    </div>
                    <div>
                        <span className="inline-flex items-center gap-2 bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] px-3 py-1.5 rounded-lg text-sm font-medium">
                            <AlertOctagon className="w-4 h-4" /> SIMULATION MODE — No actual payroll will be run
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Left Panel - Scenario Builder (1/4 columns) */}
                    <div className="xl:col-span-1 border-r border-[#1A2A3A] pr-6 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white border-b border-[#1A2A3A] pb-3">Scenario Builder</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Base Month</label>
                                <select className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                    <option>March 2025 (Current)</option>
                                    <option>February 2025</option>
                                </select>
                            </div>

                            <div className="space-y-3 pt-4">
                                {scenarios.map((scenario) => (
                                    <div key={scenario.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-lg p-3 group cursor-pointer hover:border-[#00E5A0]/50 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-sm text-white">{scenario.name}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scenario.isBase ? 'bg-gray-800 text-gray-300' : 'bg-[#00E5A0]/10 text-[#00E5A0]'}`}>
                                                {scenario.isBase ? 'BASE' : 'V' + scenario.id}
                                            </span>
                                        </div>
                                        {scenario.id === 1 && <p className="text-xs text-gray-400">10% flat hike for all eligible employees.</p>}
                                        {scenario.id === 2 && <p className="text-xs text-gray-400">12% flat hike for all eligible employees.</p>}
                                        {scenario.id === 3 && <p className="text-xs text-gray-400">15% hike + ₹50,000 variable component addition.</p>}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full flex justify-center items-center gap-2 border border-dashed border-[#1A2A3A] hover:border-[#00E5A0] hover:text-[#00E5A0] text-gray-400 py-3 rounded-lg transition-colors text-sm font-medium mt-2">
                                <CopyPlus className="w-4 h-4" /> Add Scenario
                            </button>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A]">
                            <button className="w-full flex justify-center items-center gap-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black py-3 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[#00E5A0]/20">
                                <Play className="w-4 h-4 fill-black" /> Run Simulation
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Comparison Output (3/4 columns) */}
                    <div className="xl:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

                            {/* Scenario 1 Column */}
                            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden">
                                <div className="bg-[#060B14] p-4 text-center border-b border-[#1A2A3A]">
                                    <h3 className="font-bold text-white text-lg">Scenario 1: 10% Hike</h3>
                                </div>
                                <div className="p-5 space-y-5 flex-1 select-text">
                                    <div className="p-4 bg-[rgba(0,229,160,0.05)] rounded-lg border border-[rgba(0,229,160,0.1)]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total Payroll</p>
                                        <p className="text-2xl font-bold text-white">₹1,12,12,680</p>
                                        <p className="text-sm font-medium text-[#00E5A0] mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +₹9,95,880 vs Current</p>
                                    </div>
                                    <div className="p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Avg Salary / Emp</p>
                                        <p className="text-xl font-semibold text-white">₹32,312</p>
                                    </div>
                                    <div className="p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Est. Annual Cost</p>
                                        <p className="text-xl font-semibold text-white">₹13.45 Cr</p>
                                        <p className="text-xs text-gray-500 mt-1">Additional: +₹1.19 Cr/year</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A]">
                                    <button className="w-full py-2.5 text-sm font-medium border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-lg transition-colors text-white">
                                        View Impact Detail
                                    </button>
                                </div>
                            </div>

                            {/* Scenario 2 Column */}
                            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden">
                                <div className="bg-[#0A1420] p-4 text-center border-b border-[#1A2A3A]">
                                    <h3 className="font-bold text-white text-lg">Scenario 2: 12% Hike</h3>
                                </div>
                                <div className="p-5 space-y-5 flex-1">
                                    <div className="p-4 bg-[rgba(255,184,0,0.05)] rounded-lg border border-[rgba(255,184,0,0.1)]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total Payroll</p>
                                        <p className="text-2xl font-bold text-white">₹1,14,42,208</p>
                                        <p className="text-sm font-medium text-[#FFB800] mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +₹12,25,408 vs Current</p>
                                    </div>
                                    <div className="p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Avg Salary / Emp</p>
                                        <p className="text-xl font-semibold text-white">₹32,975</p>
                                    </div>
                                    <div className="p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Est. Annual Cost</p>
                                        <p className="text-xl font-semibold text-white">₹13.73 Cr</p>
                                        <p className="text-xs text-gray-500 mt-1">Additional: +₹1.47 Cr/year</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A]">
                                    <button className="w-full flex justify-center items-center gap-2 py-2.5 text-sm font-medium border border-[#00E5A0] bg-[#00E5A0]/10 hover:bg-[#00E5A0]/20 rounded-lg transition-colors text-[#00E5A0]">
                                        <CheckCircle2 className="w-4 h-4" /> Apply as Next Base
                                    </button>
                                </div>
                            </div>

                            {/* Scenario 3 Column */}
                            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden">
                                <div className="bg-[#060B14] p-4 text-center border-b border-[#1A2A3A]">
                                    <h3 className="font-bold text-white text-lg">Scenario 3: 15% Hike</h3>
                                </div>
                                <div className="p-5 space-y-5 flex-1">
                                    <div className="p-4 bg-[rgba(255,68,68,0.05)] rounded-lg border border-[rgba(255,68,68,0.1)]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total Payroll</p>
                                        <p className="text-2xl font-bold text-white">₹1,32,74,400</p>
                                        <p className="text-sm font-medium text-[#FF4444] mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +₹30,57,600 vs Current</p>
                                    </div>
                                    <div className="p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Avg Salary / Emp</p>
                                        <p className="text-xl font-semibold text-white">₹38,255</p>
                                    </div>
                                    <div className="p-4 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Est. Annual Cost</p>
                                        <p className="text-xl font-semibold text-white">₹15.92 Cr</p>
                                        <p className="text-xs text-[#FF4444]/80 mt-1 font-medium">Additional: +₹3.66 Cr/year (High)</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#060B14] border-t border-[#1A2A3A]">
                                    <button className="w-full py-2.5 text-sm font-medium border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-lg transition-colors text-white">
                                        View Impact Detail
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
