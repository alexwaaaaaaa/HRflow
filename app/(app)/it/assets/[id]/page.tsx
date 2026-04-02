"use client";
import React from 'react';
import {
    Laptop, CheckCircle, AlertTriangle, PenTool, Tag,
    History, ShieldCheck, MapPin, Receipt, Calendar, User, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AssetDetailScreen({ params }: { params: { id: string } }) {
    // Mock Data
    const asset = {
        id: params.id || 'AST-LTP-001',
        name: 'MacBook Pro 16" M2 Max',
        category: 'Laptop',
        status: 'Assigned',
        serial: 'C02F8XYZMD6T',
        brand: 'Apple',
        model: 'A2485',
        purchaseDate: 'Jan 15, 2023',
        purchasePrice: '$3,499.00',
        vendor: 'Apple Business',
        warrantyEnds: 'Jan 14, 2026',
        location: 'New York Office',
        specifications: [
            { label: 'Processor', value: 'Apple M2 Max (12-core)' },
            { label: 'Memory', value: '32GB Unified' },
            { label: 'Storage', value: '1TB SSD' },
            { label: 'Display', value: '16.2" Liquid Retina XDR' },
            { label: 'OS', value: 'macOS Sonoma 14.1' },
            { label: 'MAC Address', value: '00:1A:2B:3C:4D:5E' }
        ],
        assignedTo: {
            name: 'Sarah Connor',
            role: 'Product Designer',
            dept: 'Design',
            assignedDate: 'Jan 20, 2023',
        },
        history: [
            { date: 'Jan 20, 2023', action: 'Assigned to Sarah Connor', by: 'IT Admin (Mike)' },
            { date: 'Jan 16, 2023', action: 'Provisioned with Base Image', by: 'IT Admin (John)' },
            { date: 'Jan 15, 2023', action: 'Asset Created & Added to Inventory', by: 'System' }
        ]
    };

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Back & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <Link href="/it/assets" className="text-[#8899AA] hover:text-white flex items-center gap-2 font-bold text-sm transition-colors">
                    <ArrowLeft size={16} /> Back to Assets
                </Link>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-[#8899AA] font-bold text-sm rounded-xl hover:bg-[#2A3A4A] hover:text-white transition-colors flex items-center gap-2">
                        <PenTool size={16} /> Edit Asset
                    </button>
                    {asset.status === 'Assigned' ? (
                        <button className="px-4 py-2 bg-[#FFB020] text-[#0A1420] font-bold text-sm rounded-xl hover:bg-[#eacc41] transition-colors shadow-[0_5px_15px_rgba(255,176,32,0.2)]">
                            Return Asset
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-[#33E6FF] text-[#0A1420] font-bold text-sm rounded-xl hover:bg-[#29b8cc] transition-colors shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                            Assign Asset
                        </button>
                    )}
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        More Actions...
                    </button>
                </div>
            </div>

            {/* Hero Header */}
            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-8 shadow-xl flex flex-col md:flex-row gap-8 items-start mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Laptop size={200} />
                </div>

                {/* Icon/Avatar */}
                <div className="w-24 h-24 bg-[#1A2A3A] border border-[#2A3A4A] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <Laptop size={48} className="text-[#33E6FF]" />
                </div>

                {/* Title & Micro-details */}
                <div className="flex-1 z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                        <h1 className="text-3xl font-extrabold text-white">{asset.name}</h1>
                        <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full ${asset.status === 'Assigned' ? 'bg-[#33E6FF]/10 text-[#33E6FF]' : 'bg-[#00E5A0]/10 text-[#00E5A0]'}`}>
                            {asset.status}
                        </span>
                    </div>
                    <p className="text-[#8899AA] font-medium flex items-center gap-4 mb-6">
                        <span className="flex items-center gap-1.5"><Tag size={16} /> {asset.id}</span>
                        <span className="flex items-center gap-1.5 font-mono bg-[#1A2A3A] px-2 py-0.5 rounded border border-[#2A3A4A]">SN: {asset.serial}</span>
                    </p>

                    {/* Quick Summary Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#1A2A3A] border border-[#2A3A4A] p-4 rounded-2xl">
                        <div><p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Category</p><p className="text-white font-bold">{asset.category}</p></div>
                        <div><p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Brand/Model</p><p className="text-white font-bold">{asset.brand} {asset.model}</p></div>
                        <div><p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Location</p><p className="text-white font-bold flex items-center gap-1"><MapPin size={14} className="text-[#00E5A0]" />{asset.location}</p></div>
                        <div><p className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Condition</p><p className="text-[#00E5A0] font-bold flex items-center gap-1"><CheckCircle size={14} /> Good</p></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="col-span-1 lg:col-span-2 space-y-8">

                    {/* Assignments */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <User size={20} className="text-[#33E6FF]" /> Current Assignment
                        </h3>
                        {asset.status === 'Assigned' && asset.assignedTo ? (
                            <div className="flex items-center gap-6 p-4 bg-[#1A2A3A] border border-[#2A3A4A] rounded-2xl">
                                <div className="w-16 h-16 bg-[#0A1420] border border-[#2A3A4A] rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xl font-black text-white">{asset.assignedTo.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-lg">{asset.assignedTo.name}</h4>
                                    <p className="text-[#8899AA] text-sm">{asset.assignedTo.role} • {asset.assignedTo.dept}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-[#8899AA] font-bold tracking-wider uppercase mb-1">Assigned On</p>
                                    <p className="text-white font-bold text-sm">{asset.assignedTo.assignedDate}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-[#8899AA] border border-dashed border-[#2A3A4A] rounded-2xl bg-[#1A2A3A]/50">
                                Asset is currently available in the unassigned pool.
                            </div>
                        )}
                    </div>

                    {/* Specifications */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Laptop size={20} className="text-[#00E5A0]" /> Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {asset.specifications.map((spec, i) => (
                                <div key={i} className="flex flex-col py-3 border-b border-[#1A2A3A]">
                                    <span className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">{spec.label}</span>
                                    <span className="text-white font-medium">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* History Timeline */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <History size={20} className="text-[#FFB020]" /> Lifecycle History
                        </h3>
                        <div className="space-y-6">
                            {asset.history.map((evt, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {i !== asset.history.length - 1 && (
                                        <div className="absolute top-6 left-2.5 w-0.5 h-full bg-[#1A2A3A] -z-10"></div>
                                    )}
                                    <div className="w-5 h-5 rounded-full bg-[#1A2A3A] border-2 border-[#33E6FF] mt-0.5 shrink-0 z-10 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-[#33E6FF] rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">{evt.action}</p>
                                        <p className="text-[#8899AA] text-xs mt-1 flex gap-3">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {evt.date}</span>
                                            <span className="flex items-center gap-1"><User size={12} /> {evt.by}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Sidebar Metadata */}
                <div className="col-span-1 space-y-6">

                    {/* Purchase & Warranty */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Receipt size={18} className="text-[#33E6FF]" /> Purchase Details
                        </h3>
                        <div className="space-y-4 mb-6 pb-6 border-b border-[#1A2A3A]">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Purchase Date</span>
                                <span className="text-sm text-white font-medium">{asset.purchaseDate}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Vendor</span>
                                <span className="text-sm text-white font-medium">{asset.vendor}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Price</span>
                                <span className="text-sm text-white font-black">{asset.purchasePrice}</span>
                            </div>
                        </div>

                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-[#00E5A0]" /> Warranty Info
                        </h3>
                        <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/30 p-4 rounded-xl">
                            <span className="text-xs text-[#00E5A0] font-black uppercase tracking-wider block mb-1">Active Status</span>
                            <p className="text-white text-sm">Expires: <strong>{asset.warrantyEnds}</strong></p>
                            <p className="text-xs text-[#8899AA] mt-2">AppleCare+ Enterprise Level Support</p>
                        </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-xl text-center transition-colors group">
                                <PenTool size={20} className="mx-auto text-[#8899AA] mb-2 group-hover:text-[#33E6FF] transition-colors" />
                                <span className="text-xs font-bold text-white">Log Repair</span>
                            </button>
                            <button className="p-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-xl text-center transition-colors group">
                                <AlertTriangle size={20} className="mx-auto text-[#8899AA] mb-2 group-hover:text-[#FF4444] transition-colors" />
                                <span className="text-xs font-bold text-white">Write-off</span>
                            </button>
                            <button className="p-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-xl text-center transition-colors group">
                                <Receipt size={20} className="mx-auto text-[#8899AA] mb-2 group-hover:text-[#00E5A0] transition-colors" />
                                <span className="text-xs font-bold text-white">View Invoice</span>
                            </button>
                            <button className="p-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-xl text-center transition-colors group">
                                <ShieldCheck size={20} className="mx-auto text-[#8899AA] mb-2 group-hover:text-[#FFB020] transition-colors" />
                                <span className="text-xs font-bold text-white">Claim Warranty</span>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}
