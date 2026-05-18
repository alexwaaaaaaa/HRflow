"use client";

import { useState } from "react";
import { ArrowRight, PackageSearch, Search, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type AppCategory = "All App" | "Communication" | "ATS" | "Accounting" | "Identity" | "Productivity";

interface AppEntry {
    id: number;
    name: string;
    cat: AppCategory;
    desc: string;
    icon: string;
    colorFrom: string;
    colorTo: string;
    installed: boolean;
    popular: boolean;
}

const CATEGORIES: AppCategory[] = ["All App", "Communication", "ATS", "Accounting", "Identity"];

const APPS: AppEntry[] = [
    { id: 1, name: "Slack", cat: "Communication", desc: "Send daily attendance digests and approval notifications directly to Slack channels.", icon: "S", colorFrom: "from-purple-600", colorTo: "to-indigo-600", installed: true, popular: true },
    { id: 2, name: "Google Workspace", cat: "Identity", desc: "Sync users, groups, and auto-provision SSO access for new joiners.", icon: "G", colorFrom: "from-blue-500", colorTo: "to-sky-400", installed: true, popular: true },
    { id: 3, name: "Greenhouse", cat: "ATS", desc: "Seamlessly transition hired candidates into Kaarya employee records.", icon: "Gh", colorFrom: "from-emerald-600", colorTo: "to-teal-500", installed: false, popular: true },
    { id: 4, name: "QuickBooks", cat: "Accounting", desc: "Export payroll journals and expense claims directly to your general ledger.", icon: "Qb", colorFrom: "from-green-600", colorTo: "to-emerald-500", installed: false, popular: false },
    { id: 5, name: "Jira", cat: "Productivity", desc: "Create Jira tickets for IT provisioning when new employees are onboarded.", icon: "J", colorFrom: "from-blue-600", colorTo: "to-indigo-700", installed: false, popular: false },
    { id: 6, name: "Zoho Books", cat: "Accounting", desc: "Automate accounting entries for Indian payroll compliance.", icon: "Zb", colorFrom: "from-amber-500", colorTo: "to-orange-500", installed: false, popular: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function AppCard({ app }: { app: AppEntry }) {
    return (
        <Link
            href={`/settings/integrations/${app.id}`}
            className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-indigo-500/50 hover:bg-[#0D1928] transition-all group flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br transition-transform group-hover:scale-110 ${app.colorFrom} ${app.colorTo} flex items-center justify-center text-white text-xl font-black shadow-lg`}
                    aria-hidden="true"
                >
                    {app.icon}
                </div>
                {app.installed && <Badge variant="success">Installed</Badge>}
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{app.name}</h3>
            <p className="text-xs text-indigo-400 mb-2 font-medium">{app.cat}</p>
            <p className="text-sm text-[#8899AA] line-clamp-3 mb-6 flex-1">{app.desc}</p>
            <div className="flex items-center text-sm font-bold text-[#556677] group-hover:text-white transition-colors">
                {app.installed ? "Manage App" : "Learn More"}
                <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
            </div>
        </Link>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function IntegrationMarketplacePage() {
    const [activeCat, setActiveCat] = useState<AppCategory>("All App");
    const [query, setQuery] = useState("");

    const filteredApps = APPS.filter(
        (app) =>
            (activeCat === "All App" || app.cat === activeCat) &&
            (query === "" || app.name.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <Page
            title="App Marketplace"
            subtitle="Connect Kaarya with your favorite tools to automate workflows."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Integrations" },
            ]}
            maxWidth="1200px"
            actions={
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Search integrations…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search integrations"
                        className="w-64 pl-9 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-white focus:border-indigo-500 outline-none"
                    />
                </div>
            }
        >
            <div className="space-y-8">
                {/* Featured Hero */}
                <Card padding="lg" variant="elevated" className="border-indigo-500/20 bg-gradient-to-r from-indigo-900/50 to-[#0A1420] overflow-hidden relative">
                    <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30">
                                <Star size={12} className="fill-indigo-400" aria-hidden="true" /> Featured Integration
                            </div>
                            <h2 className="text-3xl font-black text-white leading-tight">Automate Provisioning<br />with Okta</h2>
                            <p className="text-[#8899AA] text-base max-w-md">Sync employee directory changes directly to Okta to instantly provision or de-provision software access based on roles.</p>
                            <Button>View Integration</Button>
                        </div>
                        <div className="w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-5xl font-black shadow-[0_0_50px_rgba(37,99,235,0.4)] rotate-12 transition-transform hover:rotate-0 duration-500" aria-hidden="true">
                            O
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <nav aria-label="Integration categories" className="w-full md:w-48 shrink-0">
                        <h3 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-4 px-3 flex items-center gap-2">
                            <SlidersHorizontal size={14} aria-hidden="true" /> Categories
                        </h3>
                        <ul className="space-y-2">
                            {CATEGORIES.map((c) => (
                                <li key={c}>
                                    <button
                                        onClick={() => setActiveCat(c)}
                                        aria-current={activeCat === c ? "page" : undefined}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            activeCat === c ? "bg-[#1A2A3A] text-white" : "text-[#8899AA] hover:bg-[#0A1420] hover:text-[#CCDDEE]"
                                        }`}
                                    >
                                        {c}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* App Grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredApps.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))}
                        {filteredApps.length === 0 && (
                            <div className="col-span-3 text-center py-12 text-[#8899AA]">
                                <PackageSearch size={40} className="mx-auto mb-3 text-[#2A3A4A]" aria-hidden="true" />
                                <p className="text-sm">No integrations found for &ldquo;{query}&rdquo;</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Page>
    );
}
