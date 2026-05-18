"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Monitor, Laptop, Server, Smartphone, AlertCircle, ArrowUpRight, Plus, Scan } from 'lucide-react';
import Link from 'next/link';

const TICKET_STATUS_CLASSES: Record<"amber" | "blue" | "emerald", string> = {
    amber: "px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20",
    blue: "px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20",
    emerald: "px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
} as const;

export default function AssetDashboardScreen() {
    return (
        <Page
            title="IT Asset Dashboard"
            subtitle="Real-time overview of hardware inventory, software licenses, and IT support."
            breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Dashboard" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Monitor size={24} className="text-cyan-400" /> IT Asset Dashboard</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Real-time overview of hardware inventory, software licenses, and IT support.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/assets/inventory" className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Scan size={16} /> Scan QR
                    </Link>
                    <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                        <Plus size={16} /> Add Asset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Laptop, label: 'Total Laptops', value: '472', sub: 'Active & In Stock', color: 'text-indigo-400' },
                    { icon: Smartphone, label: 'Mobile Devices', value: '185', sub: 'Assigned to Sales/Exec', color: 'text-emerald-400' },
                    { icon: Server, label: 'Accessories', value: '1,204', sub: 'Monitors, Mice, Keyboards', color: 'text-blue-400' },
                    { icon: AlertCircle, label: 'Pending Repairs', value: '14', sub: 'Across 3 locations', color: 'text-rose-400', alert: true },
                ].map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (


                        <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl bg-[#131B2B] border border-[#2A3A4A] ${kpi.color}`}>
                                    <Icon size={20} />
                                </div>
                                {kpi.alert && <span className="bg-rose-500/10 text-rose-400 text-[10px] font-bold px-2 py-1 rounded uppercase animate-pulse">Action Req</span>}
                            </div>
                            <div className="relative z-10">
                                <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">{kpi.label}</div>
                                <div className="text-3xl font-black text-white mb-1">{kpi.value}</div>
                                <div className="text-[#556677] text-xs">{kpi.sub}</div>
                            </div>
                        </div>
                    
        
)
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-6">Asset Allocation Status</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white font-bold">Assigned to Employees</span>
                                    <span className="text-white font-mono">1,402 (75%)</span>
                                </div>
                                <div className="w-full h-3 bg-[#131B2B] rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500" style={{ width: '75%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white font-bold">Available in IT Stockroom</span>
                                    <span className="text-white font-mono">374 (20%)</span>
                                </div>
                                <div className="w-full h-3 bg-[#131B2B] rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500" style={{ width: '20%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white font-bold">In Repair / End of Life</span>
                                    <span className="text-white font-mono">85 (5%)</span>
                                </div>
                                <div className="w-full h-3 bg-[#131B2B] rounded-full overflow-hidden">
                                    <div className="h-full bg-rose-500" style={{ width: '5%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-3 mb-4">
                            <h3 className="text-white font-bold">Recent IT Service Tickets</h3>
                            <Link href="/assets/tickets" className="text-cyan-400 text-xs font-bold hover:text-cyan-300">View All</Link>
                        </div>
                        <div className="space-y-3">
                            {[
                                { id: 'TKT-902', issue: 'MacBook Battery Draining Fast', user: 'Jason Smith', status: 'Open', color: 'amber' as const },
                                { id: 'TKT-901', issue: 'Need Adobe Creative Cloud License', user: 'Emma Wong', status: 'In Progress', color: 'blue' as const },
                                { id: 'TKT-895', issue: 'Monitor Not Displaying', user: 'Rahul K', status: 'Resolved', color: 'emerald' as const },
                            ].map((tkt, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A]">
                                    <div>
                                        <div className="text-white text-sm font-bold mb-0.5">{tkt.issue}</div>
                                        <div className="text-[#8899AA] text-xs flex gap-2">
                                            <span className="font-mono text-[#556677]">{tkt.id}</span>
                                            <span>Opened by {tkt.user}</span>
                                        </div>
                                    </div>
                                    <span className={TICKET_STATUS_CLASSES[tkt.color]}>
                                        {tkt.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-6">Upcoming Laptops EOL (Next 30 Days)</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]">42</div>
                                <div className="text-right">
                                    <div className="text-white font-bold">Devices Expiring</div>
                                    <div className="text-cyan-200 text-xs">Require replacement</div>
                                </div>
                            </div>
                            <button className="w-full bg-[#0A1420] hover:bg-[#131B2B] border border-[#2A3A4A] text-white font-bold py-2.5 rounded-xl transition-colors text-sm">
                                Initiate Refresh Cycle
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Top Software Licenses</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Google Workspace', count: '450/500', pct: 90 },
                                { name: 'Slack Enterprise', count: '420/500', pct: 84 },
                                { name: 'GitHub Copilot', count: '120/120', pct: 100 },
                            ].map((sw, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1.5 font-bold">
                                        <span className="text-[#AABBCC]">{sw.name}</span>
                                        <span className={`${sw.pct >= 95 ? 'text-rose-400' : 'text-white'}`}>{sw.count}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#131B2B] rounded-full overflow-hidden">
                                        <div className={`h-full ${sw.pct >= 95 ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'}`} style={{ width: `${sw.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Link href="/assets/software" className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1 transition-colors">
                                Manage Licenses <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
