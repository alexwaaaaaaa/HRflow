"use client";
import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, Video, Zap, Bug, MessageCircle, Bell, Keyboard, BarChart2, Film, Users, ArrowRight, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const QUICK_LINKS = [
    { label: 'Knowledge Base', href: '/help/knowledge-base', icon: BookOpen, color: 'from-indigo-600 to-indigo-400', desc: '400+ articles' },
    { label: 'Video Tutorials', href: '/help/videos', icon: Video, color: 'from-pink-600 to-pink-400', desc: '80+ videos' },
    { label: 'Getting Started', href: '/help/getting-started', icon: Zap, color: 'from-amber-600 to-amber-400', desc: '6-step guide' },
    { label: 'Feature Request', href: '/help/feature-request', icon: TrendingUp, color: 'from-emerald-600 to-emerald-400', desc: '2.1k requests' },
    { label: 'Bug Report', href: '/help/bug-report', icon: Bug, color: 'from-red-600 to-red-400', desc: 'Report issues' },
    { label: 'Chat Support', href: '/help/chat', icon: MessageCircle, color: 'from-blue-600 to-blue-400', desc: 'Avg 3 min reply' },
    { label: 'Changelog', href: '/help/changelog', icon: Bell, color: 'from-purple-600 to-purple-400', desc: "What's new" },
    { label: 'Keyboard Shortcuts', href: '/help/shortcuts', icon: Keyboard, color: 'from-teal-600 to-teal-400', desc: '50+ shortcuts' },
    { label: 'Sample Reports', href: '/help/sample-reports', icon: BarChart2, color: 'from-orange-600 to-orange-400', desc: '25 templates' },
    { label: 'Video Library', href: '/help/video-library', icon: Film, color: 'from-rose-600 to-rose-400', desc: 'Full courses' },
    { label: 'Community', href: '/help/community', icon: Users, color: 'from-cyan-600 to-cyan-400', desc: '12k members' },
];

const POPULAR_ARTICLES = [
    { title: 'How to run payroll for the first time', views: '12.4k', time: '5 min read', category: 'Payroll' },
    { title: 'Setting up PF & ESI contributions', views: '9.8k', time: '8 min read', category: 'Compliance' },
    { title: 'Add a new employee — complete guide', views: '8.1k', time: '10 min read', category: 'Employees' },
    { title: 'How to configure leave policies', views: '6.7k', time: '6 min read', category: 'Leave' },
    { title: 'IT declarations & Form 16 explained', views: '5.9k', time: '12 min read', category: 'Tax' },
];

const RECENT_TICKETS = [
    { id: 'TCK-1042', subject: 'Salary revision not reflecting in payslip', status: 'Open', time: '2h ago' },
    { id: 'TCK-1039', subject: 'PF challan download failing', status: 'Resolved', time: '1d ago' },
    { id: 'TCK-1034', subject: 'Bulk import template error column mismatch', status: 'In Progress', time: '2d ago' },
];

export default function HelpCenterScreen() {
    const [query, setQuery] = useState('');
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-8">
            {/* Hero Search */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0D1928] via-[#0A1420] to-[#060B14] border border-[#1A2A3A] p-10 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/10 pointer-events-none" />
                <HelpCircle size={40} className="mx-auto mb-4 text-indigo-400" />
                <h1 className="text-3xl font-black text-white mb-2">How can we help you?</h1>
                <p className="text-[#8899AA] mb-8">Search 400+ articles, guides, and tutorials</p>
                <div className="max-w-2xl mx-auto relative">
                    <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#556677]" />
                    <input
                        type="text"
                        placeholder='Try "run payroll", "PF filing", "add employee"…'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-[#060B14] border border-[#2A3A4A] rounded-2xl pl-14 pr-6 py-4 text-base text-white placeholder-[#445566] focus:border-indigo-500 outline-none transition-colors"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">Search</button>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Run Payroll', 'PF & ESI', 'Salary Revision', 'Leave Policy', 'Form 16'].map(tag => (
                        <button key={tag} className="px-3 py-1 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] hover:text-white text-xs transition-colors">{tag}</button>
                    ))}
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">Browse by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {QUICK_LINKS.map(link => {
                        const Icon = link.icon;
                        return (
                            <Link key={link.href} href={link.href} className="group bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-4 flex flex-col items-center text-center hover:border-[#2A3A4A] hover:bg-[#131B2B] transition-all">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <Icon size={20} className="text-white" />
                                </div>
                                <div className="text-white text-xs font-bold mb-0.5">{link.label}</div>
                                <div className="text-[#556677] text-[10px]">{link.desc}</div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Popular Articles */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
                        <Star size={16} className="text-amber-400" />
                        <h3 className="font-bold text-white">Most Popular Articles</h3>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {POPULAR_ARTICLES.map((a, i) => (
                            <div key={i} className="p-4 flex items-center gap-4 hover:bg-[#131B2B] transition-colors cursor-pointer group">
                                <div className="text-2xl font-black text-[#1A2A3A] group-hover:text-[#2A3A4A] w-8 shrink-0 transition-colors">0{i + 1}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-white text-sm font-semibold truncate">{a.title}</div>
                                    <div className="flex items-center gap-3 mt-0.5 text-xs text-[#556677]">
                                        <span className="px-2 py-0.5 rounded bg-[#1A2A3A] text-[#8899AA]">{a.category}</span>
                                        <span className="flex items-center gap-1"><Clock size={10} />{a.time}</span>
                                        <span>{a.views} views</span>
                                    </div>
                                </div>
                                <ArrowRight size={14} className="text-[#445566] group-hover:text-white transition-colors shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Tickets + Status */}
                <div className="space-y-4">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-5 border-b border-[#1A2A3A] flex items-center justify-between">
                            <h3 className="font-bold text-white">My Recent Tickets</h3>
                            <Link href="/help/chat" className="text-indigo-400 text-xs font-bold hover:text-indigo-300">View All</Link>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {RECENT_TICKETS.map(t => (
                                <div key={t.id} className="p-4 flex items-center gap-3 hover:bg-[#131B2B] transition-colors">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${t.status === 'Open' ? 'bg-amber-500' : t.status === 'Resolved' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white text-xs font-semibold truncate">{t.subject}</div>
                                        <div className="text-[#556677] text-[10px] mt-0.5">{t.id} · {t.time}</div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${t.status === 'Open' ? 'bg-amber-500/10 text-amber-400' : t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>{t.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Support Status */}
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                            <CheckCircle size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-emerald-400 font-bold text-sm">All Systems Operational</div>
                            <div className="text-[#8899AA] text-xs">Current avg response time: <span className="text-white font-semibold">3 minutes</span></div>
                        </div>
                        <Link href="/help/chat" className="ml-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors whitespace-nowrap">Chat Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
