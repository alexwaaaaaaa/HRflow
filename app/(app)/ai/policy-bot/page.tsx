"use client";

import React, { useState } from 'react';
import { Sparkles, BookOpen, Search, Send, FileText, User, ShieldCheck, Scale, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function PolicyBotPage() {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([
        { id: 1, type: 'bot', text: 'Hello! I am Kaarya Policy Bot. I am trained on your company handbook, compliance registers, and specific regional labor laws.\n\nAsk me anything about leaves, expenses, or code of conduct.' },
        { id: 2, type: 'user', text: 'What is the maternity leave policy for our Bangalore office? Do we offer any extended remote work post-leave?' },
        { id: 3, type: 'bot', text: 'According to the **India Employee Handbook (v2.4 - Oct 2023)** and the Maternity Benefit (Amendment) Act:\n\n1. You are eligible for **26 weeks** of paid maternity leave.\n2. Kaarya also offers a standard **4-week phase-back program** where you can work part-time (20 hours/week) at full pay.\n3. Regarding extended remote work, Section 4.2 of the *Flexible Working Policy* states that returning mothers can request **up to 3 months of fully remote work**, subject to manager approval.\n\nI have generated the standard request form for you if you wish to apply.' },
    ]);

    const handleSend = () => {
        if (!message.trim()) return;
        setChats([...chats, { id: chats.length + 1, type: 'user', text: message }]);
        setMessage('');
        setTimeout(() => {
            setChats(prev => [...prev, { id: prev.length + 1, type: 'bot', text: 'Retrieving relevant policies...' }]);
        }, 600);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#0A1420] animate-fade-in">

            {/* Context Sidebar */}
            <div className="w-80 border-r border-[#1A2A3A] bg-[#0D1928] hidden lg:flex flex-col shrink-0">
                <div className="p-6 border-b border-[#1A2A3A]">
                    <h2 className="text-white font-semibold flex items-center gap-2 mb-2">
                        <Scale size={20} className="text-emerald-400" /> Policy Knowledge
                    </h2>
                    <p className="text-[#8899AA] text-xs leading-relaxed">
                        Responses are strictly grounded in your indexed company documents to ensure 100% compliance.
                    </p>
                </div>

                <div className="p-4 flex-1 overflow-y-auto space-y-4">
                    <h3 className="text-xs font-semibold text-[#445566] uppercase tracking-wider px-2">Active Sources</h3>

                    <div className="p-3 bg-[#131B2B] rounded-xl border border-emerald-500/20 group">
                        <div className="flex items-start gap-3">
                            <BookOpen size={16} className="text-emerald-400 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1 group-hover:text-emerald-400 transition-colors">India Employee Handbook</h4>
                                <div className="text-xs text-[#8899AA] flex items-center gap-2">
                                    <span>v2.4</span> • <span>Oct 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A] group">
                        <div className="flex items-start gap-3">
                            <ShieldCheck size={16} className="text-[#8899AA] mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1 group-hover:text-[#8899AA] transition-colors">Flexible Working Policy</h4>
                                <div className="text-xs text-[#8899AA] flex items-center gap-2">
                                    <span>v1.2</span> • <span>Jan 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A] group">
                        <div className="flex items-start gap-3">
                            <FileText size={16} className="text-[#8899AA] mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium text-white mb-1 group-hover:text-[#8899AA] transition-colors">Travel & Expense Guidelines</h4>
                                <div className="text-xs text-[#8899AA] flex items-center gap-2">
                                    <span>Global</span> • <span>Mar 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative bg-[#0D1928]">

                {/* Header */}
                <div className="h-16 border-b border-[#1A2A3A] bg-[#0D1928] flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                            <Scale size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-white font-medium">Policy Bot</h2>
                            <p className="text-[#8899AA] text-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Strict Compliance Mode
                            </p>
                        </div>
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] text-[#8899AA] text-sm">
                        <Search size={16} className="mr-2" /> Search Transcripts
                    </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                    {chats.map((chat) => (
                        <div key={chat.id} className={`flex gap-4 max-w-3xl ${chat.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                            <div className="shrink-0 mt-1">
                                {chat.type === 'user' ? (
                                    <div className="w-8 h-8 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center">
                                        <User size={16} className="text-[#8899AA]" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <Scale size={16} className="text-white" />
                                    </div>
                                )}
                            </div>
                            <div className={`flex flex-col ${chat.type === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-6 py-4 rounded-2xl shadow-sm ${chat.type === 'user'
                                    ? 'bg-[#1A2A3A] text-white rounded-tr-none'
                                    : 'bg-[#131B2B] border border-emerald-500/20 text-[#E2E8F0] rounded-tl-none leading-relaxed'
                                    }`}>
                                    {chat.text.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className={i > 0 ? 'mt-4' : ''} dangerouslySetInnerHTML={{
                                            __html: paragraph
                                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-400 font-semibold">$1</strong>')
                                                .replace(/\*(.*?)\*/g, '<em class="text-[#8899AA]">$1</em>')
                                        }} />
                                    ))}

                                    {chat.id === 3 && (
                                        <div className="mt-4 pt-4 border-t border-[#2A3A4A] flex gap-3">
                                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-none text-xs py-1.5 px-3 h-auto">
                                                Open Request Form
                                            </Button>
                                            <Button variant="secondary" className="border-[#2A3A4A] text-white text-xs py-1.5 px-3 h-auto">
                                                View Policy PDF
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {chat.type === 'bot' && (
                                    <div className="text-xs text-[#445566] mt-2 ml-2 flex items-center gap-1">
                                        <CheckCircle size={12} className="text-emerald-500" /> Grounded in company knowledge
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-6 bg-[#0D1928] border-t border-[#1A2A3A] shrink-0">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-[#131B2B] border border-[#2A3A4A] focus-within:border-emerald-500/50 rounded-2xl flex items-center p-2 transition-colors duration-300">
                            <input
                                placeholder="Ask about policies, benefits, or compliance..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-sm px-4 py-3 placeholder:text-[#445566]"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <Button
                                className={`p-3 h-auto rounded-xl border-none flex items-center justify-center transition-all ${message.trim() ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-[#1A2A3A] text-[#445566]'}`}
                                onClick={handleSend}
                            >
                                <Send size={18} />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
