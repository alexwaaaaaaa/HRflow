"use client";
import React, { useState } from 'react';
import { Users, ArrowLeft, Search, ThumbsUp, MessageSquare, Tag, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

const POSTS = [
    { id: 1, author: 'Priya M.', avatar: 'PM', role: 'HR Manager · TechCorp', title: 'Best practice for handling payroll correction after bank account change?', body: 'One of our employees updated their bank account mid-month. The salary already processed. What\'s the cleanest way to reverse and re-process?', tags: ['Payroll', 'Bank', 'Correction'], likes: 34, replies: 12, time: '2h ago', solved: true },
    { id: 2, author: 'Rahul S.', avatar: 'RS', role: 'Payroll Head · GlobalIT', title: 'ESI applicability after employee crosses ₹21,000 threshold midyear', body: 'Our employee\'s CTC crossed ₹21,000 in October. Should ESI apply till March or stop immediately? The ESIC portal is unclear.', tags: ['ESI', 'Compliance', 'Threshold'], likes: 28, replies: 9, time: '5h ago', solved: false },
    { id: 3, author: 'Deepa A.', avatar: 'DA', role: 'CHRO · Nova Retail', title: 'How to handle gratuity for employees with broken service period?', body: 'We have employees who left and rejoined. Does the 5-year gratuity threshold reset or accumulate? Need clarity before Year End.', tags: ['Gratuity', 'Compliance', 'Year End'], likes: 22, replies: 7, time: '1d ago', solved: true },
    { id: 4, author: 'Vijay K.', avatar: 'VK', role: 'HR Admin · BlueWave', title: 'Bulk upload of variable pay for 500+ employees in February payroll', body: 'We have sales incentives for March to add as variable pay. Is there a way to import via CSV without manually entering for each employee?', tags: ['Payroll', 'Variable Pay', 'Bulk Import'], likes: 19, replies: 5, time: '1d ago', solved: false },
    { id: 5, author: 'Anita K.', avatar: 'AK', role: 'Finance Dir · Kiran Mills', title: 'PF on Arrears — should TDS be deducted in the month of payment?', body: 'We paid salary arrears for Apr-Sep in October. Our CA says TDS should be spread; our payroll system is applying it all in October. Who is correct?', tags: ['PF', 'Arrears', 'TDS', 'Tax'], likes: 41, replies: 15, time: '2d ago', solved: true },
];

const STATS = [{ label: 'Members', value: '12,489' }, { label: 'Posts This Month', value: '844' }, { label: 'Questions Solved', value: '91%' }];

export default function CommunityForumScreen() {
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState('Latest');

    const filtered = POSTS.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Users size={22} className="text-cyan-400" /> Community Forum</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Ask, share, and learn from 12,000+ HR professionals</p>
                </div>
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-colors">
                    <Plus size={16} /> Ask Question
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {STATS.map(s => (
                    <div key={s.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 text-center">
                        <div className="text-2xl font-black text-cyan-400">{s.value}</div>
                        <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Search + Tabs */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                    <input type="text" placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none transition-colors" />
                </div>
                {['Latest', 'Top Voted', 'Unsolved', 'Solved'].map(t => (
                    <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab === t ? 'bg-cyan-600 text-white' : 'bg-[#0A1420] border border-[#1A2A3A] text-[#8899AA] hover:text-white'}`}>{t}</button>
                ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
                {filtered.map(post => (
                    <div key={post.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-all cursor-pointer group">
                        <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0">{post.avatar}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className="text-white font-bold text-xs">{post.author}</span>
                                    <span className="text-[#556677] text-xs">· {post.role}</span>
                                    <span className="text-[#445566] text-xs ml-auto">{post.time}</span>
                                    {post.solved && <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">✓ Solved</span>}
                                </div>
                                <h3 className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">{post.title}</h3>
                                <p className="text-[#8899AA] text-xs mt-1 line-clamp-2">{post.body}</p>
                                <div className="flex flex-wrap items-center gap-4 mt-3">
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.map(t => (
                                            <span key={t} className="text-[10px] text-[#556677] bg-[#1A2A3A] px-2 py-0.5 rounded-full flex items-center gap-1"><Tag size={8} />{t}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 ml-auto text-xs text-[#556677]">
                                        <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><ThumbsUp size={12} /> {post.likes}</span>
                                        <span className="flex items-center gap-1 text-cyan-400"><MessageSquare size={12} /> {post.replies} replies</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
