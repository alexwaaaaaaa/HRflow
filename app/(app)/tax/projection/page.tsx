"use client";

import React, { useState } from 'react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import {
    TrendingUp, ArrowRight, Download, Calculator,
    AlertCircle, FileText, Settings2, BarChart3, RotateCcw
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, ReferenceLine } from 'recharts';

export default function TDSProjectionScreen() {
    const [incrementPct, setIncrementPct] = useState(10);
    const [bonusAmt, setBonusAmt] = useState(0);
    const [newInvAmt, setNewInvAmt] = useState(150000);

    const [regime, setRegime] = useState<'old' | 'new'>('new');

    const currentCtc = 1500000;
    const currentTax = 145600;

    // Simulation Math (Mock simplified calc)
    const newCtc = currentCtc * (1 + (incrementPct / 100)) + bonusAmt;

    // Simple old regime mock calc
    const oldTaxable = Math.max(0, newCtc - 50000 - newInvAmt - 200000); // Std ded, Sec 80C, HRA
    let oldTax = 0;
    if (oldTaxable > 1000000) oldTax = 112500 + (oldTaxable - 1000000) * 0.3;
    else if (oldTaxable > 500000) oldTax = 12500 + (oldTaxable - 500000) * 0.2;
    oldTax = oldTax * 1.04;

    // Simple new regime mock calc (default to less deductions)
    const newTaxable = Math.max(0, newCtc - 50000); // Only std ded
    let newTax = 0;
    if (newTaxable > 1500000) newTax = 150000 + (newTaxable - 1500000) * 0.3;
    else if (newTaxable > 1200000) newTax = 90000 + (newTaxable - 1200000) * 0.2;
    else if (newTaxable > 900000) newTax = 45000 + (newTaxable - 900000) * 0.15;
    else if (newTaxable > 600000) newTax = 15000 + (newTaxable - 600000) * 0.1;
    newTax = newTaxable <= 700000 ? 0 : newTax * 1.04;

    const projectedTax = regime === 'old' ? oldTax : newTax;
    const taxDiff = projectedTax - currentTax;

    const chartData = [
        { month: 'Apr', current: 12133, projected: projectedTax / 12 },
        { month: 'May', current: 12133, projected: projectedTax / 12 },
        { month: 'Jun', current: 12133, projected: projectedTax / 12 },
        { month: 'Jul', current: 12133, projected: projectedTax / 12 },
        { month: 'Aug', current: 12133, projected: projectedTax / 12 },
        { month: 'Sep', current: 12133, projected: projectedTax / 12 },
        { month: 'Oct', current: 12133, projected: projectedTax / 12 },
        { month: 'Nov', current: 12133, projected: projectedTax / 12 },
        { month: 'Dec', current: 12133, projected: projectedTax / 12 },
        { month: 'Jan', current: 12133, projected: projectedTax / 12 },
        { month: 'Feb', current: 12133, projected: projectedTax / 12 },
        { month: 'Mar', current: 12133, projected: projectedTax / 12 },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 text-slate-200 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-2">TDS Projection — FY 2025-26</h1>
                        <p className="text-sm text-[#8899AA] mb-4">Simulate your future tax liability based on expected salary increments and investments.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2" />
                            Export PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 items-start">

                    {/* Controls/Parameters Panel */}
                    <div className="col-span-4 bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg sticky top-6">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white flex items-center">
                                <Settings2 size={16} className="mr-2 text-[#00E5A0]" />
                                Projection Variables
                            </h3>
                            <button
                                onClick={() => { setIncrementPct(10); setBonusAmt(0); setNewInvAmt(150000); }}
                                className="text-xs text-[#8899AA] hover:text-white flex items-center"
                            >
                                <RotateCcw size={12} className="mr-1" /> Reset
                            </button>
                        </div>

                        <div className="p-5 space-y-6">

                            {/* Base Reference */}
                            <div className="bg-[#060B14] p-3 rounded-lg border border-[#1A2A3A] flex justify-between items-center mb-6">
                                <div>
                                    <div className="text-[10px] text-[#8899AA] uppercase tracking-wider font-bold">Current CTC</div>
                                    <div className="text-sm font-bold text-white">₹15,00,000</div>
                                </div>
                                <ArrowRight size={16} className="text-[#2A3A4A]" />
                                <div className="text-right">
                                    <div className="text-[10px] text-[#8899AA] uppercase tracking-wider font-bold">Current Tax</div>
                                    <div className="text-sm font-bold text-[#FF4444]">₹1,45,600</div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-slate-300">Expected Increment</label>
                                    <span className="text-sm font-bold text-[#00E5A0]">{incrementPct}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="50" step="1"
                                    value={incrementPct} onChange={e => setIncrementPct(Number(e.target.value))}
                                    className="w-full accent-[#00E5A0]"
                                />
                                <div className="flex justify-between text-[10px] text-[#556677] mt-1">
                                    <span>0%</span><span>25%</span><span>50%</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-300 block mb-2">Expected Bonus / Variable</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                    <input
                                        type="number"
                                        value={bonusAmt} onChange={e => setBonusAmt(Number(e.target.value))}
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-300 block mb-2">Planned Chapter VI-A Investments</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-[#8899AA] font-bold">₹</span>
                                    <input
                                        type="number"
                                        value={newInvAmt} onChange={e => setNewInvAmt(Number(e.target.value))}
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-lg py-2.5 pl-8 pr-4 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                                <p className="text-[10px] text-[#8899AA] mt-1">Max 80C: ₹1.5L, 80D: ₹50K</p>
                            </div>

                            {/* Regime Toggle */}
                            <div className="pt-4 border-t border-[#1A2A3A]">
                                <label className="text-sm font-semibold text-slate-300 block mb-3">Target Tax Regime</label>
                                <div className="flex p-1 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                    <button
                                        onClick={() => setRegime('old')}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${regime === 'old' ? 'bg-[#1A2A3A] text-white shadow' : 'text-[#8899AA] hover:text-white'}`}
                                    >
                                        Old Regime
                                    </button>
                                    <button
                                        onClick={() => setRegime('new')}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${regime === 'new' ? 'bg-[#1A2A3A] text-white shadow' : 'text-[#8899AA] hover:text-white'}`}
                                    >
                                        New Regime (Default)
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="col-span-8 space-y-6">

                        {/* Summary Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl shadow-md space-y-1">
                                <div className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-2">Projected CTC</div>
                                <div className="text-2xl font-black text-white flex items-center">
                                    ₹{(newCtc / 100000).toFixed(2)}L
                                    {incrementPct > 0 && <TrendingUp size={16} className="text-[#00E5A0] ml-2" />}
                                </div>
                                <div className="text-xs text-[#00E5A0] font-medium">+₹{(newCtc - currentCtc).toLocaleString()} increase</div>
                            </div>

                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl shadow-md space-y-1 relative overflow-hidden group">
                                <div className={`absolute right-0 top-0 w-24 h-24 ${taxDiff > 0 ? 'bg-[#FF4444]/10' : 'bg-[#00E5A0]/10'} rounded-bl-full filter blur-xl transition-colors`}></div>
                                <div className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-2 relative z-10">Projected Tax Liability</div>
                                <div className={`text-2xl font-black relative z-10 flex items-center ${taxDiff > 0 ? 'text-[#FF4444]' : 'text-[#00E5A0]'}`}>
                                    ₹{projectedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className={`text-xs font-medium relative z-10 ${taxDiff > 0 ? 'text-[#FF4444]' : 'text-[#00E5A0]'}`}>
                                    {taxDiff > 0 ? '+' : ''}₹{taxDiff.toLocaleString(undefined, { maximumFractionDigits: 0 })} vs current year
                                </div>
                            </div>

                            <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-xl shadow-md space-y-1">
                                <div className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
                                    New Monthly TDS
                                    <span className="bg-[#1A2A3A] text-white text-[10px] px-2 py-0.5 rounded border border-[#2A3A4A]">{regime === 'new' ? 'NEW Reg.' : 'OLD Reg.'}</span>
                                </div>
                                <div className="text-2xl font-black text-white">
                                    ₹{(projectedTax / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className="text-xs text-[#8899AA]">
                                    Effective Take-home: ₹{((newCtc - projectedTax) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })} /mo
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 shadow-md">
                            <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                                <BarChart3 size={16} className="mr-2 text-[#0066FF]" />
                                Monthly Tax Outflow Projection
                            </h3>
                            <p className="text-xs text-[#8899AA] mb-6">Comparison of your current year TDS vs projected next year TDS.</p>

                            <div className="h-[280px] w-full">
                                <ChartWrapper height="h-[300px]">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#1A2A3A" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#1A2A3A" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0066FF" stopOpacity={0.5} />
                                                <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8899AA', fontSize: 11 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8899AA', fontSize: 11 }} />
                                        <RechartsTooltip
                                            cursor={{ stroke: '#2A3A4A', strokeWidth: 1, strokeDasharray: '4 4' }}
                                            contentStyle={{ backgroundColor: '#060B14', borderColor: '#2A3A4A', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                            labelStyle={{ color: '#8899AA', fontSize: '10px' }}
                                        />
                                        <Area type="monotone" dataKey="current" name="Current FY" stroke="#556677" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorCurrent)" />
                                        <Area type="monotone" dataKey="projected" name="Projected FY" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorProjected)" />
                                    </AreaChart>
                                </ChartWrapper>
                            </div>
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-md">
                            <div className="px-5 py-3 border-b border-[#1A2A3A] bg-[#0A1420]">
                                <h3 className="text-sm font-bold text-white">Projected Computation Breakdown</h3>
                            </div>
                            <div className="p-0">
                                <div className="flex justify-between items-center px-5 py-3 border-b border-[#1A2A3A] bg-[#060B14]/50">
                                    <span className="text-sm font-semibold text-slate-300">Projected Gross Salary</span>
                                    <span className="text-sm font-bold text-white">₹{newCtc.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3 border-b border-[#1A2A3A] hover:bg-[#1A2A3A]/20 transition-colors">
                                    <span className="text-sm text-slate-400">Standard Deduction</span>
                                    <span className="text-sm font-medium text-[#00E5A0]">-₹50,000</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3 border-b border-[#1A2A3A] hover:bg-[#1A2A3A]/20 transition-colors">
                                    <span className="text-sm text-slate-400">Other Exemptions (HRA/LTA)</span>
                                    <span className="text-sm font-medium text-[#00E5A0]">{regime === 'old' ? '-₹2,00,000' : '₹0'}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3 border-b border-[#1A2A3A] hover:bg-[#1A2A3A]/20 transition-colors">
                                    <span className="text-sm text-slate-400">Chapter VI-A Investments</span>
                                    <span className="text-sm font-medium text-[#00E5A0]">{regime === 'old' ? `-₹${newInvAmt.toLocaleString()}` : '₹0'}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3 border-b border-[#1A2A3A] bg-[#060B14]/50">
                                    <span className="text-sm font-semibold text-slate-300">Net Taxable Income</span>
                                    <span className="text-sm font-bold text-white">₹{(regime === 'old' ? oldTaxable : newTaxable).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 bg-[#0A1420]">
                                    <span className="text-sm font-bold text-[#FFB800] uppercase tracking-wider">Final Tax Liability</span>
                                    <span className="text-lg font-black text-[#FFB800]">₹{projectedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
