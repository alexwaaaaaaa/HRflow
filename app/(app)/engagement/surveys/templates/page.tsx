"use client";
import React, { useState } from 'react';
import {
    FileText, Search, Library, Plus, Star, Tag, ChevronRight, Copy
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['All', 'Onboarding', 'Engagement', 'Manager Effectiveness', 'Diversity & Inclusion', 'Exit', 'Return to Office'];

const TEMPLATES = [
    { id: 1, title: 'eNPS Baseline Pulse', category: 'Engagement', questions: 2, time: '1 min', recommended: true, desc: "Standardized eNPS question + open text feedback to establish a baseline sentiment." },
    { id: 2, title: '30-Day New Hire Check-in', category: 'Onboarding', questions: 10, time: '5 mins', recommended: true, desc: "Assess early onboarding experience, training quality, and role clarity." },
    { id: 3, title: 'Manager Effectiveness Pulse', category: 'Manager Effectiveness', questions: 12, time: '6 mins', recommended: false, desc: "Evaluate managerial support, communication, and team leadership anonymously." },
    { id: 4, title: 'Annual DEI Survey', category: 'Diversity & Inclusion', questions: 25, time: '12 mins', recommended: false, desc: "Comprehensive demographic and inclusion sentiment analysis." },
    { id: 5, title: 'Exit Survey', category: 'Exit', questions: 15, time: '8 mins', recommended: true, desc: "Understand reasons for leaving and areas for systemic improvement." },
    { id: 6, title: 'Remote Work Experience', category: 'Return to Office', questions: 8, time: '4 mins', recommended: false, desc: "Pulse survey on remote work challenges and hybrid preferences." },
];

export default function SurveyTemplatesScreen() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTemplates = TEMPLATES.filter(t =>
        (activeCategory === 'All' || t.category === activeCategory) &&
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Library size={32} className="text-[#33E6FF]" /> Template Library
                    </h1>
                    <p className="text-[#8899AA]">Start with expert-designed surveys or build your own from scratch.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/engagement/surveys/create" className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center gap-2">
                        <Plus size={18} /> Blank Survey
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Categories Sidebar */}
                <div className="w-full lg:w-[260px] shrink-0 sticky top-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-4 shadow-xl">
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs px-2">Categories</h3>
                        <div className="flex flex-col gap-1">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-bold text-sm ${activeCategory === cat ? 'bg-[#33E6FF]/10 text-[#33E6FF] shadow-sm' : 'text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white'}`}
                                >
                                    {cat}
                                    {activeCategory === cat && <ChevronRight size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="flex-1 w-full relative">

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Tag size={20} className="text-[#33E6FF]" /> {activeCategory} Templates <span className="text-[#445566] text-sm font-medium">({filteredTemplates.length})</span>
                            </h2>
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input type="text" placeholder="Search templates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full sm:w-64 bg-[#152336] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#33E6FF] transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                        {filteredTemplates.map(template => (
                            <div key={template.id} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-[#33E6FF]/50 transition-colors flex flex-col h-full cursor-pointer" onClick={() => router.push('/engagement/surveys/create')}>

                                {/* Hover Overlay */}
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#33E6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-[#1A2A3A] rounded-2xl group-hover:bg-[#33E6FF]/10 transition-colors">
                                        <FileText size={24} className="text-[#8899AA] group-hover:text-[#33E6FF] transition-colors" />
                                    </div>
                                    {template.recommended && (
                                        <span className="bg-[#FFB020]/10 text-[#FFB020] text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
                                            <Star size={12} className="fill-[#FFB020]" /> Recommended
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#33E6FF] transition-colors">{template.title}</h3>
                                <p className="text-[#8899AA] text-sm mb-6 flex-1">{template.desc}</p>

                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#1A2A3A]">
                                    <div className="flex gap-4 text-xs font-bold text-[#445566] uppercase tracking-wider">
                                        <span>{template.questions} Qs</span>
                                        <span>•</span>
                                        <span>~{template.time}</span>
                                    </div>
                                    <button className="text-[#33E6FF] text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                                        <Copy size={16} /> Use Template
                                    </button>
                                </div>

                            </div>
                        ))}

                        {filteredTemplates.length === 0 && (
                            <div className="col-span-full py-12 text-center border-2 border-dashed border-[#2A3A4A] rounded-3xl">
                                <FileText size={48} className="text-[#2A3A4A] mx-auto mb-4" />
                                <h3 className="text-white font-bold text-lg mb-2">No templates found</h3>
                                <p className="text-[#8899AA]">Try adjusting your search criteria in the {activeCategory} category.</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
