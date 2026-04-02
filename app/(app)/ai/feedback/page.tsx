"use client";

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Filter, Search, ShieldCheck, CheckCircle2, RotateCcw, MessageCircle, MoreVertical, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AIFeedbackPage() {
    const [activeTab, setActiveTab] = useState('All Feedback');
    const tabs = ['All Feedback', 'Needs Review', 'Resolved', 'Ignored'];

    const feedbackLogs = [
        { id: 'FB-9021', user: 'Anita C.', role: 'HR Business Partner', model: 'Attrition Predictor', date: '2 hrs ago', rating: 'negative', fb: 'Model flagged employee as high flight risk, but they just got promoted last month. Missing context?', status: 'Needs Review' },
        { id: 'FB-9020', user: 'Vikram S.', role: 'Recruiter', model: 'Hiring Benchmark', date: '5 hrs ago', rating: 'positive', fb: 'Salary bands generated were perfectly aligned with recent industry changes. Closed candidate easily.', status: 'Resolved' },
        { id: 'FB-9019', user: 'Priya R.', role: 'Payroll Admin', model: 'Document OCR', date: 'Yesterday', rating: 'negative', fb: 'Failed to extract PAN number correctly from a perfectly legible scan. Extracted O as 0.', status: 'Needs Review' },
        { id: 'FB-9018', user: 'System Auto', role: 'Compliance Bot', model: 'Policy Generator', date: 'Oct 22', rating: 'negative', fb: 'Drafted policy tone was too casual for a legal document. Halting auto-publish pipeline.', status: 'Resolved' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="mb-6 shrink-0 flex flex-col md:flex-row justify-between items-start md:flex-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <MessageSquare size={28} className="text-teal-400" /> AI Feedback Loop
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Monitor end-user ratings (RLHF - Reinforcement Learning from Human Feedback) on AI-generated insights, documents, and chatbot responses.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Filter size={16} className="mr-2" /> Model Filter
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-500 text-white border-none py-2 px-6">
                        <RotateCcw size={16} className="mr-2" /> Batch Retrain (4)
                    </Button>
                </div>
            </div>

            {/* Smart Summary Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 shrink-0">
                <div className="bg-[#0D1928] border border-teal-500/20 p-5 rounded-2xl flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2 relative z-10">Global Satisfaction</div>
                    <div className="text-3xl font-bold text-teal-400 relative z-10">94.2%</div>
                    <div className="text-[10px] text-teal-500 mt-1 font-medium relative z-10">+1.2% this week</div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"><ThumbsUp size={14} className="text-emerald-400" /> Positive Signals</div>
                    <div className="text-2xl font-bold text-white">1,405</div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex flex-col justify-center">
                    <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"><ThumbsDown size={14} className="text-rose-400" /> Improvement Areas</div>
                    <div className="text-2xl font-bold text-white">82</div>
                    <div className="text-[10px] text-rose-400 mt-1">Pending verification</div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl flex flex-col justify-center bg-gradient-to-br from-[#131B2B] to-[#0A1420]">
                    <div className="text-[#8899AA] text-xs font-semibold uppercase tracking-wider mb-2">Worst Performing Model</div>
                    <div className="text-lg font-bold text-white mb-1">Document OCR</div>
                    <div className="text-xs text-rose-400 font-medium">8.4% Error Rate</div>
                </div>
            </div>

            {/* Data Queue */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
                <div className="flex space-x-1 bg-[#1A2A3A] p-1 rounded-xl w-full md:w-auto overflow-x-auto hide-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === tab
                                ? 'bg-[#0D1928] text-white shadow shadow-black/20'
                                : 'text-[#8899AA] hover:text-white hover:bg-[#2A3A4A]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="bg-[#0D1928] border border-[#2A3A4A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-teal-500/50 transition-colors w-full md:w-64">
                    <Search size={16} className="text-[#8899AA]" />
                    <input type="text" placeholder="Search logs..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                </div>
            </div>

            {/* Feedback Grid */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">

                {feedbackLogs.map((log, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:bg-[#131B2B] transition-colors flex flex-col md:flex-row gap-6 group relative">

                        {/* Status Bar */}
                        <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-md ${log.rating === 'positive' ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                        <div className="w-full md:w-48 shrink-0 border-b border-[#1A2A3A] md:border-b-0 md:border-r md:pr-6 pb-4 md:pb-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`p-1.5 rounded-lg border ${log.rating === 'positive' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                                    {log.rating === 'positive' ? <ThumbsUp size={14} /> : <ThumbsDown size={14} />}
                                </span>
                                <span className="text-xs text-[#8899AA] font-mono">{log.id}</span>
                            </div>
                            <div className="text-sm font-semibold text-white truncate">{log.user}</div>
                            <div className="text-xs text-[#8899AA] truncate mb-2">{log.role}</div>
                            <div className="text-[10px] text-[#445566] flex items-center gap-1"><Clock size={10} /> {log.date}</div>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A2A3A] text-[#8899AA] text-[10px] font-bold uppercase tracking-wider border border-[#2A3A4A]">
                                    Model: {log.model}
                                </span>
                                <div className="flex gap-2 relative z-10">
                                    {log.status === 'Needs Review' ? (
                                        <Button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white border-none text-[10px] h-auto py-1.5 px-3 uppercase font-bold tracking-wider">
                                            Append to Fine-tune Array
                                        </Button>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                                            <CheckCircle2 size={12} /> Resolved
                                        </span>
                                    )}
                                    <button className="text-[#445566] hover:text-white"><MoreVertical size={16} /></button>
                                </div>
                            </div>

                            <div className="bg-[#131B2B] p-4 rounded-xl border border-[#1A2A3A] mt-auto">
                                <p className="text-sm text-[#8899AA] italic relative">
                                    <span className="absolute -left-2 -top-2 text-2xl text-[#2A3A4A]">"</span>
                                    {log.fb}
                                    <span className="absolute -right-2 -bottom-4 text-2xl text-[#2A3A4A]">"</span>
                                </p>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}
