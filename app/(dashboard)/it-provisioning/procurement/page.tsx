"use client";

import { ShoppingCart, Plus, CheckCircle2, Clock, Search, Box } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Types ---
type PurchaseOrder = {
    id: string;
    desc: string;
    vendor: string;
    cost: string;
    status: string;
    colorClass: string;
};

// --- Mock Data ---
const PURCHASE_ORDERS: PurchaseOrder[] = [
    { id: "PO-2024-089", desc: "10x MacBook Pro 14\"", vendor: "Apple Enterprise", cost: "₹ 18,50,000", status: "Approved", colorClass: "text-[#00E5A0] bg-[#00E5A0]/10 border-[#00E5A0]/20" },
    { id: "PO-2024-090", desc: "5x Dell Ultrasharp 32\"", vendor: "Dell Technologies", cost: "₹ 2,45,000", status: "Pending Finance", colorClass: "text-[#FFB800] bg-[#FFB800]/10 border-[#FFB800]/20" },
    { id: "PO-2024-091", desc: "50x Logitech MX Master 3", vendor: "Amazon Business", cost: "₹ 4,75,000", status: "Delivered", colorClass: "text-[#8899AA] bg-[#1A2A3A] border-[#334455]" },
];

const STATS = [
    { label: "Active POs", value: "8", color: "text-[#0066FF]", bg: "bg-[#0066FF]/10", Icon: ShoppingCart },
    { label: "Pending Approval", value: "3", color: "text-[#FFB800]", bg: "bg-[#FFB800]/10", Icon: Clock },
    { label: "Received (30d)", value: "42", color: "text-[#00E5A0]", bg: "bg-[#00E5A0]/10", Icon: Box },
    { label: "Spend (30d)", value: "₹ 8.5L", color: "text-[#8899AA]", bg: "bg-[#0D1928]", Icon: CheckCircle2 },
];

export default function AssetProcurementScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Procurement</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Manage Purchase Orders, Vendors, and Hardware Requests</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" icon={<Box size={16} aria-hidden="true" />} className="h-10 border-[#1A2A3A] hover:border-[#334455] bg-[#0A1420]">Vendors</Button>
                    <Button variant="primary" icon={<Plus size={16} aria-hidden="true" />} className="h-10 shadow-[0_0_15px_rgba(0,102,255,0.15)]">Create PO</Button>
                </div>
            </header>

            {/* Quick Stats */}
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {STATS.map((stat) => (
                    <div key={stat.label} className="bg-[#0D1928] border border-[#1A2A3A] p-6 rounded-2xl flex justify-between items-center hover:border-[#334455] transition-all shadow-sm group">
                        <div>
                            <dt className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2.5">{stat.label}</dt>
                            <dd className="text-3xl font-black text-white leading-none tracking-tight">{stat.value}</dd>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} border border-[#1A2A3A] flex items-center justify-center flex-shrink-0 shadow-inner`} aria-hidden="true">
                            <stat.Icon size={22} className={stat.color} />
                        </div>
                    </div>
                ))}
            </dl>

            {/* Purchase Orders Table */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm" aria-labelledby="po-table-heading">
                <h2 id="po-table-heading" className="sr-only">Purchase Orders</h2>

                {/* Table Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col sm:flex-row justify-between gap-4 bg-[#0A1420]/50">
                    <nav className="flex gap-2" aria-label="PO Status Filter">
                        <Button variant="secondary" className="h-9 px-4 text-white border-[#334455] bg-[#1A2A3A] font-medium" aria-current="page">All Requests</Button>
                        <Button variant="secondary" className="h-9 px-4 border-transparent text-[#8899AA] hover:text-white hover:bg-[#1A2A3A]/50">Pending</Button>
                        <Button variant="secondary" className="h-9 px-4 border-transparent text-[#8899AA] hover:text-white hover:bg-[#1A2A3A]/50">Approved</Button>
                    </nav>
                    <div className="relative">
                        <label htmlFor="po-search" className="sr-only">Search by PO Number or Vendor</label>
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#445566]" size={14} aria-hidden="true" />
                        <input
                            id="po-search"
                            type="search"
                            placeholder="PO Number or Vendor..."
                            className="w-full sm:w-64 h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder-[#445566] shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#060B14]/30">
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">PO Number</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Items Requested</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Vendor</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Total Cost</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {PURCHASE_ORDERS.map((row) => (
                                <tr key={row.id} className="hover:bg-[#1A2A3A]/30 transition-colors group cursor-default">
                                    <td className="p-4 text-sm font-bold text-white font-mono">{row.id}</td>
                                    <td className="p-4 text-sm text-white font-medium">{row.desc}</td>
                                    <td className="p-4 text-sm text-[#8899AA] group-hover:text-[#AABBCC] transition-colors">{row.vendor}</td>
                                    <td className="p-4 text-sm font-bold text-white">{row.cost}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${row.colorClass}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button
                                            variant="secondary"
                                            className="h-8 text-xs hover:border-[#334455] hover:bg-[#1A2A3A] transition-all"
                                            aria-label={`View details for ${row.id}`}
                                        >
                                            View PO
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
