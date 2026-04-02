"use client";

import { Users, Key, Settings, ExternalLink, Calendar, Plus, AlertTriangle, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

// --- Mock Data ---
const ASSIGNED_USERS = [
    { name: "Sarah Connor", email: "sarah@company.com", dept: "Design", date: "15 Jan 2024", avatarId: 10 },
    { name: "John Smith", email: "john@company.com", dept: "Marketing", date: "10 Feb 2024", avatarId: 22 },
    { name: "Kyle Reese", email: "kyle@company.com", dept: "Product", date: "02 Mar 2024", avatarId: 33 },
];

export default function SoftwareDetailScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-6xl mx-auto min-h-screen">

            {/* Breadcrumb & Actions */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <nav aria-label="Breadcrumb" className="text-sm font-medium text-[#8899AA] flex items-center gap-2">
                    <Link href="/it-provisioning/software" className="cursor-pointer hover:text-white transition-colors focus:outline-none focus:underline">
                        Software & Licenses
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-white" aria-current="page">Adobe Creative Cloud</span>
                </nav>
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="secondary" icon={<ExternalLink size={16} />} className="text-xs h-9 px-3">Admin Portal</Button>
                    <Button variant="secondary" icon={<Settings size={16} />} className="text-xs h-9 px-3" aria-label="Software Settings">Settings</Button>
                    <Button variant="primary" icon={<Plus size={16} />} className="text-xs h-9 px-3">Assign License</Button>
                </div>
            </header>

            {/* Overview Card */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative overflow-hidden shadow-sm" aria-labelledby="software-title">
                <div className="w-24 h-24 rounded-2xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center flex-shrink-0 text-5xl shadow-inner z-10" aria-hidden="true">
                    🎨
                </div>
                <div className="flex-grow z-10 text-center md:text-left">
                    <h1 id="software-title" className="text-3xl font-bold text-white mb-3 md:mb-2 tracking-tight">Adobe Creative Cloud</h1>
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 text-sm mt-2">
                        <span className="inline-flex items-center gap-1.5 text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-2.5 py-1 rounded-md font-medium text-xs">
                            <ShieldCheck size={14} aria-hidden="true" /> Active Subscription
                        </span>
                        <span className="text-[#8899AA]">Vendor: <span className="text-white font-medium">Adobe Inc.</span></span>
                        <span className="text-[#8899AA]" aria-hidden="true">•</span>
                        <span className="text-[#8899AA]">Category: <span className="text-white font-medium">Design & Media</span></span>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute -right-10 -top-10 text-[180px] opacity-5 pointer-events-none filter blur-sm select-none" aria-hidden="true">🎨</div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Seat Utilization */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm" aria-labelledby="utilization-heading">
                        <header className="flex justify-between items-center mb-6">
                            <h2 id="utilization-heading" className="text-lg font-bold text-white m-0">License Utilization</h2>
                            <Button variant="secondary" className="h-8 text-xs font-semibold px-3">Buy More Seats</Button>
                        </header>

                        <div className="flex items-end gap-3 mb-4">
                            <div className="text-5xl font-bold text-white leading-none tracking-tight">48</div>
                            <div className="pb-1 text-lg text-[#8899AA] font-medium">/ 50 Seats Used</div>
                        </div>

                        <div
                            className="w-full h-3 bg-[#060B14] rounded-full overflow-hidden mb-6 border border-[#1A2A3A]"
                            role="progressbar"
                            aria-valuenow={48}
                            aria-valuemin={0}
                            aria-valuemax={50}
                            aria-label="96% seats utilized"
                        >
                            <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#FFB800] w-[96%] rounded-full shadow-[0_0_10px_rgba(255,184,0,0.5)] transition-all duration-1000 ease-out"></div>
                        </div>

                        <div className="flex p-4 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 gap-3 text-sm" role="alert">
                            <AlertTriangle className="text-[#FFB800] flex-shrink-0 mt-0.5" size={16} aria-hidden="true" />
                            <div className="text-[#FFB800]/90 leading-relaxed">
                                <strong className="font-bold text-[#FFB800]">Almost at capacity!</strong> Only 2 seats remaining. Approvals for new CC requests might be delayed until more licenses are procured or inactive ones are revoked.
                            </div>
                        </div>
                    </section>

                    {/* Assigned Users */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col shadow-sm" aria-labelledby="users-heading">
                        <header className="p-6 border-b border-[#1A2A3A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0A1420]/50 rounded-t-2xl">
                            <h2 id="users-heading" className="text-lg font-bold text-white m-0">Assigned Users (48)</h2>
                            <div className="w-full sm:w-auto">
                                <label htmlFor="search-users" className="sr-only">Search assigned users</label>
                                <input
                                    id="search-users"
                                    type="search"
                                    placeholder="Search users..."
                                    className="w-full sm:w-56 h-9 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors placeholder-[#445566]"
                                />
                            </div>
                        </header>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse cursor-default min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-[#1A2A3A] bg-[#0A1420]/30">
                                        <th scope="col" className="p-4 px-6 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Employee</th>
                                        <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Department</th>
                                        <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Assigned On</th>
                                        <th scope="col" className="p-4 px-6 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {ASSIGNED_USERS.map((user, i) => (
                                        <tr key={i} className="hover:bg-[#1A2A3A]/40 transition-colors group">
                                            <td className="p-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`https://i.pravatar.cc/150?u=${user.avatarId}`}
                                                        alt={`${user.name}'s avatar`}
                                                        className="w-8 h-8 rounded-full border border-[#1A2A3A] bg-[#1A2A3A]"
                                                        loading="lazy"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-bold text-white">{user.name}</div>
                                                        <div className="text-xs text-[#8899AA] mt-0.5">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-[#8899AA] font-medium">{user.dept}</td>
                                            <td className="p-4 text-sm text-[#8899AA]">{user.date}</td>
                                            <td className="p-4 px-6 text-right">
                                                <Button
                                                    variant="secondary"
                                                    className="h-8 text-xs font-semibold hover:border-[#FF4444] hover:text-[#FF4444] hover:bg-[#FF4444]/5 transition-all"
                                                    aria-label={`Revoke license from ${user.name}`}
                                                >
                                                    Revoke
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <footer className="p-3 border-t border-[#1A2A3A] text-center bg-[#0A1420]/30 rounded-b-2xl">
                            <button className="text-sm text-[#0066FF] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 focus:ring-offset-[#0D1928] rounded px-2 py-1 transition-all">
                                View All 48 Users
                            </button>
                        </footer>
                    </section>
                </div>

                {/* Sidebar Column */}
                <aside className="space-y-6 lg:space-y-8" aria-label="Software Administration Details">

                    {/* Subscription Details */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm" aria-labelledby="billing-heading">
                        <h2 id="billing-heading" className="text-base font-bold text-white mb-6">Contract & Billing</h2>
                        <div className="space-y-5">
                            <div>
                                <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1.5">Billing Cycle</h3>
                                <div className="text-sm text-white font-medium flex justify-between">
                                    Annual (Billed Monthly)
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1.5">Cost Per License</h3>
                                <div className="text-sm text-white font-mono font-medium">₹ 4,200 <span className="text-[#8899AA] text-xs">/ month</span></div>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1.5">Total Monthly Cost</h3>
                                <div className="text-lg text-white font-bold font-mono">₹ 2,10,000</div>
                            </div>
                            <div className="pt-5 border-t border-[#1A2A3A]">
                                <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Calendar size={14} aria-hidden="true" /> Renewal Date
                                </h3>
                                <div className="text-sm text-white font-medium">15 Nov 2024</div>
                                <p className="text-xs text-[#445566] mt-1.5 flex items-center gap-1.5">
                                    <ShieldCheck size={12} className="text-[#00E5A0]" /> Auto-renews automatically
                                </p>
                            </div>
                        </div>
                    </section>
                </aside>
            </div>
        </main>
    );
}
