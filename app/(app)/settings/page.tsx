"use client";

import Link from "next/link";
import {
    Building2, Users, Shield, Sliders, Bell, Link as LinkIcon,
    CreditCard, Database, Activity, FileText, Key, MessageSquare, Mail, ChevronRight, Settings,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";

interface SettingItem {
    name: string;
    icon: typeof Building2;
    href: string;
}

interface SettingCategory {
    title: string;
    description: string;
    items: SettingItem[];
}

const CATEGORIES: SettingCategory[] = [
    {
        title: "Organization",
        description: "Manage company details, locations, and structure",
        items: [
            { name: "Company Profile", icon: Building2, href: "/settings/company" },
            { name: "Locations & Facilities", icon: Building2, href: "/settings/company" },
            { name: "Departments & Org Chart", icon: Users, href: "/org-chart/departments" },
        ],
    },
    {
        title: "Access & Security",
        description: "Control who has access and what they can do",
        items: [
            { name: "Users & Invites", icon: Users, href: "/settings/users" },
            { name: "Roles & Permissions", icon: Shield, href: "/settings/roles" },
            { name: "API Keys & Tokens", icon: Key, href: "/settings/api-keys" },
            { name: "Audit Logs", icon: Activity, href: "/settings/audit-log" },
        ],
    },
    {
        title: "Workflows & Automation",
        description: "Customize how HR processes run across the platform",
        items: [
            { name: "Approval Matrices", icon: Sliders, href: "/settings/approval-matrix" },
            { name: "Workflow Builder", icon: LinkIcon, href: "/settings/workflows" },
            { name: "Custom Fields", icon: Database, href: "/settings/custom-fields" },
            { name: "Form Builder", icon: FileText, href: "/settings/forms" },
        ],
    },
    {
        title: "Communications",
        description: "Manage templates and delivery channels",
        items: [
            { name: "Email Templates", icon: Mail, href: "/settings/templates/email" },
            { name: "WhatsApp Templates", icon: MessageSquare, href: "/settings/templates/whatsapp" },
            { name: "Letter Builder", icon: FileText, href: "/settings/templates/letters" },
            { name: "Notification Preferences", icon: Bell, href: "/settings/notifications" },
        ],
    },
    {
        title: "System & Data",
        description: "Global configurations, integrations, and compliance",
        items: [
            { name: "Integrations", icon: LinkIcon, href: "/settings/integrations" },
            { name: "Webhooks", icon: LinkIcon, href: "/settings/webhooks" },
            { name: "Data Import & Export", icon: Database, href: "/settings/data/import" },
            { name: "Billing & Subscription", icon: CreditCard, href: "/settings/billing" },
        ],
    },
];

export default function SettingsHomePage() {
    return (
        <Page
            title="System settings"
            subtitle="Configure HRflow globally for your tenant"
            breadcrumbs={[{ label: "Settings" }]}
            maxWidth="1300px"
            actions={
                <div className="flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-2.5 text-indigo-400">
                    <Settings size={18} aria-hidden="true" />
                </div>
            }
        >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {CATEGORIES.map((cat) => (
                    <Card key={cat.title} padding="none">
                        <CardHeader className="border-b border-[#1A2A3A] bg-[#131B2B] p-5">
                            <div>
                                <CardTitle>{cat.title}</CardTitle>
                                <p className="mt-1 text-xs text-[#8899AA]">{cat.description}</p>
                            </div>
                        </CardHeader>
                        <ul className="space-y-1 p-3">
                            {cat.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-[#1A2A3A]"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg border border-[#1A2A3A] bg-[#0A1420] p-2 text-[#8899AA] transition-colors group-hover:border-[#2A3A4A] group-hover:text-white">
                                                    <Icon size={14} aria-hidden="true" />
                                                </div>
                                                <span className="text-sm font-medium text-[#c0c6cc] transition-colors group-hover:text-white">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <ChevronRight
                                                size={14}
                                                className="text-[#445566] transition-all group-hover:translate-x-1 group-hover:text-indigo-400"
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>
                ))}
            </div>

            <Card className="mt-6 border-red-500/20 bg-[#131B2B]" padding="lg">
                <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-xl bg-red-500/10 p-2 text-red-400">
                        <Shield size={20} aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Advanced administration zone
                        </h3>
                        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-[#8899AA]">
                            These settings affect the entire organization. Only Super Admins should
                            modify these configurations. Misconfiguration may cause access loss or
                            workflow disruptions.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-4 text-xs">
                            <Link
                                href="/settings/system/health"
                                className="font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                System health →
                            </Link>
                            <Link
                                href="/settings/system/maintenance"
                                className="font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                Maintenance mode →
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
