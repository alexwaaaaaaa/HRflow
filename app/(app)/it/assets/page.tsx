"use client";
import React, { useState } from 'react';
import {
    Laptop, Monitor, Smartphone, Server, Search, Filter, Plus,
    MoreHorizontal, Download, ArrowUpDown, Tag
} from 'lucide-react';
import Link from 'next/link';

const ASSETS = [
    { id: 'AST-LTP-001', name: 'MacBook Pro 16" M2', category: 'Laptop', serial: 'C02F8XYZMD6T', assignedTo: 'Sarah Connor', status: 'Assigned', purchaseDate: '2023-01-15' },
    { id: 'AST-LTP-002', name: 'ThinkPad X1 Carbon', category: 'Laptop', serial: 'PF3W8XYZ', assignedTo: null, status: 'Available', purchaseDate: '2023-02-20' },
    { id: 'AST-MON-012', name: 'Dell UltraSharp 27"', category: 'Monitor', serial: 'CN-0XJ1XYZ', assignedTo: 'John Smith', status: 'Assigned', purchaseDate: '2022-11-05' },
    { id: 'AST-MOB-005', name: 'iPhone 14 Pro', category: 'Mobile', serial: 'F17H8XYZHXY', assignedTo: null, status: 'In Repair', purchaseDate: '2023-03-10' },
    { id: 'AST-LTP-008', name: 'MacBook Air M2', category: 'Laptop', serial: 'C02G8XYZMD6X', assignedTo: 'Maria Garcia', status: 'Assigned', purchaseDate: '2023-05-12' },
    { id: 'AST-SRV-002', name: 'Dell PowerEdge R740', category: 'Server', serial: '8XYZ123', assignedTo: null, status: 'Available', purchaseDate: '2021-08-20' },
    { id: 'AST-MON-015', name: 'LG 34" UltraWide', category: 'Monitor', serial: '304NTXYZ123', assignedTo: null, status: 'Write-off', purchaseDate: '2020-01-10' },
];

export default function AssetListScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredAssets = ASSETS.filter(asset =>
        (filterCategory === 'All' || asset.category === filterCategory) &&
        (filterStatus === 'All' || asset.status === filterStatus) &&
        (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.id.toLowerCase().includes(searchTerm.toLowerCase()) || asset.serial.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Laptop size={32} className="text-[#33E6FF]" /> Asset Inventory
                    </h1>
                    <p className="text-[#8899AA]">Manage your hardware inventory, tracks lifecycles, and check availabilities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold text-sm rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Download size={16} /> Export CSV
                    </button>
                    <Link href="/it/assets/add" className="px-4 py-2 bg-[#33E6FF] text-[#0A1420] font-bold text-sm rounded-xl hover:bg-[#29b8cc] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                        <Plus size={16} /> Add Asset
                    </Link>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID, Name, Serial..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#33E6FF] font-medium"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto overflow-x-auto">
                    <div className="relative flex-shrink-0">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={16} />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:border-[#33E6FF] appearance-none cursor-pointer font-bold"
                        >
                            <option value="All">All Categories</option>
                            <option value="Laptop">Laptops</option>
                            <option value="Monitor">Monitors</option>
                            <option value="Mobile">Mobiles</option>
                            <option value="Server">Servers</option>
                        </select>
                    </div>

                    <div className="relative flex-shrink-0">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={16} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:border-[#33E6FF] appearance-none cursor-pointer font-bold"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Available">Available</option>
                            <option value="Assigned">Assigned</option>
                            <option value="In Repair">In Repair</option>
                            <option value="Write-off">Write-off</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Assets Table */}
            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0D1826] border-b border-[#2A3A4A]">
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider whitespace-nowrap"><div className="flex items-center gap-2 cursor-pointer hover:text-white">Asset ID <ArrowUpDown size={12} /></div></th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider whitespace-nowrap"><div className="flex items-center gap-2 cursor-pointer hover:text-white">Hardware <ArrowUpDown size={12} /></div></th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider whitespace-nowrap">Category</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider whitespace-nowrap">Serial Number</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider whitespace-nowrap">Assigned To</th>
                                <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filteredAssets.length > 0 ? filteredAssets.map((asset) => (
                                <tr key={asset.id} className="hover:bg-[#152336] transition-colors group">
                                    <td className="p-4">
                                        <Link href={`/it/assets/${asset.id}`} className="font-bold text-[#33E6FF] hover:underline text-sm">
                                            {asset.id}
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-white font-bold text-sm">{asset.name}</p>
                                        <p className="text-xs text-[#8899AA]">Purchased: {asset.purchaseDate}</p>
                                    </td>
                                    <td className="p-4 text-[#8899AA] text-sm flex items-center gap-2">
                                        {asset.category === 'Laptop' && <Laptop size={14} />}
                                        {asset.category === 'Monitor' && <Monitor size={14} />}
                                        {asset.category === 'Mobile' && <Smartphone size={14} />}
                                        {asset.category === 'Server' && <Server size={14} />}
                                        {asset.category}
                                    </td>
                                    <td className="p-4 text-[#8899AA] text-sm tabular-nums">
                                        {asset.serial}
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${asset.status === 'Available' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' :
                                                asset.status === 'Assigned' ? 'bg-[#33E6FF]/10 text-[#33E6FF]' :
                                                    asset.status === 'In Repair' ? 'bg-[#FFB020]/10 text-[#FFB020]' :
                                                        'bg-[#FF4444]/10 text-[#FF4444]'
                                            }`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {asset.assignedTo ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                                    {asset.assignedTo.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="text-sm font-medium text-white">{asset.assignedTo}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-[#445566] italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {asset.status === 'Available' && (
                                                <Link href={`/it/assets/assign?asset=${asset.id}`} className="px-3 py-1 bg-[#33E6FF] text-[#0A1420] text-xs font-bold rounded hover:bg-[#29b8cc] transition-colors">
                                                    Assign
                                                </Link>
                                            )}
                                            {asset.status === 'Assigned' && (
                                                <Link href={`/it/assets/return?asset=${asset.id}`} className="px-3 py-1 bg-[#FFB020] text-[#0A1420] text-xs font-bold rounded hover:bg-[#eacc41] transition-colors">
                                                    Return
                                                </Link>
                                            )}
                                            <Link href={`/it/assets/${asset.id}`} className="p-1 px-2 text-[#8899AA] hover:text-white border border-[#2A3A4A] rounded hover:bg-[#2A3A4A] transition-colors">
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-[#8899AA]">
                                        No assets found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center text-sm text-[#8899AA]">
                    <span>Showing {filteredAssets.length} assets</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-[#2A3A4A] rounded hover:bg-[#1A2A3A] transition-colors disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 bg-[#2A3A4A] text-white rounded">1</button>
                        <button className="px-3 py-1 border border-[#2A3A4A] rounded hover:bg-[#1A2A3A] transition-colors">2</button>
                        <button className="px-3 py-1 border border-[#2A3A4A] rounded hover:bg-[#1A2A3A] transition-colors">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
