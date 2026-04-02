"use client";
import React from 'react';
import {
    Laptop, Monitor, Smartphone, Server, FileText,
    AlertTriangle, CheckCircle, Clock, Search, Filter, Plus, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const QUICK_STATS = [
    { label: 'Total Assets', value: '1,248', trend: '+12 this month', icon: Server, color: 'text-[#33E6FF]', bg: 'bg-[#33E6FF]/10' },
    { label: 'Assigned', value: '984', trend: '79% utilization', icon: CheckCircle, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
    { label: 'Available', value: '186', trend: 'Ready to deploy', icon: Laptop, color: 'text-[#FFB020]', bg: 'bg-[#FFB020]/10' },
    { label: 'Maintenance', value: '42', trend: 'Requires attention', icon: AlertTriangle, color: 'text-[#FF4444]', bg: 'bg-[#FF4444]/10' },
];

const RECENT_REQUESTS = [
    { id: 'REQ-2023-001', user: 'Sarah Connor', item: 'MacBook Pro 16"', status: 'Pending Approval', date: '2 hrs ago' },
    { id: 'REQ-2023-002', user: 'John Smith', item: 'Dell UltraSharp 27"', status: 'Approved', date: '5 hrs ago' },
    { id: 'REQ-2023-003', user: 'Maria Garcia', item: 'iPhone 14 Pro', status: 'Deployed', date: '1 day ago' },
    { id: 'REQ-2023-004', user: 'David Chen', item: 'Magic Keyboard', status: 'Pending Approval', date: '1 day ago' },
];

export default function ITDashboardScreen() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">IT Provisioning Dashboard</h1>
                    <p className="text-[#8899AA]">Manage hardware assets, software licenses, and IT requests.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/it/assets/add" className="px-4 py-2 bg-[#33E6FF] text-[#0A1420] font-bold text-sm rounded-xl hover:bg-[#29b8cc] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                        <Plus size={16} /> Add Asset
                    </Link>
                    <Link href="/it/requests/new" className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        New Request
                    </Link>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {QUICK_STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl hover:border-[#445566] transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <Icon size={24} className={stat.color} />
                                </div>
                            </div>
                            <p className="text-[#8899AA] text-sm font-bold mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white mb-2">{stat.value}</h3>
                            <p className={`text-xs font-bold ${stat.color}`}>{stat.trend}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Area */}
                <div className="col-span-1 lg:col-span-2 space-y-8">

                    {/* Asset Categories */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-lg">Assets by Category</h3>
                            <Link href="/it/assets" className="text-sm font-bold text-[#33E6FF] hover:underline flex items-center gap-1">
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: 'Laptops', count: 842, icon: Laptop, color: '#33E6FF' },
                                { name: 'Monitors', count: 456, icon: Monitor, color: '#00E5A0' },
                                { name: 'Mobiles', count: 124, icon: Smartphone, color: '#FFB020' },
                                { name: 'Licenses', count: 2450, icon: FileText, color: '#A066FF' }
                            ].map((cat, i) => {
                                const Icon = cat.icon;
                                return (
                                    <div key={i} className="bg-[#1A2A3A] border border-[#2A3A4A] p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-[#152336] transition-colors cursor-pointer group">
                                        <Icon size={32} color={cat.color} className="mb-3 group-hover:scale-110 transition-transform" />
                                        <p className="text-white font-black text-xl mb-1">{cat.count}</p>
                                        <p className="text-[#8899AA] text-xs font-bold uppercase tracking-wider">{cat.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Recent Requests Table */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-lg">Recent Provisioning Requests</h3>
                            <button className="text-sm font-bold text-[#8899AA] hover:text-white transition-colors">
                                Manage Requests
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[#2A3A4A]">
                                        <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Request ID</th>
                                        <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Requested By</th>
                                        <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Item/Software</th>
                                        <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Status</th>
                                        <th className="pb-3 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {RECENT_REQUESTS.map((req, i) => (
                                        <tr key={i} className="hover:bg-[#152336] transition-colors">
                                            <td className="py-4 text-sm font-bold text-white">{req.id}</td>
                                            <td className="py-4 text-sm text-[#8899AA]">{req.user}</td>
                                            <td className="py-4 text-sm text-white font-medium">{req.item}</td>
                                            <td className="py-4">
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${req.status === 'Approved' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : req.status === 'Deployed' ? 'bg-[#33E6FF]/10 text-[#33E6FF]' : 'bg-[#FFB020]/10 text-[#FFB020]'}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-sm text-[#8899AA]">{req.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="col-span-1 space-y-6">

                    {/* Alerts */}
                    <div className="bg-[#1A2A3A] border border-[#FF4444]/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(255,68,68,0.1)]">
                        <h3 className="text-[#FF4444] font-bold mb-4 flex items-center gap-2">
                            <AlertTriangle size={18} /> Action Required
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-[#0F1C2E] p-4 rounded-xl border border-[#2A3A4A]">
                                <p className="text-sm font-bold text-white mb-1">12 Orphaned Licenses</p>
                                <p className="text-xs text-[#8899AA] mb-3">Adobe CC licenses assigned to offboarded employees.</p>
                                <button className="text-xs font-bold text-[#FF4444] hover:underline">Revoke Access →</button>
                            </div>
                            <div className="bg-[#0F1C2E] p-4 rounded-xl border border-[#2A3A4A]">
                                <p className="text-sm font-bold text-white mb-1">Low Inventory Alert</p>
                                <p className="text-xs text-[#8899AA] mb-3">Only 3 MacBook Pro 14" remaining in unassigned pool.</p>
                                <button className="text-xs font-bold text-[#FFB020] hover:underline">Initiate Procurement →</button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/it/assets/assign" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A2A3A] transition-colors group">
                                <span className="text-sm font-bold text-[#8899AA] group-hover:text-white transition-colors">Assign Asset</span>
                                <ArrowRight size={16} className="text-[#2A3A4A] group-hover:text-[#33E6FF] transition-colors" />
                            </Link>
                            <Link href="/it/software/orphaned" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A2A3A] transition-colors group">
                                <span className="text-sm font-bold text-[#8899AA] group-hover:text-white transition-colors">Audit Software Licenses</span>
                                <ArrowRight size={16} className="text-[#2A3A4A] group-hover:text-[#33E6FF] transition-colors" />
                            </Link>
                            <Link href="/it/maintenance" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A2A3A] transition-colors group">
                                <span className="text-sm font-bold text-[#8899AA] group-hover:text-white transition-colors">Schedule Maintenance</span>
                                <ArrowRight size={16} className="text-[#2A3A4A] group-hover:text-[#33E6FF] transition-colors" />
                            </Link>
                            <Link href="/it/reports" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1A2A3A] transition-colors group">
                                <span className="text-sm font-bold text-[#8899AA] group-hover:text-white transition-colors">IT Reports</span>
                                <ArrowRight size={16} className="text-[#2A3A4A] group-hover:text-[#33E6FF] transition-colors" />
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
