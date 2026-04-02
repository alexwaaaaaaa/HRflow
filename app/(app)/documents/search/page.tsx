"use client";

import React, { useState } from 'react';
import {
    Search, Filter, Calendar, Type, Users, Shield,
    FileText, User, Clock, CheckCircle2, AlertTriangle, File, Folder
} from 'lucide-react';
import Link from 'next/link';

const SEARCH_RESULTS = [
    { id: '1', name: 'Q4_Appraisal_Report_Rahul.pdf', type: 'PDF', owner: 'Rahul Sharma', date: '12 Nov 2024', size: '2.4 MB', cat: 'Appraisals', match: 'Matched in full-text content' },
    { id: '2', name: 'Offer_Letter_Rahul_Sharma_Signed.pdf', type: 'PDF', owner: 'HR Team', date: '01 Nov 2024', size: '1.1 MB', cat: 'Employee Records', match: 'Matched in filename' },
    { id: '3', name: 'Rahul_ID_Proof_Aadhaar.jpg', type: 'JPG', owner: 'HR Team', date: '01 Nov 2024', size: '500 KB', cat: 'Employee Records', match: 'Matched in tags' },
    { id: '4', name: 'Rahul_SDE2_Role_Expectations.docx', type: 'DOCX', owner: 'Engineering', date: '28 Oct 2024', size: '145 KB', cat: 'Job Descriptions', match: 'Matched in filename' },
];

export default function DocumentSearchScreen() {
    const [query, setQuery] = useState('Rahul Sharma');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-[1400px] mx-auto w-full flex flex-col flex-1">

                {/* Header & Main Search */}
                <div className="mb-6 shrink-0 text-center max-w-2xl mx-auto w-full pt-4">
                    <h1 className="text-2xl font-bold text-white mb-6">Global Document Search</h1>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#0066FF] rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative flex items-center bg-[#0A1420] border border-[#1A2A3A] focus-within:border-[#0066FF] rounded-xl overflow-hidden shadow-lg transition-colors">
                            <div className="pl-4 pr-2 text-[#556677]"><Search size={24} /></div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name, content, tag, ID..."
                                className="w-full bg-transparent text-white text-lg px-2 py-4 outline-none placeholder-[#556677]"
                            />
                            <div className="pr-4 pl-2">
                                <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_10px_rgba(0,102,255,0.3)]">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 flex-1 min-h-0">

                    {/* Left Filters */}
                    <div className="w-64 shrink-0 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-white uppercase tracking-wider text-xs">Filters</h3>
                            <button className="text-xs text-[#0066FF] hover:underline">Clear All</button>
                        </div>

                        <div className="space-y-6">
                            <FilterSection title="File Type" icon={<Type size={14} />}>
                                <label className="flex items-center gap-2 text-sm text-[#8899AA] hover:text-white cursor-pointer"><input type="checkbox" className="accent-[#0066FF]" defaultChecked /> PDF Documents</label>
                                <label className="flex items-center gap-2 text-sm text-[#8899AA] hover:text-white cursor-pointer"><input type="checkbox" className="accent-[#0066FF]" defaultChecked /> Word (DOCX)</label>
                                <label className="flex items-center gap-2 text-sm text-[#8899AA] hover:text-white cursor-pointer"><input type="checkbox" className="accent-[#0066FF]" /> Spreadsheets (XLSX)</label>
                                <label className="flex items-center gap-2 text-sm text-[#8899AA] hover:text-white cursor-pointer"><input type="checkbox" className="accent-[#0066FF]" /> Images (JPG, PNG)</label>
                            </FilterSection>

                            <FilterSection title="Date Modified" icon={<Calendar size={14} />}>
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-[#0066FF]">
                                    <option>Any time</option>
                                    <option>Past 24 hours</option>
                                    <option>Past week</option>
                                    <option>Past month</option>
                                    <option>Past year</option>
                                    <option>Custom range...</option>
                                </select>
                            </FilterSection>

                            <FilterSection title="Category" icon={<Folder size={14} />}>
                                <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-[#0066FF]">
                                    <option>All Categories</option>
                                    <option>Employee Records</option>
                                    <option>Corporate Policies</option>
                                    <option>Appraisals</option>
                                </select>
                            </FilterSection>

                            <FilterSection title="Owner" icon={<Users size={14} />}>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-2.5 text-[#556677]" />
                                    <input type="text" placeholder="Find user..." className="w-full bg-[#060B14] border border-[#1A2A3A] pl-8 pr-3 py-2 rounded-lg text-sm text-white outline-none focus:border-[#0066FF]" />
                                </div>
                            </FilterSection>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1 bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg flex flex-col min-h-0 overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#0D1928] sticky top-0 z-10 flex justify-between items-center">
                            <h2 className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider">
                                {query ? `Found ${SEARCH_RESULTS.length} results for "${query}"` : 'Recent Files'}
                            </h2>
                            <div className="text-xs text-[#556677]">Search completed in 0.42s</div>
                        </div>

                        <div className="flex-1 overflow-auto custom-scrollbar p-2">
                            {SEARCH_RESULTS.map(res => (
                                <div key={res.id} className="p-4 hover:bg-[#1A2A3A]/30 transition-colors border-b border-[#1A2A3A]/50 last:border-0 rounded-lg group cursor-pointer flex gap-4">
                                    <div className={`w-12 h-12 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs border
                                        ${res.type === 'PDF' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                            res.type === 'DOCX' ? 'bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/20' :
                                                'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                        <File size={20} className="mb-0.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#0066FF] transition-colors truncate">{res.name}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#8899AA] mb-2">
                                            <span className="flex items-center gap-1.5"><User size={12} /> {res.owner}</span>
                                            <span className="flex items-center gap-1.5"><Clock size={12} /> {res.date}</span>
                                            <span>{res.size}</span>
                                            <span className="bg-[#1A2A3A] px-2 py-0.5 rounded text-[#556677] border border-[#2A3A4A]">{res.cat}</span>
                                        </div>
                                        <p className="text-xs text-[#556677] italic flex items-center gap-1.5">
                                            <Search size={12} className="text-[#00E5A0]" /> {res.match}
                                        </p>
                                    </div>
                                    <div className="shrink-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="px-3 py-1.5 border border-[#2A3A4A] bg-[#1A2A3A] text-white text-xs font-semibold rounded hover:bg-[#2A3A4A] transition-colors">
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function FilterSection({ title, icon, children }: any) {
    return (
        <div>
            <h4 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-3">
                <span className="text-[#0066FF]">{icon}</span> {title}
            </h4>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
}
