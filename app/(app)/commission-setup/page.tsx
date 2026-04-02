"use client";

import React, { useState } from "react";
import { Plus, Trash2, LineChart, ShieldCheck } from "lucide-react";

export default function CommissionSetupPage() {
    const [type, setType] = useState("Tiered");

    const [tiers, setTiers] = useState([
        { id: 1, min: '0', max: '50', comm: '2' },
        { id: 2, min: '51', max: '100', comm: '5' },
        { id: 3, min: '101', max: '+', comm: '8' },
    ]);

    return (
        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1200px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center gap-2">
                            <LineChart className="w-6 h-6 text-[#00E5A0]" /> Commission Structure Setup
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Define revenue-based commission plans for Sales and Business Development teams.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black font-bold rounded-lg text-sm transition-colors shadow-lg shadow-[#00E5A0]/20">
                            Publish Commission Plan
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Plan Basics */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Commission Plan Name</label>
                                    <input type="text" defaultValue="Enterprise Sales Achiever - FY24" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0] font-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Target Group</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                        <option>Enterprise Sales (AEs)</option>
                                        <option>SDR / BDR Team</option>
                                        <option>Account Management</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Payment Trigger</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                        <option>On Payment Realized</option>
                                        <option>On Invoice Raised</option>
                                        <option>On Contract Signed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Structure Type & Tiers */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#060B14]">
                                <h3 className="text-lg font-semibold text-white mb-4">Structure Configuration</h3>

                                <div className="flex gap-4 p-1 bg-[#1A2A3A] rounded-lg w-fit">
                                    <button
                                        onClick={() => setType("Flat")}
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${type === 'Flat' ? 'bg-[#060B14] text-white shadow' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Flat Rate
                                    </button>
                                    <button
                                        onClick={() => setType("Tiered")}
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${type === 'Tiered' ? 'bg-[#060B14] text-[#00E5A0] shadow' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Tiered Target
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 bg-[#060B14]">
                                {type === 'Flat' && (
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-[#1A2A3A] rounded-xl flex items-center justify-between w-64 border border-[#334155]">
                                            <span className="text-gray-400 font-medium">Flat Commission</span>
                                            <div className="flex items-center gap-1">
                                                <input type="text" defaultValue="5.0" className="w-16 bg-[#060B14] border border-[#334155] rounded text-white text-center py-1 font-bold outline-none focus:border-[#00E5A0]" />
                                                <span className="text-gray-500 font-bold">%</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 flex-1">A single flat percentage applied to all closed revenue, regardless of target achievement.</p>
                                    </div>
                                )}

                                {type === 'Tiered' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
                                            <div className="col-span-5">Target Achieved (%)</div>
                                            <div className="col-span-5">Commission Rate</div>
                                            <div className="col-span-2 text-center">Action</div>
                                        </div>

                                        {tiers.map((t, index) => (
                                            <div key={t.id} className="grid grid-cols-12 gap-4 items-center bg-[#0A1420] p-3 rounded-lg border border-[#1A2A3A] hover:border-gray-600 transition-colors">
                                                <div className="col-span-5 flex items-center gap-2">
                                                    <div className="relative flex-1">
                                                        <input type="text" value={t.min} readOnly className="w-full bg-[#060B14] border border-[#1A2A3A] rounded px-3 py-2 text-white outline-none font-mono text-sm" />
                                                        <span className="absolute right-3 top-2 text-gray-500 text-sm">%</span>
                                                    </div>
                                                    <span className="text-gray-600 font-medium">to</span>
                                                    <div className="relative flex-1">
                                                        <input type="text" defaultValue={t.max} className="w-full bg-[#060B14] border-b-2 border-transparent focus:border-[#00E5A0] rounded bg-[#1A2A3A]/50 px-3 py-2 text-white outline-none font-mono text-sm" />
                                                        <span className="absolute right-3 top-2 text-gray-500 text-sm">{t.max === '+' ? '' : '%'}</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-5">
                                                    <div className="relative w-3/4">
                                                        <input type="text" defaultValue={t.comm} className="w-full bg-[#1A2A3A]/40 border border-[#00E5A0]/20 focus:border-[#00E5A0] rounded px-3 py-2 text-[#00E5A0] font-bold outline-none text-sm transition-colors" />
                                                        <span className="absolute right-3 top-2.5 text-[#00E5A0]/60 text-sm font-bold">%</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 flex justify-center">
                                                    <button className="p-2 text-gray-500 hover:text-[#FF4444] hover:bg-[#FF4444]/10 rounded transition-colors" disabled={index === 0}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <button className="flex items-center gap-2 text-[#00E5A0] text-sm font-medium hover:underline mt-2 px-2">
                                            <Plus className="w-4 h-4" /> Add Tier
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        {/* Info Tip */}
                        <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl p-5 sticky top-6">
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck className="w-5 h-5 text-[#00E5A0]" />
                                <h4 className="font-semibold text-white">Validation Active</h4>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                The current tiered structure ensures continuous coverage from 0% to infinity (+). There are no gaps in the achievement brackets.
                            </p>
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4">
                                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-widest border-b border-[#1A2A3A] pb-2 mb-3">Example Preview</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Target</span>
                                        <span className="font-mono text-white">₹10,00,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Achieved (110%)</span>
                                        <span className="font-mono text-[#00E5A0]">₹11,00,000</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-[#1A2A3A] mt-2">
                                        <span className="font-medium text-white">Est. Payout</span>
                                        <span className="font-bold text-[#00E5A0] flex items-center gap-1">
                                            ₹88,000 <span className="text-[10px] text-gray-500 font-normal">(@ 8% highest bracket)</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
