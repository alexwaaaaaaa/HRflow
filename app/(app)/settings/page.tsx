"use client";

import React from 'react';
import {
    Building2, Users, Shield, Sliders, Bell, Link as LinkIcon,
    CreditCard, Database, Activity, FileText, Settings, Key,
    MessageSquare, Mail, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsHomePage() {
    const settingCategories = [
        {
            title: "Organization",
            description: "Manage company details, locations, and structure",
            items: [
                { name: "Company Profile", icon: Building2, href: "/settings/company" },
                { name: "Locations & Facilities", icon: Building2, href: "/settings/company/locations" }, // Assuming subroute
                { name: "Departments & Org Chart", icon: Users, href: "/settings/company/departments" },
            ]
        },
        {
            title: "Access & Security",
            description: "Control who has access to Kaarya and what they can do",
            items: [
                { name: "Users & Invites", icon: Users, href: "/settings/users" },
                { name: "Roles & Permissions", icon: Shield, href: "/settings/roles" },
                { name: "API Keys & Tokens", icon: Key, href: "/settings/api-keys" },
                { name: "Audit Logs", icon: Activity, href: "/settings/audit-log" },
            ]
        },
        {
            title: "Workflows & Automation",
            description: "Customize how HR processes run across the platform",
            items: [
                { name: "Approval Matrices", icon: Sliders, href: "/settings/approval-matrix" },
                { name: "Workflow Builder", icon: LinkIcon, href: "/settings/workflows" },
                { name: "Custom Fields", icon: Database, href: "/settings/custom-fields" },
                { name: "Form Builder", icon: FileText, href: "/settings/forms" },
            ]
        },
        {
            title: "Communications",
            description: "Manage templates and delivery channels",
            items: [
                { name: "Email Templates", icon: Mail, href: "/settings/templates/email" },
                { name: "WhatsApp Templates", icon: MessageSquare, href: "/settings/templates/whatsapp" },
                { name: "Letter Builder", icon: FileText, href: "/settings/templates/letters" },
                { name: "Notification Preferences", icon: Bell, href: "/settings/notifications" },
            ]
        },
        {
            title: "System & Data",
            description: "Global configurations, integrations, and compliance",
            items: [
                { name: "Integrations (Slack, Jira, etc.)", icon: LinkIcon, href: "/settings/integrations" },
                { name: "Webhooks", icon: LinkIcon, href: "/settings/webhooks" },
                { name: "Data Import & Export", icon: Database, href: "/settings/data/import" },
                { name: "Billing & Subscription", icon: CreditCard, href: "/settings/billing" },
            ]
        }
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400 border border-indigo-500/20">
                    <Settings size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
                    <p className="text-[#8899AA] text-sm mt-1">
                        Configure Kaarya OS globally for your tenant.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {settingCategories.map((cat, idx) => (
                    <div key={idx} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden hover:border-[#2A3A4A] transition-colors flex flex-col">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#131B2B]">
                            <h2 className="text-white font-semibold text-lg">{cat.title}</h2>
                            <p className="text-xs text-[#8899AA] mt-1">{cat.description}</p>
                        </div>
                        <div className="flex-1 p-3 space-y-1">
                            {cat.items.map((item, itemIdx) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        href={item.href}
                                        key={itemIdx}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A2A3A] group transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-[#0A1420] border border-[#1A2A3A] text-[#8899AA] group-hover:text-white group-hover:border-[#2A3A4A] transition-colors">
                                                <Icon size={16} />
                                            </div>
                                            <span className="text-sm font-medium text-[#c0c6cc] group-hover:text-white transition-colors">
                                                {item.name}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-[#445566] group-hover:text-indigo-400 transition-colors transform group-hover:translate-x-1" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-[#131B2B] border border-red-500/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="bg-red-500/10 p-2 rounded-xl text-red-400 shrink-0 mt-1">
                    <Shield size={20} />
                </div>
                <div>
                    <h3 className="text-white font-semibold text-sm mb-1">Advanced Administration Zone</h3>
                    <p className="text-[#8899AA] text-xs leading-relaxed max-w-3xl mb-4">
                        These settings affect the entire organization. Only Super Admins and System Owners should modify these configurations. Misconfigurations here may cause access loss or workflow disruptions.
                    </p>
                    <div className="flex gap-4 text-xs">
                        <Link href="/settings/system/health" className="text-indigo-400 hover:text-indigo-300 font-medium">System Health Status &rarr;</Link>
                        <Link href="/settings/system/maintenance" className="text-indigo-400 hover:text-indigo-300 font-medium">Maintenance Mode &rarr;</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}
