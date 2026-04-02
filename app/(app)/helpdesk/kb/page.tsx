"use client";
import React from "react";
import {
    BookOpen, Search, Book, Monitor, Shield, FileText,
    ChevronRight, Star, ExternalLink, Lightbulb
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
    { name: "IT & Hardware", icon: Monitor, count: 45, color: "#33E6FF" },
    { name: "HR & Policies", icon: Book, count: 32, color: "#9D00FF" },
    { name: "InfoSec & Compliance", icon: Shield, count: 18, color: "#00E5A0" },
    { name: "Guides & How-tos", icon: FileText, count: 104, color: "#FFB020" }
];

const POPULAR_ARTICLES = [
    { id: 1, title: "How to configure VPN on strict home networks", views: "12k", category: "IT Support" },
    { id: 2, title: "Understanding your flexible benefits claim process", views: "8.4k", category: "HR Policies" },
    { id: 3, title: "Password rotation rules & 2FA Setup", views: "7.1k", category: "InfoSec" },
    { id: 4, title: "Booking meeting rooms via the Outlook plugin", views: "5k", category: "Guides" },
];

export default function KnowledgeBase() {
    return (
        <div className="min-h-screen bg-[#0A1420] text-white">

            {/* Search Hero Area */}
            <div className="bg-[#0F1C2E] border-b border-[#1A2A3A] py-16 px-6 text-center relative overflow-hidden">
                {/* Background glimmers */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#33E6FF]/5 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9D00FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">How can we help you today?</h1>
                    <p className="text-[#8899AA] text-lg mb-8">Search through our exhaustive knowledge base for self-service resolutions before raising a ticket.</p>

                    <div className="relative max-w-2xl mx-auto group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566] group-focus-within:text-[#00E5A0] transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Search articles, guides, policies..."
                            className="w-full bg-[#1A2A3A] border-2 border-[#2A3A4A] hover:border-[#445566] text-white rounded-2xl pl-14 pr-32 py-4 text-lg focus:outline-none focus:border-[#00E5A0] transition-colors shadow-2xl"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00E5A0] text-[#0A1420] px-6 py-2.5 rounded-xl font-bold hover:bg-[#00c98d] transition-colors">
                            Search
                        </button>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#8899AA]">
                        <span>Popular searches:</span>
                        <div className="flex gap-2">
                            <span className="bg-[#1A2A3A] px-2 py-1 rounded cursor-pointer hover:text-white transition-colors">VPN issues</span>
                            <span className="bg-[#1A2A3A] px-2 py-1 rounded cursor-pointer hover:text-white transition-colors">Apply Leave</span>
                            <span className="bg-[#1A2A3A] px-2 py-1 rounded cursor-pointer hover:text-white transition-colors">Payslip</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Categories Area */}
                <div className="lg:col-span-2 space-y-10">

                    <section>
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <BookOpen size={20} className="text-[#33E6FF]" /> Browse Categories
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {CATEGORIES.map(cat => (
                                <div key={cat.name} className="group p-6 rounded-2xl border border-[#1A2A3A] bg-[#0F1C2E] hover:border-[#2A3A4A] cursor-pointer transition-colors relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/4 -translate-y-1/4" style={{ backgroundColor: cat.color, filter: 'blur(30px)' }}></div>
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#1A2A3A] bg-[#0A1420]" style={{ color: cat.color }}>
                                            <cat.icon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-white group-hover:text-[#00E5A0] transition-colors mb-1">{cat.name}</h3>
                                            <p className="text-[#8899AA] text-sm">{cat.count} articles</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Lightbulb size={20} className="text-[#FFB020]" /> Recommended for You
                        </h2>
                        <div className="space-y-4">
                            {[
                                { id: 5, title: "Onboarding Checklist FAQ (For New Joiners)", desc: "Quick answers to the most common questions on your first week.", cat: "HR Policies" },
                                { id: 6, title: "Step-by-step: Accessing your Digital Payslip via Portal", desc: "Detailed guide on where to find, download, and read your monthly compensation breakdown.", cat: "Guides" }
                            ].map(article => (
                                <Link href={`/helpdesk/kb/${article.id}`} key={article.id} className="block group p-6 rounded-2xl border border-[#1A2A3A] bg-[#0F1C2E] hover:border-[#00E5A0]/50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#33E6FF] mb-2 block">{article.cat}</span>
                                            <h3 className="text-lg font-bold text-white group-hover:text-[#00E5A0] transition-colors mb-2">{article.title}</h3>
                                            <p className="text-sm text-[#8899AA]">{article.desc}</p>
                                        </div>
                                        <ChevronRight size={20} className="text-[#445566] group-hover:text-[#00E5A0] shrink-0 mt-6" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-bold text-white flex items-center gap-2 border-b border-[#1A2A3A] pb-4 mb-4">
                            <Star size={18} className="text-[#FFB020]" /> Most Popular Articles
                        </h3>
                        <div className="space-y-4">
                            {POPULAR_ARTICLES.map((article, i) => (
                                <div key={article.id} className="flex gap-4 group cursor-pointer">
                                    <span className="text-2xl font-black text-[#1A2A3A] group-hover:text-[#2A3A4A] transition-colors shrink-0">0{i + 1}</span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white group-hover:text-[#00E5A0] transition-colors mb-1 leading-snug">{article.title}</h4>
                                        <div className="flex items-center gap-3 text-xs text-[#445566]">
                                            <span>{article.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-[#445566]"></span>
                                            <span>{article.views} views</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-b from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] rounded-2xl p-6 relative overflow-hidden text-center">
                        <h3 className="text-lg font-bold text-white mb-2">Still need help?</h3>
                        <p className="text-[#8899AA] text-sm mb-6">If you couldn't find the answer you were looking for, our human agents are ready to assist you.</p>
                        <Link href="/helpdesk/raise" className="w-full py-3 bg-[#1A2A3A] text-white font-semibold flex flex-col items-center justify-center gap-1 border border-[#2A3A4A] rounded-xl hover:bg-[#00E5A0] hover:text-[#0A1420] hover:border-[#00E5A0] transition-all group">
                            <span>Raise a Ticket</span>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}
