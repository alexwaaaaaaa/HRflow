"use client";

import { Monitor, Laptop, Server, Tag, User, MapPin, Calendar, Clock, AlertTriangle, FileText, Settings, History, Wrench, RefreshCw, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

// --- Types & Interfaces ---
interface SpecItem {
    label: string;
    value: string;
}

interface TimelineEvent {
    title: string;
    desc: string;
    date: string;
    icon: React.ElementType;
}

// --- Mock Data ---
const ASSET_SPECS: SpecItem[] = [
    { label: "Manufacturer", value: "Apple Inc." },
    { label: "Model", value: "MacBook Pro 16-inch (2023)" },
    { label: "Processor", value: "Apple M2 Max (12-core CPU)" },
    { label: "Memory (RAM)", value: "32 GB Unified Memory" },
    { label: "Storage", value: "1 TB SSD" },
    { label: "OS Version", value: "macOS Sonoma 14.1" },
];

const TIMELINE_EVENTS: TimelineEvent[] = [
    { title: "Software Updated", desc: "macOS Sonoma 14.1 installed via MDM", date: "12 Oct 2024", icon: Settings },
    { title: "Assigned to Sarah Connor", desc: "Asset handover confirmed", date: "15 Jan 2024", icon: User },
    { title: "Added to Inventory", desc: "Procured and added by IT Admin", date: "12 Dec 2023", icon: FileText },
];

// --- Sub-Components ---
function SpecGroup({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <dt className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider">{label}</dt>
            <dd className="text-sm text-white font-medium">{value}</dd>
        </div>
    );
}

function TimelineItem({ event }: { event: TimelineEvent }) {
    const Icon = event.icon;
    return (
        <li className="relative pl-6">
            <span
                className="absolute -left-3.5 top-0 w-7 h-7 bg-[#060B14] border border-[#1A2A3A] rounded-full flex items-center justify-center z-10"
                aria-hidden="true"
            >
                <Icon size={12} className="text-[#8899AA]" />
            </span>
            <div className="text-sm font-semibold text-white">{event.title}</div>
            <div className="text-xs text-[#8899AA] mt-1">{event.desc}</div>
            <time className="block text-xs text-[#445566] mt-2 font-medium" dateTime={new Date(event.date).toISOString()}>
                {event.date}
            </time>
        </li>
    );
}

// --- Main Page Component ---
export default function AssetDetailScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-6xl mx-auto min-h-screen">

            {/* Breadcrumb & Actions */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <nav aria-label="Breadcrumb" className="text-sm font-medium text-[#8899AA] flex items-center gap-2">
                    <Link href="/it-provisioning/assets" className="hover:text-white hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-[#0066FF] rounded">IT Assets</Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-white" aria-current="page">AST-001</span>
                </nav>
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="secondary" icon={<Wrench size={16} />}>Request Maintenance</Button>
                    <Button variant="secondary" icon={<RefreshCw size={16} />}>Reassign</Button>
                    <Button variant="primary" icon={<Settings size={16} />}>Edit Asset</Button>
                </div>
            </header>

            {/* Overview Profile Card */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start gap-6 sm:gap-8 shadow-sm" aria-label="Asset Overview">
                <div
                    className="w-32 h-32 rounded-2xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center flex-shrink-0 shadow-inner"
                    aria-hidden="true"
                >
                    <Laptop size={64} className="text-[#445566]" />
                </div>
                <div className="flex-grow pt-2">
                    <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">MacBook Pro 16" M2 Max</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-2.5 py-1 rounded-md font-medium tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" aria-hidden="true" />
                            Assigned
                        </span>
                        <span className="flex items-center gap-1.5 text-[#8899AA] px-2 py-1 bg-[#1A2A3A]/50 rounded-md border border-transparent">
                            <Tag size={14} aria-hidden="true" /> <span className="font-mono">AST-001</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[#8899AA] px-2 py-1 bg-[#1A2A3A]/50 rounded-md border border-transparent">
                            <Server size={14} aria-hidden="true" /> <span className="font-mono">SRN-A98B7C6D5</span>
                        </span>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Details Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* General Info */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm" aria-labelledby="specs-heading">
                        <header className="p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50 rounded-t-2xl">
                            <h2 id="specs-heading" className="text-lg font-bold text-white m-0 tracking-tight">Hardware Specifications</h2>
                        </header>
                        <div className="p-6">
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                {ASSET_SPECS.map((spec, i) => (
                                    <SpecGroup key={i} label={spec.label} value={spec.value} />
                                ))}
                            </dl>
                        </div>
                    </section>

                    {/* Assignment Info */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm" aria-labelledby="assignment-heading">
                        <header className="p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50 rounded-t-2xl">
                            <h2 id="assignment-heading" className="text-lg font-bold text-white m-0 tracking-tight">Current Assignment</h2>
                        </header>
                        <div className="p-6">
                            {/* Employee Card */}
                            <a href="/it-provisioning/vendors" className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-[#060B14] border border-[#1A2A3A] hover:border-[#334455] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] group">
                                <div className="relative flex-shrink-0">
                                    <img src="https://i.pravatar.cc/150?u=sarah" alt="Profile of Sarah Connor" className="w-12 h-12 rounded-full border border-[#1A2A3A] object-cover" />
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00E5A0] border-2 border-[#060B14] rounded-full" aria-label="Status: Active"></span>
                                </div>
                                <div>
                                    <div className="text-white font-bold group-hover:text-[#00E5A0] transition-colors">Sarah Connor</div>
                                    <div className="text-sm text-[#8899AA] mt-0.5">Lead Product Designer • Design Team</div>
                                </div>
                            </a>

                            {/* Assignment Details */}
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                <div className="flex flex-col gap-1">
                                    <dt className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider flex items-center gap-1.5">
                                        <Calendar size={14} aria-hidden="true" /> Assigned Date
                                    </dt>
                                    <dd className="text-sm text-white font-medium">15 Jan 2024</dd>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <dt className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider flex items-center gap-1.5">
                                        <MapPin size={14} aria-hidden="true" /> Location
                                    </dt>
                                    <dd className="text-sm text-white font-medium">Bangalore Office (Desk B42)</dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <aside className="space-y-8">

                    {/* Lifecycle & Purchase */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm" aria-labelledby="procurement-heading">
                        <header className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]/50 rounded-t-2xl">
                            <h2 id="procurement-heading" className="text-base font-bold text-white m-0 tracking-tight">Procurement Details</h2>
                        </header>
                        <div className="p-5 space-y-5">
                            <dl className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <dt className="text-xs text-[#8899AA] font-medium">Purchase Date</dt>
                                    <dd className="text-sm text-white">10 Dec 2023</dd>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <dt className="text-xs text-[#8899AA] font-medium">Purchase Cost</dt>
                                    <dd className="text-sm text-white font-medium">₹ 2,49,900</dd>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <dt className="text-xs text-[#8899AA] font-medium">Vendor</dt>
                                    <dd>
                                        <a href="/settings/vendors" className="text-sm font-medium text-[#0066FF] hover:underline focus:outline-none focus:ring-1 focus:ring-[#0066FF] rounded">Apple Authorized Retail Enterprise</a>
                                    </dd>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <dt className="text-xs text-[#8899AA] font-medium">Warranty Expiry</dt>
                                    <dd className="text-sm text-white flex items-center justify-between">
                                        <span>09 Dec 2026</span>
                                        <span className="inline-flex items-center gap-1 text-[#00E5A0] text-xs font-semibold bg-[#00E5A0]/10 px-2 py-0.5 rounded">
                                            Active
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </section>

                    {/* Timeline */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm flex flex-col" aria-labelledby="history-heading">
                        <header className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]/50 rounded-t-2xl">
                            <h2 id="history-heading" className="text-base font-bold text-white m-0 flex items-center gap-2 tracking-tight">
                                <History size={16} aria-hidden="true" className="text-[#8899AA]" /> Asset History
                            </h2>
                        </header>
                        <div className="p-5 pt-6 flex-grow">
                            <ol className="relative border-l border-[#1A2A3A] ml-3.5 space-y-8">
                                {TIMELINE_EVENTS.map((event, i) => (
                                    <TimelineItem key={i} event={event} />
                                ))}
                            </ol>
                        </div>
                        <footer className="p-5 pt-0">
                            <Button variant="secondary" className="w-full">View Full History</Button>
                        </footer>
                    </section>
                </aside>
            </div>
        </main>
    );
}
