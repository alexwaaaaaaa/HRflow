"use client";
import React, { useState } from 'react';
import { Search, Filter, Monitor, Smartphone, Laptop, Download, MoreVertical, QrCode } from 'lucide-react';

const INVENTORY = [
    { sn: 'MBP-2023-892', type: 'Laptop', model: 'MacBook Pro 14" M3', user: 'Jason Smith', status: 'Assigned', loc: 'Bengaluru', date: 'Oct 2023' },
    { sn: 'MBP-2023-893', type: 'Laptop', model: 'MacBook Pro 14" M3', user: 'Unassigned', status: 'In Stock', loc: 'Bengaluru', date: 'Oct 2023' },
    { sn: 'DL-XPS-401', type: 'Laptop', model: 'Dell XPS 15', user: 'Anita Kulkarni', status: 'Assigned', loc: 'Mumbai', date: 'Jan 2024' },
    { sn: 'MON-LG-001', type: 'Accessory', model: 'LG Ultrawide 34"', user: 'Office Desk 42', status: 'Deployed', loc: 'Bengaluru', date: 'Mar 2024' },
    { sn: 'IPH-15-092', type: 'Mobile', model: 'iPhone 15 Pro', user: 'Rahul Kapoor', status: 'Assigned', loc: 'Mumbai', date: 'Feb 2024' },
    { sn: 'MBP-2021-112', type: 'Laptop', model: 'MacBook Pro 13" M1', user: 'Pending Repair', status: 'Broken', loc: 'Delhi', date: 'Aug 2021' },
];

export default function AssetInventoryScreen() {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Monitor size={24} className="text-cyan-400" /> Complete Inventory Register</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Track all hardware assets, serial numbers, assignments, and lifecycle status.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-4 items-center justify-between bg-[#060D1A]">
                    <div className="flex gap-2">
                        {['All', 'Laptop', 'Mobile', 'Accessory'].map((t, i) => (
                            <button key={i} onClick={() => setFilterType(t)} className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${filterType === t ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-[#131B2B] text-[#556677] border-[#2A3A4A] hover:text-white'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="text-[#8899AA] hover:text-white transition-colors bg-[#131B2B] border border-[#2A3A4A] p-2 rounded-lg"><Filter size={16} /></button>
                        <div className="relative flex-1 md:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search S/N, User, Model..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider font-bold border-b border-[#2A3A4A]">
                                <th className="p-4 py-3">Asset Serial / Tag</th>
                                <th className="p-4 py-3">Device Model</th>
                                <th className="p-4 py-3">Current Assignee / Location</th>
                                <th className="p-4 py-3">Audit Date</th>
                                <th className="p-4 py-3">Status</th>
                                <th className="p-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {INVENTORY.filter(f => (filterType === 'All' || f.type === filterType) && (!search || f.sn.toLowerCase().includes(search.toLowerCase()) || f.user.toLowerCase().includes(search.toLowerCase()) || f.model.toLowerCase().includes(search.toLowerCase()))).map((row, i) => (
                                <tr key={i} className="border-b border-[#1A2A3A] hover:bg-[#131B2B]/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#1A2A3A] rounded border border-[#2A3A4A] text-cyan-400">
                                                {row.type === 'Laptop' ? <Laptop size={16} /> : row.type === 'Mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
                                            </div>
                                            <div>
                                                <div className="font-mono text-white font-bold">{row.sn}</div>
                                                <div className="text-[#556677] text-[10px] uppercase font-bold tracking-wider mt-0.5">{row.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-white">{row.model}</td>
                                    <td className="p-4">
                                        <div className="text-white">{row.user}</div>
                                        <div className="text-[#556677] text-xs">{row.loc}</div>
                                    </td>
                                    <td className="p-4 text-[#8899AA]">{row.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider 
                       ${row.status === 'Assigned' || row.status === 'Deployed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                row.status === 'In Stock' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-cyan-400 transition-colors" title="View QR Tag"><QrCode size={16} /></button>
                                            <button className="p-2 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors"><MoreVertical size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination placeholder */}
                    <div className="p-4 border-t border-[#1A2A3A] flex items-center justify-between text-[#8899AA] text-sm bg-[#060D1A]">
                        <span>Showing 1-6 of 1,861 assets</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded hover:text-white disabled:opacity-50">Prev</button>
                            <button className="px-3 py-1 bg-[#131B2B] border border-[#2A3A4A] rounded hover:text-white">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
