"use client";
import React, { useState } from 'react';
import { Building2, Plus, Search, Filter, MoreVertical, Building, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

const ENTITIES = [
    { id: 'ENT-001', name: 'Acme Technologies Pvt Ltd', type: 'Parent Company', loc: 'Bengaluru, KA', emp: 342, status: 'Active', color: 'indigo' },
    { id: 'ENT-002', name: 'Acme Retail Solutions', type: 'Subsidiary', loc: 'Mumbai, MH', emp: 128, status: 'Active', color: 'blue' },
    { id: 'ENT-003', name: 'Acme Logistics India', type: 'Subsidiary', loc: 'Delhi, DL', emp: 85, status: 'Active', color: 'emerald' },
    { id: 'ENT-004', name: 'Acme Global Ventures LLC', type: 'Foreign Sub', loc: 'Delaware, US', emp: 12, status: 'Active', color: 'purple' },
    { id: 'ENT-005', name: 'Acme Innovations Labs', type: 'Joint Venture', loc: 'Pune, MH', emp: 0, status: 'Draft', color: 'slate' },
];

export default function EntityListScreen() {
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Building2 size={24} className="text-indigo-400" /> Group Entities</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage multiple companies, subsidiaries, and joint ventures under one roof.</p>
                </div>
                <Link href="/multi-entity/add" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                    <Plus size={16} /> Add New Entity
                </Link>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <div className="flex items-center gap-4">
                        <span className="text-white font-bold text-sm">All Entities (5)</span>
                        <div className="h-4 w-px bg-[#2A3A4A]"></div>
                        <span className="text-[#8899AA] text-sm">Total Group Headcount: <strong className="text-white">567</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-[#8899AA] hover:text-white transition-colors"><Filter size={16} /></button>
                        <div className="relative w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search entity..." value={search} onChange={e => setSearch(e.target.value)}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs focus:border-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xlg:grid-cols-3 gap-6 p-6">
                    {ENTITIES.filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase())).map((e, i) => (
                        <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group relative flex flex-col items-start h-full">
                            <button className="absolute top-4 right-4 text-[#556677] hover:text-white"><MoreVertical size={18} /></button>

                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${e.color}-500/10 text-${e.color}-400`}>
                                <Building size={24} />
                            </div>

                            <Link href={`/multi-entity/settings?id=${e.id}`} className="text-white font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors block">
                                {e.name}
                            </Link>
                            <div className="text-[#8899AA] text-xs flex items-center gap-2 mb-6">
                                <span className="bg-[#1A2A3A] px-2 py-0.5 rounded font-mono">{e.id}</span>
                                • {e.type}
                            </div>

                            <div className="w-full space-y-3 mt-auto">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#556677] flex items-center gap-2"><MapPin size={14} /> Location</span>
                                    <span className="text-white font-medium">{e.loc}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#556677] flex items-center gap-2"><Users size={14} /> Headcount</span>
                                    <span className="text-white font-medium">{e.emp} Active</span>
                                </div>
                            </div>

                            <div className="w-full mt-6 pt-4 border-t border-[#2A3A4A] flex justify-between items-center">
                                <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${e.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                                    {e.status}
                                </span>
                                <Link href={`/multi-entity/dashboard?id=${e.id}`} className="text-[#AABBCC] text-xs font-bold hover:text-white flex items-center gap-1 transition-colors">
                                    View Dash &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}

                    <Link href="/multi-entity/add" className="border-2 border-dashed border-[#2A3A4A] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 hover:bg-[#131B2B] transition-colors min-h-[280px]">
                        <div className="w-12 h-12 rounded-full border-2 border-[#556677] flex items-center justify-center text-[#556677] mb-4">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-white font-bold text-lg">Add Sub-Entity</h3>
                        <p className="text-[#8899AA] text-sm mt-2 max-w-[200px]">Create an independent org structure that rolls up to the parent.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
