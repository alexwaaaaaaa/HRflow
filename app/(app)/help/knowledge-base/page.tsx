"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { BookOpen, Search, ChevronRight, ArrowLeft, Clock, Eye, ThumbsUp, Tag } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
    { name: 'Getting Started', count: 24, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { name: 'Payroll', count: 68, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    { name: 'Employees', count: 45, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'Compliance', count: 52, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { name: 'Leave & Attendance', count: 38, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { name: 'Recruitment', count: 31, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    { name: 'Performance', count: 29, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { name: 'Integrations & API', count: 22, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
];

const ARTICLES = [
    { title: 'Complete guide to running monthly payroll', category: 'Payroll', views: 12400, time: '8 min', helpful: 98, tags: ['Payroll', 'Run Payroll'] },
    { title: 'How to set up PF and ESI for your company', category: 'Compliance', views: 9800, time: '6 min', helpful: 96, tags: ['PF', 'ESI', 'Compliance'] },
    { title: 'Employee onboarding checklist — 6 steps', category: 'Employees', views: 8100, time: '5 min', helpful: 94, tags: ['Onboarding', 'New Employee'] },
    { title: 'Configuring leave policies: PL, SL, CL setup', category: 'Leave & Attendance', views: 7200, time: '7 min', helpful: 93, tags: ['Leave', 'Policy'] },
    { title: 'IT declarations and Form 16 management', category: 'Compliance', views: 5900, time: '10 min', helpful: 91, tags: ['Form 16', 'Tax', 'IT'] },
    { title: 'Understanding CTC breakup and salary components', category: 'Payroll', views: 5400, time: '9 min', helpful: 90, tags: ['CTC', 'Salary', 'Components'] },
    { title: 'Setting up biometric attendance integration', category: 'Leave & Attendance', views: 4800, time: '6 min', helpful: 88, tags: ['Attendance', 'Biometric'] },
    { title: 'How to bulk-import employees via CSV', category: 'Employees', views: 4200, time: '4 min', helpful: 87, tags: ['Import', 'CSV', 'Bulk'] },
    { title: 'Generating PF ECR file for EPFO portal', category: 'Compliance', views: 3900, time: '5 min', helpful: 95, tags: ['PF ECR', 'EPFO'] },
    { title: 'API authentication and webhook setup', category: 'Integrations & API', views: 3600, time: '12 min', helpful: 89, tags: ['API', 'Webhook', 'Auth'] },
];

export default function KnowledgeBaseScreen() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = ARTICLES.filter(a => {
        const q = search.toLowerCase();
        const matchQ = !q || a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q));
        const matchCat = activeCategory === 'All' || a.category === activeCategory;
        return matchQ && matchCat;
    });

    return (
        <Page
            title="Knowledge Base"
            breadcrumbs={[{ label: "Help", href: "/help" }, { label: "Knowledge Base" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold transition-colors flex items-center gap-1"><ArrowLeft size={14} /> Help Center</Link>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><BookOpen size={22} className="text-indigo-400" /> Knowledge Base</h1>
                    <p className="text-[#8899AA] text-sm mt-1">400+ articles, guides, and how-tos</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#556677]" />
                <input type="text" placeholder="Search articles, guides..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-2xl pl-12 pr-4 py-3.5 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{ name: 'All', count: ARTICLES.length, color: 'text-white', bg: 'bg-[#131B2B]', border: 'border-[#2A3A4A]' }, ...CATEGORIES].map(cat => (
                    <button key={cat.name} onClick={() => setActiveCategory(cat.name)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${activeCategory === cat.name ? `${cat.bg} ${cat.border} ${cat.color}` : 'bg-[#0A1420] border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]'}`}>
                        <span className="font-bold text-sm">{cat.name}</span>
                        <span className="text-xs font-bold opacity-70">{cat.count}</span>
                    </button>
                ))}
            </div>

            {/* Articles */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8899AA]">{filtered.length} articles</span>
                </div>
                {filtered.map((article, i) => (
                    <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 flex items-start gap-4 hover:border-[#2A3A4A] hover:bg-[#131B2B] transition-all cursor-pointer group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <BookOpen size={14} className="text-indigo-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">{article.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#556677]">
                                <span className="px-2 py-0.5 rounded bg-[#1A2A3A] text-[#8899AA]">{article.category}</span>
                                <span className="flex items-center gap-1"><Clock size={10} /> {article.time} read</span>
                                <span className="flex items-center gap-1"><Eye size={10} /> {article.views.toLocaleString()}</span>
                                <span className="flex items-center gap-1 text-emerald-400"><ThumbsUp size={10} /> {article.helpful}% helpful</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {article.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1A2A3A] text-[#556677] text-[10px]"><Tag size={8} />{tag}</span>
                                ))}
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-[#445566] group-hover:text-white transition-colors shrink-0 mt-1" />
                    </div>
                ))}
            </div>
        </div>
    
        </Page>
    );
}
