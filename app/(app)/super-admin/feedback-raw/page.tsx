"use client";
import React, { useState } from 'react';
import { MessageSquareDot, Search, Download, Star, Filter, ChevronDown, TrendingUp, TrendingDown, Minus, ThumbsUp, ThumbsDown, Eye, Smile, Meh, Frown, Building2, User } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['All', 'Product', 'Support', 'Onboarding', 'Pricing', 'Performance', 'Other'];
const SENTIMENTS = ['All', 'Positive', 'Neutral', 'Negative'];
const RATINGS = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

const RAW_FEEDBACK = [
    { id: 'FB-4421', org: 'TechCorp India Pvt Ltd', orgId: 'ORG-A981', user: 'Anita Kulkarni', role: 'HR Manager', date: '10 Mar 2026', rating: 5, sentiment: 'Positive', category: 'Product', subject: 'Payroll automation is a game changer', body: 'We used to spend 3 days on payroll. Now it takes 2 hours. The CTC breakup calculator and real-time validation is unmatched. Best HRMS decision we made.', nps: 10, tags: ['Payroll', 'Automation'], plan: 'Enterprise' },
    { id: 'FB-4420', org: 'Green Valley Foods', orgId: 'ORG-B442', user: 'Ravi Shankar', role: 'Founder & CEO', date: '10 Mar 2026', rating: 4, sentiment: 'Positive', category: 'Onboarding', subject: 'Onboarding was smooth, minor hiccups in bank verification', body: 'Overall onboarding was great. The team was helpful. The only issue was penny drop sometimes fails silently without a clear error message.', nps: 8, tags: ['Onboarding', 'Bank Verification'], plan: 'Growth' },
    { id: 'FB-4419', org: 'Sunrise Logistics', orgId: 'ORG-C119', user: 'Pooja Reddy', role: 'HR Head', date: '09 Mar 2026', rating: 2, sentiment: 'Negative', category: 'Support', subject: 'Support response time is too slow', body: 'We raised a critical payroll issue at 8 AM and got a response at 6 PM. For payroll critical issues this is unacceptable. We expect <2hr SLA for Sev-1 tickets.', nps: 3, tags: ['Support', 'SLA'], plan: 'Growth' },
    { id: 'FB-4418', org: 'MegaBuild Construction', orgId: 'ORG-D771', user: 'Vikram Nair', role: 'Admin', date: '09 Mar 2026', rating: 3, sentiment: 'Neutral', category: 'Pricing', subject: 'Good product but pricing per-employee is steep for us', body: "We have 800 contract workers who we need on the platform for attendance only. Paying full per-seat price for part-timers doesn't make sense. A lighter plan for gig workers would help.", nps: 6, tags: ['Pricing', 'Contract Workers'], plan: 'Growth' },
    { id: 'FB-4417', org: 'BlueWave Analytics', orgId: 'ORG-E553', user: 'Shruti Bose', role: 'CTO', date: '08 Mar 2026', rating: 5, sentiment: 'Positive', category: 'Product', subject: 'API documentation is excellent — integration was 2 days', body: 'Our Salesforce + HRFlow integration took only 2 days. The API docs are clear, the sandbox is reliable, and webhooks work exactly as described. 10/10 developer experience.', nps: 10, tags: ['API', 'Integration'], plan: 'Enterprise' },
    { id: 'FB-4416', org: 'Kiran Mills Ltd', orgId: 'ORG-F334', user: 'Deepa Agrawal', role: 'HR Admin', date: '08 Mar 2026', rating: 1, sentiment: 'Negative', category: 'Performance', subject: 'Dashboard loads very slowly on low-bandwidth connections', body: 'Our factory floors have poor internet. The dashboard sometimes takes 15-20 seconds to load on 2G connections. This leads to daily frustration for our plant HR teams.', nps: 2, tags: ['Performance', 'Mobile', 'Low Bandwidth'], plan: 'Starter' },
    { id: 'FB-4415', org: 'TechCorp India Pvt Ltd', orgId: 'ORG-A981', user: 'Manish Rao', role: 'Finance Director', date: '07 Mar 2026', rating: 4, sentiment: 'Positive', category: 'Product', subject: 'PF/ESI compliance reports saved us during inspection', body: 'The PF ECR filing and ESI reports are exactly in the format the PF office needs. During a surprise inspection last month, we generated the full report in 5 minutes. Inspector was impressed.', nps: 9, tags: ['Compliance', 'PF', 'ESI'], plan: 'Enterprise' },
    { id: 'FB-4414', org: 'Nova Retail Chain', orgId: 'ORG-G821', user: 'Teena Kapoor', role: 'HR Head', date: '07 Mar 2026', rating: 3, sentiment: 'Neutral', category: 'Product', subject: 'Attendance for multiple shifts could be more flexible', body: 'We run 3 shifts across 45 stores. The shift roster UI works but bulk assignment for 200+ employees per shift change takes too many clicks. A CSV import for shifts would help.', nps: 6, tags: ['Attendance', 'Shifts', 'Bulk Operations'], plan: 'Growth' },
    { id: 'FB-4413', org: 'CloudFirst Technologies', orgId: 'ORG-H992', user: 'Arjun Menon', role: 'CHRO', date: '06 Mar 2026', rating: 5, sentiment: 'Positive', category: 'Product', subject: 'OKR module is the best we have used', body: 'We evaluated Lattice, Leapsome, and HRFlow. HRFlow OKR module wins because it natively connects to our payroll data. When we set OKRs tied to incentives, the calculation is automatic.', nps: 10, tags: ['OKRs', 'Performance', 'Incentives'], plan: 'Enterprise' },
    { id: 'FB-4412', org: 'Sunrise Logistics', orgId: 'ORG-C119', user: 'Suresh Kumar', role: 'HR Executive', date: '06 Mar 2026', rating: 4, sentiment: 'Positive', category: 'Support', subject: 'Help center articles are very well written', body: 'Whenever I am stuck I find the answer in the help center within 5 minutes. The articles have screenshots and step-by-step instructions. Very helpful for new HR admins.', nps: 8, tags: ['Documentation', 'Help Center'], plan: 'Growth' },
];

