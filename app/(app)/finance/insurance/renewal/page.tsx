"use client";

import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function InsuranceRenewalPage() {
    return (
        <Page
            title="Policy Renewal Portal"
            subtitle="Review and confirm your voluntary insurance covers for the upcoming policy year."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Insurance", href: "/finance/insurance/policy" },
                { label: "Renewal" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Action Required Banner */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 flex items-start gap-4" role="alert">
                        <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-1" aria-hidden="true" />
                        <div>
                            <h2 className="text-lg font-bold text-amber-500 mb-1">Open Enrollment window is closing soon!</h2>
                            <p className="text-sm text-amber-500/80">
                                You must confirm your voluntary policy renewals by <strong>31 Oct 2025</strong>. Otherwise, your cover for Parents and Super Top-up will lapse.
                            </p>
                        </div>
                    </div>

                    {/* Parents Cover */}
                    <Card padding="lg" className="border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-amber-500 text-[#0B1221] text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase">Action Needed</div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">Parents Mediclaim Cover</h3>
                                <p className="text-[#8899AA] text-sm mt-1">Current Cover: ₹3,00,000</p>
                            </div>
                        </div>
                        <div className="bg-[#1A2A3A]/40 rounded-xl p-4 mb-6 border border-[#2A3A4A]">
                            <h4 className="text-sm font-bold text-white mb-3">Proposed Renewal Terms (2025-26)</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8899AA]">Cover Amount</span>
                                    <span className="text-white font-medium">₹3,00,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#8899AA]">Previous Premium</span>
                                    <span className="text-[#8899AA] line-through">₹1,200/mo</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                                        Revised Premium <Badge variant="success" className="text-[10px]">+10% Age Bracket Update</Badge>
                                    </span>
                                    <span className="text-white font-bold">₹1,320/mo</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button className="flex-1" icon={<CheckCircle2 size={16} />}>Opt For Renewal</Button>
                            <Button variant="secondary">Opt Out</Button>
                        </div>
                    </Card>

                    {/* Super Top-up */}
                    <Card padding="lg">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white">GMC Super Top-up</h3>
                                <p className="text-[#8899AA] text-sm mt-1">Current Cover: ₹10,00,000</p>
                            </div>
                            <Badge variant="success">Opted In</Badge>
                        </div>
                        <div className="bg-[#1A2A3A]/40 rounded-xl p-4 border border-[#2A3A4A]">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Renewal Premium</span>
                                <span className="text-white font-bold">₹350/mo (No Change)</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Payroll Impact Sidebar */}
                <div className="md:col-span-1">
                    <Card padding="lg" className="sticky top-8">
                        <h3 className="text-lg font-bold text-white mb-6">Payroll Impact Summary</h3>
                        <div className="space-y-4 mb-6 pt-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Parents Cover</span>
                                <span className="text-emerald-400 font-medium">₹1,320/mo</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Super Top-up</span>
                                <span className="text-emerald-400 font-medium">₹350/mo</span>
                            </div>
                            <div className="pt-4 border-t border-[#1A2A3A] flex justify-between items-center">
                                <span className="text-white font-bold">New Monthly Deduction</span>
                                <span className="text-2xl font-black text-white">₹1,670</span>
                            </div>
                        </div>
                        <Button className="w-full" icon={<ArrowRight size={16} />} iconRight>Submit Final Confirmations</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
