"use client";

import React, { useState } from 'react';
import {
    AlertCircle, Settings, Save, Info
} from 'lucide-react';

export default function SandwichLeaveRulesScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-[#1A2A3A] pb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Sandwich Leave Rules</h1>
                        <p className="text-sm text-[#8899AA]">Configure how leaves bounding weekends or public holidays are calculated.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        <Save size={16} className="mr-2" /> Save Rules
                    </button>
                </div>

                {/* Info Block */}
                <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 p-4 rounded-xl flex items-start text-sm text-[#8899AA] mb-6">
                    <Info size={20} className="mr-3 text-[#0066FF] flex-shrink-0" />
                    <p>
                        A <strong>Sandwich Leave</strong> occurs when an employee takes leave on days immediately preceding and succeeding a holiday or week-off (e.g., Friday and Monday). Based on these conditions, the intervening holidays may also be counted as leaves.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Scenario 1 */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4 border-b border-[#1A2A3A] pb-4">
                            Scenario 1: Friday & Monday (Surrounding a Weekend)
                        </h2>
                        <div className="flex items-center justify-between">
                            <div className="w-2/3">
                                <p className="text-sm text-[#8899AA] mb-2">If an employee takes leave on Friday <strong>and</strong> Monday, should Saturday and Sunday be deducted from their leave balance?</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-14 h-7 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#FF4444]"></div>
                                <span className="ml-3 font-bold text-sm text-white w-16">Deduct</span>
                            </label>
                        </div>
                    </div>

                    {/* Scenario 2 */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4 border-b border-[#1A2A3A] pb-4">
                            Scenario 2: Single Side Adjacency
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="w-2/3">
                                    <h3 className="text-sm font-bold text-white mb-1">Leave preceding holiday (e.g., Friday only)</h3>
                                    <p className="text-xs text-[#8899AA]">Deduct the weekend if they only took Friday off.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4444]"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="w-2/3">
                                    <h3 className="text-sm font-bold text-white mb-1">Leave succeeding holiday (e.g., Monday only)</h3>
                                    <p className="text-xs text-[#8899AA]">Deduct the weekend if they only took Monday off.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-[#1A2A3A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF4444]"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Exemptions */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                        <h2 className="text-sm font-bold text-white mb-4 flex items-center">
                            <Settings size={16} className="mr-2 text-[#00E5A0]" /> Applicable Leave Types
                        </h2>
                        <p className="text-xs text-[#8899AA] mb-4">Select which leave types trigger the Sandwich rule.</p>

                        <div className="flex space-x-4 text-sm font-bold">
                            <label className="flex items-center space-x-2 bg-[#060B14] border border-[#2A3A4A] p-3 rounded-lg cursor-pointer hover:border-[#0066FF] transition-colors">
                                <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                                <span className="text-white">Casual Leave (CL)</span>
                            </label>
                            <label className="flex items-center space-x-2 bg-[#060B14] border border-[#2A3A4A] p-3 rounded-lg cursor-pointer hover:border-[#0066FF] transition-colors">
                                <input type="checkbox" defaultChecked className="accent-[#0066FF]" />
                                <span className="text-white">Privilege Leave (EL)</span>
                            </label>
                            <label className="flex items-center space-x-2 bg-[#060B14] border border-[#2A3A4A] p-3 rounded-lg cursor-pointer opacity-50">
                                <input type="checkbox" disabled className="accent-[#0066FF]" />
                                <span className="text-[#8899AA]">Sick Leave (Exempt)</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
