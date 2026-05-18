"use client";

import React, { useState, useEffect } from "react";
import { Info, TrendingDown, DollarSign, Calculator, Lock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function RegimeSelector() {
    const [grossSalary, setGrossSalary] = useState(1200000);
    const [hraExempt, setHraExempt] = useState(0);
    const [sec80c, setSec80c] = useState(0);
    const [sec80d, setSec80d] = useState(0);
    const [homeLoanInterest, setHomeLoanInterest] = useState(0);

    const [oldTax, setOldTax] = useState(0);
    const [newTax, setNewTax] = useState(0);
    const [breakevenDeductions, setBreakevenDeductions] = useState(0);

    // Calculation functions — byte-identical to pre-migration
    const calculateOldTax = (taxableIncome: number) => {
        let tax = 0;
        if (taxableIncome <= 250000) return 0;
        if (taxableIncome <= 500000) return 0;
        if (taxableIncome > 250000) tax += Math.min(250000, taxableIncome - 250000) * 0.05;
        if (taxableIncome > 500000) tax += Math.min(500000, taxableIncome - 500000) * 0.2;
        if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.3;
        return tax * 1.04;
    };

    const calculateNewTax = (taxableIncome: number) => {
        let tax = 0;
        if (taxableIncome <= 700000) return 0;
        if (taxableIncome > 300000) tax += Math.min(300000, taxableIncome - 300000) * 0.05;
        if (taxableIncome > 600000) tax += Math.min(300000, taxableIncome - 600000) * 0.1;
        if (taxableIncome > 900000) tax += Math.min(300000, taxableIncome - 900000) * 0.15;
        if (taxableIncome > 1200000) tax += Math.min(300000, taxableIncome - 1200000) * 0.2;
        if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.3;
        return tax * 1.04;
    };

    useEffect(() => {
        const oldStdDeduction = 50000;
        const oldTotalDeductions = oldStdDeduction + hraExempt + sec80c + sec80d + homeLoanInterest;
        const oldTaxable = Math.max(0, grossSalary - oldTotalDeductions);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- derived tax computation from input fields
        setOldTax(calculateOldTax(oldTaxable));

        const newStdDeduction = 75000;
        const newTaxable = Math.max(0, grossSalary - newStdDeduction);
        setNewTax(calculateNewTax(newTaxable));

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
        <Page
            title="Compare Tax Regimes"
            subtitle="Adjust variables to see which tax regime works best for your salary and investments."
            breadcrumbs={[
                { label: "Tax", href: "/tax/declarations" },
                { label: "Regime Selector" },
            ]}
            maxWidth="1400px"
            actions={<Badge variant="success">FY 2024-25</Badge>}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Calculator Inputs */}
                <div className="lg:col-span-4 space-y-5">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Calculator size={18} className="text-indigo-400" aria-hidden="true" /> &quot;What If&quot; Calculator
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="gross-salary" className="block text-sm font-medium text-[#c8d8e8] mb-1.5">
                                    Gross Annual Salary
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]">₹</span>
                                    <input
                                        id="gross-salary"
                                        type="number"
                                        value={grossSalary}
                                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                                        className="w-full bg-[#0D1928] border border-[#445566] text-white rounded-lg px-3 py-2.5 pl-8 focus:outline-none focus:border-indigo-500 transition-colors font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="h-px w-full bg-[#1A2A3A] my-2" />
                            <p className="text-xs font-semibold text-[#445566] uppercase tracking-wider mb-2">
                                Old Regime Deductions
                            </p>

                            {[
                                { id: "sec80c", label: "80C Investments", max: 150000, value: sec80c, setter: setSec80c },
                                { id: "sec80d", label: "80D Health", max: 75000, value: sec80d, setter: setSec80d },
                            ].map((field) => (
                                <div key={field.id}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label htmlFor={field.id} className="text-sm font-medium text-[#c8d8e8]">
                                            {field.label}
                                        </label>
                                        <span className="text-[#00E5A0] font-medium text-sm">₹{field.value.toLocaleString()}</span>
                                    </div>
                                    <input
                                        id={field.id}
                                        type="range"
                                        min="0"
                                        max={field.max}
                                        step="5000"
                                        value={field.value}
                                        onChange={(e) => field.setter(Number(e.target.value))}
                                        className="w-full accent-[#00E5A0] h-1.5 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer"
                                        aria-label={field.label}
                                    />
                                </div>
                            ))}

                            {[
                                { id: "hra-exempt", label: "HRA Exemption", value: hraExempt, setter: setHraExempt },
                                { id: "home-loan", label: "Home Loan Interest (Sec 24)", value: homeLoanInterest, setter: setHomeLoanInterest },
                            ].map((field) => (
                                <div key={field.id}>
                                    <label htmlFor={field.id} className="block text-sm font-medium text-[#c8d8e8] mb-1.5">
                                        {field.label}
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]">₹</span>
                                        <input
                                            id={field.id}
                                            type="number"
                                            value={field.value}
                                            onChange={(e) => field.setter(Number(e.target.value))}
                                            className="w-full bg-[#0D1928] border border-[#445566] text-white rounded-lg px-3 py-2 pl-8 focus:outline-none focus:border-[#00E5A0] transition-colors text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* AI Recommendation */}
                    <Card padding="lg">
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <TrendingDown size={16} className="text-[#00E5A0]" aria-hidden="true" /> Optimization Insights
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div
                                    className={`w-8 h-8 rounded-full ${
                                        isOldBetter ? "bg-[#00E5A0]/20 text-[#00E5A0]" : "bg-indigo-500/20 text-indigo-400"
                                    } flex items-center justify-center shrink-0`}
                                >
                                    <DollarSign size={16} aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">
                                        The <span className="font-bold">{isOldBetter ? "Old Regime" : "New Regime"}</span> is more
                                        viable for you.
                                    </p>
                                    <p className="text-xs text-[#445566] mt-1">
                                        You save{" "}
                                        <span className={isOldBetter ? "text-[#00E5A0] font-bold" : "text-indigo-400 font-bold"}>
                                            ₹{savingsAmount.toLocaleString()}
                                        </span>{" "}
                                        compared to the other regime.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#1A2A3A]/30 rounded-lg p-3 border border-[#1A2A3A]/50">
                                <p className="text-xs text-[#c8d8e8] mb-2">Breakeven Analysis</p>
                                <p className="text-xs text-[#445566]">
                                    To make the Old Regime beneficial, you need minimum total deductions of{" "}
                                    <span className="text-white font-semibold">₹{breakevenDeductions.toLocaleString()}</span>.
                                </p>
                                <div className="mt-3 space-y-1">
                                    <div className="flex justify-between text-[10px] uppercase font-semibold">
                                        <span className="text-[#445566]">Current Deductions</span>
                                        <span className="text-[#00E5A0]">₹{currentDeductions.toLocaleString()}</span>
                                    </div>
                                    <div
                                        className="w-full bg-[#1A2A3A] h-1.5 rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={Math.min(100, (currentDeductions / Math.max(1, breakevenDeductions)) * 100)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label="Deductions vs breakeven"
                                    >
                                        <div
                                            className={`h-full ${currentDeductions >= breakevenDeductions ? "bg-[#00E5A0]" : "bg-yellow-500"}`}
                                            style={{
                                                width: `${Math.min(100, (currentDeductions / Math.max(1, breakevenDeductions)) * 100)}%`,
                                            }}
                                        />
                                    </div>
                                    {currentDeductions < breakevenDeductions && (
                                        <p className="text-[10px] text-yellow-500 text-right mt-1">
                                            Short by ₹{(breakevenDeductions - currentDeductions).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Comparison Panels */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Old Regime Panel */}
                        <Card
                            padding="none"
                            className={`flex flex-col transition-all duration-300 ${
                                isOldBetter
                                    ? "border-[#00E5A0] shadow-[0_0_30px_rgba(0,229,160,0.05)]"
                                    : "border-[#1A2A3A] opacity-80"
                            }`}
                        >
                            <div
                                className={`p-5 border-b ${
                                    isOldBetter ? "border-[#00E5A0]/20 bg-[#00E5A0]/5" : "border-[#1A2A3A] bg-[#1A2A3A]/20"
                                }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-xl font-bold text-white">Old Regime</h3>
                                    {isOldBetter && <Badge variant="success">Recommended</Badge>}
                                </div>
                                <p className="text-xs text-[#445566]">Beneficial if you maximize tax-saving investments &amp; rent.</p>
                            </div>

                            <div className="p-6 flex-1 space-y-3 text-sm">
                                <div className="flex justify-between text-[#c8d8e8]">
                                    <span>Gross Salary</span>
                                    <span className="font-semibold text-white">₹{grossSalary.toLocaleString()}</span>
                                </div>
                                <div className="space-y-1 py-3 border-y border-[#1A2A3A] border-dashed">
                                    <div className="flex justify-between text-[#445566]">
                                        <span>Less: Standard Deduction</span>
                                        <span className="text-[#00E5A0]">-₹50,000</span>
                                    </div>
                                    <div className="flex justify-between text-[#445566]">
                                        <span>Less: HRA Exemption</span>
                                        <span className="text-[#00E5A0]">-₹{hraExempt.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[#445566]">
                                        <span>Less: 80C, 80D, etc.</span>
                                        <span className="text-[#00E5A0]">-₹{(sec80c + sec80d).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[#445566]">
                                        <span>Less: Home Loan Int.</span>
                                        <span className="text-[#00E5A0]">-₹{homeLoanInterest.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[#c8d8e8] font-medium">Net Taxable Income</span>
                                    <span className="text-lg font-bold text-white tracking-tight">
                                        ₹{Math.max(0, grossSalary - 50000 - currentDeductions).toLocaleString()}
                                    </span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-[#1A2A3A] flex flex-col items-center">
                                    <p className="text-xs text-[#445566] uppercase tracking-widest font-semibold mb-2">
                                        Total Tax + Cess
                                    </p>
                                    <p className={`text-4xl font-black ${isOldBetter ? "text-[#00E5A0]" : "text-[#c8d8e8]"}`}>
                                        ₹{Math.round(oldTax).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5">
                                <Button
                                    className={`w-full ${isOldBetter ? "" : "opacity-70"}`}
                                    variant={isOldBetter ? "primary" : "secondary"}
                                    icon={<Lock size={16} />}
                                >
                                    Select Old Regime
                                </Button>
                            </div>
                        </Card>

                        {/* New Regime Panel */}
                        <Card
                            padding="none"
                            className={`flex flex-col transition-all duration-300 ${
                                !isOldBetter
                                    ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.05)]"
                                    : "border-[#1A2A3A] opacity-80"
                            }`}
                        >
                            <div
                                className={`p-5 border-b ${
                                    !isOldBetter ? "border-indigo-500/20 bg-indigo-500/5" : "border-[#1A2A3A] bg-[#1A2A3A]/20"
                                }`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-xl font-bold text-white">New Regime</h3>
                                    {!isOldBetter && <Badge variant="info">Recommended</Badge>}
                                </div>
                                <p className="text-xs text-[#445566]">Lower slab rates, hassle-free with no investment proofs.</p>
                            </div>

                            <div className="p-6 flex-1 space-y-3 text-sm">
                                <div className="flex justify-between text-[#c8d8e8]">
                                    <span>Gross Salary</span>
                                    <span className="font-semibold text-white">₹{grossSalary.toLocaleString()}</span>
                                </div>
                                <div className="space-y-1 py-3 border-y border-[#1A2A3A] border-dashed">
                                    <div className="flex justify-between text-[#445566]">
                                        <span>Less: Standard Deduction</span>
                                        <span className="text-indigo-400">-₹75,000</span>
                                    </div>
                                    <div className="flex justify-between opacity-40 grayscale">
                                        <span>Less: HRA Exemption</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="flex justify-between opacity-40 grayscale">
                                        <span>Less: 80C, 80D, etc.</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="flex justify-between opacity-40 grayscale">
                                        <span>Less: Home Loan Int.</span>
                                        <span>₹0</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[#c8d8e8] font-medium">Net Taxable Income</span>
                                    <span className="text-lg font-bold text-white tracking-tight">
                                        ₹{Math.max(0, grossSalary - 75000).toLocaleString()}
                                    </span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-[#1A2A3A] flex flex-col items-center">
                                    <p className="text-xs text-[#445566] uppercase tracking-widest font-semibold mb-2">
                                        Total Tax + Cess
                                    </p>
                                    <p className={`text-4xl font-black ${!isOldBetter ? "text-indigo-400" : "text-[#c8d8e8]"}`}>
                                        ₹{Math.round(newTax).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5">
                                <Button
                                    className={`w-full ${!isOldBetter ? "" : "opacity-70"}`}
                                    variant={!isOldBetter ? "primary" : "secondary"}
                                    icon={<Lock size={16} />}
                                >
                                    Select New Regime
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Info Footer */}
            <Card padding="md" className="mt-6 flex items-start space-x-3">
                <Info size={18} className="text-[#445566] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-[#445566] space-y-1">
                    <p>
                        This calculator provides an estimation based on standard tax slabs for FY 2024-25. Surcharge is not
                        included in this simple calculation.
                    </p>
                    <p>Standard deduction of ₹75,000 for New Regime is as per Budget 2024 proposals.</p>
                </div>
            </Card>
        </Page>
    );
}
