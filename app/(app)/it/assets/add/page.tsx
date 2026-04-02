"use client";
import React, { useState } from 'react';
import {
    Plus, Save, ArrowLeft, Laptop, Monitor, Smartphone, Server, Receipt, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function AddAssetScreen() {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Laptop',
        brand: '',
        model: '',
        serial: '',
        purchaseDate: '',
        vendor: '',
        price: '',
        warrantyEnds: '',
        location: 'HQ (New York)'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API Call to save asset
        console.log('Saving asset:', formData);
    };

    return (
        <div className="p-6 max-w-[1000px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/it/assets" className="p-2 border border-[#2A3A4A] bg-[#1A2A3A] text-[#8899AA] rounded-xl hover:bg-[#2A3A4A] hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Add New Asset</h1>
                    <p className="text-[#8899AA]">Register a new hardware asset into the IT inventory.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Category Selection */}
                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                    <h3 className="text-white font-bold mb-4">Asset Type</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'Laptop', icon: Laptop },
                            { name: 'Monitor', icon: Monitor },
                            { name: 'Mobile', icon: Smartphone },
                            { name: 'Server', icon: Server }
                        ].map(cat => (
                            <button
                                key={cat.name}
                                type="button"
                                onClick={() => setFormData({ ...formData, category: cat.name })}
                                className={`flex flex-col items-center justify-center p-6 border rounded-2xl transition-all ${formData.category === cat.name
                                        ? 'bg-[#33E6FF]/10 border-[#33E6FF] text-[#33E6FF]'
                                        : 'bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:bg-[#152336] hover:border-[#445566]'
                                    }`}
                            >
                                <cat.icon size={32} className="mb-3" />
                                <span className="font-bold text-sm tracking-wide uppercase">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Primary Details */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl space-y-4">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Laptop size={18} className="text-[#33E6FF]" /> Primary Details
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Asset Name</label>
                            <input
                                type="text"
                                placeholder="e.g. MacBook Pro 16 M2"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Brand</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Apple"
                                    value={formData.brand}
                                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Model</label>
                                <input
                                    type="text"
                                    placeholder="e.g. A2485"
                                    value={formData.model}
                                    onChange={e => setFormData({ ...formData, model: e.target.value })}
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Serial Number / Asset Tag</label>
                            <input
                                type="text"
                                placeholder="e.g. C02F8XYZMD6T"
                                value={formData.serial}
                                onChange={e => setFormData({ ...formData, serial: e.target.value })}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors font-mono uppercase"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Location</label>
                            <select
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors appearance-none cursor-pointer"
                            >
                                <option>HQ (New York)</option>
                                <option>London Office</option>
                                <option>Remote (Unassigned)</option>
                            </select>
                        </div>
                    </div>

                    {/* Purchase & Warranty */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl space-y-4">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Receipt size={18} className="text-[#00E5A0]" /> Purchase & Warranty
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Vendor</label>
                            <input
                                type="text"
                                placeholder="e.g. CDW, Apple Business"
                                value={formData.vendor}
                                onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Purchase Date</label>
                                <input
                                    type="date"
                                    value={formData.purchaseDate}
                                    onChange={e => setFormData({ ...formData, purchaseDate: e.target.value })}
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Purchase Price ($)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                />
                            </div>
                        </div>

                        <h3 className="text-white font-bold mt-8 mb-4 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-[#FFB020]" /> Warranty Details
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Warranty Expiration</label>
                            <input
                                type="date"
                                value={formData.warrantyEnds}
                                onChange={e => setFormData({ ...formData, warrantyEnds: e.target.value })}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                            />
                        </div>

                    </div>

                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-8 border-t border-[#2A3A4A]">
                    <Link href="/it/assets" className="px-6 py-3 font-bold text-[#8899AA] hover:text-white transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" className="px-8 py-3 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                        <Save size={18} /> Save Asset
                    </button>
                </div>

            </form>
        </div>
    );
}
