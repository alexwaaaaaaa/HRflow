"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, CheckCircle2, TrendingDown, DollarSign, Calculator, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RegimeSelector() {
    // Input Definitions
    const [grossSalary, setGrossSalary] = useState(1200000);
    const [hraExempt, setHraExempt] = useState(0);
    const [sec80c, setSec80c] = useState(0);
    const [sec80d, setSec80d] = useState(0);
    const [homeLoanInterest, setHomeLoanInterest] = useState(0);

    // States for calculation
    const [oldTax, setOldTax] = useState(0);
    const [newTax, setNewTax] = useState(0);
    const [breakevenDeductions, setBreakevenDeductions] = useState(0);

    const calculateOldTax = (taxableIncome: number) => {
        let tax = 0;
        if (taxableIncome <= 250000) return 0;
        if (taxableIncome <= 500000) return 0; // Rebate 87A applies

        // Ignoring 87A rebate for simplicity if income > 5L
        if (taxableIncome > 250000) {
            tax += Math.min(250000, taxableIncome - 250000) * 0.05;
        }
        if (taxableIncome > 500000) {
            tax += Math.min(500000, taxableIncome - 500000) * 0.20;
        }
        if (taxableIncome > 1000000) {
            tax += (taxableIncome - 1000000) * 0.30;
        }

        // Add 4% cess
        return tax * 1.04;
    };

    const calculateNewTax = (taxableIncome: number) => {
        let tax = 0;
        if (taxableIncome <= 700000) return 0; // Rebate 87A up to 7L

        if (taxableIncome > 300000) {
            tax += Math.min(300000, taxableIncome - 300000) * 0.05;
        }
        if (taxableIncome > 600000) {
            tax += Math.min(300000, taxableIncome - 600000) * 0.10;
        }
        if (taxableIncome > 900000) {
            tax += Math.min(300000, taxableIncome - 900000) * 0.15;
        }
        if (taxableIncome > 1200000) {
            tax += Math.min(300000, taxableIncome - 1200000) * 0.20;
        }
        if (taxableIncome > 1500000) {
            tax += (taxableIncome - 1500000) * 0.30;
        }

        // Add 4% cess
        return tax * 1.04;
    };

    useEffect(() => {
        // Old Regime Calculation
        const oldStdDeduction = 50000;
        const oldTotalDeductions = oldStdDeduction + hraExempt + sec80c + sec80d + homeLoanInterest;
        const oldTaxable = Math.max(0, grossSalary - oldTotalDeductions);
        setOldTax(calculateOldTax(oldTaxable));

        // New Regime Calculation (Budget 2024 slabs assumed)
        const newStdDeduction = 75000; // Updated std deduction for new regime
        const newTaxable = Math.max(0, grossSalary - newStdDeduction);
        setNewTax(calculateNewTax(newTaxable));

        // Calculate Breakeven
        // Very rough approximation: find the deduction amount where Old Tax <= New Tax
        let testDeductions = 0;
        let testOldTax = calculateOldTax(Math.max(0, grossSalary - 50000 - testDeductions));
        const targetTax = calculateNewTax(newTaxable);

        while (testOldTax > targetTax && testDeductions <= 500000) {
            testDeductions += 5000;
            testOldTax = calculateOldTax(Math.max(0, grossSalary - 50000 - testDeductions));
        }
        setBreakevenDeductions(testDeductions);

    }, [grossSalary, hraExempt, sec80c, sec80d, homeLoanInterest]);

    const currentDeductions = hraExempt + sec80c + sec80d + homeLoanInterest;
    const isOldBetter = oldTax < newTax;
    const savingsAmount = Math.abs(oldTax - newTax);

    return (
        <div className="p-6 max-w-[1240px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-2">
                <Link href="/tax/declarations" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <div className="flex items-center space-x-3">
                        <h1 className="text-2xl font-bold text-white">Compare Tax Regimes</h1>
                        <span className="bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/20 text-xs px-2.5 py-1 rounded-full font-medium">FY 2024-25</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">Adjust variables to see which tax regime works best for your salary and investments.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">

                {/* Left Column: Calculator Inputs */}
                <div className="col-span-12 lg:col-span-4 space-y-5">
                    <div className="bg-[#0A1420] border border-slate-800 rounded-xl p-5 shadow-sm">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                            <Calculator size={18} className="mr-2 text-indigo-400" /> "What If" Calculator
                        </h2>

                        <div className="space-y-4">
                            {/* Gross Salary */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between">
                                    <span>Gross Annual Salary</span>
                                    <span className="text-xs text-slate-500">Includes all components</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        value={grossSalary}
                                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                                        className="w-full bg-[#0D1928] border border-slate-700 text-white rounded-lg px-3 py-2.5 pl-8 focus:outline-none focus:border-indigo-500 transition-colors font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="h-px w-full bg-slate-800 my-2"></div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Old Regime Deductions</p>

                            {/* 80C */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between">
                                    <span>80C Investments <span className="text-slate-500">(Max 1.5L)</span></span>
                                    <span className="text-[#00E5A0] font-medium">₹{sec80c.toLocaleString()}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0" max="150000" step="5000"
                                    value={sec80c}
                                    onChange={(e) => setSec80c(Number(e.target.value))}
                                    className="w-full accent-[#00E5A0] h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            {/* 80D */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between">
                                    <span>80D Health <span className="text-slate-500">(Max 75k)</span></span>
                                    <span className="text-[#00E5A0] font-medium">₹{sec80d.toLocaleString()}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0" max="75000" step="1000"
                                    value={sec80d}
                                    onChange={(e) => setSec80d(Number(e.target.value))}
                                    className="w-full accent-[#00E5A0] h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>

                            {/* HRA */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between">
                                    <span>HRA Exemption</span>
                                    <span className="text-[#00E5A0] font-medium">₹{hraExempt.toLocaleString()}</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        value={hraExempt}
                                        onChange={(e) => setHraExempt(Number(e.target.value))}
                                        className="w-full bg-[#0D1928] border border-slate-700 text-white rounded-lg px-3 py-2 pl-8 focus:outline-none focus:border-[#00E5A0] transition-colors text-sm"
                                    />
                                </div>
                            </div>

                            {/* Home Loan */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex justify-between">
                                    <span>Home Loan Interest (Sec 24)</span>
                                    <span className="text-[#00E5A0] font-medium">₹{homeLoanInterest.toLocaleString()}</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">₹</span>
                                    <input
                                        type="number"
                                        value={homeLoanInterest}
                                        onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                                        className="w-full bg-[#0D1928] border border-slate-700 text-white rounded-lg px-3 py-2 pl-8 focus:outline-none focus:border-[#00E5A0] transition-colors text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* AI Recommendation Box */}
                    <div className="bg-gradient-to-br from-[#0A1420] to-[#0D1928] border border-slate-700 rounded-xl p-5 shadow-xl shadow-black/20">
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center"><TrendingDown size={16} className="text-[#00E5A0] mr-2" /> Optimization Insights</h3>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className={`w-8 h-8 rounded-full ${isOldBetter ? 'bg-[#00E5A0]/20 text-[#00E5A0]' : 'bg-indigo-500/20 text-indigo-400'} flex items-center justify-center mr-3 mt-1 flex-shrink-0`}>
                                    <DollarSign size={16} />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">
                                        The <span className="font-bold">{isOldBetter ? 'Old Regime' : 'New Regime'}</span> is more viable for you.
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        You save <span className={isOldBetter ? 'text-[#00E5A0] font-bold' : 'text-indigo-400 font-bold'}>₹{savingsAmount.toLocaleString()}</span> compared to the other regime.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-800/50">
                                <p className="text-xs text-slate-300 mb-2">Breakeven Analysis</p>
                                <p className="text-xs text-slate-400">
                                    To make the Old Regime beneficial, you need minimum total deductions of <span className="text-white font-semibold">₹{breakevenDeductions.toLocaleString()}</span>.
                                </p>
                                <div className="mt-3 space-y-1">
                                    <div className="flex justify-between text-[10px] uppercase font-semibold">
                                        <span className="text-slate-500">Current Deductions</span>
                                        <span className="text-[#00E5A0]">₹{currentDeductions.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${currentDeductions >= breakevenDeductions ? 'bg-[#00E5A0]' : 'bg-yellow-500'}`}
                                            style={{ width: `${Math.min(100, (currentDeductions / Math.max(1, breakevenDeductions)) * 100)}%` }}
                                        ></div>
                                    </div>
                                    {currentDeductions < breakevenDeductions && (
                                        <p className="text-[10px] text-yellow-500 text-right mt-1">Short by ₹{(breakevenDeductions - currentDeductions).toLocaleString()}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Comparison Panels */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="grid grid-cols-2 gap-4 h-full">

                        {/* Old Regime Panel */}
                        <div className={`rounded-xl border-2 flex flex-col transition-all duration-300 relative overflow-hidden ${isOldBetter ? 'border-[#00E5A0] bg-[#00E5A0]/[0.02] shadow-[0_0_30px_rgba(0,229,160,0.05)]' : 'border-slate-800 bg-[#0A1420] opacity-80'}`}>

                            {isOldBetter && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00E5A0] to-transparent opacity-50"></div>
                            )}

                            <div className={`p-5 border-b ${isOldBetter ? 'border-[#00E5A0]/20 bg-[#00E5A0]/5' : 'border-slate-800 bg-slate-800/20'}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-xl font-bold text-white">Old Regime</h3>
                                    {isOldBetter && <span className="bg-[#00E5A0] text-[#0A1420] text-xs font-bold px-2 py-0.5 rounded flex items-center"><CheckCircle2 size={12} className="mr-1" /> Recommended</span>}
                                </div>
                                <p className="text-xs text-slate-400">Beneficial if you maximize tax-saving investments & rent.</p>
                            </div>

                            <div className="p-6 flex-1 space-y-4 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>Gross Salary</span>
                                    <span className="font-semibold text-white">₹{grossSalary.toLocaleString()}</span>
                                </div>

                                <div className="space-y-2 py-3 border-y border-slate-800 border-dashed">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Less: Standard Deduction</span>
                                        <span className="text-[#00E5A0]">-₹50,000</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Less: HRA Exemption</span>
                                        <span className="text-[#00E5A0]">-₹{hraExempt.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Less: 80C, 80D, etc.</span>
                                        <span className="text-[#00E5A0]">-₹{(sec80c + sec80d).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Less: Home Loan Int.</span>
                                        <span className="text-[#00E5A0]">-₹{homeLoanInterest.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-300 font-medium whitespace-nowrap mr-2">Net Taxable Income</span>
                                    <span className="text-lg font-bold text-white tracking-tight">₹{Math.max(0, grossSalary - 50000 - currentDeductions).toLocaleString()}</span>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col items-center">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Total Tax + Cess</p>
                                    <p className={`text-4xl font-black ${isOldBetter ? 'text-[#00E5A0]' : 'text-slate-300'}`}>₹{Math.round(oldTax).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="p-5 mt-auto">
                                <button className={`w-full py-3 rounded-lg font-bold flex items-center justify-center transition-all ${isOldBetter ? 'bg-[#00E5A0] text-[#0A1420] shadow-[0_0_15px_rgba(0,229,160,0.3)] hover:bg-[#00c98d]' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                                    <Lock size={16} className="mr-2" /> Select Old Regime
                                </button>
                            </div>
                        </div>

                        {/* New Regime Panel */}
                        <div className={`rounded-xl border-2 flex flex-col transition-all duration-300 relative overflow-hidden ${!isOldBetter ? 'border-indigo-500 bg-indigo-500/[0.02] shadow-[0_0_30px_rgba(99,102,241,0.05)]' : 'border-slate-800 bg-[#0A1420] opacity-80'}`}>

                            {!isOldBetter && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
                            )}

                            <div className={`p-5 border-b ${!isOldBetter ? 'border-indigo-500/20 bg-indigo-500/5' : 'border-slate-800 bg-slate-800/20'}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-xl font-bold text-white">New Regime</h3>
                                    {!isOldBetter && <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center"><CheckCircle2 size={12} className="mr-1" /> Recommended</span>}
                                </div>
                                <p className="text-xs text-slate-400">Lower slab rates, hassle-free with no investment proofs.</p>
                            </div>

                            <div className="p-6 flex-1 space-y-4 text-sm">
                                <div className="flex justify-between text-slate-300">
                                    <span>Gross Salary</span>
                                    <span className="font-semibold text-white">₹{grossSalary.toLocaleString()}</span>
                                </div>

                                <div className="space-y-2 py-3 border-y border-slate-800 border-dashed">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Less: Standard Deduction</span>
                                        <span className="text-indigo-400">-₹75,000</span>
                                    </div>
                                    <div className="flex justify-between opacity-40 grayscale pointer-events-none">
                                        <span>Less: HRA Exemption</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="flex justify-between opacity-40 grayscale pointer-events-none">
                                        <span>Less: 80C, 80D, etc.</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="flex justify-between opacity-40 grayscale pointer-events-none">
                                        <span>Less: Home Loan Int.</span>
                                        <span>₹0</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-300 font-medium whitespace-nowrap mr-2">Net Taxable Income</span>
                                    <span className="text-lg font-bold text-white tracking-tight">₹{Math.max(0, grossSalary - 75000).toLocaleString()}</span>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col items-center">
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Total Tax + Cess</p>
                                    <p className={`text-4xl font-black ${!isOldBetter ? 'text-indigo-400' : 'text-slate-300'}`}>₹{Math.round(newTax).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="p-5 mt-auto">
                                <button className={`w-full py-3 rounded-lg font-bold flex items-center justify-center transition-all ${!isOldBetter ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:bg-indigo-600' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                                    <Lock size={16} className="mr-2" /> Select New Regime
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Info Footer */}
            <div className="bg-slate-800/30 border border-slate-800 rounded-lg p-4 flex items-start space-x-3 mt-4">
                <Info size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-400 space-y-1">
                    <p>This calculator provides an estimation based on standard tax slabs for FY 2024-25. Surcharge is not included in this simple calculation.</p>
                    <p>Standard deduction of ₹75,000 for New Regime is as per Budget 2024 proposals.</p>
                </div>
            </div>
        </div>
    );
}
