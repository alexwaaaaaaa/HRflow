"use client";

import { Wrench, Plus, CheckCircle2, Clock, CheckSquare, Search, Filter } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AssetMaintenanceScreen() {
    const maintenanceTasks = [
        { id: "MNT-101", asset: "MacBook Pro 16\" (AST-006)", type: "Repair", status: "In Progress", priority: "High", vendor: "Apple Care", ETA: "12 Nov 2024" },
        { id: "MNT-102", asset: "Office Printer A (AST-042)", type: "Routine Servicing", status: "Pending", priority: "Medium", vendor: "PrintTech Ltd", ETA: "15 Nov 2024" },
        { id: "MNT-103", asset: "Dell XPS 13 (AST-012)", type: "Battery Replacement", status: "Completed", priority: "Low", vendor: "In-house IT", ETA: "05 Nov 2024" },
    ];

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Maintenance Requests</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Track repairs, services, and hardware maintenance</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="primary" icon={<Plus size={16} />}>Log Maintenance</Button>
                </div>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-4 gap-6 mb-8 mt-4">
                {[
                    { label: "Active Repairs", value: "8", color: "#FFB800", icon: Wrench },
                    { label: "Pending Service", value: "3", color: "#0066FF", icon: Clock },
                    { label: "Completed (30d)", value: "24", color: "#00E5A0", icon: CheckCircle2 },
                    { label: "Cost (30d)", value: "₹ 42,500", color: "#8899AA", icon: CheckSquare },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl flex items-center justify-between">
                            <div>
                                <div className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider mb-2">{stat.label}</div>
                                <div className="text-3xl font-bold text-white leading-none">{stat.value}</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center">
                                <Icon size={24} color={stat.color} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ticket ID or asset..."
                        className="w-full h-11 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors"
                    />
                </div>
                <Button variant="secondary" icon={<Filter size={16} />}>Status</Button>
                <Button variant="secondary" icon={<Filter size={16} />}>Vendor</Button>
            </div>

            {/* List */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse cursor-default">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#0A1420]">
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider whitespace-nowrap">Ticket ID</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Asset / Item</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Vendor / Assignee</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">ETA</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {maintenanceTasks.map((task, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors group">
                                    <td className="p-4 text-sm font-medium text-white">{task.id}</td>
                                    <td className="p-4 text-sm text-white">{task.asset}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{task.type}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-medium 
                                            ${task.status === 'Completed' ? 'text-[#00E5A0] bg-[#00E5A0]/10 border-[#00E5A0]/20' :
                                                task.status === 'In Progress' ? 'text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/20' :
                                                    'text-[#0066FF] bg-[#0066FF]/10 border-[#0066FF]/20'}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA]">{task.vendor}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{task.ETA}</td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <Button variant="secondary" className="h-8">Update</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
