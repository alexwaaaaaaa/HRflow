"use client";

import Link from "next/link";
import { Shield, Star, Check, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CORE_PLANS = [
    {
        id: "gmc",
        title: "Group Mediclaim (GMC)",
        provider: "Star Health Allied",
        cover: "₹5 Lakhs",
        coverSub: "/ family floater",
        features: ["Covers Employee + Spouse + 2 Kids", "Pre-existing diseases covered from Day 1", "₹50,000 Maternity coverage inner limit"],
        cost: "₹0 (Company Paid)",
        href: "/finance/insurance/policy",
    },
    {
        id: "gtl",
        title: "Term & Accident (GTL/GPA)",
        provider: "HDFC Life",
        cover: "3X",
        coverSub: " Annual CTC",
        features: ["Death benefit to nominee", "Permanent total disability cover", "Worldwide 24/7 validity"],
        cost: "₹0 (Company Paid)",
        href: "/finance/insurance/policy",
    },
] as const;

const VOLUNTARY_PLANS = [
    {
        id: "topup",
        title: "GMC Super Top-up",
        tag: "Health Extra",
        tagVariant: "neutral" as const,
        desc: "Add an additional ₹10 Lakhs safety net over your base GMC plan.",
        premium: "₹350/mo",
        href: "/finance/insurance/enroll",
        btnVariant: "primary" as const,
    },
    {
        id: "parents",
        title: "Parents Mediclaim",
        tag: "Dependent Care",
        tagVariant: "neutral" as const,
        desc: "Extend a ₹3 Lakh health cover to your dependent parents or in-laws.",
        premium: "₹1,200/mo",
        href: "/finance/insurance/enroll",
        btnVariant: "secondary" as const,
    },
    {
        id: "pet",
        title: "Pet Insurance",
        tag: "Popular",
        tagVariant: "info" as const,
        desc: "Comprehensive surgery & OPD cover for your dogs and cats.",
        premium: "₹450/mo",
        href: "/finance/insurance/enroll",
        btnVariant: "secondary" as const,
    },
] as const;

export default function InsuranceMarketplacePage() {
    return (
        <Page
            title="Benefit Marketplace"
            subtitle="Explore and enroll in employer-sponsored and voluntary insurance plans."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Insurance", href: "/finance/insurance/policy" },
                { label: "Marketplace" },
            ]}
            maxWidth="1200px"
            actions={
                <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium rounded-lg">
                    Open Enrollment Ends: <strong>31 Oct 2025</strong>
                </div>
            }
        >
            {/* Employer Paid Core Benefits */}
            <section className="mb-12" aria-labelledby="core-plans-heading">
                <h2 id="core-plans-heading" className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-indigo-400" aria-hidden="true" /> Employer-Funded Core Plans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CORE_PLANS.map((plan) => (
                        <Card key={plan.id} padding="lg" className="relative overflow-hidden hover:border-indigo-500/50 transition-colors">
                            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider uppercase">Default Active</div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{plan.title}</h3>
                                    <p className="text-sm text-indigo-400 font-medium">{plan.provider}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <span className="text-2xl font-bold text-white">{plan.cover}</span>
                                <span className="text-[#8899AA] text-sm">{plan.coverSub}</span>
                            </div>
                            <ul className="space-y-2 text-sm text-[#8899AA] mb-6">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2">
                                        <Check size={16} className="text-emerald-400" aria-hidden="true" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center justify-between border-t border-[#2A3A4A] pt-4">
                                <span className="text-sm font-medium text-white">Cost: {plan.cost}</span>
                                <Link href={plan.href} className="text-indigo-400 text-sm font-medium flex items-center gap-1 hover:translate-x-1 transition-transform">
                                    View Details <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Voluntary Benefits */}
            <section aria-labelledby="voluntary-plans-heading">
                <h2 id="voluntary-plans-heading" className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Star size={20} className="text-amber-500" aria-hidden="true" /> Voluntary Top-ups &amp; Add-ons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {VOLUNTARY_PLANS.map((plan) => (
                        <Card key={plan.id} padding="lg" className="flex flex-col hover:border-[#2A3A4A] transition-colors">
                            <div className="mb-4">
                                <Badge variant={plan.tagVariant}>{plan.tag}</Badge>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{plan.title}</h3>
                            <p className="text-[#8899AA] text-sm mb-4 flex-1">{plan.desc}</p>
                            <div className="bg-[#1A2A3A]/40 rounded-lg p-3 mb-6 flex justify-between items-center text-sm border border-[#2A3A4A]">
                                <span className="text-white">Est. Premium</span>
                                <span className="font-bold text-amber-400">{plan.premium}</span>
                            </div>
                            <Button variant={plan.btnVariant} className="w-full" href={plan.href}>Explore &amp; Enroll</Button>
                        </Card>
                    ))}
                </div>
            </section>
        </Page>
    );
}
