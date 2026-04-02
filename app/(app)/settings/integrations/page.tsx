"use client";
import React, { useState } from 'react';
import { PackageSearch, Search, SlidersHorizontal, ArrowRight, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = ['All App', 'Communication', 'ATS', 'Accounting', 'Identity'];

const APPS = [
    { id: 1, name: 'Slack', cat: 'Communication', desc: 'Send daily attendance digests and approval notifications directly to Slack channels.', icon: 'S', color: 'from-purple-600 to-indigo-600', installed: true, popular: true },
    { id: 2, name: 'Google Workspace', cat: 'Identity', desc: 'Sync users, groups, and auto-provision SSO access for new joiners.', icon: 'G', color: 'from-blue-500 to-sky-400', installed: true, popular: true },
    { id: 3, name: 'Greenhouse', cat: 'ATS', desc: 'Seamlessly transition hired candidates into Kaarya employee records.', icon: 'Gh', color: 'from-emerald-600 to-teal-500', installed: false, popular: true },
    { id: 4, name: 'QuickBooks', cat: 'Accounting', desc: 'Export payroll journals and expense claims directly to your general ledger.', icon: 'Qb', color: 'from-green-600 to-emerald-500', installed: false, popular: false },
    { id: 5, name: 'Jira', cat: 'Productivity', desc: 'Create Jira tickets for IT provisioning when new employees are onboarded.', icon: 'J', color: 'from-blue-600 to-indigo-700', installed: false, popular: false },
    { id: 6, name: 'Zoho Books', cat: 'Accounting', desc: 'Automate accounting entries for Indian payroll compliance.', icon: 'Zb', color: 'from-amber-500 to-orange-500', installed: false, popular: false },
];

export default function IntegrationMarketplacePage() {
    const [activeCat, setActiveCat] = useState('All App');

    const filteredApps = APPS.filter(app => activeCat === 'All App' || app.cat === activeCat);

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <PackageSearch className="text-indigo-400" />
                        App Marketplace
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Connect Kaarya with your favorite tools to automate workflows.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} />
                        <input type="text" placeholder="Search integrations..." className="w-64 pl-9 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-white focus:border-indigo-500 outline-none" />
                    </div>
                </div>
            </div>

            {/* Featured Hero */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-[#0A1420] border border-indigo-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

                <div className="flex-1 relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30">
                        <Star size={12} className="fill-indigo-400" /> Featured Integration
                    </div>
                    <h2 className="text-3xl font-black text-white leading-tight">Automate Provisioning<br />with Okta</h2>
                    <p className="text-[#8899AA] text-base max-w-md">Sync employee directory changes directly to Okta to instantly provision or de-provision software access based on roles.</p>
                    <button className="bg-white text-[#060D1A] px-6 py-2.5 rounded-xl font-bold transition-transform hover:-translate-y-0.5">
                        View Integration
                    </button>
                </div>

                <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative z-10 flex items-center justify-center">
                    {/* Mock Illustration */}
                    <div className="w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-5xl font-black shadow-[0_0_50px_rgba(37,99,235,0.4)] rotate-12 transition-transform hover:rotate-0 duration-500">
                        O
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-48 shrink-0 space-y-2">
                    <h3 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-4 px-3 flex items-center gap-2">
                        <SlidersHorizontal size={14} /> Categories
                    </h3>
                    {CATEGORIES.map(c => (
                        <button
                            key={c}
                            onClick={() => setActiveCat(c)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCat === c ? 'bg-[#1A2A3A] text-white' : 'text-[#8899AA] hover:bg-[#0A1420] hover:text-[#CCDDEE]'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* App Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApps.map(app => (
                        <Link href={`/settings/integrations/${app.id}`} key={app.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-indigo-500/50 hover:bg-[#0D1928] transition-all group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br transition-transform group-hover:scale-110 ${app.color} flex items-center justify-center text-white text-xl font-black shadow-lg`}>
                                    {app.icon}
                                </div>
                                {app.installed && (
                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Installed</span>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{app.name}</h3>
                            <p className="text-xs text-indigo-400 mb-2 font-medium">{app.cat}</p>
                            <p className="text-sm text-[#8899AA] line-clamp-3 mb-6 flex-1">
                                {app.desc}
                            </p>
                            <div className="flex items-center text-sm font-bold text-[#556677] group-hover:text-white transition-colors">
                                {app.installed ? 'Manage App' : 'Learn More'} <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
