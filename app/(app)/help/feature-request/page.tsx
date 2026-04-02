"use client";
import React, { useState } from 'react';
import { TrendingUp, ArrowLeft, ThumbsUp, MessageSquare, Search, ChevronUp, Tag, Plus } from 'lucide-react';
import Link from 'next/link';

const REQUESTS = [
    { id: 'FR-821', title: 'Bulk salary revision with percentage-based hike', votes: 482, comments: 34, status: 'Planned', category: 'Payroll', tags: ['Salary', 'Bulk Operations'] },
    { id: 'FR-819', title: 'WhatsApp notification for payslip delivery', votes: 391, comments: 28, status: 'In Review', category: 'Notifications', tags: ['WhatsApp', 'Payslip'] },
    { id: 'FR-812', title: 'Flexi benefit plan (FBP) component configuratio…', votes: 344, comments: 21, status: 'Planned', category: 'Payroll', tags: ['FBP', 'Components'] },
    { id: 'FR-808', title: 'Multi-level leave approval workflows', votes: 298, comments: 45, status: 'In Review', category: 'Leave', tags: ['Workflow', 'Approval'] },
    { id: 'FR-801', title: 'AI-powered anomaly detection in attendance', votes: 267, comments: 19, status: 'Considering', category: 'AI/ML', tags: ['AI', 'Attendance'] },
    { id: 'FR-795', title: 'Integration with Slack for HR alerts & approvals', votes: 241, comments: 33, status: 'Considering', category: 'Integrations', tags: ['Slack', 'Integration'] },
    { id: 'FR-788', title: 'Automated Form 24Q filing with TRACES', votes: 218, comments: 12, status: 'Planned', category: 'Compliance', tags: ['Form 24Q', 'TDS'] },
    { id: 'FR-781', title: 'Employee self-service mobile app (iOS & Android)', votes: 612, comments: 92, status: 'In Development', category: 'Mobile', tags: ['Mobile App', 'Self-Service'] },
];

const STATUS_CONFIG: Record<string, { bg: string; text: string }> = {
    'In Development': { bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
    'Planned': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    'In Review': { bg: 'bg-amber-500/10', text: 'text-amber-400' },
    'Considering': { bg: 'bg-[#1A2A3A]', text: 'text-[#8899AA]' },
};

export default function FeatureRequestScreen() {
    const [search, setSearch] = useState('');
    const [voted, setVoted] = useState<string[]>(['FR-781']);
    const [showForm, setShowForm] = useState(false);
    const [newReq, setNewReq] = useState({ title: '', category: 'Payroll', desc: '' });

    const filtered = REQUESTS.filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><TrendingUp size={22} className="text-emerald-400" /> Feature Requests</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Vote for features you want. We ship the most popular ones every sprint.</p>
                </div>
                <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <Plus size={16} /> Request Feature
                </button>
            </div>

            {showForm && (
                <div className="bg-[#0A1420] border border-emerald-500/30 rounded-2xl p-5 space-y-4">
                    <h3 className="text-white font-bold">Submit a Feature Request</h3>
                    <input type="text" placeholder="Feature title" value={newReq.title} onChange={e => setNewReq(v => ({ ...v, title: e.target.value }))}
                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none" />
                    <select value={newReq.category} onChange={e => setNewReq(v => ({ ...v, category: e.target.value }))}
                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none">
                        {['Payroll', 'Leave', 'Compliance', 'Notifications', 'Integrations', 'AI/ML', 'Mobile', 'Reports'].map(c => <option key={c}>{c}</option>)}
                    </select>
                    <textarea placeholder="Describe the problem this would solve..." value={newReq.desc} onChange={e => setNewReq(v => ({ ...v, desc: e.target.value }))} rows={3}
                        className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 outline-none resize-none" />
                    <div className="flex gap-3">
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">Submit Request</button>
                        <button onClick={() => setShowForm(false)} className="bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] hover:text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">Cancel</button>
                    </div>
                </div>
            )}

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                <input type="text" placeholder="Search feature requests..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-emerald-500 outline-none text-sm transition-colors" />
            </div>

            <div className="space-y-3">
                {filtered.map(req => {
                    const hasVoted = voted.includes(req.id);
                    const cfg = STATUS_CONFIG[req.status] ?? STATUS_CONFIG['Considering'];
                    return (
                        <div key={req.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 flex items-start gap-4 hover:border-[#2A3A4A] transition-all">
                            <button onClick={() => setVoted(p => hasVoted ? p.filter(x => x !== req.id) : [...p, req.id])}
                                className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border font-bold text-sm min-w-16 transition-all ${hasVoted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#131B2B] border-[#2A3A4A] text-[#8899AA] hover:text-white hover:border-[#3A4A5A]'}`}>
                                <ChevronUp size={16} />
                                <span className="text-xs">{req.votes + (hasVoted && !voted.includes(req.id) ? -1 : hasVoted ? 1 : 0)}</span>
                            </button>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>{req.status}</span>
                                    <span className="text-[10px] text-[#556677]">{req.id}</span>
                                </div>
                                <div className="text-white font-semibold text-sm">{req.title}</div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {req.tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 text-[10px] text-[#556677] bg-[#1A2A3A] px-2 py-0.5 rounded-full"><Tag size={8} />{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-[#556677] text-xs shrink-0">
                                <MessageSquare size={12} /> {req.comments}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
