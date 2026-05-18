"use client";

import { Calculator, Code2, HelpCircle, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

const VARIABLES = [
    { name: "Basic", desc: "Basic Salary Value" },
    { name: "Gross", desc: "Total Gross CTC" },
    { name: "CityType", desc: "'Metro' or 'Non-Metro'" },
    { name: "BaseDays", desc: "Total worked days" },
    { name: "Age", desc: "Employee Age (for PT/TDS)" },
] as const;

const SNIPPET_BUTTONS = ["+ Basic", "+ Gross", "if ... else", "Math.min()"] as const;

export default function FormulaBuilder() {
    return (
        <Page
            title="Formula Builder: HRA"
            subtitle="House Rent Allowance calculation logic for CTC structures."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Components", href: "/payroll-settings/components" },
                { label: "Formula Builder" },
            ]}
            maxWidth="1000px"
            actions={
                <>
                    <Button variant="secondary" href="/payroll-settings/components">Cancel</Button>
                    <Button icon={<Save size={14} aria-hidden="true" />}>Save Formula</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Editor Area */}
                <div className="md:col-span-2 space-y-6">
                    <Card padding="none">
                        <div className="flex items-center gap-3 px-5 py-4 bg-[#0A1420] border-b border-[#1A2A3A]">
                            <Code2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                            <h3 className="text-sm font-semibold text-white">Expression Editor</h3>
                        </div>
                        <div className="p-5">
                            <div
                                className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4 min-h-40 font-mono text-sm text-white leading-relaxed"
                                role="region"
                                aria-label="Formula expression editor"
                            >
                                <span className="text-[#0066FF]">if</span> (CityType == <span className="text-[#FFB800]">&apos;Metro&apos;</span>) {"{"}
                                <br />
                                <span className="pl-5">return Basic * <span className="text-[#00E5A0]">0.50</span>;</span>
                                <br />
                                {"} "}<span className="text-[#0066FF]">else</span> {"{"}
                                <br />
                                <span className="pl-5">return Basic * <span className="text-[#00E5A0]">0.40</span>;</span>
                                <br />
                                {"}"}
                            </div>
                            <div className="mt-3 flex gap-2 flex-wrap">
                                {SNIPPET_BUTTONS.map((btn) => (
                                    <button
                                        key={btn}
                                        type="button"
                                        className="h-7 px-3 bg-[#1A2A3A] rounded text-white text-xs font-mono hover:bg-[#2A3A4A] transition-colors"
                                    >
                                        {btn}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Calculator size={16} className="text-[#0066FF]" aria-hidden="true" />
                            <h3 className="text-sm font-semibold text-white">Test Formula</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            <div>
                                <label htmlFor="basic-input" className="block text-xs text-[#8899AA] mb-2">Basic Salary Input</label>
                                <input
                                    id="basic-input"
                                    type="number"
                                    defaultValue="40000"
                                    className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                                />
                            </div>
                            <div>
                                <label htmlFor="city-type" className="block text-xs text-[#8899AA] mb-2">City Type</label>
                                <select
                                    id="city-type"
                                    className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                                >
                                    <option>Metro</option>
                                    <option>Non-Metro</option>
                                </select>
                            </div>
                        </div>
                        <div className="bg-[#00E5A0]/5 border border-dashed border-[#00E5A0]/30 rounded-lg p-4 flex justify-between items-center">
                            <span className="text-sm text-[#8899AA]">Result:</span>
                            <span className="text-2xl font-bold text-[#00E5A0]">₹20,000</span>
                        </div>
                    </Card>
                </div>

                {/* Variables Sidebar */}
                <Card padding="lg">
                    <h3 className="text-sm font-semibold text-white mb-4">Available Variables</h3>
                    <ul className="space-y-3" role="list">
                        {VARIABLES.map((v) => (
                            <li key={v.name} className="pb-3 border-b border-[#1A2A3A] last:border-b-0">
                                <code className="inline-block bg-[#1A2A3A] px-2 py-0.5 rounded text-xs text-white font-mono mb-1">{v.name}</code>
                                <p className="text-xs text-[#8899AA]">{v.desc}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 p-4 bg-[#0066FF]/5 rounded-lg border border-[#0066FF]/20">
                        <div className="flex gap-2 items-start">
                            <HelpCircle size={14} className="text-[#0066FF] shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-xs text-[#8899AA] leading-relaxed">
                                Use JavaScript-like syntax. Use <code className="font-mono text-white">Math.min(a,b)</code> for maximum limits or standard operators (<code className="font-mono text-white">+, -, *, /</code>).
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