const sentimentIcon = (sentiment: string) => {
    if (sentiment === 'Positive') return <Smile size={14} className="text-emerald-400" />;
    if (sentiment === 'Negative') return <Frown size={14} className="text-red-400" />;
    return <Meh size={14} className="text-amber-400" />;
};

const sentimentColor: Record<string, string> = {
    Positive: 'text-emerald-400',
    Neutral: 'text-amber-400',
    Negative: 'text-red-400',
};

const ratingColor = (r: number) => r >= 4 ? 'text-emerald-400' : r === 3 ? 'text-amber-400' : 'text-red-400';

export default function FeedbackRawScreen() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sentiment, setSentiment] = useState('All');
    const [rating, setRating] = useState('All');
    const [expanded, setExpanded] = useState<string | null>(null);

    const avgRating = (RAW_FEEDBACK.reduce((a, f) => a + f.rating, 0) / RAW_FEEDBACK.length).toFixed(1);
    const positiveCount = RAW_FEEDBACK.filter(f => f.sentiment === 'Positive').length;
    const negativeCount = RAW_FEEDBACK.filter(f => f.sentiment === 'Negative').length;
    const avgNps = Math.round(RAW_FEEDBACK.reduce((a, f) => a + f.nps, 0) / RAW_FEEDBACK.length);

    const filtered = RAW_FEEDBACK.filter(f => {
        const q = search.toLowerCase();
        const matchSearch = !q || f.org.toLowerCase().includes(q) || f.subject.toLowerCase().includes(q) || f.user.toLowerCase().includes(q) || f.body.toLowerCase().includes(q);
        const matchCat = category === 'All' || f.category === category;
        const matchSent = sentiment === 'All' || f.sentiment === sentiment;
        const matchRating = rating === 'All' || f.rating === parseInt(rating[0]);
        return matchSearch && matchCat && matchSent && matchRating;
    });

    return (
        <div className="min-h-screen p-6 max-w-[1400px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                        <MessageSquareDot size={24} className="text-pink-400" />
                        Raw Customer Feedback
                    </h1>
                    <p className="text-[#8899AA] text-sm">Unfiltered verbatim feedback from all tenants — ratings, NPS responses, and support feedback across the platform.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Filter size={16} />
                        Advanced Filter
                    </button>
                    <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Download size={16} />
                        Export to CSV
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Avg Rating', value: `${avgRating} / 5`, icon: Star, color: 'text-amber-400', sub: 'Based on 1,292 responses' },
                    { label: 'Positive Responses', value: `${positiveCount}`, icon: ThumbsUp, color: 'text-emerald-400', sub: `${Math.round(positiveCount / RAW_FEEDBACK.length * 100)}% of total` },
                    { label: 'Negative Responses', value: `${negativeCount}`, icon: ThumbsDown, color: 'text-red-400', sub: `${Math.round(negativeCount / RAW_FEEDBACK.length * 100)}% of total` },
                    { label: 'Avg NPS Score', value: `${avgNps}`, icon: TrendingUp, color: avgNps >= 7 ? 'text-emerald-400' : avgNps >= 5 ? 'text-amber-400' : 'text-red-400', sub: avgNps >= 7 ? 'Good — Promoters majority' : 'Needs improvement' },
                ].map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={16} className={stat.color} />
                                <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                            </div>
                            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                            <div className="text-[10px] text-[#445566]">{stat.sub}</div>
                        </div>
                    );
                })}
            </div>

            {/* Sentiment Breakdown Bar */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-sm">Sentiment Overview</h3>
                    <span className="text-xs text-[#556677]">{RAW_FEEDBACK.length} responses from {new Set(RAW_FEEDBACK.map(f => f.orgId)).size} tenants</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                    <div style={{ width: `${positiveCount / RAW_FEEDBACK.length * 100}%` }} className="bg-emerald-500 rounded-l-full transition-all" />
                    <div style={{ width: `${(RAW_FEEDBACK.filter(f => f.sentiment === 'Neutral').length / RAW_FEEDBACK.length) * 100}%` }} className="bg-amber-500" />
                    <div style={{ width: `${negativeCount / RAW_FEEDBACK.length * 100}%` }} className="bg-red-500 rounded-r-full transition-all" />
                </div>
                <div className="flex gap-6 mt-3 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Positive ({positiveCount})</span>
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Neutral ({RAW_FEEDBACK.filter(f => f.sentiment === 'Neutral').length})</span>
                    <span className="flex items-center gap-1.5 text-red-400 font-bold"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Negative ({negativeCount})</span>
                </div>
            </div>

            {/* Filters + Cards */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-3 items-center bg-[#060D1A]">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input
                            type="text"
                            placeholder="Search feedback, org, user..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-pink-500 outline-none transition-colors"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setCategory(c)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${category === c ? 'bg-pink-600 text-white' : 'bg-[#131B2B] text-[#8899AA] hover:text-white border border-[#2A3A4A]'}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <select value={sentiment} onChange={e => setSentiment(e.target.value)}
                            className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 outline-none appearance-none pr-8 cursor-pointer">
                            {SENTIMENTS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sentiments' : s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#556677] pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select value={rating} onChange={e => setRating(e.target.value)}
                            className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 outline-none appearance-none pr-8 cursor-pointer">
                            {RATINGS.map(r => <option key={r} value={r}>{r === 'All' ? 'All Ratings' : r}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#556677] pointer-events-none" />
                    </div>
                </div>

                {/* Feedback List */}
                <div className="divide-y divide-[#1A2A3A]">
                    {filtered.map(fb => {
                        const isExp = expanded === fb.id;
                        return (
                            <div key={fb.id} className="hover:bg-[#131B2B] transition-colors">
                                <div className="p-5 flex flex-col gap-3 cursor-pointer" onClick={() => setExpanded(isExp ? null : fb.id)}>
                                    <div className="flex items-start gap-4">
                                        {/* Org avatar */}
                                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-xs font-bold text-pink-400 shrink-0">
                                            {fb.org.split(' ').slice(0, 2).map(w => w[0]).join('')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                                <span className="text-white font-bold text-sm">{fb.subject}</span>
                                                {/* Stars */}
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map(s => (
                                                        <Star key={s} size={12} className={s <= fb.rating ? 'text-amber-400 fill-amber-400' : 'text-[#2A3A4A]'} />
                                                    ))}
                                                </div>
                                                <span className={`text-xs font-bold ${ratingColor(fb.rating)}`}>{fb.rating}.0</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-[#556677]">
                                                <span className="flex items-center gap-1"><Building2 size={11} /> {fb.org}</span>
                                                <span className="flex items-center gap-1"><User size={11} /> {fb.user} · {fb.role}</span>
                                                <span>{fb.date}</span>
                                                <span className="px-2 py-0.5 rounded bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] font-bold">{fb.category}</span>
                                                <span className="px-2 py-0.5 rounded bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] font-bold">{fb.plan}</span>
                                                <span className="flex items-center gap-1">{sentimentIcon(fb.sentiment)} <span className={`font-bold ${sentimentColor[fb.sentiment]}`}>{fb.sentiment}</span></span>
                                                <span className="text-[#556677]">NPS: <span className="text-white font-bold">{fb.nps}/10</span></span>
                                            </div>
                                        </div>
                                        <button className="text-[#556677] hover:text-white transition-colors shrink-0">
                                            <Eye size={16} />
                                        </button>
                                    </div>

                                    {/* Preview / expanded body */}
                                    {isExp ? (
                                        <div className="ml-14 space-y-3">
                                            <p className="text-[#CCDDEE] text-sm leading-relaxed border-l-2 border-pink-500/40 pl-4 italic">
                                                &ldquo;{fb.body}&rdquo;
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {fb.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold">{tag}</span>
                                                ))}
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-600/30 transition-colors">Mark Resolved</button>
                                                <button className="px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold hover:bg-indigo-600/30 transition-colors">Assign to Team</button>
                                                <button className="px-3 py-1.5 rounded-lg bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] text-xs font-bold hover:text-white transition-colors">Add to Roadmap</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="ml-14 text-[#8899AA] text-sm truncate">{fb.body}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="text-center py-16 text-[#8899AA]">
                            <MessageSquareDot size={36} className="mx-auto mb-3 opacity-30" />
                            <p className="font-semibold">No feedback matches your filters</p>
                            <p className="text-xs mt-1">Try clearing your search or changing filters</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-xs text-[#8899AA]">Showing {filtered.length} of {RAW_FEEDBACK.length} feedback responses</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, '…', 52].map((p, i) => (
                            <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${p === 1 ? 'bg-pink-600 text-white' : 'bg-[#131B2B] text-[#8899AA] hover:text-white border border-[#2A3A4A]'}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
