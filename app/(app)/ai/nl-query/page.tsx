"use client";

import React, { useState } from 'react';
import { Sparkles, Search, MessageSquare, ArrowRight, Zap, Users, ShieldCheck, Database } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NLQueryAdminPage() {
    const [query, setQuery] = useState("");

    const suggestedQueries = [
        { icon: Users, text: "Show me all L4 Engineers with salaries below the 50th percentile who have a high flight risk." },
        { icon: Zap, text: "Generate a report comparing the last 3 quarters of performance reviews vs. compensation hikes in Sales." },
        { icon: ShieldCheck, text: "Are there any compliance anomalies in the recent payroll run for the APAC region?" },
        { icon: Database, text: "Who has accumulated more than 40 days of leave and hasn't taken a break in 6 months?" }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-8 max-w-5xl mx-auto animate-fade-in relative w-full">

            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-indigo-500/30 mb-6 shadow-lg shadow-indigo-900/20">
                    <Sparkles size={32} className="text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                    Natural Language <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">HR Query</span>
                </h1>
                <p className="text-[#8899AA] text-lg max-w-2xl mx-auto">
                    Ask Kaarya AI anything about your workforce, payroll, compliance, or organizational sentiment.
                </p>
            </div>

            {/* Main Input */}
            <div className="w-full max-w-3xl relative mb-12 group">
                <div className="absolute inset-x-0 -bottom-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-10 blur-xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="bg-[#0D1928] border-2 border-[#1A2A3A] group-hover:border-indigo-500/50 rounded-2xl flex items-center p-2 shadow-2xl transition-colors duration-300">
                    <div className="pl-4 pr-2">
                        <Search size={24} className="text-[#8899AA] group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="e.g. Find all employees who joined in 2023 but haven't received a promotion..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-lg px-2 py-4 placeholder:text-[#445566]"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none rounded-xl px-6 py-4 h-auto flex items-center gap-2">
                        Ask AI <ArrowRight size={18} />
                    </Button>
                </div>

                {query.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-2 shadow-xl z-20">
                        <div className="px-4 py-2 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Press Enter to run query</div>
                    </div>
                )}
            </div>

            {/* Suggested Queries */}
            <div className="w-full max-w-3xl">
                <div className="flex items-center gap-2 mb-4 justify-center">
                    <MessageSquare size={16} className="text-[#8899AA]" />
                    <span className="text-[#8899AA] text-sm font-medium">Try these examples</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestedQueries.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setQuery(item.text)}
                            className="bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl hover:border-indigo-500/40 hover:bg-[#131B2B] cursor-pointer transition-all flex items-start gap-3 group"
                        >
                            <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#8899AA] group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors mt-0.5">
                                <item.icon size={16} />
                            </div>
                            <p className="text-sm text-[#8899AA] group-hover:text-white transition-colors leading-relaxed">
                                "{item.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
