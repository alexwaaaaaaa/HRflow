"use client";
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const COMPONENTS = [
    { name: 'HRA (House Rent Allowance)', min: 0, max: 180000, hint: 'Min 40% basic for non-metro, 50% for metro', recommended: 156000 },
    { name: 'LTA (Leave Travel Allowance)', min: 0, max: 50000, hint: 'Tax exempt, claim actual travel bills', recommended: 50000 },
    { name: 'Medical Reimbursement', min: 0, max: 15000, hint: 'Tax exempt (Section 17(2))', recommended: 15000 },
    { name: 'Vehicle Maintenance', min: 0, max: 36000, hint: 'Car ≤1600cc: ₹1800/mo, others: ₹2400/mo', recommended: 21600 },
    { name: 'Books & Periodicals', min: 0, max: 12000, hint: 'Tax exempt, requires bills', recommended: 5000 },
    { name: 'NPS Contribution (80CCD1B)', min: 0, max: 50000, hint: 'Extra ₹50k deduction beyond 80C', recommended: 50000 },
    { name: 'Special Allowance (Taxable)', min: 0, max: 999999, hint: 'Fully taxable — absorbs remaining FBP pool', recommended: 0 },
];

export default function FBPDeclarationEmployee() {
    const TOTAL_POOL = 480000;
    const [values, setValues] = useState<Record<string, number>>({
        'HRA (House Rent Allowance)': 156000,
        'LTA (Leave Travel Allowance)': 50000,
        'Medical Reimbursement': 15000,
        'Vehicle Maintenance': 21600,
        'Books & Periodicals': 5000,
        'NPS Contribution (80CCD1B)': 50000,
        'Special Allowance (Taxable)': 182400,
    });
    const allocated = Object.values(values).reduce((a, b) => a + b, 0);
    const remaining = TOTAL_POOL - allocated;

    return (
        <Page
            title="My FBP Declaration"
            subtitle="Allocate your annual FBP pool to maximize tax savings — FY 2026-27"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "FBP", href: "/fbp/dashboard" },
                { label: "My Declaration", href: "/fbp/declare" },
            ]}
        >
            <div className="space-y-6 max-w-3xl mx-auto">
                {/* Pool Status */}
                <Card padding="md">
                    <div className="flex justify-between mb-2">
                        <span className="text-white font-bold">FBP Pool Allocation</span>
                        <span className={`font-black text-lg ${remaining < 0 ? 'text-red-400' : remaining === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {remaining === 0 ? '✓ Fully Allocated' : remaining < 0 ? `Over by ₹${Math.abs(remaining).toLocaleString()}` : `₹${remaining.toLocaleString()} remaining`}
                        </span>
                    </div>
                    <div className="h-3 bg-[#1A2A3A] rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${remaining < 0 ? 'bg-red-500' : 'bg-gradient-to-r from-purple-600 to-purple-400'}`}
                            style={{ width: `${Math.min(allocated / TOTAL_POOL * 100, 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                        <span className="text-[#8899AA]">Allocated: ₹{allocated.toLocaleString()}</span>
                        <span className="text-[#556677]">Total Pool: ₹{TOTAL_POOL.toLocaleString()}</span>
                    </div>
                </Card>

                {/* Components */}
                <div className="space-y-4">
                    {COMPONENTS.map(comp => {
                        const val = values[comp.name] || 0;
                        const inputId = `fbp-comp-${comp.name.replace(/\s+/g, '-').toLowerCase()}`;
                        return (
                            <Card key={comp.name} padding="md">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="text-white font-semibold text-sm">{comp.name}</div>
                                        <div className="text-[#556677] text-xs mt-0.5 flex items-center gap-1"><Info size={10} aria-hidden="true" />{comp.hint}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-purple-400 font-black text-lg">₹{val.toLocaleString()}</div>
                                        <div className="text-[#445566] text-[10px]">/ yr (₹{Math.round(val / 12).toLocaleString()}/mo)</div>
                                    </div>
                                </div>
                                <label htmlFor={inputId} className="sr-only">{comp.name}</label>
                                <input
                                    id={inputId}
                                    type="range"
                                    min={comp.min}
                                    max={comp.max}
                                    step={1200}
                                    value={val}
                                    aria-label={comp.name}
                                    onChange={e => setValues(prev => ({ ...prev, [comp.name]: +e.target.value }))}
                                    className="w-full accent-purple-500 cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-[#445566] mt-1">
                                    <span>₹{comp.min.toLocaleString()}</span>
                                    {comp.recommended > 0 && <span className="text-purple-400">Recommended: ₹{comp.recommended.toLocaleString()}</span>}
                                    <span>₹{comp.max.toLocaleString()}</span>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <Button
                    variant="primary"
                    size="md"
                    disabled={remaining !== 0}
                    className="w-full"
                >
                    {remaining === 0 ? 'Submit Declaration' : `Allocate remaining ₹${remaining.toLocaleString()} first`}
                </Button>
            </div>
        </Page>
    );
}
