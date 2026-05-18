"use client";

import { useState } from "react";
import { Landmark } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

type ActiveTab = "PT" | "LWF";

const PT_STATES = [
    { state: "Karnataka", amount: "₹34,000", employees: "170 employees", period: "March 2026", note: "Total PT deducted across 170 employees" },
    { state: "Maharashtra", amount: "₹37,000", employees: "148 employees", period: "March 2026", note: "148 employees (+ ₹100 extra for Feb)" },
    { state: "Tamil Nadu", amount: null, employees: null, period: "Half Yearly", note: "TN deducts PT on a bi-annual basis (Aug & Jan). No deductions this month." },
] as const;

export default function PtLwfScreen() {
    const [activeTab, setActiveTab] = useState<ActiveTab>("PT");

    return (
        <Page
            title="State Taxes (PT & LWF)"
            subtitle="Professional Tax and Labour Welfare Fund computations mapped by employee state"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Reports", href: "/payroll-reports" },
                { label: "PT & LWF" },
            ]}
            maxWidth="1000px"
        >
            {/* Tabs */}
            <div className="flex gap-4 border-b border-[#1A2A3A]" role="tablist" aria-label="State tax type">
                <button
                    role="tab"
                    aria-selected={activeTab === "PT"}
                    onClick={() => setActiveTab("PT")}
                    className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === "PT" ? "border-amber-400 text-amber-400" : "border-transparent text-[#8899AA] hover:text-white"}`}
                >
                    Professional Tax (PT)
                </button>
                <button
                    role="tab"
                    aria-selected={activeTab === "LWF"}
                    onClick={() => setActiveTab("LWF")}
                    className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${activeTab === "LWF" ? "border-pink-400 text-pink-400" : "border-transparent text-[#8899AA] hover:text-white"}`}
                >
                    Labour Welfare Fund (LWF)
                </button>
            </div>

            {activeTab === "PT" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PT_STATES.map((s) => (
                        <Card key={s.state} padding="lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold text-lg">{s.state}</h3>
                                <span className="text-[#8899AA] text-xs">{s.period}</span>
                            </div>
                            {s.amount ? (
                                <>
                                    <div className="text-amber-400 font-black text-3xl mb-1">{s.amount}</div>
                                    <div className="text-[#8899AA] text-xs mb-5">{s.note}</div>
                                    <div className="flex gap-2 pt-4 border-t border-[#1A2A3A]">
                                        <Button variant="secondary" size="sm" className="flex-1">Export Return</Button>
                                        <Button variant="secondary" size="sm" className="flex-1">Mark Paid</Button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-[#8899AA] text-xs">{s.note}</div>
                            )}
                        </Card>
                    ))}
                </div>
            ) : (
                <Card padding="lg" className="text-center py-24">
                    <Landmark size={48} className="mx-auto mb-4 text-pink-400 opacity-50" aria-hidden="true" />
                    <h3 className="text-white font-bold text-lg mb-2">LWF Deduction Cycle is Bi-Annual</h3>
                    <p className="text-[#8899AA] text-sm max-w-sm mx-auto">Labour Welfare Fund is deducted in June and December for most states. There is no LWF liability for the March 2026 payroll run.</p>
                </Card>
            )}
        </Page>
    );
}
