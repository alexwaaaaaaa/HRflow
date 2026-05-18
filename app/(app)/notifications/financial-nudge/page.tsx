"use client";

import { PiggyBank, BriefcaseBusiness, X } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function FinancialNudgePage() {
    return (
        <Page
            title="Financial Nudges"
            subtitle="Smart tax-saving recommendations based on your current declarations"
            breadcrumbs={[
                { label: "Notifications", href: "/notifications" },
                { label: "Financial Nudge" },
            ]}
            maxWidth="600px"
        >
            <div className="flex justify-center">
                <Card
                    padding="none"
                    className="w-full max-w-md overflow-hidden bg-gradient-to-b from-[#0A1420] to-[#060D1A]"
                >
                    {/* Header band */}
                    <div className="relative flex h-32 w-full items-center justify-center bg-indigo-500/20">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.5)]">
                            <PiggyBank size={32} className="text-white" aria-hidden="true" />
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label="Dismiss nudge"
                            className="absolute right-4 top-4 text-white/50"
                            icon={<X size={20} aria-hidden="true" />}
                        />
                    </div>

                    <div className="p-6 text-center">
                        <Badge variant="info" className="mb-2">Tax Saving Nudge</Badge>
                        <h2 className="mb-2 mt-2 text-xl font-bold text-white">
                            Maximize your 80C Limits
                        </h2>
                        <p className="mb-6 text-sm text-[#8899AA]">
                            You have declared ₹1.2L under Section 80C. Based on your current
                            bracket, investing ₹30,000 more could save you exactly ₹9,360 in taxes!
                        </p>

                        <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#2A3A4A] bg-[#131B2B] p-4 text-left">
                            <BriefcaseBusiness
                                size={24}
                                className="shrink-0 text-[#556677]"
                                aria-hidden="true"
                            />
                            <div>
                                <p className="text-sm font-bold text-white">
                                    Suggested: ELSS Mutual Funds
                                </p>
                                <p className="text-xs text-[#8899AA]">Lock-in period of 3 years.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button variant="primary" size="lg" className="w-full">
                                Update Tax Declaration
                            </Button>
                            <Button variant="outline" size="md" className="w-full">
                                Remind Me Later
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
