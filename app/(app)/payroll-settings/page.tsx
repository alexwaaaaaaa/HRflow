"use client";

import Link from "next/link";
import { Calculator, ShieldCheck, Banknote, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

// migrated: immersive-ui

interface SettingsLink {
    href: string;
    title: string;
    desc: string;
    comingSoon?: boolean;
}

interface SettingsSection {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    iconColor: string;
    title: string;
    links: SettingsLink[];
}

const SECTIONS: SettingsSection[] = [
    {
        icon: Calculator,
        iconColor: "text-[#00E5A0]",
        title: "Earnings & Deductions",
        links: [
            { href: "/payroll-settings/components", title: "Salary Components", desc: "Create and manage Basic, HRA, Allowances." },
            { href: "/payroll-settings/components/formula", title: "Formula Builder", desc: "Define logic for dependent components." },
            { href: "/payroll-settings/cycle", title: "Payroll Cycle Dates", desc: "Set lock dates and pay frequencies." },
            { href: "/payroll-settings/pro-rata", title: "Pro-rata & LOP Rules", desc: "Configure partial month and absence logic." },
        ],
    },
    {
        icon: ShieldCheck,
        iconColor: "text-[#0066FF]",
        title: "Compliance & Tax",
        links: [
            { href: "#", title: "PF / ESI Configuration", desc: "Manage statutory codes and contribution rates.", comingSoon: true },
            { href: "#", title: "Professional Tax (PT)", desc: "State-wise PT deduction slabs mapping.", comingSoon: true },
            { href: "#", title: "Income Tax (TDS) Rules", desc: "Define section 89 relief and investment proofs limit.", comingSoon: true },
        ],
    },
    {
        icon: Banknote,
        iconColor: "text-[#FFB800]",
        title: "Disbursement & Adjustments",
        links: [
            { href: "/payroll-settings/bank-verify", title: "Bank Verification", desc: "Penny drop and account validation logs." },
            { href: "/payroll-settings/arrears-logic", title: "Arrears Logic", desc: "Configure historical adjustment calculations." },
            { href: "#", title: "F&F Rules", desc: "Gratuity, notice pay, and leave encashment math.", comingSoon: true },
        ],
    },
];

export default function PayrollSettingsDashboard() {
    return (
        <Page
            title="Payroll Settings"
            subtitle="Configure salary structures, compliance rules, and calculation logic."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings" },
            ]}
            maxWidth="1000px"
        >
            <nav aria-label="Payroll settings categories" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SECTIONS.map((section) => (
                    <Card key={section.title} padding="none">
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                            <section.icon size={17} className={section.iconColor} aria-hidden="true" />
                            <h2 className="text-sm font-semibold text-white">{section.title}</h2>
                        </div>
                        <ul role="list">
                            {section.links.map((link) => (
                                <li key={link.title} className="border-b border-[#1A2A3A] last:border-b-0">
                                    {link.comingSoon ? (
                                        <div className="flex justify-between items-center px-5 py-3 opacity-60">
                                            <div>
                                                <div className="text-sm font-medium text-white mb-1">{link.title}</div>
                                                <div className="text-xs text-[#8899AA]">{link.desc}</div>
                                            </div>
                                            <span className="text-[10px] bg-[#1A2A3A] px-2 py-1 rounded text-[#8899AA] shrink-0 ml-3">Coming Soon</span>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="flex justify-between items-center px-5 py-3 hover:bg-[#1A2A3A]/30 transition-colors group"
                                        >
                                            <div>
                                                <div className="text-sm font-medium text-white mb-1">{link.title}</div>
                                                <div className="text-xs text-[#8899AA]">{link.desc}</div>
                                            </div>
                                            <ChevronRight size={14} className="text-[#8899AA] group-hover:text-white transition-colors shrink-0 ml-3" aria-hidden="true" />
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </nav>
        </Page>
    );
}
