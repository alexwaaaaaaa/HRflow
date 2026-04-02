"use client";
import React, { useState } from 'react';
import { Tag, Building, Search, Rss, ArrowUpRight, Pin } from 'lucide-react';

export default function DeptNoticeScreen() {
    const [dept, setDept] = useState('engineering');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">Targeted Feeds</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Building size={24} className="text-sky-400" /> Departmental Notices</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Publish and consume updates specific to organizational units, squads, or locations.</p>
                </div>
                <button className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                    Post to Department
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0 space-y-4">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 sticky top-6">
                        <div className="relative mb-4">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Filter channels..." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-2 text-white text-sm focus:border-sky-500 outline-none" />
                        </div>

                        <div className="space-y-1">
                            <div className="text-[#556677] text-[10px] uppercase font-bold tracking-wider mb-2 px-2 mt-4">Subscribed Feeds</div>
                            {[
                                { id: 'all', label: 'Company Wide', icon: Rss, badge: 2 },
                                { id: 'engineering', label: 'Engineering', icon: Building, badge: 5 },
                                { id: 'product', label: 'Product Guild', icon: Tag, badge: null },
                            ].map(nav => (
                                <button
                                    key={nav.id}
                                    onClick={() => setDept(nav.id)}
                                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${dept === nav.id ? 'bg-[#131B2B] text-sky-400 font-bold border border-[#2A3A4A]' : 'text-[#8899AA] hover:text-white hover:bg-[#131B2B]/50'}`}
                                >
                                    <span className="flex items-center gap-2"><nav.icon size={16} /> {nav.label}</span>
                                    {nav.badge && <span className="bg-sky-500 text-[#0A1420] px-1.5 py-0.5 rounded text-[10px] font-black">{nav.badge}</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feed Content */}
                <div className="flex-1 space-y-6">

                    {/* Pinned / Priority */}
                    <div className="bg-gradient-to-br from-[#131B2B] to-[#0A1420] border border-sky-500/30 rounded-2xl p-6 shadow-lg relative overflow-hidden group hover:border-sky-500/50 transition-colors cursor-pointer">
                        <div className="absolute top-4 right-4 text-sky-400 rotate-45 opacity-50"><Pin size={24} fill="currentColor" /></div>
                        <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
                            <Pin size={12} /> Pinned by VP Engineering
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">Q4 Sprint Freeze & Deployment Policy Update</h2>
                        <p className="text-[#8899AA] text-sm leading-relaxed max-w-2xl mb-4">
                            Effective Nov 15th, strict deployment freezes will be enforced for all tier-1 microservices to ensure stability over the holiday peak traffic. Only high-severity hotfixes...
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-[#556677]">
                            <span className="text-white">Posted by Alexander C.</span>
                            <span>•</span>
                            <span>Today at 9:00 AM</span>
                            <span className="flex items-center gap-1 bg-[#1A2A3A] px-2 py-1 rounded text-white"><ArrowUpRight size={14} /> Read Full Policy</span>
                        </div>
                    </div>

                    {/* Standard Posts */}
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden divide-y divide-[#1A2A3A]">
                        {[
                            { title: 'New AWS Instance Types Available for Staging Apps', author: 'DevOps Guild', time: 'Yesterday', abstract: 'We have provisioned the new M7g instances driven by Graviton3 processors. Teams can now migrate staging workloads...' },
                            { title: 'Reminder: Security Compliance Training Due', author: 'InfoSec Team', time: '2 days ago', abstract: 'A quick reminder that the annual SOC2 compliance module must be completed by EOW. This is mandatory for all members.' },
                            { title: 'Hackathon 2025: Team Registrations Open!', author: 'Eng Admin', time: 'Oct 10', abstract: 'Get your teams together for the upcoming global hackathon. Prizes include $5000 travel vouchers and...' }
                        ].map((post, i) => (
                            <div key={i} className="p-6 hover:bg-[#131B2B]/50 transition-colors cursor-pointer group">
                                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-sky-400 transition-colors">{post.title}</h3>
                                <p className="text-[#8899AA] text-sm mb-4 line-clamp-2">{post.abstract}</p>
                                <div className="flex justify-between items-center text-xs font-bold text-[#556677]">
                                    <div className="flex gap-3">
                                        <span className="text-white">{post.author}</span>
                                        <span>{post.time}</span>
                                    </div>
                                    <span className="text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">Read more &rarr;</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
