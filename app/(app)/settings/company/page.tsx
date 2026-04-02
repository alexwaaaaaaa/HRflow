"use client";

import React, { useState } from 'react';
import { Building2, Save, Upload, MapPin, Globe, Briefcase, Plus, Trash2, Shield, Calendar, Sliders } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CompanyProfileSettingsPage() {
    const [activeTab, setActiveTab] = useState('General Info');
    const tabs = ['General Info', 'Addresses', 'Statutory Details', 'Branding'];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Building2 size={28} className="text-indigo-400" /> Company Profile
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Manage your organization's core identity, legal entities, and operating locations.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        Discard Changes
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                        <Save size={16} className="mr-2" /> Save Profile
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">

                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-2 shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors text-sm font-medium ${activeTab === tab
                                ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]'
                                : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                {tab === 'General Info' && <Building2 size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab === 'Addresses' && <MapPin size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab === 'Statutory Details' && <Shield size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab === 'Branding' && <Globe size={18} className={activeTab === tab ? 'text-indigo-400' : ''} />}
                                {tab}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Main Settings Area */}
                <div className="lg:col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-y-auto">
                    <div className="p-6 md:p-8 space-y-8">

                        {activeTab === 'General Info' && (
                            <div className="animate-fade-in space-y-8">

                                {/* Logo Upload */}
                                <div className="flex items-start gap-6 pb-6 border-b border-[#1A2A3A]">
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center relative group overflow-hidden shrink-0">
                                        <div className="text-3xl font-bold text-white tracking-tighter">KF</div>
                                        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Upload size={20} className="text-white mb-1" />
                                            <span className="text-[10px] text-white font-medium">Update Logo</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Company Logo</h3>
                                        <p className="text-xs text-[#8899AA] mb-3 max-w-sm">
                                            This logo will appear on reports, letters, and the employee portal. Recommended size: 256x256px (PNG/SVG).
                                        </p>
                                        <div className="flex gap-3">
                                            <Button variant="secondary" className="border-[#2A3A4A] text-xs h-auto py-1.5 hover:text-white">Upload New</Button>
                                            <Button variant="secondary" className="border-transparent text-red-400 text-xs h-auto py-1.5 hover:bg-red-500/10 hover:border-red-500/20">Remove</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#8899AA] ml-1">Legal Company Name *</label>
                                        <input
                                            type="text"
                                            defaultValue="Kaarya Finserve Pvt. Ltd."
                                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#8899AA] ml-1">Display Name (Platform)</label>
                                        <input
                                            type="text"
                                            defaultValue="Kaarya"
                                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#8899AA] ml-1">Registration Number (CIN)</label>
                                        <input
                                            type="text"
                                            defaultValue="U72900MH2023PTC345678"
                                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors font-mono"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-medium text-[#8899AA] ml-1">Date of Incorporation</label>
                                        <div className="relative">
                                            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                            <input
                                                type="date"
                                                defaultValue="2020-04-15"
                                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                                style={{ colorScheme: 'dark' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <label className="text-xs font-medium text-[#8899AA] ml-1">Corporate Description</label>
                                    <textarea
                                        rows={4}
                                        defaultValue="Kaarya is India's leading unified Workforce OS, powering intelligent HR and payroll for modern enterprises."
                                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 outline-none transition-colors resize-none leading-relaxed"
                                    />
                                </div>

                            </div>
                        )}

                        {activeTab === 'Addresses' && (
                            <div className="animate-fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Registered Locations</h2>
                                        <p className="text-xs text-[#8899AA] mt-1">Manage HQ and branch offices for tax and statutory compliance.</p>
                                    </div>
                                    <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-[#2A3A4A] text-xs h-auto py-2">
                                        <Plus size={14} className="mr-1.5" /> Add Location
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {/* Location 1 (HQ) */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                                                    <Building2 size={18} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-white font-medium text-sm">Corporate Headquarters</h3>
                                                        <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded">HQ</span>
                                                    </div>
                                                    <p className="text-xs text-[#8899AA] mt-0.5">Primary registration address</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-[#8899AA] hover:text-white transition-colors p-1"><Sliders size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm mt-4 p-4 bg-[#0A1420] rounded-lg border border-[#1A2A3A]">
                                            <div>
                                                <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Address Line 1</div>
                                                <div className="text-white">Level 4, Innov8 Coworking</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">Address Line 2</div>
                                                <div className="text-white">Koramangala 1A Block</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">City & State</div>
                                                <div className="text-white">Bengaluru, Karnataka</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">PIN / ZIP</div>
                                                <div className="text-white">560034</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location 2 */}
                                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#8899AA]">
                                                    <Briefcase size={18} />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium text-sm">Mumbai Regional Office</h3>
                                                    <p className="text-xs text-[#8899AA] mt-0.5">Branch</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-[#8899AA] hover:text-white transition-colors p-1"><Sliders size={14} /></button>
                                                <button className="text-[#8899AA] hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Statutory Details' && (
                            <div className="animate-fade-in flex flex-col items-center justify-center p-12 text-center h-full">
                                <Shield size={48} className="text-[#2A3A4A] mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">Statutory Identifiers</h2>
                                <p className="text-sm text-[#8899AA] max-w-sm mb-6">Manage PAN, TAN, GSTIN, and EPF registration numbers for Indian compliance.</p>
                                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                                    Configure Statutory Details
                                </Button>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
