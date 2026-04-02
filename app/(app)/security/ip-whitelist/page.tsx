"use client";
import React, { useState } from 'react';
import { Globe, Plus, Trash2, Edit2, ShieldCheck, ShieldOff, AlertCircle } from 'lucide-react';

export default function IPWhitelistScreen() {
    const [strictMode, setStrictMode] = useState(true);

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">IP Whitelist Management</h1>
                    <p className="text-[#8899AA] text-sm">Restrict workspace access to verified corporate networks and VPNs.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                    <Plus size={16} /> Add IP / Subnet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Control Panel */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full transition-colors ${strictMode ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`} />

                        <div className="relative z-10 flex items-start gap-4 mb-6">
                            <div className={`p-3 rounded-xl border ${strictMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                                {strictMode ? <ShieldCheck size={24} /> : <ShieldOff size={24} />}
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-lg mb-1">Strict Enforcement</h2>
                                <p className="text-xs text-[#8899AA]">Block all non-whitelisted IPs</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between bg-[#131B2B] border border-[#2A3A4A] p-4 rounded-xl">
                            <span className="text-sm font-bold text-white">Status</span>
                            <button
                                onClick={() => setStrictMode(!strictMode)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${strictMode ? 'bg-emerald-500' : 'bg-[#2A3A4A]'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${strictMode ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2 mb-3">
                            <AlertCircle size={16} /> VPN Note
                        </h3>
                        <p className="text-xs text-[#8899AA] leading-relaxed">
                            Employees working remotely must connect to the corporate VPN (10.0.0.0/8) to access HRFlow, unless their home IP is explicitly bypassed.
                        </p>
                    </div>
                </div>

                {/* Whitelist Table */}
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A]">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Globe size={18} className="text-[#556677]" /> Allowed Networks</h2>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] text-[#8899AA] text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">IP / CIDR Block</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Description</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Added By</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A] font-mono">
                                {[
                                    { ip: '192.168.1.0/24', desc: 'Bangalore HQ Office (Main)', by: 'System Admin' },
                                    { ip: '10.0.0.0/8', desc: 'Corporate VPN Range', by: 'Meera V. (HR)' },
                                    { ip: '45.22.11.9', desc: 'CEO Home Office (Static)', by: 'System Admin' },
                                    { ip: '198.51.100.2', desc: 'External Vendor API Gateway', by: 'Aditi K. (Eng)' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                        <td className="px-6 py-4 text-emerald-400 font-bold">{row.ip}</td>
                                        <td className="px-6 py-4 text-white font-sans text-sm">{row.desc}</td>
                                        <td className="px-6 py-4 text-[#556677] text-xs">{row.by}</td>
                                        <td className="px-6 py-4 text-right flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-[#8899AA] hover:text-indigo-400 transition-colors"><Edit2 size={16} /></button>
                                            <button className="text-[#8899AA] hover:text-rose-400 transition-colors"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
