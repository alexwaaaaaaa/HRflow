"use client";

import {
    Filter,
    BellRing,
    ArrowRight,
    Scale,
    Globe,
    Clock,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface GazetteItem {
    id: string;
    title: string;
    tag: string;
    date: string;
    location: string;
}

const GAZETTE_ITEMS: GazetteItem[] = [
    { id: "REG-0921", title: "Extension of due date for ESI contributions for March 2024", tag: "ESIC", date: "5 days ago", location: "Central" },
    { id: "REG-0920", title: "Mandatory online registration under Shop & Establishment", tag: "S&E Act", date: "1 week ago", location: "Maharashtra" },
    { id: "REG-0919", title: "SOP for Joint Declaration correction in UAN database", tag: "EPFO", date: "2 weeks ago", location: "Central" },
    { id: "REG-0918", title: "Revision of LWF Employer Contribution Rates", tag: "LWF", date: "2 weeks ago", location: "Karnataka" },
];

const TOPICS = ["EPFO Updates", "Income Tax / TDS", "State Professional Tax", "Labour Law Codes"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GazetteMonitor() {
    return (
        <Page
            title="Gazette Monitor"
            subtitle="Live tracking of official government notifications and labour law amendments."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Gazette Monitor" },
            ]}
            maxWidth="1280px"
            actions={
                <Button
                    variant="outline"
                    size="sm"
                    icon={<Filter size={16} aria-hidden="true" />}
                >
                    Filter
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Main feed */}
                <div className="space-y-6 lg:col-span-3">
                    {/* Featured critical update */}
                    <Card padding="lg" className="relative overflow-hidden border-indigo-500/30 bg-gradient-to-r from-[#0D1928] to-indigo-900/20">
                        <div className="mb-4 flex items-start justify-between">
                            <Badge variant="info">
                                <BellRing size={12} className="animate-pulse" aria-hidden="true" /> Critical Amendment
                            </Badge>
                            <span className="text-[10px] font-bold uppercase italic tracking-widest text-slate-400">2 days ago</span>
                        </div>
                        <h2 className="mb-2 text-xl font-black leading-snug tracking-tight text-white">
                            Notification of Minimum Wages Revision (VDA) - Delhi NCR
                        </h2>
                        <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-300">
                            The Govt. of NCT of Delhi has published the revised Variable Dearness Allowance (VDA) applicable to all
                            scheduled employments effective from 01 April 2024. This impacts PT and gross salary structuring.
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <Button
                                variant="primary"
                                size="sm"
                                iconRight={<ArrowRight size={14} aria-hidden="true" />}
                            >
                                Assess Impact
                            </Button>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                Act: Minimum Wages Act, 1948
                            </span>
                        </div>
                        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
                    </Card>

                    {/* Recent updates */}
                    <Card padding="none">
                        <div className="border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Recent Regulatory Circulars</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {GAZETTE_ITEMS.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/compliance/gazette-monitor/${item.id}`}
                                    className="group block cursor-pointer p-6 transition-all hover:bg-[#1A2A3A]/30"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="rounded border border-[#1A2A3A] bg-[#060B14] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-500">
                                                    {item.tag}
                                                </span>
                                                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-600">
                                                    <Globe size={10} aria-hidden="true" /> {item.location}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-black leading-snug text-slate-200 transition-colors group-hover:text-indigo-400">
                                                {item.title}
                                            </h4>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 text-right">
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                                <Clock size={10} aria-hidden="true" /> {item.date}
                                            </span>
                                            <ChevronRight
                                                size={16}
                                                className="mt-1 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card padding="md">
                        <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Topic Subscriptions</h3>
                        <div className="space-y-3">
                            {TOPICS.map((topic, i) => (
                                <div key={topic} className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                    <span className="text-xs font-bold text-slate-300">{topic}</span>
                                    <div
                                        className={`relative h-4 w-8 cursor-pointer rounded-full ${i < 2 ? "bg-indigo-500" : "bg-[#1A2A3A]"}`}
                                        role="switch"
                                        aria-checked={i < 2}
                                        aria-label={`Toggle ${topic} subscription`}
                                        tabIndex={0}
                                    >
                                        <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-all ${i < 2 ? "right-0.5" : "left-0.5"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl border border-dashed border-[#1A2A3A] bg-[#060B14] p-5 text-center">
                        <Scale size={24} className="text-slate-600" aria-hidden="true" />
                        <p className="text-[10px] font-bold uppercase leading-relaxed tracking-widest text-slate-500">
                            Our legal team summarizes gazettes within 48 hours of publication.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
