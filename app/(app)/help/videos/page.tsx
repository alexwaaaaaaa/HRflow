"use client";
import React, { useState } from 'react';
import { Video, Search, Play, Clock, Eye, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

const TUTORIALS = [
    { title: 'Running Your First Payroll — Full Walkthrough', duration: '18:42', views: '24.1k', rating: 4.9, category: 'Payroll', thumb: '#1A2A3A', new: true },
    { title: 'Setting Up PF, ESI & PT in 10 Minutes', duration: '10:05', views: '18.7k', rating: 4.8, category: 'Compliance', thumb: '#1A3A2A', new: false },
    { title: 'Adding Employees: Complete Wizard Guide', duration: '12:22', views: '15.4k', rating: 4.7, category: 'Employees', thumb: '#1A2A3A', new: false },
    { title: 'Leave Policy Setup — PL, SL, CL & Comp-Off', duration: '09:14', views: '13.2k', rating: 4.8, category: 'Leave', thumb: '#2A1A3A', new: false },
    { title: 'IT Declarations & Form 16 Management', duration: '15:30', views: '11.9k', rating: 4.6, category: 'Tax', thumb: '#3A1A1A', new: false },
    { title: 'Bulk Employee Import via CSV', duration: '07:45', views: '10.5k', rating: 4.5, category: 'Employees', thumb: '#1A2A3A', new: true },
    { title: 'Configuring Attendance with Biometric', duration: '11:18', views: '9.2k', rating: 4.7, category: 'Attendance', thumb: '#1A3A2A', new: false },
    { title: 'API & Webhook Integration Setup', duration: '20:00', views: '7.8k', rating: 4.9, category: 'Integrations', thumb: '#1A1A3A', new: true },
    { title: 'Performance Review Cycle Setup', duration: '14:55', views: '6.4k', rating: 4.6, category: 'Performance', thumb: '#2A1A3A', new: false },
];

const CATEGORIES = ['All', 'Payroll', 'Compliance', 'Employees', 'Leave', 'Tax', 'Attendance', 'Integrations', 'Performance'];

export default function VideoTutorialScreen() {
    const [search, setSearch] = useState('');
    const [cat, setCat] = useState('All');

    const filtered = TUTORIALS.filter(t => {
        const matchQ = !search || t.title.toLowerCase().includes(search.toLowerCase());
        const matchC = cat === 'All' || t.category === cat;
        return matchQ && matchC;
    });

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold transition-colors flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Video size={22} className="text-pink-400" /> Video Tutorials</h1>
                <p className="text-[#8899AA] text-sm mt-1">80+ step-by-step video guides for every feature</p>
            </div>

            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[220px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                    <input type="text" placeholder="Search tutorials..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-pink-500 outline-none text-sm transition-colors" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(c => (
                        <button key={c} onClick={() => setCat(c)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${cat === c ? 'bg-pink-600 text-white' : 'bg-[#0A1420] border border-[#1A2A3A] text-[#8899AA] hover:text-white'}`}>{c}</button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((vid, i) => (
                    <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all cursor-pointer group">
                        {/* Thumbnail */}
                        <div className="relative h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${vid.thumb}, #060B14)` }}>
                            {vid.new && <span className="absolute top-3 left-3 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>}
                            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all">
                                <Play size={24} className="text-white ml-1" fill="currentColor" />
                            </div>
                            <div className="absolute bottom-2 right-3 bg-black/60 text-white text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1">
                                <Clock size={10} /> {vid.duration}
                            </div>
                        </div>
                        <div className="p-4">
                            <span className="text-xs font-bold text-pink-400 mb-1 block">{vid.category}</span>
                            <h3 className="text-white font-semibold text-sm leading-tight group-hover:text-pink-300 transition-colors">{vid.title}</h3>
                            <div className="flex items-center gap-3 mt-3 text-xs text-[#556677]">
                                <span className="flex items-center gap-1"><Eye size={11} /> {vid.views} views</span>
                                <span className="flex items-center gap-1 text-amber-400"><Star size={11} fill="currentColor" /> {vid.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
