"use client";
import React from 'react';
import { HelpCircle, Search, Book, Video, MessagesSquare, ChevronRight, ExternalLink } from 'lucide-react';

export default function HelpArticlesScreen() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-8">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-sky-500/10 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-sky-500/20 shadow-xl">
                    <HelpCircle className="text-sky-400" size={28} />
                </div>
                <h1 className="text-3xl font-black text-white mb-3">How can we help you today?</h1>
                <p className="text-[#8899AA] text-base max-w-2xl mx-auto mb-8">
                    Access our comprehensive knowledge base, video tutorials, or chat with our HR experts.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative group">
                    <div className="absolute inset-0 bg-sky-500/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-[#0A1420] border border-[#2A3A4A] group-hover:border-sky-500/50 rounded-2xl px-4 py-3 shadow-xl transition-colors">
                        <Search className="text-[#556677] group-hover:text-sky-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search for 'How to run payroll' or 'Setup leave policies'..."
                            className="w-full bg-transparent border-none text-white px-4 outline-none placeholder-[#556677]"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-sky-500/30 rounded-2xl p-6 transition-colors group cursor-pointer text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-sky-400 mb-4 group-hover:bg-sky-500/10 transition-colors">
                        <Book size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">Knowledge Base</h3>
                    <p className="text-sm text-[#8899AA] mb-4">Detailed step-by-step guides for every Kaarya feature.</p>
                    <span className="text-sky-400 text-sm font-bold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">Browse Articles <ChevronRight size={14} /></span>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-amber-500/30 rounded-2xl p-6 transition-colors group cursor-pointer text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/10 transition-colors">
                        <Video size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">Video Academy</h3>
                    <p className="text-sm text-[#8899AA] mb-4">Visual walkthroughs and masterclasses for admins.</p>
                    <span className="text-amber-400 text-sm font-bold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">Watch Videos <ChevronRight size={14} /></span>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] hover:border-emerald-500/30 rounded-2xl p-6 transition-colors group cursor-pointer text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/10 transition-colors">
                        <MessagesSquare size={24} />
                    </div>
                    <h3 className="font-bold text-white mb-2">Expert Support</h3>
                    <p className="text-sm text-[#8899AA] mb-4">Chat live with our payroll and compliance experts.</p>
                    <span className="text-emerald-400 text-sm font-bold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">Start Chat <ChevronRight size={14} /></span>
                </div>
            </div>

            {/* Popular Topics */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Processing first payroll successfully', 'Setting up custom holiday calendars', 'Configuring multi-level approval workflows', 'Generating Form 16 for employees', 'Resolving biometric sync issues', 'Setting up OKRs and Goal Tracking'].map((topic, i) => (
                        <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] hover:bg-[#131B2B] p-4 rounded-xl flex items-center justify-between group cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                                <Book size={16} className="text-[#556677] group-hover:text-sky-400 transition-colors" />
                                <span className="text-sm text-[#CCDDEE] font-medium">{topic}</span>
                            </div>
                            <ExternalLink size={14} className="text-[#2A3A4A] group-hover:text-sky-400 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
