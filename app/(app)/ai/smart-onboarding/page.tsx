"use client";

import React, { useState } from 'react';
import { Sparkles, Calendar, ArrowRight, CheckCircle2, Circle, AlertCircle, PlayCircle, FileSignature, Monitor, Briefcase, Mail, Send, Target } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function SmartOnboardingAIPage() {
    const [selectedTemplate, setSelectedTemplate] = useState('Engineering');

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Sparkles size={28} className="text-pink-400" /> Smart Onboarding AI
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Dynamic, hyper-personalized 30/60/90 day onboarding plans generated for each new hire based on role, seniority, and team objectives.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        Template Library
                    </Button>
                    <Button className="bg-pink-600 hover:bg-pink-500 text-white border-none py-2 px-6">
                        <Send size={16} className="mr-2" /> Launch Plan
                    </Button>
                </div>
            </div>

            {/* Candidate Context */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-xl font-bold text-white shrink-0">
                        SD
                    </div>
                    <div>
                        <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Incoming Hire</div>
                        <h2 className="text-xl font-bold text-white mb-1">Siddharth Desai</h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#8899AA]">
                            <span>Senior Frontend Engineer</span>
                            <span className="w-1 h-1 rounded-full bg-[#445566]" />
                            <span>Joining: Oct 24, 2023</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#131B2B] border border-pink-500/30 p-4 rounded-xl flex items-start gap-3 relative z-10 w-full md:w-96 shrink-0">
                    <div className="bg-pink-500/10 p-2 rounded-lg text-pink-400 shrink-0">
                        <Sparkles size={18} />
                    </div>
                    <div>
                        <h3 className="text-white text-sm font-medium mb-1">AI Personalization Status</h3>
                        <p className="text-xs text-[#8899AA] leading-relaxed">
                            Plan customized based on: <strong>Seniority Level (L4)</strong>, <strong>React/Next.js stack</strong>, and current team objective: <strong>"Checkout Flow Revamp Q4"</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                {/* Generation Parameters */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col gap-6">
                    <div>
                        <h3 className="text-white font-semibold mb-1">Generation Context</h3>
                        <p className="text-xs text-[#8899AA]">Sources AI used to build this plan</p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A] flex items-center gap-3">
                            <Briefcase size={16} className="text-[#8899AA]" />
                            <div>
                                <div className="text-xs font-semibold text-white">Job Description Parsed</div>
                                <div className="text-[10px] text-[#8899AA]">Frontend architecture, API integration</div>
                            </div>
                        </div>
                        <div className="bg-[#131B2B] p-3 rounded-xl border border-[#2A3A4A] flex items-center gap-3">
                            <Monitor size={16} className="text-[#8899AA]" />
                            <div>
                                <div className="text-xs font-semibold text-white">Tech Stack Detected</div>
                                <div className="text-[10px] text-[#8899AA]">React, Typescript, Tailwind, Jest</div>
                            </div>
                        </div>
                        <div className="bg-[#131B2B] p-3 rounded-xl border border-pink-500/40 border-l-4 border-l-pink-500 flex items-center gap-3">
                            <Target size={16} className="text-pink-400" />
                            <div>
                                <div className="text-xs font-semibold text-white">Active Team OKR Sync</div>
                                <div className="text-[10px] text-pink-400 font-medium">Injecting "Checkout Flow" domain context</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[#1A2A3A]">
                        <Button className="w-full bg-[#1A2A3A] border-[#2A3A4A] text-white text-xs h-auto py-2 hover:bg-[#2A3A4A]">
                            <RefreshCcw size={14} className="mr-2" /> Regenerate Plan
                        </Button>
                    </div>
                </div>

                {/* The Timeline Plan */}
                <div className="lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-semibold">The 30/60/90 Day Path</h3>
                        <div className="flex bg-[#1A2A3A] rounded-lg p-1">
                            {['Week 1', 'Day 30', 'Day 60', 'Day 90'].map(t => (
                                <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md ${t === 'Week 1' ? 'bg-[#2A3A4A] text-white shadow' : 'text-[#8899AA] hover:text-white'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Timeline Rendering */}
                    <div className="relative pl-6 border-l-2 border-[#1A2A3A] space-y-6 pb-2">

                        {/* Task 1 */}
                        <div className="relative">
                            <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full flex items-center justify-center">
                                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                            </span>
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-xs text-[#8899AA] mb-1 font-mono">Day 1-2</div>
                                    <h5 className="text-sm font-medium text-white mb-2">System Access & Dev Environment Setup</h5>
                                </div>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">IT Auto-Provisioned</span>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-xs text-[#8899AA] space-y-2 mt-2">
                                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Okta SSO Account Created</div>
                                <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> GitHub Repo Access (Frontend-Core) Granted</div>
                                <div className="flex items-center gap-2"><Circle size={14} /> Local environment build (Guide attached)</div>
                            </div>
                        </div>

                        {/* Task 2 */}
                        <div className="relative">
                            <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full flex items-center justify-center" />
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-xs text-pink-400 mb-1 font-mono flex items-center gap-1.5"><Sparkles size={12} /> Day 3-4 (AI Injected)</div>
                                    <h5 className="text-sm font-medium text-white mb-2">Deep Dive: Checkout Architecture</h5>
                                </div>
                                <span className="text-[10px] bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">Team OKR specific</span>
                            </div>
                            <div className="bg-gradient-to-r from-pink-500/5 to-transparent border border-pink-500/20 hover:border-pink-500/40 transition-colors rounded-xl p-3 text-xs text-[#8899AA] space-y-3 mt-2">
                                <p className="text-white/80 leading-relaxed">
                                    Review the specific technical debt tickets regarding the payment gateway integration. Schedule a 45min context sync with <strong>Vikram (Tech Lead)</strong>.
                                </p>
                                <div className="flex gap-2">
                                    <Button className="bg-[#1A2A3A] border-none text-white h-auto py-1 px-3 text-xs"><PlayCircle size={14} className="mr-1.5" /> Watch Architecture Video</Button>
                                    <Button className="bg-[#1A2A3A] border-none text-white h-auto py-1 px-3 text-xs"><Calendar size={14} className="mr-1.5" /> Auto-Schedule Sync</Button>
                                </div>
                            </div>
                        </div>

                        {/* Task 3 */}
                        <div className="relative opacity-60">
                            <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full flex items-center justify-center" />
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-xs text-[#8899AA] mb-1 font-mono">Day 5</div>
                                    <h5 className="text-sm font-medium text-white mb-2">Deliver "First Good Issue" PR</h5>
                                </div>
                            </div>
                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 text-xs text-[#8899AA] mt-2">
                                <p>AI has pre-selected a low-risk UI bug ticket (JIRA-892) related to the cart dropdown to familiarze Siddharth with the CI/CD pipeline and code review process.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Automation Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl hover:bg-[#131B2B] transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA]">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm">Welcome Email Sequence</h4>
                            <p className="text-xs text-[#8899AA] mt-1">Ready to send (Day -3)</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs py-1.5 px-4 h-auto">Preview</Button>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl hover:bg-[#131B2B] transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA]">
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium text-sm">Manager Check-in Blueprint</h4>
                            <p className="text-xs text-[#8899AA] mt-1">Generated discussion points for Day 10</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs py-1.5 px-4 h-auto">Assign to Manager</Button>
                </div>
            </div>

        </div>
    );
}
// Placeholder for RefreshCcw missing
function RefreshCcw(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 2v6h6" /></svg>
}
