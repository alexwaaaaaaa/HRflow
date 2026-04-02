"use client";
import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Filter, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const JOBS = [
    { id: 'JB001', title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Bengaluru, India', type: 'Full-time', model: 'Hybrid', posted: '2 days ago' },
    { id: 'JB002', title: 'Product Manager (B2B SaaS)', dept: 'Product', loc: 'Remote', type: 'Full-time', model: 'Remote', posted: '4 days ago' },
    { id: 'JB003', title: 'Staff Developer Advocate', dept: 'DevRel', loc: 'San Francisco, CA', type: 'Full-time', model: 'On-site', posted: '1 week ago' },
    { id: 'JB004', title: 'Technical Recruiter', dept: 'Talent', loc: 'Bengaluru, India', type: 'Full-time', model: 'Hybrid', posted: '1 week ago' },
    { id: 'JB005', title: 'Backend Software Engineer (Go)', dept: 'Engineering', loc: 'Remote', type: 'Full-time', model: 'Remote', posted: '2 weeks ago' },
];

export default function JobListingsScreen() {
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen bg-[#060D1A] py-12 px-6">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
                    <h1 className="text-5xl font-black text-white tracking-tight">Come build with us.</h1>
                    <p className="text-[#8899AA] text-lg">Join a team of passionate builders creating the operating system for the modern workforce.</p>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search by role, keyword or department..." value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-4 text-white focus:border-indigo-500 outline-none text-base" />
                    </div>
                    <button className="bg-[#131B2B] border border-[#2A3A4A] text-white p-4 rounded-xl flex items-center justify-center hover:bg-[#1A2A3A] transition-colors" title="Filters">
                        <Filter size={20} />
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl transition-colors">
                        Search Roles
                    </button>
                </div>

                <div className="flex gap-2 pb-2">
                    {['All Roles', 'Engineering', 'Product', 'Design', 'Sales', 'Remote'].map((t, i) => (
                        <button key={i} className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${i === 0 ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-[#131B2B] text-[#556677] border-[#2A3A4A] hover:text-white'}`}>
                            {t}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 pt-4">
                    {JOBS.filter(j => !search || j.title.toLowerCase().includes(search.toLowerCase())).map((j, i) => (
                        <Link href={`/candidate/job-detail?id=${j.id}`} key={i} className="block bg-[#0A1420] hover:bg-[#131B2B] border border-[#1A2A3A] hover:border-indigo-500/50 rounded-2xl p-6 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{j.title}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#8899AA]">
                                        <span className="flex items-center gap-1.5"><Briefcase size={16} /> {j.dept}</span>
                                        <span className="flex items-center gap-1.5"><MapPin size={16} /> {j.loc} <span className="bg-[#1A2A3A] text-xs px-1.5 py-0.5 rounded ml-1">{j.model}</span></span>
                                        <span className="flex items-center gap-1.5"><Clock size={16} /> {j.type}</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-4">
                                    <span className="text-xs text-[#556677] font-semibold">{j.posted}</span>
                                    <button className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
