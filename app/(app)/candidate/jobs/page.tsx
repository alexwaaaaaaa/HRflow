"use client";
import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Filter, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Page from '@/components/ui/Page';
import Button from '@/components/ui/Button';

const JOBS = [
    { id: 'JB001', title: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Bengaluru, India', type: 'Full-time', model: 'Hybrid', posted: '2 days ago' },
    { id: 'JB002', title: 'Product Manager (B2B SaaS)', dept: 'Product', loc: 'Remote', type: 'Full-time', model: 'Remote', posted: '4 days ago' },
    { id: 'JB003', title: 'Staff Developer Advocate', dept: 'DevRel', loc: 'San Francisco, CA', type: 'Full-time', model: 'On-site', posted: '1 week ago' },
    { id: 'JB004', title: 'Technical Recruiter', dept: 'Talent', loc: 'Bengaluru, India', type: 'Full-time', model: 'Hybrid', posted: '1 week ago' },
    { id: 'JB005', title: 'Backend Software Engineer (Go)', dept: 'Engineering', loc: 'Remote', type: 'Full-time', model: 'Remote', posted: '2 weeks ago' },
];

const CATEGORIES = ['All Roles', 'Engineering', 'Product', 'Design', 'Sales', 'Remote'];

export default function JobListingsScreen() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <Page
            title="Open Positions"
            subtitle="Join a team building the future of work"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Careers', href: '/candidate/jobs' },
            ]}
        >
            <div className="space-y-8">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]" aria-hidden="true" />
                        <label htmlFor="job-search" className="sr-only">Search jobs</label>
                        <input
                            id="job-search"
                            type="text"
                            placeholder="Search by role, keyword or department..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-4 text-white focus:border-indigo-500 outline-none text-base"
                        />
                    </div>
                    <Button variant="ghost" size="md" aria-label="Filter jobs">
                        <Filter size={20} />
                    </Button>
                    <Button variant="primary" size="md">
                        Search Roles
                    </Button>
                </div>

                <div className="flex gap-2 pb-2">
                    {CATEGORIES.map((t, i) => (
                        <Button
                            key={t}
                            variant={i === activeCategory ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveCategory(i)}
                        >
                            {t}
                        </Button>
                    ))}
                </div>

                <div className="space-y-4 pt-4">
                    {JOBS.filter(j => !search || j.title.toLowerCase().includes(search.toLowerCase())).map((j) => (
                        <Link href={`/candidate/job-detail?id=${j.id}`} key={j.id} className="block bg-[#0A1420] hover:bg-[#131B2B] border border-[#1A2A3A] hover:border-indigo-500/50 rounded-2xl p-6 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{j.title}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#8899AA]">
                                        <span className="flex items-center gap-1.5"><Briefcase size={16} aria-hidden="true" /> {j.dept}</span>
                                        <span className="flex items-center gap-1.5"><MapPin size={16} aria-hidden="true" /> {j.loc} <span className="bg-[#1A2A3A] text-xs px-1.5 py-0.5 rounded ml-1">{j.model}</span></span>
                                        <span className="flex items-center gap-1.5"><Clock size={16} aria-hidden="true" /> {j.type}</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-4">
                                    <span className="text-xs text-[#556677] font-semibold">{j.posted}</span>
                                    <Button variant="ghost" size="sm" aria-label="View job details">
                                        <ChevronRight size={20} />
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Page>
    );
}
