"use client";

import { Search, Filter, Plus, ShieldCheck, Download, Users, Key, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Mock Data ---
interface SoftwareLicense {
    id: number;
    name: string;
    category: string;
    total: number;
    used: number;
    status: "Active" | "No Seats Left";
    vendor: string;
    cost: string;
    icon: string;
}

const softwareList: SoftwareLicense[] = [
    { id: 1, name: "Adobe Creative Cloud", category: "Design", total: 50, used: 48, status: "Active", vendor: "Adobe", cost: "₹ 4,200/mo", icon: "🎨" },
    { id: 2, name: "Microsoft 365 E3", category: "Productivity", total: 200, used: 195, status: "Active", vendor: "Microsoft", cost: "₹ 2,400/mo", icon: "🏢" },
    { id: 3, name: "Figma Organization", category: "Design", total: 30, used: 30, status: "No Seats Left", vendor: "Figma", cost: "₹ 3,600/mo", icon: "✨" },
    { id: 4, name: "Jira Premium", category: "Engineering", total: 100, used: 85, status: "Active", vendor: "Atlassian", cost: "₹ 1,100/mo", icon: "🛠️" },
    { id: 5, name: "Salesforce Enterprise", category: "Sales", total: 40, used: 40, status: "Active", vendor: "Salesforce", cost: "₹ 12,500/mo", icon: "☁️" },
];

export default function SoftwareLicenseScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Software & Licenses</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Manage SaaS subscriptions, software licenses, and access</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={<Download size={16} />}>Export</Button>
                    <Button variant="primary" icon={<Plus size={16} />}>Add Software</Button>
                </div>
            </header>

            {/* Overview Cards */}
            <section aria-label="Quick Stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 mt-4">
                {[
                    { label: "Active Subscriptions", value: "42", color: "#00E5A0", icon: ShieldCheck },
                    { label: "Total Licenses", value: "845", color: "#0066FF", icon: Key },
                    { label: "Assigned Seats", value: "790", color: "#8899AA", icon: Users },
                    { label: "Expiring Soon", value: "3", color: "#FFB800", icon: AlertTriangle },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl flex justify-between items-center group hover:border-[#334455] transition-colors shadow-sm">
                            <div>
                                <h2 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-2 group-hover:text-white transition-colors">{stat.label}</h2>
                                <div className="text-3xl font-bold text-white leading-none">{stat.value}</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                <Icon size={24} color={stat.color} />
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative flex-grow max-w-md">
                    <label htmlFor="search-software" className="sr-only">Search software</label>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={16} aria-hidden="true" />
                    <input
                        id="search-software"
                        type="search"
                        placeholder="Search software names or vendors..."
                        className="w-full h-11 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors placeholder-[#445566]"
                    />
                </div>
                <Button variant="secondary" icon={<Filter size={16} />} className="h-11">Category</Button>
                <Button variant="secondary" icon={<Filter size={16} />} className="h-11">Status</Button>
            </div>

            {/* Software List Table */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm overflow-hidden" aria-label="Software Licenses Table">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse cursor-default min-w-[800px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#0A1420]/50">
                                <th scope="col" className="p-4 px-6 text-xs font-semibold text-[#8899AA] uppercase tracking-wider whitespace-nowrap">Software Name</th>
                                <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Category</th>
                                <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Seats (Used / Total)</th>
                                <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Cost / License</th>
                                <th scope="col" className="p-4 px-6 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {softwareList.map((sw) => {
                                const utilization = (sw.used / sw.total) * 100;
                                return (
                                    <tr key={sw.id} className="hover:bg-[#1A2A3A]/40 transition-colors group">
                                        <td className="p-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center text-lg shadow-inner flex-shrink-0" aria-hidden="true">
                                                    {sw.icon}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">{sw.name}</div>
                                                    <div className="text-xs text-[#8899AA] mt-0.5">{sw.vendor}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded border text-xs font-medium text-[#8899AA] bg-[#1A2A3A] border-[#334455]">
                                                {sw.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1.5 w-32">
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span className="text-white">{sw.used}</span>
                                                    <span className="text-[#8899AA]">/ {sw.total}</span>
                                                </div>
                                                <div
                                                    className="w-full h-1.5 bg-[#060B14] border border-[#1A2A3A] rounded-full overflow-hidden"
                                                    role="progressbar"
                                                    aria-valuenow={sw.used}
                                                    aria-valuemin={0}
                                                    aria-valuemax={sw.total}
                                                    aria-label={`${utilization.toFixed(0)}% seats utilized`}
                                                >
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${utilization}%`,
                                                            backgroundColor: utilization >= 100 ? '#FF4444' : utilization > 80 ? '#FFB800' : '#00E5A0'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-medium 
                                                ${sw.status === 'No Seats Left' ? 'text-[#FF4444] bg-[#FF4444]/10 border-[#FF4444]/20' : 'text-[#00E5A0] bg-[#00E5A0]/10 border-[#00E5A0]/20'}`}>
                                                {sw.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#8899AA] font-mono">{sw.cost}</td>
                                        <td className="p-4 px-6 text-right">
                                            <Button variant="secondary" className="h-8 text-xs font-semibold">Manage</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    );
}
