"use client";

import React from 'react';
import {
    Shield, CheckCircle2, Star, Zap, Activity, Building, ArrowUpRight, Copy, Link as LinkIcon
} from 'lucide-react';

const VENDORS = [
    {
        name: 'FirstAdvantage',
        status: 'Active',
        apiStatus: 'Connected',
        apiUptime: '99.9%',
        rating: 4.8,
        costPerCheck: '₹1,500 - ₹3,500',
        avgTat: '4.2 Days',
        checksMtd: 84,
        logo: 'F'
    },
    {
        name: 'Checkr',
        status: 'Active',
        apiStatus: 'Connected',
        apiUptime: '100%',
        rating: 4.9,
        costPerCheck: '₹1,200 - ₹3,000',
        avgTat: '3.8 Days',
        checksMtd: 120,
        logo: 'C'
    },
    {
        name: 'HireRight',
        status: 'Inactive',
        apiStatus: 'Disconnected',
        apiUptime: '-',
        rating: 4.5,
        costPerCheck: '₹2,000 - ₹5,000',
        avgTat: '5.1 Days',
        checksMtd: 0,
        logo: 'H'
    }
];

export default function BGVVendorScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <Building className="text-[#00E5A0]" size={28} />
                            Vendor Management
                        </h1>
                        <p className="text-sm text-[#8899AA]">Manage integrated BGV vendors, APIs, and performance metrics.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                        + Add New Vendor
                    </button>
                </div>

                {/* API Health Banner */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 mb-8 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#00E5A0]/10 flex items-center justify-center border border-[#00E5A0]/20">
                            <Activity className="text-[#00E5A0]" size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">All APIs Operational</h3>
                            <p className="text-sm text-[#8899AA]">2 active vendor webhooks are receiving real-time updates.</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors border border-[#2A3A4A] flex items-center gap-2">
                        <Zap size={16} className="text-amber-500" /> Test Connections
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {VENDORS.map((vendor, i) => (
                        <div key={i} className={`bg-[#0A1420] border rounded-2xl p-6 transition-all ${vendor.status === 'Active' ? 'border-[#1A2A3A] hover:border-[#2A3A4A] shadow-lg' : 'border-[#1A2A3A]/50 opacity-70'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                                <div className="flex items-center gap-5 md:w-1/3">
                                    <div className="w-16 h-16 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center font-black text-2xl text-[#556677]">
                                        {vendor.logo}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                                            {vendor.name}
                                            {vendor.status === 'Active' && <CheckCircle2 size={16} className="text-[#00E5A0]" />}
                                        </h2>
                                        <div className="flex items-center gap-4 text-xs font-semibold">
                                            <span className={`px-2 py-0.5 rounded ${vendor.status === 'Active' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}>
                                                {vendor.status}
                                            </span>
                                            <span className={`flex items-center gap-1 ${vendor.apiStatus === 'Connected' ? 'text-[#0066FF]' : 'text-[#8899AA]'}`}>
                                                <LinkIcon size={12} /> {vendor.apiStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:flex-1 w-full">
                                    <div>
                                        <div className="text-xs text-[#556677] uppercase tracking-wider mb-1">Avg Rating</div>
                                        <div className="text-base font-bold text-white flex items-center gap-1">
                                            {vendor.rating} <Star size={14} className="text-amber-500 fill-amber-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#556677] uppercase tracking-wider mb-1">Avg TAT</div>
                                        <div className="text-base font-bold text-white">{vendor.avgTat}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#556677] uppercase tracking-wider mb-1">Checks MTD</div>
                                        <div className="text-base font-bold text-white">{vendor.checksMtd}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#556677] uppercase tracking-wider mb-1">Cost Range</div>
                                        <div className="text-sm font-bold text-white mt-0.5">{vendor.costPerCheck}</div>
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#1A2A3A] text-white text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                                        Configure <ArrowUpRight size={16} className="text-[#8899AA]" />
                                    </button>
                                </div>
                            </div>

                            {vendor.status === 'Active' && (
                                <div className="mt-6 pt-5 border-t border-[#1A2A3A] flex flex-wrap gap-6 items-center">
                                    <div className="text-xs text-[#8899AA] w-full sm:w-auto mb-2 sm:mb-0">API Credentials:</div>
                                    <div className="flex items-center gap-2 bg-[#060B14] px-3 py-1.5 rounded-md border border-[#1A2A3A]">
                                        <span className="text-xs text-[#556677] font-mono">Key:</span>
                                        <span className="text-xs text-white font-mono tracking-widest">sk_live_******************</span>
                                        <Copy size={14} className="text-[#8899AA] hover:text-white cursor-pointer ml-2" />
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#060B14] px-3 py-1.5 rounded-md border border-[#1A2A3A]">
                                        <span className="text-xs text-[#556677] font-mono">Webhook:</span>
                                        <span className="text-xs text-white font-mono truncate max-w-[200px]">https://api.hrflow.com/v1/webhooks/{vendor.name.toLowerCase()}/callback</span>
                                        <Copy size={14} className="text-[#8899AA] hover:text-white cursor-pointer ml-2" />
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
