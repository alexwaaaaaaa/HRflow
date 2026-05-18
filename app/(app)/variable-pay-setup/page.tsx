"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { SlidersHorizontal, Target, Award, Crosshair, Check } from "lucide-react";

export default function VariablePaySetupPage() {
    const [targetGroup, setTargetGroup] = useState("Engineering");
    const [compPerf, setCompPerf] = useState(40);
    const indPerf = 100 - compPerf;

    const multipliers = [
        { rating: 5, label: 'Outstanding', multi: '150%' },
        { rating: 4, label: 'Exceeds Expec.', multi: '110%' },
        { rating: 3, label: 'Meets Expec.', multi: '100%' },
        { rating: 2, label: 'Needs Imprv.', multi: '50%' },
        { rating: 1, label: 'Unacceptable', multi: '0%' },
    ];

    return (
        <Page
            title="Variable Pay Setup"
            subtitle="Configure performance-linked incentive plans based on company & individual metrics."
            breadcrumbs={[{ label: "Variable Pay Setup" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-3">
                            <Award className="w-6 h-6 text-[#00E5A0]" /> Variable Pay Setup
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Configure performance-linked incentive plans based on company & individual metrics.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black font-bold rounded-lg text-sm transition-colors shadow-lg shadow-[#00E5A0]/20">
                            Save Variable Plan
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Main Config (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Plan Details Card */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white border-b border-[#1A2A3A] pb-3 mb-5">Plan Basic Details</h3>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Plan Name</label>
                                    <input type="text" defaultValue="FY24 Q4 Engineering Bonus" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0] font-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Payout Cycle</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                        <option>Quarterly</option>
                                        <option>Annually</option>
                                        <option>Half-Yearly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Target Group</label>
                                    <select
                                        className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]"
                                        value={targetGroup}
                                        onChange={(e) => setTargetGroup(e.target.value)}
                                    >
                                        <option>Engineering</option>
                                        <option>Sales</option>
                                        <option>All Employees</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Weightage Card */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-3 mb-5">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2"><SlidersHorizontal className="w-5 h-5 text-[#FFB800]" /> Component Split</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#0066FF]"></div>
                                        <span className="text-gray-300">Company Performance Score</span>
                                    </div>
                                    <span className="font-bold text-white text-lg">{compPerf}%</span>
                                </div>

                                <input
                                    type="range"
                                    min="0" max="100" step="5"
                                    value={compPerf}
                                    onChange={(e) => setCompPerf(parseInt(e.target.value))}
                                    className="w-full h-2 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                                />

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#00E5A0]"></div>
                                        <span className="text-gray-300">Individual Performance Rating</span>
                                    </div>
                                    <span className="font-bold text-white text-lg">{indPerf}%</span>
                                </div>

                                {/* Visual Bar */}
                                <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner mt-4">
                                    <div className="h-full bg-[#0066FF] transition-all duration-300" style={{ width: `${compPerf}%` }}></div>
                                    <div className="h-full bg-[#00E5A0] transition-all duration-300" style={{ width: `${indPerf}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Rating Multiplier Table */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#060B14]">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Target className="w-5 h-5 text-gray-400" /> Individual Rating Multipliers</h3>
                                <p className="text-xs text-gray-400 mt-1">Scale the individual component payout based on final PMS rating.</p>
                            </div>
                            <div className="p-5">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex justify-between text-xs text-gray-500 font-medium px-4 pb-2 border-b border-[#1A2A3A]">
                                        <span>PERFORMANCE RATING</span>
                                        <span>MULTIPLIER</span>
                                    </div>
                                    {multipliers.map((m) => (
                                        <div key={m.rating} className="flex justify-between items-center bg-[#060B14] border border-[#1A2A3A] rounded-lg p-3 hover:border-gray-600 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center text-xs font-bold">{m.rating}</span>
                                                <span className="text-sm font-medium text-gray-300">{m.label}</span>
                                            </div>
                                            <div className="relative w-24">
                                                <input type="text" defaultValue={m.multi} className="w-full bg-[#0A1420] border border-[#1A2A3A] text-white text-right rounded p-1.5 focus:border-[#00E5A0] outline-none text-sm font-bold" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Panel - Simulation & Info (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Example Simulation Tooltip/Box */}
                        <div className="bg-gradient-to-br from-[#0A1420] to-[#121B29] border border-[#1A2A3A] rounded-xl p-5 sticky top-6 shadow-xl">
                            <div className="flex items-center gap-2 border-b border-[#1A2A3A] pb-3 mb-4">
                                <Crosshair className="w-5 h-5 text-[#00E5A0]" />
                                <h4 className="font-semibold text-white">Example Calculation</h4>
                            </div>

                            <div className="space-y-4 text-sm">
                                <p className="text-gray-400">Assume an employee with target variable pay of <span className="font-bold text-white">₹1,00,000</span>.</p>

                                <div className="bg-[#060B14] p-3 rounded-lg border border-[#1A2A3A]">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Company Component ({compPerf}%)</p>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-300">Base</span>
                                        <span className="font-mono">₹{1000 * compPerf}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#0066FF] text-xs">+ Company scores 90%</span>
                                        <span className="font-mono text-[#0066FF]">₹{900 * compPerf}</span>
                                    </div>
                                </div>

                                <div className="bg-[#060B14] p-3 rounded-lg border border-[#1A2A3A]">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Individual Component ({indPerf}%)</p>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-300">Base</span>
                                        <span className="font-mono">₹{1000 * indPerf}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#00E5A0] text-xs">+ Emp gets &apos;Outstanding&apos; (1.5x)</span>
                                        <span className="font-mono text-[#00E5A0]">₹{1500 * indPerf}</span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-[#1A2A3A] flex justify-between items-center">
                                    <span className="font-semibold text-white uppercase text-xs">Final Payout</span>
                                    <span className="font-black text-lg text-[#00E5A0]">₹{(900 * compPerf) + (1500 * indPerf)}</span>
                                </div>
                            </div>

                            <div className="mt-5 bg-[#FFB800]/10 border border-[#FFB800]/20 p-3 rounded text-xs text-[#FFB800] flex items-start gap-2">
                                <span className="bg-[#FFB800]/20 rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-2.5 h-2.5" /></span>
                                Plan targets {targetGroup} department (Active Employees: 42)
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
