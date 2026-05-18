"use client";
import React from "react";
import { Rocket, Mail, Calculator, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function GoLiveChecklistScreen() {
    return (
        <Page
            title="Go-Live Readiness"
            subtitle="You're almost ready to officially launch Kaarya to your organization. Review these final critical checks before flipping the switch."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Go Live", href: "/onboarding/go-live" },
            ]}
            maxWidth="800px"
        >
            <div className="text-center mb-12">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
                    <Rocket className="text-emerald-400" size={36} aria-hidden="true" />
                </div>
            </div>

            <div className="space-y-4">

                {/* Section 1: Company & Legal */}
                <Card className="relative overflow-hidden group border-emerald-500/30 bg-[#0A1420]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full" aria-hidden="true" />
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="mt-1">
                            <CheckCircle2 size={24} className="text-emerald-500" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">Company &amp; Legal Info</h3>
                            <p className="text-[#8899AA] text-sm mb-4">PAN, TAN, PT states, and registered addresses are verified.</p>
                            <Link href="/settings/company" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                                Review Settings <ChevronRight size={14} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </Card>

                {/* Section 2: First Payroll Run */}
                <Card className="hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-start gap-4 flex-col sm:flex-row">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#2A3A4A] shrink-0 mt-1" aria-hidden="true" />
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-white">First Payroll Run</h3>
                                <Badge variant="danger">Required</Badge>
                            </div>
                            <p className="text-[#8899AA] text-sm mb-4">
                                You need to configure your first payroll cycle dates and run a dummy calculation to ensure mappings are correct.
                            </p>

                            <div className="bg-[#131B2B] rounded-xl p-4 border border-[#2A3A4A] flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#0A1420] p-2 rounded-lg">
                                        <Calculator size={18} className="text-[#556677]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white font-bold mb-0.5">Setup Payroll Cycle</div>
                                        <div className="text-xs text-[#556677]">Define attendance cut-offs and payout dates.</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" href="/onboarding/guide/payroll">
                                    Start Guide
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Section 3: Invite Your Team */}
                <Card className="hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-start gap-4 flex-col sm:flex-row">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#2A3A4A] shrink-0 mt-1" aria-hidden="true" />
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-white">Invite Your Team</h3>
                                <Badge variant="danger">Required</Badge>
                            </div>
                            <p className="text-[#8899AA] text-sm mb-4">
                                Send welcome emails to your 1,210 imported employees to give them access to the self-service portal.
                            </p>

                            <div className="bg-[#131B2B] rounded-xl p-4 border border-[#2A3A4A] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#0A1420] p-2 rounded-lg">
                                        <Mail size={18} className="text-[#556677]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white font-bold mb-0.5">Send Invitations</div>
                                        <div className="text-xs text-[#556677]">Draft welcome email and send magic links.</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" href="/onboarding/guide/invite">
                                    Start Guide
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>

            <div className="mt-12 text-center">
                <Button disabled icon={<Rocket size={18} aria-hidden="true" />} className="mx-auto">
                    Launch Workspace
                </Button>
                <p className="text-[10px] text-[#556677] font-bold uppercase tracking-wider mt-4">Complete all required steps to unlock</p>
            </div>
        </Page>
    );
}
